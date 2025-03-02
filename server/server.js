const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// RSS feed sources
const RSS_FEEDS = [
    { name: "BleepingComputer", url: "https://www.bleepingcomputer.com/feed/" },
    { name: "CISA", url: "https://www.cisa.gov/cybersecurity-advisories/all.xml" },    
    { name: "Cyber Security News", url: "https://cybersecuritynews.com/feed/" },
    { name: "SecurityWeek", url: "https://feeds.feedburner.com/securityweek" },
    { name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews" },
];

app.use(express.static('public'));

// ** Function to clean invalid XML characters **
const sanitizeXML = (xml) => {
    return xml
        .replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;") // Fix unescaped `&`
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ""); // Remove control characters
};

// ** Function to truncate long text to a uniform size **
const truncateText = (text, maxLength) => {
    if (!text) return "No description available.";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

// ** Function to fetch and parse RSS feeds **
const fetchRSSFeeds = async () => {
    try {
        const allFeeds = await Promise.all(RSS_FEEDS.map(async (feed) => {
            try {
                const response = await axios.get(feed.url, { timeout: 10000 }); // Fetch feed
                const cleanXML = sanitizeXML(response.data); // Clean XML data

                const parsedData = await xml2js.parseStringPromise(cleanXML, { mergeAttrs: true });

                // Handle different feed formats (RSS 2.0 & Atom)
                let items = parsedData?.rss?.channel?.[0]?.item || parsedData?.feed?.entry || [];

                // ** Filter CISA Feeds (Only "CISA Releases" or "CISA Adds") **
                if (feed.name === "CISA") {
                    items = items.filter(item =>
                        item.title?.[0]?.includes("CISA Releases") || item.title?.[0]?.includes("CISA Adds")
                    );
                }

                return items.map(item => ({
                    title: truncateText(item.title?.[0] || "No title", 80),  // Limit title to 80 characters
                    link: item.link?.[0]?.href || item.link?.[0] || "#",
                    pubDate: new Date(item.pubDate?.[0] || item.updated?.[0] || Date.now()).toLocaleString(),
                    description: truncateText(item.description?.[0] || item.summary?.[0] || "No description available.", 300), // Limit description to 300 characters
                    source: feed.name
                }));
            } catch (error) {
                console.error(`❌ Error fetching feed from ${feed.name}:`, error.message);
                return []; // Continue with other feeds
            }
        }));

        return allFeeds.flat();
    } catch (error) {
        console.error('❌ Global RSS fetching error:', error);
        return [];
    }
};

// ** API endpoint to get threats **
app.get('/api/threats', async (req, res) => {
    const threats = await fetchRSSFeeds();
    res.json(threats);
});

// ** WebSocket connection for real-time updates **
io.on('connection', (socket) => {
    console.log('⚡ Client connected');

    fetchRSSFeeds().then((threats) => {
        socket.emit('threatsUpdate', threats);
    });

    socket.on('disconnect', () => {
        console.log('❌ Client disconnected');
    });
});

// ** Periodically fetch and broadcast updates **
setInterval(async () => {
    const threats = await fetchRSSFeeds();
    io.emit('threatsUpdate', threats);
}, 15 * 60 * 1000); // Every 15 minutes

// ** Start server **
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
