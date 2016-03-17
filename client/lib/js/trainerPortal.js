Template.addAnnouncement.helpers({
	"trainerOngoingCourses1" : function findTrainerOngoingCourses2(e) {
		console.log("trainerPortal.js - trainerOngoingCourses >>>");
		var tId = Meteor.user()._id;
		var coursesTaught = Groups.find({courseTrainers: {trainerId: tId}});
		console.log(coursesTaught);
		return coursesTaught;
	}
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

Template.trainerAnnouncment.helper({
	'loggedInUserId' : function getLoginId(e) {
		return Meteor.user()._id;/*Session.get("loggedInUser")._id*/
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

Template.editAnnouncement.events({
	
	"click #trainerEditAnnouncement" : function updateAnnouncementEventHandler(e) {
		var annouId = document.getElementById("announId").value;
		var title = document.getElementById("announTitle").value;
		var content = document.getElementById("announDetails").value;
		var createdBy = Meteor.user()._id/*Session.get("loggedInUser")._id*/;
		var group = document.getElementById("groupId").value;

		var obj = new Object();
		obj.annouTitle= title;
		obj.annouDetails= content;
		obj.annouDate= new Date();
		obj.annouAuthor= createdBy;

		console.log("clicked AddAnnounment >> announcement.js");

	    ///
		// var removeCurrentGroupsArr = new Array();
		// for(var x = 0, l = removeCurrentGroups.length; x < l;  x++){
		// 	if (removeCurrentGroups[x].checked){
		// 		var grpNumber = removeCurrentGroups[x].value;
		// 		//extract course
		// 		var url =  window.location.href;
		// 		var positionFirstEqual = url.indexOf('=');	
		// 		var currentCourse=url.substring(positionFirstEqual+1);
				
		// 		var groupID = Groups.findOne({courseCode:currentCourse, grpNum:grpNumber})._id; //TODO: the find returns a cursor, not a Group object. so you cant ._id it. need to iterate such as by fetch()[0] or use findOne
		// 		console.log(groupID);
		// 		removeCurrentGroupsArr.push(groupID);
		// 	}
  //   	}
	    ///
	    console.log("List : " + obj);
		//Meteor.call("editAnnouncement", group, obj);
	}
});

Template.trainerAnnouncment.events({
	"click #deleteTAnnounButton" : function deleteTAnnounEventHandler(e) {
		var groupId = document.getElementById("groupId").value;
		var removeId = document.getElementById("announId").value;
		console.log(">>> Delete Announ" + removeId);
		Meteor.call("deleteAnnouncement", groupId, removeId);
	}
});


Template.postAnnounModel.helpers({
  // isAnnouncementPosted: (err) ->
  //   if Meteor.user()
  //     return true
  //   else
  //     return false
});