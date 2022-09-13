/*
   zoekt naar de ingeredienten
*/
let recipeId = 0

window.onload = function () {
   const urlSearchParams = new URLSearchParams(window.location.search);
   const params = Object.fromEntries(urlSearchParams.entries());
   recipeId = params.id
   document.getElementsByClassName("recipdeAttribute")
   fetch(url + "/getRecipe/" + recipeId)
      .then((response) => response.json())
      .then((recipeObj) => {
         document.getElementById("recipeName").innerHTML = recipeObj.name
         document.getElementById("portions").innerHTML = recipeObj.totalPortions
         document.getElementById("cooking_time").innerHTML = recipeObj.cookingTime
         document.getElementById("kitchen_appliances").innerHTML = recipeObj.kitchenAppliances
         document.getElementById("vegetarian").innerHTML = recipeObj.vegetarian
         document.getElementById("instructions").innerHTML = recipeObj.instructions
      })
   // // ophalen van ingredient data
   // fetch(url + "/returnIngredients")
   //    .then(response => response.json())
   //    .then(data => {
   //       var availableIngredients = [];
   //       var list = document.getElementById('ingredientArray');

   //       for (var x = 0; x < data.length; x++) {
   //          availableIngredients.push(data[x].name);
   //       }

   //       availableIngredients.forEach(function (item) {
   //          var option = document.createElement('option');
   //          option.value = item;
   //          list.appendChild(option);
   //       });
   //    })
   getIngredientsFromRecipe()
}

function getIngredientsFromRecipe() {
   fetch(url + "/GetRecipeIngredient/" + recipeId)
      .then(res => res.json())
      .then(data => {
         let ingredientTable = document.createElement("table");
         let tbdy = document.createElement('tbdy');

         data.forEach(element => {
            let tr = document.createElement('tr');
            let ingredient = element.ingredient
            let td = document.createElement('td');
            td.style.width = "10px"
            td.appendChild(document.createTextNode(element.amount));
            tr.appendChild(td);
            tbdy.appendChild(tr);
            td = document.createElement('td');
            td.style.width = "30px"
            td.appendChild(document.createTextNode(element.amountType));
            tr.appendChild(td);
            tbdy.appendChild(tr);
            td = document.createElement('td');
            td.style.width = "200px"
            td.appendChild(document.createTextNode(ingredient.name));
            tr.appendChild(td);
            tbdy.appendChild(tr);

         })
         ingredientTable.appendChild(tbdy);
         document.getElementById("ingredients").innerHTML = "";
         document.getElementById("ingredients").appendChild(ingredientTable);
      })

}

const submitIngredient = document.getElementById("submit-ingredient");

submitIngredient.addEventListener("click", (e) => {
   let ingredientObj = {};
   let recipeIngredientObj = {};

   const name = document.getElementById("ingredientName").value;
   const amount = document.getElementById("hoeveelheid").value;
   const amountType = document.getElementById("eenheid").value;

   ingredientObj.name = name;
   recipeIngredientObj.amount = amount;
   recipeIngredientObj.amount_type = amountType;
   // recipeIngredientObj.recept_id = localStorage.getItem("recipeId");

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

$(document).ready(function () {
   var next = 1;
   $(".add-more").click(function (e) {
      e.preventDefault();
      var addto = "#field" + next;
      var addRemove = "#field" + (next);
      next = next + 1;
      var newIn = '<input type="text" id="hoeveelheid' + next + '" placeholder="hoeveelheid"><input type="text" id="eenheid' + next + '" placeholder="eenheid"><input autocomplete="off" class="input form-control" id="field' + next + '" name="prof1" type="text" placeholder="Zoek ingredient" onkeyup="filterIngredient()" data-items="8" width="20">';
      var newInput = $(newIn);
      var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div><div id="field">';
      var removeButton = $(removeBtn);
      $(addto).after(newInput);
      $(addRemove).after(removeButton);
      $("#field" + next).attr('data-source', $(addto).attr('data-source'));
      $("#count").val(next);

      $('.remove-me').click(function (e) {
         e.preventDefault();
         var fieldNum = this.id.charAt(this.id.length - 1);
         var fieldID = "#field" + fieldNum;
         var hoeveelheidId = "#hoeveelheid" + fieldNum;
         var eenheidId = "#eenheid" + fieldNum;
         $(this).remove();
         $(fieldID).remove();
         $(hoeveelheidId).remove();
         $(eenheidId).remove();
      });
   });
});
