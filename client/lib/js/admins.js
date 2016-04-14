Template.registerHelper('userHasAccess', function (portalName) {
	var a = Meteor.user();
    if (a !== undefined) {
      console.log('Logged in as: ' + Meteor.user().emails[0].address);
      console.log('isAdmin ' + Meteor.user().userType.admin);
      console.log('isTrainer ' + Meteor.user().userType.trainer);
      console.log('isLearner ' + Meteor.user().userType.learner);
      console.log('isSuper ' + Meteor.user().userType.super);
      console.log('portalName ' + portalName);
      return true;
    } else{
      console.log('isLearner ' + Meteor.user().userType.learner);
      return false;
    }
});

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

// Website//////////////////////////////////////////////////////////////////////
Template.courses.helpers({
	'whatColor': function whatColor(type) {
		console.log(type);
		if(type === "WSQ"){
			return "coursePP";
		} else if (type=="LSP"){
			return "courseBB";
		} else {
			return "courseGG";
		}
	}
});

Template.courseInfoIndvSignup.helpers({
 	'getClassesAvailable': function getClassesAvailable1(e) {
 		var groups = Groups.find({courseCode: this.courseCode}).fetch();
 		console.log("retrieve #ofGroups:" + groups.length);
 		return groups;
 	}
 });
 
 Template.websiteCourseDetails1.helpers({
 	'getClassesAvailable': function getClassesAvailable1(e) {
 		var groups = Groups.find({courseCode: this.courseCode}).fetch();
 		console.log("retrieve #ofGroups:" + groups.length);
 		return groups;
 	},

 	'retrieveDays': function getWebsiteDaysCourseDetails(e) {
 		var day = this.days;
 		var returnDays = "";
 		for (i= 0; i < day.length; i++){
 			returnDays += day[i];
 			if ((i+1) !== day.length){
 				returnDays += ",";
 			}
 		}
 		return returnDays;
 	}
 });

  Template.websiteCourseDetailsForm1.helpers({
 	'retrievePrereq': function getWebsitePreReqCourseDetails(e) {
 		var pReq = this.prerequisite;
 		if (pReq !== undefined){
	 		var array = [];
	 		for (i= 0; i < pReq.length; i++){
	 			array.push({key: pReq[i]});
	 		}
	 		console.log(array);
	 		return array;
	 	}
 	},

 	'whatColor': function whatColor(type) {
		console.log(type);
		if(type === "WSQ"){
			return "coursePP";
		} else if (type=="LSP"){
			return "courseBB";
		} else {
			return "courseGG";
		}
	}
 }); 

 Template.courseInfoIndvSignup.helpers({
 	'retrievePrereq': function getWebsitePreReqCourseSignup(e) {
 		var pReq = this.prerequisite;
 		if (pReq !== undefined){
	 		var array = [];
	 		for (i= 0; i < pReq.length; i++){
	 			array.push({key: pReq[i]});
	 		}
	 		console.log(array);
	 		return array;
 		}
 	},

 	'retrieveDays': function getWebsiteDaysCourseSignup(e) {
 		var day = this.days;
 		var returnDays = "";
 		for (i= 0; i < day.length; i++){
 			returnDays += day[i];
 			if ((i+1) !== day.length){
 				returnDays += ",";
 			}
 		}
 		return returnDays;
 	}
 }); 

Template.registerForCourse.helpers({
	'checkSignupSuccess': function checkSignupSuccess(e) {
 		console.log(Session.get('displayAlertWebsite'));
 		var a = Session.get('displayAlertWebsite');
 		delete Session.keys['displayAlertWebsite'];
 		if (a!== undefined){
 			return true;
 		} else {
 			return false;
 		}
	},

	'countGroups': function checkDisplayEntrollmentForm(e) {
		if (this._id === undefined){
			return false;
		} else {
			return true;
		}
	}

});
 

// ADMIN ///////////////////////////////////////////////////////////////////////
Template.topbar.helpers({
	'displayUserName': function retrieveAdminName(e) {
		try {
			return Meteor.user().fullName;
		} catch (e){
			// do nothing
		}
	}
});

Template.addSuperAdmin.helpers({
	'notSuperUsers': function retrieveNotSuperUsers(e) {
		console.log(">>> notSuperUsers");
		try {
			return Meteor.users.find({"userType.admin": true, "userType.super": {$ne: true}});
		} catch (e){
			// do nothing
		}
	}
});

Template.addSuperAdmin.events({
	"click #addSuperAdminButton" : function addSuperEventHandler(e) {
		var adminId = document.getElementById("addSuperToID").value;
		console.log("addSuperAdminButton >>> " + adminId);
		Meteor.call("addSuperAccess", adminId, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>update access creation SUCCESS MSG");
				Session.set('updateAdminDeleteSuccessMessage', 'Successfully added super access')
		        Meteor.setTimeout(function(){Session.set('updateAdminDeleteSuccessMessage', false);}, 3000);
			} else {
				console.log(">>>update access creation FAILURE MSG");
			    Session.set('errorAdminDeleteMessage', 'Creation Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorAdminDeleteMessage', false);}, 3000);
			}
		});
	}
});
Template.superAdminSetting.helpers({
	'countSuper': function retrieveSuperCount(e) {
		try {
			var a = Meteor.users.find({"userType.super":true}).count();
			return (a < 3);
		} catch (e){
			return false;
		}
	},

	'isSuperUser': function checkIsSuperUser(e) {
		try {
			var a = Meteor.user().userType.super;
			if(a !== undefined){
				return true;
			} else {
				return false;
			}
		} catch (e){
			// do nothing
		}
	},

	'superUsers': function retrieveSuperUsers(e) {
		try {
			return Meteor.users.find({"userType.super":true});
		} catch (e){
			// do nothing
		}
	}
});

Template.superAdminSetting.events({
	"click #deleteSuperButton" : function deleteSuperEventHandler(e) {
		console.log("deleteSuperAccess >>> " + this._id);
		Meteor.call("deleteSuperAccess", this._id, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>delete super access SUCCESS MSG");
				Session.set('updateAdminDeleteSuccessMessage', 'Super Access Successfully Removed')
		        Meteor.setTimeout(function(){Session.set('updateAdminDeleteSuccessMessage', false);}, 3000);
			} else {
				console.log(">>>elete super access FAILURE MSG");
			    Session.set('errorAdminDeleteMessage', 'Delete Super Access Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorAdminDeleteMessage', false);}, 3000);
			}
		});
	}
});

Template.administratorList.helpers({
	"administrators" : function adminList(e) {
		return Meteor.users.find({"userType.admin": true});
	},


	'isSuperUser': function checkIsSuperUser2(e) {
		try {
			var a = Meteor.user().userType.super;
			if(a !== undefined){
				return true;
			} else {
				return false;
			}
		} catch (e){
			// do nothing
		}
	},

	'countSuper': function retrieveSuperCount2(e) {
		try {
			var a = Meteor.users.find({"userType.super":true}).count();
			return (a < 3);
		} catch (e){
			return false;
		}
	}
});

Template.administratorList.helpers({
	"checkIsTrainer1" : function adminList1(userType) {
		var isTrainer = this.userType.trainer;
		// console.log("Check1 : " + this.fullName + ", " + isTrainer);
		// console.log(isTrainer !== undefined);
		if (isTrainer !== undefined && isTrainer === true){
			return "Yes";
		} else {
			return "No";
		}
	}
});

Template.viewAdminParticulars.helpers({
	"checkIsTrainer2" : function adminList2(e) {
		var isTrainer = this.userType.trainer;
		// console.log("Check2 : " + this.fullName + ", " + isTrainer);
		// console.log(this.userType.trainer !== undefined);
		if (this.userType.trainer === undefined || this.userType.trainer === false){
			return false;
		} else {
			return true;
		}
	}
});

Template.sidebar.helpers({
	"checkIfIsTrainer" : function adminSidebar(e) {
		try {
			var isTrainer = Meteor.user().userType.trainer;
			// console.log("Display trainer portal button? " + isTrainer !== undefined);
			if (isTrainer === undefined || isTrainer === false){
				return false;
			} else {
				return true;
			}
		} catch (e){
			// do nothing
		}
	}
});

Template.administratorList.helpers({
	"adminsCounter" : function adminList(e) {
		return Meteor.users.find({userType:{"admin":true}}).count();
	}
});

Template.profilePage.events({
	"click #editAdminProfileButton" : function editAdminProfileAccount(e) {
		var aid = this._id;
		var mobileNo = document.getElementById("acctCell").value;
		// console.log("Check : " + this.fullName + ", " + this.userType.trainer);
		console.log(this.userType.trainer !== undefined);
		var isTrainer = true;
		if (this.userType.trainer === undefined || this.userType.trainer === false){
			isTrainer = false;
		}
		
		Meteor.call("editAdminAccount", aid, mobileNo, isTrainer, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>update profile SUCCESS MSG");
				Session.set('updateProfileSuccessMessage', 'Your profile has been updated')
		        Meteor.setTimeout(function(){Session.set('updateProfileSuccessMessage', false);}, 3000);
			} else {
				console.log(">>>update profile FAILURE MSG");
			    Session.set('errorUpdateProfileMessage', 'Update Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorUpdateProfileMessage', false);}, 3000);
			}
		});
	}
});

Template.viewAdminParticulars.events({
	"click #editAdminAccountButton" : function editAdminAccount(e) {
		var aid = this._id;
		var mobileNo = document.getElementById(aid+"_editMobileNo").value;
		var isTrainer = document.getElementById(aid+"_editIsTrainer").value;
		console.log(aid + " " + mobileNo + " " + isTrainer);
		Meteor.call("editAdminAccount", aid, mobileNo, isTrainer, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>update admin Particulars SUCCESS MSG");
				Session.set('updateAdminParticularsSuccessMessage', 'Successfully updated')
		        Meteor.setTimeout(function(){Session.set('updateAdminParticularsSuccessMessage', false);}, 3000);
			} else {
				console.log(">>>update admin Particulars FAILURE MSG");
			    Session.set('errorAdminParticularsMessage', 'Update Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorAdminParticularsMessage', false);}, 3000);
			}
		});
	}
});

Template.addAdminAcctForm.events({
	"click #addAdminAcctButton" : function createAdminEventHandler(event, template) {
		console.log("Sys: Collect Admin Information");
		//TODO: Validation of input
		var obj = new Object();
		var fullName = 	 document.getElementById("addFullName").value;
		var mNo = document.getElementById("addMobileNo").value;
		var email = document.getElementById("addAccountEmail").value;

		obj.fullName = 	 fullName;
		obj.mobileNo = mNo;
		obj.email = email;
		obj.password = mNo;

		var isTrainer = getRadioValue("addIsTrainer");
		
		if (isTrainer === "true") {
			obj.userType = {admin: true, trainer: true};
			console.log("isTrainer True");
		} else {
			obj.userType = {admin:true};
			console.log("isTrainer False");
		}
		
		console.log("Sys: Admin Information Saved ("+fullName+","+mNo+","+email+",isTrainer:"+isTrainer+")>>>");
		// Meteor.call("createAdminAccount", obj);
		Meteor.call('createAdminAccount', obj, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>update admin creation SUCCESS MSG");
				Session.set('updateAdminAddSuccessMessage', 'Successfully added')
		        Meteor.setTimeout(function(){Session.set('updateAdminAddSuccessMessage', false);}, 3000);
			} else {
      			console.log(">>>update admin creation FAILURE MSG");
			    Session.set('errorAdminAddMessage', 'Account Creation Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorAdminAddMessage', false);}, 3000);
			}
		});
	}
});

Template.deleteAdminForm.events({
	"click #deleteAdminButton" : function deleteAdminEventHandler(e) {
		console.log(this._id);
		Meteor.call("deleteUsers2", this._id, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>update admin delete SUCCESS MSG");
				Session.set('updateAdminDeleteSuccessMessage', 'Successfully deleted')
		        Meteor.setTimeout(function(){Session.set('updateAdminDeleteSuccessMessage', false);}, 3000);
			} else {
				console.log(">>>update admin delete FAILURE MSG");
			    Session.set('errorAdminDeleteMessage', 'Delete Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorAdminDeleteMessage', false);}, 3000);
			}
		});
	}
});