
// This code only runs on the client

Template.addCourseTemplate.events({
	"submit #sessionAddForm" : function createSessionEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }

		//TODO: Validation of input
		var cName = document.getElementById("courseAddName").value;
		var cCode = document.getElementById("courseAddCourseCode").value;
		var cFee = document.getElementById("courseAddFee").value;
		var cMin = document.getElementById("courseAddMin").value;
		var cMax = document.getElementById("courseAddMax").value;
		var cDescription = document.getElementById("courseAddDescription").value;

		Meteor.call("createCourse", cName, cCode, cFee, cMin, cMax, cDescription);
	}
});