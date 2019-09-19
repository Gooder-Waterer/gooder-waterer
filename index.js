const gpio = require("rpi-gpio");
const express = require("express");
const gpiop = gpio.promise;
const PORT = 3000;

const cache = {
  ons: 0,
  offs: 0,
  lastOn: null,
  lastOff: null
};
const app = express();

const pin = gpiop.setup(16, gpio.DIR_OUT);

app.get("/on", function(req, res, next) {
  pin
    .then(() => {
      gpiop.write(16, true);
      cache.ons += 1;
      cache.lastOn = new Date().toString();
      res.send();
    })
    .catch(next);
});

app.get("/off", function(req, res, next) {
  pin
    .then(() => {
      gpiop.write(16, false);
      cache.ons += 1;
      cache.lastOff = new Date().toString();
      res.send();
    })
    .catch(next);
});

app.get("/stats", (req, res, next) => {
  res.send(cache);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
