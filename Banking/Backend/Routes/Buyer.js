var express = require('express');
var app = express();
var router = express.Router();
//var pool = require('../Db/Connections').pool;
//var cont = require('../Db/Connections').cont;
var upload = require('../Image/UploadImage').upload;
var storage = require('../Image/UploadImage').storage;
var Section = require("../Models/section")
var Item = require("../Models/items")
var Owner = require("../Models/owner")
var Cart = require("../Models/cart")
var Order = require("../Models/orders")
var Orderdetails = require("../Models/orderdetails")
var Message = require("../Models/message")
const mongoose = require("mongoose")
const kafka = require('../kafka/client');
const passport = require("passport");
require('../config/passport')(passport)
app.use(passport.initialize());

// router.get("/viewrestaurants", function (req, res) {
//     console.log("Inside viewrestaurants");
//     sql = `select id,restaurantname, restaurantimage, cuisine from owner where id in (select ownerid from items where name ="${req.query.itemname}")`;

//     console.log("SQL: " + sql);

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 console.log("Inside 200 response")
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 console.log(JSON.stringify(result))
//                 res.end(JSON.stringify(result));
//             }
//         });
//         db.release()
//     });
// });


router.get("/viewrestaurants", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside viewrestaurants");

    kafka.make_request('viewrestaurants', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful viewrestaurants");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful viewrestaurants");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });

    // var itemname = req.query.itemname

    // Item.find({ name: itemname }).then((doc) => {
    //     console.log("view rest success" + doc)
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end(JSON.stringify(doc));
    // }).catch((err) => {
    //     console.log(err);
    //     console.log("Inside 400 response")
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end("Error in view rest");
    // });

});

// router.get("/buyersection", function (req, res) {
//     console.log("Inside BuyerSection");

//     sql = `select * from sections where ownerid=${req.query.restaurantid}`;
//     console.log("SQL: " + sql);

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 console.log("Inside 200 response")
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 //console.log(JSON.stringify(resultObject))
//                 res.end(JSON.stringify(result));
//             }
//         });
//         db.release()
//     });
// });

router.get("/buyersection", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside BuyerSection");

    kafka.make_request('buyersection', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful buyersection");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful buyersection");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });


    // Section.find({ ownername: req.query.restaurantid }).then((doc) => {
    //     console.log("buyersection success" + doc)
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end(JSON.stringify(doc));
    // }).catch((err) => {
    //     console.log(err);
    //     console.log("Inside 400 response")
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end("Error in buyersection");
    // });
});



// router.get("/sectiondetailsbuyer", function (req, res) {
//     console.log("Inside Section Details buyer");

//     sql = `select * from items where sectionid =${req.query.sectionid} and ownerid=${req.query.ownerid} `;
//     console.log("SQL: " + sql);

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 console.log("Inside 200 response")
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 console.log(JSON.stringify(result))
//                 res.end(JSON.stringify(result));
//             }
//         });
//         db.release()
//     });


// });


router.get("/sectiondetailsbuyer", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside Section Details buyer");

    kafka.make_request('sectiondetailsbuyer', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful sectiondetailsbuyer");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful sectiondetailsbuyer");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });

    // Item.find({ owneremail: req.query.ownername, sectionname: req.query.sectionname }).then((doc) => {
    //     console.log("sectiondetailsbuyer success" + doc)
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end(JSON.stringify(doc));
    // }).catch((err) => {
    //     console.log(err);
    //     console.log("Inside 400 response")
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end("Error in sectiondetailsbuyer");
    // });
});


// router.post("/addtocart", function (req, res) {
//     console.log("Inside Add to cart Request");
//     console.log("Req Body : ", req.body);

//     var itemid = req.body.itemid;
//     var name = req.body.itemname;
//     var price = req.body.itemprice;
//     var quantity = req.body.quantity;
//     var idcookie = req.body.idcookie;

//     sql = `insert into cart (itemid,itemname,quantity,price,buyerid) values (${itemid},'${name}','${quantity}','${price}',${idcookie})`;
//     //sql="Select name,email from " + radio + " where password="' + password + '";
//     console.log("SQL: " + sql);

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 res.end("Item added successfully");
//             }
//         });
//         db.release()
//     });
// });

router.post("/addtocart", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside Add to cart Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('addtocart', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful addtocart");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful addtocart");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful addtocart");
            }
        }

    });


    // var itemid = req.body.itemid;
    // var name = req.body.itemname;
    // var price = req.body.itemprice;
    // var quantity = req.body.quantity;
    // var idcookie = req.body.idcookie;
    // var emailcookie = req.body.emailcookie;
    // var owneremail = req.body.owneremail;
    // var restaurant = req.body.restaurant;

    // const cart = new Cart({
    //     _id: mongoose.Types.ObjectId(),
    //     itemname: name,
    //     quantity: quantity,
    //     price: price,
    //     itemid: itemid,
    //     buyeremail: emailcookie,
    //     owneremail: owneremail,
    //     restaurant: restaurant
    // })
    // console.log("object creatd " + cart)
    // cart.save().then(result => {
    //     console.log("Item added to the cart successfully " + result);
    //     res.writeHead(200, {
    //         'Content-Type': 'text/plain'
    //     })
    //     res.end(JSON.stringify(req.file))
    // }).catch(error => {
    //     console.log("error occured" + error);
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end("Unsuccessful add item to cart");
    // });
});



// router.get("/viewcart", function (req, res) {
//     console.log("Inside View Cart");
//     var idCookie = req.query.idcookie

//     sql = `select * from cart where buyerid=${idCookie}`;
//     console.log("SQL: " + sql);

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 console.log("Inside 200 response")
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 //console.log(JSON.stringify(resultObject))
//                 res.end(JSON.stringify(result));
//             }
//         });
//         db.release()
//     });
// });


router.get("/viewcart", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside View Cart");

    kafka.make_request('viewcart', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful viewcart");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful viewcart");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });

    // var idCookie = req.query.idcookie;
    // var emailcookie = req.query.emailcookie

    // Cart.find({ buyeremail: emailcookie }).then((doc) => {
    //     console.log("viewcart success" + doc)
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end(JSON.stringify(doc));
    // }).catch((err) => {
    //     console.log(err);
    //     console.log("Inside 400 response")
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end("Error in viewcart");
    // });
});


// router.get("/calculateSum", function (req, res) {

//     let sum = 0;
//     var idCookie = req.query.idcookie
//     console.log("Inside calculate sum");
//     sql = `select * from cart where buyerid=${idCookie}`;
//     console.log("SQL: " + sql);


//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 for (let i = 0; i < result.length; i++) {
//                     sum = sum + result[i].quantity * result[i].price;
//                 }
//                 console.log("Inside 200 response")
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 //console.log(JSON.stringify(resultObject))
//                 res.end(String(sum));
//             }
//         });
//         db.release()
//     });
// });


router.get("/calculateSum", passport.authenticate("jwt", { session: false }), function (req, res) {

    kafka.make_request('calculateSum', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful calculateSum");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful calculateSum");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });


    // let sum = 0;
    // var idCookie = req.query.idcookie;
    // var emailcookie = req.query.emailcookie;
    // console.log("Inside calculate sum");

    // Cart.find({ buyeremail: emailcookie }).then((doc) => {
    //     for (let i = 0; i < doc.length; i++) {
    //         sum = sum + doc[i].quantity * doc[i].price;
    //     }
    //     console.log("calculate sum success" + sum)
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end(String(sum));
    // }).catch((err) => {
    //     console.log(err);
    //     console.log("Inside 400 response")
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end("Error in calculate sum");
    // });
});


// router.get("/cartitems", function (req, res) {

//     var idCookie = req.query.idcookie
//     console.log("Inside cart items");
//     sql = `select count(*) as count from cart where buyerid=${idCookie}`;
//     console.log("SQL: " + sql);

//     cont.query(sql, (err, result) => {
//         if (err) {
//             console.log("Error occured : " + err);
//         } else {
//             Object.keys(result).forEach(function (key) {
//                 var row = result[key];
//                 var cartitem = row.count;

//                 console.log("Cart Item : " + cartitem);

//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 //console.log(JSON.stringify(resultObject))
//                 res.end(String(cartitem));
//             })
//         }
//     });
// });



router.get("/cartitems", passport.authenticate("jwt", { session: false }), function (req, res) {

    kafka.make_request('cartitems', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful cartitems");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful cartitems");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });


    // var idCookie = req.query.idcookie;
    // var emailcookie = req.query.emailcookie
    // console.log("Inside cart items " + emailcookie);

    // Cart.countDocuments({ buyeremail: emailcookie }).then((doc) => {
    //     console.log("cartitems success" + doc)
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end(JSON.stringify(doc))
    // }).catch((err) => {
    //     console.log(err);
    //     console.log("Inside 400 response")
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end("Error in cartitems");
    // });
});


// router.post("/placeorder", function (req, res) {
//     console.log("Inside place order Request");
//     console.log("Req Body : ", req.body);

//     var item = req.body.items;
//     var idcookie = req.body.idcookie;
//     var address = req.body.address;
//     var username = req.body.namecookie;
//     ownerid = ""
//     orderid = ""

//     console.log("Items : " + item)

//     sql = `select ownerid from items where itemid in (select itemid from cart where buyerid=${idcookie}) limit 1`

//     console.log(sql)


//     cont.query(sql, (err, result) => {
//         if (err) {
//             console.log("Error occured : " + err);
//         } else {

//             Object.keys(result).forEach(function (key) {
//                 var row = result[key];
//                 ownerid = row.ownerid;

//                 console.log("Owner id : " + ownerid);

//             })

//             sql1 = `insert into orders (personname,personaddress,status,ownerid,buyerid,flag) values ('${username}','${address}','new',${ownerid},${idcookie},1) `

//             console.log(sql1)

//             cont.query(sql1, (err, result) => {
//                 if (err) {
//                     console.log("Error occured : " + err);
//                 } else {
//                     console.log("Data inserted into orders table successfully!")
//                 }
//             });


//             sql2 = `select orderid from orders where buyerid = ${idcookie} and flag=1`

//             console.log(sql2)


//             cont.query(sql2, (err, result) => {
//                 if (err) {
//                     console.log("Error occured : " + err);
//                 } else {

//                     Object.keys(result).forEach(function (key) {
//                         var row = result[key];
//                         orderid = row.orderid;
//                         console.log("Order id : " + orderid);
//                     });

//                     for (let i = 0; i < item.length; i++) {
//                         var itemname = item[i].itemname
//                         var quantity = item[i].quantity
//                         var price = item[i].price

//                         sql3 = `insert into orderdetails (itemname,itemquantity,itemprice,orderid) values ('${itemname}','${quantity}','${price}','${orderid}') `

//                         console.log(sql3)

//                         cont.query(sql3, (err, result) => {
//                             if (err) {
//                                 console.log("Error occured : " + err);
//                             } else {
//                                 console.log("Data inserted into orderdeatils table successfully!")
//                             }
//                         });


//                     }

//                     sql4 = `update orders set flag=2 where buyerid=${idcookie} and flag=1`

//                     console.log(sql4)


//                     cont.query(sql4, (err, result) => {
//                         if (err) {
//                             console.log("Error occured : " + err);
//                         } else {
//                             console.log("Data Updated in orderds table successfully!")

//                             sql5 = `delete from cart where buyerid='${idcookie}'`

//                             console.log(sql5)


//                             cont.query(sql5, (err, result) => {
//                                 if (err) {
//                                     console.log("Error occured : " + err);
//                                 } else {
//                                     console.log("Data deleted in cart table successfully!")

//                                     res.writeHead(200, {
//                                         "Content-Type": "text/plain"
//                                     });
//                                     //console.log(JSON.stringify(resultObject))
//                                     res.end("Order placed successfully!");

//                                 }
//                             })

//                         }
//                     });

//                 }
//             })

//         }
//     });

// });


router.post("/placeorder", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside place order Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('placeorder', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful placeorder");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful placeorder");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful placeorder");
            }
        }

    });



    // var item = req.body.items;
    // var idcookie = req.body.idcookie;
    // var address = req.body.address;
    // var username = req.body.namecookie;
    // var emailcookie = req.body.emailcookie;
    // owneremail = ""
    // orderid = ""
    // restaurant = ""

    // Cart.find({ buyeremail: emailcookie }).limit(1).then((doc) => {
    //     Object.keys(doc).forEach(function (key) {
    //         var row = doc[key];
    //         owneremail = row.owneremail;
    //         restaurant = row.restaurant;
    //         console.log("Owner Email & restaurant : " + owneremail + restaurant);
    //     })

    //     const order = new Order({
    //         _id: mongoose.Types.ObjectId(),
    //         personname: username,
    //         personaddress: address,
    //         status: 'New',
    //         owneremail: owneremail,
    //         buyeremail: emailcookie,
    //         restaurant: restaurant,
    //         flag: '1',
    //     })
    //     console.log("object creatd " + order)
    //     order.save().then(result => {
    //         console.log("Items added to the orders table successfully " + result);

    //         Order.find({ buyeremail: emailcookie, flag: '1' }).then((doc) => {
    //             Object.keys(doc).forEach(function (key) {
    //                 var row = doc[key];
    //                 orderid = row._id;
    //                 console.log("Order id : " + orderid);
    //             })

    //             for (let i = 0; i < item.length; i++) {
    //                 var itemname = item[i].itemname
    //                 var quantity = item[i].quantity
    //                 var price = item[i].price

    //                 const orderdetails = new Orderdetails({
    //                     _id: mongoose.Types.ObjectId(),
    //                     itemname: itemname,
    //                     itemquantity: quantity,
    //                     itemprice: price,
    //                     orderid: orderid,
    //                 })
    //                 console.log("object creatd " + orderdetails)
    //                 orderdetails.save().then((doc) => {
    //                     console.log("Data inserted into orderdetails success" + doc)
    //                 })
    //             }

    //             Order.findOneAndUpdate({ _id: orderid, flag: '1' }, { $set: { flag: '2' } }, { new: true }).then((doc) => {
    //                 console.log("Data updated in orders " + doc);

    //                 Cart.deleteMany({ buyeremail: emailcookie }).then((doc) => {
    //                     console.log("Data deleted in cart, all steps completed")
    //                     res.writeHead(200, {
    //                         'Content-Type': 'text/plain'
    //                     })
    //                     res.end("Order placed successfully")
    //                 })
    //             })
    //         })
    //     })
    // }).catch((err) => {
    //     console.log("Errored somewhere" + err)
    //     res.writeHead(400, {
    //         'Content-Type': 'text/plain'
    //     })
    //     res.end("Could not place order")
    // })
});



// router.get("/buyerpastorders", function (req, res) {
//     console.log("Inside buyerpastorders");

//     sql = `select a.orderid, a.status, b.restaurantname from orders a,owner b
//     where a.buyerid=${req.query.idcookie} and
//     a.ownerid=b.id and a.status IN ("Delivered","Cancel")`;
//     console.log("SQL: " + sql);

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 console.log("Inside 200 response")
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 //console.log(JSON.stringify(resultObject))
//                 res.end(JSON.stringify(result));
//             }
//         });
//         db.release()
//     });
// });


router.get("/buyerpastorders", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside buyerpastorders");

    kafka.make_request('buyerpastorders', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful buyerpastorders");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful buyerpastorders");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });

    // emailcookie = req.query.emailcookie;
    // Order.find({ buyeremail: emailcookie, status: { $in: ["Delivered", "Cancel"] } }).then((doc) => {
    //     console.log("buyerpastorders success" + doc)
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end(JSON.stringify(doc));
    // }).catch((err) => {
    //     console.log(err);
    //     console.log("Inside 400 response")
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end("Error in buyerpastorders");
    // });
});


// router.get("/buyerfutureorders", function (req, res) {
//     console.log("Inside buyerfutureorders ");

//     sql = `select a.orderid, a.status, b.restaurantname from orders a,owner b
//     where a.buyerid=${req.query.idcookie} and
//     a.ownerid=b.id and a.status NOT IN("Delivered","Cancel")`;
//     console.log("SQL: " + sql);

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 console.log("Inside 200 response")
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 //console.log(JSON.stringify(resultObject))
//                 res.end(JSON.stringify(result));
//             }
//         });
//         db.release()
//     });
// });


router.get("/buyerfutureorders", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside buyerfutureorders ");

    kafka.make_request('buyerfutureorders', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful buyerfutureorders");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful buyerfutureorders");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });

    // emailcookie = req.query.emailcookie;
    // Order.find({ buyeremail: emailcookie, status: { $nin: ["Delivered", "Cancel"] } }).then((doc) => {
    //     console.log("buyerfutureorders success" + doc)
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end(JSON.stringify(doc));
    // }).catch((err) => {
    //     console.log(err);
    //     console.log("Inside 400 response")
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end("Error in buyerfutureorders");
    // });
});


//-------new functionality

router.get("/buyerviewmessage", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside buyerviewmessage ");

    kafka.make_request('buyerviewmessage', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful buyerviewmessage");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful buyerviewmessage");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });


    // emailcookie = req.query.emailcookie;
    // Message.find({ receiver: emailcookie }).then((doc) => {
    //     console.log("buyerviewmessage success" + doc)
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end(JSON.stringify(doc));
    // }).catch((err) => {
    //     console.log(err);
    //     console.log("Inside 400 response")
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end("Error in buyerviewmessage");
    // });
});


router.post("/buyermessage", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside Add Section Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('buyermessage', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful buyermessage");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful buyermessage");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful buyermessage");
            }
        }

    });


    // var message = req.body.message;
    // var owneremail = req.body.owneremail;
    // var buyeremail = req.body.buyeremail;
    // var restaurant = req.body.restaurant;
    // var orderid = req.body.orderid;

    // const buyermessage = new Message({
    //     _id: new mongoose.Types.ObjectId(),
    //     message: message,
    //     sender: buyeremail,
    //     receiver: owneremail,
    //     restaurant: "",
    //     orderid: orderid,
    // })
    // console.log("object creatd " + buyermessage)
    // buyermessage.save().then(result => {
    //     console.log("Message saved successfully " + result);
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end("Message saved successfully");
    // }).catch(error => {
    //     console.log("error occured" + error);
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end("Message saved unsuccessfully");
    // });
});



module.exports = router;
