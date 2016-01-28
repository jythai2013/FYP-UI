Template.facility.onRendered(function(){
	Session.set("facilitySearchName", null);
	Session.set("facilitySearchType", null);
	Session.set("facilitySearchLess", null);
	Session.set("facilitySearchEqua", null);
	Session.set("facilitySearchMore", null);
	Session.set("facilitySearchCaps", null);
});

Template.courseList.helpers({

  "courses" : function listFacilityEventHandler(e) {
		var verbose = true;
		var cCode = Session.get("courseSearchCode");
		var cType = Session.get("courseSearchType");
		var v = Courses.find({}).fetch();
		if(cCode != null && cCode != undefined && cCode.length > 0){
			v = v.filter(function(e){
				if(verbose){
					console.log(e);
					console.log(e.courseCode.toLowerCase().indexOf(cCode.toLowerCase())>-1);
				}
				return (e.courseCode.toLowerCase().indexOf(cCode.toLowerCase())>-1);
			});
		}
		if(verbose){
			console.log(cType);
		}
		if(cType != null && cType != undefined && cType.length > 0){
			v = v.filter(function(e){
				if(verbose){
					console.log(e);
					console.log(e.courseType.toLowerCase().indexOf(cType.toLowerCase()));
				}
				return (e.courseType.toLowerCase().indexOf(cType.toLowerCase()));
			});
		}
		if(verbose){
			console.log(v);
		}
		return v;
  }
});

Template.courseList.events({
	"click #filter" : function doSearch(e){
		// console.log(e);
		var cCode = document.getElementById("cSearchCode").value;
		var cType = document.getElementById("courseSearchType").value;
		Session.set("courseSearchCode", cCode);
		Session.set("courseSearchType", cType);
	}
});

Template.viewCourseForm.helpers({

	"currentCourseCode" : function listCourseEventHandler(e) {
		var currentCode = Session.get('currentCourseCode');
		//Session.set('currentCourseCode', null);
		var currentCourse = Courses.find({courseCode:currentCode}).fetch();
		//console.log(currentCode + " current codes bitch");
		//console.log(currentCourse);
		return currentCourse[0];
	}
});


Template.addTrainer.helpers({
	"times" : function listCourseEventHandler(e) {
		Session.set('times', 0);
	}
});

Template.courseList.events({
	"click #viewCourseDetailsButton" : function viewCourseDetailsEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
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

		//TODO: Validation of input
		var cName = document.getElementById("cNewName").value;
		var cCode = document.getElementById("cNewCode").value;
		console.log( cCode +" cCode");
		var cFee = document.getElementById("cNewFee").value;
		var cNoOfSessions = document.getElementById("cNewNoOfSessions").value;
		var cDescription = document.getElementById("cNewDesc").value;
		var cType = document.getElementById("cNewType").value;
		var cMin = document.getElementById("cNewMin").value;
		var cMax = document.getElementById("cNewMax").value;

		console.log("here8");
		Meteor.call("createCourse", cName, cCode, cFee, cNoOfSessions, cDescription, cType,cMin,cMax);
	}


});

Template.editCourseForm.events({
	"click #editCourseButton" : function editCourseEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		console.log("editting");

		//TODO: Validation of input
		var cCode = document.getElementById("cCCode").value;
		var cName = document.getElementById("cCName").value;
		var cDesc = document.getElementById("cCDesc").value;
		var cSession = document.getElementById("cCSession").value;
		var cFees = document.getElementById("cCFees").value;
		var cMin = document.getElementById("cCMin").value;
		var cMax = document.getElementById("cCMax").value;
		var cType = document.getElementById("cCType").value;
		//var cTrainers = document.getElementById("cCTrainers").value;

		
		console.log("here8");
		Meteor.call("editCourse", cCode, cName, cDesc, cSession, cFees, cMin, cMax, cType);
	}


});

Template.deleteCourse.events({
	"click #deleteCourseButton" : function deleteCourseEventHandler(e) {
			console.log(this._id);
			Meteor.call("deleteCourse", this._id);
	}
});

Template.removeTrainer.events({
	"click #removeTrainerButton" : function removeTrainerEventHandler(e) {
		var removeCurrentTrainers = document.getElementsByName("currentTrainers");

		var removeCurrentTrainersArr = [];
		for(var x = 0, l = removeCurrentTrainers.length; x < l;  x++){
			if (removeCurrentTrainers[x].checked){
				var trainerName = removeCurrentTrainers[x].value;
				console.log(trainerName);
				
				removeCurrentTrainersArr.push(trainerName);
				//removeCurrentTrainersArr[removeCurrentTrainersArr.length] = groupID;
				//Meteor.call("deleteGroup", groupID);
			}
    	}
    	console.log(removeCurrentTrainersArr.length+ " SIZE")

		//extract course
		var url =  window.location.href;
		var positionFirstEqual = url.indexOf('=');	
		var currentCourse=url.substring(positionFirstEqual+1);
		var groupID = Groups.findOne({courseCode:currentCourse, grpNum:grpNumber})._id; //TODO: the find returns a cursor, not a Group object. so you cant ._id it. need to iterate such as by fetch()[0] or use findOne


    	removeCurrentTrainersArr.forEach(function(entry) {
   			console.log(entry);
		});

		Meteor.call("removeTrainer", courseID, removeCurrentTrainersArr);
	}
});

Template.addTrainer.events({
	"click #addTrainerButton" : function addTrainerEventHandler() {
		var addTrainers = document.getElementById("newTrainersC").value;
		var addTrainersArr = [];
		for(var x = 0, l = addTrainers.length; x < l;  x++){
			addTrainersArr.push(addTrainers[x].value);
    	}

    	addTrainersArr.forEach(function(entry) {
   			console.log(entry);
		});

    	console.log(addTrainers+ " SIZE");

    	//extract course
		var url =  window.location.href;
		var positionFirstEqual = url.indexOf('=');	
		var currentCourse=url.substring(positionFirstEqual+1);
		var courseID = Groups.findOne({courseCode:currentCourse})._id; //TODO: the find returns a cursor, not a Group object. so you cant ._id it. need to iterate such as by fetch()[0] or use findOne

    	console.log(addTrainersArr.length+ " SIZE")
		Meteor.call("addTrainer", courseID, addTrainersArr);
	},


	"click #addNewTrainer" : function addMoreTrainerEventHandler() {
		 //var name = template.$(event.target).data('modal-template');
		 var times = Session.get('times');
		 Session.set('times', times+1);
	}
});

