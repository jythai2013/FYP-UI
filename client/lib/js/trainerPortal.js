 function getTrainerOngoingCourse(e) {
    console.log("trainerPortal.js - trainerOngoingCourses >>>");
    var tId = Meteor.user()._id;
    var coursesTaught = Groups.find({courseTrainers: {trainerId: tId}});
    console.log(coursesTaught);
    return coursesTaught;
 }

 Template.trainerUploads.helpers({
    "trainerOngoingCourses" : function findTrainerOngoingCoursesTA(e) {
        var a = getTrainerOngoingCourse();
        return a;
    }
 });

 Template.trainerAnnouncment.helpers({
    "trainerOngoingCourses1" : function findTrainerOngoingCoursesTA(e) {
        var a = getTrainerOngoingCourse();
        return a;
    }
 });
 
 Template.editAnnouncement.helpers({
    "trainerOngoingCourses" : function findTrainerOngoingCoursesEA(e) {
         var a = getTrainerOngoingCourse();
         return a;
    }
 });
 


Template.addAnnouncement.helpers({
	"trainerOngoingCourses1" : function findTrainerOngoingCourses2(e) {
		var a = getTrainerOngoingCourse();
        console.log("TrainerAnnouncement: " a.length);
        return a;
	}
});

Template.trainerAnnouncment.onRendered({
	'loggedInUserId': function getLoginId(e) {
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
	    console.log("List : " obj);
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
	    console.log("List : " obj);
		//Meteor.call("editAnnouncement", group, obj);
	}
});

Template.trainerAnnouncment.events({
	"click #deleteTAnnounButton" : function deleteTAnnounEventHandler(e) {
		var groupId = document.getElementById("groupId").value;
		var removeId = document.getElementById("announId").value;
		console.log(">>> Delete Announ" removeId);
		Meteor.call("deleteAnnouncement", groupId, removeId);
	}
});

 Template.trainerClassList.helpers({
     "test" : function test(e) {
         var tId = Meteor.user()._id;
         // add date factor here
         return Meteor.user().fullName;
     },
 
     "classesCL" : function findTrainerOngoingCoursesCL(e) {
        var tId = Meteor.user()._id;
        // add date factor here
        return Groups.find({courseTrainers: {trainerId: tId}}).count();
     },
 
     "getCourseDesc" : function findDescCL(courseName) {
         return Courses.find({courseName: courseName}).courseDescription;
     },
 
     "trainerOngoingCourses" : function findTrainerOngoingCoursesCL(e) {
         return getTrainerOngoingCourse();
       }
 });


Template.trainerIndex.helpers({
    "displayTrainerName" : function test(e) {
        console.log("fetch user's name");
        return Meteor.user().fullName;
    }
});



// // Sidebar
// Template.trainerSidebar.helpers({
// 	'isActive' : function(browserN) {

// 		var browserUrl =  window.location.href;
// 		var positionFirstEqual = browserUrl.indexOf('/');
// 		var removeDomain=browserUrl.substr(positionFirstEqual+1);
// 		var positionSecondEqual = removeDomain.indexOf('/');
// 		console.log("url "browerURL.length);
// 		console.log("url "positionSecondEqual);
// 		var browerName=removeDomain.substr(positionSecondEqual+1);
// 		console.log(browerName " equals "browserN);
// 		var a = browerName == browserN;
// 		console.log(a);
// 		if (browerName === browserN){
// 			return "active";
// 		} else {
// 			return "";
// 		}
// 	}
// });
// 		