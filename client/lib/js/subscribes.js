
Deps.autorun(function () {
	// Meteor.subscribe('images');
	Meteor.subscribe('userData');
	Meteor.subscribe('courseData');
	Meteor.subscribe('sessionsData');
	Meteor.subscribe('facilitiesData');
  Meteor.subscribe('bookingsData');
  Meteor.subscribe('groupsData');
  Meteor.subscribe('filesData');
  Meteor.subscribe('feedbackData');
  Meteor.subscribe('feedbackAnswersData');
  Meteor.subscribe('questionData');
  Meteor.subscribe('materialsData');
});