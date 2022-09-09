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

   recipeObj.name = recipeName;
   recipeObj.totalPortions = portions;
   recipeObj.cookingTime = cookingTime;
   recipeObj.kitchen_appliance = kitchenAppliance;
   recipeObj.instructions = instructions;

   fetch(url + "/addRecipe", {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf8'
      },
      body: JSON.stringify(recipeObj)
   })
      .then(res => res.text())
      .then(d => {
         localStorage.setItem("recipeId", d)
         alert("Recept gemaakt")
         window.location.assign("ingredients.html")
      })

})


