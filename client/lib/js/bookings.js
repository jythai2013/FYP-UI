

	$(document).ready(function() {

    // page is now ready, initialize the calendar...
		// jQuery.noConflict();
		makeQTip();

});

// Setup QTip
	function makeQTip() {
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

		tooltip = $('<div/>').qtip({
			id: 'fullcalendar',
			prerender: true,
			content: {
				text: ' ',
				title: {
					button: true
				}
			},
			position: {
				my: 'bottom center',
				at: 'top center',
				target: 'mouse',
				viewport: $('#fullCalendarDiv'),
				adjust: {
					mouse: false,
					scroll: false
				}
			},
			show: false,
			hide: false,
			style: 'qtip-light'
		}).qtip('api');
	}














Template.facilityManagement.events({
	"change #facMgmtFormy" : function facilityManagementFormForMeteorOnChangeHandler(e){
		e.preventDefault();
		console.log("EEEEEEEEEEEEEEEEEE");
		console.log(e);
		
		IfacType = document.getElementById("facType").value;
		Icapacity = document.getElementById("input_capacity_min").value;
		InumSessions = document.getElementById("facNumSessionSearch").value;
		var startDateTimeI = document.getElementById("input_time_beginning").value;
		var endinDateTimeI = document.getElementById("input_time_end").value;
		// repeatOption = document.getElementById("facRepeatOptionSearch").value;
		
		startDateTime = new Date(startDateTimeI);
		endinDateTime = new Date(endinDateTimeI);
		
		// IDays = new Object();
		// IDays.mon = document.getElementById("facSearchMon").checked;
		// IDays.tue = document.getElementById("facSearchTue").checked;
		// IDays.wed = document.getElementById("facSearchWed").checked;
		// IDays.thu = document.getElementById("facSearchThu").checked;
		// IDays.fri = document.getElementById("facSearchFri").checked;
		// IDays.sat = document.getElementById("facSearchSat").checked;
		
		// Session.set("facDaysSearch", IDays);
		Session.set("facTypeSearch", IfacType);
		Session.set("facCapacitySearch", Icapacity);
		Session.set("facNumSessionSearch", InumSessions);
		// Session.set("facReapeatOptionSearch", repeatOption);
		Session.set("facStartDateTimeSearch", startDateTime);
		Session.set("facEndinDateTimeSearch", endinDateTime);
	}
});

Template.facilityManagement.events({
	
	"submit #facMgmtFormy" : function(e){
		e.preventDefault();
		// createBooking': function createBooking(bookingDateI, courseI, sessionNoI, startTimeI, endTimeI, facIdI){
		dates = getDatesFromRepeat();
		courseI = document.getElementById("courseId").value;
		sessionI = document.getElementById("groupId").value;
		dates.forEach(function(details){
			Meteor.call("createBooking2", details.start, details.end, document.getElementById("fac").value, courseI, sessionI);
		});
	},

	"click .deleteBooking" : function deleteBookingEventHandler(e) {
		console.log(this._id);
		Meteor.call("deleteBooking", this._id);
	}
});


Template.facilityManagement.helpers({
	calOptions: function(){
		
		//converts the matchingFacilities.collection._docs._map into an array
		var array = $.map(Bookings.find().collection._docs._map, function(value, index) {
				return [value];
		});
		
		array.forEach(function(booking){
			oneCourse = Courses.findOne({courseCode:booking.course});
			if(oneCourse != undefined)
				courseName = oneCourse.courseName;
			else
				courseName = booking.course
			booking.title = courseName + "-" + booking.sessionNo;
		});
		
		return {
			header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
			// events: [
								// {
									// title  : 'Workplace Health and Safety',
									// start  : '2015-10-21T13:00:00',
									// end    : '2015-10-21T17:00:00',
									// allDay : false 
								// },
								// {
									// title  : 'Workplace Health and Safety',
									// start  : '2015-10-21T13:00:00',
									// end    : '2015-10-21T17:00:00',
									// allDay : false 
								// }
							// ]
			events: array,
			eventMouseover: function(data, event, view) {
				var content = '<h3>'+data.title+'</h3>' + 
					'<p><b>Start:</b> '+data.start+'<br />' + 
					(data.end && '<p><b>End:</b> '+data.end+'</p>' || '');

				tooltip.set({
					'content.text': content
				})
				.reposition(event).show(event);
			},
			eventMouseout: function() {tooltip.hide()},
			dayClick: function() { tooltip.hide() },
			eventResizeStart: function() { tooltip.hide() },
			eventDragStart: function() { tooltip.hide() },
			viewDisplay: function() { tooltip.hide() },
		};
	}
});
	
Template.bookingFacilityForm.helpers({
	facilitySearchResult:function(){
		console.log("facilitySearchResult Start");
		
		details = new Object();
		if (Session.get("facCapacitySearch") 									!= undefined) {details.capacity 		= Session.get("facCapacitySearch"); }
		else{Session.set("facCapacitySearch", 0);}		
		// if (Session.get("facTypeSearch") 									!= undefined) {details.facType 			= Session.get("facTypeSearch").value;}
		// if (Session.get("facRepeatOptionSearch") 					!= undefined) {details.repeatOption = Session.get("facRepeatOptionSearch").value;}
		// if (Session.get("facNumSessionSearch") 						!= undefined) {details.numSessions 	= Session.get("facNumSessionSearch").value;}
		if (Session.get("facStartDateTimeSearch") 			!= undefined) {details.start 		= Session.get("facStartDateTimeSearch").value;}
		else{console.log("pls set date");}
		// if (Session.get("facInput_date_endSearch") 				!= undefined) {details.endDate 			= Session.get("facInput_date_endSearch").value;}
		if (Session.get("facEndDateTimeSearch") 			!= undefined) {details.end 		= Session.get("facEndDateTimeSearch").value;}
		else{console.log("pls set start time");}
		// if (Session.get("facDurationSearch") 						!= undefined) {details.duration 			= Session.get("facDurationSearch").value;}
		// else{console.log("pls set end time");console.log(Session.get("facStartDateTimeSearch"));}
		// if (Session.get("facDaysSearch") 									!= undefined) {details.endTime 			= Session.get("facDaysSearch").value;}
		
		
		if( Session.get("facTypeSearch") != undefined && Session.get("facTypeSearch").length > 0){
			ascapacity = parseInt(Session.get("facCapacitySearch"));
			typea = Session.get("facTypeSearch");
			console.log(ascapacity);
			console.log(typea);
			matchingFacilities = Facilities.find({"facType":typea, "capacity": {$gte : ascapacity}}).fetch();
			matchingFacilities = Facilities.find({"capacity": {$gte : ascapacity}}).fetch();
			if(isNaN(ascapacity)){matchingFacilities = Facilities.find({"facType":typea}).fetch();}
			console.log(matchingFacilities);
		} else{
			ascapacity = parseInt(Session.get("facCapacitySearch"));
			console.log(ascapacity);
			matchingFacilities = Facilities.find({"capacity": {$gte : ascapacity}}).fetch();
			if(isNaN(ascapacity)){matchingFacilities = Facilities.find({}).fetch();}
			console.log(matchingFacilities);
		}
		// console.log("facilitySearchResult matchingFacilities");
		// console.log(matchingFacilities.collection._docs._map);
		// console.log("R1");
		// console.log(details.facType);
		// console.log(details.capacity);
		
		// //converts the matchingFacilities.collection._docs._map into an array
		// var array = $.map(matchingFacilities.collection._docs._map, function(value, index) {
				// return [value];
		// });
		
		resultsF = new Array();
		console.log(resultsF);
		matchingFacilities.forEach(function(facility){
			console.log(facility);
			available = findIfFacilityIsAvailable(facility);
			// available = true;
			console.log(available);
			if(available){
				console.log(facility);
				resultsF.push(facility);
			} 
		});
		
		console.log("facilitySearchResult resultsF");
		// console.log(resultsF);
		
		console.log("facilitySearchResult End");
		
		return resultsF;
	}
});

// facility, Iinput_date_beginning, Iinput_date_end, Iinput_time_beginning, Iinput_time_end, IrepeatOption
function findIfFacilityIsAvailable(facIdI) {
	dates = getDatesFromRepeat();
	var canBook = true;
	
	//check the whole repeat duration, if one session is not available then the repeat is invalid.
	dates.forEach(function(details){
		startDT = details.start; 
		endinDT = details.end;
		var available = isFacilityAvailableOnThisTimeslot(facIdI, startDT, endinDT) | false;
		console.log(facIdI);
		console.log(available);
		if(!available){
			return false;
		}		 
	});
	return canBook;
}


function isFacilityAvailableOnThisTimeslot(facility, timeStart, timeEnd){
	// results = new Array();
	soFarSoGood = true;
	// |				|
	//    |		|
	existingBookings = Bookings.find({
									"facId":facility._id,
									"start":{$lte: timeStart },		
									"end":{$gte: timeEnd }				
								}).fetch();
	if (existingBookings.length > 0){
		// already have a booking sometime in that time so make sure it does not get returned
		console.log("false");
		return false;
	}
	
	
	// |				|
	//    |				|
	existingBookings = Bookings.find({
									"facId":facility._id,
									"start":{$lte: timeStart },	
									"end":{$lte: timeEnd }				
								}).fetch();
	if (existingBookings.length > 0){
		// already have a booking sometime in that time so make sure it does not get returned
		console.log("false");
		return false;
	}
	
	
	// 			|				|
	//    |		|
	existingBookings = Bookings.find({
									"facId":facility._id,
									"start":{$gte: timeStart },		
									"end":{$gte: timeEnd }			
								}).fetch();
	if (existingBookings.length > 0){
		// already have a booking sometime in that time so make sure it does not get returned
		console.log("false");
		return false;
	}
	
	
	// 			|				|
	//    |						|
	existingBookings = Bookings.find({
									"facId":facility._id,
									"start":{$gte: timeStart },		// 			|				|
									"end":{$lte: timeEnd }				//    |						|
								}).fetch();
	if (existingBookings.length > 0){
		// already have a booking sometime in that time so make sure it does not get returned
		console.log("false");
		return false;
	}
	console.log(soFarSoGood);
	return soFarSoGood;
}


function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
		console.log(result);
    return result;
}

function addMilis(date, num) {
    var result = new Date(date);
    result.setTime(result.getTime() + num);
		console.log(result);
    return result;
}

// return an array of objects, each object having a start and end
function getDatesFromRepeat(){
	IDays = Session.get("facDaysSearch");
	IfacType = Session.get("facTypeSearch");
	Icapacity = Session.get("facCapacitySearch");
	InumSessions = Session.get("facNumSessionSearch");
	repeatOption = Session.get("facReapeatOptionSearch");
	startDateTime = Session.get("facStartDateTimeSearch");
	endinDateTime = Session.get("facEndinDateTimeSearch");
	// console.log(this);
	// console.log(startDateTime);
	
	//for use in repeat calculations
	var temp1 = new Date();
			temp1.setHours(startDateTime.getHours());
			temp1.setMinutes(startDateTime.getMinutes());
	var temp2 = new Date();
			temp2.setHours(endinDateTime.getHours());
			temp2.setMinutes(endinDateTime.getMinutes());
	var duration  = temp2 - temp1
	var oneDay = 24*60*60*1000;
	
	
	//first timeslot
	results = new Array();
	var firstSlot = new Object();
	firstSlot.start = new Date(startDateTime);
	firstSlot.end = new Date(endinDateTime);
	results.push(firstSlot);
	
	//subsequent timeslots
	var timeSlot = new Object();
		
	// <option value="everyday">Everyday</option>
	if (repeatOption=="everyday"){
		if(InumSessions > 0 && InumSessions != undefined){
			for(var i = 1; i < InumSessions; i++){
				timeSlot.start = addDays(startDateTime, i);
				timeSlot.end   = addMilis(timeSlot.start, duration);
				results.push(timeSlot);
			}
		} else if(endinDateTime != undefined){
			var diffDays = Math.round(Math.abs((startDateTime.getTime() - endinDateTime.getTime())/(oneDay)));
			for(var i = 1; i < diffDays; i++){
				timeSlot.start = addDays(startDateTime, i);
				timeSlot.end   = addMilis(timeSlot.start, duration);
				results.push(timeSlot);
			}
		}
	}
	// <option value="weekday">Weekdays</option>
	else if (repeatOption=="weekday"){
		if(InumSessions > 0 && InumSessions != undefined){
			for(var i = 1; i < InumSessions; i++){
				timeSlot.start = addDays(startDateTime, i);
				if(timeSlot.start.getDay() > 0 && timeSlot.start.getDay() < 7){
					timeSlot.end   = addMilis(timeSlot.start, duration);
					results.push(timeSlot);
				}
			}
		} else if(endinDateTime != undefined){
			var diffDays = Math.round(Math.abs((startDateTime.getTime() - endinDateTime.getTime())/(oneDay)));
			for(var i = 1; i < diffDays; i++){
				timeSlot.start = addDays(startDateTime, i);
				if(timeSlot.start.getDay() > 0 && timeSlot.start.getDay() < 7){
					timeSlot.end   = addMilis(timeSlot.start, duration);
					results.push(timeSlot);
				}
			}
		}
	}
	// <option value="weekends">Weekends</option>
	else if (repeatOption=="weekends"){
		if(InumSessions > 0 && InumSessions != undefined){
			for(var i = 1; i < InumSessions; i++){
				timeSlot.start = addDays(startDateTime, i);
				if(timeSlot.start.getDay() == 0 || timeSlot.start.getDay() == 7){
					timeSlot.end   = addMilis(timeSlot.start, duration);
					results.push(timeSlot);
				}
			}
		} else if(endinDateTime != undefined){
			var diffDays = Math.round(Math.abs((startDateTime.getTime() - endinDateTime.getTime())/(oneDay)));
			for(var i = 1; i < diffDays; i++){
				timeSlot.start = addDays(startDateTime, i);
				if(timeSlot.start.getDay() == 0 || timeSlot.start.getDay() == 7){
					timeSlot.end   = addMilis(timeSlot.start, duration);
					results.push(timeSlot);
				}
			}
		}
	}
	// <option value="weekly">Weekly</option>
	else if (repeatOption=="weekly"){
		if(InumSessions > 0 && InumSessions != undefined){
			
		} else if(endinDateTime != undefined){
			
		}
	}
	// <option value="mothly">Monthly</option>
	else if (repeatOption=="mothly"){
		if(InumSessions > 0 && InumSessions != undefined){
			
		} else if(endinDateTime != undefined){
			
		}
	} else{
		//repeatOption not set, just return 1 timeslot
		return results;
	}
}








// TODO: 
// date repeater
// change from date and time to datetime
//
// email blast functionality, what is the courselist name in db, and the structure?



// 1) match the values
// 2) facility form add course and session
// 3) blast email button id, i cant find the template. maybe wrong git branch
// 4) groups collection, the start date name. eg. "start" or "startDate"
// 5) groups collection classlist name and structure. eg "classlist" and an array of userID. or "students" and an array of names. prefer userID or meteor's _id for easier linking. if names, may not be unique


// 'click button.myFileInputButton':function(event, template){
      // var files = document.getElementById("myFileInput").files;
      // files.forEach(function(file) {
        // var fileObj = new FS.File(file);
        // Files.insert(fileObj,function(err)){
          // console.log(err);
        // }
      // });
    // }
