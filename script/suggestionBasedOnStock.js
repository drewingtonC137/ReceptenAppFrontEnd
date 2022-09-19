let receptenArray;
let stockArray;
let recipeIngredientArray;
let url = "http://localhost:8082";

function hoi() {

   fetch(url + "/findAllRecipes")
      .then(a => a.json())
      .then(b => {
         receptenArray = b
         receptenArray.forEach(recept => getRecipeIngredient(recept.id))
      })

   fetch(url + "/stockFromAccount/117")
      .then(a => a.json())
      .then(b => stockArray = b)
}

function checken() {
   console.log(receptenArray)
   console.log(stockArray)
   console.log(recipeIngredientArray)
   giveSuggestion(recipeIngredientArray, stockArray)
}

function getRecipeIngredient(recipeId) {
   fetch(url + "/GetRecipeIngredient/" + recipeId)
      .then(a => a.json())
      .then(b => recipeIngredientArray = b)
}



function giveSuggestion(recept, stockArray) {
   console.log(recept)
   var totaal = 0;

   for (var x = 0; x < recept.length; x++) {
      for (var y = 0; y < stockArray.length; y++) {
         if (recept[x].ingredient.name == stockArray[y].ingredient.name) {
            console.log("getroffen")
            totaal++;
         }
      }
   }
   return totaal;
}