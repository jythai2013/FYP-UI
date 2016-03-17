	Accounts.onCreateUser( function onCreateUserEventHandler(options, user) {		
		user.userType = options.userType;
	 	user.email = options.email;
	 	user.password = options.password;

	 	user.userID = options.userId;
	 	user.userIDType = options.userIdType;

	 	user.fullName = options.fullName;
	 	user.gender = options.gender;
	 	user.mobileNo = options.mobileNo;
	 	user.accessType = options.accessType;
	 	user.resAddr = options.resAddr;
	 	user.postalCode = options.postalCode;
	 	user.dateOfBirth = options.dateOfBirth;
	 	user.nationality = options.nationality;
	 	user.remarks = options.remarks;

	 	user.company = options.compnyName;
	 	user.officeNo = options.officeNo;
	 	user.contactPerson = options.contactPerson;

		user.highestQualification = options.highestQualification;
		user.proficiency = options.proficiency;
	 	user.speciality = options.speciality;		

		user.nokName = options.nokName;
		user.nokReln = options.nokReln;
		user.nokTel = options.nokTel;
	// 	}
		return user;
	});


	Meteor.methods({ 

		'deleteUsers2': function deleteUsers(_id){
	        console.log("Method: deleteUsers2 (users.js)");
					var allGroups = Groups.find({}).fetch();
					allGroups.forEach(function(currentValue, index, origArray){
						console.log(currentValue);
						if(currentValue.classlist != null){
							var indexOfId = currentValue.classlist.indexOf(_id);
							if(indexOfId > -1){
								currentValue.classlist.splice(indexOfId, 1);
								Groups.update({_id:currentValue._id},{$set:{classlist:currentValue.classlist}})
							}
						}
					});
	        Meteor.users.remove(_id);
	    },
		
		'createTrainerAccount': function createTrainerAccount(obj){
			console.log(">> Start: CreateTrainerAccount");
			console.log(obj);
			var options = obj;
			Accounts.createUser(options);
			console.log("Sys: Trainer Account Created.");
		},

		'editTrainerAccount': function editTrainerAccount(_id, mobileNo, nationality, proficiency){
			console.log("EditTrainerAccount (createAccounts.js) >>> for "+ _id);
			console.log("EditTrainerAccount (createAccounts.js) >>> for "+ mobileNo);
			console.log("EditTrainerAccount (createAccounts.js) >>> for "+ nationality);
			console.log("EditTrainerAccount (createAccounts.js) >>> for "+ proficiency);
			//		Meteor.call("editTrainerAccount", this._id, mobileNo, nationality, proficiency);
			Meteor.users.update({_id: _id}, {
				$set: {
					mobileNo: mobileNo,
					nationality: nationality, 
					proficiency: proficiency
				}
			});
		},
		
		'createLearnerAccount2': function createLearnerAccountF(obj){
			console.log(">> Start: CreateLearnerAccount");
			console.log(obj);
			var options = obj;
			console.log("Sys: Participant Account Creating.");
			// var userId = Accounts.createUser(options);
			var user_id = Accounts.createUser(options);
			console.log("user._id: " + user_id);
			console.log("Sys: Participant Account Created.");
			return user_id;
		},
		
		'editLearnerAccount': function editLearnerAccount(sid, sRemark, sMobileNo, sProficiency, qualification, snokName, snokTel, snokReln){
			console.log(">>> EditLearnerAccount (server, createAccounts.js)");
			console.log("dataRem-"+ sRemark);
			console.log("dataMoNo-"+ sMobileNo);
			console.log("datasProf-"+ sProficiency);
			console.log("datasQuali-"+ qualification);
			console.log("datasName-"+ snokName);
			console.log("datasTel-"+ snokTel);
			console.log("datasReln-"+ snokReln);
			Meteor.users.update({'_id':sid}, { $set :{
					'remarks': sRemark,
					'mobileNo': sMobileNo,
					'proficiency': sProficiency,
					'highestQualification': qualification,
					'nokName': snokName,
					'nokTel': snokTel,
					'nokReln': snokReln
				}	
			});
			console.log(">>> for " + sid);
		},


		'createAdminAccount': function createAdminAccount(sEmail, sName, sMobileNo, sAccessType, isTrainer){
			console.log(">> Start: CreateAdminAccount")
			console.log(">>" + isTrainer);
			// if isTrainer
			// 	var userTypeObj = {admin: true, trainer: true};
			// else
				var userTypeObj = {admin: true};

			var options = {
				email: sEmail,
				password: sMobileNo,
				fullName: sName,
				mobileNo: sMobileNo,
				accessType: sAccessType,
				userType: userTypeObj
			};
			Accounts.createUser(options);
			console.log(options);
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