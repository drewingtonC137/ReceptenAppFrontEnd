let url = "http://localhost:8082/"
let endpoint = "findAllRecipes"
window.onload = function(){
    
        fetch(url+endpoint)
            .then(a => a.json())
            .then(b => {
                for (var x = 0; x < b.length; x++) {

                    var receptId = b[x].id;
                    console.log(receptId)
                }
                fetch("http://localhost:8082/getRecipe/" + 12)
            .then(a => a.json())
            .then(b => {
                    console.log(b);
                    document.getElementById("go3").innerHTML += b.name + "<hr>"
                    document.getElementById("go4").innerHTML += b.instructions + "<hr>"
                    document.getElementById("go5").innerHTML += b.cookingTime + " Minutes" + "<hr>"
                    document.getElementById("go6").innerHTML += b.totalPortions + " People" + "<hr>" 
                  
            })
            
            })        
    }
