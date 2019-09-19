const express = require("express");
const gpio = require("rpi-gpio");
const gpiop = gpio.promise;

const express = require("express");
const app = express();

const pin = gpiop.setup(16, gpio.DIR_OUT);

app.get("/on", function(req, res) {
  res.send("Hello World");
  pin.then(() => gpiop.write(16, true));
  res.send();
});

app.get("/off", function(req, res) {
  res.send("Hello World");
  pin.then(() => gpiop.write(16, false));
  res.send();
});

app.listen(3000);
