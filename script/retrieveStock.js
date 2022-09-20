


// Check if you are logged into an account.
function checkloginbeforedataretrieval() {
    var userIdSession = localStorage.getItem("accountId");
    console.log(userIdSession);

    if(userIdSession==null || userIdSession==-1){
        console.log("You are not logged in!")
        return;
    } else{
        console.log("You are logged in, retrieving data!")
        getUserStock(userIdSession);
    }
}

function cleanString(string) {
    string = string.toLowerCase();
    string =  string.charAt(0).toUpperCase() + string.slice(1);
    return string.replace("_", " ");
  }

function getUserStock(userIdSession){
    fetch(url + "/stockFromAccount/" + userIdSession)
        .then( response => response.json())
        .then( 
            data => { 
                stockListToTable(data)})
}

function deleteStockItemById(id){
    fetch(url + "/deleteStock/" + id)
    .then(() => {
        window.location.reload();
    })
}

function stockListToTable(infovanserver){
    console.log("interpretting data")
    let startString = '<table class="table table-striped">';
    startString += `<tr><td>#</td>
    <td>ingredient name</td>
    <td>amount</td>
    <td>amount type</td>
    <td>expiration date</td>
    <td>available to others</td>
    <td></td>
    <td></td>
    </tr>`;
    for(var x = 0; x < infovanserver.length ; x++){
        startString += `<tr><td>${x+1}</td>
        <td>${infovanserver[x].ingredient.name}</td>
        <td>${infovanserver[x].amount}</td>
        <td>${cleanString(infovanserver[x].amountType)}</td>
        <td>${infovanserver[x].expirationDate}</td>
        <td>${infovanserver[x].availableToOthers}</td>
        <td><a href="changeStock.html?id=${infovanserver[x].id}"><button type="button" class="btn btn-primary btn-sm">Edit item</button></a></td>
        <td><button type="button" class="btn btn-danger btn-sm" onclick="deleteStockItemById(\'${infovanserver[x].id}\')">Delete item</button></td>
        </tr>
        `;
    }
    startString += "</table>"
    document.getElementById("serverResponse").innerHTML = startString;
}