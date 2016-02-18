//trainer/trainerAnnouncment.html
Template.trainerAnnouncment.helpers({
	"studentOngoingCourses" : function findTrainerOngoingCourses(e) {
		console.log("trainerPortal.js - trainerOngoingCourses >>>");
		var tId = Meteor.user()._id;
		var coursesTook = Groups.find({classlist: {trainerId: tId}});
		// var studentArray = new Array();
		// classList.forEach(function(curr,ind,arr){
		// 	studentArray.push(Meteor.users.findOne({_id:curr}));
		// });
		console.log(coursesTook);
		return coursesTook;
	}
});
