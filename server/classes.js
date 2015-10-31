
	// Meteor.methods({ 
		
	// 	'editClass': function editClass(_id, cName, cCode, cFee, cMin, cMax, cDescription){
	// 		// if(Meteor.user.userType != "admin"){
	// 			// return false; //TODO: output error message in client
	// 		// }
	// 		Groups.update(_id, {
 //        $set: {
	// 				groupNum: gNum,
	// 				courseCode: cCode,
	// 				groupStartDate: gstartDate,
	// 				groupEndDate: gEndDate,
	// 				groupStudentList: gStudentList,
	// 				groupTrainer: gTrainer,
	// 				groupPaymentDeadline: gPaymentDeadline,
	// 				groupMin: gMin,
	// 				groupMax: gMax,
	// 				groupAttendance: gAttendance,
	// 				groupStatus: gStatus,
	// 				groupAnnoucement: gAnnoucement
	// 			}
 //      });
	// 	},
		
	// 	'addAnnouncement': function addAnnouncement(_id, cName, cCode, cFee, cMin, cMax, cDescription){
	// 		// if(Meteor.user.userType != "admin"){
	// 			// return false; //TODO: output error message in client
	// 		// }
	// 		Groups.update(_id, {
 //        $set: {
	// 				groupHeader: gHeader,
	// 				groupContent: gContent,
	// 				groupAuthor: gAuthor,
	// 				groupDateTime: gDateTime
	// 			}
 //      });
	// 	},
		
	// 	'editAttendance': function editAttendence(_id, cName, cCode, cFee, cMin, cMax, cDescription){
	// 		// if(Meteor.user.userType != "admin"){
	// 			// return false; //TODO: output error message in client
	// 		// }
	// 		Groups.update(_id, {
 //        $set: {
	// 				groupHeader: gHeader,
	// 				groupContent: gContent,
	// 				groupAuthor: gAuthor,
	// 				groupDateTime: gDateTime
	// 			}
 //      });
	// 	},
		
	// 	'deleteClass': function deleteClass(_id){
	// 		// if(Meteor.user.userType != "admin"){
	// 			// return false; //TODO: output error message in client
	// 		// }
 //      		Groups.remove(_id);
	// 	},
		
	// 	'createGroup': function createGroup(gNum, cCode, gstartDate, gEndDate, gStudentList, gTrainer, gTrainer, gTrainer, gMin, gMax, gStatus){
	// 		// debugger;
	// 		// if(Meteor.user.userType != "admin"){
	// 			// return false; //TODO: output error message in client
	// 		// }
			
	// 		Groups.insert({
	// 				courseCode: cCode,
	// 				groupNum: gNum,
	// 				groupStartDate: gstartDate,
	// 				groupEndDate: gEndDate,
	// 				groupStudentList: gStudentList,
	// 				groupTrainer: gTrainer,
	// 				groupPaymentDeadline: gPaymentDeadline,
	// 				groupMin: gMin,
	// 				groupMax: gMax,
	// 				groupAttendance: gAttendance,
	// 				groupStatus: gStatus,
	// 				groupAnnoucement: gAnnoucement
	// 		});
	// 	}
	// });