const mysql2 = require('mysql2')


//connet to DB
const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: "nydb"
});



const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : 'admin',
      database : 'nyd'
    }
  });


  module.exports = {
    connection,
    knex
  }