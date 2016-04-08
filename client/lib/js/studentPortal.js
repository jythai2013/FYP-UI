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
	"countMyEnrolled" : function countMyEnrolled(e) {
		var tId = Meteor.user()._id;
		var a = Groups.find({classlist: {$in : [ tId ]}}).count();
		var b = (a !== 0);
		// console.log(b);
		return b;
	},

	"getCourseName" : function findStudentOngoingCourses3(cCode) {
		var a = Courses.findOne({"courseCode": cCode});
		if (a  === undefined){
			return "";
		} else {
			return a.courseName;
		}
	}
});

Template.studentUpload.helpers({
	"studentOngoingCourses" : function findStudentUploads(e) {
		var tId = Meteor.user()._id;
	    var todayDate = new Date();
	    // // maybe need filter for ongoing courses only
	    var coursesEnrolled = Groups.find({classlist: {$in : [tId]}}).fetch();
	    // console.log("getStudentOngoingCourse Return: " + coursesEnrolled);
	    var array = [];
	    for (var j = 0; j < coursesEnrolled.length; j ++){
	    	// console.log(coursesEnrolled[j]);
	    	array.push(coursesEnrolled[j]);
	    }
	    console.log(typeof array);
	    return array;
	}
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
	"studentOngoingCourses" : function findStudentOngoingCourses1(e) {
		var tId = Meteor.user()._id;
	    var todayDate = new Date();
	    // // maybe need filter for ongoing courses only
	    var coursesEnrolled = Groups.find({classlist: {$in : [tId]}}).fetch();
	    // console.log("getStudentOngoingCourse Return: " + coursesEnrolled);
	    var array = [];
	    for (var j = 0; j < coursesEnrolled.length; j ++){
	    	// console.log(coursesEnrolled[j]);
	    	array.push(coursesEnrolled[j]);
	    }
	    console.log(typeof array);
	    return array;
	},

	"getCourseName" : function findStudentOngoingCourses2(cCode) {
		var a = Courses.findOne({"courseCode": cCode});
		if (a === undefined){
			return "";
		} else {
			return a.courseName;
		}
	}
});

Template.studentGrades.helpers({
	"getGrade" : function sgGetUrl(e){
		// var currentCourseID = Courses.findOne({courseCode:currentCourseCode})._id;
    	var courseId = this._id;
    	console.log("studentGrades.js (getGradeFor) >>> " + courseId);
    	var gradeObj = Meteor.users.findOne({"_id": Meteor.user()._id}).grades[courseId];
    	console.log(gradeObj);
    	console.log("grade >>> " + gradeObj);

    	result = [];
    	for (var key in gradeObj) result.push({name:key,value:gradeObj[key]});
    	console.log("grade >>> " + result);
    	return result;
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