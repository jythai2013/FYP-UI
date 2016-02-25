
Template.trainerUploads.onRendered(function(){
	Session.set("loggedInUser", Meteor.user());
});

Template.trainerUploads.helpers({
	"trainerOngoingCourses" : function findTrainerOngoingCourses1(e) {
		console.log("trainerPortal.js - trainerOngoingCourses >>>");
		var tId = Session.get("loggedInUser")._id;
		var coursesTaught = Groups.find({courseTrainers: {trainerId: tId}});
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





// trainerAnnouncment
Template.trainerAnnouncment.events({

});

Template.addAnnouncement.events({
	
	"click #trainerPostAnnouncement" : function createAnnouncementEventHandler(e) {
		var title = document.getElementById("announTitle").value;
		var content = document.getElementById("announDetails").value;
		var createdBy = Meteor.user()._id/*Session.get("loggedInUser")._id*/;
		// var courseCode = document.getElementById("courseId").value;
		var group = document.getElementById("groupId").value;

		var obj = new Object();
		obj.annouTitle= title;
		obj.annouDetails= content;
		obj.annouDate= new Date();
		obj.annouAuthor= createdBy;

		console.log("clicked AddAnnounment >> announcement.js");

	    ///
	    console.log("List : " + obj);
		Meteor.call("insertAnnouncement", group, obj);
	}
});

Template.postAnnounModel.helpers({
  // isAnnouncementPosted: (err) ->
  //   if Meteor.user()
  //     return true
  //   else
  //     return false
});

Template.addAnnouncement.helpers({
	"trainerOngoingCourses" : function findTrainerOngoingCourses2(e) {
		console.log("trainerPortal.js - trainerOngoingCourses >>>");
		var tId = Meteor.user()._id;
		var coursesTaught = Groups.find({courseTrainers: {trainerId: tId}});
		console.log(coursesTaught);
		return coursesTaught;
	}
});