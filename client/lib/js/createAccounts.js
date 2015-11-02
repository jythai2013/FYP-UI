
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
		var emailInput = document.getElementById("registerTrainer-Email");
		var passwordInput = document.getElementById("registerTrainer-Password");

		Meteor.call("createTrainerAccount", emailInput.value, passwordInput.value);
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

Template.registerAdmin.events({
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