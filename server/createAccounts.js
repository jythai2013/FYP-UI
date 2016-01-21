	 Accounts.onCreateUser( function onCreateUserEventHandler(options, user) {
		
	// 	// We still want the default hook's 'profile' behavior. //not really
	// 	// user.profile = options.profile;
		
	// 	var telephoneObj = {
	// 		residence: residenceTel,
	// 		mobile: mobileTel,
	// 		office: officeTel
	// 	};
		
	// 	var emerContObj = {
	// 		name: emerContName,
	// 		contact: emerContContact,
	// 		address: emerContAddress,
	// 		relationship: emerContRel
	// 	};
		
	 	user.userType = options.userType;
	// 	user.firstName = options.firstName;
	// 	user.lastName = options.lastName;
	// 	user.email = email;
	// 	user.password = password;
	// 	user.gender = abcde;
	// 	user.userID = abcde;
	// 	user.userIDType = abcde;
	// 	user.company = abcde;
	// 	user.address = abcde;
	// 	user.postalCode = abcde;
	// 	user.dateOfBirth = abcde;
	// 	user.nationality = abcde;
	// 	user.preferredLanguage = abcde;
	// 	user.emergencyContact = emerContObj;
	// 	user.telephone = telephoneObj;
	// 	user.remarks = options.remarks;
		
	// 	if(options.userType.learner == true){
	// 		console.log("createAccounts onCreateUser learner");
	// 		user.fees = options.fees;
	// 		user.paidStatus = options.paidStatus;
	// 	} else if(options.userType.admin == true){
	// 		console.log("createAccounts onCreateUser admin");
			
	// 	}else if(options.userType.trainer == true){
	// 		console.log("createAccounts onCreateUser trainer");
	// 			highestQualification: tHighestQualification
			
	// 	}
	// 	console.log(user);
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
		
		'createLearnerAccount': function createLearnerAccountF(semail, spassword, sFirstName, sLastName, sDOB, sGender, sMobileNo, sIDType, sIdNo, sNationality, sPostalCode, sResAddr, sQuali, sProf, sRemarks){
			console.log(">> Start: CreateLearnerAccount");
			var options = {
				email: semail,
				password: spassword,
				firstName: sFirstName,
				lastName: sLastName,
				dob: sDOB,
				gender: sGender,
				mobileNo: sMobileNo,
				id_type: sIDType,
				id_No: sIDNo,
				nationality: sNationality,
				postalCode: sPostalCode,
				resAddr: sResAddr,
				qualification: sQuali,
				proficiency: sProf,
				remarks: sRemarks,
				userType: {learner: true}
			};
			console.log("Sys: Participant Account Created.");
			Accounts.createUser(options);
		},
		
		'editLearnerAccount': function editLearnerAccount(_id, sEmail, sPassword, sFees, sPaidStatus, sRemarks){
			var userTypeObj = {learner: true};
			Accounts.update(_id, {
				$set: {
					email: email,
					password: password,
					firstName: sFirstName,
					lastName: sLastName,
					fees: sFees,
					paidStatus: spaidStatus,
					remarks: sRemarks
				}
			});
		},


		'createAdminAccount': function createAdminAccount(sEmail, sPassword, sFirstName, sLastName, sMobileNo, sAccessType){
			console.log(Meteor.users.find({userType:{"admin":true}}).count());
			var userTypeObj = {admin: true};

			var options = {
				email: sEmail,
				password: sPassword,
				firstName: sFirstName,
				lastName: sLastName,
				mobileNo: sMobileNo,
				accessType: sAccessType,
				userType: userTypeObj
			};
			Accounts.createUser(options);
			console.log(options);
			console.log(Meteor.users.find({userType:{"admin":true}}).count());
		},

		'editAdminAccount': function editAdminAccount(_id, sMobileNo, sAccessType){
			Accounts.update(_id, {
				$set: {
					mobileNo: sMobileNo,
					accessType: sAccessType
				}
			});
		}


	}); //