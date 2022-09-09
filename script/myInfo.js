// When loading profilepage, get hold of accountID and show it's user profile.

var id = localStorage.getItem("accountId");
fetch("http://localhost:8082/getUser/" + id)
    .then(a => a.json())
    .then(b => {
            console.log(b);
            document.getElementById("go3").innerHTML +=b.name + "\n " + b.description + " " + b.cityName+ " " + b.streetName+ " " + b.houseNumber+ " " + b.houseNumberAddition+ " " + b.zipCode  + "<hr>"
        
    })
    console.log("account id =" + id);

// on click, go to edit profile page

function editUserInfo() {
    window.location.replace("userInfo.html");
}
