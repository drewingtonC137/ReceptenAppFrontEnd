function showUserInfo(){
    var id = localStorage.getItem("accountId");
    fetch("http://localhost:8082/getUser/" + 1)
        .then(a => a.json())
        .then(b => {
                console.log(b);
                document.getElementById("go3").innerHTML += b.name + "<hr>"
                document.getElementById("go4").innerHTML += b.description + "<hr>"
                document.getElementById("go5").innerHTML += b.cityName + "<hr>"
                document.getElementById("go6").innerHTML += b.streetName + "<hr>"
                document.getElementById("go7").innerHTML += b.houseNumber + b.houseNumberAddition + "<hr>"
                document.getElementById("go8").innerHTML += b.zipCode + "<hr>"
        })
        console.log("account id =" + id);
    }      