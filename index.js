const gpio = require("rpi-gpio");
const gpiop = gpio.promise;

// gpiop
//   .setup(16, gpio.DIR_OUT)
//   .then(() => {
//     return gpiop.write(16, false);
//   })
//   .catch(err => {
//     console.log("Error: ", err.toString());
//   });

gpiop
  .setup(18, gpio.DIR_OUT)
  .then(() => {
    setInterval(() => {
      gpiop.read(18, value => {
        console.log(value);
      });
    }, 2000);
  })
  .catch(err => {
    console.log("Error: ", err.toString());
  });
