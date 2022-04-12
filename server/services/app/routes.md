// server nich
// mamangs
app.get('/mamangs'); // get all mamangs
app.post('/mamangs/register'); // create mamang
app.post('/mamangs/login'); // create mamang
app.get('/mamangs/:id'); // get mamang by id
app.patch('/mamangs/:id'); // update location mamang
app.delete('/mamangs/:id'); // delete mamang

// client
app.get('/clients'); // get all clients
app.get('/client/:id'); // get client by id
app.post('/client/register'); // create client
app.post('/client/login'); // create client

// history
app.get('/history'); // get all history
app.get('/histories/:UserMongoId'); // get history by id
app.get('/histories/:MamangMongoId'); // get all history

// order
app.get('/orders'); // get all orders
app.get('/orders/:UserMongoId'); // get orders by user id
app.get('/orders/:MamangMongoId'); // get orders by mamang id
app.post('/orders'); // create order by user -> user mesen cuci mobil -> mamang terdekat? atau list?
app.patch('/orders/:UserMongoId'); // update order by user -> cancel
app.patch('/orders/:MamangMongoId'); // update order by mamang -> / done