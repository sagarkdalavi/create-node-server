var express = require("express");
var bodyParser = require("body-parser");
var captchapng = require("captchapng");
const fetch = require("node-fetch");
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  console.log("requested");
  res.sendFile(__dirname + "/home.html");
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    data: {
      person: req.query.person,
      department: req.query.department,
      email: req.query.email,
    },
  });
});

app.post("/contact", urlencodedParser, function (req, res) {
  res.render("contact-success", { data: req.body });
});

app.get("/profile/:name", function (req, res) {
  let data = {
    age: 27,
    job: "Software Developer",
    hobbies: ["eating", "fighting", "fishing"],
  };
  res.render("profile", { person: req.params.name, data: data });
});

app.get("/getRecaptcha", async function (req, res) {
  const possible =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var captchaValue = "";
  for (var i = 0; i < 5; i++) {
    captchaValue.concat(
      possible.charAt(Math.floor(Math.random() * possible.length))
    );
  }
  // parseInt(Math.random() * 90000 + 10000);
  var p = new captchapng(100, 45, captchaValue); // width,height,numeric captcha
  p.color(255, 255, 255, 255); // First color: background (red, green, blue, alpha)
  p.color(20, 40, 100, 255); // Second color: paint (red, green, blue, alpha)
  var img = p.getBase64();

  const res1 = await fetch(
    "https://kite.zerodha.com/connect/login?v=3&api_key=zsfbo2mg4u3oj779",
    { "Content-Type": "application/json" }
  ).catch((err) => console.error("\n\n\nERROR sagar", err));
  console.log("\n\n\nThis is original", res1);
  try {
    const response = await res1.text();
    console.log(
      "\n\n\nThis is res",
      res1,
      "\n\n\n\n\nAnd Response++++",
      response
    );
  } catch (error) {
    console.log("THIS IS ERROR::", error);
  }

  captchaImgSrc = "data:image/jpeg;base64," + img;
  res.cookie("captcha", captchaValue, {
    maxAge: 1 * 60 * 60 * 1000,
    httpOnly: true,
  }); //24 * 60 * 60 * 1000 // 24 hours
  res.json({ status: 1, captchaImgSrc: captchaImgSrc });
});
console.log("Server here, now listening to port 3002");
app.listen(3002);
