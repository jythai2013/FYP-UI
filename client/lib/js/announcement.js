// Inserting
Template.addAnnouncement.events({
	
	"click #trainerPostAnnouncement" : function createAnnouncementEventHandler(e) {
		var title = document.getElementById("announTitle").value;
		var content = document.getElementById("announDetails").value;
		var createdBy = Meteor.user()._id;
		var course = document.getElementById("courseId").value;
		var group = document.getElementById("groupId").value;
		//var announType = document.getElementById("announType").value;
		//var dueDate = document.getElementById("announType").value;
		//'insertAnnouncement': function insertAnnouncement(aTitle, aDetails, aAuthor, classId, cCode){
		Meteor.call("insertAnnouncement", title, content, createdBy, group, course);
	}
});

Template.addAnnouncement.helpers({
	// and is ongoing class
	//var groupTaught = Groups.find(courseTrainers = Meteor.user()._id);
	//console.log("Groups taught: "+groupTaught);
});


/*

//Displaying
Template.displayAnnoucements.helpers({

	"groups" : function listCourseEventHandler(e) {
	console.log("here");

	return Courses.find({});
	}
});*/

Template.postAnnounModel.helpers({
  // isAnnouncementPosted: (err) ->
  //   if Meteor.user()
  //     return true
  //   else
  //     return false
});