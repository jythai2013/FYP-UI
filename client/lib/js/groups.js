

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

Template.course.helpers({

	"groupsCourse" : function listGroupsEventHandler(e) {
		//var currentCourse = Session.get('currentCourseCode');
		
		var currentCourse = getParameterByName("cCode");
		if(currentCourse.length<=0)return Groups.find({});

		var size = Groups.find({courseCode:currentCourse}).count();
		return Groups.find({courseCode:currentCourse});
	}
});

Template.removeClass.helpers({

	"groupsCourse2" : function listGroups2EventHandler(e) {
		console.log("here");
		console.log(Groups.find().count() + " asdf adgfear fsdvgr fg in class.js");
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

Template.displayAnnouncements.helpers({

	"groupAnnouncements" : function listGroupAnnouncementsEventHandler(e) {
		console.log("here in class announcement");
		//extracting from url

		
		var courseGrp =  window.location.href;
		
		var positionFirstEqual = courseGrp.indexOf('=');
		console.log(positionFirstEqual + " = sign");
		console.log(courseGrp + "URL");
		//problem starts here
		//extracting course
		var currentCourseGrp=courseGrp.substr(positionFirstEqual+1);	
		var positionOfAND = courseGrp.indexOf('&');
		console.log(positionOfAND + " position of &");
		var currentCourse=courseGrp.substring(positionFirstEqual+1, positionOfAND);
		console.log(currentCourse + "COURSE");

		//extracting grpNum
		var grpNumStr=courseGrp.substr(positionOfAND-1);
		var positionSecondEqual = currentCourseGrp.indexOf('=');
		var currentGrpNum=currentCourseGrp.substr(positionSecondEqual+1);
		console.log(currentGrpNum + "grpNum");

		var size = Groups.find({courseCode:currentCourse,grpNum:currentGrpNum}).count();
		console.log(size + " to check if grp exists");
		var a = Groups.findOne({courseCode:currentCourse,grpNum:currentGrpNum}).announcement;
		console.log(a);
		a = a.sort(descDate)
		return a;
		
	}
});


function descDate(a,b) {
  if (a.dateTime < b.dateTime)
    return 1;
  else if (a.dateTime > b.dateTime)
    return -1;
  else 
    return 0;
}

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

		var str =  window.location.href;
		var position = str.indexOf('=');		
		var currentCourse=str.substr(position+1);

		var grpNumI1 = Groups.find({courseCode:currentCourse}).count();
		var grpNumI2 = grpNumI1+1;
		var grpNumI = "G"+grpNumI2;
      console.log(grpNumI + "group number");
		console.log("here4");
		Meteor.call("createGroup", gCourseCode, grpNumI, gStartTime, gEndTime, gStartDate, gEndDate, gDeadline, gStatus);
		//console.log(Groups.find({}).fetch();
	}
});

Template.announcementForm.events({
	"click #addAnnouncementButton" : function createAnnouncementEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		console.log("here1");

		//TODO: Validation of input
		var aTitle = document.getElementById("annouTitle").value;
		var aDetails = document.getElementById("annouDetails").value;
		//and the author. To ask Stel or matt about this but for now
		var aAuthor = "Cass"
      	console.log(aTitle + "group number");
		Meteor.call("insertGroupAnnouncement", this._id, aTitle, aDetails, aAuthor);
		//console.log(Groups.find({}).fetch();
	}
});


Template.registerHelper('formatDate', function(date){
	return moment(date).format("DD-MM-YYYY HH:mm:ss");
});



Template.removeClass.events({
	"click #removeGroupButton" : function deleteCourseEventHandler(e) {
			console.log(this._id);
			Meteor.call("deleteGroup", this._id);
	}
});