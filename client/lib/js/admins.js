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
		var isTrainer = this.userType.trainer;
		console.log("Check1 : " + this.fullName + ", " + isTrainer);
		console.log(isTrainer !== undefined);
		if (isTrainer !== undefined){
			return "Yes";
		} else {
			return "No";
		}
	}
});

Template.viewAdminParticulars.helpers({
	"checkIsTrainer2" : function adminList2(e) {
		var isTrainer = this.userType.trainer;
		console.log("Check2 : " + this.fullName + ", " + isTrainer);
		console.log(this.userType.trainer !== undefined);
		if (this.userType.trainer !== undefined){
			return true;
		} else {
			return false;
		}
	}
});

Template.sidebar.helpers({
	"checkIfIsTrainer" : function adminSidebar(e) {
		var isTrainer = Meteor.user().userType.trainer;
		console.log("Display trainer portal button? " + isTrainer !== undefined);
		if (isTrainer !== undefined){
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
		
		Meteor.call("editAdminAccount", aid, mobileNo, isTrainer, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>update profile SUCCESS MSG");
				Session.set('updateProfileSuccessMessage', 'Your profile has been updated')
		        Meteor.setTimeout(function(){Session.set('updateProfileSuccessMessage', false);}, 2000);
			} else {
				console.log(">>>update profile FAILURE MSG");
			    Session.set('errorUpdateProfileMessage', 'Update Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('updateProfileSuccessMessage', false);}, 2000);
			}
		});
	}
});

Template.viewAdminParticulars.events({
	"click #editAdminAccountButton" : function editAdminAccount(e) {
		var aid = this._id;
		var mobileNo = document.getElementById(aid+"_editMobileNo").value;
		var isTrainer = document.getElementById(aid+"_editIsTrainer").value;
		console.log(aid + " " +mobileNo + " " + isTrainer);
		Meteor.call("editAdminAccount", aid, mobileNo, isTrainer, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>update admin Particulars SUCCESS MSG");
				Session.set('updateAdminParticularsSuccessMessage', 'Successfully updated')
		        Meteor.setTimeout(function(){Session.set('updateAdminParticularsSuccessMessage', false);}, 2000);
			} else {
				console.log(">>>update admin Particulars FAILURE MSG");
			    Session.set('errorAdminParticularsMessage', 'Update Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorAdminParticularsMessage', false);}, 2000);
			}
		});
	}
});

Template.addAdminAcctForm.events({
	"click #addAdminAcctButton" : function createAdminEventHandler(event, template) {
		console.log("Sys: Collect Admin Information");
		//TODO: Validation of input
		var obj = new Object();
		var fullName = 	 document.getElementById("addFullName").value;
		var mNo = document.getElementById("addMobileNo").value;
		var email = document.getElementById("addAccountEmail").value;

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
		
		console.log("Sys: Admin Information Saved ("+fullName+","+mNo+","+email+",isTrainer:"+isTrainer+")>>>");
		// Meteor.call("createAdminAccount", obj);
		Meteor.call('createAdminAccount', obj, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>update admin creation SUCCESS MSG");
				Session.set('updateAdminAddSuccessMessage', 'Successfully added')
		        Meteor.setTimeout(function(){Session.set('updateAdminAddSuccessMessage', false);}, 2000);
			} else {
      			console.log(">>>update admin creation FAILURE MSG");
			    Session.set('errorAdminAddMessage', 'Account Creation Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorAdminAddMessage', false);}, 2000);
			}
		});
	}
});

Template.deleteAdminForm.events({
	"click #deleteAdminButton" : function deleteAdminEventHandler(e) {
		console.log(this._id);
		Meteor.call("deleteUsers2", this._id, function (err, result) {
      		if (!err) {
				// If run is okay
				console.log(">>>update admin delete SUCCESS MSG");
				Session.set('updateAdminDeleteSuccessMessage', 'Successfully deleted')
		        Meteor.setTimeout(function(){Session.set('updateAdminDeleteSuccessMessage', false);}, 2000);
			} else {
				console.log(">>>update admin delete FAILURE MSG");
			    Session.set('errorAdminDeleteMessage', 'Delete Failed: ' + err.reason);
			    Meteor.setTimeout(function(){Session.set('errorAdminDeleteMessage', false);}, 2000);
			}
		});
	}
});