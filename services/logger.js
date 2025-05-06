const fs = require('fs');
const os = require('os');
const path = require('path');

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const logFile = path.join(logDir, 'system.log');
function logMessage(message) {
    const time = new Date().toISOString();
    const user = os.userInfo().username;
    const fullMessage = `[${time}] [${user}] ${message}\n`;
    fs.appendFileSync(logFile, fullMessage);
}

logMessage('Start execution:');