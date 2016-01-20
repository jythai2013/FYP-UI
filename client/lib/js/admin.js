Template.adminList.helpers({
	"trainers" : function adminList(e) {
		return Meteor.users.find({userType:{"admin":true}});
	}
});

Template.addAdminAcctForm.events({
	"click #addTrainerAcctButton" : function createAdminEventHandler(e) {
		e.preventDefault();
		console.log("Sys: Collect Admin Information");

		//TODO: Validation of input
		var firstName = document.getElementById("firstName").value;
		var lastName = document.getElementById("lastName").value;
		var gender = document.getElementById("gender").value;
		var mobileNo = document.getElementById("mobileNo").value;
		var email = document.getElementById("email").value;
		var idType = document.getElementById("idType").value;
		var iDNo = document.getElementById("idNo").value;
		var password = document.getElementById("password").value;
		var adminAccessId = document.getElementById("accessRightId").value;
		
		Meteor.call("createAdminAccount", email, password, firstName, lastName, gender, mobileNo, idType, idNo, adminAccessId);
		//Meteor.call("createNOKAccount", nokName, nokReln, nokTel, nokAddr, nokPostalCode);
		console.log("Sys: Admin Information Saved");
	}
});

Template.deleteAdminForm.events({
	"click #deleteAdminButton" : function deleteAdminEventHandler(e) {
		console.log(this._id);
		Meteor.call("deleteUsers", this._id);
	}
});