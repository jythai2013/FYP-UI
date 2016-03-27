

Template.courseLSPForm.helpers({
	"courseTrainers2":function(){
		// console.log(this);
		var CT = this.courseTrainers;
		var returnString = "";
		if(Array.isArray(CT)){
			CT.forEach(function(a,b,c){
				var name = Meteor.users.findOne({_id:a.trainerID}).fullName;
				returnString += name + ", "
			});
			returnString = returnString.substring(0, returnString.length - 2);
		} else if(typeof CT == "string"){
			returnString = CT
		}
		return returnString;
	},
	
	"loggedInUsersName":function(){
		return Meteor.user().fullname;
	},
	
	"courseTotalClass":function(){
		//currently returning nothing. no idea why =.=
		var courseID = Session.get("currentCourseIDLSPForm");
		console.log(courseID);
		var coursecode = Courses.findOne({_id:courseID}).courseCode;
		console.log (Groups.find({courseCode:coursecode}).fetch().count);
		// return ;
	},
	
	"todayDate":function(){
		var mmlookup = [];
		mmlookup.push("Jan");
		mmlookup.push("Feb");
		mmlookup.push("Mar");
		mmlookup.push("Apr");
		mmlookup.push("May");
		mmlookup.push("Jun");
		mmlookup.push("Jul");
		mmlookup.push("Aug");
		mmlookup.push("Sep");
		mmlookup.push("Oct");
		mmlookup.push("Nov");
		mmlookup.push("Dec");
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var mmm = mmlookup[mm-1];

		if(dd<10) {
				dd='0'+dd
		} 

		if(mm<10) {
				mm='0'+mm
		} 

		today = dd+'-'+mmm+'-'+yyyy;
		return today;
	}
});