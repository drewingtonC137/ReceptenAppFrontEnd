let url = "https://yc2208backendfinal.azurewebsites.net";
const logo =

    checkUrl();

function checkUrl() {
    let hostname = location.hostname;
    console.log(hostname)
    if (hostname.includes("localhost") || hostname.includes("127.0.0.1") || hostname.length === 0) {
        url = "http://localhost:8082";
    }
    console.log(url);
}
// let url = "https://yc2208backendfinal.azurewebsites.net";
let id = localStorage.getItem("accountId");