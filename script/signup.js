/*
    Creates an account and saves the values in a Account SQL database.
    TODO: Error message when trying to create an account with an existing username or email inside the Account database.
*/
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

    console.log("Signing up...");

    fetch(url + "/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(accountObj)
    })
    .then(id => {
        return id.text();
    })
    .then(number => {
        localStorage.setItem('accountId', number);
        return number;
    })
    .then(number => {
        if(number == -1){
            alert("Account is already taken! Try again...")
            location.reload()
        } else{
            window.location.replace("userInfo.html");
            console.log("Signed up!");
        }
    })
})
