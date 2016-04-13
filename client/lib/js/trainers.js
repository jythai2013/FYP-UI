function getTrainerList()
{
    return Meteor.users.find({"userType.trainer":true});
}

// Trainer ///////////////////////////////////////////////////////////////////////
Template.trainerIndex.helpers({
	"displayTrainerName" : function displayTrainerName(e) {
		Meteor.user().fullName;
	}
});

Template.trainerList.helpers({
	"trainers" : function trainerList(e) {
		return getTrainerList();
	},

	"isAlsoAdmin" : function trainerList(e) {
		var checkUserType = this.userType.admin;
		console.log(this.fullName + " isAlsoAdmin>>> " +checkUserType);
		return checkUserType !== undefined;
	}
});

Template.addTrainer.helpers({
	"trainers" : function trainerList(e) {
		return getTrainerList();
	}
});

Template.trainerList.helpers({
	"getTrainerCount" : function countTrainerList(e) {
		return getTrainerList().count();
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
		obj.nationality = 	document.getElementById("addNationality").value;
		var pSelected = template.findAll("input[name=proficiency][type=checkbox]:checked");
		var pArray = _.map(pSelected, function(item) {
		     return item.defaultValue;
		});

		obj.proficiency = pArray;
		obj.password = 			obj.mobileNo;
		
		var selected = template.findAll("input[name=speciality][type=checkbox]:checked");
		var array = _.map(selected, function(item) {
		     return item.defaultValue;
		});
		obj.speciality = array;

		obj.userType = {trainer:true};

		Meteor.call("createTrainerAccount", obj, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>update trainer creation SUCCESS MSG");
				Session.set('updateTrainerAddSuccessMessage', 'Successfully added')
		        Meteor.setTimeout(function(){Session.set('updateTrainerAddSuccessMessage', false);}, 3000);
			} else {
      			console.log(">>>update trainer creation FAILURE MSG");
			    Session.set('errorTrainerAddMessage', 'Account Creation Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorTrainerAddMessage', false);}, 3000);
			}
		});
		console.log("Sys: Trainer Information Saved");
	}
});

Template.viewTrainerParticulars.helpers({
	"isChecked" : function selectSpecialityTrainerList(result) {
		try {
			var a = this.speciality.indexOf(result);
			if (a >= 0){			
				return true;
			} else {
				return false;
			}
		} catch (e){
			// do nothing
		}
	},

	"isChecked2" : function selectProficiencyTrainerList(result) {
		try {
			var a = this.proficiency.indexOf(result);
			if (a >= 0){			
				return true;
			} else {
				return false;
			}
		} catch (e){
			// do nothing
		}
	}
});

Template.viewTrainerParticulars.events({
	"click #editTrainerAcctButton" : function editTrainerEventHandler(event, template) {
		console.log("Sys: trainers.js >> Collect Trainer Information" + this._id);
		var aid = this._id;
		console.log("aid : " + aid);
		//TODO: Validation of input		
		var mobileNo = document.getElementById(aid+"mobileNo").value;
		var nationality = document.getElementById(aid+"nationality").value;

		var pSelected = template.findAll("input[name="+aid+"proficiency][type=checkbox]:checked");
		var pArray = _.map(pSelected, function(item) {
		     return item.defaultValue;
		});
		var proficiency = pArray;

		var selected = template.findAll("input[name="+aid+"speciality][type=checkbox]:checked");
		var array = _.map(selected, function(item) {
		     return item.defaultValue;
		});
		var speciality = array;

		Meteor.call("editTrainerAccount", this._id, mobileNo, nationality, proficiency, speciality, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>update trainer Particulars SUCCESS MSG");
				Session.set('updateTrainerParticularsSuccessMessage', 'Successfully updated')
		        Meteor.setTimeout(function(){Session.set('updateTrainerParticularsSuccessMessage', false);}, 3000);
			} else {
				console.log(">>>update trainer Particulars FAILURE MSG");
			    Session.set('errorTrainerParticularsMessage', 'Update Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorTrainerParticularsMessage', false);}, 3000);
			}
		});
		console.log("Sys: Trainer Information Updated");
	}
});

Template.deleteTrainerForm.events({
	"click #deleteTrainerButton" : function deleteTrainerEventHandler(e) {
		console.log(this._id);
		Meteor.call("deleteUsers2", this._id, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>update trainer delete SUCCESS MSG");
				Session.set('updateTrainerDeleteSuccessMessage', 'Successfully deleted')
		        Meteor.setTimeout(function(){Session.set('updateTrainerDeleteSuccessMessage', false);}, 3000);
			} else {
				console.log(">>>update trainer delete FAILURE MSG");
			    Session.set('errorTrainerDeleteMessage', 'Delete Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorTrainerDeleteMessage', false);}, 3000);
			}
		});
	}
});