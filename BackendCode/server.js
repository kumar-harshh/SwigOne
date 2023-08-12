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

//Cart Management API's

const cart = new Map();
var order_total=0;

app.post('/addToCart', (req, res) => {
    const { user_id, restaurant_id, menu_id, item_name, item_quantity, per_unit_price } = req.body;
    const cartItemID = `${restaurant_id}_${menu_id}`;

    if (cart.has(cartItemID)) {
        const existingItem = cart.get(cartItemID);
        order_total+=item_quantity * per_unit_price;
        existingItem.item_quantity += item_quantity;
    } else if (Array.from(cart.values()).some(item => item.restaurant_id === restaurant_id)) {
        order_total += item_quantity * per_unit_price;
        cart.set(cartItemID, { user_id, restaurant_id, menu_id, item_name, item_quantity, per_unit_price});
    } else {
        cart.clear();
        order_total= item_quantity * per_unit_price;
        cart.set(cartItemID, { user_id, restaurant_id, menu_id, item_name, item_quantity, per_unit_price});
    }
    const cartDetails = Array.from(cart.values());
    console.log(cartDetails)
    res.status(200).json({ cart: cartDetails, OrderTotal: order_total });
});
//Delete Items from the cart
app.delete('/removeFromCart', (req, res) => {
    const { user_id, restaurant_id, menu_id, item_quantity, per_unit_price } = req.body;
    const cartItemID = `${restaurant_id}_${menu_id}`;

    if (cart.has(cartItemID)) {
        const existingItem = cart.get(cartItemID);
        const maxQuantityToRemove = Math.min(existingItem.item_quantity, item_quantity);
        order_total -= maxQuantityToRemove * per_unit_price;
        existingItem.order_total = order_total;
        existingItem.item_quantity -= maxQuantityToRemove;

        if (existingItem.item_quantity <= 0) {
            cart.delete(cartItemID);
            // Check if there are any items left for the same restaurant, and remove the restaurant if not
            const hasItemsFromSameRestaurant = Array.from(cart.values()).some(item => item.restaurant_id === restaurant_id);
            if (!hasItemsFromSameRestaurant) {
                cart.forEach((value, key) => {
                    if (key.startsWith(`${restaurant_id}_`)) {
                        cart.delete(key);
                    }
                });
            }
        }
    }
    const cartDetails = Array.from(cart.values());
    //console.log(cartDetails);
    res.status(200).json({ cart: cartDetails, OrderTotal:order_total });
});
 
// Move order to "placed"
app.post('/placeOrder', (req, res) => {
  
      if (cart.size === 0) {
          return res.status(400).json({ Error: "Cart is empty. Cannot place an empty order." });
      }

      const cartDetails = Array.from(cart.values());
// Orders Table Structure: order_id,	user_id,	restaurant_id,	order_total,	delivery_status,	menu_id,	item_name,	item_quantity,	status, 	order_time,	delivery_time,	per_unit_price
      const placeOrderQuery = 
      `INSERT INTO Orders (user_id, restaurant_id, order_total, delivery_status, menu_id, item_name, item_quantity, status, per_unit_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          for (const item of cartDetails) {
              const { user_id, restaurant_id, menu_id, item_name, item_quantity, per_unit_price } = item;
              const order_status = 'placed'; // Set the initial order status

              connection.query(placeOrderQuery, [
                  user_id, restaurant_id, order_total, order_status,
                  menu_id, item_name, item_quantity, order_status, per_unit_price
              ], (err, results)=>{
                if (err) {
                  console.error('Error Placing Orders:', err);
                  res.status(500).json({ error: 'Error Placing Orders' });
                }
              });
              setTimeout(()=>{},2000);
          }

          // Clear the cart after placing the order
          res.status(200).json({Message: "Orders Placed", Details: cartDetails, OrderTotal: order_total})
          cart.clear();
          order_total = 0;   
        });

  
// Implementation to get all orders
app.get('/getAllOrders', (req, res) => {
  const { rest_id, user_id } = req.query;
    let getAllOrdersQuery = 'SELECT * FROM Orders';

    if (rest_id) {
      getAllOrdersQuery += ` WHERE restaurant_id = ${restaurant_id}`;
    } else if (user_id) {
      getAllOrdersQuery += ` WHERE user_id = ${user_id}`;
    }
    //console.log(getAllOrdersQuery)
  connection.query(getAllOrdersQuery, (err, results)=>{
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ Error: "Error Fetching Orders" });
  } else {
      if(results.length===0)
        res.status(200).json({ Message: "No Orders Found" });
      else
        res.status(200).json({ TotalOrders: results.length, Orders: results});
  }
  });

});

// Implementation to check order status
app.get('/checkOrderStatus/:orderId', (req, res) => {
  const order_id=req.params.orderId
  const checkOrderStatusQuery='SELECT status FROM ORDERS WHERE order_id=?'
  connection.query(checkOrderStatusQuery,[order_id], (err,results)=>{
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ Error: "Error Fetching Order Status" });
  } else {
      res.status(200).json({ OrderStatus: results[0].status });
  }
  });   
});
  
// Implementation to mark order as "on the way"
app.put('/markOrderOnTheWay/:orderId', (req, res) => {
  const order_id = req.params.orderId;
  connection.query('UPDATE Orders SET status = "on_the_way" WHERE order_id = ?', [order_id], (err, results) => {
      if (err) {
          console.error("Error:", err);
          res.status(500).json({ Error: "Error Updating the Order Status" });
      } else {
          res.status(200).json({ Message: "Order Updated" });
      }
  });
});

// Implementation to mark order as "delivered"
app.put('/markOrderDelivered/:orderId', (req, res) => {
  const order_id = req.params.orderId;
  connection.query('UPDATE Orders SET status = "delivered" WHERE order_id = ?', [order_id], (err, results) => {
      if (err) {
          console.error("Error:", err);
          res.status(500).json({ Error: "Error Updating the Order Status" });
      } else {
          res.status(200).json({ Message: "Order Updated" });
      }
  });
});
  