let url="http://localhost:8082";

const loginButton = document.getElementById("login");

loginButton.addEventListener("click", (e) => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let accountObj = {};
    accountObj.userName = username;
    accountObj.passWord = password;
    let accountObjJSON = JSON.stringify(accountObj);

    let loggedInAccount = fetch(url + "/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: accountObjJSON
    });

    console.log(loggedInAccount);
    // Redirect to profile page. Stay logged in as the created user.
    window.location.href = "userInfo.html";
})
