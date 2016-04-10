Template.addAnnouncement.events({
	
	"click #trainerPostAnnouncement" : function createAnnouncementTrainer(e) {
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
		Meteor.call("insertAnnouncement", group, obj, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>add announcement SUCCESS MSG");
				Session.set('addTAnnouncementSuccessMessage', 'Announcement has been posted')
		        Meteor.setTimeout(function(){Session.set('addTAnnouncementSuccessMessage', false);}, 5000);
			} else {
				console.log(">>>update announcement FAILURE MSG");
			    Session.set('erroraddTAnnouncementMessage', 'Add Announcement Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('erroraddTAnnouncementMessage', false);}, 5000);
			}
		});
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
		console.log("isAuthor >>> " + Meteor.user()._id + " equals " + this.annouAuthor + " is " + check);
		return Meteor.user()._id == this.annouAuthor;
	},

	"groupAnnouncements" : function listGroupAnnouncementsEventHandler(e) {
		// from idk where
		var aList = this.announcement;
		return aList;
    }

});

Template.trainerAnnouncment.helpers({
    "trainerOngoingCourses1" : function findTrainerAnnouncement(e) {
        var a = getTrainerOngoingCourse();
        return a;
    },

    'isAuthor' : function isTAuthor(createdBy) {
		//console.log("isAuthor? (>>announcement.js)");
		var check = Meteor.user()._id == this.annouAuthor;
		// console.log("isAuthor >>> " + Meteor.user()._id + " equals " + this.annouAuthor + " is " + check);
		return Meteor.user()._id == this.annouAuthor;
	}
 });

Template.displayAnnouncements.events({
	"click #deleteAAnnounButton" : function deleteAAnnounEventHandler(e) {
		var array = this;
		console.log("(deleteAAnnounButton-annou.js) before: " + array);
		// console.log("before: " + array.length);
		console.log(">>>>>> " + array.announTitle);
		// array.pop([array.announTitle,annouDetails,createdOn,createdBy]);
		// console.log("after: " + array.length);
		console.log("deleteAAnnounButton >>> " + Meteor.user()._id + " equals " + this.annouAuthor + " is " + check);
		
		var courseGrp =  Router.current().url;
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

		var group = Groups.findOne({courseCode:currentCourse,grpNum:currentGrpNum});
		console.log("GroupId " + group._id);
		// Meteor.call("editAnnouncement", groupId, array);
	}
});

Template.trainerAnnouncment.events({
	"click #deleteTAnnounButton" : function deleteTAnnounEventHandler(e) {
		var announTitle1 = this.annouTitle
		var annouDetails1 = this.annouDetails;
		var createdBy1 = this.annouAuthor;
		var createdOn1 = this.annouDate;

		var groupId = document.getElementById("groupId").value;

		console.log("deleteTAnnoun >>> ("+ groupId +")" + announTitle1 + ", " + annouDetails1 + ", " + createdBy1 + ", " + createdOn1);
		var array = Groups.findOne({_id: groupId}).announcement;
		var index = array.indexOf([announTitle1,annouDetails1,createdOn1,createdBy1]);
		array.splice(index, 1);
		Meteor.call("editAnnouncement", groupId, array);
	}
});

 Template.announcementForm.events({
     "click #addAnnouncementButton" : function createAnnouncementEventHandler(e) {
        e.preventDefault();
        //TODO: Validation of user
        // if(Meteor.user.userType != "admin"){
        // return false;
        // }
        //extracting from url        
        var courseGrp =  Router.current().url;
        var positionFirstEqual = courseGrp.indexOf('=');
        //problem starts here
        //extracting course
        var currentCourseGrp=courseGrp.substr(positionFirstEqual+1);    
        var positionOfAND = courseGrp.indexOf('&');
        var currentCourse=courseGrp.substring(positionFirstEqual+1, positionOfAND);
        //extracting grpNum
        var grpNumStr=courseGrp.substr(positionOfAND-1);
        var positionSecondEqual = currentCourseGrp.indexOf('=');
        var currentGrpNum=currentCourseGrp.substr(positionSecondEqual+1);
        var a = Groups.findOne({courseCode:currentCourse,grpNum:currentGrpNum})._id
        gId = a;
        //TODO: Validation of input
        var obj = new Object();
        var title = document.getElementById("aTitle").value;
        obj.annouTitle= title;
        obj.annouDetails= document.getElementById("annouDetails").value;
        obj.annouDate= new Date();
        obj.annouAuthor= Meteor.user()._id;
        console.log("Admin Add Announcement for "+gId);
        Meteor.call("insertAnnouncement", gId, obj);
        //console.log(Groups.find({}).fetch();
    }
 });
   
