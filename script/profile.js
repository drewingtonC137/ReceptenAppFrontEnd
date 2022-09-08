logInStatus();


// Check if you are logged into an account.
function logInStatus() {
    var userIdSession = localStorage.getItem("accountId");
    console.log(userIdSession);

    if(userIdSession==null || userIdSession==-1){
        console.log("You are not logged in!")
        document.getElementById("inventory-page").style.display = 'none';
        document.getElementById("ingredients-page").style.display = 'none';
        document.getElementById("recipes-page").style.display = 'none';
        return;
    } else{
        console.log("You are logged in!")
        loggedIn(userIdSession);

        window.onload = (event) => {
            const logoutButton = document.getElementById("logout-button");
        
            logoutButton.addEventListener("click", (e) => {
                localStorage.removeItem("accountId");
            });
        };
    }
}


// Remember that you are logged in for the session on the given account
function loggedIn(id) { 
    let accountObj = {};
    accountObj.id = id;
    let accountObjJSON = JSON.stringify(accountObj);

    fetch(url + "/profile", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: accountObjJSON
    }).then(res => {
        return res.json();
    }).then(data => {
        document.getElementById("login-button").style.display = 'none';
        document.getElementById("logout-button").style.display = 'block';
        document.getElementById("profile-button").style.display = 'block';
    })
}

