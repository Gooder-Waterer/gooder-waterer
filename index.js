const gpio = require("rpi-gpio");
const gpiop = gpio.promise;

console.log("\ngooder waterer - here we go... \n");
// gpiop
//   .setup(16, gpio.DIR_OUT)
//   .then(() => {
//     return gpiop.write(16, false);
//   })
//   .catch(err => {
//     console.log("Error: ", err.toString());
//   });

gpiop
  .setup(18, gpio.DIR_IN)
  .then(() => {
    setInterval(() => {
      gpiop.read(18, (err, value) => {
        if (err) {
          console.log(err);
        }
        console.log(`\nThe value is: ${value}`);
      });
    }, 2000);
  })
  .catch(err => {
    console.log("Error: ", err.toString());
  });
