//trainer/trainerAnnouncment.html
Template.addAnnouncement.helpers({
	"trainerOngoingCourses" : function findTrainerOngoingCourses(e) {
		console.log("trainerPortal.js - trainerOngoingCourses >>>");
		var tId = Meteor.user()._id;
		var coursesTaught = Groups.find({courseTrainers: {trainerId: tId}});
		console.log(coursesTaught);
		return coursesTaught;
	}
});

Template.trainerAnnouncment.helpers({
	'announcementList' : function fetchAnnouncements(e) {
		console.log("retrieve announcements >>>");
		var tId = Meteor.user()._id;
		var coursesTaught = Groups.find({courseTrainers: {trainerId: tId}});
		console.log(">>> #Groups:" + coursesTaught.count());
		return coursesTaught;
	}, 

	'announcements' : function fetchAnnouncements(e) {
		console.log("loop announcements List >>>");
		var aList = new Array();
		// console.log(this);
		var group = this.announcement;
		group.forEach(function(entry) {
			aList.push(entry);
		})
		return aList;
	}

	// 'delAnnouncements' : function fetchAnnouncements(e) {
	// 	console.log("delete announcements>>>");
	// 	// Meteor.call("deleteAnnouncement", group, annouList);
	// },

});

//trainer/trainerUpload.html
Template.trainerUploads.helpers({
	"trainerOngoingCourses" : function findTrainerOngoingCourses(e) {
		console.log("trainerPortal.js - trainerOngoingCourses >>>");
		var tId = Meteor.user()._id;
		var coursesTaught = Groups.find({courseTrainers: {trainerId: tId}});
		console.log(coursesTaught);
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