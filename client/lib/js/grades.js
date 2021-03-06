 
Template.trainerUploadGrades.events({
	// "click #updateGrades":function updateGradesHandler(e, template){
		// group_id = 
		// studentId = 
		// dateI = 
		// attendanceTrueOrFalse = 
		// Meteor.call("editGrades", group_id, studentId, dateI, attendanceTrueOrFalse)
	// },
	
	"click #generateExcel":function gradesExcelGeneration(e, template){
		e.preventDefault();
		// console.log("generateExcel");
		// console.log(e);
		// console.log(template);
		// console.log(Template.currentData());
		var groupId = $("#courseCode")[0].value
		// var courseCode = $("#courseCode")[0].value
		// var groupNum = $("#classId")[0].value
		var theGroup = Groups.findOne({_id:groupId});
		console.log(theGroup);
		try{
			var groupNum = theGroup.grpNum;
			var courseCode = theGroup.courseCode;
		}catch(err){
			console.error(err);
			alert(err);
		}
		// var courseCode = $("#courseCode")[0].value
		// var groupNum = $("#classId")[0].value
		if(courseCode == undefined || groupNum == undefined || theGroup == undefined){
			console.log(courseCode);
			console.log(groupNum);
			alert("Invalid course and/or group selected!");
			return false;
		}
		
		var components = [];
		var aStudentId = theGroup.classlist[0];
		var aStudent = Meteor.users.findOne({_id:aStudentId});
		for(var component in aStudent.grades) {
			console.log(component);
			components.push(component);
		}
		console.log(components);
		
		
		// var inData = "";
		//TODO: foreach student in the class list, push [studentId, studentName, true] into the data array
		var inData = []; 
		inData.push([null,"Sterling Training Hub", null, null])
		inData.push([null, null, null, null])
		inData.push([null, null, null, null])
		inData.push([null, "Course Code", courseCode, null])
		inData.push([null, "Group Number", theGroup.grpNum, null])
		inData.push([null, null, null, null])
		inData.push([null, null, null, null])
		var headers = [null, "Student Name", "Student ID"].concat(components);
		inData.push(headers)
		var studentIds = theGroup.classlist
		var students = new Array();
		i=0;
		if(studentIds != undefined){
			studentIds.forEach(function(studentId, index, arr){
				var componentsGrades = [];
				for(var component in components) {
					console.log(component);
					var theStudent = Meteor.users.findOne({_id:studentId});
					console.log(theStudent)
					if(theStudent.grades[theGroup._id] != undefined)
						componentsGrades.push(theStudent.grades[theGroup._id][component])
					else
						componentsGrades.push("")
				}
				var student = Meteor.users.findOne({_id:studentId});
				students.push(student);
				inData.push([++i, student.fullName, student.userID].concat(componentsGrades));
			});
		}
		var inWs_name = "Sheet1";
		var inExcelName = "Grades";
		Meteor.call("generateExcel", inData, inWs_name, inExcelName);
		//console.log("generateExcel");
	}
	
});

Template.trainerUploadGrades.onRendered(function(){
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
	DOMElement = $('#inputExcelElementGrades')[0];
	DOMElement.addEventListener('change', handleFile, false);
	DOMElement.addEventListener('drop', handleDrop, false);
	// alert();
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
	console.log("processExcelFile")
	$('#inputExcelElementGrades')[0].value = "";
	
	/* Get worksheet name */
	var first_sheet_name = workbook.SheetNames[0];
	
	/* Get worksheet */
	var worksheet = workbook.Sheets[first_sheet_name];
	
	// /* Find desired cell */
	// var desired_cell = worksheet[address_of_cell];

	// /* Get the value */
	// var desired_value = desired_cell.v;
	
	var cellOf_CourseID	= 'C4';
	var cellOf_grpNum 	= 'C5';
	var CourseID	= worksheet[cellOf_CourseID].v;
	var grpNum 	= worksheet[cellOf_grpNum].v;
	console.log(grpNum);
	var startingLineNumber	= 9;
	var currentLineNumber		= startingLineNumber;
	
	var categories = new Array();
	var startOfTheRest = "D"
	var currentOfTheRest = startOfTheRest;
	var categoriesNamesLineNumber = startingLineNumber - 1;
	while(cellIsFilled(workbook, currentOfTheRest + categoriesNamesLineNumber)){
		categories.push(worksheet[currentOfTheRest + categoriesNamesLineNumber].v)
		currentCharCode = currentOfTheRest.charCodeAt(0);
		currentOfTheRest = String.fromCharCode(currentCharCode+1)
	}
	// console.log(categories);
	
	var cellOf_StudentName	= 'B';
	var cellOf_StudentID  	= 'C';
	
	while(cellIsFilled(workbook, cellOf_StudentID + currentLineNumber)){
		console.log(cellOf_StudentName + currentLineNumber);
		var currentOfTheRest = startOfTheRest;
		var StudentName = worksheet[cellOf_StudentName + currentLineNumber].v;
		var StudentID	  = worksheet[cellOf_StudentID + currentLineNumber].v;
		var grades 		  = new Object();
		while(cellIsFilled(workbook, currentOfTheRest + currentLineNumber)){
			// console.log(currentOfTheRest);
			// console.log(currentLineNumber);
			// console.log(worksheet[currentOfTheRest + currentLineNumber].v);
			// console.log(currentOfTheRest.charCodeAt(0)-startOfTheRest.charCodeAt(0));
			// console.log(categories[currentOfTheRest.charCodeAt(0)-startOfTheRest.charCodeAt(0)]);
			// console.log(grades[categories[currentOfTheRest.charCodeAt(0)-startOfTheRest.charCodeAt(0)]]);
			grades[categories[currentOfTheRest.charCodeAt(0)-startOfTheRest.charCodeAt(0)]] = worksheet[currentOfTheRest + currentLineNumber].v
			// console.log(grades);
			// console.log(currentOfTheRest.charCodeAt(0)-startOfTheRest.charCodeAt(0));
			// console.log(categories[currentOfTheRest.charCodeAt(0)-startOfTheRest.charCodeAt(0)]);
			// console.log(grades[categories[currentOfTheRest.charCodeAt(0)-startOfTheRest.charCodeAt(0)]]);
			// console.log("");
			// console.log("");
			// console.log("");
			currentCharCode = currentOfTheRest.charCodeAt(0);
			currentOfTheRest = String.fromCharCode(currentCharCode+1)
		}
		
		debugObj = new Object();
		debugObj.StudentName	= StudentName	;
		debugObj.StudentID		= StudentID	  ;
		debugObj.grades	      = grades	    ;
		debugObj.courseID     = CourseID	  ;
		debugObj.grpNum       = grpNum	    ;
		console.log(debugObj);
		
		
		//TODO: validations
		
		//actually update the accounts with the grades
		Meteor.call("updateGrades", debugObj);
		
		currentLineNumber += 1;
	}
	alert("done");
	// console.log("processExcelFile end")
	// var rootUrl = window.location.href.substring(0, window.location.href.indexOf('/', 10));
	// console.log(rootUrl);	
	// window.location.href=rootUrl+"/AccountsMgmt/studentList"
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