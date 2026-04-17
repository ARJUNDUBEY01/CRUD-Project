const http = require('http');

const data = JSON.stringify({
  title: "Team standup agenda",
  content: "Discuss sprint blockers and deployment plan",
  category: "work",
  isPinned: true
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/notes',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
