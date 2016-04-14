Meteor.methods({
	"editAttendance":function editAttendance(group_id, studentId, dateI, attendanceTrueOrFalse){
		console.log(group_id)
		console.log(studentId)
		console.log(dateI)
		console.log(attendanceTrueOrFalse)
		var theGroup = Groups.findOne(group_id);
		console.log(theGroup)
		var dateD = new Date(dateI)
		console.log(dateD)
		var attendance = {};
		if(theGroup.attendance == undefined || theGroup.attendance == null){ attendance = {}; } else{ attendance = theGroup.attendance; }
		//if(theGroup.attendance.date == undefined || theGroup.attendance.date == null){ theGroup.attendance.date = {}; }
		//theGroup.attendance.date[dateD].studentId = attendanceTrueOrFalse;
		if(attendance[dateD] == undefined || attendance[dateD] == null) attendance[dateD] = {};
		attendance[dateD][studentId] = attendanceTrueOrFalse;
		console.log(theGroup)
		
		Groups.update({_id:group_id},{$set:{attendance:theGroup.attendance}})
		
		// theGroup.attendance is an object, with each date as attributes
		// each date attribute of the attendance object is another object with studentIds as the attributes
		// each studentId attribute is a boolean of his/her attendance
	},
	
	"editAttendances":function editAttendances(inObj){
		//console.log("");
		//console.log("");
		//console.log("");
		//console.log("");
		//console.log("");
		//console.log("");
		//console.log("");
		//console.log("");
		//console.log("");
		var groupId = inObj.groupId;
		var attendances = inObj.attendance;
		var studentId = inObj.StudentId;
		var dates = inObj.dates;
		var courseCode = inObj.courseCode;
		var grpNum = inObj.grpNum
		var theGroup = Groups.findOne({courseCode:courseCode, grpNum:grpNum});
		//console.log("");
		//console.log("");
		//console.log("");
		//console.log(inObj);
		console.log(groupId);
		//console.log(theGroup);
		//console.log(attendances);
		
		var attendance = {};
		if(theGroup.attendance == undefined || theGroup.attendance == null){ attendance = {}; } else{ attendance = theGroup.attendance; }
		//if(theGroup.attendance.date == undefined || theGroup.attendance.date == null){ theGroup.attendance.date = {}; }
		//theGroup.attendance.date[dateD].studentId = attendanceTrueOrFalse;
		for (var date in attendances) {
			console.log(date);
			//if(attendance[dates[i]] == undefined || attendance[dates[i]] == null) attendance[dates[i]] = {};
			//
			//attendance[dates[i]][studentId] = attendances[dates[i]];
			//console.log(attendance);
			//i++;
			
			if(attendance[date]==undefined) attendance[date]={};
			attendance[date][studentId]=attendances[date];
			console.log(attendance);
		}
		console.log(theGroup);
		
		Groups.update({_id:groupId},{$set:{attendance:attendance}})
		
		// theGroup.attendance is an object, with each date as attributes
		// each date attribute of the attendance object is another object with studentIds as the attributes
		// each studentId attribute is a boolean of his/her attendance
	}
});