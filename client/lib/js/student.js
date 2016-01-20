Template.studentList.helpers({

	"students" : function studentList(e) {
		return Meteor.users.find({userType:{"learner":true}});
	}
});

Template.usersSearchBox.helpers({
  // usersIndex: function(){
		// console.log(UsersIndex);
		// return () => UsersIndex
	// }
	usersIndex : () => UsersIndex
});

Template.viewCredentialsForm.helpers({
	"currentStud" : function listStudCredentialsEventHandler(e) {
		var studEmail = Session.get('currentStudEmail');
		//Session.set('currentCourseCode', null);
		var currentStudent = Meteor.users.findOne({userType:{"learner":true}, email: studEmail});

		//console.log(currentCode + " current codes bitch");
		//console.log(currentCourse);
		console.log(currentStudent);
		return currentStudent;
	}
});

Template.viewCredentialsForm.events({
	"click #editStudAcct" : function viewCourseDetailsEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		//TODO: Validation of input
		var sMobile = document.getElementById("studMobile").value;
		var sAddr = document.getElementById("studAddr").value;
		var sRemarks = document.getElementById("studRemarks").value;

		console.log("here8");
		Meteor.call("editLearnerAccount", sEmail, sMobile, sAddr, sRemarks);
	
		  //modal.find('.modal-title').text('New message to ' + recipient)
		  //modal.find('.modal-body input').val(recipient)
	}
});

Template.studentList.events({
	"click #viewStudCredentialsButton" : function viewCourseDetailsEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		console.log(this.email);

		Session.set('currentStudEmail', this.email);
		console.log(this.email + " after settting in session");
		  //modal.find('.modal-title').text('New message to ' + recipient)
		  //modal.find('.modal-body input').val(recipient)
	}
});

Template.addStudentAcctForm.events({
	"click #addStudentAcctButton" : function createCourseEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		console.log("here1");

		//TODO: Validation of input
		var cFirstName = document.getElementById("studFirstName").value;
		var cLastName = document.getElementById("studLastName").value;
		var cEmail = document.getElementById("studEmail").value;
		var cPassword = document.getElementById("studPassword").value;
		var cMobile = document.getElementById("mobileNo").value;
		var cAddr = document.getElementById("studAddr").value;
		var cRemarks = document.getElementById("studRemarks").value;

		console.log("here2");
		Meteor.call("createLearnerAccount", cEmail, cPassword, cFirstName, cLastName, cMobile, cAddr, cRemarks);
	}
});

Template.deleteStudentForm.events({
	"click #deleteStudentButton" : function deleteStudentEventHandler(e) {
			console.log(this._id);
			// Meteor.call("deleteLearnerAccount", this._id);
			Meteor.call("deleteUsers", this._id);
	}
});