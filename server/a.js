
	
	Accounts.onCreateUser( function onCreateUserEventHandler(options, user) {
		
		// We still want the default hook's 'profile' behavior. //not really
		// user.profile = options.profile;
		
		user.userType = options.userType;
		console.log(user);
		return user;
	});
	
	Meteor.methods({ 
		'createSession': function createSession(courseCode, istartDate, classNo, timeslots, trainers, icourseMaterials ){ //trainers and courseMaterials are optional. most likely not going to have right at session creation. included just in case. 
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			
			var startDate = new Date(istartDate);
			var courseMaterials;
			if (typeof icourseMaterials === 'undefined') { courseMaterials = {}; }
			
			//splits trainers into 
			var trainers = trainers.split(","); 
			
			var options = {
				courseCode: courseCode,
				startDate: startDate,
				classNo: classNo,
				timeslots: timeslots,
				trainers: trainers,
				courseMaterials: courseMaterials
			};
			Sessions.insert(options);
		},
			
		'updateAttendance': function updateAttendance(cLearnerId, timeslot, presence){
			//TODO: updateAttendance
		}
	});