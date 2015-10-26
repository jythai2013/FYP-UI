Template.facilityBooking.events({
	"submit #facilityBookingFormForMeteor" : function createBookingEventHandler(e) {
		e.preventDefault();
		
		
	}
});
Template.facilityBooking.events({
	"submit #facilityBookingFormForMeteor" : function createBookingEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }

		//TODO: Validation of input
		var intput_date_beginning = document.getElementById("input_date_beginning").value;
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

		bookFacility(input_date_beginning, input_course, input_session, input_time_beginning, input_time_end, facIdI);
	}
});

Template.facilityBooking.events({

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

function getDatesFromRepeat(){
	
};

function isFacilityAvailableOnThisTimeslot(facility, searchDate, timeStart, timeEnd){
	// results = new Array();
	soFarSoGood = true;
	// |				|
	//    |		|
	existingBookings = bookings.find({
									"facId":facility._id,
									"date":searchDate,
									"startTime":{$lte: timeStart },		
									"endTime":{$gte: timeEnd }				
								}).fetch();
	if (existingBookings.length > 0){
		// already have a booking sometime in that time so make sure it does not get returned
		return false;
	}
	// |				|
	//    |				|
	existingBookings = bookings.find({
									"facId":facility._id,
									"date":searchDate,
									"start_time":{$lte: timeStart },	
									"end_time":{$lte: timeEnd }				
								}).fetch();
	if (existingBookings.length > 0){
		// already have a booking sometime in that time so make sure it does not get returned
		return false;
	}
	// 			|				|
	//    |		|
	existingBookings = bookings.find({
									"facId":facility._id,
									"date":searchDate,
									"start_time":{$gte: timeStart },	// 			|				|
									"end_time":{$gte: timeEnd }				//    |		|
								}).fetch();
	if (existingBookings.length > 0){
		// already have a booking sometime in that time so make sure it does not get returned
		return false;
	}
	// 			|				|
	//    |						|
	existingBookings = bookings.find({
									"facId":facility._id,
									"date":searchDate,
									"start_time":{$gte: timeStart },	// 			|				|
									"end_time":{$lte: timeEnd }				//    |						|
								}).fetch();
	if (existingBookings.length > 0){
		// already have a booking sometime in that time so make sure it does not get returned
		return false;
	}
	return soFarSoGood;
};

function bookFacility(input_date_beginning, input_course, input_session, input_time_beginning, input_time_end, facIdI) {
	dates = getDatesFromRepeat();
	var canBook = true;
	
	//check the whole repeat duration, if one session is not available then the repeat is invalid.
	dates.forEach(Function(input_date_beginning, input_time_beginning, input_time_end){
		var available = isFacilityAvailableOnThisTimeslot(facIdI, input_date_beginning, input_time_beginning, input_time_end) | false;
		if(!available){
			return false;
		}		 
	});

	//for each date object, create a booking
	dates.forEach(Function(){
		Meteor.call("createBooking", input_date_beginning, input_course, input_session, input_time_beginning, input_time_end, facIdI);
	});
};