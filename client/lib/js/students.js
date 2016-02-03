// STUDENT ///////////////////////////////////////////////////////////////////////

//Search ////////////////////////
Template.studentList.onRendered(function(){
	Session.set("studentSearchName", null);
	//Session.set("studentSearchType", null);
	//Session.set("studentSearchLess", null);
	//Session.set("studentSearchEqua", null);
	//Session.set("studentSearchMore", null);
	//Session.set("studentSearchCaps", null);
});

Template.studentList.events({
	"click #filter" : function doSearch(e){
		// console.log(e);
		var studentName = document.getElementById("usersSearchNameInput").value;
		//var studentType = document.getElementById("studentSearchType").value;       
		//var studentCaps = document.getElementById("fCapacity").value;  
		//var studentLess = document.getElementById("optionsRadios1").checked;
		//var studentEqua = document.getElementById("optionsRadios2").checked;
		//var studentMore = document.getElementById("optionsRadios3").checked;
		Session.set("studentSearchName", studentName);
		//Session.set("studentSearchType", studentType);
		//Session.set("studentSearchCaps", studentCaps);
		//Session.set("studentSearchLess", studentLess);
		//Session.set("studentSearchEqua", studentEqua);
		//Session.set("studentSearchMore", studentMore);
	},
	
	"blur #usersSearchNameInput" : function s2(e){
		//console.log(e);
		var studentName = document.getElementById("usersSearchNameInput").value;
		Session.set("studentSearchName", studentName);
	},
	
	"keydown #usersSearchNameInput" : function s5(e){
		console.log(e);
		var studentName = document.getElementById("usersSearchNameInput").value;
		Session.set("studentSearchName", studentName);
	}
});

Template.studentList.helpers({
	"students" : function studentList(evt) {
		var verbose = !true;
		var studentName = Session.get("studentSearchName");
		//var studentType = Session.get("studentSearchType");
		//var studentLess = Session.get("studentSearchLess");
		//var studentEqua = Session.get("studentSearchEqua");
		//var studentMore = Session.get("studentSearchMore");
		//var studentCaps = Session.get("studentSearchCaps");
		if(studentName == null || studentName == undefined || studentName.length <= 0){
			return Meteor.users.find({userType:{"learner":true}});
		}
		var regName = new RegExp(".*"+studentName+".*","i");
		var v2 = Meteor.users.find({$or:[{"firstName":regName},{"lastName":regName}], userType:{"learner":true}});
		if(verbose){
			console.log(regName);
			console.log(v2);
			console.log(v2.fetch());
		}
		return v2;
	}
});
// End Search ////////////////////////

Template.studentList.helpers({
	"getStudentCount" : function countStudentList(e) {
		return Meteor.users.find({userType:{"learner":true}}).count();
	}
});

Template.addStudentAcctForm.events({
	"click #addStudentAcctButton" : function createStudentEventHandler(e) {
		console.log("Sys: Collect Student Information");

		//TODO: Validation of input		
		var obj = new Object();
		obj.firstName = 		document.getElementById("firstName").value;
		obj.lastName = 			document.getElementById("lastName").value;
		obj.gender = 				document.getElementById("gender").value;
		obj.dateOfBirth = 					document.getElementById("dob").value;
		obj.mobileNo = 			document.getElementById("mobileNo").value;
		obj.email = 				document.getElementById("email").value;
		obj.userIDType = 				document.getElementById("idType").value;
		obj.userID = 					document.getElementById("idNo").value;
		obj.nationality = 	document.getElementById("nationality").value;
		obj.postalCode = 					document.getElementById("code").value;
		obj.resAddr= 				document.getElementById("resAddr").value;
		obj.highestQualification = document.getElementById("qualification").value;
		obj.proficiency = 				document.getElementById("proficiency").value;
		obj.nokName = 			document.getElementById("nokName").value;		
		obj.nokReln = 			document.getElementById("nokReln").value;		
		obj.nokTel = 				document.getElementById("nokTel").value;		
		obj.password = 			obj.mobileNo;
		obj.remarks = 			document.getElementById("remarks").value;
		obj.userType = {learner:true};

		Meteor.call("createLearnerAccount2", obj);
		console.log("Sys: Student Information Saved");
	}
});


Template.registerForCourse.events({
	"click #submitSignUpButton" : function createStudentEventHandler(e, template) {
		console.log("Sys: Collect Student Information");

		//TODO: Validation of input		
		var obj = new Object();
		obj.firstName = 		document.getElementById("firstName").value;
		obj.lastName = 			document.getElementById("lastName").value;
		obj.gender = 			template.find('input:radio[name=gender]:checked');
		obj.dateOfBirth = 					document.getElementById("dob").value;
		obj.mobileNo = 			document.getElementById("mobileNo").value;
		obj.email = 				document.getElementById("email").value;
		obj.userIDType = 				document.getElementById("userIDType").value;
		obj.userID = 					document.getElementById("userID").value;
		obj.nationality = 	document.getElementById("nationality").value;
		obj.postalCode = 					document.getElementById("code").value;
		obj.resAddr= 				document.getElementById("resAddr").value;
		obj.highestQualification = document.getElementById("qualification").value;
		obj.proficiency = 				document.getElementById("language").value;
		obj.nokName = 			document.getElementById("nokName").value;		
		obj.nokReln = 			document.getElementById("nokReln").value;		
		obj.nokTel = 				document.getElementById("nokTel").value;		
		obj.password = 			obj.mobileNo;
		obj.remarks = 			"Online Registration";
		obj.userType = {learner:true};

		console.log("Loading: " + obj);
		Meteor.call("createLearnerAccount2", obj);
		console.log("Sys: Student Information Saved");
	}
});

Template.deleteStudentForm.events({
	"click #deleteStudentButton" : function deleteStudentEventHandler(e) {
		console.log(this._id);
		Meteor.call("deleteUsers2", this._id);
	}
});

Template.viewParticularsForm.events({
	"click #editStudAcct" : function viewStudentDetailsEventHandler(e) {
		console.log("Updating Student Information...");

		//TODO: Validation of input
		var sRemarks = document.getElementById("remarks").value;
		var smobileNo = document.getElementById("mobileNo").value;
		var sPostalCode = document.getElementById("code").value;
		var sResAddress = document.getElementById("resAddr").value;
		var sQualif = document.getElementById("qualification").value;
		var sProficiency = document.getElementById("profi").value;
		
		// var scompName = document.getElementById("compName").value;
		// var scompOfficeNo = document.getElementById("compOfficeNo").value;		
		
		var snokName = document.getElementById("nokName").value;		
		var snokReln = document.getElementById("nokReln").value;		
		var snokTel = document.getElementById("nokTel").value;		
		var snokAddr = document.getElementById("nokAddr").value;		
		var snokPostalCode = document.getElementById("nokCode").value
		Meteor.call("editLearnerAccount", smobileNo, sPostalCode, sResAddr, sQualif, 
			_sProficiency, scompName, scmopOfficeNo, scompOfficeNo, snokName, 
			_snokReln, snokTel, snokAddr, snokPostalCode, sRemarks);
	}
});