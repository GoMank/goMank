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


[
    {
        "id": 1,
        "invoiceNumber": "INV-00-04-2022",
        "price": 50000,
        "orderStatus": "Received",
        "paymentMethod": "Cash",
        "paymentStatus": "Unpaid",
        "clientId": 1,
        "clientName": "Ujang Kujang",
        "mamangId": 1,
        "mamangName": "Mang Ganteng Maut",
        "address": "Latitude -6.914744 Longitude 107.107.609811",
        "createdAt": "2022-04-17T07:49:38.267Z",
        "updatedAt": "2022-04-17T07:49:38.267Z",
        "Logs": [
            {
                "id": 1,
                "orderId": 1,
                "description": "Order ID: 1 have been created",
                "type": "Created",
                "createdAt": "2022-04-17T07:49:38.285Z",
                "updatedAt": "2022-04-17T07:49:38.285Z"
            }
        ]
    }
]