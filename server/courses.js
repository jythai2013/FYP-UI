
	Meteor.methods({ 
		
		'editCourse': function editCourse(_id, cName, cCode, cFee, cDescription, cTrainer,cType,cMin,cMax){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			Courses.update(_id, {
        $set: {
				courseName: cName,
				courseCode: cCode,
				courseFees: cFee,
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
		
		'createCourse': function createCourse(cName, cCode, cFee, cDescription, cTrainer, cType, cMin, cMax){
			// debugger;
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			console.log("here2");
			Courses.insert({
				courseName: cName,
				courseCode: cCode,
				courseFees: cFee,
				description: cDescription,
				trainers: cTrainer,
				courseType: cType,
				courseMin: cMin,
				courseMax: cMax
			});
		}
	});