Template.classList.helpers({

	"classes" : function listCourseEventHandler(e) {
		console.log("here");

		return Groups.find({});
	}
});

function getParameterByName(name) {
	//console.log(name);
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	//console.log(name);
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
	//console.log(regex);
	//console.log(results);
	//console.log(decodeURIComponent(results[1].replace(/\+/g, " ")));
	//console.log(results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")));
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

Template.group.helpers({

    "noOfDays" : function(e) {
        //var currentCourse = Session.get('currentCourseCode');

		var courseGrp =  window.location.href;
		
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
		console.log(currentGrpNum + "grpNum");

		var size = Groups.find({courseCode:currentCourse,grpNum:currentGrpNum}).count();
		console.log(size + " to check if grp exists");
		var a = Groups.findOne({courseCode:currentCourse,grpNum:currentGrpNum}).days;
		console.log(a);

        return Groups.findOne({courseCode:currentCourse,grpNum:currentGrpNum}).days;



    }
});

Template.course.onRendered(function(){
  var currentCourse = getParameterByName("cCode");
	console.log(currentCourse);
  Session.set('currentCourseCode', currentCourse);
});

Template.course.helpers({

    "groupsCourse" : function listGroupsEventHandler(e) {
        var currentCourse = Session.get('currentCourseCode');
        
        //var currentCourse = getParameterByName("cCode");
        if(currentCourse.length<=0)return Groups.find({});

        var size = Groups.find({courseCode:currentCourse}).count();
        return Groups.find({courseCode:currentCourse});
    }
});

Template.addClass.helpers({

    "facilitiesList" : function listFacilitiesEventHandler(e) {
        
        return Facilities.find({});
    }
});

Template.addStudent.helpers({

    "students" : function(e) {
		return Meteor.users.find({userType:{"learner":true}});
    }, 

	"noOfTimesStudent": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('studentTimes'); i++){
			fakeArray.push("a")
		}
    	return fakeArray;
	}
});

Template.removeClass.helpers({

	"groupsCourse2" : function listGroups2EventHandler(e) {
		//var currentCourse = Session.get('currentCourseCode');
		var str =  window.location.href;
		var position = str.indexOf('=');
		
		var currentCourse=str.substr(position+1);

		var size = Groups.find({courseCode:currentCourse}).count();
		
		return Groups.find({courseCode:currentCourse});
		
	}
});

Template.displayAnnouncements.helpers({

	"groupAnnouncements" : function listGroupAnnouncementsEventHandler(e) {
		console.log("here in class announcement");
		//extracting from url

		
		var courseGrp =  window.location.href;
		
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

		var size = Groups.find({courseCode:currentCourse,grpNum:currentGrpNum}).count();
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
	"click #addGroupButton" : function(e) {
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		console.log("here1");

		//TODO: Validation of input
		var gCourseCode = document.getElementById("gCourseCode").value;
		var gStartTime = document.getElementById("gNewStartTime").value;
		var gEndTime = document.getElementById("gNewEndTime").value;

		var str =  window.location.href;
		var position = str.indexOf('=');		
		var currentCourse=str.substr(position+1);

		var gNoOfHours2 =  Courses.findOne({courseCode:currentCourse});
		console.log("HERE >>> " + gNoOfHours2);
		var gNoOfHours =  Courses.findOne({courseCode:currentCourse}).courseNoOfHours;
		console.log(gNoOfHours + " number of Hours");

		var days = document.getElementsByName("day");
		var gdaysArr = new Array();
		for(var x = 0, l = days.length; x < l;  x++){
			console.log(days[x].value + " DAYS");
			if (days[x].checked){
			  gdaysArr.push(days[x].value);
			}
		}


		var gStartDate = document.getElementById("gNewStartDate").value;
		var gEndDate = document.getElementById("gNewEndDate").value;
		var gDeadline = document.getElementById("gNewDeadline").value;
		var gVenue = document.getElementById("gVenue").value;
		var trainerID = document.getElementById("gTrainers").value;
		// var trainerFirstName = Meteor.users.findOne(trainerID).firstName;
		// var trainerLastName = Meteor.users.findOne(trainerID).lastName;
		// var gTrainers = trainerFirstName + " " + trainerLastName;

		var grpNumI1 = Groups.find({courseCode:currentCourse}).count();
		var grpNumI2 = grpNumI1+1;
		var grpNumI = "G"+grpNumI2;
      console.log(grpNumI + "group number");
		console.log("here4");
		Meteor.call("createGroup", gCourseCode, grpNumI, gStartTime, gEndTime, gdaysArr, gStartDate, gEndDate, gDeadline, gStatus, gVenue, gNoOfHours, gTrainers);
		//TODO: schedule payment reminder checking
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


Template.viewCourseForm.events({
	"click #enterCoursePageButton" : function viewCoursePageEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		console.log(this.courseCode);

		Session.set('currentCourseGroup', this.courseCode);
		  //modal.find('.modal-title').text('New message to ' + recipient)
		  //modal.find('.modal-body input').val(recipient)
	}
});


Template.removeClass.events({
	"click #removeGroupButton" : function deleteGroupEventHandler(e) {
		var removeCurrentGroups = document.getElementsByName("currentGroups");

		var removeCurrentGroupsArr = new Array();
		for(var x = 0, l = removeCurrentGroups.length; x < l;  x++){
			if (removeCurrentGroups[x].checked){
				var grpNumber = removeCurrentGroups[x].value;
				//extract course
				var url =  window.location.href;
				var positionFirstEqual = url.indexOf('=');	
				var currentCourse=url.substring(positionFirstEqual+1);
				
				var groupID = Groups.findOne({courseCode:currentCourse, grpNum:grpNumber})._id; //TODO: the find returns a cursor, not a Group object. so you cant ._id it. need to iterate such as by fetch()[0] or use findOne
				console.log(groupID);
				removeCurrentGroupsArr.push(groupID);
			}
    	}
    	console.log(removeCurrentGroupsArr.length+ " SIZE")

    	removeCurrentGroupsArr.forEach(function(entry) {
   			console.log(entry);
		});
		Meteor.call("deleteGroup", removeCurrentGroupsArr);
	}
});

Template.deleteClass.events({
	"click #deleteClassButton" : function deleteCourseEventHandler(e) {
			console.log(this._id);
			Meteor.call("deleteClass", this._id);
	}
});

Template.addStudent.events({
	
	"click #addStudentButton" : function(e, templ) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();
		 console.log(e);
		 console.log(templ);
		 
		var addStudents = document.getElementsByName("newStudentsC");
    var addStudentsArr = new Array();
    for(var x = 0, l = addStudents.length; x < l;  x++){
      console.log(addStudents[x]);
      addStudentsArr.push(addStudents[x].value);
		}

    addStudentsArr.forEach(function(entry) {
      console.log(entry + "addStudents");
    });


		//TODO: Add student to class list
		var courseCode = templ.data.courseCode;
		var grpNum = templ.data.grpNum;
		
		var group = Groups.findOne({courseCode:courseCode, grpNum:grpNum});
		console.log(group);
		var classlist = [];
		if(group.classlist != undefined) classlist = group.classlist;
		
		console.log(classlist);
		
    addStudentsArr.forEach(function(entry) {
      console.log(entry);
			classlist.push(entry); 
    });
		
		Meteor.call("updateGroupClasslist", courseCode, grpNum, classlist);
	},

	"click #addMoreStudents" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var studentTimes = Session.get('studentTimes');
		 var noOfTimes = studentTimes+1;
		 if(isNaN(studentTimes)) noOfTimes = 1;
		 console.log("studentTimes " + studentTimes);
		 console.log("noOfTimes " + noOfTimes);
		 Session.set('studentTimes', noOfTimes);
	},

	"click #removeThisStudent" : function(e) {
		e.preventDefault();
        var studentTimes = Session.get('studentTimes');

        // noOfTimes = _.reject(salesInput, function(x) {
        //     return x.salesId == salesId;
        // });

		 
		 if(isNaN(studentTimes)) noOfTimes = 1;
		 var noOfTimes = studentTimes-1;
		 Session.set('studentTimes', noOfTimes);
	}
});