if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = process.env.URI_MONGO;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  
  // // Connection URL
  // const url = 'mongodb://localhost:27017';
  // const client = new MongoClient(url);
  
  // Database Name
  const dbName = 'gomank';
  let db
  
  async function connection() {
      try {
          await client.connect();
          console.log('Connected successfully to server');
          db = client.db(dbName);
      } catch (error) {
          console.log(`Error connecting to the database. \n${error}`);
      }
  }
  
  const getData =() => {
      return db
  }
  
  module.exports = {connection, getData, client};