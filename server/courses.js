
	Meteor.methods({ 

		'courseImage': function storeCourseImage(cCode, cHref){
			CoursesImages.insert({
				code: cCode,
				link: cHref
			});
		},
		
		'editCourse': function editCourse(id, cCode, cName, cDescription, cNoOfHours, cFees, cFLR, cGenre, cType){
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
					genre: cGenre,
					courseType: cType
					//courseTrainers: cTrainer
				}
      		});
			console.log("edittingCourse");

		},
		
		'editComponents': function editCourse(currentCourseCode, courseComponents){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }

			Courses.update({courseCode: currentCourseCode}, {
		        $set: {
					components: courseComponents
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
				
		'removeTrainer': function removeTrainer(code, trainerID){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			console.log(">> IN SERVER");
			
			console.log(fbId);
      		Courses.update({courseCode: code},

      			{ $pull: { courseTrainers: {trainerID:trainerID} } }


      		);
		console.log("Question with _id: " + fbId + " has been removed");

			// removeCurrentTrainersArr.forEach(function(trainer) {
   // 				Courses.remove({_id:id, courseTrainers: trainer});
			// });
      		
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
	
	