const http = require('http');

const request = (method, path, body) => {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: '127.0.0.1', port: 5000, path: path, method: method,
      headers: { 'Content-Type': 'application/json', 'Content-Length': data ? Buffer.byteLength(data) : 0 }
    };
    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: responseData ? JSON.parse(responseData) : {} }));
    }).on('error', reject);
    if (data) req.write(data);
    req.end();
  });
};

(async () => {
  try {
    const all = await request('GET', '/api/notes');
    if (all.body.data.length > 0) {
      const ids = all.body.data.map(n => n._id);
      console.log(`Testing bulk DELETE /api/notes/bulk with IDs: ${ids.join(', ')}`);
      const result = await request('DELETE', '/api/notes/bulk', { ids });
      console.log(`Status Code: ${result.statusCode}`);
      console.log(JSON.stringify(result.body));
    } else {
      console.log("No notes to test with");
    }
  } catch (err) {
    console.error(err);
  }
})();
