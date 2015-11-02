	Accounts.onCreateUser( function onCreateUserEventHandler(options, user) {
		
		// We still want the default hook's 'profile' behavior. //not really
		// user.profile = options.profile;
		
		user.userType = options.userType;
		console.log(user);
		return user;
	});


	Meteor.methods({ 
		
		'createTrainerAccount': function createTrainerAccount(email, password, fFirstName, fLastName, fremarks){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			var userTypeObj = {trainer: true};
			var options = {
				email: email,
				password: password,
				firstName: fFirstName,
				lastName: fLastName,
				remarks: fremarks,
				userType: userTypeObj
			};
			Accounts.createUser(options);
		},
		
		'createLearnerAccount': function createLearnerAccount(email, password, sFirstName, sLastName, sRemarks){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			var userTypeObj = {learner: true};
			var options = {
				email: email,
				password: password,
				firstName: sFirstName,
				lastName: sLastName,
				fees: sFees,
				paidStatus: spaidStatus,
				remarks: sRemarks,
				userType: userTypeObj
			};
			Accounts.createUser(options);
		},
		
		'editLearnerAccount': function editLearnerAccount(_id, sEmail, sPassword, sFees, sPaidStatus, sRemarks){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			var userTypeObj = {learner: true};
			Accounts.update(_id, {
        	$set: {
				email: email,
				password: password,
				firstName: sFirstName,
				lastName: sLastName,
				fees: sFees,
				paidStatus: spaidStatus,
				remarks: sRemarks,
				userType: userTypeObj
				}
      		});
		},

		'deleteLearnerAccount': function deleteLearnerAccount(_id){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
      		Accounts.remove(_id);
		},


		
		'createAdminAccount': function createAdminAccount(email, password, sFirstName, sLastName){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			var userTypeObj = {admin: true};
			var options = {
				email: email,
				password: password,
				aFirstName: sFirstName,
				aLastName: sLastName,
				userType: userTypeObj
			};
			Accounts.createUser(options);
		}
	}); //