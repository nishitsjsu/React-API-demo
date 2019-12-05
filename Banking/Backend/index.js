//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var multer = require("multer");
var path = require("path");
app.set("view engine", "ejs");
const bcrypt = require('bcrypt');
require("./mongoose");
var Customer = require("./Models/customer");
var Transaction = require("./Models/transaction");
var Payments = require("./Models/payments");

//use cors to allow cross origin resource sharing
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors({ origin: "http://13.58.80.223:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

app.use(cookieParser());
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Allow Access Control
app.use(function (req, res, next) {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Origin", "http://13.58.80.223:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// const user = require('./Routes/User')
// const owner = require('./Routes/Owner')
// const buyer = require('./Routes/Buyer')
// app.use(user)
// // app.use("/User", user)
// app.use(owner)
// app.use(buyer)




app.post("/createaccount", function (req, res) {
  console.log("Inside ownersignup Request");
  console.log("Req Body : ", req.body);

  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var password = req.body.password;
  var phone = req.body.phone;
  var email = req.body.email;
  var address = req.body.address;
  var age = req.body.age;
  var newAccountNum;
  var newRoutingNum;

  Customer.findOne().sort({ routingnumber: -1 }).limit(1).then((doc1) => {
    console.log(doc1.routingnumber + " " + doc1.accountnumber)
    newAccountNum = doc1.accountnumber + 1;
    newRoutingNum = doc1.routingnumber + 1;

    bcrypt.hash(req.body.password, 10, function (err, hash) {

      const customer = new Customer({
        email: email,
        password: hash,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        balance: 100,
        address: address,
        routingnumber: newRoutingNum,
        accountnumber: newAccountNum,
        age: age
      })
      console.log("object creatd " + customer)
      customer.save().then(result => {
        console.log(result);
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("Account created successfully!" + firstname + " " + lastname + ", You are Welcome to the Iron Bank of Braavos!");
      }).catch(error => {
        console.log("error occured" + error);
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Unsuccessful Signup");
      });
    });
  }).catch((e) => {
    console.log("Error in finding acc num " + e)
    res.writeHead(400, {
      "Content-Type": "text/plain"
    });
    res.end("Unsuccessful Signup");
  })


});



app.post("/login", function (req, res) {

  console.log("Inside Login Post Request");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ", req.body);


  var email = req.body.email;
  var password = req.body.password;

  Customer.findOne({ email: email }).then((doc) => {
    console.log(doc);
    if (doc.length == 0) {
      console.log(" No users found ");
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Login Unsuccessful");
    } else {
      console.log("User found")
      var name = doc.name;
      // var emailrow = row.email;
      var id = doc._id;
      var hash = doc.password;
      console.log("HAsh " + name + id + hash)

      if (bcrypt.compareSync(password, hash)) {

        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("Successful Login!");
      } else {
        console.log(" Invalid credentials found ");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Invalid credentials, Please try again");
      }
    }
  }).catch(err => {
    console.log(err)
    res.writeHead(400, {
      "Content-Type": "text/plain"
    });
    res.end("Error in Login");
  });

});

app.post("/deleteaccount", function (req, res) {
  console.log("Inside deletesectionitems Request");
  console.log("Req Body : ", req.body);

  var accountnumber = req.body.accountnumber;

  Customer.remove({ accountnumber: accountnumber }, { single: true })
    .then((doc) => {
      console.log("Successfully deleted account", doc);
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });
      res.end("Successfully deleted account");
    }).catch((e) => {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error in deleting the account");
    })
});

app.post("/transferfunds", function (req, res) {

  console.log("Inside transfer funds Request");
  console.log("Req Body : ", req.body);

  var sender = req.body.sender;
  var receiver = req.body.receiver;
  var amount = req.body.amount;
  var purpose = req.body.purpose;

  Customer.findOne({ accountnumber: sender }).then((doc) => {
    console.log("Doc " + doc + " bl" + doc.balance)
    if (doc.balance - amount > 0) {

      Customer.findOneAndUpdate({ accountnumber: sender }, { $set: { balance: doc.balance - amount } }, { new: true }).then((doc) => {
        console.log(doc.balance)

        Customer.findOne({ accountnumber: receiver }).then((doc1) => {
          console.log(doc1.balance)

          Customer.findOneAndUpdate({ accountnumber: receiver }, { $set: { balance: doc1.balance + amount } }, { new: true }).then((doc2) => {
            console.log("receiver bal " + doc2.balance)

            const transaction = new Transaction({
              sender: sender,
              receiver: receiver,
              amount: amount,
              purpose: purpose
            })
            console.log("object creatd " + transaction)
            transaction.save().then(result => {
              console.log(result);
              res.writeHead(200, {
                "Content-Type": "text/plain"
              });
              res.end("Successfully transferred the amount");
            })
          })
        })
      }).catch((e) => {
        console.log("error in update" + e)
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in transfering the amount (update)");
      })

    } else {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Cannot transfer funds, insufficient balance");
    }
  })
    .catch((e) => {
      console.log("error in fetch" + e)
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error in transfering the amount(fetch)");
    })
});

app.post("/getmax", function (req, res) {
  console.log("Inside getmax")

  Customer.findOne().sort({ routingnumber: -1 }).limit(1).then((doc1) => {
    console.log(doc1.routingnumber + " " + doc1.accountnumber)
  })

  // Customer.find({ email: "nishit" }).then((doc) => {
  //   console.log(doc)
  // })
})

app.get("/viewtransactions", function (req, res) {
  console.log("Inside viewtransactions Request");
  console.log("Req Body : ", req.query);

  var accountnumber = req.query.accountnumber;
  var now = new Date();

  Transaction.find({ accountnumber: accountnumber }, {
    date: {
      $gt: new Date(Date.now() - 1000 * 60 * 18)
    }
  })
    .then((doc) => {
      if (doc != null) {
        console.log("Successful transaction", doc);
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end(JSON.stringify(doc));
      } else {
        console.log("Successful transaction", doc);
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("No Transactions found for this account");
      }
    }).catch((e) => {
      console.log("ERr" + e)
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Unuccessful transaction");
    })
});


app.get("/searchtransaction", function (req, res) {
  console.log("Inside searchtransaction Request");
  console.log("Req Body : ", req.query);

  var sender = req.query.sender;
  var receiver = req.query.receiver;
  var now = new Date();
  Transaction.find({ accountnumber: accountnumber }, {
    date: {
      $gt: new Date(ISODate().getTime() - 1000 * 60 * 18)
    }
  })
    .then((doc) => {
      if (doc != null) {
        console.log("Successful transaction", doc);
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end(JSON.stringify(doc));
      } else {
        console.log("Successful transaction", doc);
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("No Transactions found for this account");
      }
    }).catch((e) => {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Successful transaction");
    })
});


app.post("/setpayment", function (req, res) {
  console.log("Inside setpayment Request");
  console.log("Req Body : ", req.body);

  var accountnumber = req.body.accountnumber;
  var type = req.body.type;
  var period = req.body.period
  var resMsg;

  const payments = new Payments({
    sender: req.body.sender,
    receiver: req.body.receiver,
    amount: req.body.amount,
    purpose: req.body.purpose,
    type: req.body.type,
    period: req.body.period
  })
  console.log("object creatd " + payments)
  payments.save().then(result => {

    if (period != null || period !== "") {
      resMsg = "Payment has been set up successfully for a period of !" + period
    } else {
      resMsg = "Payment has been set up successfully!"
    }

    console.log(result);
    res.writeHead(200, {
      "Content-Type": "text/plain"
    });
    res.end(resMsg);
  }).catch(error => {
    console.log("error occured" + error);
    res.writeHead(400, {
      "Content-Type": "text/plain"
    });
    res.end(resMsg);
  });

});





//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
