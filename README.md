# Cybersecurity Threat Dashboard

**Real-time Cybersecurity News and Alerts**

**License:** MIT  
**Last Updated:** March 02, 2025  

Tired of visiting multiple websites for the latest cybersecurity updates? The **Cybersecurity Threat Dashboard** is a real-time threat intelligence aggregator that consolidates security alerts, advisories, and breaking news from trusted sources into a single, user-friendly interface. Designed for cybersecurity professionals, this tool helps you stay ahead of threats and vulnerabilities with minimal effort.

---
## Features
- **Real-time Threat Updates** – Fetches cybersecurity alerts and news every 15 minutes.
- **Multiple Security Sources** – Aggregates feeds from:
  - CISA
  - BleepingComputer
  - SecurityWeek
  - The Hacker News
  - Cyber Security News
- **Filtered Alerts** – Displays only *"CISA Releases"* and *"CISA Adds"* advisories.
- **WebSocket Support** – Enables real-time updates without page refreshes.
- **Customizable Filtering** – Search articles and filter by source.
- **Responsive UI** – Clean, dark-themed design optimized with Bootstrap/Tailwind.
- **Systemd Service** – Runs continuously on a server for 24/7 monitoring.

---
## Installation & Setup
### Prerequisites
Before installing, ensure you have:

- **Node.js (v16+) and npm:**
  ```sh
  sudo apt update && sudo apt install -y nodejs npm
  ```
- **Systemd (for server deployment):**
  ```sh
  sudo systemctl --version
  ```
- **A server or local machine:** Compatible with Ubuntu, Debian, Windows via WSL2, or Mac.

---
### Steps
#### 1. Clone the Repository
```sh
git clone https://github.com/YOUR_USERNAME/cybersecurity-threat-dashboard.git
cd cybersecurity-threat-dashboard
```

#### 2. Install Dependencies
```sh
npm install
```

#### 3. Configure RSS Feeds
Feeds are preconfigured from the sources listed above. To modify or add feeds, edit `server.js`:
```sh
nano server.js
```
Update the `RSS_FEEDS` array with your preferred RSS URLs.

#### 4. Start the Server
Run in development mode:
```sh
node server/server.js
```
Access the dashboard at **http://localhost:3000**.

---
## Running as a Systemd Service (Production)
To run the dashboard continuously on a server:

#### 1. Create a Systemd Service File
```sh
sudo nano /etc/systemd/system/cybersecurity-dashboard.service
```

#### 2. Add the following configuration:
```ini
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
```

#### 3. Enable and Start the Service
```sh
sudo systemctl daemon-reload
sudo systemctl enable cybersecurity-dashboard
sudo systemctl start cybersecurity-dashboard
```

#### 4. Check Service Status
```sh
sudo systemctl status cybersecurity-dashboard
```

---
## Usage
- Navigate to **http://localhost:3000** (or **http://your-server-ip:3000** for remote access).
- Use the dropdown to filter feeds by source (*CISA, SecurityWeek, etc.*).
- Search keywords to find specific alerts.
- Leave the service running for continuous updates.

---
## Customization
- **Modify Refresh Interval** – Adjust the WebSocket update frequency (default: 15 minutes) in `server.js`:
  ```javascript
  setInterval(async () => {
      const threats = await fetchRSSFeeds();
      io.emit('threatsUpdate', threats);
  }, 15 * 60 * 1000);
  ```
- **Add New Feeds** – Update the `RSS_FEEDS` array in `server.js`.

---
## Troubleshooting
#### Service Fails to Start (start-limit-hit)
Reset and restart:
```sh
sudo systemctl reset-failed cybersecurity-dashboard
sudo systemctl restart cybersecurity-dashboard
```
View logs:
```sh
sudo journalctl -u cybersecurity-dashboard --no-pager --lines=50
```

#### Port 3000 In Use
Check running processes:
```sh
sudo lsof -i :3000
```
Kill the process:
```sh
sudo kill -9 <PID>
```

#### Debug Manually
```sh
node server/server.js --trace-warnings --inspect
```

---
## Security Considerations
- **Public Server Deployment**:
  - Use **Nginx** as a reverse proxy.
  - Enable **HTTPS** with **Let’s Encrypt SSL**.
  - Restrict access to **trusted IPs**.

---
## Future Improvements
- **Email alerts** for critical advisories.
- **Historical threat data storage** (SQLite/MongoDB).
- **Custom WebSocket event notifications**.

---
## License
This project is licensed under the **MIT License**. Feel free to use, modify, and distribute it.

---
## Contributing
Want to enhance the dashboard?
1. Fork the repository.
2. Create a new branch.
3. Submit a pull request.

---
## Support & Contact
For issues or feature requests:
- Open a **GitHub issue**.
- Email: **j9allmarine17@gmail.com**

Cybersecurity Threat Dashboard

Real-time Cybersecurity News and Alerts

License: MIT

Last Updated: March 02, 2025

Tired of visiting multiple websites for the latest cybersecurity updates? The Cybersecurity Threat Dashboard is a real-time threat intelligence aggregator that consolidates security alerts, advisories, and breaking news from trusted sources into a single, user-friendly interface. Designed for cybersecurity professionals, this tool helps you stay ahead of threats and vulnerabilities with minimal effort.

Features

    Real-time Threat Updates: Fetches cybersecurity alerts and news every 15 minutes.
    Multiple Security Sources: Aggregates feeds from:
        CISA
        BleepingComputer
        SecurityWeek
        The Hacker News
        Cyber Security News
    Filtered Alerts: Displays only “CISA Releases” and “CISA Adds” advisories.
    WebSocket Support: Real-time updates without page refreshes.
    Customizable Filtering: Search articles and filter by source.
    Responsive UI: Clean, dark-themed design optimized with Bootstrap/Tailwind.
    Systemd Service: Runs continuously on a server for 24/7 monitoring.

Installation & Setup

Prerequisites

Before installing, ensure you have:

    Node.js (v16+) and npm:
    bash

sudo apt update && sudo apt install -y nodejs npm
Systemd (for server deployment):
bash

    sudo systemctl --version
    A server or local machine (Ubuntu, Debian, Windows via WSL2, or Mac).

Steps

    Clone the Repository
    bash

git clone https://github.com/j9allmarine17/Cybersecurity-Threat-Dashboard.git
cd cybersecurity-threat-dashboard
Install Dependencies
bash
npm install
Configure RSS Feeds
Feeds are preconfigured from the sources listed above. To modify or add feeds, edit server.js:
bash
nano server.js
Update the RSS_FEEDS array with your preferred RSS URLs.
Start the Server
Run in development mode:
bash

    node server/server.js
    Access the dashboard at http://localhost:3000.

Running as a Systemd Service (Production)

To run the dashboard continuously on a server:

    Create a Systemd Service File
    bash

sudo nano /etc/systemd/system/cybersecurity-dashboard.service
Add the following configuration:
ini
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
Enable and Start the Service
bash
sudo systemctl daemon-reload
sudo systemctl enable cybersecurity-dashboard
sudo systemctl start cybersecurity-dashboard
Check Service Status
bash

    sudo systemctl status cybersecurity-dashboard

Usage

    Navigate to http://localhost:3000 (or http://your-server-ip:3000 for remote access).
    Use the dropdown to filter feeds by source (CISA, SecurityWeek, etc.).
    Search keywords to find specific alerts.
    Leave the service running for continuous updates.

Customization

    Modify Refresh Interval: Adjust the WebSocket update frequency (default: 15 minutes) in server.js:
    javascript

    setInterval(async () => {
        const threats = await fetchRSSFeeds();
        io.emit('threatsUpdate', threats);
    }, 15 * 60 * 1000);
    Add New Feeds: Update the RSS_FEEDS array in server.js.

Troubleshooting

    Service Fails to Start (start-limit-hit):
    Reset and restart:
    bash

sudo systemctl reset-failed cybersecurity-dashboard
sudo systemctl restart cybersecurity-dashboard
View logs:
bash
sudo journalctl -u cybersecurity-dashboard --no-pager --lines=50
Port 3000 In Use:
Check:
bash
sudo lsof -i :3000
Kill the process:
bash
sudo kill -9 <PID>
Debug Manually:
bash

    node server/server.js --trace-warnings --inspect

Security Considerations

For public server deployment:

    Use Nginx as a reverse proxy.
    Enable HTTPS with Let’s Encrypt SSL.
    Restrict access to trusted IPs.

Future Improvements

    Email alerts for critical advisories.
    Historical threat data storage (SQLite/MongoDB).
    Custom WebSocket event notifications.

License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it.
Contributing

Want to enhance the dashboard?

    Fork the repository.
    Create a new branch.
    Submit a pull request.

Support & Contact

For issues or feature requests:

    Open a GitHub issue.
    Email: j9allmarine17@gmail.com
