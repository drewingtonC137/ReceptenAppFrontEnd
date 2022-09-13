// window.onload = function () {

// wegschrijven van de recept data naar de database recept
const submitRecipe = document.getElementById("submitRecipe")
submitRecipe.addEventListener("click", (e) => {

   let recipeObj = {};

   const recipeName = document.getElementById("recipeName").value;
   const portions = document.getElementById("portions").value;
   const cookingTime = document.getElementById("cookingTime").value;
   const kitchenAppliance = document.getElementById("kitchenAppliance").value;
   const instructions = document.getElementById("instructions").value;

   let vegetarian = null
   let input = document.getElementsByClassName('messageCheckbox')
   vegetarian = input.checked

   recipeObj.name = recipeName;
   recipeObj.totalPortions = portions;
   recipeObj.cookingTime = cookingTime;
   recipeObj.kitchen_appliance = kitchenAppliance;
   recipeObj.instructions = instructions;
   recipeObj.vegitarian = vegetarian;
   recipeObj.user_id = localStorage.getItem("user_id");

   fetch(url + "/addRecipe", {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf8'
      },
      body: JSON.stringify(recipeObj)
   })
      .then(res => res.json())
      .then((recipeId = res.recipeId) => {
         alert("Recept gemaakt")
         window.location.assign("ingredients.html?id=" + recipeId)
      })

})


