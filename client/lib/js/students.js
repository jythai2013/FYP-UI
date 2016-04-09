function getRadioValue(theRadioGroup)
 {
     var elements = document.getElementsByName(theRadioGroup);
     for (var i = 0, l = elements.length; i < l; i)
     {
         if (elements[i].checked)
         {
             return elements[i].value;
         }
     }
 }

// STUDENT ///////////////////////////////////////////////////////////////////////
Template.studentIndex.helpers({
	"displayStudentName" : function displayTrainerName(e) {
		return Meteor.user().fullName;
	}
});

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
	
	"keypress #usersSearchNameInput" : function s5(e){
		setTimeout(function(){
			console.log(e);
			var studentName = document.getElementById("usersSearchNameInput").value;
			Session.set("studentSearchName", studentName);
		}, 2);
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
		var v2 = Meteor.users.find({$or:[{"fullName":regName}], userType:{"learner":true}});
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
		obj.fullName = 		document.getElementById("sName").value;
		var isGender = getRadioValue("gender");
 		var gender = "male";
 		if (isGender !== "male") {
 			gender="female";
 		}
 		obj.gender = gender;
		obj.dateOfBirth = 					document.getElementById("dob").value;
		obj.mobileNo = 			document.getElementById("mobileNo").value;
		obj.email = 				document.getElementById("email").value;
		obj.userIDType = 				document.getElementById("idType").value;
		obj.userID = 					document.getElementById("idNo").value;
		obj.nationality = 	document.getElementById("nationality").value;
		obj.highestQualification = document.getElementById("qualification").value;
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
		try {

			//TODO: Validation of input		
			var obj = new Object();
			var fName = 		document.getElementById("pfirstName").value;
	 		var lName = 		document.getElementById("plastName").value;
	 		var fullName = fName + " " + lName;
	 		obj.fullName = fullName;

	 		var isGender = getRadioValue("pgender");
	 		var gender = "male";	
	 		if (isGender !== "male") {
	 			gender="female";
	 		}
	 		var mNo = document.getElementById("pmobNo").value;
	 		obj.gender = gender;
	 		obj.dateOfBirth = 					document.getElementById("pDOB").value;
	 		obj.mobileNo = mNo;
	 		obj.email = 				document.getElementById("pemail").value;
	 		obj.userIDType = 				document.getElementById("pidType").value;
	 		obj.userID = 					document.getElementById("pIDNum").value;
	 		obj.nationality = 	document.getElementById("pnationality").value;
	 		obj.highestQualification = document.getElementById("pqualificationLevel").value;
	 		// obj.proficiency = 				document.getElementById("planguage").value;
	  		obj.nokName = 			document.getElementById("nokName").value;		
	 		obj.nokReln = 			document.getElementById("nokRelationship").value;		
	  		obj.nokTel = 				document.getElementById("nokTel").value;		
	 		obj.company = 				document.getElementById("pcompName").value;		
	 		obj.officeNo = 				document.getElementById("poffNo").value;		
	 		obj.password = mNo;
	 		var grpId = document.getElementById("group").value;
	 		obj.remarks = 			"Online Registration for " + grpId;
			obj.userType = {learner:true};

			console.log("Loading: " + obj);
			// Meteor.call("createLearnerAccount2", obj);
			Meteor.call("createLearnerAccount2", obj, function (err, result) {
	      		if (err) {
					console.log(">>>Course Signup FAILURE MSG");
				    Session.set('errorWebsiteSignUpMessage', 'Course Signup Failed: ' + err.reason);
				    Meteor.setTimeout(function(){Session.set('errorWebsiteSignUpMessage', false);}, 6000);
				} else {
					console.log(">>>Course Signup SUCCESS, display alert");
					Session.set('displayAlertWebsite', true);
				}
			});
			console.log("Sys: Student Information Saved");
		} catch(err) {
			console.log(">>>Course Signup FAILURE MSG, undefined?");
		    Session.set('errorWebsiteSignUpMessage', 'Course Signup Failed: ' + err.reason + " was caught");
		    Meteor.setTimeout(function(){Session.set('errorWebsiteSignUpMessage', false);}, 6000);
		}
		
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
		console.log(e);
		console.log(this);

		//TODO: Validation of input
		var sRemark = $("#"+this._id+" #remarks")[0].value;
		//var idNo = document.getElementById("remarks").value;
		//var email = document.getElementById("remarks").value;
		//var nationality = document.getElementById("remarks").value;
		var sMobileNo 		= $("#"+this._id+" #mobileNo")[0].value;
		var qualification = $("#"+this._id+" #qualification")[0].value;
		
		// var scompName = document.getElementById("compName").value;
		// var scompOfficeNo = document.getElementById("compOfficeNo").value;		
		
		var snokName = $("#"+this._id+" #nokName")[0].value;		
		var snokReln = $("#"+this._id+" #nokReln")[0].value;		
		var snokTel =  $("#"+this._id+" #nokTel")[0].value;

			console.log("Remarks-"+ sRemark);
			console.log("MobileNo-"+ sMobileNo);
			console.log("proficiency-"+ sProficiency);
			console.log("qualitifation-"+ qualification);
			console.log("name-"+ snokName);
			console.log("tel-"+ snokTel);
			console.log("reln-"+ snokReln);
		
		// sRemark, sMobileNo, sProficiency, qualification, snokName, snokTel, snokReln
		Meteor.call("editLearnerAccount", this._id, sRemark, sMobileNo, sProficiency, qualification, snokName, snokTel, snokReln);
		console.log(">> Completed");
	}
});