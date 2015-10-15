
	Meteor.methods({ 
		
		'editCourse': function editCourse(_id, noSession, repeatOption, input_time_beginning, input_time_end, input_capacity_min, facType){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			Bookings.update(_id, {
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
      Bookings.remove(_id);
		},
		
		'createCourse': function createCourse(noSession, repeatOption, input_time_beginning, input_time_end, input_capacity_min, facType){
			// debugger;
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			
			Bookings.insert({
				noSession: noSession,
				repeatOption: repeatOption,
				input_time_beginning: input_time_beginning,
				input_time_end: input_time_end,
				max: cMax,
				description: cDescription
			});
		}
	});