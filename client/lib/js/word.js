
Template.testyWord.onRendered(function(){
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
	// alert();
});


/* set up drag-and-drop event */
function handleDrop(e) {
  // e.stopPropagation();
  // e.preventDefault();
  // var files = e.dataTransfer.files;
  // var i,f;
  // for (i = 0, f = files[i]; i != files.length; ++i) {
    // var reader = new FileReader();
    // var name = f.name;
    // reader.onload = function(e) {
      // var data = e.target.result;

      // /* if binary string, read with type 'binary' */
      // var workbook = XLSX.read(data, {type: 'binary'});

      // /* DO SOMETHING WITH workbook HERE */
			// processWordFile(workbook);
    // };
    // reader.readAsBinaryString(f);
  // }
			processWordFile(e);
}



function handleFile(e) {
  // var files = e.target.files;
  // var i,f;
  // for (i = 0, f = files[i]; i != files.length; ++i) {
    // var reader = new FileReader();
    // var name = f.name;
    // reader.onload = function(e) {
      // var data = e.target.result;

      // var workbook = XLSX.read(data, {type: 'binary'});

      // /* DO SOMETHING WITH workbook HERE */
			// processWordFile(workbook);
    // };
    // reader.readAsBinaryString(f);
  // }
			processWordFile(e);
}






var loadFile=function(url,callback){
	JSZipUtils.getBinaryContent(url,callback);
}

function processWordFile(e){
	var reader = new FileReader();
	var f = e.target.files[0];
	console.log("processWordFile");
	reader.onload = function(e) {
		var contents = e.target.result;
		// console.log(e);
		// console.log(contents);
		// console.log("name: " + f.name + "\n"
					// +"type: " + f.type + "\n"
					// +"size: " + f.size + " bytes\n"
					// + "starts with: " + contents
		// );
		doc=new Docxgen(contents)
		console.log(doc);
		doc.setData( {"first_name":"Hipp",
				"last_name":"Edgar",
				"phone":"0652455478",
				"description":"New Website"
			}
		) //set the templateVariables
		doc.render() //apply them (replace all occurences of {first_name} by Hipp, ...)
		out=doc.getZip().generate({type:"blob"}) //Output the document using Data-URI
		saveAs(out,"output.docx") 
	}
	reader.readAsArrayBuffer(f);
	
	console.log("processWordFile end")
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