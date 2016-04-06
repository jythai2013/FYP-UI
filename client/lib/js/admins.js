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
	"checkIsTrainer1" : function adminList1(userType) {
		console.log("Check1 : " + this.fullName + ", " + this.userType.trainer);
		console.log(this.userType.trainer !== undefined);
		if (this.userType.trainer !== undefined){
			console.log("adminList Yes");
			return "Yes";
		} else {
			console.log("adminList No");
			return "No";
		}
	}
});

Template.viewAdminParticulars.helpers({
	"checkIsTrainer2" : function adminList2(e) {
		console.log("Check2 : " + this.fullName + ", " + this.userType.trainer);
		console.log(this.userType.trainer !== undefined);
		if (this.userType.trainer !== undefined){
			return true;
		} else {
			return false;
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
		console.log("Check : " + this.fullName + ", " + this.userType.trainer);
		console.log(this.userType.trainer !== undefined);
		var isTrainer = true;
		if (this.userType.trainer === undefined){
			isTrainer = false;
		}
		Meteor.call("editAdminAccount", aid, mobileNo, isTrainer);
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
		var mNo = document.getElementById("addMobileNo").value;
		var email = document.getElementById("addEmail").value;
		
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