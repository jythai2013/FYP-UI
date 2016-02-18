Template.trainerUploads.helpers({
	"trainerOngoingCourses" : function findTrainerOngoingCourses(e) {
		console.log("trainerPortal.js - trainerOngoingCourses >>>");
		var trainerId = Meteor.user()._id;
		var coursesTaught = Groups.find({courseTrainers: trainerId});
		console.log(coursesTaught);
		// var classes = new Array();
		// classList.forEach(function(curr,ind,arr){
		// 	classes.push(Meteor.users.findOne({_id:curr}));
		// });
		return coursesTaught;
	}
});

Template.trainerUploads.onRendered(function(){
	// console.log($("#courseCode")[0].value);
	Session.set("trainerOngoingCourseSelected", $("#courseCode")[0].value);
});

Template.trainerUploads.events({
	"change #courseCode":function(e){
		e.preventDefault();
		Session.set("trainerOngoingCourseSelected", e.target.value);
		// console.log(e.target.value);
	}
});

//forEach(function(currentValueFromTheArray, IndexOfTheArray, TheArray){});