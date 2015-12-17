	Accounts.onCreateUser( function onCreateUserEventHandler(options, user) {
		
		// We still want the default hook's 'profile' behavior. //not really
		// user.profile = options.profile;
		
		user.userType = options.userType;
		console.log(user);
		return user;
	});


	Meteor.methods({ 
		
		'createTrainerAccount': function createTrainerAccount(email, password, fFirstName, fLastName, fRemarks){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			var userTypeObj = {trainer: true};
			var options = {
				email: email,
				password: password,
				firstName: fFirstName,
				lastName: fLastName,
				remarks: fRemarks,
				userType: userTypeObj
			};
			Accounts.createUser(options);
		},
		
		'createLearnerAccount': function createLearnerAccountF
		(email, password, sFirstName, sLastName, sRemarks){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			console.log("CreateLearnerAccount");
			var userTypeObj = {learner: true};
			var oFirstName = sFirstName;
			var oLastName = sLastName;
			console.log(userTypeObj);
			var sFees = "?";
			var spaidStatus = false;
			var options = {
				email: email,
				password: password,
				firstName: oFirstName,
				lastName: oLastName,
				fees: sFees,
				paidStatus: spaidStatus,
				remarks: sRemarks,
				userType: userTypeObj
			};
			console.log(options);
			Accounts.createUser(options);
			
			tDate = new Date();
			subject = "aSubject";
			text = "aText";
			toEmail = "asdf154@gmail.com";
			details = {to:toEmail, from:"asdf154+from@gmail.com", subject:subject, text:text, date:tDate}
			sendMail(details);
			// Meteor.call("scheduleMail", details)
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