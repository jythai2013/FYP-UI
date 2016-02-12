Template.trainerUploads.helpers({
	"trainerOngoingCourses" : function findTrainerOngoingCourses(e) {
		var trainerId = Meteor.userId;
		var trainer = Meteor.users.find({_id: trainerId});
		var coursesTaught = Courses.find({courseTrainers: trainer}).fetch();
		// how do i get the class?
		return coursesTaught;
	}
});