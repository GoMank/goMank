const { MongoClient } = require('mongodb');

// const url = 'mongodb://localhost:27017';
const url = process.env.MONGOURL;
const client = new MongoClient(url);

const dbName = 'challange2DB';
let db

async function connectMongoDb() {
    await client.connect();
    console.log('Connected successfully to server');
    db = client.db(dbName);
}

// async function closeClient(){
//     await client.close()
// }

function getDataBase(){
    return db
}

module.exports = {connectMongoDb,getDataBase}
