
Meteor.methods({
	"recommend":function(studentId, groupId){
			
		var r = studentFinishedCourseRecommender(studentId, groupId);
		console.log(r);
		Session.set("recommendedCourses", r);
		return r;
	},
	
	"recommendRecEngine":function(studentId){
		recEngineWorks = true;
		if(recEngineWorks){
			var potentialCoursesFromRecEngine;
			recEngine.suggest(studentId, numberOfCoursesToRecommend, function(err,res) {
				if (err) {console.log(err);}
				else{
					console.log("18");
					console.log(res);
					res.forEach(function(thCourseCode, indexxx, array){
						var thCourse = Courses.findOne({courseCode:thCourseCode});
						potentialCoursesFromRecEngine.push(thCourse);
					});
				}
			})
			finalResult.concat(potentialCoursesFromRecEngine);
		}
		Session.set("recommendedCoursesRecEngine", r);
		return r;
	}
});
		
		
//this method is called when a student is enrolled. (via addTask)
studentFinishedCourseRecommender = function recommend(studentId, groupId){
 	var knnk = 10;
 	var numberOfCoursesToRecommend = 3;
 	var theGroup = Groups.findOne({_id:groupId});
 	var courseCode = theGroup.courseCode;
 	var theLatestCourse = Courses.findOne({courseCode:courseCode});
 	var todaysDate = new Date();
 	var groupsThatHaventStarted = Groups.find({startDate: {$gt:todaysDate} }).fetch();
 	var finalResult = [];


 	//genre
 	//check through each group that hasn't started. if it is the same genre as the latest course the student has just finished, recommend a few of the more popular ones if he also hasn't taken it
 	latestFinishedCourseGenre = theLatestCourse.genre; //TODO:
 	var potentialCoursesFromGenre = [];
 	groupsThatHaventStarted.forEach(function(thisGroup, ind, arr){
 		theCourse = Courses.findOne({courseCode:thisGroup.courseCode});
 		if(theCourse.genre == latestFinishedCourseGenre){
 		//if(thisGroup.genre == latestFinishedCourseGenre){
			//TODO: Check if the recommended course (theCourse) has prequisites met
 			potentialCoursesFromGenre.push(theCourse);
 		}
 	});
 	//return most popular course from potentialCoursesFromGenre
 	var temp = getMostPopularCoursesBelowMax(potentialCoursesFromGenre, numberOfCoursesToRecommend);
 	finalResult.concat(temp);
 	//console.log(res);



 	//pre-requisite
 	//check through each group that hasn't started. if it has a pre-requisite that is the course the student has just finished, recommend.
 	latestFinishedCourseCode = theLatestCourse.genre; //TODO:
 	var potentialCoursesFromPrerequisite = [];
 	groupsThatHaventStarted.forEach(function(thisGroup, ind, arr){
 		theCourse = Courses.findOne({courseCode:thisGroup.courseCode});
 		if(theCourse.prerequisite.indexOf(latestFinishedCourseCode) > -1){
			//TODO: Check if the recommended course (theCourse) has prequisites met
 			potentialCoursesFromPrerequisite.push(thisGroup);
 		}
 	});
 	//return most popular course from potentialCoursesFromPrerequisite
 	temp = getMostPopularCoursesBelowMax(potentialCoursesFromPrerequisite, numberOfCoursesToRecommend);
 	finalResult.concat(temp);
 	//console.log(res);
	
	
	
 	//classmates
 	//recEngine
	var recEngineWorks = true;
	if(recEngineWorks){
		var potentialCoursesFromRecEngine;
		recEngine.suggest(studentId, numberOfCoursesToRecommend, function(err,res) {
			if (err) {console.log(err);}
			else{
				console.log("91");
				console.log(res);
				res.forEach(function(thCourseCode, indexxx, array){
					var thCourse = Courses.findOne({courseCode:thCourseCode});
					potentialCoursesFromRecEngine.push(thCourse);
				});
			}
		})
		finalResult.concat(potentialCoursesFromRecEngine);
	}
	
 	if(!recEngineWorks){
 		// find the courses which this student has enrolled in
 		theStudentCourses = Groups.find({classlist:studentId}).fetch();
	
 		//TODO: rank the other students by how many courses they have in common with the student
 		numberOfCommonCoursesMap = {};
 		otherStudents = Meteor.users.find( { _id: { $not: studentId } } ).fetch();
 		otherStudents.forEach(function(thatStudent, index, arr){			
 			//TODO: compare with the student's courses and add to hashmap {thatStudent, number of courses in common}
 			var common = $.grep(theStudentCourses, function(element) {
 					return $.inArray(element, Groups.find({classlist:thatStudent._id}).fetch() ) !== -1;
 			});
 			numberOfCommonCourses = common.length;
 			numberOfCommonCoursesMap[thatStudent._id] = numberOfCommonCourses;
 		});
	
 		//TODO: sort the hashmap by number of courses in common
 		var sortedNumberOfCoursesArray = []; //sorted array of other students._id in descending order of common courses
 		var maxCount = 0;
 		while(sortedNumberOfCoursesArray.length < knnk){
 			var nextMaxCountItem = undefined;
 			for(var propertyName in numberOfCommonCoursesMap){
 				var count = numberOfCommonCoursesMap[propertyName];
 				if(count > maxCount && sortedNumberOfCoursesArray.indexOf(propertyName) < 0){
 					maxCount = count;
 					nextMaxCountItem = propertyName;
 				}
 			}
 			sortedNumberOfCoursesArray.push(nextMaxCountItem);
 		}
 		//TODO: get those top k ranked people's courses and pull the most common courses
 		courseVsCountMap = {};
 		sortedNumberOfCoursesArray.forEach(function(studentId, index, arr){
 			//TODO: get the courses each student takes
 			groupsHeIsIn = Groups.get({classlist:studentId}).fetch();
		
 			//TODO: populate a hashmap of the form [courseId, number of students in this array taking]
 			groupsHeIsIn.forEach(function(groupId, ind, arrr){
 				courseCode = Groups.findOne({_id:groupId}).courseCode;
 				if(courseVsCountMap[courseCode] == undefined)
 					courseVsCountMap[courseCode] = 1;
 				else
 					courseVsCountMap[courseCode] += 1;
 			});
 		});
	
 		var maxCount2 = 0;
 		var courseVsCountArray = [];
 		numberOfCoursesToRecommend
 		temp = [];
 		var maxCourse;
 		while(temp.length < numberOfCoursesToRecommend){
 			for(var courseCode in courseVsCountMap){
 				if(courseVsCountMap[courseCode] > maxCount2 && temp.indexOf(courseCode) < 0){
 					maxCount2 = courseVsCountMap[courseCode];
 					maxCourse = courseCode;
 				}
 			}
 			temp.push(Courses.findOne({courseCode:maxCourse}));
 		}
 		finalResult.concat(temp)
 	}

	//get Unique values
	finalResult = finalResult.filter(function (e, i, arr) {
    return arr.lastIndexOf(e) === i;
	});
	console.log("170");
 	console.log(finalResult);	
	
	//TODO: email the student
	var trySendMail = !true;
	if(trySendMail){
		details = {};
		details.to = Meteor.users.findOne({_id:studentId});
		details.from = "Sterling Training Hub";
		details.subject = "Your next course with us!";
		details.text = "We have the following courses that you may be interested in:";
		console.log("The details of the email are:");
		console.log("");
		console.log(details);
		Meteor.call("sendMail", details);
	}
}



 function getMostPopularCoursesBelowMax(array, number){
 	var result = [];
 	array.sort(function(x,y){
 		return x.classlist.length < y.classlist.length;
 	});
	if(array.length < number) number = array.length;
 	for(i = 0; i < number; i++){
 		if(array[i].classlist.length < array[i].maxNumberOfPeopleAllowed) //TODO:
 		result.push(array[i]);
 	}
 	return result;
 }

function recommendStudentsByCourse(courseId){
	var theCourse = Courses.findOne({_id:courseId});
	var preReqs =  theCourse.prerequisite;
}