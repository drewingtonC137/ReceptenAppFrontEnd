// let url = "http://localhost:8082/"
// let endpoint = "findAllRecipes"
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
window.onload = function () {
        logInStatus(id)
        fetch(url + "/getRecipe/" + params.id)
                .then(a => a.json())
                .then(b => {
                        console.log(b);
                        document.getElementById("go3").innerHTML += b.name + "<hr>"
                        document.getElementById("go4").innerHTML += b.instructions + "<hr>"
                        document.getElementById("go5").innerHTML += b.cookingTime + " Minutes" + "<hr>"
                        document.getElementById("go6").innerHTML += b.totalPortions + " People" + "<hr>"
                        var img = new Image();
                        console.log(img)
                        console.log(b.image);
                        img.src = b.image;
                        console.log(img.src)
                        document.getElementById("plaatje").src = img.src;

                })


}

