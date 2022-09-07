function ShowAllUsers() {
    console.log("it Works")
    var xhr = new XMLHttpRequest();
    //event always needs anonoeme functio OR function pointer
    xhr.onreadystatechange = function () {
        console.log(this.responseText)   //anonymous function.  
        if (this.readyState == 4) {
            alert("Back from the backend")
            let antwoord = this.responseText
            let antwoordOBJ = JSON.parse(antwoord);
            console.log(antwoordOBJ)
            for (var x = 0; x < antwoordOBJ.length; x++) {
                document.getElementById("go").innerHTML += antwoordOBJ[x].name + "<hr>"
            }

        }
    }
    xhr.open("GET", "http://localhost:8082/test1", true) //asynchroon is true, while doing stuff we wont wait for the result
    xhr.send();

}
function ShowAllUsers2() {
    fetch("http://localhost:8082/test1")
        .then(a => a.json())
        .then(b => {
            for (var x = 0; x < b.length; x++) {
                document.getElementById("go2").innerHTML += b[x].cityName + b[x].name + "<hr>"
            }
        })
}
function addUser() {
    console.log(20)
    let theUser = {};
    theUser.name = document.getElementById("uname").value;
    theUser.description = document.getElementById("description").value;
    theUser.cityName = document.getElementById("city").value;
    theUser.streetName = document.getElementById("adres1").value;
    theUser.houseNumber = document.getElementById("adres2").value;
    theUser.houseNumberAddition = document.getElementById("adres3").value;
    theUser.zipCode = document.getElementById("adres4").value;
    
    theUserJSON = JSON.stringify(theUser)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8082/adduser", true)
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(theUserJSON);
    alert("Info Saved");
    console.log("User saved")

}
function showUserInfo(){

}