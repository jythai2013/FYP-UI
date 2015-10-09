	Meteor.methods({ 
		
		'createTrainerAccount': function createTrainerAccount(email, password){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			var userTypeObj = {trainer: true};
			var options = {
				email: email,
				password: password,
				userType: userTypeObj
			};
			Accounts.createUser(options);
		},
		
		'createLearnerAccount': function createLearnerAccount(email, password){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			var userTypeObj = {learner: true};
			var options = {
				email: email,
				password: password,
				userType: userTypeObj
			};
			Accounts.createUser(options);
		},
		
		'createAdminAccount': function createAdminAccount(email, password){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			var userTypeObj = {admin: true};
			var options = {
				email: email,
				password: password,
				userType: userTypeObj
			};
			Accounts.createUser(options);
		}
	});