const http = require('http');

const request = (method, path, body) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const options = {
      hostname: '127.0.0.1', port: 5000, path: path, method: method,
      headers: { 'Content-Type': 'application/json', 'Content-Length': data ? Buffer.byteLength(data) : 0 }
    };
    console.log(`Requesting ${method} ${path}...`);
    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try {
          resolve({ statusCode: res.statusCode, body: responseData ? JSON.parse(responseData) : {} });
        } catch (e) {
          console.error('Failed to parse response:', responseData);
          reject(e);
        }
      });
    }).on('error', reject);
    if (body) req.write(data);
    req.end();
  });
};

(async () => {
  try {
    const all = await request('GET', '/api/notes', null);
    if (all.body.data.length > 0) {
      const id = all.body.data[0]._id;
      console.log(`Testing PUT /api/notes/${id}`);
      const replacement = {
        title: "Completely new title",
        content: "Completely new content",
        category: "personal",
        isPinned: false
      };
      const result = await request('PUT', `/api/notes/${id}`, replacement);
      console.log(`Status Code: ${result.statusCode}`);
      console.log(JSON.stringify(result.body));
    } else {
      console.log("No notes to test with");
    }
  } catch (err) {
    console.error(err);
  }
})();
