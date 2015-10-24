
	Meteor.methods({ 
		
		'editCourse': function editCourse(_id, cName, cCode, cFee, cDescription, cTrainer){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			Courses.update(_id, {
        $set: {
					name: cName,
					code: cCode,
					fee: cFee,
					description: cDescription,
					trainer: cTrainer
				}
      });
		},
		
		'deleteCourse': function deleteCourse(_id){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
      Courses.remove(_id);
		},
		
		'createCourse': function createCourse(cName, cCode, cFee, cDescription, cTrainer){
			// debugger;
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			
			Courses.insert({
				name: cName,
				code: cCode,
				fee: cFee,
				description: cDescription,
				trainer: cTrainer
			});
		}
	});