
	Meteor.methods({ 

		'courseImage': function storeCourseImage(cCode, cHref){
			CoursesImages.insert({
				code: cCode,
				link: cHref
			});
		},
		
		'editCourse': function editCourse(id, cCode, cName, cDescription, cNoOfHours, cFees, cFLR, cType){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }

			Courses.update({_id: id}, {
		        $set: {
					courseCode: cCode,
					courseName: cName,
					courseDescription: cDescription,
					courseNoOfHours: cNoOfHours,
					courseFees: cFees,
					courseFLR: cFLR,
					courseType: cType
					//courseTrainers: cTrainer
				}
      		});
			console.log("edittingCourse");

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
			
			var theCourse = Courses.findOne({_id:_id});
			if(!Array.isArray(theCourse.courseTrainers)){
				var emptyArray = new Array();
				Courses.update({_id:_id},{$set:{courseTrainers:emptyArray}})
			}

      		addTrainersArr.forEach(function(trainer) {
   				Courses.update(_id, {
	        		$push: {
	          			courseTrainers: {
	          				trainerID: trainer
	          			}
	        		}
	        		
	        	});
			});
		},
		
		'createCourse': function createCourse(cName, cCode, cFee, cNoOfHours, cDescription, cType, cFLR, cPrereq, cGenre){
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
				courseFLR: cFLR,
				prerequisite: cPrereq, 
				genre: cGenre
			});
			
			//TODO: Recommendation 
		}
	});
	
	