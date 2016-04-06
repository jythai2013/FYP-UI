Template.classList.helpers({

	"classes" : function (e) {
		console.log(Groups.find({}).fetch());

		return Groups.find({});
	},

    "classCourseCode" : function(e) {
        console.log("classCourseTitle");
		console.log(this);
        return Courses.findOne({_id:this.courseCode}).courseName;
    }
});


Template.addClassForm.events({
	"click #addGroupCLButton" : function(e) {
		var obj = new Object();

		//TODO: Validation of input


		var courseObject =  document.getElementById("classListCourseCode").value;
		obj.courseCode = Courses.findOne({_id:courseObject}).courseCode;
		obj.startTime = document.getElementById("classListNewStartTime").value;
		obj.endTime = document.getElementById("classListNewEndTime").value;

		var str =  window.location.href;
		var position = str.indexOf('=');		
		var currentCourse=str.substr(position+1);
		console.log("it all starts here > " + currentCourse);

		var courseObject =  Courses.findOne({courseCode:currentCourse});
		console.log("HERE >>> " + courseObject);

		var days = document.getElementsByName("classListDay");
		days = Array.prototype.slice.call(days);
		days2 = new Array();
		days.forEach(function(curr, ind, arr){
			if(curr.checked) days2.push(curr.value.toLowerCase());
		});
		obj.days = days2;
		console.log(days);
		console.log(obj);

		var stringSDate = document.getElementById("classListNewStartDate").value;
		var stringEDate = document.getElementById("classListNewEndDate").value;

		var SDate = new Date(moment(stringSDate,"DD/MM/YYYY").format());
		var EDate = new Date(moment(stringEDate,"DD/MM/YYYY").format());

		obj.startDate = SDate;
		obj.endDate = EDate;
		obj.venue = document.getElementById("classListVenue").value;
		var trainId = document.getElementById("classListTrainers").value;
		obj.courseTrainers = {trainerId: trainId};
		// var trainerFirstName = Meteor.users.findOne(trainerID).firstName;
		// var trainerLastName = Meteor.users.findOne(trainerID).lastName;
		// var gTrainers = trainerFirstName + " " + trainerLastName;

		var grpNumI1 = Groups.find({courseCode:currentCourse}).count();
		console.log("What is this? : " + currentCourse);
		var grpNumI2 = grpNumI1+1;
		obj.grpNum = "G"+grpNumI2;

		console.log("here4");
		console.log(obj);
		Meteor.call("createGroup",obj);
		console.log("here4again");
		//TODO: schedule payment reminder checking
		//console.log(Groups.find({}).fetch();
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


// CLASS.JADE

Template.addClass.onRendered(function(){
  // var currentfb = getParameterByName("fbid");
  Session.set('noOfTrainerToaddtoClass', 0);
});


Template.group.helpers({
	'studentInClass' : function(){
		// console.log("studentInClass>>");
		// console.log(this);
		var classList = this.classlist;
		console.log(classList);
		var studentArray = new Array();
		classList.forEach(function(curr,ind,arr){
			var student = Meteor.users.findOne({_id:curr});
			studentArray.push(student);
		});
		return studentArray;
	},
	'classTrainers' : function(){
		var trainersList = this.courseTrainers;
				console.log(this.courseTrainers);
				console.log(trainersList.trainerId);
		var trainerID = trainersList.trainerId;
		var trainerArray = Meteor.users.findOne({_id:trainerID}).fullName;
		console.log(trainerArray);
		// var trainersArray = new Array();
		
		// 	for(var x = 0, l = trainersList.length; x < l;  x++){
		// 		var entry = trainersList[x].trainerId;
		// 		var trainer = Meteor.users.findOne({_id:entry});
		// 		console.log(trainer);
		// 		trainersArray.push(trainer);
		// 	}
		return trainersArray;
	},
	'courseNoOfHours' : function(){
		
		
		var courseGrp =  window.location.href;
		
		var positionFirstEqual = courseGrp.indexOf('=');
		//extracting course
		var currentCourseGrp=courseGrp.substr(positionFirstEqual+1);	
		var positionOfAND = courseGrp.indexOf('&');
		var currentCourse=courseGrp.substring(positionFirstEqual+1, positionOfAND);


		return Courses.findOne({courseCode:currentCourse}).courseNoOfHours;
	},

    "noOfDays" : function(e) {
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

		var size = Groups.find({courseCode:currentCourse,grpNum:currentGrpNum}).count();
		console.log(size + " to check if grp exists");
		var a = Groups.findOne({courseCode:currentCourse,grpNum:currentGrpNum}).days;
		console.log(a);

        return Groups.findOne({courseCode:currentCourse,grpNum:currentGrpNum}).days;
    },

    "feedbackClass" : function(e) {
        console.log("feedbackClass");
        var fbCount = FeedbackAnswers.find({groupID:this._id}).count();
		console.log(fbCount);
		var fb = FeedbackAnswers.find({groupID:this._id});
		var fbArray = new Array();
		
		fb.forEach(function(entry) {
			var obj = new Object();
			// console.log(entry._id);
			obj._id= entry._id;
			var fbTemplateID = entry.feedbackTemplateID;
			obj.fbTitle= Feedback.findOne({_id:fbTemplateID}).feedbackTitle;
			obj.fbType= Feedback.findOne({_id:fbTemplateID}).feedbackType;
			var feedbackType = Feedback.findOne({_id:fbTemplateID}).feedbackType;
			var groupID = entry.groupID;
			
			if(feedbackType === "Course"){
				obj.assessedOn = Groups.findOne({_id:groupID}).courseCode;
			} else if (feedbackType === "Facilty"){
				obj.assessedOn = Groups.findOne({_id:groupID}).venue;
			} else{
				var courseTrainers = Groups.findOne({_id:groupID}).courseTrainers;
				obj.assessedOn = courseTrainers[0];

			}
			fbArray.push(obj);
		});
		console.log(fbArray);
		return fbArray;
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

    "facilitiesList" : function(e) {
        return Facilities.find({}).fetch();
    },
    "courseTrainers2" : function(e) {
    	var a = this.courseTrainers;
		var courseTrainerArr = new Array();
		for(var x = 0, l = a.length; x < l;  x++){
			var entry = a[x].trainerID;
			var trainer = Meteor.users.findOne({_id:entry});
			courseTrainerArr.push(trainer);
		}
		return courseTrainerArr;
    },
    "noOfTrainers" : function(e) {
		
		var fakeArray = new Array();
		for(i = 0; i < Session.get('noOfTrainerToaddtoClass'); i++){
			fakeArray.push("a")
		}
    	return fakeArray;
    }
});

Template.addClassForm.helpers({

    "facilitiesList1" : function(e) {
        return Facilities.find({}).fetch();
    },

    "courseTrainers1" : function(e) {
			var course_id = Session.get("classListCourse_id");
			console.log(course_id);

			// var a =  Courses.findOne({_id:courseCode});
			var a =  Courses.findOne({_id:course_id}).courseTrainers;
			console.log(a);
			var trainersArr = new Array();
			for(var x = 0, l = a.length; x < l;  x++){
				var entry = a[x].trainerID;
				var trainer = Meteor.users.findOne({_id:entry});
				trainersArr.push(trainer);
			}

			return trainersArr;
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
		var obj = new Object();

		//TODO: Validation of input
		obj.courseCode = document.getElementById("gCourseCode").value;
		obj.startTime = document.getElementById("gNewStartTime").value;
		obj.endTime = document.getElementById("gNewEndTime").value;

		var str =  window.location.href;
		var position = str.indexOf('=');		
		var currentCourse=str.substr(position+1);
		console.log("it all starts here > " + currentCourse);

		var courseObject =  Courses.findOne({courseCode:currentCourse});
		console.log("HERE >>> " + courseObject);

		var days = document.getElementsByName("day");
		days = Array.prototype.slice.call(days);
		// console.log((days));
		// console.log(Array.isArray(days));
		days2 = new Array();
		days.forEach(function(curr, ind, arr){
			if(curr.checked) days2.push(curr.value.toLowerCase());
		});
		obj.days = days2;
		console.log(days);
		console.log(obj);
		// var gdaysArr = new Array();
		// for(var x = 0, l = days.length; x < l;  x++){
			// // console.log(days[x].value + " DAYS");
			// if (days[x].checked){
			  // gdaysArr.push(days[x].value);
			// }
		// }

		var stringSDate = document.getElementById("gNewStartDate").value;
		var stringEDate = document.getElementById("gNewEndDate").value;

		var SDate = new Date(moment(stringSDate,"DD/MM/YYYY").format());
		var EDate = new Date(moment(stringEDate,"DD/MM/YYYY").format());

		obj.startDate = SDate;
		obj.endDate = EDate;
		obj.venue = document.getElementById("gVenue").value;
		var trainId = document.getElementsByName("gTrainers").value;

		obj.courseTrainers = {trainerId: trainId};

		var grpNumI1 = Groups.find({courseCode:currentCourse}).count();
		console.log("What is this? : " + currentCourse);
		var grpNumI2 = grpNumI1+1;
		obj.grpNum = "G"+grpNumI2;

		console.log("here4");
		console.log(obj);
		Meteor.call("createGroup",obj);
		console.log("here4again");
		//TODO: schedule payment reminder checking
		//console.log(Groups.find({}).fetch();
	},
	"click #addMoreTrainersToClass" : function(e) {
		

		 var noOfTrainerToaddtoClass = Session.get('noOfTrainerToaddtoClass');
		 if(isNaN(noOfTrainerToaddtoClass)) noOfRadioFields = 0;
		 var noOfRadioFields = noOfTrainerToaddtoClass+1;
		 console.log("noOfTrainerToaddtoClass " + noOfTrainerToaddtoClass);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('noOfTrainerToaddtoClass', noOfRadioFields);
	},
	"click #removeTrainersFromClass" : function(e) {
		

		 var noOfTrainerToaddtoClass = Session.get('noOfTrainerToaddtoClass');
		 if(isNaN(noOfTrainerToaddtoClass)) noOfRadioFields = 1;
		 var noOfRadioFields = noOfTrainerToaddtoClass-1;
		 console.log("noOfTrainerToaddtoClass " + noOfTrainerToaddtoClass);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('noOfTrainerToaddtoClass', noOfRadioFields);
	}
});

//global template
Template.registerHelper('formatDate', function(date){
	return moment(date).format("Do MMM YYYY HH:mm");

});

Template.registerHelper('formatDateee', function(date){
	return moment(date).format("Do MMM YYYY");

});


Template.viewCourseForm.events({
	"click #enterCoursePageButton" : function viewCoursePageEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		// console.log(this.courseCode);

		Session.set('currentCourseGroup', this.courseCode);
		  //modal.find('.modal-title').text('New message to ' + recipient)
		  //modal.find('.modal-body input').val(recipient)
	}
});


Template.editClassDetails.events({
	"click #editGroupDetailsButton" : function(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		// console.log(this.courseCode);

		Session.set('currentCourseGroup', this.courseCode);
		  //modal.find('.modal-title').text('New message to ' + recipient)
		  //modal.find('.modal-body input').val(recipient)
	}
});



Template.addClassForm.events({

	"change #classListCourseCode" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();
		 console.log(" qn type course code");
		var courseCode = document.getElementById("classListCourseCode").value;
		var course_id = document.getElementById("classListCourseCode").value;
		 console.log(courseCode + " courseCode");
		 Session.set('classListCourseCode', courseCode);
		 Session.set('classListCourse_id', course_id);
		 //set some session variable???

	},
	"click #addGroupFormButton" : function(e) {
		 console.log("in client");
		var obj = new Object();

		//TODO: Validation of input
		obj.courseCode = document.getElementById("classListCourseCode").value;
		obj.startTime = document.getElementById("classListNewStartTime").value;
		obj.endTime = document.getElementById("classListNewEndTime").value;

		var str =  window.location.href;
		var position = str.indexOf('=');		
		var currentCourse=str.substr(position+1);
		console.log("it all starts here > " + currentCourse);

		var courseObject =  Courses.findOne({courseCode:currentCourse});
		console.log("HERE >>> " + courseObject);

		var days = document.getElementsByName("classListday");
		days = Array.prototype.slice.call(days);
		days.forEach(function(curr, ind, arr){
			if(curr.checked) days2.push(curr.value.toLowerCase());
		});
		obj.days = days2;
		console.log(days);
		console.log(obj);
		var stringSDate = document.getElementById("classListNewStartDate").value;
		var stringEDate = document.getElementById("classListNewEndDate").value;

		var SDate = new Date(moment(stringSDate,"DD/MM/YYYY").format());
		var EDate = new Date(moment(stringEDate,"DD/MM/YYYY").format());


		obj.startDate = document.SDate;
		obj.endDate = document.EDate;
		obj.venue = document.getElementById("classListVenue").value;
		var trainId = document.getElementById("classListTrainers").value;
		obj.courseTrainers = {trainerId: trainId};

		var grpNumI1 = Groups.find({courseCode:currentCourse}).count();
		console.log("What is this? : " + currentCourse);
		var grpNumI2 = grpNumI1+1;
		obj.grpNum = "G"+grpNumI2;

		console.log("here4");
		console.log(obj);
		Meteor.call("createGroup",obj);
		console.log("here4again");

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


Template.group.events({
	"click #removeStudentFromClass" : function deleteCourseEventHandler(e) {
			console.log(this);
			

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
		var groupID = Groups.findOne({courseCode:currentCourse,grpNum:currentGrpNum})._id
			
		console.log(groupID);
		Meteor.call("removeStudentFromClass", groupID, this._id);
	},
	"click #paidStudentFromClass" : function deleteCourseEventHandler(e) {
			console.log("canclick");
			console.log(this);

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
		var groupID = Groups.findOne({courseCode:currentCourse,grpNum:currentGrpNum})._id

		Meteor.call("studentPaid", groupID, this.studentID);
	}
});

Template.addStudent.events({
	
	"click #addStudentButton" : function(e, templ) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();
		 // console.log(e);
		 // console.log(templ);
		 
		var addStudents = document.getElementsByName("newStudentsC");
	    var addStudentsArr = new Array();
	    for(var x = 0, l = addStudents.length; x < l;  x++){
	      console.log(addStudents[x]);
	      addStudentsArr.push(addStudents[x].value);
			}


		//TODO: Add student to class list
		var courseCode = templ.data.courseCode;
		var grpNum = templ.data.grpNum;
		
		var group = Groups.findOne({courseCode:courseCode, grpNum:grpNum});
		console.log(group);
		var classlist = [];
		if(group.classlist != undefined) classlist = group.classlist;
		
		console.log(classlist);
		
	    addStudentsArr.forEach(function(entry) {
	      // console.log(entry);
				classlist.push(entry); 
	    });
		
		console.log(classlist);
		Meteor.call("updateGroupClasslist", courseCode, grpNum, classlist);

		var obj = new Object();
		var paymentStatus = new Object();
	    for(var x = 0, l = classlist.length; x < l;  x++){
	    	var studentID = classlist[x];
	    	
	      	obj.passStatus = false;

	      	paymentStatus.paid = false;

	      	Meteor.call("addClassToStudent", studentID, group._id, obj, paymentStatus);
		}

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



Template.gradesStudent.helpers({

    "studentsGrades" : function (e) {
    	console.log(this);
        var currentCourseCode = Session.get('currentCourseCode');
        var currentCourseID = Courses.findOne({courseCode:currentCourseCode})._id;
    	Meteor.users.findOne({_id:this._id}).grades[currentCourseID];
        
        // //var currentCourse = getParameterByName("cCode");
        // if(currentCourse.length<=0)return Groups.find({});

        // var size = Groups.find({courseCode:currentCourse}).count();
        // return Groups.find({courseCode:currentCourse});
    }
});



Template.gradesStudent.events({

	"click #passStudentButton" : function(e) {
		e.preventDefault();
		console.log(this);
        var currentCourseCode = Session.get('currentCourseCode');
        var currentCourseID = Courses.findOne({courseCode:currentCourseCode})._id;
    	var grades = Meteor.users.findOne({_id:this._id}).grades[currentCourseID];
   //      var studentTimes = Session.get('studentTimes');

   //      // noOfTimes = _.reject(salesInput, function(x) {
   //      //     return x.salesId == salesId;
   //      // });

		 
		 // if(isNaN(studentTimes)) noOfTimes = 1;
		 // var noOfTimes = studentTimes-1;
		 // Session.set('studentTimes', noOfTimes);
	}
});