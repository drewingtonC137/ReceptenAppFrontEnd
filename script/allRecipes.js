let endpoint = "/findAllRecipes"
const logo = "/NoFoodToWaste.png"
window.onload = function () {
    logInStatus(id);
}

fetch(url + endpoint)
    .then(a => a.json())
    .then(b => {
        for (var x = 0; x < b.length; x++) {
            var receptId = b[x].id;
            console.log(receptId)

            document.getElementById("go10").innerHTML +=
                '<hr><div class="row"><div class="col-sm-4"><img id="plaatje' + [x] + '" style="width: 200px; height: 200px; object-fit: cover;"></div><div class="col-sm-4">' + b[x].name + '</div><div class="col-sm-4"><a href="showRecipe.html?id=' + receptId +
                '"> <button class="btn btn - info">Go to Recipe</button></div></div>'

            if (b[x].image != null) {
                var img = new Image();
                img.src = b[x].image;

                document.getElementById("plaatje" + [x]).src = img.src;
            } else {
                var img = new Image();
                img.src = "../NoFoodToWaste.png";
                document.getElementById("plaatje" + [x]).src = img.src;
            }
        }
    })



