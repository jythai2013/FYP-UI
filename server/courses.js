
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
		    var courseCode = Courses.findOne({_id:_id}).courseCode;
		    Groups.remove({courseCode:courseCode});
      		Courses.remove(_id);      

      		
		},
				
		'removeTrainer': function removeTrainer(code, trainerID){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			console.log(">> IN SERVER");
      		Courses.update({courseCode: code},

      			{ $pull: { courseTrainers: {trainerID:trainerID} } }
      		);
      		
		},
				
		'removeComponent': function removeComponent(code, editComponents){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			console.log(">> IN SERVER");
      		Courses.update({courseCode: code},

      			{ $pull: { components: {component:editComponents} }}
      			
      		);
      		
		},
				
		'addTrainer': function addTrainer(courseID, addTrainersArr){
			// if(Meteor.user.userType != "admin"){
			// 	return false; //TODO: output error message in client
			// }
			
			// var theCourse = Courses.findOne({_id:courseID});
			// if(!Array.isArray(theCourse.courseTrainers)){
			// 	var emptyArray = new Array();
			// 	Courses.update({_id:_id},{$set:{courseTrainers:emptyArray}})
			// }
      		addTrainersArr.forEach(function(trainer) {
			console.log(trainer);
				Courses.update(courseID, {
	        		$push: {
	          			courseTrainers: {
	          				trainerID: trainer
	          			}
	        		}
	        		
	        	});
   				
			});
			console.log(">> IN SERVER");


			
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
	
	