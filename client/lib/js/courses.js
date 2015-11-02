Template.courseList.helpers({

	"courses" : function listCourseEventHandler(e) {
		console.log("here");

		return Courses.find({});
	}
});

Template.viewCourseForm.helpers({

	"currentCourseCode" : function listCourseEventHandler(e) {
		console.log("herecourse");
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
		console.log(this.courseCode);

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
		console.log("here1");

		//TODO: Validation of input
		var cName = document.getElementById("cNewName").value;
		var cCode = document.getElementById("cNewCode").value;
		var cFee = document.getElementById("cNewFee").value;
		var cNoOfSessions = document.getElementById("cNewNoOfSessions").value;
		var cDescription = document.getElementById("cNewDesc").value;
		var cTrainers = document.getElementById("cNewTrainers").value;
		var cType = document.getElementById("cNewType").value;
		var cMin = document.getElementById("cNewMin").value;
		var cMax = document.getElementById("cNewMax").value;

		console.log("here8");
		Meteor.call("createCourse", cName, cCode, cFee, cNoOfSessions, cTrainers, cDescription, cType,cMin,cMax);
	}


});

Template.deleteCourse.events({
	"click #deleteCourseButton" : function deleteCourseEventHandler(e) {
			console.log(this._id);
			Meteor.call("deleteCourse", this._id);
	}
});