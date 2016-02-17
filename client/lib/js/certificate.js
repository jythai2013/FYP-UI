
Template.certificateTemplate.onRendered(function(){
	
	// console.log("Start");
	Blaze.saveAsPDF(Template.certificateTemplate, {
		filename: "report.pdf", // optional, default is "document.pdf"
		// data: myData,  optional, render the template with this data context
		x: 0, // optional, left starting position on resulting PDF, default is 4 units
		y: 0, // optional, top starting position on resulting PDF, default is 4 units
		orientation: "portrait", // optional, "landscape" or "portrait" (default)
		unit: "mm", // optional, unit for coordinates, one of "pt", "mm" (default), "cm", or "in"
		format: "a4" // optional, see Page Formats, default is "a4"
	});
	// console.log(a);
	// console.log("End");
});

//Search ////////////////////////
Template.certificate.onRendered(function(){
	Session.set("certSearchStudent", null);
	Session.set("certSearchCourseCode", null);
	Session.set("certSearchGroupNum", null);
});

Template.certificate.events({
	"click #filter" : function doSearch(e){
		// console.log(e);
		var studentName = document.getElementById("studentName").value;
		var courseCode = document.getElementById("courseCode").value;
		var groupNum = document.getElementById("groupNum").value;
		Session.set("certSearchStudent", studentName);
		Session.set("certSearchCourseCode", courseCode);
		Session.set("certSearchGroupNum", groupNum);
	},
	
	"blur #studentName, blur #courseCode, blur #groupNum" : function s2(e){
		//console.log(e);
		var studentName = document.getElementById("studentName").value;
		var courseCode = document.getElementById("courseCode").value;
		var groupNum = document.getElementById("groupNum").value;
		Session.set("certSearchStudent", studentName);
		Session.set("certSearchCourseCode", courseCode);
		Session.set("certSearchGroupNum", groupNum);
	},
	
	"keydown #studentName, keydown #courseCode, keydown #groupNum" : function s5(e){
		//console.log(e);
		setTimeout(function() {
			var studentName = document.getElementById("studentName").value;
			var courseCode = document.getElementById("courseCode").value;
			var groupNum = document.getElementById("groupNum").value;
			Session.set("certSearchStudent", studentName);
			Session.set("certSearchCourseCode", courseCode);
			Session.set("certSearchGroupNum", groupNum);
		}, 2);
	}
});

Template.certificate.helpers({
	"finishedGroup" : function certificate(evt) {
		var verbose = true;
		var studentName = Session.get("certSearchStudent");
		var courseCode = Session.get("certSearchCourseCode");
		var groupNum = Session.get("certSearchGroupNum");
		
		var v = Groups.find({}).fetch();
		
		if(verbose){
			console.log(studentName);
		}
		if(studentName != null && studentName != undefined && studentName.length > 0){ //TODO:redirect to the student list page
			Router.go('/certificateStudentList');
		}
		//if(studentName != null && studentName != undefined && studentName.length > 0){
		//	v = Meteor.users.find({userType:{learner:true}}).fetch().filter(function(e){
		//		if(verbose){
		//			console.log(e);
		//			console.log(e.name.toLowerCase().indexOf(studentName.toLowerCase())>-1);
		//		}
		//		return (e.name.toLowerCase().indexOf(studentName.toLowerCase())>-1);
		//	});
		//}
		if(courseCode != null && courseCode != undefined && courseCode.length > 0){
			v = v.filter(function(e){
				if(verbose){
					console.log(e);
					console.log(e.courseCode.toLowerCase().indexOf(courseCode.toLowerCase())>-1);
				}
				return (e.courseCode.toLowerCase().indexOf(courseCode.toLowerCase())>-1);
			});
		}
		if(groupNum != null && groupNum != undefined && groupNum.length > 0){
			v = v.filter(function(e){
				if(verbose){
					console.log(e);
					console.log(e.grpNum.toLowerCase().indexOf(groupNum.toLowerCase())>-1);
				}
				return (e.grpNum.toLowerCase().indexOf(groupNum.toLowerCase())>-1);
			});
		}
		if(verbose){
			console.log(v);
		}
		return v;
	}
});
// End Search ////////////////////////

Template.certificate.events({
	"click #go" : function doSearch(e, t){
		console.log(this);
		console.log(e);
		console.log(t);
		var courseCode = this.courseCode;
		var groupNum = this.grpNum;
		Session.set("certSearchStudent", null);
		Session.set("certSearchCourseCode", courseCode);
		Session.set("certSearchGroupNum", groupNum);
		Router.go("certificateStudentList");
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

















//Search ////////////////////////
Template.certificateStudentList.onRendered(function(){
	var studentListName = getParameterByName("studentName");
	var StudentListCour = getParameterByName("courseCode");
	var StudentListGrou = getParameterByName("courseGroup");
	Session.set("certSearchStudentListName"  , studentListName);
	Session.set("certSearchStudentListCourse", StudentListCour);
	Session.set("certSearchStudentListGroup" , StudentListGrou);
});

Template.certificateStudentList.events({
	"click #filter" : function doSearch(e){
		//// console.log(e);
		//var studentName = document.getElementById("studentName").value;
		//var courseCode = document.getElementById("courseCode").value;
		//var groupNum = document.getElementById("groupNum").value;
		//Session.set("certSearchStudentListName", studentName);
		//Session.set("certSearchStudentListCourse", courseCode);
		//Session.set("certSearchStudentListGroup", groupNum);
	},
	
	"blur #studentName, blur #courseCode, blur #groupNum" : function s2(e){
		//console.log(e);
		var studentName = document.getElementById("studentName").value;
		var courseCode = document.getElementById("courseCode").value;
		var groupNum = document.getElementById("groupNum").value;
		Session.set("certSearchStudent", studentName);
		Session.set("certSearchCourseCode", courseCode);
		Session.set("certSearchGroupNum", groupNum);
	},
	
	"keydown #studentName, keydown #courseCode, keydown #groupNum" : function s5(e){
		//console.log(e);
		setTimeout(function() {
			var studentName = document.getElementById("studentName").value;
			var courseCode = document.getElementById("courseCode").value;
			var groupNum = document.getElementById("groupNum").value;
			Session.set("certSearchStudent", studentName);
			Session.set("certSearchCourseCode", courseCode);
			Session.set("certSearchGroupNum", groupNum);
		}, 10);
	}
});

Template.certificateStudentList.helpers({
	"students" : function certificate(evt) {
		var verbose = !true;
		var studentName = Session.get("certSearchStudent");
		var courseCode 	= Session.get("certSearchCourseCode");
		var groupNum 		= Session.get("certSearchGroupNum");
		if(verbose){
			console.log(studentName);
			console.log(courseCode);
			console.log(groupNum);
		}
		
		var v = Groups.find({}).fetch();
		
		if(courseCode != null && courseCode != undefined && courseCode.length > 0){
			v = v.filter(function(e){
				if(verbose){
					console.log(e);
					console.log(e.courseCode.toLowerCase().indexOf(courseCode.toLowerCase())>-1);
				}
				return (e.courseCode.toLowerCase().indexOf(courseCode.toLowerCase())>-1);
			});
		}
		if(groupNum != null && groupNum != undefined && groupNum.length > 0){
			v = v.filter(function(e){
				if(verbose){
					console.log(e);
					console.log(e.grpNum.toLowerCase().indexOf(groupNum.toLowerCase())>-1);
				}
				return (e.grpNum.toLowerCase().indexOf(groupNum.toLowerCase())>-1);
			});
		}
		if(verbose){
			console.log(v);
		}
		
		//converts a set of groups into students
		var students = new Array();
		v.forEach(function(currentValue, index, array){
			students.push(currentValue.classtList);
		});
		
		//Filter the students
		if(studentName != null && studentName != undefined && studentName.length > 0){ 
			students.filter(function(thisStudent){
				if(verbose){
					console.log(thisStudent);
					console.log(thisStudent.fullName.toLowerCase().indexOf(studentName.toLowerCase())>-1);
				}
				return (thisStudent.name.toLowerCase().indexOf(studentName.toLowerCase())>-1);
			});
		}
		if(verbose){
			console.log(students);
		}
		
		Session.set("certificateStudentListStudents", students)
		return students;
	}
});
// End Search ////////////////////////

Template.certificateStudentList.events({
	"click #generateCerts":function(event, templateT){
		console.log(this);
		console.log(event);
		console.log(templateT);
		
		var aData = {};
		var courseCode  = Session.get("certSearchCourseCode");
		var groupNum 	  = Session.get("certSearchGroupNum"); 
		var thisCourse  = Courses.findOne({courseCode:courseCode});
		var thisGroup   = Groups.findOne({courseCode:courseCode, grpNum:groupNum});
		aData.courseName = thisCourse.courseName;
		aData.courseCode = thisCourse.courseCode;
		aData.courseStart = thisGroup.startDate;
		aData.courseEnd   = thisGroup.endDate  ;
		var students = Session.get("certificateStudentListStudents");
		students.forEach(function(studentId){
			var myData={};
			myData.courseName  = aData.courseName ;
			myData.courseCode  = aData.courseCode ;
			myData.courseStart = aData.courseStart;
			myData.courseEnd   = aData.courseEnd  ;
			myData.fullName = Meteor.users.findOne({_id:studentId}).fullName;
			Blaze.saveAsPDF(Template.certificateTemplate, {
				filename: "report.pdf", // optional, default is "document.pdf"
				data: myData, // optional, render the template with this data context
				x: 0, // optional, left starting position on resulting PDF, default is 4 units
				y: 0, // optional, top starting position on resulting PDF, default is 4 units
				orientation: "portrait", // optional, "landscape" or "portrait" (default)
				unit: "mm", // optional, unit for coordinates, one of "pt", "mm" (default), "cm", or "in"
				format: "a4" // optional, see Page Formats, default is "a4"
			});
		});
		console.log("End");
	},
	
	"click #generateCert":function(event, templateT){
		console.log(this);
		console.log(event);
		console.log(templateT);
		var myData = new Object();    
		var courseCode  = Session.get("certSearchCourseCode");
		var groupNum 	  = Session.get("certSearchGroupNum"); 
		var thisCourse  = Courses.findOne({courseCode:courseCode});
		var thisGroup   = Groups.findOne({courseCode:courseCode, grpNum:groupNum});
		myData.fullName = this.fullName;
		myData.courseName = thisCourse.courseName;
		myData.courseCode = thisCourse.courseCode;
		myData.courseStart = thisGroup.startDate;
		myData.courseEnd   = thisGroup.endDate  ;
		Blaze.saveAsPDF(Template.certificateTemplate, {
			filename: "report.pdf", // optional, default is "document.pdf"
			data: myData, // optional, render the template with this data context
			x: 0, // optional, left starting position on resulting PDF, default is 4 units
			y: 0, // optional, top starting position on resulting PDF, default is 4 units
			orientation: "portrait", // optional, "landscape" or "portrait" (default)
			unit: "mm", // optional, unit for coordinates, one of "pt", "mm" (default), "cm", or "in"
			format: "a4" // optional, see Page Formats, default is "a4"
		});
		console.log("End");
	}
});