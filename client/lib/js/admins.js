// ADMIN ///////////////////////////////////////////////////////////////////////
Template.topbar.helpers({
	'displayUserName': function retrieveAdminName(e) {
		return Meteor.user().fullName;
	}
});

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
		var fullName = document.getElementById("sName").value;
		var mobileNo = document.getElementById("mobileNo").value;
		var email = document.getElementById("email").value;

		var selected = template.findAll("input[type=checkbox]:checked");
		var array = _.map(selected, function(item) {
		     return item.defaultValue;
		});
		var isTrainer = document.getElementById("isTrainer").value;
		console.log("is Trainer? >" +isTrainer);
		var createTrainer = false;

		//console.log(isTrainer equals "Yes");
		// 	createTrainer = true;

		console.log("Access Rights Assigned: " + array);
		var adminAccessId = array;
		
		Meteor.call("createAdminAccount", email, fullName, mobileNo, adminAccessId, createTrainer);
		console.log("Sys: Admin Information Saved ("+fullName+","+mobileNo+","+email+","+adminAccessId+"isTrainer:)"+isTrainer+">>>");
	}
});

Template.deleteAdminForm.events({
	"click #deleteAdminButton" : function deleteAdminEventHandler(e) {
		console.log(this._id);
		Meteor.call("deleteUsers2", this._id);
	}
});