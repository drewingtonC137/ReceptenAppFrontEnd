let url = "http://localhost:8082/"
let endpoint = "findAllRecipes"
window.onload = function() {
    fetch(url+endpoint)
        .then(a => a.json())
        .then(b => {
            for (var x = 0; x < b.length; x++) {
                document.getElementById("go10").innerHTML +="<hr>" + b[x].name + '<a href="showRecipe.html"> <button class="btn btn-info">Go to Recipe</button>' + "<hr>" 
                var receptId = b[x].id;
                console.log(receptId)
            }
        })
    }        

