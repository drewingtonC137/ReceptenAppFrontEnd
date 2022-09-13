// When loading profilepage, get hold of accountID and show it's user profile.

var id = localStorage.getItem("accountId");
fetch("http://localhost:8082/getUser/" + id)
    .then(a => a.json())
    .then(b => {
            console.log(b);
            document.getElementById("go1").innerHTML +=b.name + "<hr>"
            document.getElementById("go2").innerHTML +=b.description + "<hr>"
            document.getElementById("go3").innerHTML +=b.cityName + "<hr>"
            document.getElementById("go4").innerHTML +=b.streetName + "<hr>"
            document.getElementById("go5").innerHTML +=b.houseNumber + b.houseNumberAddition + "<hr>"
            document.getElementById("go6").innerHTML +=b.zipCode + "<hr>"
    })
    console.log("account id = " + id);

// on click, go to edit profile page

function editUserInfo() {
    window.location.replace("userInfo.html");
}
