
Meteor.methods({
	"recommend":function(studentId, groupId){
			
		var r = studentFinishedCourseRecommender(studentId, groupId);
		console.log("");
		console.log("");
		console.log("");
		console.log("RESULT IN RECOMMEND");
		console.log(r);
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
			potentialCoursesFromRecEngine.forEach(function(dat,tad,atd){
				finalResult.push(dat);
			});
		}
		return r;
	}
});
		
		
//this method is called when a student is enrolled. (via addTask)
studentFinishedCourseRecommender = function recommend(studentId, groupId){
	console.log(studentId);
	console.log(groupId);
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
	console.log("latestFinishedCourseGenre = " + latestFinishedCourseGenre);
 	var potentialCoursesFromGenre = [];
 	groupsThatHaventStarted.forEach(function(thisGroup, ind, arr){
 		theCourse = Courses.findOne({courseCode:thisGroup.courseCode});
		console.log("");
		console.log("theCourse (genre):");
		console.log(theCourse);
		console.log("");
 		if(theCourse.genre == latestFinishedCourseGenre){
 		//if(thisGroup.genre == latestFinishedCourseGenre){
			//TODO: Check if the recommended course (theCourse) has prequisites met
			console.log("")
			console.log("genre course")
			console.log(theCourse)
 			potentialCoursesFromGenre.push(theCourse);
 		}
 	});
 	//return most popular course from potentialCoursesFromGenre
 	var temp = getMostPopularCoursesBelowMax(potentialCoursesFromGenre, numberOfCoursesToRecommend);
 	finalResult.concat(temp);
	temp.forEach(function(dat,tad,atd){
		finalResult.push(dat);
	});
	console.log("");
	console.log("");
	console.log("");
	console.log("GENRE : ")
	console.log(temp)
 	//console.log(res);



 	//pre-requisite
 	//check through each group that hasn't started. if it has a pre-requisite that is the course the student has just finished, recommend.
 	latestFinishedCourseCode = theLatestCourse.genre; //TODO:
 	var potentialCoursesFromPrerequisite = [];
 	groupsThatHaventStarted.forEach(function(thisGroup, ind, arr){
 		theCourse = Courses.findOne({courseCode:thisGroup.courseCode});
 		if(theCourse.prerequisite.indexOf(latestFinishedCourseCode) > -1){
		console.log("");
		console.log("theCourse (pre-requisite):");
		console.log(theCourse);
		console.log("");
			//TODO: Check if the recommended course (theCourse) has prequisites met
			console.log("")
			console.log("pre-requisite course")
			console.log(theCourse)
 			potentialCoursesFromPrerequisite.push(theCourse);
 		}
 	});
 	//return most popular course from potentialCoursesFromPrerequisite
 	temp = getMostPopularCoursesBelowMax(potentialCoursesFromPrerequisite, numberOfCoursesToRecommend);
 	finalResult.concat(temp);
	temp.forEach(function(dat,tad,atd){
		finalResult.push(dat);
	});
	console.log("");
	console.log("");
	console.log("");
	console.log("PRE-REQUISITES : ")
	console.log(temp)
 	//console.log(res);
	
	
	
 	//classmates
 	//recEngine
	var recEngineWorks = true;
	if(recEngineWorks){
		var potentialCoursesFromRecEngine = [];
		recEngine.suggest(studentId, numberOfCoursesToRecommend, function(err,res) {
			if (err) {console.log(err);}
			else{
				console.log("95");
				console.log(res);
				res.forEach(function(thCourseCode, indexxx, array){
					var thCourse = Courses.findOne({courseCode:thCourseCode});
					potentialCoursesFromRecEngine.push(thCourse);
				});
			}
		})
		console.log("");
		console.log("");
		console.log("");
		console.log("RECENGINE : ")
		console.log(potentialCoursesFromRecEngine)
		finalResult.concat(potentialCoursesFromRecEngine);
		if(potentialCoursesFromRecEngine != undefined){
			potentialCoursesFromRecEngine.forEach(function(dat,tad,atd){
				finalResult.push(dat);
			});
		}
	}
	
 	if(recEngineWorks){
 		// find the courses which this student has enrolled in
 		theStudentCourses = Groups.find({classlist:studentId}).fetch();
	
 		//TODO: rank the other students by how many courses they have in common with the student
 		numberOfCommonCoursesMap = {};
 		otherStudents = Meteor.users.find( { _id: { $ne: studentId } } ).fetch();
 		otherStudents.forEach(function(thatStudent, index, arr){			
 			//TODO: compare with the student's courses and add to hashmap {thatStudent, number of courses in common}
 			var common = intersect_safe(Groups.find({classlist:thatStudent._id}).fetch(), theStudentCourses)
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
 			groupsHeIsIn = Groups.find({classlist:studentId}).fetch();
		
 			//TODO: populate a hashmap of the form [courseId, number of students in this array taking]
 			groupsHeIsIn.forEach(function(groupgroup, ind, arrr){
				var groupId = groupgroup._id;
				tempGroup = Groups.findOne({_id:groupId});
 				courseCode = tempGroup.courseCode;
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
		console.log("");
		console.log("");
		console.log("");
		console.log("RECENGINE DOESNT WORK : ")
		console.log(temp)
		temp.forEach(function(dat,tad,atd){
			finalResult.push(dat);
		});
 	}

	//get Unique values
	
	
	finalResult = finalResult.filter(function (e, ind, arr) {
		var searchTerm = e._id,
			index = -1;
		for(var i = arr.length - 1; i >= 0; i--) {
			if (arr[i]._id === searchTerm) {
				index = i;
				break;
			}
		}
    return index === ind;
    //return arr.lastIndexOf(e) === i;
	});
	console.log("");
	console.log("");
	console.log("");
	console.log("FINAL RESULT 5");
 	console.log(finalResult);	
	
	//TODO: email the student
	var trySendMail = true;
	if(trySendMail){
		details = {};
		var theUser = Meteor.users.findOne({_id:studentId});
		details.to = theUser.emails[0];
		details.to = "asdf154+recommend@gmail.com";
		details.from = "Sterling Training Hub";
		details.subject = "Your next course with us!";
		details.text = "";
		details.html = "Dear " + theUser.fullName + ", <br><br>Thank you for choosing Sterling Training Hub as your learning service provider. We are glad to inform you that we have the following courses that you may be interested in. Please click on the title to find out more: <br><br>";
		//ebody = 'First Name: ' + firstname + '\r\n' + 'Last Name: ' + lastname;
		//ebody = encodeURIComponent(ebody);
		finalResult.forEach(function(aCourse, index, array){
			details.html += (index+1) + ") <a href='http://localhost:3000/website/courseDetail?cCode="+aCourse.courseCode+"'>" + aCourse.courseName + "</a><br>";
			details.html += aCourse.courseDescription + "<br><br>";
		})
		details.html += "Yours Sincerely,<br>";
		details.html += "Sterling Training Hub";
		console.log("The details of the email are:");
		console.log("");
		console.log(details);
		Meteor.call("sendMail", details);
	}
	
	return finalResult;
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

function intersect_safe(a, b)
{
  var ai=0, bi=0;
  var result = [];

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}