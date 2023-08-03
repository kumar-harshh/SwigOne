const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const app = express();

app.use(express.json());

// Include the path of .env file from your local system
require('dotenv').config({ path: '/Users/kumarharsh/Desktop/harshGitRepos/SwigOne/SwigOne/BackendCode/.env' });

const connection = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
});

const port = process.env.PORT || 5002;
app.listen(port, () => console.log("Listening on port: " + port));

// Create a table Restaurants using the query in SwigOneDBScript.sql
app.post('/addRestaurants', (req, res) => {
  const {
    owner_id,
    name,
    address,
    cuisine,
    contact_phone,
    contact_email,
    operating_hours,
    ratings,
    price_range,
    latitude,
    longitude,
    has_outdoor_seating,
    has_wifi,
    is_wheelchair_accessible,
    photo_url,
    tags,
  } = req.body;

  if (!name || !address || !cuisine) {
    res.status(422).json({ Warning: "Mandatory Fields Missing" });
  }
  
  // Insert the restaurant details into the database
  const sql_query = `INSERT INTO Restaurants (
    owner_id,
    name,
    address,
    cuisine,
    contact_phone,
    contact_email,
    operating_hours,
    ratings,
    price_range,
    latitude,
    longitude,
    has_outdoor_seating,
    has_wifi,
    is_wheelchair_accessible,
    photo_url,
    tags
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    owner_id,
    name,
    address,
    cuisine,
    contact_phone,
    contact_email,
    operating_hours,
    ratings,
    price_range,
    latitude,
    longitude,
    has_outdoor_seating,
    has_wifi,
    is_wheelchair_accessible,
    photo_url,
    tags,
  ];

  connection.query(sql_query, values, (err, result) => {
    if (err) {
      console.error('Error creating restaurant:', err);
      res.status(500).json({ error: 'Error creating restaurant' });
    } else {
      console.log('New restaurant added:', result);
      res.status(201).json({ message: 'Restaurant created successfully' });
    }
  });
});

// Global Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  if (!res.statusCode || res.statusCode === 200) {
    res.status(500);
  }

  res.json({ error: "Something went wrong. It's Us" });
});



