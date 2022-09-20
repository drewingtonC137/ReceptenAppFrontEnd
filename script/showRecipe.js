let recipeId = 0
let benodigdheden
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
recipeId = params.id
document.getElementsByClassName("recipeAttribute")
fetch(url + "/getRecipe/" + recipeId)
        .then((response) => response.json())
        .then((recipeObj) => {

                if (recipeObj.image != null) {
                        var img = new Image();
                        img.src = recipeObj.image;
                        document.getElementById("plaatje").src = img.src;
                }

                instructions = recipeObj.instructions.replace(/(?:\r\n|\r|\n)/g, '<br>');
                if (recipeObj.vegetarian == "true") {
                        vegetarian = "Vegetarisch"
                } else {
                        vegetarian = "Niet vegetarisch"
                }

                if (recipeObj.benodigdHeden != null) {
                        benodigdheden = cleanString(recipeObj.benodigdHeden.toLowerCase())
                } else {
                        benodigdheden = "Geen"
                }

                document.getElementById("recipeName").innerHTML = recipeObj.name
                document.getElementById("portions").innerHTML = recipeObj.totalPortions + " personen"
                document.getElementById("cooking_time").innerHTML = recipeObj.cookingTime + " minuten"
                document.getElementById("kitchen_appliances").innerHTML = benodigdheden
                document.getElementById("vegetarian").innerHTML = vegetarian
                document.getElementById("instructions").innerHTML = instructions

        })

getIngredientsFromRecipe()

function getIngredientsFromRecipe() {
        fetch(url + "/GetRecipeIngredient/" + recipeId)
                .then(res => res.json())
                .then(data => {
                        let ingredientTable = document.createElement("table");
                        let tbdy = document.createElement('tbdy');

                        data.forEach(element => {
                                let ingredient = element.ingredient
                                let tr = document.createElement('tr');
                                let td = document.createElement('td');
                                td.appendChild(document.createTextNode(element.amount + " " + element.amountType.toLowerCase() + " " + ingredient.name));
                                tr.appendChild(td);
                                tbdy.appendChild(tr);

                        })
                        ingredientTable.appendChild(tbdy);
                        document.getElementById("ingredients").innerHTML = "";
                        document.getElementById("ingredients").appendChild(ingredientTable);
                })

}


function cleanString(string) {
        string = string.charAt(0).toUpperCase() + string.slice(1);
        return string.replace("_", " ");
}
