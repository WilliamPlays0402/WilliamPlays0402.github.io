var time_school = new Date("July 1, 2022 11:00:00").getTime();
var r1 = Math.random()*255;
var r2 = Math.random()*255;
var r3 = Math.random()*255;
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
    } else if (milliseconds <= 99) {
        milliseconds = "0" + milliseconds;
    } else if (milliseconds == 1000) {
        milliseconds = 999;
    };
    if (seconds <= 9) {
        seconds = "0" + seconds;
    };
    if (minutes <= 9) {
        minutes = "0" + minutes;
    };
    if (hours <= 9) {
        hours = "0" + hours;
    }
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
    } else if (milliseconds <= 99) {
        milliseconds = "0" + milliseconds;
    } else if (milliseconds == 1000) {
        milliseconds = 999;
    };
    if (seconds <= 9) {
        seconds = "0" + seconds;
    }
    if (minutes <= 9) {
        minutes = "0" + minutes;
    };
    if (hours <= 9) {
        hours = "0" + hours;
    }
    // if (milliseconds <= 999) {
    //     milliseconds = "0" + milliseconds
    // }
    document.getElementById("time_activity").innerHTML = days + "d " + hours + "h "+ minutes + "m " + seconds + "s " + milliseconds + "ms";
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("time_activity").innerHTML = "EXPIRED";
    };
}, 1);


function changeColor() {
    if (stop) {
        r1 = r1+((Math.random()*20) - 10);
        r2 = r2+((Math.random()*20) - 10);
        r3 = r3+((Math.random()*20) - 10);
        if (r1 <= 0) {
            r1 = 0;
        };
        if (r2 <= 0) {
            r2 = 0;
        };
        if (r3 <= 0) {
            r3 = 0;
        };
        if (r1 >= 127) {
            r1 = 127;
        };
        if (r2 >= 127) {
            r2 = 127;
        };
        if (r3 >= 127) {
            r3 = 127;
        };
        document.body.style.background = `rgb(${r1},${r2},${r3})`;
        
    }
}

setInterval(changeColor, 15);

var stop = true;

function stop_it() {
    if (stop === false) {
        stop = true;
        document.getElementById('button').innerHTML = 'Stop';
    } else if (stop === true) {
        stop = false;
        document.getElementById('button').innerHTML = 'Start';
    }
}
