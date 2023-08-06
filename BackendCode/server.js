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
  //name, address, cuisine, phone, email, operating, latitude, longitude, has_outdoor, has_wifi, is_wheelchair_accessible,tags
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

app.delete('/deleteRestaurant/:id',(req, res)=>{
    const restaurantID=req.params.id;
    const deleteQuery='DELETE FROM Restaurants WHERE restaurant_id=?'
    connection.query(deleteQuery, [restaurantID], (err, result)=>{
        if (err) {
            console.error('Error Deleting restaurant:', err);
            res.status(500).json({ error: 'Error Deleting restaurant' });
          } else {
            console.log('Restaurant Deleted:', result);
            res.status(201).json({ message: 'Restaurant Deleted successfully' });
          }
    });
});

app.get('/getRestaurants',(req,res)=>{
    const isAdmin = req.query.admin === 'true';
    const { owner_id } = req.query;
    console.log(owner_id)

    let getQuery = 'SELECT * FROM Restaurants';
    if (isAdmin && owner_id) {
      // If admin=true and user_id is provided, filter by user_id
      getQuery += ' WHERE owner_id = ?';
    }
    connection.query(getQuery, [owner_id], (err, results)=>{
        console.log(getQuery)
        if (err) {
            console.error('Error fetching Restaurant:', err);
            res.status(500).json({ error: 'Error fetching Restaurants' });
          } else {
            console.log('All Restaurants:', results);
            res.json(results);
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



