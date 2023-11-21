const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

const url = 'mongodb://0.0.0.0:27017/';
const dbName = 'mydatabase';

async function connectToDatabase() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client.db(dbName);
}

app.post('/register', async (req, res) => {
  try {
    const { Loginid, Password } = req.body;
    const db = await connectToDatabase();

    // If Loginid is unique, create a new user
    await db.collection('signup').insertOne({Loginid, Password });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
