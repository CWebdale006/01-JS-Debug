/*
      Exercise 01_06_01

      Snoot Flowers Javascript 
      Author: Connor J Webdale 
      Date: 8/20/19 

      Filename: snoot.js
*/
"use strict"; 

// global variables 
var twentyNine = document.createDocumentFragment(); 
var thirty = document.createDocumentFragment(); 
var thirtyOne = document.createDocumentFragment(); 

// function to populate the three new document fragments 
function setUpDays() {
    var dates = document.getElementById("delivDy").getElementsByTagName("option"); 
    twentyNine.appendChild(dates[28].cloneNode(true));
    thirty.appendChile(dates[28].cloneNode(true));
    thirty.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[28].cloneNode(true));
    thirtyOne.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[30].cloneNode(true)); 

    // removes nodes from the options list 
    while (dates[28]) {
        deliveryDay.removeChild(dates[28]);
    }

    // checking for a valid year in the selection list 
    if (deliveryYear.selectedIndex === -1) {
        deliveryYear.selectedIndex = 0;
    }

    // checking for a leap year 
    if (selectedMonth === "2" && deliveryYear.options[deliveryYear.selectedIndex].value === "2020") {
        deliveryDay.appendChild(twentyNine.cloneNode(true)); 
    }
    else if (selectedMonth === "4" || selectedMondth === "6" || selectedMonth === "9" || selectedMonth === "11") {
        deliveryDay.appendChild(thirty.cloneNode(true));
    }
    else if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth === "5" || selectedMonth === "7" || selectedMonth === "8" || selectedMonth === "10" || selectedMonth === "12") {
        deliveryDay.appendChild(thirtyOne.cloneNode(true));
    }
}

// removes default values that have been preset in the selection lists
function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select"); 
    alert("select lists: " + emptyBoxes.length); 
}

function setUpPage() {
    removeSelectDefaults();
    setUpDays(); 
    createEventListeners();
}

function createEventListeners() {
    var deliveryMonth = document.getElementById("delivMo"); 
    if (deliveryMonth.addEventListener) {
        deliveryMonth.addEventListener("change", updateDays, false);
    }
    else if (deliveryMonth.attachEvent) {
        deliveryMonth.attachEvent("ongchange", updateDays);
    }

    var deliveryYear = document.getElementsById("delivYr");
    if (deliveryYear.addEventListener) {
        deliveryYear.addEventListener("change", updateDays, false); 
    }
    else if (deliveryYear.attachEvent) {
        deliveryYear.attachEvent("onchange", updateDays); 
    }
}

//attaches the removeSelectDefaults() function as an event handler 
function createEventListener() {
    var submitButton = document.getElementsById("submit"); 
    if (submitButton.addEventListener) {
        submitButton.addEventListener("click", removeSelectDefaults, false);
    }
    else if (submitButton.attachEvent) {
        submitButton.attachEvent("onclick", removeSelectDefaults); 
    }

    for (var i = 0; i < emptyBoxes.length; i++) {
        emptyBoxes[i].selectedIndex = -1;
    }

    // changing the code that attaches event handlers on load 
    // run setUpPage() function when page finishes loading 
    if (window.addEventListener) {
        window.addEventListener("load", setUpPage, false); 
    }
    else if (window.attachEvent) {
        window.attachEvent("onload", setUpPage); 
    }
    
}