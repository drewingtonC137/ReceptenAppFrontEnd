addQuantityTypesToSelect();

function addQuantityTypesToSelect() {
    fetch(url + "/returnQuantityTypes")
        .then(response => response.json())
        .then(
            data => {
                fillQuantityTypeSelect(data)
            })
}

function cleanString(string) {
    string = string.charAt(0).toUpperCase() + string.slice(1);
    return string.replace("_", " ");
}

function fillQuantityTypeSelect(data) {
    console.log("Fill select with data");
    var quantityTypeSelect = document.getElementById("quantityTypeSelect");
    var option;
    for (var x = 0; x < data.length; x++) {
        option = document.createElement("option");
        option.text = cleanString(data[x].toLowerCase());
        option.value = data[x];
        quantityTypeSelect.add(option);
        console.log(data[x]);
    }
}

//Wegschrijven van een stock item naar de database
const submitStock = document.getElementById("submitStock")
submitStock.addEventListener("click", (e) => {
    console.log("adding stock item");
    let StockObj = {};

    const ingredientName = document.getElementById("ingredientName").value;
    const quantity = document.getElementById("quantity").value;
    const expirationdate = document.getElementById("expirationDate").value;
    const quantityType = document.getElementById("quantityTypeSelect").value;

    if (document.getElementById("availableToOthers").value == "on") {
        availableToOthers = "true";
    }
    else {
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
        .then(res => res.text())
        .then(d => {
            alert("Stock gemaakt")
            //  window.location.assign("inventory.html")
        })
})

