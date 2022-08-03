var countDownDate = new Date("Aug 25, 2022 16:29:52").getTime();

export var countdownTimer = setInterval(function () {
  // code goes here

  var now = new Date().getTime();
  var timeleft = countDownDate - now;

  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  //   console.log({ days, hours, minutes, seconds });

  countdownTimer = { days, hours, minutes, seconds };
}, 1000);

// setInterval(function () {
//   console.log(55, countdownTimer);
// }, 1000);
