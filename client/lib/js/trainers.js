// Trainer ///////////////////////////////////////////////////////////////////////
Template.trainerList.helpers({
	"trainers" : function trainerList(e) {
		return Meteor.users.find({userType:{"trainer":true}});
	}
});

Template.addClass.helpers({
	"trainers" : function trainerList(e) {
		return Meteor.users.find({userType:{"trainer":true}});
	}
});

Template.addTrainer.helpers({
	"trainersList" : function trainerList(e) {
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
		console.log("Sys: Collect Trainer Information");

		//TODO: Validation of input		
		var obj = new Object();
		obj.firstName = 		document.getElementById("firstName").value;
		obj.lastName = 			document.getElementById("lastName").value;
		obj.mobileNo = 			document.getElementById("mobileNo").value;
		obj.email = 				document.getElementById("email").value;
		obj.userIDType = 				document.getElementById("idType").value;
		obj.userID = 					document.getElementById("idNo").value;
		obj.nationality = 	document.getElementById("nationality").value;
		obj.proficiency = 		document.getElementById("proficiency").value;
		obj.password = 			obj.mobileNo;
		var selected = template.findAll("input[type=checkbox]:checked");
		var array = _.map(selected, function(item) {
		     return item.defaultValue;
		});
		obj.speciality = 			array;
		obj.userType = {trainer:true};

		Meteor.call("createTrainerAccount", obj);
		console.log("Sys: Trainer Information Saved");
	}
});

Template.deleteTrainerForm.events({
	"click #deleteTrainerButton" : function deleteTrainerEventHandler(e) {
		console.log(this._id);
		Meteor.call("deleteUsers2", this._id);
	}
});