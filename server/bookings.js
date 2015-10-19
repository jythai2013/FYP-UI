
	// Meteor.methods({ 
		
		// 'editBooking': function editCourse(_id, noSession, repeatOption, input_time_beginning, input_time_end, input_capacity_min, facType){
			// // if(Meteor.user.userType != "admin"){
				// // return false; //TODO: output error message in client
			// // }
			// Bookings.update(_id, {
        // $set: {
					// name: cName,
					// code: cCode,
					// fee: cFee,
					// min: cMin,
					// max: cMax,
					// description: cDescription
				// }
      // });
		// },
		
		// 'deleteBooking': function deleteCourse(_id){
			// // if(Meteor.user.userType != "admin"){
				// // return false; //TODO: output error message in client
			// // }
      // Bookings.remove(_id);
		// },
		
		// 'createBooking': function createCourse(noSession, repeatOption, input_time_beginning, input_time_end, input_capacity_min, facType){
			// // debugger;
			// // if(Meteor.user.userType != "admin"){
				// // return false; //TODO: output error message in client
			// // }
			
			// Bookings.insert({
				// noSession: noSession,
				// repeatOption: repeatOption,
				// input_time_beginning: input_time_beginning,
				// input_time_end: input_time_end,
				// max: cMax,
				// description: cDescription
			// });
		// }
	// });


Meteor.methods({ 
	
	'editBooking': function editBOoking(_id, dateI, startTimeI, endTimeI, facTypeI, facI, courseI, sessionI){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			Bookings.update(_id, {
				$set: {
					date: dateI,
					startTime: startTimeI,
					endTime: endTimeI,
					facType: facTypeI,
					facility: facI,
					course: courseI,
					session: sessionI
				}
			});
		},
		
		'deleteBooking': function deleteBooking(_id){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			Bookings.remove(_id);
		},
		
		'createBooking': function createBooking(dateI, startTimeI, endTimeI, facTypeI, facI, courseI, sessionI){
			// debugger;
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			
			Bookings.insert({
				date: dateI,
				startTime: startTimeI,
				endTime: endTimeI,
				facType: facTypeI,
				fac: facI,
				course: courseI,
				session: sessionI
			});
		}
	});