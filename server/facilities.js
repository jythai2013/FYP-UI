
Meteor.methods({ 
	
	'editFacility': function editFacility(_id, typeI, nameI, capacityI, descriptionI){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			
			// if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
			Facilities.update(_id, {
				$set: {
					facType: typeI,
					fac: nameI,
					capacity: capacityI,
					description: descriptionI
				}
			});
		},
		
		'deleteFacility': function deleteFacility(_id){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			Facilities.remove(_id);
		},
		
		'createFacility': function createFacility(typeI, nameI, capacityI, descriptionI){
			// debugger;
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			console.log("stuff");
			if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
			Facilities.insert({
					facType: typeI,
					fac: nameI,
					capacity: capacityI,
					description: descriptionI
			});
		}
	});