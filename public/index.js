const socket = io();
let allThreats = [];

// Function to render threats with filtering & search
function renderThreats() {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    const selectedSource = document.getElementById("sourceFilter").value;
    const threatList = document.getElementById("threatList");

    threatList.innerHTML = '';

    const filteredThreats = allThreats.filter(threat => {
        return (selectedSource === '' || threat.source === selectedSource) &&
               (threat.title.toLowerCase().includes(searchQuery) ||
                threat.description.toLowerCase().includes(searchQuery) ||
                threat.source.toLowerCase().includes(searchQuery));
    });

    filteredThreats.forEach(threat => {
        const threatItem = document.createElement('a');
        threatItem.href = threat.link;
        threatItem.target = '_blank';
        threatItem.className = 'list-group-item list-group-item-action';
        threatItem.innerHTML = `
            <h5 class="mb-1">${threat.title}</h5>
            <p class="mb-1">${threat.description}</p>
            <small>${threat.pubDate} - <strong>${threat.source}</strong></small>
        `;
        threatList.appendChild(threatItem);
    });
}

// WebSocket listener for real-time updates
socket.on('threatsUpdate', (threats) => {
    allThreats = threats;
    renderThreats();
});

// Event Listeners for Filters & Search
document.getElementById("searchInput").addEventListener("keyup", renderThreats);
document.getElementById("sourceFilter").addEventListener("change", renderThreats);
