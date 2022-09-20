let endpoint = "/findAllRecipes"
window.onload = function() {
    logInStatus(id);
    fetch(url+endpoint)
        .then(a => a.json())
        .then(b => {
            for (var x = 0; x < b.length; x++) {
                var receptId = b[x].id;
                console.log(receptId)
                document.getElementById("go10").innerHTML +="<hr>" + b[x].name + '<a href="showRecipe.html?id='+ receptId +'"> <button class="btn btn-info">Go to Recipe</button>' + "<hr>" 
                
                
            }
        })
    }        



