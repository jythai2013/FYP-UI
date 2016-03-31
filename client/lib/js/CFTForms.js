Template.CFTRespo.helpers({

	"lspForms": function() {
		var array = new Array();

		var cursor = LSPSurvey.find({}).fetch();
		console.log(cursor);
		cursor.forEach(function(entry){
			var obj = new Object();
			obj.category = entry.formType;
			obj.assessmentDate = entry.assessmentDate;
			if(entry.formType === "Course"){
				var id = entry.assessedOn;
				var courseCode = Courses.findOne({_id:id}).courseCode;
				obj.assessedOn = courseCode;
			} else if(entry.formType === "Facility"){
				var id = entry.assessedOn;
				var facilityName = Facilities.findOne({_id:id}).fac;
				obj.assessedOn = facilityName;
			}else{
				var id = entry.assessedOn;
				var trainerFullName = Meteor.users.findOne({_id: id});
				obj.assessedOn = trainerFullName;
			}
			obj.assessedBy = entry.assessedBy;
			console.log(obj);
			array.push(obj);
		});

		return array;
	}

});

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
		var assessedBy = Meteor.user().fullName;
		// var today = new Date();


		var mmlookup = [];
		mmlookup.push("Jan");
		mmlookup.push("Feb");
		mmlookup.push("Mar");
		mmlookup.push("Apr");
		mmlookup.push("May");
		mmlookup.push("Jun");
		mmlookup.push("Jul");
		mmlookup.push("Aug");
		mmlookup.push("Sep");
		mmlookup.push("Oct");
		mmlookup.push("Nov");
		mmlookup.push("Dec");
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var mmm = mmlookup[mm-1];

		if(dd<10) {
				dd='0'+dd
		} 

		if(mm<10) {
				mm='0'+mm
		} 

		today = dd+'-'+mmm+'-'+yyyy;



		Meteor.call("createNewLSPForm", courseID, "Course", assessedBy, today);
				
		var lspID = LSPSurvey.findOne({assessedOn:courseID});
		console.log(lspID);
		//substitute the "document.getElementById("courseLSPSubject").value" with lspID when done
		window.location.assign(e.currentTarget.href + document.getElementById("courseLSPSubject").value);
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
		var assessedBy = Meteor.user().fullName;
		

		var mmlookup = [];
		mmlookup.push("Jan");
		mmlookup.push("Feb");
		mmlookup.push("Mar");
		mmlookup.push("Apr");
		mmlookup.push("May");
		mmlookup.push("Jun");
		mmlookup.push("Jul");
		mmlookup.push("Aug");
		mmlookup.push("Sep");
		mmlookup.push("Oct");
		mmlookup.push("Nov");
		mmlookup.push("Dec");
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var mmm = mmlookup[mm-1];

		if(dd<10) {
				dd='0'+dd
		} 

		if(mm<10) {
				mm='0'+mm
		} 

		today = dd+'-'+mmm+'-'+yyyy;

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
		var assessedBy = Meteor.user().fullName;
		
		
		var mmlookup = [];
		mmlookup.push("Jan");
		mmlookup.push("Feb");
		mmlookup.push("Mar");
		mmlookup.push("Apr");
		mmlookup.push("May");
		mmlookup.push("Jun");
		mmlookup.push("Jul");
		mmlookup.push("Aug");
		mmlookup.push("Sep");
		mmlookup.push("Oct");
		mmlookup.push("Nov");
		mmlookup.push("Dec");
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var mmm = mmlookup[mm-1];

		if(dd<10) {
				dd='0'+dd
		} 

		if(mm<10) {
				mm='0'+mm
		} 

		today = dd+'-'+mmm+'-'+yyyy;

		Meteor.call("createNewLSPForm", trainerID, "Trainer", assessedBy, today);

		
		
		window.location.assign(e.currentTarget.href + document.getElementById("trainerLSPSubject").value);
	}
});

