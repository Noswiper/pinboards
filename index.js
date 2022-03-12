const http = require('http');
const mysql = require("mysql");
const express = require('express');
var bcrypt = require('bcrypt');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

const hostname = '70.160.105.99';
const port = 5000;


var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(express.static(__dirname+'/public'));

app.use('/images', express.static('images'));

app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/register', function(request, response) {
	response.sendFile(path.join(__dirname + '/registration.html'));
});




app.get('/system2', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/system2.html'));
});


app.get('/system3', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/system3.html'));
});


app.get('/systemselection', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/systemselection.html'));
});

app.get('/images/system1', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/system1.html'));
});



var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
    database: "pinboards",
})

con.connect(function(err) {
    if (err) throw err;
    console.log("connected to mysql");
    con.query("CREATE DATABASE IF NOT EXISTS pinboards", function (err, result) {
        if (err) throw err;
        console.log("database pinboards connected");
    });
});


var employees = "CREATE TABLE IF NOT EXISTS employees (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, username varchar(255) NOT NULL, password varchar(255) NOT NULL)";
con.query(employees, function (err, result) {
    if (err) throw err;
    console.log("users table connected");
})

var system1 = "CREATE TABLE IF NOT EXISTS system1 (valve varchar(255) NOT NULL PRIMARY KEY, status varchar(255) NOT NULL, username varchar(255) NOT NULL)";
con.query(system1, function (err, result) {
    if (err) throw err;
    console.log("system1 table connected");
})

app.get('/getabc1', function(req, res) {
    let sql = "SELECT * FROM system1 WHERE valve = 'abc1'"
    con.query (sql, (error, results) => {
        if (error) throw error;
        console.log(results);
        res.send(results);
    })
})

app.get('/getabc2', function(req, res) {
    let sql = "SELECT * FROM system1 WHERE valve = 'abc2'"
    con.query (sql, (error, results) => {
        if (error) throw error;
        console.log(results);
        res.send(results);
    })
})

app.get('/getabc3', function(req, res) {
    let sql = "SELECT * FROM system1 WHERE valve = 'abc3'"
    con.query (sql, (error, results) => {
        if (error) throw error;
        console.log(results);
        res.send(results);
    })
})

app.get('/system1', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/system1.html'));
    });

app.get('/sketchpad', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/sketchpadsystem.html'));
    });

app.get('/system1valves', async (req, res) => {
    let sql = "SELECT * FROM system1"
    con.query (sql, (error, results, fields) => {
        if (error) throw error;
        console.log(results);
        res.send(results);
    })
})

//LOGIN (AUTHENTICATE USER)
app.post("/login", async (req, res)=> {
    const username = req.body.username
    const password = req.body.password
    const sqlSearch = "Select * from employees where username = ?"
    const search_query = mysql.format(sqlSearch,[username])

     await con.query (search_query, async (err, result) => {
      
      if (err) throw (err)
      if (result.length == 0) {
       console.log("--------> User does not exist")
       res.sendStatus(404)
      } 
      else {
         const hashedPassword = result[0].password
         //get the hashedPassword from result
        if (await bcrypt.compare(password, hashedPassword)) {
        console.log("---------> Login Successful")
	    res.redirect('/systemselection');
        } 
        else {
        console.log("---------> Password Incorrect")
        res.send("Password incorrect!")
        } //end of bcrypt.compare()
      }//end of User exists i.e. results.length==0
     }) //end of connection.query()
    }) //end of app.post()

app.post("/savesystem1", async (req,res) => {
    console.log(req.body);
    const username = req.body.username;
    const status = req.body.status;
    const valve = req.body.valve;
    const sqlSearch = "SELECT * FROM system1 WHERE valve = ?"
    const search_query = mysql.format(sqlSearch,[valve])
    const sqlInsert = "INSERT INTO system1 VALUES (?,?,?)"
    const insert_query = mysql.format(sqlInsert,[valve, status, username])
    const sqlUpdate = "UPDATE `system1` SET `status` = ?, `username` = ? WHERE `valve`= ?"
    const update_query = mysql.format(sqlUpdate,[status, username, valve])
    await con.query (search_query, async (err, result) => {
        if (err) throw (err)
        console.log("search results")
        console.log(result.length)
        if (result.length == 0) {
            console.log("valve not found: " + valve)
            console.log("creating new line")
            await con.query (insert_query, (err, result) => {
                if (err) throw (err)
                console.log ("Created new valve " + valve)
                console.log(result.insertId)
                res.redirect("/system1")
            })
        } else {
            console.log("initiating update")
            await con.query (update_query, (err, result, row, fields) => {
                if (err) throw (err)
                console.log ("Updating valve " + valve)
                console.log(result)
                console.log(row)
                res.redirect("/system1")
            })
        }
    })   // end of con.query
}); // end of app.post

app.post("/register", async (req,res) => {
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password,10);
     const sqlSearch = "SELECT * FROM employees WHERE username = ?"
     const search_query = mysql.format(sqlSearch,[username])
     const sqlInsert = "INSERT INTO employees VALUES (0,?,?)"
     const insert_query = mysql.format(sqlInsert,[username, hashedPassword])
     // ? will be replaced by values
     // ?? will be replaced by string
     await con.query (search_query, async (err, result) => {
      if (err) throw (err)
      console.log("------> Search Results")
      console.log(result.length)
      if (result.length != 0) {
       console.log("------> User already exists: " + username)
       res.sendStatus(409) 
      } 
      else {
       await con.query (insert_query, (err, result)=> {
       if (err) throw (err)
       console.log ("--------> Created new User: " + username)
       console.log(result.insertId)
       res.sendStatus(201)
      })
     }
    }) //end of con.query()
    }) //end of app.post()




app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(port, () => {
    console.log("server running on port 5000");
})