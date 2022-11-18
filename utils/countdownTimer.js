var countDownDate = new Date("Dec 18, 2022 00:00:00").getTime();

export var countdownTimer = setInterval(function () {
  // code goes here

  var now = new Date().getTime();
  var timeleft = countDownDate - now;

  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  if (days < 1 && hours < 1 && minutes < 1 && seconds < 1) {
    countdownTimer = { days: "00", hours: "00", minutes: "00", seconds: "00" };
    return;
  }

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

  return (countdownTimer = { days, hours, minutes, seconds });
}, 1000);

// setInterval(function () {
//   console.log(55, countdownTimer);
// }, 1000);
