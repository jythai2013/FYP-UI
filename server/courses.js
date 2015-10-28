
	Meteor.methods({ 
		
		'editCourse': function editCourse(_id, cName, cCode, cFee, cDescription, cTrainer,cType,cMin,cMax){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			Courses.update(_id, {
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
      Courses.remove(_id);
		},
		
		'createCourse': function createCourse(cName, cCode, cFee, cDescription, cTrainer, cType){
			// debugger;
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			console.log("here2");
			Courses.insert({
				name: cName,
				code: cCode,
				fee: cFee,
				description: cDescription,
				trainer: cTrainer,
				type: cType
			});
		}
	});