Template.addAnnouncement.events({
	
	"click #trainerPostAnnouncement" : function createAnnouncementEventHandler(e) {
		var title = document.getElementById("announTitle").value;
		var content = document.getElementById("announDetails").value;
		var createdBy = Meteor.user()._id;
		var group = document.getElementById("groupId").value;

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

Template.displayAnnouncements.helpers({
	'authorName' : function aAuthorName(id) {
		var a = Meteor.users.findOne({_id: id}).fullName;
		return a;
	}, 

	'isAuthor' : function isAAuthor(createdBy) {
		//console.log("isAuthor? (>>announcement.js)");
		var check = Meteor.user()._id == this.annouAuthor;
		//console.log(Meteor.user()._id + " equals " + this.annouAuthor + " is " + check);
		return Meteor.user()._id == this.annouAuthor;
	}
});

Template.displayAnnouncements.helpers({
	'authorName' : function aAuthorName(id) {
		var a = Meteor.users.findOne({_id: id}).fullName;
		return a;
	}, 

	'isAuthor' : function isAAuthor(createdBy) {
		//console.log("isAuthor? (>>announcement.js)");
		var check = Meteor.user()._id == this.annouAuthor;
		//console.log(Meteor.user()._id + " equals " + this.annouAuthor + " is " + check);
		return Meteor.user()._id == this.annouAuthor;
	}
});


Template.displayAnnouncements.events({
	"click #deleteAAnnounButton" : function deleteAAnnounEventHandler(e) {
		var courseGrp =  window.location.href;
		
		var positionFirstEqual = courseGrp.indexOf('=');
		//extracting course
		var currentCourseGrp=courseGrp.substr(positionFirstEqual+1);	
		var positionOfAND = courseGrp.indexOf('&');
		var currentCourse=courseGrp.substring(positionFirstEqual+1, positionOfAND);

		//extracting grpNum
		var grpNumStr=courseGrp.substr(positionOfAND-1);
		var positionSecondEqual = currentCourseGrp.indexOf('=');
		var currentGrpNum=currentCourseGrp.substr(positionSecondEqual+1);
		console.log(currentGrpNum + "grpNum");

		var groupId = Groups.findOne({courseCode:currentCourse,grpNum:currentGrpNum})._id;

		var announTitle = this. announTitle
		var annouDetails = this.annouDetails;
		var createdBy = this.annouAuthor;
		var createdOn = this.annouDate;
		var array = Groups.findOne({_id: groupId}).announcement;
		array.pop([announTitle,annouDetails,createdOn,createdBy]);
		Meteor.call("editAnnouncement", groupId, array);
	}
});

Template.trainerAnnouncment.events({
	"click #deleteTAnnounButton" : function deleteAAnnounEventHandler(e) {
		var groupId = document.getElementById("groupId").value;
		var announTitle = document.getElementById("announTitle").value;
		var annouDetails = document.getElementById("announDetails").value;
		var createdBy = Meteor.user()._id;
		var createdOn = document.getElementById("annouDate").value;
		var array = Groups.findOne({_id: groupId}).announcement;
		array.pop([announTitle,annouDetails,createdOn,createdBy]);
		Meteor.call("editAnnouncement", groupId, array);
	}
});

Template.postAnnounModel.helpers({
  // isAnnouncementPosted: (err) ->
  //   if Meteor.user()
  //     return true
  //   else
  //     return false
});