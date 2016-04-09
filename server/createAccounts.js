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

		user.creationDate = options.createdDate;
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

			Meteor.users.update(_id, { $set:{
					'mobileNo': mobileNo,
					'nationality': nationality, 
					'proficiency': proficiency
				}
			}, function(error, numAffected){
				console.log(error);
				console.log(numAffected);
			});
		},
		
		'createLearnerAccount2': function createLearnerAccountF(obj){
			console.log(">> Start: CreateLearnerAccount");
			console.log(obj);
			var options = obj;
			console.log("Sys: Participant Account Creating.");
			var user_id = Accounts.createUser(options);
			console.log("user._id: " + user_id);
			console.log("Sys: Participant Account Created.");
			return user_id;
		},
		
		'editLearnerAccount': function editLearnerAccount(sid, sRemark, sMobileNo, qualification, snokName, snokTel, snokReln, userIdName){
			console.log(">>> EditLearnerAccount (server, createAccounts.js)");
			console.log("dataRem-"+ sRemark);
			console.log("dataMoNo-"+ sMobileNo);
			console.log("datasProf-"+ sProficiency);
			console.log("datasQuali-"+ qualification);
			console.log("datasName-"+ snokName);
			console.log("datasTel-"+ snokTel);
			console.log("datasReln-"+ snokReln);
			Meteor.users.update(sid, { $set :{
					'remarks': sRemark,
					'mobileNo': sMobileNo,
					'highestQualification': qualification,
					'nokName': snokName,
					'nokTel': snokTel,
					'nokReln': snokReln,
					'userIDType': userIdName
				}	
			});
			console.log(">>> for " + sid);
		},


		'createAdminAccount': function createAdminAccount(obj){
			console.log(">> Start: CreateLearnerAccount");
			console.log("Fetch: " + obj);
			var user_id = Accounts.createUser(obj);
			console.log(">> ID Created: " + user_id);
		},

		'editAdminAccount': function editAdminAccount(_id, sMobileNo, isTrainer){
			console.log("Update: editAdminAccount >> " + _id);
			console.log(sMobileNo + " " + isTrainer);
			if (isTrainer === "true"){
				Meteor.users.update(_id, {
					$set:{
						"mobileNo": sMobileNo,
						"userType": {admin: true, trainer: true}
					}
				});
				console.log("here trainer is true >>> END");
			} else {
				Meteor.users.update(_id, {
					$set:{
						"mobileNo": sMobileNo,
						"userType": {admin: true}
					}
				});
				console.log("here trainer is false >>> END");
			}
			
		}


	}); //