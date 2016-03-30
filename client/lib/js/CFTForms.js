
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
	},
	"courseLSPQns": function() {
		
		var fakeArray = new Array();

		
		for(i = 0; i < Session.get('radioFields'); i++){
			var obj = new Object();
			fakeArray.push("a")
		}
    	return fakeArray;

	}

});


// Template.courseLSPForm.onRendered(function(e){
// 	var courseID = Session.get("currentCourseIDLSPForm");
// 	Session.set("currentCourseIDLSPForm", courseID);
// });


Template.createLSPCourseForm.helpers({

	"courseID2": function() {
		return Session.get("currentCourseIDLSPForm");
	}
});

Template.createLSPFacilityForm.helpers({

	"facID2": function() {
		return Session.get("currentFacilityIDLSPForm");
	}
});

Template.createLSPCourseForm.events({
	"click #generateCourseLSP" : function(e) {
		var courseID = document.getElementById("courseLSPSubject").value;
		console.log(courseID);
		var courseCode = Courses.findOne({_id:courseID}).courseCode;
		Session.set("currentCourseIDLSPForm", courseID);
		var assessedBy = Meteor.user().fullname;
		var today = new Date();

		Meteor.call("createNewLSPForm", courseID, "Course", assessedBy, today);
				
		var lspID = LSPSurvey.findOne({assessedOn:courseID});
		console.log(lspID);
		//substitute the "document.getElementById("courseLSPSubject").value" with lspID when done
		window.location.assign(e.currentTarget.href + courseID);
	}
});


Template.courseLSPRatings.numbering = function() {
  return _.map(_.range(1, 5));
};



Template.createLSPFacilityForm.helpers({

	"facilitiesList5": function() {
		return Facilities.find({});
	}

});

Template.createLSPFacilityForm.events({
	"click #generateFacilityLSP" : function(e) {
		var facilityID = document.getElementById("facilityLSPSubject").value;
		
		
		// var facID = Facilities.findOne({_id:courseID}).courseCode;
		Session.set("currentFacilityIDLSPForm", facilityID);
		var assessedBy = Meteor.user().fullname;
		var today = new Date();

		Meteor.call("createNewLSPForm", facilityID, "Facility", assessedBy, today);
				
		// var lspID = LSPSurvey.findOne({assessedOn:courseID});
		// console.log(lspID);
		//substitute the "document.getElementById("courseLSPSubject").value" with lspID when done
		
		window.location.assign(e.currentTarget.href + document.getElementById("facilityLSPSubject").value);
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
		Session.set("currentTrainerIDLSPForm", trainerID);
		var assessedBy = Meteor.user().fullname;
		var today = new Date();

		Meteor.call("createNewLSPForm", trainerID, "Trainer", assessedBy, today);

		
		
		window.location.assign(e.currentTarget.href + document.getElementById("trainerLSPSubject").value);
	}
});

