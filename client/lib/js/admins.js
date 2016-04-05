function getRadioValue(theRadioGroup)
{
    var elements = document.getElementsByName(theRadioGroup);
    for (var i = 0, l = elements.length; i < l; i++)
    {
        if (elements[i].checked)
        {
            return elements[i].value;
        }
    }
}

// ADMIN ///////////////////////////////////////////////////////////////////////
Template.topbar.helpers({
	'displayUserName': function retrieveAdminName(e) {
		return Meteor.user().fullName;
	}
});

Template.administratorList.helpers({
	"administrators" : function adminList(e) {
		return Meteor.users.find({"userType.admin": true});
	}
});

Template.administratorList.helpers({
	"checkIsTrainer" : function adminList(e) {
		// console.log(this.userType.trainer);
		return this.userType.trainer === true;
	}
});

Template.viewAdminParticulars.helpers({
	"checkIsTrainer" : function adminList(e) {
		console.log("Check : " + this.fullName + ", " + this.userType.trainer);
		console.log(this.userType.trainer !== undefined);
		return this.userType.trainer !== undefined;
	}
});

Template.administratorList.helpers({
	"adminsCounter" : function adminList(e) {
		return Meteor.users.find({userType:{"admin":true}}).count();
	}
});

Template.viewAdminParticulars.events({
	"click #editAdminAccountButton" : function editAdminAccount(e) {
		var aid = this._id;
		var mobileNo = document.getElementById(aid+"_editMobileNo").value;
		var isTrainer = document.getElementById(aid+"_editIsTrainer").value;
		console.log(aid + " " +mobileNo + " " + isTrainer);
		Meteor.call("editAdminAccount", aid, mobileNo, isTrainer);
	}
});

Template.addAdminAcctForm.events({
	"click #addAdminAcctButton" : function createAdminEventHandler(event, template) {
		console.log("Sys: Collect Admin Information");
		//TODO: Validation of input
		var obj = new Object();
		var fullName = 	 document.getElementById("addName").value;
		obj.fullName = 	 fullName;
		var mNo = document.getElementById("addMobileNo").value;
		obj.mobileNo = mNo;
		var email = document.getElementById("addEmail").value;
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
		
		console.log("Sys: Admin Information Saved ("+fullName+","+mNo+","+email+",isTrainer:)"+isTrainer+">>>");
		Meteor.call("createAdminAccount", obj);
	}
});

Template.deleteAdminForm.events({
	"click #deleteAdminButton" : function deleteAdminEventHandler(e) {
		console.log(this._id);
		Meteor.call("deleteUsers2", this._id);
	}
});