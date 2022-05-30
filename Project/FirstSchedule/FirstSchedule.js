/// <reference path="typescript/global.d.ts" /> 

var p = MindFusion.Scheduling;

// create a new instance of the calendar 
var calendar = new p.Calendar(document.getElementById("calendar"));

calendar.monthSettings.headerStyle = p.MainHeaderStyle.Buttons | p.MainHeaderStyle.Title;
calendar.monthSettings.dayOfWeekFormat = p.DayOfWeekFormat.Full;
calendar.monthSettings.leadingWeekCount = 1;
calendar.monthSettings.showPaddingItems = true;
calendar.monthSettings.maxItems = 3;

calendar.theme = "first-theme";

const setDate = () =>{
    var getDate = window.localStorage.getItem('targetDate');
    findDate = JSON.parse(getDate);
    calendar.date = p.DateTime.fromDateParts(findDate.year, findDate.month, 1);
    console.log(findDate);
}

setDate();

//visualize the calendar
calendar.render();

loadPage();

calendar.itemCreating.addEventListener(validateCreateItem);
calendar.itemModified.addEventListener(validateModifyItem);

const targetDate = {
    day: 0,
    month: 0,
    year: 2022,
}

const daysOfMonth = (month, year) => {
	days = 28;
	if (month==2){
		if (year%4==0){days+=1}
	}else if (month <=7){
		if (month%2==0){days+=2}
		else {days+=3}
	}else{
		if (month%2==0){days+=3}
		else{days+=2}
	}
	return days;
}

function validateCreateItem(sender, args) {
    //checks if an item from calendar is being modified

    if ((args.item.subject == "")) {
        // alert("HERE!");
        alert("Events cannot be be empty!");
        args.cancel = true;
    }
    let checkDairy = args.item.subject.toLowerCase();
    if (checkDairy.includes("dairy") && 
        ((args.item.startTime.day == (args.item.endTime.day-1) && args.item.startTime.month == args.item.endTime.month) || 
        (args.item.startTime.day == args.item.startTime.daysInMonth && args.item.endTime.day==1 && args.item.startTime.month == (args.item.endTime.month-1)))){

        var answer = window.confirm("SEE TODAY'S DAIRY?");
        if (answer) {
            args.cancel = true;
            targetDate.day = args.item.startTime.day;
            targetDate.month = args.item.startTime.month;
            targetDate.year = args.item.startTime.year;
            console.log(targetDate);
            window.localStorage.setItem('DairyTargetDate', JSON.stringify(targetDate));
            window.location.href = "../Dairy/index.html";
        }
        else {
            //some code
        }
    }
    console.log(args);

}

function validateModifyItem(sender, args) {
    //checks if an item from calendar is being modified
    // const subject = args.item.subject;
    console.log("Modify!",args, args.item);
    if ((args.item.subject == "")) {
        // alert("HERE!");
        alert("Events cannot be be empty!");
        args.item.subject = args.oldItem.subject;
        console.log("Empty Modify!",args, args.item.subject);
    }
}


var saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', function () {

    var data = calendar.schedule.toJson();

    window.localStorage.setItem("planner",JSON.stringify(data));
    console.log("saved!",data);

    // var blob = new Blob([data], {
    //     type: 'application/json'
    // });

    // url = URL.createObjectURL(blob);
    // var link = document.createElement('a');
    // link.setAttribute('href', url);
    // link.setAttribute('download', 'first-schedule.json');

    // var event = document.createEvent('MouseEvents');
    // event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    // link.dispatchEvent(event);
});

// function loadJSON(callback) {

//     var xobj = new XMLHttpRequest();
//     xobj.overrideMimeType("application/json");
//     xobj.open('GET', 'first-schedule.json', true); // Replace 'first-schedule' with the path to your file
//     xobj.onreadystatechange = function () {
//         if (xobj.readyState == 4 && xobj.status == "200") {
//             // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//             callback(xobj.responseText);
//         }
//     };
//     xobj.send(null);
// }

var loadButton = document.getElementById('loadButton');
loadButton.addEventListener('click', loadPage);

function loadPage() {
    console.log(window.localStorage.getItem("planner"));
    if (window.localStorage.getItem("planner")){
        calendar.schedule.fromJson(JSON.parse(window.localStorage.getItem("planner")));
        alert("Page load successfully!");
    }else{
        alert("No previous planner is detected.");       
    }
    // init();
};

function init() {
    loadJSON(function (response) {
        // load the schedule from the JSON string
        // calendar.schedule.fromJson(response);
    });
}


