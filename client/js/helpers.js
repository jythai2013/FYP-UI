
Template.CRUDCourses.helpers({
	courses : function () {
		return Courses.find({});
	},
});

Template.home.helpers({
	loggedIn_user : function () {
		return Meteor.user();
	}
});

Template.viewSessions.helpers({
	sessions : function viewSessions() {
		return Sessions.find({
			trainerId : Meteor.user()._id
		});
	}
});


Template.course.helpers({
	// Session.get("target" + @_id);
	editing : function () {
		return Session.get("target" + _id);
	}
});

Template.imagesView.helpers({
  images: function () {
    return Images.find(); // Where Images is an FS.Collection instance
  }
});