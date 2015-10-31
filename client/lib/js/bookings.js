
Template.facilityManagement.events({
	"submit #facilityManagementFormForMeteor" : function createBookingEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }

		//TODO: Validation of input
		var input_date_beginning = document.getElementById("input_date_beginning").value;
		var noSession = document.getElementById("noSession").value;
		var repeatOption = document.getElementById("repeatOption").value;
		var input_time_beginning = document.getElementById("input_time_beginning").value;
		var input_time_end = document.getElementById("input_time_end").value;


		//draw relevant facilities out, isnt this more for displaying of form
		var input_capacity_min = document.getElementById("input_capacity_min").value;
		var facType = document.getElementById("facType").value;
		var facId = document.getElementByID("facIdI").value;
		//Todo: use repeat to create multiple booking

		//bookingDateI, sessionNoI, startTimeI, endTimeI, facIdI
		//"bookings", "facilities"

		var bookingDate = "";

		bookFacility(input_date_beginning, input_time_beginning, input_time_end, input_course, input_session, facIdI);
	},
	
	"change" : function facilityManagementFormForMeteorOnChangeHandler(e){
		e.preventDefault();
		console.log("EEEEEEEEEEEEEEEEEE");
		console.log(e);
		
		IfacType = document.getElementById("facType");
		Icapacity = document.getElementById("input_capacity_min");
		InumSessions = document.getElementById("facNumSessionSearch");
		Iinput_date_beginning = document.getElementById("input_date_begining");
		Iinput_date_end = document.getElementById("input_date_end");
		Iinput_time_beginning = document.getElementById("input_time_beginning");
		Iinput_time_end = document.getElementById("input_time_end");
		repeatOption = document.getElementById("facRepeatOptionSearch");
		
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
		Session.set("facInput_date_beginingSearch", Iinput_date_beginning);
		Session.set("facInput_date_endSearch", Iinput_date_end);
		Session.set("facInput_time_beginningSearch", Iinput_time_beginning);
		Session.set("facInput_time_endSearch", Iinput_time_end);
	}
});

Template.facilityManagement.events({

	//consider switching to this way
	//http://hacktivist.in/articles/Simple-crud-app-in-meteor/
	"click .editBooking" : function updateBookingEventHandler(e) {
		// debugger;
		// console.log(e);
		// console.log(this.name);
		var originalHTML = "" +
			"<h2>Name: {{name}}</h2><br />" +
			"<b>BookingCode:</b> {{BookingCode}}<br />" +
			"<b>fee:</b> {{fee}}<br />" +
			"<b>min:</b> {{min}}<br />" +
			"<b>max:</b> {{max}}<br />" +
			"<br />" +
			"<span class=\"text\">description: {{description}}</span><br />" +
			"<button class=\"editBooking\">edit</button>" +
			"<button class=\"deleteBooking\">delete</button>";

		var newHTML = "" +
			"<form class=\"BookingEditForm\"" +
			"<h2>Name: <input type=\"text\" value=\"" + this.name + "\" id=\"BookingEditName\"></h2><br />" +
			"<b>BookingCode:</b> <input type=\"text\" value=\"" + this.BookingCode + "\" id=\"BookingEditBookingCode\"><br />" +
			"<b>fee:</b> <input type=\"text\" value=\"" + this.fee + "\" id=\"BookingEditFee\"><br />" +
			"<b>min:</b> <input type=\"text\" value=\"" + this.min + "\" id=\"BookingEditMin\"><br />" +
			"<b>max:</b> <input type=\"text\" value=\"" + this.max + "\" id=\"BookingEditMax\"><br />" +
			"<br />" +
			"<span class=\"text\">description: <textarea  id=\"BookingEditDescription\">" + this.description + "</textarea></span><br />" +
			"<button class=\"editBookingSave\" >Save</button>" +
			"</form>";

		document.getElementById("BookingNodeIdObjectID(\"" + this._id + "\")").innerHTML = newHTML;
	},
	
	"submit #facMgmtFormy" : function(){
		e.preventDefault();
		// createBooking': function createBooking(bookingDateI, courseI, sessionNoI, startTimeI, endTimeI, facIdI){
		dates = getDatesFromRepeat();
		dates.forEach(function(details){
			Meteor.call("createBookingDateTime", details.startDateTime, details.endDateTime, document.getElementById("fac").value, courseI, sessionI);
		});
	},

	"submit .BookingEditForm" : function updateBookingSaveEventHandler(e) {
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }

		//TODO: Validation of input
		e.preventDefault();

		name = document.getElementById("BookingEditName").value,
		BookingCode = document.getElementById("BookingEditBookingCode").value,
		fee = document.getElementById("BookingEditFee").value,
		min = document.getElementById("BookingEditMin").value,
		max = document.getElementById("BookingEditMax").value,
		description = document.getElementById("BookingEditDescription").value
		Meteor.call("updateBooking", this._id, name, BookingCode, fee, min, max, description);

		// replace back with original HTML
		var originalHTML = "" +
			"<h2>Name: " + this.name + "</h2><br />" +
			"<b>BookingCode:</b> " + this.BookingCode + "<br />" +
			"<b>fee:</b> " + this.fee + "<br />" +
			"<b>min:</b> " + this.min + "<br />" +
			"<b>max:</b> " + this.max + "<br />" +
			"<br />" +
			"<span class=\"text\">description: " + this.description + "</span><br />" +
			"<button class=\"editBooking\">edit</button>" +
			"<button class=\"deleteBooking\">delete</button>";

		document.getElementById("BookingNodeIdObjectID(\"" + this._id + "\")").innerHTML = originalHTML;
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
		if (Session.get("facInput_date_beginingSearch") 			!= undefined) {details.startDate 		= Session.get("facInput_date_beginingSearch").value;}
		else{alert("pls set date");Session.set("facInput_date_beginingSearch", todayD);}
		// if (Session.get("facInput_date_endSearch") 				!= undefined) {details.endDate 			= Session.get("facInput_date_endSearch").value;}
		if (Session.get("facInput_time_beginningSearch") 			!= undefined) {details.startTime 		= Session.get("facInput_time_beginningSearch").value;}
		else{alert("pls set start time");Session.set("facInput_time_beginningSearch", todayS);}
		if (Session.get("facInput_time_endSearch") 						!= undefined) {details.endTime 			= Session.get("facInput_time_endSearch").value;}
		else{alert("pls set end time");Session.set("facInput_time_endSearch", todayE);}
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


function isFacilityAvailableOnThisTimeslot(facility, searchDate, timeStart, timeEnd){
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

// return an array of objects, each object having a start and end
function getDatesFromRepeat(){
	// facInput_date_beginingSearch
	// facInput_time_beginningSearch
	// facInput_time_endSearch
}













