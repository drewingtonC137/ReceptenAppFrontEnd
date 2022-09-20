// window.onload = (event) => {
//     logInStatus(id);
// }


// Check if you are logged into an account.
function logInStatus(accountIdSession) {
    if(accountIdSession==null || accountIdSession==-1){
        console.log("You are not logged in!")
        document.getElementById("inventory-page").style.display = 'none';
        // document.getElementById("ingredients-page").style.display = 'none';
        document.getElementById("recipes-page").style.display = 'none';
        return;
    } else{
        console.log("You are logged in!")

        document.getElementById("login-button").style.display = 'none';
        document.getElementById("logout-button").style.display = 'block';
        document.getElementById("profile-button").style.display = 'block';
        
        const logoutButton = document.getElementById("logout-button");
    
        logoutButton.addEventListener("click", (e) => {
            localStorage.removeItem("accountId");
        });
    }
}

// Delete account if the logged in user wants to delete it's account.
function deleteAccount() {
    fetch(url + '/deleteAccount/' + accountId , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then(a => {
        alert("Account has been deleted!");
        localStorage.removeItem("accountId");
        window.location.replace("../index.html");
    })
} 
