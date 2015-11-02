
	Meteor.methods({ 

		'courseImage': function storeCourseImage(cCode, cHref){
			CoursesImages.insert({
				code: cCode,
				link: cHref
			});
		},
		
		'editCourse': function editCourse(_id, cName, cCode, cFee, cNoOfSession, cDescription, cTrainer,cType,cMin,cMax){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			Courses.update(_id, {
		        $set: {
					courseName: cName,
					courseCode: cCode,
					courseFees: cFee,
					courseNoOfSessionss: cNoOfSession,
					description: cDescription,
					trainers: cTrainer,
					courseType: cType,
					courseMin: cMin,
					courseMax: cMax
				}
      		});
		},
		
		'deleteCourse': function deleteCourse(_id){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
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
				description: cDescription,
				trainers: cTrainers,
				courseType: cType,
				courseMin: cMin,
				courseMax: cMax
			});
		}
	});