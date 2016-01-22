
Template.certificateTemplate.onRendered(function(){
	
	console.log("Start");
	Blaze.saveAsPDF(Template.certificateTemplate, {
		filename: "report.pdf", // optional, default is "document.pdf"
		// data: myData, // optional, render the template with this data context
		x: 0, // optional, left starting position on resulting PDF, default is 4 units
		y: 0, // optional, top starting position on resulting PDF, default is 4 units
		orientation: "portrait", // optional, "landscape" or "portrait" (default)
		unit: "mm", // optional, unit for coordinates, one of "pt", "mm" (default), "cm", or "in"
		format: "a4" // optional, see Page Formats, default is "a4"
	});
	// console.log(a);
	console.log("End");
});