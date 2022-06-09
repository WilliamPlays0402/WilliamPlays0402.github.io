var time_school = new Date("July 1, 2022 11:00:00").getTime();
var x = setInterval(() => {
    var now = new Date().getTime();
    var distance = time_school - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var milliseconds = Math.floor((distance % 1000));
    if (milliseconds <= 9) {
        milliseconds = "00" + milliseconds;
    };
    if (milliseconds <= 99) {
        milliseconds = "0" + milliseconds;
    };
    if (milliseconds == 1000) {
        milliseconds = 999
    };
    // if (milliseconds <= 999) {
    //     milliseconds = "0" + milliseconds
    // }
    document.getElementById("time_school").innerHTML = days + "d " + hours + "h "+ minutes + "m " + seconds + "s " + milliseconds + "ms";
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("time_school").innerHTML = "EXPIRED";
    };
}, 1);

var time_activity = new Date("June 27, 2022 08:25:00").getTime();
var x = setInterval(() => {
    var now = new Date().getTime();
    var distance = time_activity - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var milliseconds = Math.floor((distance % 1000));
    if (milliseconds <= 9) {
        milliseconds = "00" + milliseconds;
    };
    if (milliseconds <= 99) {
        milliseconds = "0" + milliseconds;
    };
    if (milliseconds == 1000) {
        milliseconds = 999;
    };
    // if (milliseconds <= 999) {
    //     milliseconds = "0" + milliseconds
    // }
    document.getElementById("time_activity").innerHTML = days + "d " + hours + "h "+ minutes + "m " + seconds + "s " + milliseconds + "ms";
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("time_activity").innerHTML = "EXPIRED";
    };
}, 1);

