
	Meteor.methods({ 
		
		'editCourse': function editCourse(_id, cName, cCode, cFee, cDescription, cTrainer,cType){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			courses.update(_id, {
        $set: {
					name: cName,
					code: cCode,
					fee: cFee,
					description: cDescription,
					trainer: cTrainer,
					type: cType
				}
      });
		},
		
		'deleteCourse': function deleteCourse(_id){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
      courses.remove(_id);
		},
		
		'createCourse': function createCourse(cName, cCode, cFee, cDescription, cTrainer, cType){
			// debugger;
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			
			courses.insert({
				name: cName,
				code: cCode,
				fee: cFee,
				description: cDescription,
				trainer: cTrainer,
				type: cType
			});
		}
	});