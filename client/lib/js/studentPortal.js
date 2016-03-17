//student/studentClass.html
Template.studentClass.helpers({
	"studentOngoingCourses" : function findTrainerOngoingCourses(e) {
		console.log("studentPortal.js - studentOngoingCourses >>>");
		var tId = Session.get("loggedInUser")._id;

		var coursesEnrolled = Groups.find({classlist: {studentId: tId}});
		// maybe need filter for ongoing courses only

		console.log(coursesEnrolled);
		return coursesEnrolled;

		// var belongInClasses = new Array();
		// var groups = Groups.find({});
		// groups.forEach(function(classD){
		// 	var classDetails = classD.classlist;
		//  	console.log($.inArray(tId, classDetails));
		// });

	}
});
