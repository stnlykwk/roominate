require('dotenv').config();

const connectionString = process.env.sqlString
const { Client } = require('pg');


const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
})

client.connect((err,res) => {
  if (err) {
    console.log("Error unable to connect to PostgreSQL Server")
    throw err;
  }
  console.log("Connected to PostgreSQL Server")
});


module.exports = {client}