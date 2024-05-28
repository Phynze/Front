const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use the CORS middleware

// Database connection
const url = 'mongodb+srv://pxnst:<password>@pxnst.ksrqfv5.mongodb.net/?retryWrites=true&w=majority&appName=Pxnst';
const dbName = 'your_database_name';
let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) return console.error(err);
  console.log('Connected to Database');
  db = client.db(dbName);
});

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.collection('users').insertOne({ username, password: hashedPassword });
    res.status(201).send(`User created with ID: ${result.insertedId}`);
  } catch (err) {
    console.error('Error registering new user:', err);
    res.status(500).send('Error registering new user');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(400).send('Invalid username or password');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send('Invalid username or password');
    }

    res.status(200).send('Login successful');
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Error logging in');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
