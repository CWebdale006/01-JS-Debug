/*    Exercise 01_05_01

 *    Photo gallery
 *    Variables and functions
 *    Author: Connor J Webdale 
 *    Date: 8/15/19 

 *    Filename: photos.js
 */

"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var photoOrder = [1,2,3,4,5];
var figureCount = 3;  // variable to control figure count 
var autoAdvance = setInterval(rightAdvance, 5000); 

// provides filename values for the src attributes of the three img elements 
function populateFigures() {
   var filename; 
   var currentFig; 

   if (figureCount === 3) {
      for (var i = 1; i < 4;i++) {
         filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
         currentFig = document.getElementsByTagName("img")[i-1]; 
         currentFig.src = filename; 
         
      }
   } else {
      for (var i = 0; i<5; i++) {
         filename = "images/IMG_0" + photoOrder[i] + "sm.jpg"; 
         currentFig = document.getElementsByTagName("img")[i];
         currentFig.src = filename;
      }
   }
}

// shurts down the interval times, then calls rightAdvance() to shift the images 
function rightArrow() {
   clearInterval(autoAdvance); 
   rightAdvance(); 
}

/* shift all images one figure to the left, and change values in photoOrder array to match  */
function rightAdvance() {
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] + 1) === 6) {
         photoOrder[i] = 1;
      } else {
         photoOrder[i] += 1;
      }
      populateFigures();
   }
}

/* shift all images one figure to the right, and change values in photoOrder array to match  */
function leftArrow() {
   clearInterval(autoAdvance); 
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] - 1) === 0) {
         photoOrder[i] = 5;
      } else {
         photoOrder[i] -= 1;
      }
      populateFigures();
   }
}

function previewFive() {
   // creating a new node 
   var lastFigure = document.createElement("figure");
   // adding properties to the new element 
   lastFigure.id = "fig5"; 
   lastFigure.style.zIndex = "5"; 
   lastFigure.style.position = "absolute"; 
   lastFigure.style.right = "45px"; 
   lastFigure.style.top = "67px"; 

   // creating a new node 
   var lastImage = document.createElement("img"); 
   // adding attributes to this element 
   lastImage.width = "240"; 
   lastImage.height = "135"; 

   // references the first article element 
   var articleElem = document.getElementsByTagName("article")[0]; 
   
   // attaches the new img element to the new figure element 
   lastFigure.appendChild(lastImage); 

   // attches the document fragment to the article 
   // articleElem.appendChild(lastFigure); 
   articleElem.insertBefore(lastFigure, document.getElementById("rightarrow")); 

   var firstFigure = lastFigure.cloneNode(true); 
   firstFigure.id = "fig1"; 
   firstFigure.style.right = ""; 
   firstFigure.style.left = "45px"; 

   // articleElem.appendChild(firstFigure); 
   articleElem.insertBefore(firstFigure, document.getElementById("fig2")); 

   // gives the 2 new elements src images 
   document.getElementsByTagName("img")[0].src = "images/IMG_0" + photoOrder[0] + "sm.jpg";
   document.getElementsByTagName("img")[4].src = "images/IMG_0" + photoOrder[4] + "sm.jpg";

   // resets the figurecount variable 
   figureCount = 5; 

   // references the button 
   var numberButton = document.querySelector("#fiveButton p"); 
   numberButton.innerHTML = "Show fewer images"; 

   // changes the event listeners to remove images 
   if (numberButton.addEventListener) {
      numberButton.removeEventListener("click", previewFive, false); 
      numberButton.addEventListener("click", previewThree, false); 
   }
   else if (numberButton.attachEvent) {
      numberButton.detachEvent("onclick", previewFive); 
      numberButton.attachEvent("onclick", previewThree); 
   }
}

function previewThree() {
   // removes fig1 and fig5 elements from the DOM tree 
   var articleElem = document.getElementsByTagName("article")[0];
   var numberButton = document.querySelector("#fiveButton p"); 
   articleElem.removeChild(document.getElementById("fig1"));
   articleElem.removeChild(document.getElementById("fig5"));

   //  makes pictures display properly 
   figureCount = 3; 
   numberButton.innerHTML = "Show more images"; 
   if (numberButton.addEventListener) {
      numberButton.removeEventListener("click", previewThree, false); 
   }
   else if (numberButton.attacEvent) {
      numberButton.detachEvent("onclick", previewThree); 
      numberButton.attachEvent("onclick", previewFive); 
   }
}

/* open center figure in separate window */
function zoomFig() {
   var propertyWidth = 960; 
   var propertyHeight = 600; 
   var winLeft = ((screen.width - propertyWidth) / 2);
   var winTop = ((screen.height - propertyHeight) / 2); 
   var winOptions = "width = 960, height = 600,"; 
   winOptions += ",left=" + winLeft; 
   winOptions += ",top=" + winTop; 
   var zoomWindow = window.open("zoom.html", "zoomwin", winOptions); 
   // prevents the new window from getting lost 
   zoomWindow.focus(); 
}


function createEventListeners() {
   // references the left arrow button 
   var leftarrow = document.getElementById("leftarrow");
   if (leftarrow.addEventListener) {
      leftarrow.addEventListener("click", leftArrow, false); 
   } else if (leftarrow.attachEvent) {
      leftarrow.attachEvent("onclick", leftArrow); 
   }

   // references the right arrow button 
   var rightarrow = document.getElementById("rightarrow");
   if (rightarrow.addEventListener) {
      rightarrow.addEventListener("click", rightArrow, false); 
   } else if (rightarrow.attachEvent) {
      rightarrow.attachEvent("onclick", rightArrow); 
   }

   // references the second element of an array of the img element 
   var mainFig = document.getElementsByTagName("img")[1];

   if (mainFig.addEventListener) {
      mainFig.addEventListener("click", zoomFig, false); 
   }
   else if (mainFig.attachEvent) {
      mainFig.attachEvent("onclick", zoomFig); 
   }

   // event handlers for the "show more images" button
   var showAllButton = document.querySelector("#fiveButton p");
   if (showAllButton.addEventListener) {
      showAllButton.addEventListener("click", previewFive, false); 
   }
   else if (showAllButton.attachEvent) {
      showAllButton.attachEvent("onclick", previewFive); 
   }
}

/* create event listeners and populate image elements */
function setUpPage() {
   createEventListeners();
   populateFigures();
}

/* run setUpPage() function when page finishes loading */
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false); 
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUpPage);
}