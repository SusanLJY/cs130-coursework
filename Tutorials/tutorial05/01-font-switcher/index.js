const makeBigger = () => {
   // alert('make bigger!');
   // console.log('make bigger!');
   var cur = window.getComputedStyle(document.querySelector(".content")).fontSize;
   // console.log(cur)
   var s = parseInt(cur.replace("px", "")) + 3
   // console.log(s+"px")
   document.querySelector(".content").style.fontSize = s + "px" ;
};

const makeSmaller = () => {
   // alert('make smaller!');
   // console.log('make smaller!');
   var cur = window.getComputedStyle(document.querySelector(".content")).fontSize;
   // console.log(cur)
   var s = parseInt(cur.replace("px", "")) -3
   // console.log(s+"px")
   document.querySelector(".content").style.fontSize = s + "px" ;
};


document.querySelector('#a1').addEventListener('click', makeBigger);
document.querySelector('#a2').addEventListener('click', makeSmaller);

