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

        window.onload = (event) => {
            document.getElementById("login-button").style.display = 'none';
            document.getElementById("logout-button").style.display = 'block';
            document.getElementById("profile-button").style.display = 'block';
            
            const logoutButton = document.getElementById("logout-button");
        
            logoutButton.addEventListener("click", (e) => {
                localStorage.removeItem("accountId");
            });
        };
    }
}
