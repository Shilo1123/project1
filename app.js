const express = require("express");
const app = express();
const path = require("path");
const mysql2 = require('mysql2');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');


const {connection, knex} = require("./connection")

//to test the connection.
connection.connect((err)=>{
  if (err) {
      console.log(err);
  } else {
      console.log("connected to the database");
  }
})

//layouts setup
const ejsLayout = require("express-ejs-layouts");
app.use(ejsLayout);


// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



//to use public folder for the files
app.use(express.static('public'))

let isLoggedIn = 0;

//ejs 
app.get("/login", (req, res)=> {
  const username = req.query.username
  const password = req.query.password
  const isLoggedIn = checkLogin(username, password)
  if (isLoggedIn) {
    res.cookie("isLoggedIn", "1")
    res.redirect("/flights")
  }
  res.render("login")
});

//ejs second 
app.get("/ejs2", (req, res)=> {
  res.render("signup")
});

//ejs third 
app.get("/flights", (req, res)=> {
const cookies = req.cookies
const isLoggedIn = cookies.isLoggedIn
res.render("flights", {"isLoggedIn": isLoggedIn})
});

//ejs four
app.get("/ejs4", (req, res)=> {
  res.render("Services")
});


//ejs six
app.get("/ejs5", (req, res)=> {
  res.render("Contant")
});


//ejs seven
app.get("/ejs6", (req, res)=> {
  res.render("goog")
});



//adding bodyparser to express
const bodyParser = require("body-parser");
const { parseArgs } = require("util");
app.use(bodyParser.json());


//add country by query
// const addCountry = (newCountry) => {
//   connection.query("insert into countries (Name) values (?) ", [newCountry.Name], (err,result)=> {
//       if (err) {
//            console.log(err);
//       } else {
//           console.log(result);
//       }
//   })
// }


// app.post("/api/addCountry", (req,res) => {
//   const newCountry = req.body //get the new json country
//   addCountry(newCountry)
//   res.send("finished")
// })



//   const getAirline_Companies = ()=>{
//   connection.query("SELECT * FROM airline_companies", (err, rows) => {
//     if (err) {
//       console.log(err);
//       process.exit(1);
//     }
//  // Print all records
//     for (const row of rows) {
//       console.log(row);
//     }
//   });
//   }


// const getAdminstrators = ()=> {
// connection.query("SELECT * FROM adminstrators", (err, rows) => {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }
// // Print all records
//   for (const row of rows) {
//     console.log(row);
//   }
// });
// }


// const getAirline_Companies = ()=> {
// connection.query("SELECT * FROM airline_companies", (err, rows) => {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }
// // Print all records
//   for (const row of rows) {
//     console.log(row);
//   }
// });
//}

//   const getCustomer= ()=> {
//   onnection.query("SELECT * FROM customer", (err, rows) => {
//     if (err) {
//       console.log(err);
//       process.exit(1);
//     }
//  // Print all records
//     for (const row of rows) {
//       console.log(row);
//     }
//   });
//   }

//   const getFlights = ()=> {
//   connection.query("SELECT * FROM flights", (err, rows) => {
//     if (err) {
//       console.log(err);
//       process.exit(1);
//     }
//  // Print all records
//     for (const row of rows) {
//       console.log(row);
//     }
//   });
//     }

// const AddReccordAdminstrators = ()=> {
// Insert a new record into the `users` table
// const data = {
//   Id: "3",
//   First_Name: "John",
//   Last_Name: "gfgf",
//   User_Name: "Shilat",
//   password: 'sdsd',
// };
// connection.query("INSERT INTO adminstrators (Id, First_Name, Last_Name, User_Name, password ) VALUES (?, ?, ?, ?, ?)", [data.Id, data.First_Name, data.Last_Name, data.User_Name, data.password], (err, result) => {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }
//   console.log("Record inserted successfully");
// });
// }
    
  // const getIdAirlineById = (Id)=> {
  // const query2 = `select * from  airline_companies where Id = $(Id)`
  // connection.query2(query2, (err, result) => {
  //   if (err) {
  //     console.log("error in database " + err );
  //   } else {
  //     console.log(result);
  //   }
  // })
  // }

  // const getIdCountriesById = ()=> {
  // var Id = 1;
  // connection.query(`SELECT * FROM countries WHERE Id = ${id}`, (err, rows) => {
  //   if (err) {
  //     console.log(err);
  //     process.exit(1);
  //   }
  //   // Print all records
  //   for (const row of rows) {
  //     console.log(row);
  //   }
  // });
  // }

  // const getIdFlightsById = ()=> {
  // var Id = 1;
  // connection.query(`SELECT * FROM flights WHERE Id = ${id}`, (err, rows) => {
  //   if (err) {
  //     console.log(err);
  //     process.exit(1);
  //   }
  //   // Print all records
  //   for (const row of rows) {
  //     console.log(row);
  //   }
  // });
  // }


// const removeAdminstrators = ()=> {
//  Delete all records from the `users` table
//  connection.query("DELETE FROM adminstrators", (err, result) => {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }
//   console.log("All records deleted successfully");
// });
// }


const checkLogin = (username, password) => {
  const userFromDB = "Shilo"
  const passwordFromDB = "Musay123"
  if (username && username == userFromDB && password && password == passwordFromDB) {
    return true
  }
  return false
}

const port = 3000;
app.listen(port, ()=> {
    console.log("server listening on port: " + port);
})