Meteor.methods({
	"editAttendance":function editAttendance(group_id, studentId, dateI, attendanceTrueOrFalse){
		console.log(group_id)
		console.log(studentId)
		console.log(dateI)
		console.log(attendanceTrueOrFalse)
		var theGroup = Groups.findOne(group_id);
		console.log(theGroup)
		var dateD = new Date(dateI)
		console.log(date)
		if(theGroup.attendance == undefined || theGroup.attendance == null){ theGroup.attendance = {}; }
		//if(theGroup.attendance.date == undefined || theGroup.attendance.date == null){ theGroup.attendance.date = {}; }
		//theGroup.attendance.date[dateD].studentId = attendanceTrueOrFalse;
		theGroup.attendance[dateD].studentId = attendanceTrueOrFalse;
		console.log(theGroup)
		console.log(theGroup.attendance)
		//console.log(theGroup.attendance.date)
		console.log(theGroup.attendance[dateD].studentId)
		// Attendance.
		
		// theGroup.attendance is an object, with each date as attributes
		// each date attribute of the attendance object is another object with studentIds as the attributes
		// each studentId attribute is a boolean of his/her attendance
	},
	
	
	
	"generateExcel":function generateExcel(data){
	}
});