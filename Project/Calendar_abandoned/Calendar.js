var p = MindFusion.Scheduling;


//create a new calendar instance
var calendar = new p.Calendar(document.getElementById("calendar"));
calendar.theme = "business";

//Update the date of planner
var targetDate = window.localStorage.getItem('targetDate');
console.log(targetDate);
calendar.date.dayOfMonth = 1;
// calendar.TimetableSetting.Dates.month = targetDate.month;
// calendar.TimetableSetting.Dates.year = targetDate.year;
// calendar.date.daysOfMonth = daysOfMonth(targetDate.month,targetDate.year);
console.log(calendar.timetableSettings.dates);


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
	return days
}


calendar.selectionEnd.addEventListener(handleSelection);
calendar.headerClick.addEventListener(handleHeaderClick);
// calendar.buttonClick.addEventListener(handleButtonClick);

//visualize the calendar
console.log(calendar.date);
calendar.render();



// function handleButtonClick(sender, args) {
//     if(args.button == doNotAllowButton)
//       {
//           //cancel the action
//           args.cancel = true;
//       }
// }

function handleHeaderClick(sender, args)
{
	// console.log("Hello!!");
	if(sender.currentView === p.CalendarView.Timetable)
	{
		// console.log("Hi!!");
		sender.date = sender.timetableSettings.dates.items()[0];
		console.log(sender.date)
		sender.currentView = p.CalendarView.SingleMonth;
		
	}
}

function handleSelection(sender, args)
{
	if(sender.currentView === p.CalendarView.SingleMonth)
	{
		//cancel the default behavior
		args.cancel = true;
		
		var start = args.startTime;
		var end = args.endTime;
		
		//clear all dates from the timetable
		sender.timetableSettings.dates.clear();
		
		while(start < end)
		{
			sender.timetableSettings.dates.add(start);
			start = p.DateTime.addDays(start, 1);
			
		}
		
		sender.currentView = p.CalendarView.Timetable;
	}
}

