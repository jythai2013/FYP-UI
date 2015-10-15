
	Meteor.methods({ 
		
		'editFacilities': function editCourse(_id, capacityI, facTypeI, facI, cDescriptionI){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			
			// if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
			Facilities.update(_id, {
        $set: {
					capacity: capacityI,
					facType: facTypeI,
					fac: facI,
					description: cDescriptionI
				}
      });
		},
		
		'deleteFacility': function deleteCourse(_id){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
      Facilities.remove(_id);
		},
		
		'createFacility': function createCourse(input_capacity_maxI, facTypeI, facI, cDescriptionI){
			// debugger;
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			
			if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
			Facilities.insert({
					capacity: capacityI,
					facType: facTypeI,
					fac: facI,
					description: cDescriptionI
			});
		}
	});