const http = require('http');

const getRequest = (path) => {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:5000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: JSON.parse(data) }));
    }).on('error', reject);
  });
};

(async () => {
  try {
    const all = await getRequest('/api/notes');
    if (all.body.data.length > 0) {
      const id = all.body.data[0]._id;
      console.log(`Testing GET /api/notes/${id}`);
      const single = await getRequest(`/api/notes/${id}`);
      console.log(`Status Code: ${single.statusCode}`);
      console.log(JSON.stringify(single.body));
    } else {
      console.log("No notes to test with");
    }
  } catch (err) {
    console.error(err);
  }
})();
