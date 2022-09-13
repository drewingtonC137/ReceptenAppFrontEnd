const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
var StockObj;

addQuantityTypesToSelect();

function addQuantityTypesToSelect(){
    fetch(url + "/returnQuantityTypes")
        .then( response => response.json())
        .then( 
            data => { 
                fillQuantityTypeSelect(data)})
}

function cleanString(string) {
    string = string.toLowerCase();
    string =  string.charAt(0).toUpperCase() + string.slice(1);
    return string.replace("_", " ");
  }

function fillQuantityTypeSelect (data){
    console.log("Fill select with data");
    var quantityTypeSelect = document.getElementById("quantityTypeSelect");
    var option;
    for(var x = 0; x < data.length ; x++){
        option = document.createElement("option");
        option.text = cleanString(data[x]);
        option.value = data[x];
        quantityTypeSelect.add(option);
        console.log(data[x]);
    }
}

window.onload = function(){
    fetch(url + "/stockFromID/" + params.id)
        .then(a => a.json())
        .then(b => {
            StockObj = b;
            populateDataFields();
        })
} 

function populateDataFields(){
    document.getElementById("ingredientName").value = StockObj.ingredient.name;
    document.getElementById("quantity").value = StockObj.amount;
    document.getElementById("expirationDate").value = StockObj.expirationDate;
    document.getElementById("quantityTypeSelect").value = StockObj.amountType;
    if(StockObj.availableToOthers){
        document.getElementById("availableToOthers").checked = true;
    }
}

//Updaten Stock in database
const submitStock = document.getElementById("submitStock")
submitStock.addEventListener("click", (e) => {
    console.log("adding stock item");

   const ingredientName = document.getElementById("ingredientName").value;
   const quantity = document.getElementById("quantity").value;
   const expirationdate = document.getElementById("expirationDate").value;
   const quantityType = document.getElementById("quantityTypeSelect").value;

    let availableToOthers
    // alert(document.getElementById("availableToOthers").checked);
   if (document.getElementById("availableToOthers").checked){
        availableToOthers = "true";
   } else {
        availableToOthers = "false";
   }
//    const availableToOthers = document.getElementById("availableToOthers").value;

   console.log(document.getElementById("availableToOthers").value);

   StockObj.amount = quantity;
   StockObj.amountType = quantityType;
   StockObj.expirationDate = expirationdate;
   StockObj.availableToOthers = availableToOthers;

   fetch(url + "/addStock/" + localStorage.getItem("accountId") + "/" + ingredientName, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf8'
      },
      body: JSON.stringify(StockObj)
   })
      .then(window.location.href="inventory.html")
      .then(d => {
        window.location.href="inventory.html";
      })
})
