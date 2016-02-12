
Template.testyAttendance.events({
	"click #updateAttendance":function updateAttendanceHandler(e, template){
		group_id = 
		studentId = 
		dateI = 
		attendanceTrueOrFalse = 
		Meteor.call("editAttendance", group_id, studentId, dateI, attendanceTrueOrFalse)
	},
	
	"click #attendanceExcelGeneration":function attendanceExcelGeneration(e, template){
		var maybe = Meteor.call("generateExcel", "pop");
		console.log(maybe);
		window.location = "/testy//test.xlsx"
	}
	
});