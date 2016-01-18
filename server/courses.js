
	Meteor.methods({ 

		'courseImage': function storeCourseImage(cCode, cHref){
			CoursesImages.insert({
				code: cCode,
				link: cHref
			});
		},
		
		'editCourse': function editCourse(cCode, cName, cDescription, cNoOfSession, cFees, cMin, cMax, cType, cTrainer){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			Courses.update({courseCode: cCode}, {
		        $set: {
					courseCode: cCode,
					courseName: cName,
					courseDescription: cDescription,
					courseNoOfSessions: cNoOfSession,
					courseFees: cFees,
					courseMin: cMin,
					courseMax: cMax,
					courseType: cType,
					courseTrainers: cTrainer
				}
      		});
		},
		
		'deleteCourse': function deleteCourse(_id){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			console.log(_id);
      		Courses.remove(_id);
		},
		
		'createCourse': function createCourse(cName, cCode, cFee, cNoOfSessions, cTrainers, cDescription, cType, cMin, cMax){
			// debugger;
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			console.log("here2");
			Courses.insert({
				courseName: cName,
				courseCode: cCode,
				courseFees: cFee,
				courseNoOfSessions: cNoOfSessions,
				courseDescription: cDescription,
				courseTrainers: cTrainers,
				courseType: cType,
				courseMin: cMin,
				courseMax: cMax
			});
		}
	});