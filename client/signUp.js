// Template.course.helpers({

// 	"groupsCourse" : function listGroupsEventHandler(e) {
// 		console.log("here");
// 		console.log(Groups.find().count());
// 		//var currentCourse = Session.get('currentCourseCode');
// 		var str =  window.location.href;
// 		var position = str.indexOf('=');
// 		console.log(position + " = sign");
// 		console.log(str + "stri");
		
// 		var currentCourse=str.substr(position+1);
// 		console.log(currentCourse + "Code");

// 		var size = Groups.find({courseCode:currentCourse}).count();
// 		console.log(size + "Code");
// 		return Groups.find({courseCode:currentCourse}).count();
		
// 	}
// });


Template.registerForCourse.events({
	"click #submitSignUpButton" : function createGroupEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		console.log("here1");

		//TODO: Validation of input
		var firstName = document.getElementById("pfirstName").value;
		console.log(firstName);
		var lastName = document.getElementById("plastName").value;
		var pgender = document.getElementById("pgender").value;
		var pDOB = document.getElementById("pDOB").value;
		var pemail = document.getElementById("pemail").value;
		var pidType = document.getElementById("pidType").value;
		var pIDnum = document.getElementById("pIDNum").value;
		var pnationality = document.getElementById("pnationality").value;
		var ppostalCode = document.getElementById("ppostalCode").value;
		var presNo = document.getElementById("presNo").value;
		var pAdd = document.getElementById("pAdd").value;
		var pmobNo = document.getElementById("pmobNo").value;
		var pcompName = document.getElementById("pcompName").value;
		var poffNo = document.getElementById("poffNo").value;
		var planguage = document.getElementById("planguage").value;
		var pqualificationLevel = document.getElementById("pqualificationLevel").value;
		var ecNOKName = document.getElementById("NOKName").value;
		var ecNOKrelationship = document.getElementById("NOKrelationship").value;
		var ecNOKTel = document.getElementById("NOKTel").value;
		var ecNOKAddr = document.getElementById("NOKAddr").value;
		var ecNOKPostalCode = document.getElementById("NOKPostalCode").value;
		
      //console.log(grpNumI);
		console.log("here4");
		Meteor.call("createUsers", firstName, lastName, pgender, pDOB, pemail, pidType, pIDnum, pnationality, pcompName,presNo, pAdd, ppostalCode, pmobNo, poffNo, planguage, pqualificationLevel, ecNOKName, ecNOKTel, ecNOKAddr, ecNOKPostalCode, ecNOKrelationship);
		//Meteor.call("createLearnerAccount", pemail, );
		//console.log(Groups.find({}).fetch();
	}
});