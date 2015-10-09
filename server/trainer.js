//TODO: RUD timeslots (C is done) (editTimeslot function is there, but it's the copy paste of edit course. )
	Meteor.methods({ 
		
		'editTimeslot': function editTimeslot(_id, cName, cCode, cFee, cMin, cMax, cDescription){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			Timeslots.update(_id, {
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
		
		'deleteTimeslot': function deleteTimeslot(_id){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
      Timeslots.remove(_id);
		},
		
		'createTimeslot': function createTimeslot(datetime1, datetime2){
			// debugger;
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			
			//TODO: Validations
			console.log("Creating timeslot");
			d1 = new Date(datetime1);
			d2 = new Date(datetime2);
			timeslot={
				startTime: d1,
				endTime: d2
			};
			Meteor.users.update({_id: Meteor.user()._id}, {
        $push: {
					timeslots: timeslot
				}
			});
		} 
	});