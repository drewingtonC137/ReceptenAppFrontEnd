let receptenArray = [];
let stockArray = [];
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
      checken();
}

function checken() {


   console.log(receptenArray)
   console.log(stockArray)
   console.log(recipeIngredientArray)
   for (var i = 0; i < recipeIngredientArray.length; i++) {
      giveSuggestion(recipeIngredientArray[i],stockArray)
      console.log("it works")
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
            
             if (percentage > 80 && percentage <= 100){
               document.getElementById("suggestion1").innerHTML += "<br>" + "Jouw voorraad bevat " + percentage + "% van de ingredienten voor: " + receptenArray[x].name + "<br>" + '<hr><div class="row"><div class="col-sm-4"><img id="plaatje' + [x] + '" style="width: 200px; height: 200px; object-fit: cover;"></div><div class="col-sm-4">' + receptenArray[x].name + '</div><div class="col-sm-4"><a href="showRecipe.html?id=' + receptenArray[x].id +
               '"> <button class="btn btn - info">Go to Recipe</button></div></div>';
            
               console.log(percentage)
               console.log(receptenArray[x].name)
             }else if(percentage > 60 && percentage <= 80){
               document.getElementById("suggestion2").innerHTML += "<br>" + "Jouw voorraad bevat " + percentage + "% van de ingredienten voor: " + receptenArray[x].name + "<br>" + '<hr><div class="row"><div class="col-sm-4"><img id="plaatje' + [x] + '" style="width: 200px; height: 200px; object-fit: cover;"></div><div class="col-sm-4">' + receptenArray[x].name + '</div><div class="col-sm-4"><a href="showRecipe.html?id=' + receptenArray[x].id +
               '"> <button class="btn btn - info">Go to Recipe</button></div></div>';
             }else if(percentage > 50 && percentage <= 60){
               document.getElementById("suggestion3").innerHTML += "<br>" + "Jouw voorraad bevat " + percentage + "% van de ingredienten voor: " + receptenArray[x].name + "<br>" + '<hr><div class="row"><div class="col-sm-4"><img id="plaatje' + [x] + '" style="width: 200px; height: 200px; object-fit: cover;"></div><div class="col-sm-4">' + receptenArray[x].name + '</div><div class="col-sm-4"><a href="showRecipe.html?id=' + receptenArray[x].id +
               '"> <button class="btn btn - info">Go to Recipe</button></div></div>';
             }else if(percentage > 40 && percentage <= 50){
               document.getElementById("suggestion4").innerHTML += "<br>" + "Jouw voorraad bevat " + percentage + "% van de ingredienten voor: " + receptenArray[x].name + "<br>" + '<hr><div class="row"><div class="col-sm-4"><img id="plaatje' + [x] + '" style="width: 200px; height: 200px; object-fit: cover;"></div><div class="col-sm-4">' + receptenArray[x].name + '</div><div class="col-sm-4"><a href="showRecipe.html?id=' + receptenArray[x].id +
               '"> <button class="btn btn - info">Go to Recipe</button></div></div>';
             }else if(percentage > 30 && percentage <= 40){
               document.getElementById("suggestion5").innerHTML += "<br>" + "Jouw voorraad bevat " + percentage + "% van de ingredienten voor: " + receptenArray[x].name + "<br>" + '<hr><div class="row"><div class="col-sm-4"><img id="plaatje' + [x] + '" style="width: 200px; height: 200px; object-fit: cover;"></div><div class="col-sm-4">' + receptenArray[x].name + '</div><div class="col-sm-4"><a href="showRecipe.html?id=' + receptenArray[x].id +
               '"> <button class="btn btn - info">Go to Recipe</button></div></div>';
             }
         }
      }
   }
   //var percentage = totaal/recept.length * 100;
   return (totaal / recept.length) * 100;
   
}
