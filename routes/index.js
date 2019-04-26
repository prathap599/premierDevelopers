var express = require('express');
var router = express.Router();
let dbconfig = require('./database');
let mysql = require('mysql');

/* GET home page. */
router.get('/', function (req, res, next) {
  let vis = req.query.valid != undefined ? 'solid' : 'none';
  let subs = req.query.subscription == undefined || req.body.subscription ? "black": 'red'
  // let vis = req.query.valid;
  console.log(req.query.valid);
  res.render('index', { title: 'PropTrading', visible: vis, subscription : subs });
});

router.get('/index', function (req, res, next) {
  res.render('index', { title: 'PropTrading' });
});


router.get('/about', function (req, res, next) {
  res.render('about', { title: 'PropTrading' });
});

router.get('/working', function (req, res, next) {
  res.render('howitworks', { title: 'PropTrading' });
});

router.get('/projects', function (req, res, next) {
  res.render('projects', { title: 'PropTrading' });
});

router.get('/login', function (req, res, next) {
  let vis = req.query.valid || req.query.valid != undefined ? 'solid' : 'none';
  // let vis = req.query.valid;
  console.log(req.query.valid);
  res.render('login', { title: 'PropTrading', valid: vis });
});

router.post('/subscribe', function (req, res, next) {
  let connection = mysql.createConnection(dbconfig.connection);
  connection.query('USE ' + dbconfig.database);
  // save the data in db
  // if save is done then redirect to index
  console.log(req.body);
  let sql = "INSERT INTO " + dbconfig.tables.subscription + " (contact_number) VALUES ('" + req.body.contact + "')";

  connection.query(sql, function (err, result) {
    // Pausing the connnection is useful if your processing involves I/O
    connection.pause();
    if (err) {
      // error happen
      console.log(err);
      res.redirect('/?subscription=false');
    }
    else {
      res.redirect('/?valid=true');
    }
  });
  connection.on('error', function(err) {
    console.log("[mysql error]",err);
  });
  connection.end();
});



router.get('/signup', function (req, res, next) {
  let vis = req.query.valid || req.query.valid != undefined ? 'solid' : 'none';
  // let vis = req.query.valid;
  console.log(req.query.valid);
  res.render('login', { title: 'PropTrading', valid: vis });
});

router.post('/auth', function (req, res, next) {
  let connection = mysql.createConnection(dbconfig.connection);
  connection.query('USE ' + dbconfig.database);
  // save the data in db
  // if save is done then redirect to index
    let sql = "";
    if (req.body.login) {
      // login form is submitted
      sql = "select * from "+ dbconfig.tables.users_table+" where email='"+req.body.email +"' && password '"+req.body.password+"';"
    } else {
      sql = "INSERT INTO " + dbconfig.tables.users_table + " (email, password, proj, contact, comment) VALUES ('" + req.body.email + "','" + req.body.password + "','" + req.body.investment + "','" + req.body.tel + "','" + req.body.comments + "')";
    }
    connection.query(sql, function (err, result) {
      // Pausing the connnection is useful if your processing involves I/O
      connection.pause();
      if (err) {
        // error happen
        console.log(err);
        res.redirect('/login?valid=false');
      }
      else {
        res.redirect('/?valid=true');
      }
    });
    connection.on('error', function(err) {
      console.log("[mysql error]",err);
    });
  connection.end();
});



module.exports = router;
