 function getStudentOngoingCourse(e) {
    // console.log("studentPortal.js - trainerOngoingCourses >>>");
    var tId = Meteor.user()._id;
    var coursesEnrolled = Groups.find({classlist: {$in : [ tId ]}});
    // console.log("getStudentOngoingCourse Return: "+ coursesEnrolled);
    return coursesEnrolled;
  } 

  function getDDMMYYY(date) {
  	return moment(date).format("DD-MM-YYYY");
  }

  function getFromUrl(a) {
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
	return group;
}

Template.studentUpload.helpers({
	"studentOngoingCourses" : function findTrainerUploads(e) {
		var a = getStudentOngoingCourse();
		console.log("studentOngoingCourses >>> "+a);
		return a;
	},
});
Template.studentCourseMaterial.helpers({
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

//student/studentClass.html
Template.studentClass.helpers({
	"studentOngoingCourses" : function findTrainerOngoingCourses(e) {
		console.log("studentPortal.js - studentOngoingCourses >>>");
		var coursesEnrolled = getStudentOngoingCourse();
		// maybe need filter for ongoing courses only
		console.log(coursesEnrolled);
		return coursesEnrolled;
	},

	"getCourseName" : function findTrainerOngoingCourses(cCode) {
		return Courses.findOne({"courseCode": cCode}).courseName;
	}
});

Template.studentGrades.helpers({
	"getGrade" : function sgGetUrl(e){
		// var currentCourseID = Courses.findOne({courseCode:currentCourseCode})._id;
    	var courseId = this._id;
    	console.log("studentGrades.js (getGrade) >>> " + courseId);
    	var gradeObj = Meteor.users.findOne({"_id": Meteor.user()._id}).grades;
    	console.log("grade >>> " + gradeObj[courseId]);
    	console.log("grade >>> " + gradeObj[courseId].passStatus);
    	return gradeObj;
	}
});

Template.studentAttendence.helpers({
	"getUrl" : function saGetUrl(){
		var courseId = this._id;
    	console.log("studentGrades.js (getGrade) >>> " + courseId);
	// 	// Session.set('trainerClass', group);
	// 	return group;
	}
});

Template.studentCourseMaterial.helpers({
	"getUrl" : function scGetUrl(){
		var courseId = this._id;
    	console.log("studentGrades.js (getGrade) >>> " + courseId);
	// 	// Session.set('trainerClass', group);
	// 	return group;
	}
});