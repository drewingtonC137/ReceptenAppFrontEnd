window.onload = function (){
    var id = 77;
    fetch("http://localhost:8082/getUser/" + id)
        .then(a => a.json())
        .then(b => {
                console.log(b);
                document.getElementById("go3").innerHTML +=b.name + "\n " + b.description + " " + b.cityName+ " " + b.streetName+ " " + b.houseNumber+ " " + b.houseNumberAddition+ " " + b.zipCode  + "<hr>"
            
        })
    }      