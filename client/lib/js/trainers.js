// Trainer ///////////////////////////////////////////////////////////////////////
Template.trainerIndex.helpers({
	"displayTrainerName" : function displayTrainerName(e) {
		Meteor.user().fullName;
	}
});

Template.trainerList.helpers({
	"trainers" : function trainerList(e) {
		return Meteor.users.find({userType:{"trainer":true}});
	}
});

Template.addTrainer.helpers({
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
		console.log("Sys: Collect Trainer Information");

		//TODO: Validation of input		
		var obj = new Object();
		obj.fullName = 		document.getElementById("sName").value;
		obj.mobileNo = 			document.getElementById("mobileNo").value;
		obj.email = 				document.getElementById("email").value;
		obj.userIDType = 				document.getElementById("trainerType").value;

		obj.userID = 					document.getElementById("idNo").value;
		console.log(document.getElementById("idNo").value);
		obj.nationality = 	document.getElementById("nationality").value;
		obj.proficiency = 		document.getElementById("proficiency").value;
		obj.password = 			obj.mobileNo;
		var selected = template.findAll("input[type=checkbox]:checked");
		var array = _.map(selected, function(item) {
		     return item.defaultValue;
		});
		obj.speciality = array;
		obj.userType = {trainer:true};

		Meteor.call("createTrainerAccount", obj);
		console.log("Sys: Trainer Information Saved");
	}
});

Template.viewTrainerParticulars.events({
	"click #editTrainerAcctButton" : function editTrainerEventHandler(event, template) {
		console.log("Sys: trainers.js >> Collect Trainer Information" + this._id);

		//TODO: Validation of input		
		var mobileNo = 				$("#"+this._id+" #mobileNo")[0].value;
		var nationality = 		$("#"+this._id+" #nationality")[0].value;
		var proficiency = 		$("#"+this._id+" #proficiency")[0].value;
		// var selected = template.findAll("input[type=checkbox]:checked");
		// var array = _.map(selected, function(item) {
		//      return item.defaultValue;
		// });
		//obj.speciality = array;

		console.log(mobileNo);
		console.log(nationality);
		console.log(proficiency);
		Meteor.call("editTrainerAccount", this._id, mobileNo, nationality, proficiency);
		console.log("Sys: Trainer Information Updated");
	}
});

Template.deleteTrainerForm.events({
	"click #deleteTrainerButton" : function deleteTrainerEventHandler(e) {
		console.log(this._id);
		Meteor.call("deleteUsers2", this._id);
	}
});