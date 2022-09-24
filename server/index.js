const express = require("express");
const cors = require("cors");
const app = express();
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt = require("jsonwebtoken");
const jwtKry = "e-comm";

app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKry, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "something went wrong, please try after sometime" });
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKry, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({
            result: "something went wrong, please try after sometime",
          });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "no user found" });
    }
  } else {
    res.send({ result: "no user found" });
  }
});

app.post("/add-product",verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/product",verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "not Product found" });
  }
});

app.delete("/pro/:id",verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });

  res.send(result);
  // res.send(req.params.id);
});

app.get("/pro/:id",verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Recored Found" });
  }
});

app.get("/anil", async (req, res) => {
  console.log("Hi");
  res.send("hi");
});

app.post("/pro/:id",verifyToken, async (req, res) => {
  console.log(req.params);
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );

  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

// function verifyToken(req, res, next) {
//   let token = req.headers['authorization'];
//   if(token){
//     token= token.split('')[1];
//     // console.log("middleware called",token[1])
//     Jwt.verify(token,jwtKry,(err,valid)=>{
//       if(err){
//         res.status(401).send({result:"Please provid valid token"})
//       }
//       else{
//         next();
//       }
//     })
//   }
//   else{
// res.status(403).send({result:"Please add invalid token"})
//   }

// }

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKry, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Please valid token provided " });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "Please add token provide " });
  }
  
}

app.listen(4000);
