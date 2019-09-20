const gpio = require("rpi-gpio");
const express = require("express");
const gpiop = gpio.promise;
const PORT = 3000;

const cache = {
  ons: 0,
  offs: 0,
  lastOn: null,
  lastOff: null,
  status: "OFF"
};
const app = express();

const pin = gpiop.setup(16, gpio.DIR_OUT);

app.use((req, res, next) => {
  console.log(`[access] - ${req.method}:${req.originalUrl}`);
  return next();
});

app.get("/on", function(req, res, next) {
  pin
    .then(() => {
      if (cache.status === "OFF") {
        gpiop.write(16, true);
        cache.ons += 1;
        cache.lastOn = new Date().toString();
        cache.status = "ON";
      }

      res.send();
    })
    .catch(next);
});

app.get("/off", function(req, res, next) {
  pin
    .then(() => {
      if (cache.status === "ON") {
        gpiop.write(16, false);
        cache.offs += 1;
        cache.lastOff = new Date().toString();
        cache.status = "OFF";
      }

      res.send();
    })
    .catch(next);
});

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.get("/strobe", function(req, res, next) {
  pin
    .then(async () => {
      var status = cache.status === "ON";
      for (var i = 0; i < 9; i++) {
        await sleep(500);
        status = !status;
        gpiop.write(16, status);
      }

      // always finish in off state
      gpiop.write(16, false);

      res.send();
    })
    .catch(next);
})

app.get("/stats", (req, res, next) => {
  res.send(cache);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
