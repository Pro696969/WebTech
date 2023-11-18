const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

const url = "mongodb://0.0.0.0:27017/";
const dbName = 'mydatabase';

async function connectToDatabase() {
  const client = new MongoClient(url);
  await client.connect();
  return client.db(dbName);
}

app.post('/register', async (req, res) => {
  try {
    const { Name, Phone, Email, Loginid, Password, ConfirmP } = req.body;
    const db = await connectToDatabase();

    // Check if the Loginid already exists
    const existingUser = await db.collection('users').findOne({ Loginid });

    if (existingUser) {
      return res.json({ success: false, message: 'Login ID already exists. Please choose a different one.' });
    }

    // If Loginid is unique, create a new user
    await db.collection('users').insertOne({ Name, Phone, Email, Loginid, Password, ConfirmP });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
