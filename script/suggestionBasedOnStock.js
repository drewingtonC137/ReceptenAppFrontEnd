let receptenArray = [];
let stockArray = [];
let recipeIngredientArray = [];


//let id = localStorage.getItem("accountId");
//let url = "http://localhost:8082";

function getReceptenAndStock() {

   fetch(url + "/findAllRecipes")
      .then(a => a.json())
      .then(b => {
         receptenArray = b
         receptenArray.forEach(recept => getRecipeIngredient(recept.id))
      })

   fetch(url + "/stockFromAccount/" + id)
      .then(a => a.json())
      .then(b => stockArray = b)
      //checken();
}

function checken() {


  // console.log(receptenArray)
   //console.log(stockArray)
   //console.log(recipeIngredientArray)
   for (var x = 0; x < recipeIngredientArray.length; x++) {
       
      percentage =  Math.round(giveSuggestion(recipeIngredientArray[x],stockArray));
     // document.getElementById("debug").innerHTML += recipeIngredientArray[x][0].recept.name + " " + "-" + recipeIngredientArray[x].length + " - "+ percentage + "<hr>"  ;
      let input = "<br>" + "Jouw voorraad bevat " + percentage + "% van de ingredienten voor: " + 
      '<hr><div class="row"><div class="col-sm-4"><img id="plaatje' + x + '" style="width: 200px; height: 200px; object-fit: cover;"></div><div class="col-sm-4">' + 
      recipeIngredientArray[x][0].recept.name + '</div><div class="col-sm-4"><a href="showRecipe.html?id=' + recipeIngredientArray[x][0].recept.id +
      '"> <button class="btn btn - info">Bekijk recept</button></div></div>';
      if (percentage > 80 && percentage <= 100){
         document.getElementById("suggestion1").innerHTML += input;
       }else if(percentage > 60 && percentage <= 80){
         document.getElementById("suggestion2").innerHTML += input;
       }else if(percentage > 50 && percentage <= 60){
         document.getElementById("suggestion3").innerHTML += input;
       }else if(percentage > 40 && percentage <= 50){
         document.getElementById("suggestion4").innerHTML += input;
       }else if(percentage > 30 && percentage <= 40){
         document.getElementById("suggestion5").innerHTML += input;
       }

       if (percentage > 30){
         var img = new Image();
         if (recipeIngredientArray[x][0].recept.image != '') {
             img.src = recipeIngredientArray[x][0].recept.image;
             document.getElementById("plaatje" + x).src = img.src;
         } else {
             img.src = "../NoFoodToWaste.png";
             document.getElementById("plaatje" + x).src = img.src;
         }

       }
   
      //console.log("it works")
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
   var totaal = 0;

   for (var x = 0; x < recept.length; x++) {
      
      for (var y = 0; y < stockArray.length; y++) {
         
         //console.log(receptenArray[x].name)
         if (recept[x].ingredient.name == stockArray[y].ingredient.name) {
            console.log("getroffen")
            
            totaal++;
            console.log("AA")
            
            var percentage = Math.round( totaal/recept.length * 100 );   
         }
      }
   }
  
   //var percentage = totaal/recept.length * 100;
   return (totaal / recept.length) * 100;
   
}
