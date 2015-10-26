
	Meteor.methods({ 
		
		'editCourse': function editCourse(_id, cName, cCode, cFee, cMin, cMax, cDescription){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			Classes.update(_id, {
        $set: {
					name: cName,
					code: cCode,
					fee: cFee,
					min: cMin,
					max: cMax,
					description: cDescription
				}
      });
		},
		
		'deleteCourse': function deleteCourse(_id){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
      Classes.remove(_id);
		},
		
		'createCourse': function createCourse(cName, cCode, cFee, cMin, cMax, cDescription){
			// debugger;
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			
			Classes.insert({
				name: cName,
				code: cCode,
				fee: cFee,
				min: cMin,
				max: cMax,
				description: cDescription
			});
		}
	});