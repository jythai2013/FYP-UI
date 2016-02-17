
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
		console.log(doc);
		out=doc.getZip().generate({type:"blob"}) //Output the document using Data-URI
		console.log(out);
		saveAs(out,"output.docx") 
	}
	reader.readAsArrayBuffer(f);
	
	console.log("processWordFile end")
}










