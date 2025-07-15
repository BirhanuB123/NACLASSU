// This is the entry point for Render
const path = require('path');

// Log the current working directory
console.log('Current working directory:', process.cwd());

// Try to require the built server file
const serverPath = path.join(__dirname, 'backend', 'dist', 'index.js');
console.log('Looking for server at:', serverPath);

// Import and start the server
require(serverPath);
