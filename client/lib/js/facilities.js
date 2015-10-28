// Template.facilityBooking.events({
	// "submit #faciltyAddForm" : function createFacilityEventHandler(e) {
		// e.preventDefault();
		// //TODO: Validation of user
		// // if(Meteor.user.userType != "admin"){
		// // return false;
		// // }

		// //TODO: Validation of input
		// var capacity = document.getElementById("input_capacity_max").value;
		// var facType = document.getElementById("facType").value;
		// var fac = document.getElementById("fac").value;
		// var description = document.getElementById("description").value;

		// Meteor.call("createFacility", capacity, facTypeI, facI, cDescriptionI);
	// },
	
	// "click #deleteFacility" : function deleteFacilityEventHandler(e) {
		// console.log(this._id);
		// Meteor.call("deleteFacility", this._id);
	// }
// });



// Template.course.events({ 											//TODO <----

	// //consider switching to this way
	// //http://hacktivist.in/articles/Simple-crud-app-in-meteor/
	// "click .editCourse" : function updateCourseEventHandler(e) {
		// // debugger;
		// // console.log(e);
		// // console.log(this.name);
		// var originalHTML = document.getElementById("courseNodeIdObjectID(\"" + this._id + "\")").innerHTML;
		// Session.set("originalFacilityListingHTML", originalHTML);

		// var newHTML = "" +
			// "<form class=\"courseEditForm\"" +
			// "<h2>Name: <input type=\"text\" value=\"" + this.name + "\" id=\"courseEditName\"></h2><br />" +
			// "<b>courseCode:</b> <input type=\"text\" value=\"" + this.courseCode + "\" id=\"courseEditCourseCode\"><br />" +
			// "<b>fee:</b> <input type=\"text\" value=\"" + this.fee + "\" id=\"courseEditFee\"><br />" +
			// "<b>min:</b> <input type=\"text\" value=\"" + this.min + "\" id=\"courseEditMin\"><br />" +
			// "<b>max:</b> <input type=\"text\" value=\"" + this.max + "\" id=\"courseEditMax\"><br />" +
			// "<br />" +
			// "<span class=\"text\">description: <textarea  id=\"courseEditDescription\">" + this.description + "</textarea></span><br />" +
			// "<button class=\"editCourseSave\" >Save</button>" +
			// "</form>";

		// document.getElementById("courseNodeIdObjectID(\"" + this._id + "\")").innerHTML = newHTML;
	// },

	// "submit .courseEditForm" : function updateCourseSaveEventHandler(e) {
		// //TODO: Validation of user
		// // if(Meteor.user.userType != "admin"){
		// // return false;
		// // }

		// //TODO: Validation of input
		// e.preventDefault();

		// name = document.getElementById("courseEditName").value,
		// courseCode = document.getElementById("courseEditCourseCode").value,
		// fee = document.getElementById("courseEditFee").value,
		// min = document.getElementById("courseEditMin").value,
		// max = document.getElementById("courseEditMax").value,
		// description = document.getElementById("courseEditDescription").value
			// Meteor.call("updateCourse", this._id, name, courseCode, fee, min, max, description);

		// // replace back with original HTML
		// var originalHTML = "" +
			// "<h2>Name: " + this.name + "</h2><br />" +
			// "<b>courseCode:</b> " + this.courseCode + "<br />" +
			// "<b>fee:</b> " + this.fee + "<br />" +
			// "<b>min:</b> " + this.min + "<br />" +
			// "<b>max:</b> " + this.max + "<br />" +
			// "<br />" +
			// "<span class=\"text\">description: " + this.description + "</span><br />" +
			// "<button class=\"editCourse\">edit</button>" +
			// "<button class=\"deleteCourse\">delete</button>";

		// document.getElementById("courseNodeIdObjectID(\"" + this._id + "\")").innerHTML = originalHTML;
	// },
// });
















// // // // function getDatesFromRepeat(){
	
// // // // }

// // // // function findIfFacilityIsAvailable(facility, startDate, endDate, timeStart, timeEnd){
// // // // =======
// // // // //this might be redundant, i think for the repeat option we just multiple booking entity with different date as each of them will be one record, as such
// // // // // the repeat option will be better at booking
	// // // // dates = getDatesFromRepeat();
	
	// // // // dates.forEach(function(date, startTime, endTime){
		// // // // var available = isFacilityAvailableOnThisTimeslot(facility, date, startTime, endTime) | false;
		// // // // if(available){
			// // // // return true;
		// // // // } else{
			// // // // return false;
		// // // // }
	// // // // });
// // // // }

// // // // function isFacilityAvailableOnThisTimeslot(facility, searchDate, timeStart, timeEnd){
	// // // // // results = new Array();
	// // // // soFarSoGood = true;
	// // // // // |				|
	// // // // //    |		|
	// // // // existingBookings = bookings.find({
									// // // // "facId":facility._id,
									// // // // "date":searchDate,
									// // // // "startTime":{$lte: timeStart },		
									// // // // "endTime":{$gte: timeEnd }				
								// // // // }).fetch();
	// // // // if (existingBookings.length > 0){
		// // // // // already have a booking sometime in that time so make sure it does not get returned
		// // // // return false;
	// // // // }
	// // // // // |				|
	// // // // //    |				|
	// // // // existingBookings = bookings.find({
									// // // // "facId":facility._id,
									// // // // "date":searchDate,
									// // // // "start_time":{$lte: timeStart },	
									// // // // "end_time":{$lte: timeEnd }				
								// // // // }).fetch();
	// // // // if (existingBookings.length > 0){
		// // // // // already have a booking sometime in that time so make sure it does not get returned
		// // // // return false;
	// // // // }
	// // // // // 			|				|
	// // // // //    |		|
	// // // // existingBookings = bookings.find({
									// // // // "facId":facility._id,
									// // // // "date":searchDate,
									// // // // "start_time":{$gte: timeStart },	// 			|				|
									// // // // "end_time":{$gte: timeEnd }				//    |		|
								// // // // }).fetch();
	// // // // if (existingBookings.length > 0){
		// // // // // already have a booking sometime in that time so make sure it does not get returned
		// // // // return false;
	// // // // }
	// // // // // 			|				|
	// // // // //    |						|
	// // // // existingBookings = bookings.find({
									// // // // "facId":facility._id,
									// // // // "date":searchDate,
									// // // // "start_time":{$gte: timeStart },	// 			|				|
									// // // // "end_time":{$lte: timeEnd }				//    |						|
								// // // // }).fetch();
	// // // // if (existingBookings.length > 0){
		// // // // // already have a booking sometime in that time so make sure it does not get returned
		// // // // return false;
	// // // // }
	// // // // return soFarSoGood;
// // // // }

// // // // function bookFacility(dateI, startTimeI, endTimeI, facTypeI, facI, courseI, sessionI) {
	// // // // dates = getDatesFromRepeat();
	// // // // var canBook = true;
	
	// // // // //check the whole repeat duration, if one session is not available then the repeat is invalid.
	// // // // dates.forEach(Function(date, startTime, endTime){
		// // // // var available = isFacilityAvailableOnThisTimeslot(facility, date, startTime, endTime) | false;
		// // // // if(!available){
			// // // // return false;
		// // // // }		 
	// // // // });

	// // // // //for each date object, create a booking
	// // // // dates.forEach(Function(){
		// // // // bookings.createBooking(date, startTime, endTime, facTypeI, facI, courseI, sessionI);
	// // // // });
// // // // }