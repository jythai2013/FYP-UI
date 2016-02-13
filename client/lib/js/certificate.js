
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

Template.certificateManagement.helpers({
	"finishedGroup":function finishedGroups(){
		console.log(Groups.find({endDate:{$lte:new Date()}}).fetch()); //TODO: ensure the correct groups are returned
		return Groups.find({endDate:{$gte:new Date()}});
	}
	
});

// Template.generateCert.events({
// 	"#generateCerts click":function(event, templateT){
// 		console.log(this);
// 		console.log(event);
// 		console.log(templateT);
// 		var groupCode = templateT.groupCode;
// 		var students = Groups.find({groupCode}).fetch(); //TODO: get students
// 		students.forEach(function(myData){
// 			Blaze.saveAsPDF(Template.certificateTemplate, {
// 				filename: "report.pdf", // optional, default is "document.pdf"
// 				// data: myData,  optional, render the template with this data context
// 				x: 0, // optional, left starting position on resulting PDF, default is 4 units
// 				y: 0, // optional, top starting position on resulting PDF, default is 4 units
// 				orientation: "portrait", // optional, "landscape" or "portrait" (default)
// 				unit: "mm", // optional, unit for coordinates, one of "pt", "mm" (default), "cm", or "in"
// 				format: "a4" // optional, see Page Formats, default is "a4"
// 			});
// 		});
// 		console.log("End");
// 	}
// });