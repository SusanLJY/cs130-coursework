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

mapping = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
}

const targetDate = {
    month: 0,
    year: 2022,
}

const passToCalendar = (ev) =>{

    // document.querySelector("#y").textContent=currentYear;
    // document.querySelector("#m").textContent=mapping[ev.currentTarget.className];
    // console.log(document.querySelector("#y").textContent,document.querySelector("#m").textContent);
    targetDate.month = mapping[ev.currentTarget.className];
    targetDate.year = currentYear;
    console.log(targetDate);
    window.localStorage.setItem('targetDate', JSON.stringify(targetDate));

    window.location.href = "../FirstSchedule/FirstSchedule.html";
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