Meteor.methods({
	"recommend":function(){
		// //TODO: check all students, if they are to be recommended this course, then send them an emails
		// //	They are to be recommended when the following happens
		// //		pre-requisite
		// //		genre
		// //		classmates take similar
		// var students = Meteor.users.find({userType:{learner:true}}).fetch();
		// students.forEach(function(student, index, array){
		// }
			
			
			
	}
});
		
		
//this method is called when a student is enrolled. (via addTask)
studentFinishedCourseRecommender = function recommend(studentId, groupId){
	todaysDate = new Date();
	var groupsThatHaventStarted = Groups.find({startDate: {$gt:todaysDate} }).fetch();
	
	
	//TODO: genre
	//TODO: check through each group that hasn't started. if it is the same genre as the latest course the student has just finished, recommend a few of the more popular ones if he also hasn't taken it
	latestFinishedCourseGenre = undefined; //TODO:
	potentialCoursesFromGenre = [];
	groupsThatHaventStarted.forEach(function(thisGroup, ind, arr){
		if(thisGroup.genre == latestFinishedCourseGenre){
			potentialCoursesFromGenre.push(thisGroup);
		}
	});
	//TODO: return most popular course from potentialCoursesFromGenre
	
	
	
	//TODO: pre-requisite
	//TODO: check through each group that hasn't started. if it has a pre-requisite that is the course the student has just finished, recommend.
	latestFinishedCourseCode = undefined; //TODO:
	potentialCoursesFromPrerequisite = [];
	groupsThatHaventStarted.forEach(function(thisGroup, ind, arr){
		if(thisGroup.prerequisite.indexOf(latestFinishedCourseCode) > -1){
			potentialCoursesFromPrerequisite.push(thisGroup);
		}
	});
	//TODO: return most popular course from potentialCoursesFromPrerequisite
	
	
	
	//TODO: classmates
	//TODO: recEngine. 
	
	
	//TODO: email the student
}