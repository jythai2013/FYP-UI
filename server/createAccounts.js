	Accounts.onCreateUser( function onCreateUserEventHandler(options, user) {
		
		// We still want the default hook's 'profile' behavior. //not really
		// user.profile = options.profile;
		
		var telephoneObj = {
			residence: residenceTel,
			mobile: mobileTel,
			office: officeTel
		};
		
		var emerContObj = {
			name: emerContName,
			contact: emerContContact,
			address: emerContAddress,
			relationship: emerContRel
		};
		
		user.userType = options.userType;
		user.firstName = options.firstName;
		user.lastName = options.lastName;
		user.email = email;
		user.password = password;
		user.gender = abcde;
		user.userID = abcde;
		user.userIDType = abcde;
		user.company = abcde;
		user.address = abcde;
		user.postalCode = abcde;
		user.dateOfBirth = abcde;
		user.nationality = abcde;
		user.preferredLanguage = abcde;
		user.emergencyContact = emerContObj;
		user.telephone = telephoneObj;
		user.remarks = options.remarks;
		
		if(options.userType.learner == true){
			console.log("createAccounts onCreateUser learner");
			user.fees = options.fees;
			user.paidStatus = options.paidStatus;
		} else if(options.userType.admin == true){
			console.log("createAccounts onCreateUser admin");
			
		}else if(options.userType.trainer == true){
			console.log("createAccounts onCreateUser trainer");
				highestQualification: tHighestQualification
			
		}
		console.log(user);
		return user;
	});


	Meteor.methods({ 
		
		'createTrainerAccount': function createTrainerAccount(email, password, fFirstName, fLastName, ingender, inuserID, inuserIDType, inCompany, inAddress, inPostalCode, inDOB, inNationality, inLang, residenceTel, mobileTel, officeTel, emerContName, emerContContact, emerContAddress, emerContRel, fRemarks, tHighestQualification){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			var userTypeObj = {trainer: true};
			var telephoneObj = {
				residence: residenceTel,
				mobile: mobileTel,
				office: officeTel
			};
			var emerContObj = {
				name: emerContName,
				contact: emerContContact,
				address: emerContAddress,
				relationship: emerContRel
			};
			var options = {
				email: email,
				password: password,
				firstName: fFirstName,
				lastName: fLastName,
				gender: ingender,
				userID: inuserID,
				userIDType: inuserIDType,
				company: inCompany,
				address: inAddress,
				postalCode: inPostalCode,
				dateOfBirth: inDOB,
				nationality: inNationality,
				preferredLanguage: inLang,
				emergencyContact: emerContObj,
				telephone: telephoneObj,
				userType: userTypeObj,
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
			console.log("");
			console.log("");
			Accounts.createUser(options);
			
			tDate = new Date();
			subject = "aSubject";
			text = "aText";
			toEmail = "asdf154@gmail.com";
			details = {to:toEmail, from:"asdf154+from@gmail.com", subject:subject, text:text, date:tDate}
			// sendMail(details);
			Meteor.call("scheduleMail", details)
			console.log("end CreateLearnerAccount");
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


		
		'createAdminAccount': function createAdminAccount(email, password, sFirstName, sLastName){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			var userTypeObj = {admin: true};
			var options = {
				email: email,
				password: password,
				firstName: sFirstName,
				lastName: sLastName,
				userType: userTypeObj
			};
			Accounts.createUser(options);
		}
	}); //