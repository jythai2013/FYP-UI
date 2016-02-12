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
		var fullName = document.getElementById("sName").value;
		var mobileNo = document.getElementById("mobileNo").value;
		var email = document.getElementById("email").value;
		var password = mobileNo;

		var selected = template.findAll("input[type=checkbox]:checked");
		var array = _.map(selected, function(item) {
		     return item.defaultValue;
		});
		console.log("Access Rights Assigned: " + array);
		var adminAccessId = array;
		
		Meteor.call("createAdminAccount", email, password, fullName, mobileNo, adminAccessId);
		console.log("Sys: Admin Information Saved ("+fullName+","+mobileNo+","+email+","+password+","+adminAccessId+")");
	}
});

Template.deleteAdminForm.events({
	"click #deleteAdminButton" : function deleteAdminEventHandler(e) {
		console.log(this._id);
		Meteor.call("deleteUsers2", this._id);
	}
});