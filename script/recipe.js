let url = "http://localhost:8082";


window.onload = function () {
   // ophalen van ingredient data
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


   // wegschrijven van de recept data naar de database recept
   const submitRecipe = document.getElementById("submit-recipe");

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
         .then(u => slaReceptIdOp(u))
         .then(d => {
            setIngredient();
            alert("Recept gemaakt");
         })

   })
}

// het opslaan van het id van het net aangemaakte recept in localStorage
function slaReceptIdOp(receptId) {
   const recipeId = receptId;
}


// het opslaan van de id's van de ingredienten van het recept in localStorage
function slaIngredientIdOp(ingredientIdArray) {
   localStorage.setItem("ingredienId", ingredientIdArray);
}


// ingredienten naar database toe schrijven
// backend code checked of het ingredient niet al bestaat in database
function setIngredient() {

   let name = []
   let ingredientArray = [];
   for (let i = 1; i < 8; i++) {
      let ingredientObj = {};
      name[i] = document.getElementById("ingredientName" + [i]).value;
      if (name[i] == "") {
         break;
      } else {
         ingredientObj.name = name[i]
         // console.log(name[i]);

         fetch(url + "/setIngredient/" + name[i], {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json;charset=utf8'
            },
            body: JSON.stringify(ingredientObj)
         })
            .then(res => res.text())
            .then(u => {
               ingredientArray.push(u)
            })
      }
   }
   return ingredientArray;
}




// toevoegen van extra invoervelden om ingredienten toe te voegen
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

