window.onload = function (){
    var id = 69;
    fetch("http://localhost:8082/getUser/" + id)
        .then(a => a.json())
        .then(b => {
                console.log(b);
                document.getElementById("go3").innerHTML +=b.name  + b.cityName +  + "<hr>"
            
        })
    }      