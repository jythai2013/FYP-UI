Meteor.methods({
	"updateGrades":function editgrades(inObj){ //TODO: adapt this code
		// console.log(inObj)
		studentID = inObj.StudentID;
		grades = inObj.grades;
		console.log(inObj.groupID);
		
		var theUser = Meteor.users.findOne({_id:inObj.StudentID});
		// console.log(theUser)
		
		if(theUser.grades == undefined || theUser.grades == null){ theUser.grades = {}; }
		//if(theUser.grades.date == undefined || theUser.grades.date == null){ theUser.grades.date = {}; }
		//theUser.grades.date[dateD].studentId = gradesTrueOrFalse;
		for(var propertyName in grades) {
			 // you can get the value like this: myObject[propertyName]
			var ind = propertyName.indexOf(".");
			if(ind > -1) {
				var value = grades[propertyName];
				delete grades[propertyName];
				propertyName = propertyName.substring(0, ind);
				grades[propertyName] = value;
			}
		}
		theUser.grades[inObj.groupID] = grades;
		console.log(theUser)
		// console.log(inObj.StudentID)
		// console.log(theUser.grades)
		
		Meteor.users.update({_id:inObj.StudentID}, theUser);
		// Meteor.users.update({inObj.StudentID}, {$set: {grades: grades}});
		
		//theUser.grades[groupId]["midterms"]
		
		//below is wrong:
		// theUser.grades is an object, with each assesment as attribute names (eg midterms, finals, etc) (eg theUser.grades["midterms"] = 50)
		// each attribute of the grades object is the number of marks he has
	}
});