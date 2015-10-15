
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

Template.facilityBooking.helpers({
  facilities: function () {
    return Facilities.find(); // Where Images is an FS.Collection instance
  },
	
	facilitySearchResult:function(){
		// IfacType = Session.get("FacilitySearch_facType");
		// Icapacity = Session.get("FacilitySearch_capacity");
		// Iinput_date_begining = Session.get("FacilitySearch_input_date_begining");
		// Iinput_date_end = Session.get("FacilitySearch_input_date_end");
		// Iinput_time_beginning = Session.get("FacilitySearch_input_time_beginning");
		// Iinput_time_end = Session.get("FacilitySearch_input_time_end");
		results = new Array();
		
		IfacType = document.getElementById("facType");
		Icapacity = document.getElementById("capacity");
		// Iinput_date_begining = document.getElementById("input_date_begining");
		// Iinput_date_end = document.getElementById("input_date_end");
		// Iinput_time_beginning = document.getElementById("input_time_beginning");
		// Iinput_time_end = document.getElementById("input_time_end");
		
		matchingFacilities = Facilities.find({"facType":IfacType, "capacity": {$gte : Icapacity});
		matchingFacilities.forEach(function(facility){
			available = findIfFacilityIsAvailable(facility, startDate, endDate, timeStart, timeEnd)
			if(available) results.push(facility);
		});
	
		// // return array of my messages
		// var myMessages = Messages.find({userId: Session.get('myUserId')}).fetch();

		// // create a new message
		// Messages.insert({text: "Hello, world!"});

		// // mark my first message as "important"
		// Messages.update(myMessages[0]._id, {$set: {important: true}});

		
		
		return Facilities.find({"facType":IfacType, "capacity": {$gte : Icapacity});
	}
});