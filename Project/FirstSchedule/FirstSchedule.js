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

calendar.itemCreating.addEventListener(validateCreateItem);
calendar.itemModified.addEventListener(validateModifyItem);

const targetDate = {
    day: 0,
    month: 0,
    year: 2022,
}

function validateCreateItem(sender, args) {
    //checks if an item from calendar is being modified
    console.log()
    if ((args.item.subject == "")) {
        // alert("HERE!");
        alert("Events cannot be be empty!");
        args.cancel = true;
    }
    let checkDairy = args.item.subject.toLowerCase();
    if (checkDairy.includes("dairy") && args.item.startTime.day == (args.item.endTime.day-1) && args.item.startTime.month == args.item.endTime.month){
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


var button = document.getElementById('saveButton');
button.addEventListener('click', function () {

    var data = calendar.schedule.toJson();

    var blob = new Blob([data], {
        type: 'application/json'
    });

    url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'first-schedule.json');

    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(event);
});

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'first-schedule.json', true); // Replace 'first-schedule' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

var button1 = document.getElementById('loadButton');
button1.addEventListener('click', function () {
    init();
});

function init() {
    loadJSON(function (response) {
        // load the schedule from the JSON string
        calendar.schedule.fromJson(response);
    });
}


