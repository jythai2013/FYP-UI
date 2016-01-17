
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
drop_dom_element.addEventListener('drop', handleDrop, false);









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
input_dom_element.addEventListener('change', handleFile, false);







processExcelFile(workbook){
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
	
	var startingLineNumber 	= 19;
	var currentLineNumber		= 0;
	
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
	var cellOf_NOKPostal Code  	    	= 'S';
	
	while(cellIsFilled(workbook, cellOf_FirstName + startingLineNumber)){
		SN										= worksheet[cellOf_SN + startingLineNumber].v;
		FirstName	        	  = worksheet[cellOf_FirstName + startingLineNumber].v;
		LastName	            = worksheet[cellOf_LastName + startingLineNumber].v;
		DateOfBirth	      	  = worksheet[cellOf_DateOfBirth + startingLineNumber].v;
		Gender	              = worksheet[cellOf_Gender + startingLineNumber].v;
		IDType	              = worksheet[cellOf_IDType + startingLineNumber].v;
		IDNumber	            = worksheet[cellOf_IDNumber + startingLineNumber].v;
		Nationality	          = worksheet[cellOf_Nationality + startingLineNumber].v;
		Email	                = worksheet[cellOf_Email + startingLineNumber].v;
		ResidentialAddress	  = worksheet[cellOf_ResidentialAddress + startingLineNumber].v;
		PostalCode	          = worksheet[cellOf_PostalCode + startingLineNumber].v;
		MobileNo	            = worksheet[cellOf_MobileNo + startingLineNumber].v;
		ProficiencyIn				  = worksheet[cellOf_ProficiencyIn + startingLineNumber].v;
		HighestQualification  = worksheet[cellOf_HighestQualification + startingLineNumber].v;
		NextOfKinName				  = worksheet[cellOf_NextOfKinName + startingLineNumber].v;
		Relationship	        = worksheet[cellOf_Relationship + startingLineNumber].v;
		NOKNo		              = worksheet[cellOf_NOKNo + startingLineNumber].v;
		NOKAddress	          = worksheet[cellOf_NOKAddress + startingLineNumber].v;
		NOKPostal Code  	    = worksheet[cellOf_NOKPostal Code + startingLineNumber].v;
		
		
	}
}

	function cellIsFilled(workbook, cellAddress){
		/* Get worksheet name */
		var first_sheet_name = workbook.SheetNames[0];
		
		/* Get worksheet */
		var worksheet = workbook.Sheets[first_sheet_name];
		
		/* Find desired cell */
		var desired_cell = worksheet[cellAddress];

		/* Get the value */
		var desired_value = desired_cell.v;
		
		if(desired_value.trim().length > 0) return true;
		return false;
	}