Template.course.helpers({

	"groupsCourse" : function listGroupsEventHandler(e) {
		console.log("here");
		console.log(Groups.find().count() + " in class.js");
		//var currentCourse = Session.get('currentCourseCode');
		var str =  window.location.href;
		var position = str.indexOf('=');
		console.log(position + " = sign");
		console.log(str + "stri");
		
		var currentCourse=str.substr(position+1);
		console.log(currentCourse + "Code");

		var size = Groups.find({courseCode:currentCourse}).count();
		console.log(size + "Code");
		return Groups.find({courseCode:currentCourse});
		
	}
});


Template.addClass.events({
	"click #addGroupButton" : function createGroupEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		console.log("here1");

		//TODO: Validation of input
		var gCourseCode = document.getElementById("gCourseCode").value;
		var gStartTime = document.getElementById("gNewStartTime").value;
		var gEndTime = document.getElementById("gNewEndTime").value;
		var gStartDate = document.getElementById("gNewStartDate").value;
		var gEndDate = document.getElementById("gNewEndDate").value;
		var gDeadline = document.getElementById("gNewDeadline").value;
		var gStatus = "Scheduled";
		var grpNumI1 = Groups.find().count();
		var grpNumI2 = grpNumI1+1;
		var grpNumI = "G"+grpNumI2;
      console.log(grpNumI);
		console.log("here4");
		Meteor.call("createGroup", gCourseCode, grpNumI, gStartTime, gEndTime, gStartDate, gEndDate, gDeadline, gStatus);
		//console.log(Groups.find({}).fetch();
	}
});