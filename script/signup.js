/*
    Creates an account and saves the values in a Account SQL database.
    TODO: Error message when trying to create an account with an existing username or email inside the Account database.
*/

let url="http://localhost:8082";
    
window.onload=function(){
    const signupForm = document.getElementById("signup-form");
    const signupButton = document.getElementById("signup");

    signupButton.addEventListener("click", (e) => {
        const username = signupForm.username.value;
        const email = signupForm.email.value;
        const password = signupForm.password.value;

        let accountObj = {};
        accountObj.userName = username;
        accountObj.email = email;
        accountObj.passWord = password;

        fetch(url + "/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(accountObj)
        })
        
        alert("Account created.")

    })
}