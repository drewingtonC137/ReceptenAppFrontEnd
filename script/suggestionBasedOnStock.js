let receptenArray;
let stockArray;
let recipeIngredientArray = [];
//let id = localStorage.getItem("accountId");
//let url = "http://localhost:8082";

function hoi() {

   fetch(url + "/findAllRecipes")
      .then(a => a.json())
      .then(b => {
         receptenArray = b
         receptenArray.forEach(recept => getRecipeIngredient(recept.id))
      })

   fetch(url + "/stockFromAccount/" + id)
      .then(a => a.json())
      .then(b => stockArray = b)
}

function checken() {
   console.log(receptenArray)
   console.log(stockArray)
   console.log(recipeIngredientArray)
   for (var i = 0; i < recipeIngredientArray.length; i++) {
      giveSuggestion(recipeIngredientArray[i],stockArray)
      // document.getElementById("suggestionBasedOnStock").innerHTML += giveSuggestion(recipeIngredientArray[i],
      //    stockArray) + "<br>"
   }
}

function getRecipeIngredient(recipeId) {
   fetch(url + "/GetRecipeIngredient/" + recipeId)
      .then(a => a.json())
      .then(b => recipeIngredientArray.push(b))
}

function giveSuggestion(recept, stockArray) {
   console.log(recept)
   var totaal = 0;

   for (var x = 0; x < recept.length; x++) {
      for (var y = 0; y < stockArray.length; y++) {
         console.log(receptenArray[x].name)
         if (recept[x].ingredient.name == stockArray[y].ingredient.name) {
            console.log("getroffen")
            console.log(receptenArray[x].name)
            totaal++;
            var percentage = Math.round( totaal/recept.length * 100 );
            
             if (percentage > 40){
               document.getElementById("suggestion").innerHTML += "your stock contains " + percentage + "% of the ingredients for: " + receptenArray[x].name + "<br>";
               console.log(percentage)
               console.log(receptenArray[x].name)
             }
         }
      }
   }
   //var percentage = totaal/recept.length * 100;
   return (totaal / recept.length) * 100;
   
}