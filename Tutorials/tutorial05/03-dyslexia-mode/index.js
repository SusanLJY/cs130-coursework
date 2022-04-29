/* 
  See Smashing Magazine Tutorial:
  https://www.smashingmagazine.com/2021/11/dyslexia-friendly-mode-website/
*/

const makeDyslexia = () => {
  console.log('dyslexia!')
  if (document.querySelector("body").className == "dyslexia"){
    document.querySelector("body").className = "";
  } else {
    document.querySelector("body").className = "dyslexia";
  }
     
}

document.querySelector('#dyslexia-toggle').addEventListener('click', makeDyslexia);