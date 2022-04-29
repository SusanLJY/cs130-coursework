/*
    Hints: 
    1. Attach click event handlers to all four of the 
       buttons (#default, #ocean, #desert, and #high-contrast).
    2. Modify the className property of the body tag 
       based on the button that was clicked.
*/

const makeDefault = () => {
   console.log('default!')
   document.querySelector("body").className = "";
}

const makeOcean = () => {
   console.log('ocean!')
   document.querySelector("body").className = "ocean";
}
const makeDesert = () => {
   console.log('desert!')
   document.querySelector("body").className = "desert";   
}
const makeHighContrast = () => {
   console.log('high-contrast!')
   document.querySelector("body").className = "high-contrast"; 
}

document.querySelector('#default').addEventListener('click', makeDefault);
document.querySelector('#ocean').addEventListener('click', makeOcean);
document.querySelector('#desert').addEventListener('click', makeDesert);
document.querySelector('#high-contrast').addEventListener('click', makeHighContrast);