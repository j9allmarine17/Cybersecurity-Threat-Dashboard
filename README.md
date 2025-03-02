Cybersecurity Threat Dashboard
Real-time Cybersecurity News and Alerts

The Cybersecurity Threat Dashboard is a real-time threat intelligence aggregator that pulls security alerts, advisories, and breaking news from multiple sources. It is designed for cybersecurity professionals to stay informed about the latest threats, vulnerabilities, and advisories in a single, easy-to-use dashboard.
Features

    Real-time Threat Updates – Fetches cybersecurity alerts and news every 15 minutes
    Multiple Security Sources – Includes feeds from CISA, BleepingComputer, SecurityWeek, The Hacker News, and Cyber Security News
    Filtered Alerts – Displays only “CISA Releases” and “CISA Adds” advisories
    WebSocket Support – Enables real-time updates without needing to refresh the page
    Customizable Filtering – Search articles and filter by source
    Responsive UI – Optimized with Bootstrap/Tailwind for a clean, dark-themed dashboard
    Runs as a Systemd Service – Can be set up on a server for continuous monitoring

Installation & Setup
1. Prerequisites

Before installing, ensure you have the following:

    Node.js (v16+) & npm
    Install on Ubuntu/Debian:

sudo apt update && sudo apt install -y nodejs npm

Systemd (For Server Deployment) If running on Linux, ensure systemd is installed:

    sudo systemctl --version

    A Server or Local Machine
        Works on Ubuntu, Debian, Windows (via WSL2), or Mac.

2. Clone the Repository

git clone https://github.com/YOUR_USERNAME/cybersecurity-threat-dashboard.git
cd cybersecurity-threat-dashboard

3. Install Dependencies

npm install

4. Configure RSS Feeds

The dashboard automatically pulls feeds from:

    BleepingComputer: https://www.bleepingcomputer.com/feed/
    CISA Alerts: https://www.cisa.gov/cybersecurity-advisories/all.xml
    SecurityWeek: https://feeds.feedburner.com/securityweek
    The Hacker News: https://feeds.feedburner.com/TheHackersNews
    Cyber Security News: https://cybersecuritynews.com/feed/

To modify or add sources, edit:

nano server.js

Update the RSS_FEEDS array.
5. Start the Server

Run the dashboard in development mode:

node server/server.js

Visit the dashboard at http://localhost:3000.
Running as a Systemd Service (For Production)

To ensure the dashboard runs automatically on boot, set it up as a systemd service.
1. Create a Systemd Service File

sudo nano /etc/systemd/system/cybersecurity-dashboard.service

Paste the following:

[Unit]
Description=Cybersecurity Threat Dashboard
After=network.target

[Service]
Type=simple
User=your-user
Group=your-user
WorkingDirectory=/path/to/cybersecurity-threat-dashboard
ExecStart=/usr/bin/node /path/to/cybersecurity-threat-dashboard/server/server.js
Restart=always
RestartSec=10s
StartLimitIntervalSec=600
StartLimitBurst=20
Environment="PATH=/usr/bin:/usr/local/bin"
Environment="NODE_ENV=production"
StandardOutput=journal
StandardError=journal
SyslogIdentifier=cybersecurity-dashboard

[Install]
WantedBy=multi-user.target

2. Enable and Start the Service

sudo systemctl daemon-reload
sudo systemctl enable cybersecurity-dashboard
sudo systemctl start cybersecurity-dashboard

3. Check Service Status

sudo systemctl status cybersecurity-dashboard

Usage

    Visit the dashboard at http://localhost:3000 (or http://your-server-ip:3000 for remote use).
    Use the dropdown filter to select feeds from CISA, SecurityWeek, BleepingComputer, and more.
    Search for keywords to find relevant security alerts.
    Leave the service running to receive continuous real-time updates.

Customization

    Modify Refresh Interval:
    Change the WebSocket update frequency (default = 15 min) in server.js:

    setInterval(async () => {
        const threats = await fetchRSSFeeds();
        io.emit('threatsUpdate', threats);
    }, 15 * 60 * 1000);

    Add New Feeds:
    Edit RSS_FEEDS in server.js and add your own cybersecurity RSS sources.

Troubleshooting
Service Fails to Start (start-limit-hit)

If the service fails to start repeatedly:

sudo systemctl reset-failed cybersecurity-dashboard
sudo systemctl restart cybersecurity-dashboard

Check logs:

sudo journalctl -u cybersecurity-dashboard --no-pager --lines=50

Check If Port 3000 Is Already In Use

sudo lsof -i :3000

Kill the process:

sudo kill -9 <PID>

Manually Run the Server to Debug

node server/server.js --trace-warnings --inspect

Security Considerations

If deploying on a public server, consider:

    Using Nginx as a reverse proxy
    Enabling HTTPS (Let's Encrypt SSL)
    Restricting access to trusted IPs

Future Improvements

    Add email alerts for critical security advisories
    Implement historical threat data storage (SQLite/MongoDB)
    Add custom WebSocket event notifications

License

This project is licensed under the MIT License. You are free to use, modify, and distribute it.
Contributing

Want to improve the Cybersecurity Threat Dashboard?

    Fork the repo
    Create a new branch
    Submit a pull request

Support & Contact

For issues or feature requests, open a GitHub issue or contact:
Email: j9allmarine17@gmail.com
