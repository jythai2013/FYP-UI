
Deps.autorun(function () {
	Meteor.subscribe('images');
	Meteor.subscribe('userData');
	Meteor.subscribe('sessionsData');
	Meteor.subscribe('facilitiesData', function(e){
     //Set the reactive session as true to indicate that the data have been loaded
     console.log("READY!!");
     console.log(e);
		 Session.set('facilitiesData_data_loaded', true); 
  }););
});