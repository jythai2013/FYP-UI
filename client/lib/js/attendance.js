
Template.facility.events({
	"click #updateAttendance":function updateAttendanceHandler(e, template){
		group_id = 
		studentId = 
		dateI = 
		attendanceTrueOrFalse = 
		Meteor.call("editAttendance", group_id, studentId, dateI, attendanceTrueOrFalse)
	}
});