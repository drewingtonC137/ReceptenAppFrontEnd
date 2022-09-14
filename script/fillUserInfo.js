let nameField = document.getElementById("uname");
let descriptionField = document.getElementById("description");
let cityField = document.getElementById("city");
let streetField = document.getElementById("adres1");
let houseNumberField = document.getElementById("adres2");
let houseNumberAdditionField = document.getElementById("adres3");
let zipCodeField = document.getElementById("adres4");
    
fetch(url + "/getUser/" + id)
    .then(a => a.json())
    .then(b => {
        nameField.value = b.name;
        descriptionField.value = b.description;
        cityField.value = b.cityName;
        streetField.value = b.streetName;
        houseNumberField.value = b.houseNumber;
        houseNumberAdditionField.value = b.houseNumberAddition;
        zipCodeField.value = b.zipCode;
})