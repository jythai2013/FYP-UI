function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    url = url;
    name = name.replace(/[\[\]]/g, "\\$&").toString();
		console.log(name);
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
		console.log(results);
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

Template.courseLSPForm.onRendered(function(){
	var cLSP = getParameterByName("cLSP");
	Session.set("currentCourseIDLSPForm2", cLSP);
});

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
		var courseID = Session.get("currentCourseIDLSPForm2");
		console.log(courseID);
		var theCourse = Courses.findOne({_id:courseID});
		console.log(theCourse);
		var coursecode = theCourse.courseCode;
		console.log(coursecode);
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