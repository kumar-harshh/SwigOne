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
    const { name, address, cuisine, contact_phone, contact_email, operating_hours, ratings, price_range, latitude, longitude, has_outdoor_seating, has_wifi, is_wheelchair_accessible, photo_url, tags } = req.body;
    if (!name || !address || !cuisine) {
      return res.status(422).json({ Warning: "Mandatory Fields Missing" });
    }
    const sql_query = `INSERT INTO Restaurants (name, address, cuisine, contact_phone, contact_email, operating_hours, ratings, price_range, latitude, longitude, has_outdoor_seating, has_wifi, is_wheelchair_accessible, photo_url, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, address, cuisine, contact_phone, contact_email, operating_hours, ratings, price_range, latitude, longitude, has_outdoor_seating, has_wifi, is_wheelchair_accessible, photo_url, tags];
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
    console.log(getQuery)

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

app.put('/editRestaurantDetails/:id',(req, res)=>{
    const restaurantID=req.params.id
    const { name, address, cuisine, contact_phone, contact_email, operating_hours, price_range, latitude, longitude, has_outdoor_seating, has_wifi, is_wheelchair_accessible, photo_url, tags } = req.body;
    const updateQuery = `UPDATE Restaurants SET name=?, address=?, cuisine=?, contact_phone=?, contact_email=?, operating_hours=?, price_range=?, latitude=?, longitude=?, has_outdoor_seating=?, has_wifi=?, is_wheelchair_accessible=?, photo_url=?, tags=? WHERE restaurant_id=?`;
    const values = [name, address, cuisine, contact_phone, contact_email, operating_hours, price_range, latitude, longitude, has_outdoor_seating, has_wifi, is_wheelchair_accessible, photo_url, tags, restaurantID];
    connection.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error('Error Updating restaurant:', err);
        res.status(500).json({ error: 'Error Updating restaurant' });
      } else {
        console.log('Restaurant Updated:', result);
        res.status(201).json({ message: 'Restaurant Updated successfully' });
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

app.get('/getDish', (req, res) => {
  connection.query('SELECT * FROM Menu', (err, results) => {
    if (err) {
      console.error('Error fetching Menu:', err);
      res.status(500).json({ error: 'Error fetching Menu' });
    } else {
      console.log('All Menu:', results);
      res.json(results);
    }
  });
});
app.post('/addDish', (req, res)=>{
  const { restaurant_id, item_name, price}=req.body;
  const addDishQuery= 'INSERT INTO Menu (restaurant_id, item_name, price) VALUES (?, ?, ?)'
  connection.query( addDishQuery, [restaurant_id, item_name, price],(err, result) => {
      if (err) {
        console.error('Error creating Dish in the Menu:', err);
        res.status(500).json({ error: 'Error creating Dish in the Menu' });
      } else {
        console.log('New Dish added:', result.insertId);
        res.status(201).json({ message: 'Dish Added successfully' });
      }
    }
  );
});
// 
app.delete('/api/menu/:restaurant_id/:menu_id', (req, res) => {
  const restaurantId = req.params.restaurant_id;
  const menuId = req.params.menu_id;

  const deleteQuery = 'DELETE FROM Menu WHERE restaurant_id = ? AND menu_id = ?';
  connection.query(deleteQuery, [restaurantId, menuId], (err, result) => {
    if (err) {
      console.error('Error deleting item:', err);
      res.status(500).json({ error: 'Error deleting item' });
    } else {
      console.log('item deleted:', result.affectedRows);
      res.json({ message: 'Item deleted successfully' });
    }
  });
});

app.put('/editDish', (req, res)=>{

  const {item_name, price, restaurant_id, menu_id}= req.body;
  const updateQuery='UPDATE Menu SET item_name = ?, price = ? WHERE restaurant_id = ? AND menu_id = ?';
  connection.query(updateQuery, [item_name, price, restaurant_id, menu_id], (err, result)=>{
    if (err) {
      console.error('Error Updating item:', err);
      res.status(500).json({ error: 'Error Updating item' });
    } else {
      console.log('Item Updated:', result.affectedRows);
      res.json({ message: 'Item Updated successfully' });
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