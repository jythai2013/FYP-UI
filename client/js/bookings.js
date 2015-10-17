


Template.facilityBooking.events({
	"submit #facilityBookingFormForMeteor" : function createBookingEventHandler(e) {
		e.preventDefault();
		
		
	}
});
// Template.facilityBooking.events({
	// "submit #facilityBookingFormForMeteor" : function createBookingEventHandler(e) {
		// e.preventDefault();
		// //TODO: Validation of user
		// // if(Meteor.user.userType != "admin"){
		// // return false;
		// // }

		// //TODO: Validation of input
		// var noSession = document.getElementById("noSession").value;
		// var repeatOption = document.getElementById("repeatOption").value;
		// var input_time_beginning = document.getElementById("input_time_beginning").value;
		// var input_time_end = document.getElementById("input_time_end").value;
		// var input_capacity_min = document.getElementById("input_capacity_min").value;
		// var facType = document.getElementById("facType").value;

		// Meteor.call("createBooking", noSession, repeatOption, input_time_beginning, input_time_end, input_capacity_min, facType);
	// }
// });

// Template.facilityBooking.events({

	// //consider switching to this way
	// //http://hacktivist.in/articles/Simple-crud-app-in-meteor/
	// "click .editBooking" : function updateBookingEventHandler(e) {
		// // debugger;
		// // console.log(e);
		// // console.log(this.name);
		// var originalHTML = "" +
			// "<h2>Name: {{name}}</h2><br />" +
			// "<b>BookingCode:</b> {{BookingCode}}<br />" +
			// "<b>fee:</b> {{fee}}<br />" +
			// "<b>min:</b> {{min}}<br />" +
			// "<b>max:</b> {{max}}<br />" +
			// "<br />" +
			// "<span class=\"text\">description: {{description}}</span><br />" +
			// "<button class=\"editBooking\">edit</button>" +
			// "<button class=\"deleteBooking\">delete</button>";

		// var newHTML = "" +
			// "<form class=\"BookingEditForm\"" +
			// "<h2>Name: <input type=\"text\" value=\"" + this.name + "\" id=\"BookingEditName\"></h2><br />" +
			// "<b>BookingCode:</b> <input type=\"text\" value=\"" + this.BookingCode + "\" id=\"BookingEditBookingCode\"><br />" +
			// "<b>fee:</b> <input type=\"text\" value=\"" + this.fee + "\" id=\"BookingEditFee\"><br />" +
			// "<b>min:</b> <input type=\"text\" value=\"" + this.min + "\" id=\"BookingEditMin\"><br />" +
			// "<b>max:</b> <input type=\"text\" value=\"" + this.max + "\" id=\"BookingEditMax\"><br />" +
			// "<br />" +
			// "<span class=\"text\">description: <textarea  id=\"BookingEditDescription\">" + this.description + "</textarea></span><br />" +
			// "<button class=\"editBookingSave\" >Save</button>" +
			// "</form>";

		// document.getElementById("BookingNodeIdObjectID(\"" + this._id + "\")").innerHTML = newHTML;
	// },

	// "submit .BookingEditForm" : function updateBookingSaveEventHandler(e) {
		// //TODO: Validation of user
		// // if(Meteor.user.userType != "admin"){
		// // return false;
		// // }

		// //TODO: Validation of input
		// e.preventDefault();

		// name = document.getElementById("BookingEditName").value,
		// BookingCode = document.getElementById("BookingEditBookingCode").value,
		// fee = document.getElementById("BookingEditFee").value,
		// min = document.getElementById("BookingEditMin").value,
		// max = document.getElementById("BookingEditMax").value,
		// description = document.getElementById("BookingEditDescription").value
			// Meteor.call("updateBooking", this._id, name, BookingCode, fee, min, max, description);

		// // replace back with original HTML
		// var originalHTML = "" +
			// "<h2>Name: " + this.name + "</h2><br />" +
			// "<b>BookingCode:</b> " + this.BookingCode + "<br />" +
			// "<b>fee:</b> " + this.fee + "<br />" +
			// "<b>min:</b> " + this.min + "<br />" +
			// "<b>max:</b> " + this.max + "<br />" +
			// "<br />" +
			// "<span class=\"text\">description: " + this.description + "</span><br />" +
			// "<button class=\"editBooking\">edit</button>" +
			// "<button class=\"deleteBooking\">delete</button>";

		// document.getElementById("BookingNodeIdObjectID(\"" + this._id + "\")").innerHTML = originalHTML;
	// },

	// "click .deleteBooking" : function deleteBookingEventHandler(e) {
		// console.log(this._id);
		// Meteor.call("deleteBooking", this._id);
	// }
// });