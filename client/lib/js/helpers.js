
// Template.CRUDCourses.helpers({
	// courses : function () {
		// return Courses.find({});
	// },
// });

// Template.home.helpers({
	// loggedIn_user : function () {
		// return Meteor.user();
	// }
// });

// Template.viewSessions.helpers({
	// sessions : function viewSessions() {
		// return Sessions.find({
			// trainerId : Meteor.user()._id
		// });
	// }
// });


// Template.course.helpers({
	// Session.get("target" + @_id);
	// editing : function () {
		// return Session.get("target" + _id);
	// }
// });

// Template.imagesView.helpers({
  // images: function () {
    // return Images.find(); // Where Images is an FS.Collection instance
  // }
// });

Template.facilityManagement.helpers({
	test: function(){
		return "test";
	},
	
  facilities: function () {
    return Facilities.find(); // Where Images is an FS.Collection instance
  },
	
	facilitySearchResult:function(){
		console.log("facilitySearchResult Start");
		results = new Array();
		
		IfacType = Session.get("facTypeSearch");
		Icapacity = Session.get("facCapacitySearch");
		Iinput_date_beginning = Session.get("facInput_date_beginingSearch");
		Iinput_date_end = Session.get("facInput_date_endSearch");
		Iinput_time_beginning = Session.get("facInput_time_beginningSearch");
		Iinput_time_end = Session.get("facInput_time_endSearch");
		
		
		
		var temptest = ["A","B","C"];
		temptest.forEach(function(e){console.log(e)});
		
		matchingFacilities = Facilities.find({"facType":IfacType, "capacity": {$gte : Icapacity}});
		// console.log("facilitySearchResult Facilities.find()");
		// console.log(Facilities.find().collection._docs._map);
		console.log("facilitySearchResult matchingFacilities");
		console.log(matchingFacilities.collection._docs._map);
		// while(Session.get("facilitiesData_data_loaded") != true) {}
		console.log("R1");
		console.log(IfacType);
		console.log(Icapacity);
		// Facilities.find({"facType":IfacType, "capacity": {$gte : Icapacity}}).forEach(function(facility){
		matchingFacilities.forEach(function(facility){
			console.log("AAAAAAAAAAAAAA");
			console.log(facility);
			available = findIfFacilityIsAvailable(facility, startDate, endDate, timeStart, timeEnd)
			console.log(available);
			if(available) results.push(facility);
		});
		console.log("R2");
	
		// // return array of my messages
		// var myMessages = Messages.find({userId: Session.get('myUserId')}).fetch();

		// // create a new message
		// Messages.insert({text: "Hello, world!"});

		// // mark my first message as "important"
		// Messages.update(myMessages[0]._id, {$set: {important: true}});

		// console.log("facilitySearchResult Icapacity");
		// console.log(Icapacity);
		console.log("facilitySearchResult results");
		console.log(results);
		
		console.log("facilitySearchResult End");
		
		return results;
		// return Facilities.find({"facType":IfacType, "capacity": {$gte : Icapacity}});
	}
});