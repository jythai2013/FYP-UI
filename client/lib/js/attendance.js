
Template.testyAttendance.events({
	"click #updateAttendance":function updateAttendanceHandler(e, template){
		group_id = 
		studentId = 
		dateI = 
		attendanceTrueOrFalse = 
		Meteor.call("editAttendance", group_id, studentId, dateI, attendanceTrueOrFalse)
	},
	
	"click #generateExcel":function attendanceExcelGeneration(e, template){
		//console.log("generateExcel");
		//console.log(e);
		//console.log(template);
		var inData = "";
		//var inData = []; //TODO: foreach student in the class list, push [studentId, studentName, true] into the data array
		var inWs_name = "";
		var inExcelName = "";
		Meteor.call("generateExcel", inData, inWs_name, inExcelName);
		//console.log("generateExcel");
	}
	
});

Template.testyAttendance.onRendered(function(){
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
	DOMElement = $('#inputExcelElement')[0];
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
	
	var cellOf_CourseCode 						= 'C6';
	var cellOf_CourseStartDate 			= 'C7';
	var cellOf_ClassNumber 					= 'C8';
	var cellOf_ContactPersonName			= 'C11';
	var cellOf_ContactPersonNo				= 'C12';	
	var cellOf_CompanyAddress				= 'C13';
	var cellOf_CompanyOfficeNo				= 'C14';
	var cellOf_CompanyEmail					= 'C15';
	
	var startingLineNumber	= 19;
	var currentLineNumber		= startingLineNumber;
	
	var cellOf_SN											= 'A';
	var cellOf_FirstName	        	  = 'B';
	var cellOf_LastName	            	= 'C';
	var cellOf_DateOfBirth	      	  = 'D';
	var cellOf_Gender	             		= 'E';
	var cellOf_IDType	             		= 'F';
	var cellOf_IDNumber	           		= 'G';
	var cellOf_Nationality	          = 'H';
	var cellOf_Email	                = 'I';
	var cellOf_ResidentialAddress	 		= 'J';
	var cellOf_PostalCode	         		= 'K';
	var cellOf_MobileNo	           		= 'L';
	var cellOf_ProficiencyIn					= 'M';
	var cellOf_HighestQualification		= 'N';
	var cellOf_NextOfKinName					= 'O';
	var cellOf_Relationship	        	= 'P';
	var cellOf_NOKNo		              = 'Q';
	var cellOf_NOKAddress	          	= 'R';
	var cellOf_NOKPostalCode  	    	= 'S';
	
	while(cellIsFilled(workbook, cellOf_FirstName + currentLineNumber)){
		SN										= worksheet[cellOf_SN + currentLineNumber].v;
		FirstName	        	  = worksheet[cellOf_FirstName + currentLineNumber].v;
		LastName	            = worksheet[cellOf_LastName + currentLineNumber].v;
		DateOfBirth	      	  = worksheet[cellOf_DateOfBirth + currentLineNumber].v;
		Gender	              = worksheet[cellOf_Gender + currentLineNumber].v;
		IDType	              = worksheet[cellOf_IDType + currentLineNumber].v;
		IDNumber	            = worksheet[cellOf_IDNumber + currentLineNumber].v;
		Nationality	          = worksheet[cellOf_Nationality + currentLineNumber].v;
		Email	                = worksheet[cellOf_Email + currentLineNumber].v;
		ResidentialAddress	  = worksheet[cellOf_ResidentialAddress + currentLineNumber].v;
		PostalCode	          = worksheet[cellOf_PostalCode + currentLineNumber].v;
		MobileNo	            = worksheet[cellOf_MobileNo + currentLineNumber].v;
		ProficiencyIn				  = worksheet[cellOf_ProficiencyIn + currentLineNumber].v;
		HighestQualification  = worksheet[cellOf_HighestQualification + currentLineNumber].v;
		NextOfKinName				  = worksheet[cellOf_NextOfKinName + currentLineNumber].v;
		Relationship	        = worksheet[cellOf_Relationship + currentLineNumber].v;
		NOKNo		              = worksheet[cellOf_NOKNo + currentLineNumber].v;
		NOKAddress	          = worksheet[cellOf_NOKAddress + currentLineNumber].v;
		NOKPostalCode  	    	= worksheet[cellOf_NOKPostalCode + currentLineNumber].v;
		
		debugObj = new Object();
		debugObj.SN									 	= SN									;
		debugObj.firstName	        	= FirstName	        	;
		debugObj.lastName	           	= LastName	          ;
		debugObj.dateOfBirth	      	= DateOfBirth	      	;
		debugObj.gender	            	= Gender	            ;
		debugObj.userIDType	          = IDType	            ;
		debugObj.userID	          		= IDNumber	          ;
		debugObj.userType	          	= {learner:true}	    ;
		debugObj.nationality	        = Nationality	        ;
		debugObj.email	              = Email	              ;
		debugObj.resAddr	 						= ResidentialAddress	;
		debugObj.postalCode	         	= PostalCode	        ;
		debugObj.mobileNo	           	= MobileNo	          ;
		debugObj.password	           	= MobileNo	          ;
		debugObj.ProficiencyIn				= ProficiencyIn				;
		debugObj.highestQualification = HighestQualification;
		debugObj.nokName							= NextOfKinName				;
		debugObj.nokReln	       			= Relationship	      ;
		debugObj.nokTel		            = NOKNo		            ;
		debugObj.NOKAddress	        	= NOKAddress	        ;
		debugObj.NOKPostalCode  	  	= NOKPostalCode  	 		;
		console.log(debugObj);
		
		/*
	 	user.accessType = options.accessType;
	 	user.company = options.compnyName;
	 	user.officeNo = options.officeNo;
		user.proficiency = options.proficiency;
	 	user.speciality = options.speciality;		
		user.remarks
		*/
		
		
		//TODO: validations
		
		//TODO: actually create the accounts (test)
		// unused function parameters: password	inCompany	inLang	residenceTel	officeTel	fRemarks
		// unused excel parameters:  SN	ProficiencyIn
		// Meteor.call("createTrainerAccount", Email, password, FirstName, LastName, Gender, IDNumber, IDType, inCompany, ResidentialAddress, PostalCode, DateOfBirth, Nationality, inLang, residenceTel, MobileNo, officeTel, NextOfKinName, NOKNo, NOKAddress, Relationship, fRemarks, HighestQualification);
		Meteor.call("createLearnerAccount2", debugObj);
		
		currentLineNumber += 1;
	}
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
		//console.log(desired_value);
		
		if(desired_value.toString().trim().length > 0) return true;
		return false;
	}