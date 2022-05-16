let currentYear = 2022;

const showYear = () =>{
    document.querySelector("#prev").textContent=currentYear-1;
    document.querySelector("#curr").textContent=currentYear;
    document.querySelector("#next").textContent=currentYear+1;
}

const showLeft = (ev) =>{
    currentYear -=3;
    showYear();
}

const showRight = (ev) =>{
    currentYear +=3;
    showYear();
}

const showPrev = (ev) =>{
    currentYear -=1;
    // console.log(currentYear);
    showYear();
}

const showNext = (ev) =>{
    currentYear +=1;
    // console.log(currentYear);
    showYear();
}

const passToCalendar = (ev) =>{
    document.querySelector("#y").textContent=currentYear;
    document.querySelector("#m").textContent=ev.currentTarget.className;
    // console.log(document.querySelector("#y").textContent,document.querySelector("#m").textContent);
    window.location.href = "../Calendar/calendar.html";
}

document.querySelector('.left').onclick = showLeft;
document.querySelector('.right').onclick = showRight;
document.querySelector('#prev').onclick = showPrev;
document.querySelector('#next').onclick = showNext;
document.querySelector('.jan').onclick = passToCalendar;
document.querySelector('.feb').onclick = passToCalendar;
document.querySelector('.mar').onclick = passToCalendar;
document.querySelector('.apr').onclick = passToCalendar;
document.querySelector('.may').onclick = passToCalendar;
document.querySelector('.jun').onclick = passToCalendar;
document.querySelector('.jul').onclick = passToCalendar;
document.querySelector('.aug').onclick = passToCalendar;
document.querySelector('.sep').onclick = passToCalendar;
document.querySelector('.oct').onclick = passToCalendar;
document.querySelector('.nov').onclick = passToCalendar;
document.querySelector('.dec').onclick = passToCalendar;