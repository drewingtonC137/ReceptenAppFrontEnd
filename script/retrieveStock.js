checkloginbeforedataretrieval();

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

function getUserStock(userIdSession){
    fetch(url + "/stockFromAccount/" + userIdSession)
        .then( response => response.json())
        .then( 
            data => { 
                stockListToTable(data)})
}

function stockListToTable(infovanserver){
    console.log("interpretting data")
    let startString = '<table class="table table-striped">';
    startString += `<tr><td>#</td>
    <td>ingredeint name</td>
    <td>amount</td>
    <td>amount type</td>
    <td>expiration date</td>
    <td>available to others</td></tr>`;
    for(var x = 0; x < infovanserver.length ; x++){
        startString += `<tr><td>${x+1}</td>
        <td>${infovanserver[x].ingredient.name}</td>
        <td>${infovanserver[x].amount}</td>
        <td>${infovanserver[x].amountType}</td>
        <td>${infovanserver[x].expirationDate}</td>
        <td>${infovanserver[x].availableToOthers}</td></tr>
        `;
    }
    startString += "</table>"
    document.getElementById("serverResponse").innerHTML = startString;
}