
Template.trainerUploadAttendance.events({
	"click #updateAttendance":function updateAttendanceHandler(e, template){
		group_id = 
		studentId = 
		dateI = 
		attendanceTrueOrFalse = 
		Meteor.call("editAttendance", group_id, studentId, dateI, attendanceTrueOrFalse)
	},
	
	"click #generateExcel":function attendanceExcelGeneration(e, template){
		e.preventDefault();
		// console.log("generateExcel");
		// console.log(e);
		// console.log(template);
		// console.log(Template.currentData());
		var groupId = $("#").value
		var inData = "";
		//TODO: foreach student in the class list, push [studentId, studentName, true] into the data array
		//var inData = []; 
		var inWs_name = "sheet 1";
		var inExcelName = "test";
		Meteor.call("generateExcel", inData, inWs_name, inExcelName);
		//console.log("generateExcel");
	}
	
});

Template.trainerUploadAttendance.onRendered(function(){
	//var XLSX;
	if(typeof require !== 'undefined') XLSX = require('xlsx');
	//XLSX = require('xlsx');
	//console.log(window.XLSX);
	
	//var fs = Npm.require('fs');
	//console.log(fs);
	//var path = Npm.require('path');
	//console.log(path);
	//var basepath = path.resolve('.').split('.meteor')[0];
	//console.log(basepath);
	
	//register event listerners for file drop or add
	DOMElement = $('#inputExcelElementAttendance')[0];
	DOMElement.addEventListener('change', handleFile, false);
	DOMElement.addEventListener('drop', handleDrop, false);
});


/* set up drag-and-drop event */
function handleDrop(e) {
  e.stopPropagation();
  e.preventDefault();
  var files = e.dataTransfer.files;
  var i,f;
  for (i = 0, f = files[i]; i != files.length; ++i) {
    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e) {
      var data = e.target.result;

      /* if binary string, read with type 'binary' */
      var workbook = XLSX.read(data, {type: 'binary'});

      /* DO SOMETHING WITH workbook HERE */
			processExcelFile(workbook);
    };
    reader.readAsBinaryString(f);
  }
}



function handleFile(e) {
  var files = e.target.files;
  var i,f;
  for (i = 0, f = files[i]; i != files.length; ++i) {
    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e) {
      var data = e.target.result;

      var workbook = XLSX.read(data, {type: 'binary'});

      /* DO SOMETHING WITH workbook HERE */
			processExcelFile(workbook);
    };
    reader.readAsBinaryString(f);
  }
}







function processExcelFile(workbook){
	/* Get worksheet name */
	var first_sheet_name = workbook.SheetNames[0];
	
	/* Get worksheet */
	var worksheet = workbook.Sheets[first_sheet_name];
	
	// /* Find desired cell */
	// var desired_cell = worksheet[address_of_cell];

	// /* Get the value */
	// var desired_value = desired_cell.v;
	
	var cellOf_CourseID	= 'C4';
	var cellOf_GroupID 	= 'C5';
	var CourseID	= worksheet[cellOf_CourseID].v;
	var GroupID 	= worksheet[cellOf_GroupID].v;
	//console.log(GroupID);
	
	var startingLineNumber	= 9;
	var currentLineNumber		= startingLineNumber;
	
	var dates = new Array();
	var startOfTheRest = "D"
	var currentOfTheRest = startOfTheRest;
	var datesNamesLineNumber = startingLineNumber - 1;
	while(cellIsFilled(workbook, currentOfTheRest + datesNamesLineNumber)){
		//console.log(new Date(worksheet[currentOfTheRest + datesNamesLineNumber].v));
		//console.log(new Date((worksheet[currentOfTheRest + datesNamesLineNumber].v - (25567 + 1))*86400*1000));
		dates.push(new Date((worksheet[currentOfTheRest + datesNamesLineNumber].v - (25567 + 1))*86400*1000));
		currentCharCode = currentOfTheRest.charCodeAt(0);
		currentOfTheRest = String.fromCharCode(currentCharCode+1)
	}
	// console.log(dates);
	
	var cellOf_StudentName	= 'B';
	var cellOf_StudentID  	= 'C';
	
	while(cellIsFilled(workbook, cellOf_StudentID + currentLineNumber)){
		var currentOfTheRest = startOfTheRest;
		var StudentName = worksheet[cellOf_StudentName + currentLineNumber].v;
		var StudentID	  = worksheet[cellOf_StudentID + currentLineNumber].v;
		var attendances 		  = new Object();
		while(cellIsFilled(workbook, currentOfTheRest + currentLineNumber)){
			// console.log(currentOfTheRest);
			// console.log(currentLineNumber);
			// console.log(worksheet[currentOfTheRest + currentLineNumber].v);
			// console.log(currentOfTheRest.charCodeAt(0)-startOfTheRest.charCodeAt(0));
			// console.log(dates[currentOfTheRest.charCodeAt(0)-startOfTheRest.charCodeAt(0)]);
			// console.log(attendances[dates[currentOfTheRest.charCodeAt(0)-startOfTheRest.charCodeAt(0)]]);
			attendances[new Date(dates[currentOfTheRest.charCodeAt(0)-startOfTheRest.charCodeAt(0)])] = worksheet[currentOfTheRest + currentLineNumber].v
			// console.log(attendances);
			// console.log(currentOfTheRest.charCodeAt(0)-startOfTheRest.charCodeAt(0));
			// console.log(dates[currentOfTheRest.charCodeAt(0)-startOfTheRest.charCodeAt(0)]);
			// console.log(attendances[dates[currentOfTheRest.charCodeAt(0)-startOfTheRest.charCodeAt(0)]]);
			// console.log("");
			// console.log("");
			// console.log("");
			currentCharCode = currentOfTheRest.charCodeAt(0);
			currentOfTheRest = String.fromCharCode(currentCharCode+1)
		}
		
		debugObj = new Object();
		debugObj.StudentId		= StudentID	  ;
		debugObj.attendance	  = attendances	;
		debugObj.dates	  		= dates				;
		debugObj.groupId      = GroupID	    ;
		console.log(debugObj);
		
		
		//TODO: validations
		
		//actually update the accounts with the attendances
		Meteor.call("editAttendances", debugObj);
		
		currentLineNumber += 1;
	}
	alert("done");
	var rootUrl = window.location.href.substring(0, window.location.href.indexOf('/', 10));
	// console.log(rootUrl);	
	window.location.href=rootUrl+"/AccountsMgmt/studentList"
}

	function cellIsFilled(workbook, cellAddress){
		// console.log(cellAddress);
		/* Get worksheet name */
		var first_sheet_name = workbook.SheetNames[0];
		//console.log(first_sheet_name);
		
		/* Get worksheet */
		var worksheet = workbook.Sheets[first_sheet_name];
		//console.log(worksheet);
		
		//console.log(cellAddress);
		/* Find desired cell */
		var desired_cell = worksheet[cellAddress];
		if(desired_cell == undefined) return false;
		// console.log(desired_cell);

		/* Get the value */
		var desired_value = desired_cell.v;
		// console.log(desired_value);
		
		if(desired_value.toString().trim().length > 0) return true;
		return false;
	}