const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Success', body: req.body });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Test server running on port ${PORT}`));