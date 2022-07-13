let storedNames = [];
let storedUUIDs = [];

// await sleep(1000);
// make that
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function getData(playerName, key, storedUUID) {
    let uuid;
    if (!storedUUID) {
        uuid = await getUUID(playerName);
        if (uuid === null) { return null; }
    } else {
        uuid = storedUUID;
    }
    if (uuid == null) { return null; }
    let response = await fetch(`https://api.hypixel.net/status?key=${key}&uuid=${uuid}`);
    // the response is a json object, so we need to parse it
    let res = await response.json();
    if (res.success === false) { return null; }
    // the format is like this:
    // {
    //     "success": true,
    //     "uuid": "f6fcfd3d6acf4c45838a453ccada1752",
    //     "session": {
    //         "gameType": "BEDWARS",
    //         "mode": "BEDWARS_EIGHT_ONE",
    //         "online": true,
    //         "map": "Airshow"
    //     }
    // }
    // we want to get the map they are playing on, the game mode, and the online status
    let gameType = res.session.gameType;
    let mode = res.session.mode;
    let online = res.session.online;
    let map = res.session.map;
    // now we need to put it all into one json object
    let data = {
        "uuid": uuid,
        "gameType": gameType,
        "mode": mode,
        "online": online,
        "map": map
    }
    return data;
}

async function getUUID(playerName) {
    let response = await fetch(`https://api.ashcon.app/mojang/v2/user/${playerName}`);
    let res = await response.json();
    return res.uuid;
    
}

// set a click listener on the button with id "start"
document.getElementById("start").addEventListener("click", async () => {
    document.getElementById("start").style.opacity = "0%";
    document.getElementById("start").style.transform = "translateY(-140%)";
    document.getElementById("start").style.bottom = "100px";
    update();
    updateTime();
    setInterval(update, 2000);
    setInterval(updateTime, 1000);
    await sleep(300);
    document.getElementById("start").style.display = "none";
});
let time = 0;
function updateTime() {
    time++;
    let timeUntil = time
    timeUntil = timeUntil - 2;
    timeUntil = timeUntil * -1;
    if (timeUntil <= 0) {
        timeUntil = 0;
        time = 0;
        // make it so that the border of the element with class "text" has an animation
        // 2 seconds: #00ff99
        // 0 seconds: #ffffff
        // make it transition smoothly
        
        document.getElementsByClassName("text")[0].style.transition = "border-color 1s ease-in-out";
        document.getElementsByClassName("text")[0].style.borderColor = "#00ff99";
        
    } else {
        document.getElementsByClassName("text")[0].style.borderColor = "#f1f1f1";
    }
    document.getElementById("updateTime").innerHTML = `Time until next update: ${timeUntil + 1} seconds.`;
}

// make a function that run the function getData and display the result in a div with id "blocksBroken"

function parseModes(mode, game) {
    switch (mode) {
        case "BEDWARS_EIGHT_ONE":
            return "Bedwars Solo";
        case "BEDWARS_EIGHT_TWO":
            return "Bedwars Doubles";
        case "BEDWARS_FOUR_THREE":
            return "Bedwars 3v3v3v3";
        case "BEDWARS_FOUR_FOUR":
            return "Bedwars 4v4v4v4";
        case "BEDWARS_TWO_FOUR":
            return "Bedwars 4v4";
        case "LOBBY":
            return `${game} lobby.`;
    }
    return game + ' ' + mode;
}

// on launch, check if a cookie with the name "key" exists
// if it does, get the value of the cookie and put it in the input with id "api-key"

let key = document.cookie.split("; ").find(row => row.startsWith("key="));
if (key) {document.getElementById("api-key").value = key.split("=")[1]};

// do the same for players 1-4
let player1 = document.cookie.split("; ").find(row => row.startsWith("player1="));
if (player1) {document.getElementById("player-1").value = player1.split("=")[1];}
let player2 = document.cookie.split("; ").find(row => row.startsWith("player2="));
if (player2) {document.getElementById("player-2").value = player2.split("=")[1];}
let player3 = document.cookie.split("; ").find(row => row.startsWith("player3="));
if (player3) {document.getElementById("player-3").value = player3.split("=")[1];}
let player4 = document.cookie.split("; ").find(row => row.startsWith("player4="));
if (player4) {document.getElementById("player-4").value = player4.split("=")[1];}





function update() {
    // we want to set a variable for each player selected in the 4 inputs
    let player1 = document.getElementById("player-1").value;
    let player2 = document.getElementById("player-2").value;
    let player3 = document.getElementById("player-3").value;
    let player4 = document.getElementById("player-4").value;
    let key = document.getElementById("api-key").value;
    // store a cookie with the key
    document.cookie = `key=${key};`;
    // we want to get the data for each player
    if (player1 != "") {
        let st;
        if (storedNames[0] == player1) {
            st = storedUUIDs[0];
        } else {
            document.getElementById("player-1-data").innerHTML = ``;
        }
        document.cookie = `player1=${player1}`;
        getData(player1, key, st).then(data => {
            if (data == null) {document.getElementById("player-1-data").innerHTML = `<div class="error">There was an error. Maybe the playername is spelled wrong?</div>`; return;}
            mode = parseModes(data.mode, data.gameType);
            online = data.online;
            map = data.map;
            storedNames[0] = player1;
            storedUUIDs[0] = data.uuid;
            // now we want to display the data in the div with id "player-1-data"
            if (online) {
                if (data.mode == "LOBBY") {
                    document.getElementById("player-1-data").innerHTML = `<div class="mode">${mode}</div>`;
                } else {
                    document.getElementById("player-1-data").innerHTML = `<div class="mode">${mode}</div><div class="map">${map}</div>`;
                }
            } else {
                document.getElementById("player-1-data").innerHTML = `<div class="status">Offline</div>`;
            }
        });
    } 
    if (player2 != "") {
        let st;
        if (storedNames[1] == player2) {
            st = storedUUIDs[1];
        } else {
            document.getElementById("player-2-data").innerHTML = ``;
        }
        document.cookie = `player2=${player2}`;
        getData(player2, key, st).then(data => {
            if (data == null) {document.getElementById("player-2-data").innerHTML = `<div class="error">There was an error. Maybe the playername is spelled wrong?</div>`;return;}
            mode = parseModes(data.mode, data.gameType);
            online = data.online;
            map = data.map;
            storedNames[1] = player2;
            storedUUIDs[1] = data.uuid;
            // now we want to display the data in the div with id "player-2-data"
            if (online) {
                if (data.mode == "LOBBY") {
                    document.getElementById("player-2-data").innerHTML = `<div class="mode">${mode}</div>`;
                } else {
                    document.getElementById("player-2-data").innerHTML = `<div class="mode">${mode}</div><div class="map">${map}</div>`;
                }
            } else {
                document.getElementById("player-2-data").innerHTML = `<div class="status">Offline</div>`;
            }
        });
    }
    if (player3 != "") {
        let st;
        if (storedNames[2] == player3) {
            st = storedUUIDs[2];
        } else {
            document.getElementById("player-3-data").innerHTML = ``;
        }
        document.cookie = `player3=${player3}`;
        getData(player3, key, st).then(data => {
            if (data == null) {document.getElementById("player-3-data").innerHTML = `<div class="error">There was an error. Maybe the playername is spelled wrong?</div>`;return;}
            mode = parseModes(data.mode, data.gameType);
            online = data.online;
            map = data.map;
            storedNames[2] = player3;
            storedUUIDs[2] = data.uuid;
            // now we want to display the data in the div with id "player-3-data"
            if (online) {
                if (data.mode == "LOBBY") {
                    document.getElementById("player-3-data").innerHTML = `<div class="mode">${mode}</div>`;
                } else {
                    document.getElementById("player-3-data").innerHTML = `<div class="mode">${mode}</div><div class="map">${map}</div>`;
                }
            } else {
                document.getElementById("player-3-data").innerHTML = `<div class="status">Offline</div>`;
            }
        });
    }
    if (player4 != "") {
        let st;
        if (storedNames[3] == player4) {
            st = storedUUIDs[3];
        } else {
            document.getElementById("player-4-data").innerHTML = ``;
        }
        document.cookie = `player4=${player4}`;
        getData(player4, key, st).then(data => {
            if (data == null) {document.getElementById("player-4-data").innerHTML = `<div class="error">There was an error. Maybe the playername is spelled wrong?</div>`;return;}
            mode = parseModes(data.mode, data.gameType);
            online = data.online;
            map = data.map;
            storedNames[3] = player4;
            storedUUIDs[3] = data.uuid;
            // now we want to display the data in the div with id "player-4-data"
            if (online) {
                if (data.mode == "LOBBY") {
                    document.getElementById("player-4-data").innerHTML = `<div class="mode">${mode}</div>`;
                } else {
                    document.getElementById("player-4-data").innerHTML = `<div class="mode">${mode}</div><div class="map">${map}</div>`;
                }
            } else {
                document.getElementById("player-4-data").innerHTML = `<div class="status">Offline</div>`;
            }
        });
    }
}
