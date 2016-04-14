function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];
    
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
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

// ADMIN PORTAL ////////////////////////////////////////////////////////////////
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
			return Meteor.users.find({userType:{learner:true}}).fetch();
		}
		var regName = new RegExp(".*"+studentName+".*","i");
		var v2 = Meteor.users.find({$or:[{"fullName":regName}], userType:{learner:true}}).fetch();
		if(verbose){
			console.log(regName);
			console.log(v2);
		}
		return v2;
	},

	"studentEnrollments" : function studentList(evt) {
		var a = Groups.find({classlist: {$in : [this._id]}}).fetch();
		var returnString = "";
		// console.log(this.fullName);
		// console.log(a);
		a.forEach(function(grp, index, arr){
			var courseCode = grp.courseCode;
			var courseClass = grp.grpNum;
			if(index === (a.length-1) ){
				returnString += courseCode+"("+courseClass+") ";
			} else {
				returnString += courseCode+"("+courseClass+"), ";
			}
		});
		if (returnString === ""){
			return "Nil";
		} else {
			return returnString;
		}
	}
});
// End Search ////////////////////////

Template.studentList.helpers({
	"getStudentCount" : function countStudentList(e) {
		return Meteor.users.find({userType:{"learner":true}}).count();
	}
});

Template.addStudentAcctForm.events({
	"click #addStudentAcctButton" : function createStudentEventHandler(e, template) {
		console.log("Sys: Collect Student Information");
		//TODO: Validation of input		
		var obj = new Object();
		obj.fullName = 		document.getElementById("sName").value;
 		obj.gender = $(template.find('input:radio[name=gender_filter]:checked')).val();
		obj.dateOfBirth = 					document.getElementById("dob").value;
		obj.mobileNo = 			document.getElementById("mobileNo").value;
		obj.email = 				document.getElementById("email").value;
		obj.userIDType = 	document.getElementById("studidType").value;
		obj.userID = 	document.getElementById("studidNo").value;
		obj.nationality = 	document.getElementById("snationality").value;
		obj.highestQualification = document.getElementById("squalification").value;
		obj.nokName = 			document.getElementById("snokName").value;		
		obj.nokReln = 			document.getElementById("snokReln").value;		
		obj.nokTel = 				document.getElementById("snokTel").value;		
		obj.password = 			obj.mobileNo;
		obj.remarks = 			document.getElementById("remarks").value;
		obj.creationDate = 	new Date();
		obj.userType = {learner:true};

		Meteor.call("createLearnerAccount2", obj, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>update student creation SUCCESS MSG");
				Session.set('updateStudentAddSuccessMessage', 'Successfully created')
		        Meteor.setTimeout(function(){Session.set('updateStudentAddSuccessMessage', false);}, 3000);
			} else {
      			console.log(">>>update student creation FAILURE MSG");
			    Session.set('errorStudentAddMessage', 'Account Creation Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorStudentAddMessage', false);}, 3000);
			}
		});
		console.log("Sys: Student Information Saved");
	}
});

Template.registerForCourse.events({
	"click #submitSignUpButton" : function createStudentEventHandler(e, template) {
		console.log("Sys: Collect Student Information");
		Session.set('errorWebsiteSignUpMessage', false);
		delete Session.keys['displayAlertWebsite'];
		
		try {

			//TODO: Validation of input		
			var obj = new Object();
			var fName = 		document.getElementById("pfirstName").value;
	 		var lName = 		document.getElementById("plastName").value;
	 		var fullName = fName + " " + lName;
	 		obj.fullName = fullName;

	 		var gender= $(template.find('input:radio[id=pgender]:checked')).val();
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
	 		var grpId = $(template.find('input:radio[id=groupUserSignup]:checked')).val();

	 		obj.remarks = 			"Online Registration for " + grpId;
			obj.userType = {learner:true};
			obj.creationDate = 	new Date();

			console.log("Loading: " + obj);
			// Meteor.call("createLearnerAccount2", obj);
			Meteor.call("createLearnerAccount2", obj, function (err, result) {
	      		if (err) {
					console.log(">>>Course Signup FAILURE MSG");
				    Session.set('errorWebsiteSignUpMessage', 'Course Signup Failed: ' + err.reason);
				    $('html,body').scrollTop(0);
				    Meteor.setTimeout(function(){Session.set('errorWebsiteSignUpMessage', false);}, 6000);
				} else {
					console.log(">>>Course Signup SUCCESS, display alert");
					Session.set('displayAlertWebsite', true);
					$('html,body').scrollTop(0);
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
		Meteor.call("deleteUsers2", this._id, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>student delete SUCCESS MSG");
				Session.set('updateStudentAddSuccessMessage', 'Successfully deleted')
		        Meteor.setTimeout(function(){Session.set('updateStudentAddSuccessMessage', false);}, 3000);
			} else {
      			console.log(">>>student delete FAILURE MSG");
			    Session.set('errorStudentAddMessage', 'Account Deletion Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorStudentAddMessage', false);}, 3000);
			}
		});
	}
});

Template.viewParticularsForm.events({
	"click #editStudAcct" : function viewStudentDetailsEventHandler(e) {
		console.log("Updating Student Information...");
		//TODO: Validation of input
		var email = document.getElementById(this._id+"_email").value;
		var sMobileNo = document.getElementById(this._id+"_mobileNo").value;
		var sRemark = document.getElementById(this._id+"_remarks").value;
		var userIDType = document.getElementById(this._id+"_userIDType").value;
		var idNo = document.getElementById(this._id+"_userID").value;
		var nationality = document.getElementById(this._id+"_nationality").value;
		var qualification = document.getElementById(this._id+"_qualification").value;		
		// var scompName = document.getElementById("compName").value;
		// var scompOfficeNo = document.getElementById("compOfficeNo").value;		
		var snokName = document.getElementById(this._id+"_nokName").value;		
		var snokReln = document.getElementById(this._id+"_nokReln").value;		
		var snokTel =  document.getElementById(this._id+"_nokTel").value;
		
		Meteor.call("editLearnerAccount", this._id, email, sRemark, sMobileNo, qualification, nationality, snokName, snokTel, snokReln, userIDType, idNo, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>update student SUCCESS MSG");
				Session.set('updateStudentAddSuccessMessage', 'Successfully updated')
		        Meteor.setTimeout(function(){Session.set('updateStudentAddSuccessMessage', false);}, 3000);
			} else {
      			console.log(">>>update student FAILURE MSG");
			    Session.set('errorStudentAddMessage', 'Account Update Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorStudentAddMessage', false);}, 3000);
			}
		});
		console.log(">> Completed");
	}
});