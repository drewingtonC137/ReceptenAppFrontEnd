addKitchenApplianceToSelect()

var tempImage = "";

// wegschrijven van de recept data naar de database recept
const submitRecipe = document.getElementById("submitRecipe")
submitRecipe.addEventListener("click", (e) => {

   let recipeObj = {};

   const recipeName = document.getElementById("recipeName").value;
   const portions = document.getElementById("portions").value;
   const cookingTime = document.getElementById("cookingTime").value;
   const kitchenAppliance = document.getElementById("kitchenApplianceSelect").value;
   const instructions = document.getElementById("instructions").value;



   // let vegetarian;

   // if (document.getElementById("vegetarian").value == "on") {
   //    vegetarian = "true";
   // }
   // else {
   //    vegetarian = "false";
   // }

   recipeObj.name = recipeName;
   recipeObj.totalPortions = portions;
   recipeObj.cookingTime = cookingTime;
   recipeObj.kitchen_appliance = kitchenAppliance;
   recipeObj.instructions = instructions;
   recipeObj.image = tempImage;

   // recipeObj.vegitarian = vegetarian;
   accountId = localStorage.getItem("accountId");
   console.log(recipeName)
   console.log(JSON.stringify(recipeObj))

   fetch(url + "/addRecipe/" + accountId, {
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

function addKitchenApplianceToSelect() {
   fetch(url + "/returnKitchenAppliance")
      .then(response => response.json())
      .then(
         data => {
            fillKitchenApplianceSelect(data)
         })
}

function cleanString(string) {
   string = string.charAt(0).toUpperCase() + string.slice(1);
   return string.replace("_", " ");
}

function fillKitchenApplianceSelect(data) {
   console.log("Fill select with data");
   var kitchenApplianceSelect = document.getElementById("kitchenApplianceSelect");
   var option;
   for (var x = 0; x < data.length; x++) {
      option = document.createElement("option");
      option.text = cleanString(data[x].toLowerCase());
      option.value = data[x];
      kitchenApplianceSelect.add(option);
      console.log(data[x]);
   }
}

function addImageToRecipe(element) {
   var file = element.files[0];
   var reader = new FileReader();
   reader.onloadend = function () {
      console.log('RESULT', reader.result)
      tempImage = reader.result
   }
   reader.readAsDataURL(file);
}
