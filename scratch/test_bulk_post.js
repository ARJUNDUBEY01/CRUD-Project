const http = require('http');

const data = JSON.stringify({
  notes: [
    { title: "Note one",   content: "Content one",   category: "work"     },
    { title: "Note two",   content: "Content two",   category: "study"    },
    { title: "Note three", content: "Content three", category: "personal" }
  ]
});

const options = {
  hostname: 'localhost', port: 5000, path: '/api/notes/bulk', method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': data.length }
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  res.on('data', (d) => process.stdout.write(d));
});

req.on('error', (error) => console.error(error));
req.write(data);
req.end();
