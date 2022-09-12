const loginButton = document.getElementById("login");

loginButton.addEventListener("click", (e) => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let accountObj = {};
    accountObj.userName = username;
    accountObj.passWord = password;
    let accountObjJSON = JSON.stringify(accountObj);

    fetch(url + "/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: accountObjJSON
    })
    .then(id => {
        return id.text();
    })
    .then(number => {
        localStorage.setItem('accountId', number);
        return number;
    })
    .then(id => {
        if(id==null || id==-1){
            alert("Username or password invalid!");
            location.reload();
        } else{
            window.location.replace("../index.html");
        }
    })
})
