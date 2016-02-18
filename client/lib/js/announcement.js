// Inserting
Template.addAnnouncement.events({
	
	"click #trainerPostAnnouncement" : function createAnnouncementEventHandler(e) {
		var title = document.getElementById("announTitle").value;
		var content = document.getElementById("announDetails").value;
		var createdBy = Meteor.user()._id;
		// var courseCode = document.getElementById("courseId").value;
		var group = document.getElementById("groupId").value;
		var grpNo = document.getElementById("groupId").value;
		var courseCode = document.getElementById("groupId").value;

		var obj = new Object();
		obj.annouTitle= title;
		obj.annouDetails= content;
		obj.annouDate= new Date();
		obj.annouAuthor= createdBy;

		console.log("clicked AddAnnounment >> announcement.js");
		///
		var annouList = [];
		console.log(group == "Bx4Ltcfgfsh35DrDf");

		if(Groups.findOne({_id: group}).announcement != undefined) annouList = Groups.announcement;		
	    annouList.push(obj)
	    ///
	    console.log("List : " + annouList);
		Meteor.call("insertAnnouncement", group, annouList);
	}
});

Template.postAnnounModel.helpers({
  // isAnnouncementPosted: (err) ->
  //   if Meteor.user()
  //     return true
  //   else
  //     return false
});