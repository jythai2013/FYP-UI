Template.groupRegistration.onRendered(function(){
	//var XLSX;
	if(typeof require !== 'undefined') XLSX = require('xlsx');
	//XLSX = require('xlsx');
	console.log(window.XLSX);
	
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
});;

Template.groupExcelUpload.onRendered(function(){
	//var XLSX;
	if(typeof require !== 'undefined') XLSX = require('xlsx');
	//XLSX = require('xlsx');
	console.log(window.XLSX);
	
	//var fs = Npm.require('fs');
	//console.log(fs);
	//var path = Npm.require('path');
	//console.log(path);
	//var basepath = path.resolve('.').split('.meteor')[0];
	//console.log(basepath);
	
	//register event listerners for file drop or add
	DOMElement = $('#fileName')[0];
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
			DOMElement = $('#fileName')[0].value = "";
			// console.log(e.target.value);
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
			DOMElement = $('#fileName')[0].value = "";
			// console.log(e.target);
    };
    reader.readAsBinaryString(f);
  }
}







function processExcelFile(workbook){
	// console.log("Processing file");
	/* Get worksheet name */
	var first_sheet_name = workbook.SheetNames[0];
	
	/* Get worksheet */
	var worksheet = workbook.Sheets[first_sheet_name];
	
	// /* Find desired cell */
	// var desired_cell = worksheet[address_of_cell];

	// /* Get the value */
	// var desired_value = desired_cell.v;
	
	var cellOf_CourseCode 					= 'C6';
	var cellOf_CourseStartDate 			= 'C7';
	var cellOf_ClassNumber 					= 'C8';
	
	courseCode							= worksheet[cellOf_CourseCode].v;
	grpNum									= worksheet[cellOf_ClassNumber].v;
	
	var theGroup = Groups.findOne({courseCode:courseCode, grpNum:grpNum});
	if(theGroup == null){
		alert("The course or group does not exist, not doing anything");
		return false;
	}
	
	var startingLineNumber	= 12;
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
	
	while(cellIsFilled(workbook, cellOf_FirstName + currentLineNumber)){
		SN										= worksheet[cellOf_SN + currentLineNumber].v;
		FirstName	        	  = worksheet[cellOf_FirstName + currentLineNumber].v;
		LastName	            = worksheet[cellOf_LastName + currentLineNumber].v;
		DateOfBirth	      	  = worksheet[cellOf_DateOfBirth + currentLineNumber].v;
		Gender	              = worksheet[cellOf_Gender + currentLineNumber].v;
		IDType	              = worksheet[cellOf_IDType + currentLineNumber].v;
		IDNumber	            = worksheet[cellOf_IDNumber + currentLineNumber].v;
		console.log(worksheet[cellOf_IDNumber + currentLineNumber]);
		console.log(IDNumber);
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
		
		userType = new Object();
		userType.learner = true;
		debugObj = new Object();
		debugObj.SN									 	= SN									;
		debugObj.firstName	        	= FirstName	        	;
		debugObj.lastName	           	= LastName	          ;
		debugObj.dateOfBirth	      	= DateOfBirth	      	;
		debugObj.gender	            	= Gender	            ;
		debugObj.userIdType	          = IDType	            ;
		debugObj.userId	          		= IDNumber	          ;
		debugObj.userType	          	= userType	    ;
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
		
		// var theGroup = Groups.findOne({courseCode:courseCode, grpNum:grpNum});
		// console.log(courseCode)
		// console.log(grpNum)
		// console.log(theGroup)
		// console.log(debugObj);
		debugObj.enrollments					= new Array()		        ;
		debugObj.enrollments.push(theGroup._id);
		// debugObj.courseCode						= courseCode		        ;
		// debugObj.grpNum								= grpNum		          ;
		
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
		console.log("creating an account");
		Meteor.call("createLearnerAccount2", debugObj, function(error, result){
			if(error){
				alert(error);
				console.error(error);
			}
			else{
				console.log(theGroup._id);
				console.log(result);
				Meteor.call("pushStudentIdToGroupClasslist", theGroup._id, result);
			}
		});
		
		currentLineNumber += 1;
		console.log(currentLineNumber);
	}
	alert("done");
	var rootUrl = window.location.href.substring(0, window.location.href.indexOf('/', 10));
	console.log(rootUrl);
	// window.location.href=rootUrl+"/AccountsMgmt/studentList"
}

	function cellIsFilled(workbook, cellAddress){
		/* Get worksheet name */
		var first_sheet_name = workbook.SheetNames[0];
		//console.log(first_sheet_name);
		
		/* Get worksheet */
		var worksheet = workbook.Sheets[first_sheet_name];
		//console.log(worksheet);
		
		//console.log(cellAddress);
		/* Find desired cell */
		var desired_cell = worksheet[cellAddress];
		//console.log(desired_cell);

		/* Get the value */
		if(desired_cell==undefined) return false;
		var desired_value = desired_cell.v;
		//console.log(desired_value);
		
		if(desired_value.trim().length > 0) return true;
		return false;
	}