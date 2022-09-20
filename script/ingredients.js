let recipeId = 0

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

      let benodigdheden = cleanString(recipeObj.benodigdHeden.toLowerCase())

      document.getElementById("recipeName").innerHTML = recipeObj.name
      document.getElementById("portions").innerHTML = recipeObj.totalPortions + " personen"
      document.getElementById("cooking_time").innerHTML = recipeObj.cookingTime + " minuten"
      document.getElementById("kitchen_appliances").innerHTML = benodigdheden
      document.getElementById("vegetarian").innerHTML = vegetarian
      document.getElementById("instructions").innerHTML = instructions

   })

getIngredientsFromDatabase()
getIngredientsFromRecipe()
addQuantityTypesToSelect()


function getIngredientsFromDatabase() {
   fetch(url + "/returnIngredients")
      .then(response => response.json())
      .then(data => {
         var availableIngredients = [];
         var list = document.getElementById('ingredientArray');

         for (var x = 0; x < data.length; x++) {
            availableIngredients.push(data[x].name);
         }

         availableIngredients.forEach(function (item) {
            var option = document.createElement('option');
            option.value = item;
            list.appendChild(option);
         });
      })
}

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

function addQuantityTypesToSelect() {
   fetch(url + "/returnQuantityTypes")
      .then(response => response.json())
      .then(
         data => {
            fillQuantityTypeSelect(data)
         })
}

function cleanString(string) {
   string = string.charAt(0).toUpperCase() + string.slice(1);
   return string.replace("_", " ");
}

function fillQuantityTypeSelect(data) {
   console.log("Fill select with data");
   var quantityTypeSelect = document.getElementById("quantityTypeSelect");
   var option;
   for (var x = 0; x < data.length; x++) {
      option = document.createElement("option");
      option.text = cleanString(data[x].toLowerCase());
      option.value = data[x];
      quantityTypeSelect.add(option);
      console.log(data[x]);
   }
}

const submitIngredient = document.getElementById("submit-ingredient");

submitIngredient.addEventListener("click", (e) => {
   let ingredientObj = {};
   let recipeIngredientObj = {};

   const name = document.getElementById("ingredientName").value;
   const amount = document.getElementById("hoeveelheid").value;
   const amountType = document.getElementById("quantityTypeSelect").value;

   ingredientObj.name = name;
   recipeIngredientObj.amount = amount;
   recipeIngredientObj.amountType = amountType;

   fetch(url + "/setIngredient/" + name, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf8'
      },
      body: JSON.stringify(ingredientObj)
   })
      .then(res => res.text())
      .then(d => {
         const ingredient_id = d;

         fetch(url + "/SetRecipeIngredient/" + recipeId + "/" + ingredient_id, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json;charset=utf8'
            },
            body: JSON.stringify(recipeIngredientObj)
         })
            .then(() => {
               getIngredientsFromRecipe()
            })
      })
})

