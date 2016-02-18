
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
		var verbose = !true;
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
		// console.log(this);
		// console.log(e);
		// console.log(t);
		var courseCode = this.courseCode;
		var groupNum = this.grpNum;
		Session.set("certSearchStudent", null);
		Session.set("certSearchCourseCode", courseCode);
		Session.set("certSearchGroupNum", groupNum);
		window.location.href = "certificateStudentList?cCode="+courseCode+"&grpNum="+groupNum;
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
	// var studentListName = getParameterByName("studentName");
	// var StudentListCour = getParameterByName("courseCode");
	// var StudentListGrou = getParameterByName("courseGroup");
	// Session.set("certSearchStudentListName"  , studentListName);
	// Session.set("certSearchStudentListCourse", StudentListCour);
	// Session.set("certSearchStudentListGroup" , StudentListGrou);
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
		
		if(verbose){
			console.log(typeof students);
			console.log(students);
		}
		
		studentsID = students.getUnique();
		
		if(verbose){
			console.log(typeof students);
			console.log(students);
		}
			
		students = new Array();
		studentsID.forEach(function(curr, ind, arr){
			students.push(Meteor.users.findOne({_id:curr}))
		});
		
			console.log(typeof students);
			console.log(students);
		
		Session.set("certificateStudentListStudents", students)
		return students;
	}
});
// End Search ////////////////////////

Template.certificateStudentList.events({
	"click #generateCerts":function(event, templateT){
		// console.log(this);
		// console.log(event);
		// console.log(templateT);
		
		var aData = {};
		var courseCode  = Session.get("certSearchCourseCode");
		var groupNum 	  = Session.get("certSearchGroupNum"); 
			console.log(courseCode);
			console.log(groupNum);
		if(courseCode == undefined) courseCode 	= getParameterByName("cCode");
		if(groupNum 	== undefined) groupNum 		= getParameterByName("grpNum");
			console.log(courseCode);
			console.log(groupNum);
		
		var thisCourse  = Courses.findOne({courseCode:courseCode});
		var thisGroup   = Groups.findOne({courseCode:courseCode, grpNum:groupNum});
		aData.courseName = thisCourse.courseName;
		aData.courseCode = thisCourse.courseCode;
		aData.courseStart = thisGroup.startDate;
		aData.courseEnd   = thisGroup.endDate  ;
		var students = Session.get("certificateStudentListStudents");
		students.forEach(function(studentId){
			var myData={};
			// try{
			myData.fullName = Meteor.users.findOne({_id:this.toString()}).fullName;
			myData.userID = Meteor.users.findOne({_id:this.toString()}).userID;
			myData.courseName = thisCourse.courseName;
			myData.courseCode = thisCourse.courseCode;
			myData.courseStart = thisGroup.startDate;
			myData.courseEnd   = thisGroup.endDate  ;
			genP(myData);
			// }catch(err){
				// alert(err);
				// console.error(err);
			// }
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
		// console.log(this);
		// console.log(event);
		// console.log(templateT);
		var myData = new Object();    
		var courseCode  = Session.get("certSearchCourseCode");
		var groupNum 	  = Session.get("certSearchGroupNum"); 
		// console.log(courseCode);
		// console.log(groupNum);
		var thisCourse  = Courses.findOne({courseCode:courseCode});
		var thisGroup   = Groups.findOne({courseCode:courseCode, grpNum:groupNum});
		// console.log(thisCourse);
		// console.log(thisGroup);
		// console.log(this.toString());
		// console.log(Meteor.users.findOne({_id:this.toString()}));
		// try{
		myData.fullName = Meteor.users.findOne({_id:this.toString()}).fullName;
		myData.userID = Meteor.users.findOne({_id:this.toString()}).userID;
		myData.courseName = thisCourse.courseName;
		myData.courseCode = thisCourse.courseCode;
		myData.courseStart = thisGroup.startDate;
		myData.courseEnd   = thisGroup.endDate  ;
		genP(myData);
		// }catch(err){
			// alert(err);
			// console.error(err);
		// }
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

// (function(API){
	// alert(API);
		// API.myText = function(txt, options, x, y) {
				// options = options ||{};
				// /* Use the options align property to specify desired text alignment
				 // * Param x will be ignored if desired text alignment is 'center'.
				 // * Usage of options can easily extend the function to apply different text 
				 // * styles and sizes 
				// */
				// if( options.align == "center" ){
						// // Get current font size
						// var fontSize = this.internal.getFontSize();

						// // Get page width
						// var pageWidth = this.internal.pageSize.width;

						// // Get the actual text's width
						// /* You multiply the unit width of your string by your font size and divide
						 // * by the internal scale factor. The division is necessary
						 // * for the case where you use units other than 'pt' in the constructor
						 // * of jsPDF.
						// */
						// txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;

						// // Calculate text's x coordinate
						// x = ( pageWidth - txtWidth ) / 2;
				// }

				// // Draw text at x,y
				// this.text(txt,x,y);
		// }
// })(jsPDF.API);

// var splitRegex = /\r\n|\r|\n/g;
// jsPDF.AP


function genP(options){
	
	console.log(options)
	if(options.userID == null) options.userID = "123";
	
  var doc = new jsPDF();
	doc.centerTxt = function(txt, options, x, y) {
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
	
	// doc.setTextColor(0, 255, 0);
	// doc.setFontStyle('italic');
	var imgData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4ge4SUNDX1BST0ZJTEUAAQEAAAeoYXBwbAIgAABtbnRyUkdCIFhZWiAH2QACABkACwAaAAthY3NwQVBQTAAAAABhcHBsAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWFwcGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAAG9kc2NtAAABeAAABWxjcHJ0AAAG5AAAADh3dHB0AAAHHAAAABRyWFlaAAAHMAAAABRnWFlaAAAHRAAAABRiWFlaAAAHWAAAABRyVFJDAAAHbAAAAA5jaGFkAAAHfAAAACxiVFJDAAAHbAAAAA5nVFJDAAAHbAAAAA5kZXNjAAAAAAAAABRHZW5lcmljIFJHQiBQcm9maWxlAAAAAAAAAAAAAAAUR2VuZXJpYyBSR0IgUHJvZmlsZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbWx1YwAAAAAAAAAeAAAADHNrU0sAAAAoAAABeGhySFIAAAAoAAABoGNhRVMAAAAkAAAByHB0QlIAAAAmAAAB7HVrVUEAAAAqAAACEmZyRlUAAAAoAAACPHpoVFcAAAAWAAACZGl0SVQAAAAoAAACem5iTk8AAAAmAAAComtvS1IAAAAWAAACyGNzQ1oAAAAiAAAC3mhlSUwAAAAeAAADAGRlREUAAAAsAAADHmh1SFUAAAAoAAADSnN2U0UAAAAmAAAConpoQ04AAAAWAAADcmphSlAAAAAaAAADiHJvUk8AAAAkAAADomVsR1IAAAAiAAADxnB0UE8AAAAmAAAD6G5sTkwAAAAoAAAEDmVzRVMAAAAmAAAD6HRoVEgAAAAkAAAENnRyVFIAAAAiAAAEWmZpRkkAAAAoAAAEfHBsUEwAAAAsAAAEpHJ1UlUAAAAiAAAE0GFyRUcAAAAmAAAE8mVuVVMAAAAmAAAFGGRhREsAAAAuAAAFPgBWAWEAZQBvAGIAZQBjAG4A/QAgAFIARwBCACAAcAByAG8AZgBpAGwARwBlAG4AZQByAGkBDQBrAGkAIABSAEcAQgAgAHAAcgBvAGYAaQBsAFAAZQByAGYAaQBsACAAUgBHAEIAIABnAGUAbgDoAHIAaQBjAFAAZQByAGYAaQBsACAAUgBHAEIAIABHAGUAbgDpAHIAaQBjAG8EFwQwBDMEMAQ7BEwEPQQ4BDkAIAQ/BEAEPgREBDAEOQQ7ACAAUgBHAEIAUAByAG8AZgBpAGwAIABnAOkAbgDpAHIAaQBxAHUAZQAgAFIAVgBCkBp1KAAgAFIARwBCACCCcl9pY8+P8ABQAHIAbwBmAGkAbABvACAAUgBHAEIAIABnAGUAbgBlAHIAaQBjAG8ARwBlAG4AZQByAGkAcwBrACAAUgBHAEIALQBwAHIAbwBmAGkAbMd8vBgAIABSAEcAQgAg1QS4XNMMx3wATwBiAGUAYwBuAP0AIABSAEcAQgAgAHAAcgBvAGYAaQBsBeQF6AXVBeQF2QXcACAAUgBHAEIAIAXbBdwF3AXZAEEAbABsAGcAZQBtAGUAaQBuAGUAcwAgAFIARwBCAC0AUAByAG8AZgBpAGwAwQBsAHQAYQBsAOEAbgBvAHMAIABSAEcAQgAgAHAAcgBvAGYAaQBsZm6QGgAgAFIARwBCACBjz4/wZYdO9k4AgiwAIABSAEcAQgAgMNcw7TDVMKEwpDDrAFAAcgBvAGYAaQBsACAAUgBHAEIAIABnAGUAbgBlAHIAaQBjA5MDtQO9A7kDugPMACADwAPBA78DxgOvA7sAIABSAEcAQgBQAGUAcgBmAGkAbAAgAFIARwBCACAAZwBlAG4A6QByAGkAYwBvAEEAbABnAGUAbQBlAGUAbgAgAFIARwBCAC0AcAByAG8AZgBpAGUAbA5CDhsOIw5EDh8OJQ5MACAAUgBHAEIAIA4XDjEOSA4nDkQOGwBHAGUAbgBlAGwAIABSAEcAQgAgAFAAcgBvAGYAaQBsAGkAWQBsAGUAaQBuAGUAbgAgAFIARwBCAC0AcAByAG8AZgBpAGkAbABpAFUAbgBpAHcAZQByAHMAYQBsAG4AeQAgAHAAcgBvAGYAaQBsACAAUgBHAEIEHgQxBEkEOAQ5ACAEPwRABD4ERAQ4BDsETAAgAFIARwBCBkUGRAZBACAGKgY5BjEGSgZBACAAUgBHAEIAIAYnBkQGOQYnBkUARwBlAG4AZQByAGkAYwAgAFIARwBCACAAUAByAG8AZgBpAGwAZQBHAGUAbgBlAHIAZQBsACAAUgBHAEIALQBiAGUAcwBrAHIAaQB2AGUAbABzAGV0ZXh0AAAAAENvcHlyaWdodCAyMDA3IEFwcGxlIEluYy4sIGFsbCByaWdodHMgcmVzZXJ2ZWQuAFhZWiAAAAAAAADzUgABAAAAARbPWFlaIAAAAAAAAHRNAAA97gAAA9BYWVogAAAAAAAAWnUAAKxzAAAXNFhZWiAAAAAAAAAoGgAAFZ8AALg2Y3VydgAAAAAAAAABAc0AAHNmMzIAAAAAAAEMQgAABd7///MmAAAHkgAA/ZH///ui///9owAAA9wAAMBs/+EAgEV4aWYAAE1NACoAAAAIAAUBEgADAAAAAQABAAABGgAFAAAAAQAAAEoBGwAFAAAAAQAAAFIBKAADAAAAAQACAACHaQAEAAAAAQAAAFoAAAAAAAAASAAAAAEAAABIAAAAAQACoAIABAAAAAEAAAH0oAMABAAAAAEAAAH0AAAAAP/bAEMAAgEBAgEBAgIBAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYGBgcICwkHCAoIBgYJDQkKCwsMDAwHCQ0ODQwOCwwMC//bAEMBAgICAwIDBQMDBQsIBggLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLC//AABEIAfQB9AMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APzLooor+sD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK4z4yfFb/hWOl2zWUMVxe3jkRpISFVQOWOOepUfjXJj8dRy2hLE4h2hHf8vzNqFCeJqKnTV2zs6K+bm/aQ8VliReW4z2FsnH6VLaftL+KLaQNNLZXAB+7JbgA/98kGvjI+I+Vt2cZr5L/5I9l8OYpdY/e/8j6Morx3QP2sY3ZV8UaUyDPMltJu/wDHGx/6FXo/hX4jaL40Uf8ACPahBNKRnySdso/4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F/x+J/28PjP4X+Pv7ROo+JPhLa3MGnXNvDFNLPEImvJkUqZdnUAqEXnk7cnGah1X9k27W4P9iavbyRHp58RRh7fLnP14rT8Gfstwabfx3HjC9W8WJgwt4UxG+OzMeSPbAr87o8D5vOt7N0bebasvO9/y1PoZ53g4w5lO/lZ3PMtS+Fmv6Hodpqz2crWtxGs6yQ5ZoQeRvA5Xsc9Oetew/BP/AIKcfFT4N2sdncapB4p02LhbfWkad4x0ws4YSemAzMB2FejgBRheAK5vxL8IvDvit2k1bTIRM3WWLMT/AFJXGfxzX1mY+Gbsngq2ttVLv1s1+VvmeVh+JVe1eHzX+T/zPULb/gt1/wASUi8+Hf8AxMRGQGTWP3BfHBwYdwGe2T9a+LvBVrc+PvipayRpslu777XL5S4EQ372I9AOcfhXq037KmhPNuhvtVRCc7d8Zx9DsrsvBXw40j4f27J4cttkkgCyTOd0kg9z/QYFedlXh5jliYSxXLGmmm7O7duit387WOjFcQ0PZNUruT8jdooor9rPigooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKmg064urSee2hkeG1CmZ1XKxhjgFj2yeKhr1L4P8AhUav+zr8X9TNvJIdIs9KIlXO2HzNQjT5u3PTn0rOrUVKN33S+9pfqVFczseW0UUVoSFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUVY0q0hvtSgh1C6jsoJHCyTyIzrEvdiqAsfoBXqXgv4JfDfWbx08a/GrQ9EgEW9JI/DmqXZZ8j5CogXHBJzkjisqlaNJXkn8k3+SZUYuWi/Ox5LX0j+yt4fXVf2E/2mbhpShtrPw8oULnd/xMWk/wDaIH/AqiX9kz4NsoI/aT8Oc88+FtQFe9/s3fs+/DfQf2P/AI+aZ4f+NWi6xpOs2+irqeqx6FdxR6II7mZoy8bfNL5jFlGz7u3JryMwzCm6S5VK/ND7Ev5494/16nVQoS5tbbPquz8z8+KK+jf+GS/g3/0cn4b/APCX1CsLxt+zt8KPD2nsfDXx90LV74MoEH/CLanFGQep80RsOPQA13xx9KbslL/wCf8A8iYOjJa6fev8zw+itrxt4d0zw5fRx+GPEFl4hiYHdNbW08CoeO00aE5z6dj7Zxa7Iy5ldGT0CiiimAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFfTf7JOpQWf7BH7T8d1KqPLa+Hdinq3+nTLx/wJ0H/AhXzJXtHwH8Rtpn7J3x309YlddTstE3OWwY/L1ONuB3zXFmEPaUkv70PwnFm1CXLK/k/wAmeL0UUV2mIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVraJ4sk0Tw5rWmxRK6a1FFFI5JzGI5VkBA7klcfiayaKTSluAUUUUwCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//2Q==';
	doc.addImage(imgData, 'JPEG', 15, 40, 15, 15);
	doc.setTextColor(100);
	doc.setFontSize(20);
	doc.centerTxt("CERTIFICATE OF SUCCESSFUL COMPLETION",{align: "center"}, 20, 55);

	doc.setTextColor(150);
  doc.setFontSize(10);
	doc.centerTxt("is awarded to", {align: "center"}, 100, 70);

  doc.setFontSize(16);
	doc.centerTxt(options.fullName, {align: "center"}, 105, 85);

  doc.setFontSize(12);
	doc.centerTxt(options.userID, {align: "center"}, 20, 95);

  doc.setFontSize(10);
	doc.centerTxt('for succesful completeion of the', {align: "center"}, 20, 110);

  doc.setFontSize(16);
	doc.centerTxt(options.courseName, {align: "center"}, 20, 130);

  doc.setFontSize(10);
	doc.centerTxt('Sterling Engineering Training Hub', {align: "center"}, 20, 150);

  doc.setFontSize(10);
	doc.centerTxt('Sterling address', {align: "center"}, 20, 155);

  doc.setFontSize(10);
	doc.centerTxt('ISO', {align: "center"}, 20, 160);

  doc.setFontSize(10);
	doc.centerTxt('Blah', {align: "center"}, 20, 165);

  doc.setFontSize(10);
	doc.centerTxt('from', {align: "center"}, 20, 170);

  doc.setFontSize(12);
	doc.centerTxt(options.courseStart + ' to ' + options.courseEnd, {align: "center"}, 20, 190);

  doc.setFontSize(12);
	doc.centerTxt('Validity: 5 Years', {align: "center"}, 20, 200);
	
	
	doc.output("datauri");
	// doc.save('test.pdf');
}