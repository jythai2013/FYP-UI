Template.courseList.helpers({

	"courses" : function listCourseEventHandler(e) {
		console.log("here");

		return Courses.find({});
	}
});

Template.viewCourseForm.helpers({

	"currentCourseCode" : function listCourseEventHandler(e) {
		var currentCode = Session.get('currentCourseCode');
		//Session.set('currentCourseCode', null);
		var currentCourse = Courses.find({courseCode:currentCode}).fetch();

		console.log(currentCode + " current codes bitch");
		//console.log(currentCourse);
		console.log(currentCourse);
		return currentCourse[0];
	}
});


Template.viewCourseForm.events({
	"click #enterCoursePageButton" : function viewCoursePageEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		console.log(this.courseCode);

		Session.set('currentCourseCode', this.courseCode);
		  //modal.find('.modal-title').text('New message to ' + recipient)
		  //modal.find('.modal-body input').val(recipient)
	}
});

Template.courseList.events({
	"click #viewCourseDetailsButton" : function viewCourseDetailsEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		Session.set('currentCourseCode', this.courseCode);
		console.log(this.courseCode + " after settting in session");
		  //modal.find('.modal-title').text('New message to ' + recipient)
		  //modal.find('.modal-body input').val(recipient)
	}
});

Template.addCourseForm.events({
	"click #addCourseButton" : function createCourseEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }

		//TODO: Validation of input
		var cName = document.getElementById("cNewName").value;
		var cCode = document.getElementById("cNewCode").value;
		console.log( cCode +" cCode");
		var cFee = document.getElementById("cNewFee").value;
		var cNoOfSessions = document.getElementById("cNewNoOfSessions").value;
		var cDescription = document.getElementById("cNewDesc").value;
		var cType = document.getElementById("cNewType").value;
		var cMin = document.getElementById("cNewMin").value;
		var cMax = document.getElementById("cNewMax").value;

		console.log("here8");
		Meteor.call("createCourse", cName, cCode, cFee, cNoOfSessions, cDescription, cType,cMin,cMax);
	}


});

Template.editCourseForm.events({
	"click #editCourseButton" : function editCourseEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		console.log("editting");

		//TODO: Validation of input
		var cCode = document.getElementById("cCCode").value;
		var cName = document.getElementById("cCName").value;
		var cDesc = document.getElementById("cCDesc").value;
		var cSession = document.getElementById("cCSession").value;
		var cFees = document.getElementById("cCFees").value;
		var cMin = document.getElementById("cCMin").value;
		var cMax = document.getElementById("cCMax").value;
		var cType = document.getElementById("cCType").value;
		//var cTrainers = document.getElementById("cCTrainers").value;

		
		console.log("here8");
		Meteor.call("editCourse", cCode, cName, cDesc, cSession, cFees, cMin, cMax, cType);
	}


});

Template.deleteCourse.events({
	"click #deleteCourseButton" : function deleteCourseEventHandler(e) {
			console.log(this._id);
			Meteor.call("deleteCourse", this._id);
	}
});

Template.removeTrainer.events({
	"click #removeTrainerButton" : function removeTrainerEventHandler(e) {
			var removeCurrentTrainers = document.querySelectorAll('input[name="currentTrainers[]"]:checked');
			var removeCurrentTrainersArr = [];
			for(var x = 0, l = removeCurrentTrainers.length; x < l;  x++){
				removeCurrentTrainersArr.push(removeCurrentTrainers[x].value);
    		}

			Meteor.call("removeTrainer", removeCurrentTrainersArr);
	}
});

Template.addTrainer.events({
	"click #addTrainerButton" : function addTrainerEventHandler(e) {
			var addTrainers = document.getElementById("newTrainers").value;
			var addTrainersArr = [];
			for(var x = 0, l = addCurrentTrainers.length; x < l;  x++){
				addCurrentTrainersArr.push(addTrainers[x].value);
    		}

			Meteor.call("addTrainer", _id, addTrainersArr);
	}
});