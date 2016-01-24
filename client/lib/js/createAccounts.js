// ADMIN ///////////////////////////////////////////////////////////////////////

Template.administratorList.helpers({
	"administrators" : function adminList(e) {
		return Meteor.users.find({userType:{"admin":true}});
	}
});

Template.administratorList.helpers({
	"adminsCounter" : function adminList(e) {
		return Meteor.users.find({userType:{"admin":true}}).count();
	}
});

Template.viewAdminParticulars.events({
	"click #editAdminAccountButton" : function editAdminAccount(e) {
		var aid = document.getElementById("accessType").value;
		var mobileNo = document.getElementById("mobileNo").value;
		Meteor.call("editAdminAccount", mobileNo);
	}
});

Template.addAdminAcctForm.events({
	"click #addAdminAcctButton" : function createAdminEventHandler(event, template) {
		console.log("Sys: Collect Admin Information");
		//TODO: Validation of input
		var firstName = document.getElementById("firstName").value;
		var lastName = document.getElementById("lastName").value;
		var mobileNo = document.getElementById("mobileNo").value;
		var email = document.getElementById("email").value;
		var password = mobileNo;

		var selected = template.findAll("input[type=checkbox]:checked");
		var array = _.map(selected, function(item) {
		     return item.defaultValue;
		});
		console.log("Access Rights Assigned: " + array);
		var adminAccessId = array;
		
		Meteor.call("createAdminAccount", email, password, firstName, lastName, mobileNo, adminAccessId);
		console.log("Sys: Admin Information Saved ("+firstName+","+lastName+","+mobileNo+","+email+","+password+","+adminAccessId+")");
	}
});

Template.deleteAdminForm.events({
	"click #deleteAdminButton" : function deleteAdminEventHandler(e) {
		console.log(this._id);
		Meteor.call("deleteUsers", this._id);
	}
});




// STUDENT ///////////////////////////////////////////////////////////////////////

Template.studentList.helpers({
	"students" : function studentList(e) {
		return Meteor.users.find({userType:{"learner":true}});
	}
});

Template.studentList.helpers({
	"getStudentCount" : function countStudentList(e) {
		return Meteor.users.find({userType:{"learner":true}}).count();
	}
});

Template.addStudentAcctForm.events({
	"click #addStudentAcctButton" : function createStudentEventHandler(e) {
		console.log("Sys: Collect Student Information");

		//TODO: Validation of input
		// var firstName = 		document.getElementById("firstName").value;
		// var lastName = 			document.getElementById("lastName").value;
		// var gender = 				document.getElementById("gender").value;
		// var dob = 					document.getElementById("dob").value;
		// var mobileNo = 			document.getElementById("mobileNo").value;
		// var email = 				document.getElementById("email").value;
		// var idType = 				document.getElementById("idType").value;
		// var iDNo = 					document.getElementById("idNo").value;
		// var nationality = 	document.getElementById("nationality").value;
		// var code = 					document.getElementById("code").value;
		// var resAddr= 				document.getElementById("resAddr").value;
		// var qualification = document.getElementById("qualification").value;
		// var profi = 				document.getElementById("proficiency").value;
		// var nokName = 			document.getElementById("nokName").value;		
		// var nokReln = 			document.getElementById("nokReln").value;		
		// var nokTel = 				document.getElementById("nokTel").value;		
		// var nokAddr = 			document.getElementById("nokAddr").value;		
		// var nokPostalCode = document.getElementById("nokCode").value;		
		// var password = 			mobileNo;
		// var remarks = 			document.getElementById("remarks").value;
		
		var obj = new Object();
		obj.firstName = 		document.getElementById("firstName").value;
		obj.lastName = 			document.getElementById("lastName").value;
		obj.gender = 				document.getElementById("gender").value;
		obj.dob = 					document.getElementById("dob").value;
		obj.mobileNo = 			document.getElementById("mobileNo").value;
		obj.email = 				document.getElementById("email").value;
		obj.idType = 				document.getElementById("idType").value;
		obj.iDNo = 					document.getElementById("idNo").value;
		obj.nationality = 	document.getElementById("nationality").value;
		obj.code = 					document.getElementById("code").value;
		obj.resAddr= 				document.getElementById("resAddr").value;
		obj.qualification = document.getElementById("qualification").value;
		obj.profi = 				document.getElementById("proficiency").value;
		obj.nokName = 			document.getElementById("nokName").value;		
		obj.nokReln = 			document.getElementById("nokReln").value;		
		obj.nokTel = 				document.getElementById("nokTel").value;		
		obj.nokAddr = 			document.getElementById("nokAddr").value;		
		obj.nokPostalCode = document.getElementById("nokCode").value;		
		obj.password = 			obj.mobileNo;
		obj.remarks = 			document.getElementById("remarks").value;
		
		// console.log(obj);
		
		Meteor.call("createLearnerAccount2", obj);
		console.log("Sys: Student Information Saved");
	}
});

Template.deleteStudentForm.events({
	"click #deleteStudentButton" : function deleteStudentEventHandler(e) {
		console.log(this._id);
		Meteor.call("deleteUsers", this._id);
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





// Trainer ///////////////////////////////////////////////////////////////////////
Template.trainerList.helpers({
	"trainers" : function trainerList(e) {
		return Meteor.users.find({userType:{"trainer":true}});
	}
});

Template.trainerList.helpers({
	"getTrainerCount" : function countTrainerList(e) {
		return Meteor.users.find({userType:{"trainer":true}}).count();
	}
});

Template.addTrainerAcctForm.events({
	"click #addTrainerAcctButton" : function createTrainerEventHandler(event, template) {
		console.log("Sys: Collect trainer Information");
		var firstName = document.getElementById("firstName").value;
		var lastName = document.getElementById("lastName").value;
		var fullname = firstName + " " + lastName;
		var mobileNo = document.getElementById("mobileNo").value;
		var email = document.getElementById("email").value;
		var idType = document.getElementById("idType").value;
		var iDNo = document.getElementById("idNo").value;
		var nationality = document.getElementById("nationality").value;
		var selected = template.findAll("input[type=checkbox]:checked");
		var array = _.map(selected, function(item) {
		     return item.defaultValue;
		});
		var spec = array;

		console.log("Sending: " + email + ", " + fullname + ", " + mobileNo + ", " + idNo + ", " + nationality + ", " + spec);
		// 		'createTrainerAccount': function createTrainerAccount(semail, sname, sMobileNo, sIdNo, sNationality, sSpec){
		Meteor.call("createTrainerAccount", email, fullname, mobileNo, idNo, nationality, spec);
		console.log("Sys: Trainer Information Saved");
	}
});

Template.deleteTrainerForm.events({
	"click #deleteTrainerButton" : function deleteTrainerEventHandler(e) {
		console.log(this._id);
		Meteor.call("deleteUsers", this._id);
	}
});