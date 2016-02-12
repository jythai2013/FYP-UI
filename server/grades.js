Meteor.methods({
	"updateGrades":function editgrades(inObj){ //TODO: adapt this code
		console.log(inObj)
		studentID = inObj.StudentID;
		grades = inObj.grades;
		
		var theUser = Meteor.users.findOne(inObj.StudentID);
		console.log(theUser)
		
		if(theUser.grades == undefined || theUser.grades == null){ theUser.grades = {}; }
		//if(theUser.grades.date == undefined || theUser.grades.date == null){ theUser.grades.date = {}; }
		//theUser.grades.date[dateD].studentId = gradesTrueOrFalse;
		theUser.grades = grades;
		console.log(theUser)
		console.log(theUser.grades)
		
		Meteor.users.update({_id:inObj.StudentID}, {$set: {grades: grades}});
		// Meteor.users.update({inObj.StudentID}, {$set: {grades: grades}});
		
		// theUser.grades is an object, with each assesment as attribute names (eg midterms, finals, etc) (eg theUser.grades["midterms"] = 50)
		// each attribute of the grades object is the number of marks he has
	}
});