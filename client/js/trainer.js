//TODO: RUD timeslots (C is done)

Template.setTimeslots.events({
	"submit #addTimeslotForm": function(e){
		e.preventDefault();
		// console.log(e);
		// console.log(this);
		startTimeInput = document.getElementById("addTimeslotStartTime");
		endTimeInput = document.getElementById("addTimeslotEndTime");
		console.log(startTimeInput.value);
		console.log(endTimeInput.value);
		Meteor.call("createTimeslot", startTimeInput.value, endTimeInput.value);
	}
});