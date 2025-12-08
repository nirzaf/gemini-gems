/**
 * Mock API Server for Local Development
 *
 * This is a simple Node.js server that simulates the global copy counter API
 * for local testing. In production, you should use a proper serverless function
 * (see API_SETUP.md for options).
 *
 * Usage:
 *   1. Run: node mock-api-server.js
 *   2. Set in .env: PUBLIC_COPY_API_URL=http://localhost:3001/api/copy
 *   3. The server will store counts in public/copy-stats.json
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const statsFile = path.join(__dirname, 'public', 'copy-stats.json');

// Ensure stats file exists
if (!fs.existsSync(statsFile)) {
  fs.writeFileSync(statsFile, '{}', 'utf8');
}

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  // POST - increment copy count
  if (req.method === 'POST' && req.url === '/api/copy') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { slug } = JSON.parse(body);

        if (!slug) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Missing slug' }));
        }

        // Read current stats
        const stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));

        // Increment count
        stats[slug] = (stats[slug] || 0) + 1;

        // Save stats
        fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2), 'utf8');

        console.log(`✓ Incremented copy count for "${slug}" to ${stats[slug]}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ slug, count: stats[slug] }));
      } catch (error) {
        console.error('Error processing POST:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });

    return;
  }

  // GET - fetch all copy counts
  if (req.method === 'GET' && req.url === '/api/copy') {
    try {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(stats));
    } catch (error) {
      console.error('Error processing GET:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }

    return;
  }

  // 404 for other routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║  Mock Copy Counter API Server                      ║');
  console.log('╚════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`  Running at: http://localhost:${PORT}`);
  console.log('');
  console.log('  Endpoints:');
  console.log('    POST /api/copy  - Increment copy count');
  console.log('    GET  /api/copy  - Fetch all counts');
  console.log('');
  console.log(`  Stats file: ${statsFile}`);
  console.log('');
  console.log('  Press Ctrl+C to stop');
  console.log('');
});
