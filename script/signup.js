/*
    Creates an account and saves the values in a Account SQL database.
    TODO: Error message when trying to create an account with an existing username or email inside the Account database.
*/

let url="http://localhost:8082";

const signupButton = document.getElementById("signup");

signupButton.addEventListener("click", (e) => {
    // Save account in database
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let accountObj = {};
    accountObj.userName = username;
    accountObj.email = email;
    accountObj.passWord = password;

    console.log("logging in!!!");

    fetch(url + "/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(accountObj)
    })
    //window.location.href = "http://127.0.0.1:5500/templates/userInfo.html"; //= redirect to user info input page maar maakt dan geen account meer aan???

    // Redirect to profile page. Stay logged in as the created user. TODO doesnt work yet

    // window.location.href = "userInfo.html";
})
