
Template.CFTRespo.events({
	"click #createNewCourseLSP" : function(e) {
        $("#createLSPCourseForm").modal("show");
	},	

	"click #createNewFacilityLSP" : function(e) {
        $("#createLSPFacilityForm").modal("show");
	},

	"click #createNewTrainerLSP" : function(e) {
        $("#createLSPTrainerForm").modal("show");
	}	
});

Template.createLSPCourseForm.helpers({

	"coursesList5": function() {
		return Courses.find({});
	}

});

Template.createLSPCourseForm.events({
	"click #generateCourseLSP" : function(e) {
		var courseID = document.getElementById("courseLSPSubject").value;
		var courseCode = document.getElementById("courseLSPSubject").value;
	}
});

Template.createLSPFacilityForm.helpers({

	"facilitiesList5": function() {
		return Facilities.find({});
	}

});

Template.createLSPFacilityForm.events({
	"click #generateFacilityLSP" : function(e) {
		var facilityID = document.getElementById("facilityLSPSubject").value;
	}
});


Template.createLSPTrainerForm.helpers({
	"trainersList5": function() {
		return Meteor.users.find({userType:{"trainer":true}});
	}

});

Template.createLSPTrainerForm.events({
	"click #generateTrainerLSP" : function(e) {

		var trainerID = document.getElementById("trainerLSPSubject").value;
		var a = feedbackAnswers.find({assessedOn:trainerID}).length;
		console.log(a);
		for(i = 0; i < thisFeedbackQnOptions.length; i++){

		}

	}
});

