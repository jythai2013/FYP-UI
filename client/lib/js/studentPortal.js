//student/studentClass.html
Template.studentClass.helpers({
	"studentOngoingCourses" : function findTrainerOngoingCourses(e) {
		console.log("studentPortal.js - studentOngoingCourses >>>");
		var tId = Session.get("loggedInUser")._id;
		var belongInClasses = new Array();
		var groups = Groups.find({});
		groups.forEach(function(classD){
			var classDetails = classD.classlist;
		 	console.log($.inArray(tId, classDetails));
		});

	}
});
