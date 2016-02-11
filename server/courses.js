
	Meteor.methods({ 

		'courseImage': function storeCourseImage(cCode, cHref){
			CoursesImages.insert({
				code: cCode,
				link: cHref
			});
		},
		
		'editCourse': function editCourse(cCode, cName, cDescription, cNoOfHours, cFees, cMin, cMax, cType){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			Courses.update({courseCode: cCode}, {
		        $set: {
					courseCode: cCode,
					courseName: cName,
					courseDescription: cDescription,
					courseNoOfHours: cNoOfHours,
					courseFees: cFees,
					courseMax: cMax,
					courseType: cType
					//courseTrainers: cTrainer
				}
      		});
		},
		
		'deleteCourse': function deleteCourse(_id){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			console.log(_id);
      		Courses.remove(_id);
      		
		},
				
		'removeTrainer': function removeTrainer(id, removeCurrentTrainersArr){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			console.log(removeCurrentTrainersArr);

			removeCurrentTrainersArr.forEach(function(trainer) {
   				Courses.remove({_id:id, courseTrainers: trainer});
			});
      		
		},
				
		'addTrainer': function addTrainer(_id, addTrainersArr){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }

      		addTrainersArr.forEach(function(trainer) {
   				Courses.update(_id, {
	        		$push: {
	          			courseTrainers: {trainerName: trainer}
	        		}
	        	});
			});
		},
		
		'createCourse': function createCourse(cName, cCode, cFee, cNoOfHours, cDescription, cType, cFLR){
			// debugger;
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			console.log("createCourse");
			Courses.insert({
				courseName: cName,
				courseCode: cCode,
				courseFees: cFee,
				courseNoOfHours: cNoOfHours,
				courseDescription: cDescription,
				//courseTrainers: cTrainers,
				courseType: cType,
				courseFLR: cFLR
			});
			
			//TODO: Recommendation 
		}
	});
	
	