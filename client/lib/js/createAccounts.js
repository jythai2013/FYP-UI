
Template.registerCorporation.events({
	"submit #registerCorporation-Form" : function registerCorporation(event) {
		event.preventDefault();
		// if(Meteor.user.userType != "admin"){
		// alert("You are not an admin"); //TODO: make a nice message
		// return false;
		// }
		var emailInput = document.getElementById("registerCorporation-Email");
		var passwordInput = document.getElementById("registerCorporation-Password");

		Meteor.call("createTrainerAccount", emailInput.value, passwordInput.value);
	}
});

Template.registerTrainer.events({
	"submit #registerTrainer-Form" : function registerTrainer(event) {
		event.preventDefault();
		// if(Meteor.user.userType != "admin"){
		// alert("You are not an admin"); //TODO: make a nice message
		// return false;
		// }
		var emailInput = document.getElementById("registerTrainer-Email").value;
		var passwordInput = document.getElementById("registerTrainer-Password").value;
		// email, password, fFirstName, fLastName, ingender, inuserID, inuserIDType, inCompany, inAddress, inPostalCode, inDOB, inNationality, inLang, residenceTel, mobileTel, officeTel, emerContName, emerContContact, emerContAddress, emerContRel, fRemarks, tHighestQualification
		Meteor.call("createTrainerAccount", emailInput, passwordInput, fFirstName, fLastName, ingender, inuserID, inuserIDType, inCompany, inAddress, inPostalCode, inDOB, inNationality, inLang, residenceTel, mobileTel, officeTel, emerContName, emerContContact, emerContAddress, emerContRel, fRemarks, tHighestQualification);
	}
});

Template.registerLearner.events({
	"submit #registerLearner-Form" : function registerLearner(event) {
		event.preventDefault();
		// if(Meteor.user.userType != "admin"){
		// alert("You are not an admin"); //TODO: make a nice message
		// return false;
		// }
		var emailInput = document.getElementById("registerLearner-Email");
		var passwordInput = document.getElementById("registerLearner-Password");

		Meteor.call("createLearnerAccount", emailInput.value, passwordInput.value);
	}
});

Template.addAdminAcctForm.events({
	"click #addAdminAcctButton" : function registerAdmin(event) {
		event.preventDefault();
		alert();
		// if(Meteor.user.userType != "admin"){
		// alert("You are not an admin"); //TODO: make a nice message
		// return false;
		// }
		var emailInput = document.getElementById("adminEmail");
		var passwordInput = document.getElementById("adminPassword");

		Meteor.call("createAdminAccount", emailInput.value, passwordInput.value);
	}
});