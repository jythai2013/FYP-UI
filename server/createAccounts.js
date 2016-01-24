	Accounts.onCreateUser( function onCreateUserEventHandler(options, user) {		
		user.userType = options.userType;
	 	user.firstName = options.firstName;
	 	user.lastName = options.lastName;
	 	user.fullname = options.fullname;
	 	user.gender = options.gender;
	 	user.userID = options.userId;
	 	user.mobileNo = options.mobileNo;
	 	user.userIDType = options.userIdType;
	 	user.accessType = options.accessType;
	 	user.speciality = options.speciality;		
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
	// 	user.telephone = telephoneObj;
	// 	user.remarks = options.remarks;
		
	// 	}else if(options.userType.trainer == true){
	// 		console.log("createAccounts onCreateUser trainer");
	// 			highestQualification: tHighestQualification
	// 	}
		return user;
	});
	// 	console.log(user);
	 	// return user;
	 // });


	Meteor.methods({ 
		
		'createTrainerAccount': function createTrainerAccount(semail, sname, sMobileNo, sIdNo, sNationality, sSpec){
			console.log(Meteor.users.find({userType:{"trainer":true}}).count());
			var userTypeObj = {trainer: true};
			var options = {
				email: semail,
				password: sMobileNo,
				fullname: sname,
				mobileNo: sMobileNo,
				id_No: sIdNo,
				nationality: sNationality,
				speciality: sSpec,
				userType: userTypeObj
			};

			Accounts.createUser(options);
			console.log(options);
			console.log(Meteor.users.find({userType:{"trainer":true}}).count());
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
			console.log("Sys: Participant Account Creating.");
			Accounts.createUser(options);
			console.log("Sys: Participant Account Created.");
		},
		
		'createLearnerAccount2': function createLearnerAccountF(obj){
			console.log(">> Start: CreateLearnerAccount");
			var options = obj;
			console.log("Sys: Participant Account Creating.");
			Accounts.createUser(options);
			console.log("Sys: Participant Account Created.");
		},
		
		'editLearnerAccount': function editLearnerAccount(_id, sEmail, sPassword){
			var userTypeObj = {learner: true};
			Accounts.update(_id, {
				$set: {
					email: email,
					password: password,
					name: sFirstName				}
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

		'editAdminAccount': function editAdminAccount(_id, sMobileNo){
			Accounts.update(_id, {
				$set: {
					mobileNo: sMobileNo,
					accessType: sAccessType
				}
			});
		}


	}); //