
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
Template.certificateManagement.onRendered(function(){
	Session.set("certSearchStudent", null);
	Session.set("certSearchCourseCode", null);
	Session.set("certSearchGroupNum", null);
});

Template.certificateManagement.events({
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

Template.certificateManagement.helpers({
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

Template.certificateManagement.events({
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
		var verbose = true;
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
			if(currentValue.classlist != null && currentValue.classlist != undefined) {
				currentValue.classlist.forEach(function(currentValue2, index2, array2){
					students.push(currentValue2);
				});
			}
		});
		
		if(verbose){
			console.log(students);
		}
		
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
		
		console.log(typeof students);
		students = students.getUnique();
		
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
			genP(myData)
			// Blaze.saveAsPDF(Template.certificateTemplate, {
				// filename: "report.pdf", // optional, default is "document.pdf"
				// data: myData, // optional, render the template with this data context
				// // x: 0, // optional, left starting position on resulting PDF, default is 4 units
				// // y: 0, // optional, top starting position on resulting PDF, default is 4 units
				// orientation: "portrait", // optional, "landscape" or "portrait" (default)
				// unit: "mm", // optional, unit for coordinates, one of "pt", "mm" (default), "cm", or "in"
				// format: "a4" // optional, see Page Formats, default is "a4"
			// });
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
		console.log(courseCode);
		console.log(groupNum);
		var thisCourse  = Courses.findOne({courseCode:courseCode});
		var thisGroup   = Groups.findOne({courseCode:courseCode, grpNum:groupNum});
		console.log(thisCourse);
		console.log(thisGroup);
		console.log(this.toString());
		console.log(Meteor.users.findOne({_id:this.toString()}));
		myData.fullName = Meteor.users.findOne({_id:this.toString()}).fullName;
		myData.courseName = thisCourse.courseName;
		myData.courseCode = thisCourse.courseCode;
		myData.courseStart = thisGroup.startDate;
		myData.courseEnd   = thisGroup.endDate  ;
		genP(myData);
		// Blaze.saveAsPDF(Template.certificateTemplate, {
			// filename: "report.pdf", // optional, default is "document.pdf"
			// data: myData, // optional, render the template with this data context
			// // x: 0, // optional, left starting position on resulting PDF, default is 4 units
			// // y: 0, // optional, top starting position on resulting PDF, default is 4 units
			// orientation: "portrait", // optional, "landscape" or "portrait" (default)
			// unit: "mm", // optional, unit for coordinates, one of "pt", "mm" (default), "cm", or "in"
			// format: "a4" // optional, see Page Formats, default is "a4"
		// });
		console.log("End");
	}
});

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

object.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

(function(API){
	alert(API);
		API.myText = function(txt, options, x, y) {
				options = options ||{};
				/* Use the options align property to specify desired text alignment
				 * Param x will be ignored if desired text alignment is 'center'.
				 * Usage of options can easily extend the function to apply different text 
				 * styles and sizes 
				*/
				if( options.align == "center" ){
						// Get current font size
						var fontSize = this.internal.getFontSize();

						// Get page width
						var pageWidth = this.internal.pageSize.width;

						// Get the actual text's width
						/* You multiply the unit width of your string by your font size and divide
						 * by the internal scale factor. The division is necessary
						 * for the case where you use units other than 'pt' in the constructor
						 * of jsPDF.
						*/
						txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;

						// Calculate text's x coordinate
						x = ( pageWidth - txtWidth ) / 2;
				}

				// Draw text at x,y
				this.text(txt,x,y);
		}
})(jsPDF.API);


function genP(options){
	var doc = new jsPDF();
	console.log(doc);
	
	doc.setTextColor(100);
	doc.setFontSize(22);
	doc.text(20, 40, 'CERTIFICATE OF SUCCESSFUL COMPLETION');

	doc.setTextColor(150);
    doc.setFontSize(10);
	doc.text(100, 55, 'is awarded to ');

	// doc.setFontStyle('italic');
	doc.text(105, 70, "options.fullName");
	//doc.myText("Centered text",{align: "center"},0,1);

	doc.setTextColor(255, 0, 0);
	doc.text(20, 500, "options.userID");

	doc.setTextColor(0, 255, 0);
	doc.text(20, 600, 'for succesful completeion of the');

	doc.setTextColor(255, 0, 0);
	doc.text(20, 700, "options.courseName");

	doc.setTextColor(255, 0, 0);
	doc.text(20, 800, 'Sterling Engineering Training Hub');

	doc.setTextColor(255, 0, 0);
	doc.text(20, 900, 'Sterling address');

	doc.setTextColor(255, 0, 0);
	doc.text(20, 1000, 'ISO');

	doc.setTextColor(255, 0, 0);
	doc.text(20, 1100, 'Blah');

	doc.setTextColor(255, 0, 0);
	doc.text(20, 1200, 'from');

	doc.setTextColor(255, 0, 0);
	doc.text(20, 1300, "options.courseStart" + ' to ' + "options.courseEnd");

	doc.setTextColor(255, 0, 0);
	doc.text(20, 1400, 'Validity: 5 Years');
	
	doc.save('test.pdf');
}