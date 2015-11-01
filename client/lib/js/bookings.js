
Template.facilityManagement.events({
	"change #facMgmtFormy" : function facilityManagementFormForMeteorOnChangeHandler(e){
		e.preventDefault();
		console.log("EEEEEEEEEEEEEEEEEE");
		console.log(e);
		
		IfacType = document.getElementById("facType").value;
		Icapacity = document.getElementById("input_capacity_min").value;
		InumSessions = document.getElementById("facNumSessionSearch").value;
		var startDateTime = document.getElementById("input_time_beginning").value;
		var endinDateTime = document.getElementById("input_time_end").value;
		repeatOption = document.getElementById("facRepeatOptionSearch").value;
		
		IDays = new Object();
		IDays.mon = document.getElementById("facSearchMon").checked;
		IDays.tue = document.getElementById("facSearchTue").checked;
		IDays.wed = document.getElementById("facSearchWed").checked;
		IDays.thu = document.getElementById("facSearchThu").checked;
		IDays.fri = document.getElementById("facSearchFri").checked;
		IDays.sat = document.getElementById("facSearchSat").checked;
		
		Session.set("facDaysSearch", IDays);
		Session.set("facTypeSearch", IfacType);
		Session.set("facCapacitySearch", Icapacity);
		Session.set("facNumSessionSearch", InumSessions);
		Session.set("facReapeatOptionSearch", repeatOption);
		Session.set("facStartDateTimeSearch", startDateTime);
		Session.set("facEndinDateTimeSearch", endinDateTime);
	}
});

Template.facilityManagement.events({
	
	"submit #facMgmtFormy" : function(){
		e.preventDefault();
		// createBooking': function createBooking(bookingDateI, courseI, sessionNoI, startTimeI, endTimeI, facIdI){
		dates = getDatesFromRepeat();
		dates.forEach(function(details){
			Meteor.call("createBookingDateTime", details.startDateTime, details.endDateTime, document.getElementById("fac").value, courseI, sessionI);
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
		
		return {
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
			events: array
		};
	},
	
  facilities: function () {
    return Facilities.find(); // Where Images is an FS.Collection instance
  },
	
	facilitySearchResult:function(){
		console.log("facilitySearchResult Start");
		results = new Array();
		
		details = new Object();
		var today = new Date();
		var todayS = (today.getHours()) +":" +today.getMinutes();
		var todayE = (today.getHours() + 1) +":" +today.getMinutes();
		var todayD = new Date(today.getFullYear(),today.getMonth(),today.getDate());
		if (Session.get("facCapacitySearch") 									!= undefined) {details.capacity 		= Session.get("facCapacitySearch").value; }
		else{Session.set("facCapacitySearch", 0);}		
		// if (Session.get("facTypeSearch") 									!= undefined) {details.facType 			= Session.get("facTypeSearch").value;}
		// if (Session.get("facRepeatOptionSearch") 					!= undefined) {details.repeatOption = Session.get("facRepeatOptionSearch").value;}
		// if (Session.get("facNumSessionSearch") 						!= undefined) {details.numSessions 	= Session.get("facNumSessionSearch").value;}
		if (Session.get("facStartDateTimeSearch") 			!= undefined) {details.start 		= Session.get("facStartDateTimeSearch").value;}
		else{console.log("pls set date");Session.set("facStartDateTimeSearch", todayD);}
		// if (Session.get("facInput_date_endSearch") 				!= undefined) {details.endDate 			= Session.get("facInput_date_endSearch").value;}
		if (Session.get("facEndDateTimeSearch") 			!= undefined) {details.end 		= Session.get("facEndDateTimeSearch").value;}
		else{console.log("pls set start time");Session.set("facEndDateTimeSearch", todayS);}
		if (Session.get("facDurationSearch") 						!= undefined) {details.duration 			= Session.get("facDurationSearch").value;}
		else{console.log("pls set end time");Session.set("facDurationSearch", todayE);}
		// if (Session.get("facDaysSearch") 									!= undefined) {details.endTime 			= Session.get("facDaysSearch").value;}
		
		
		if( Session.get("facTypeSearch") != undefined){
			matchingFacilities = Facilities.find({"facType":Session.get("facTypeSearch").value, "capacity": {$gte : Session.get("facCapacitySearch").value}});
		} else{
			matchingFacilities = Facilities.find({"capacity": {$gte : Session.get("facCapacitySearch").value}});
		}
		// console.log("facilitySearchResult matchingFacilities");
		// console.log(matchingFacilities.collection._docs._map);
		// console.log("R1");
		// console.log(details.facType);
		// console.log(details.capacity);
		
		//converts the matchingFacilities.collection._docs._map into an array
		var array = $.map(matchingFacilities.collection._docs._map, function(value, index) {
				return [value];
		});
		
		array.forEach(function(facility){
			console.log(facility);
			available = findIfFacilityIsAvailable();
			// available = true;
			console.log(available);
			if(available) results.push(facility);
		});
		
		console.log("facilitySearchResult results");
		console.log(results);
		
		console.log("facilitySearchResult End");
		
		return results;
	}
});


function isFacilityAvailableOnThisTimeslot(facility, timeStart, timeEnd){
	// results = new Array();
	soFarSoGood = true;
	// |				|
	//    |		|
	existingBookings = bookings.find({
									"facId":facility._id,
									"start":{$lte: timeStart },		
									"end":{$gte: timeEnd }				
								}).fetch();
	if (existingBookings.length > 0){
		// already have a booking sometime in that time so make sure it does not get returned
		return false;
	}
	
	
	// |				|
	//    |				|
	existingBookings = bookings.find({
									"facId":facility._id,
									"start":{$lte: timeStart },	
									"end":{$lte: timeEnd }				
								}).fetch();
	if (existingBookings.length > 0){
		// already have a booking sometime in that time so make sure it does not get returned
		return false;
	}
	
	
	// 			|				|
	//    |		|
	existingBookings = bookings.find({
									"facId":facility._id,
									"start":{$gte: timeStart },		
									"end":{$gte: timeEnd }			
								}).fetch();
	if (existingBookings.length > 0){
		// already have a booking sometime in that time so make sure it does not get returned
		return false;
	}
	
	
	// 			|				|
	//    |						|
	existingBookings = bookings.find({
									"facId":facility._id,
									"start":{$gte: timeStart },		// 			|				|
									"end":{$lte: timeEnd }				//    |						|
								}).fetch();
	if (existingBookings.length > 0){
		// already have a booking sometime in that time so make sure it does not get returned
		return false;
	}
	return soFarSoGood;
}

// facility, Iinput_date_beginning, Iinput_date_end, Iinput_time_beginning, Iinput_time_end, IrepeatOption
function findIfFacilityIsAvailable() {
	dates = getDatesFromRepeat();
	var canBook = true;
	
	//check the whole repeat duration, if one session is not available then the repeat is invalid.
	dates.forEach(function(details){
		startDT = details.start; 
		endinDT = details.end;
		var available = isFacilityAvailableOnThisTimeslot(facIdI, startDT, endinDT) | false;
		if(!available){
			return false;
		}		 
	});
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
	
	//for use in repeat calculations
	var temp1 = new Date();
			temp1.setHours(startDateTime.getHours());
			temp1.setMinutes(startDateTime.getMinutes());
			temp1.setSeconds()(startDateTime.getSeconds());
	var temp2 = new Date();
			temp2.setHours(endDateTime.getHours());
			temp2.setMinutes(endDateTime.getMinutes());
			temp2.setSeconds()(endDateTime.getSeconds());
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



// 1) facility form change to datetime
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