Template.trainerUploads.helpers({
	"trainerOngoingCourses" : function findTrainerOngoingCourses(e) {
		var coursesTaught = Courses.find().fetch();
		// console.log(coursesTaught);
		return coursesTaught;
	},
	
	"trainerOngoingClasses" : function findTrainerOngoingCourses(e) {
		var courseCode = Session.get("trainerOngoingCourseSelected");
		// console.log(courseCode);
		var groupsTaught = Groups.find({courseCode:courseCode}).fetch();
		// console.log(groupsTaught);
		return groupsTaught;
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