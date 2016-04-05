 function getTrainerOngoingCourse(e) {
    console.log("trainerPortal.js - trainerOngoingCourses >>>");
    var tId = Meteor.user()._id;
    var coursesTaught = Groups.find({courseTrainers: {trainerId: tId}});
    console.log("getTrainerOngoingCourse Return: " + coursesTaught.length);
    return coursesTaught;
 } 

 function getDDMMYYY(date) {
    return moment(date).format("DD-MM-YYYY");
 }

 Template.trainerUploads.helpers({
    "trainerOngoingCourses" : function findTrainerUploads(e) {
        var a = getTrainerOngoingCourse();
        return a;
    },

    uploads:function(){
	    var a = Files.find({type: "course"});
	    var fileList = Materials.find({type:"groups"});
	    var fileList2 = Materials.find({type: "course"});
	    console.log(fileList);
	    var a = new Array();

	    fileList.forEach(function(item, index){
	      console.log(item.fileName);
	      a.push(Files.findOne(item.fileName));
	      console.log(item);
	    });

	    fileList2.forEach(function(item, index){
	      console.log(item.fileName);
	      a.push(Files.findOne(item.fileName));
	      console.log(item);
	    });

	    console.log(a);
	    return a;
	}
 });

 Template.trainerAnnouncment.helpers({
    "trainerOngoingCourses1" : function findTrainerAnnouncement(e) {
        var a = getTrainerOngoingCourse();
        console.log("HI trainerAnnouncment >>>");
        return a;
    },

   	'getDDMMYYY': function getTADDMMYYY(e) {
     	return getDDMMYYY(e);
     },
 });

Template.addAnnouncement.helpers({
	"trainerOngoingCourses1" : function findTrainerAddAnnoun(e) {
		var a = getTrainerOngoingCourse();
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
	    console.log("List : " + obj);
		Meteor.call("insertAnnouncement", group, obj);
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

 Template.trainerClassList.helpers({
     "test" : function test(e) {
         var tId = Meteor.user()._id;
         // add date factor here
         return Meteor.user().fullName;
     },

   	'getDDMMYYY': function getCLDDMMYYY(e) {
     	return getDDMMYYY(e);
     },
 
     "classesCL" : function findTrainerOngoingCoursesCL(e) {
        var tId = Meteor.user()._id;
        // add date factor here
        return Groups.find({courseTrainers: {trainerId: tId}}).count();
     },
 
     "getCourseDesc" : function findDescCL(cName) {
     	console.log("trainerPortal.js, (getCorseDesc) " + cName);
     	console.log(Courses.findOne({"courseCode": cName}));
     	var desc = Courses.findOne({"courseCode": cName}).courseDescription;
        return desc;
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

Template.trainerClass.onRendered(function(){
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

	var group = Groups.findOne({courseCode:currentCourse,grpNum:currentGrpNum});
	console.log("setupSession : " + group);
	Session.set('trainerClass', group);
});

Template.trainerClass.helpers({
	"courseDetails" : function tcCourseCode(e) {
		var groups = Session.get('trainerClass');
		// console.log(">>>trainerClass : " + groups);
		return groups;
	},

	"getStudentDetails" : function tcStudentDetails(cList) {
		var classList = cList;
		console.log("getStudentDetails >>>> " + classList);
		var studentArray = new Array();
		classList.forEach(function(curr,ind,arr){
			var student = Meteor.users.findOne({_id:curr});
			studentArray.push(student);
			console.log(student.fullName);
		});
		return studentArray;
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