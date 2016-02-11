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
		var verbose = !true;
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
		var currentCourse = Courses.find({courseCode:currentCode}).fetch();
		//console.log(currentCode + " current codes bitch");
		//console.log(currentCourse);
		return currentCourse[0];
	}
});

Template.course.helpers({

	"trainerList" : function(e) {
		var str =  window.location.href;
		//console.log(str + " = sign");
		var position = str.indexOf('=');
		//console.log(position + " = sign");
		//console.log(str + "stri");
		
		var currentCourse=str.substr(position+1);
		//console.log(currentCourse + "Code");

		var size = Courses.find({courseCode:currentCourse}).count();
		//console.log(size + " HERE size");
		var a =  Courses.findOne({courseCode:currentCourse}).courseTrainers;
		//console.log(a + " a");
		return Courses.findOne({courseCode:currentCourse}).courseTrainers;
		
	}
});

Template.removeTrainer.helpers({

	"trainer2" : function(e) {
		//console.log("here");
		//var currentCourse = Session.get('currentCourseCode');
		var str =  window.location.href;
		//console.log(str + " = sign");
		var position = str.indexOf('=');
		//console.log(position + " = sign");
		//console.log(str + "stri");
		
		var currentCourse=str.substr(position+1);
		//console.log(currentCourse + "Code");

		var size = Courses.find({courseCode:currentCourse}).count();
		//console.log(size + " size");
		return Courses.findOne({courseCode:currentCourse}).courseTrainers;
	}
});


Template.addTrainer.helpers({
	"noOfTimes": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('trainerTimes'); i++){
			fakeArray.push("a")
		}
    return fakeArray;
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
		var cNoOfHours = document.getElementById("cNewNoOfHours").value;
		var cDescription = document.getElementById("cNewDesc").value;
		var cType = document.getElementById("cNewType").value;
		var cFLR = document.getElementById("cNewFLR").value;

		console.log("here8");
		Meteor.call("createCourse", cName, cCode, cFee, cNoOfHours, cDescription, cType,cFLR);
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
		console.log(this.courseCode);
		var grouspID = Groups.find({courseCode:this.courseCode}).fetch();
		Meteor.call("deleteCourse", this._id);
		groupsID.forEach(function(entry) {
   			Meteor.call("deleteClass", entry._id);
		});
	}
});

Template.removeTrainer.events({
	"click #removeTrainerButton" : function removeTrainerEventHandler(e) {
		var removeCurrentTrainers = document.getElementsByName("currentTrainers");
    	console.log(removeCurrentTrainers.length+ " SIZE")

		var removeCurrentTrainersArr =  new Array();;
		for(var x = 0, l = removeCurrentTrainers.length; x < l;  x++){
			if (removeCurrentTrainers[x].checked){
				var trainerName = removeCurrentTrainers[x].value;
				console.log(trainerName);
				
				removeCurrentTrainersArr.push(trainerName);
				//removeCurrentTrainersArr[removeCurrentTrainersArr.length] = groupID;
				//Meteor.call("deleteGroup", groupID);
			}
    	}
    	console.log(removeCurrentTrainersArr.length+ " ARR SIZE")

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
		//var addTrainers = document.getElementsById("newTrainersC").value;
		var addTrainers = document.getElementsByName("newTrainersC");
		var addTrainersArr = new Array();
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
    	console.log(currentCourse+ " currnt course code");
		var meep = Courses.findOne({courseCode:currentCourse}); //TODO: the find returns a cursor, not a Group object. so you cant ._id it. need to iterate such as by fetch()[0] or use findOne
    	console.log(meep+ " courseID")
		var courseID = Courses.findOne({courseCode:currentCourse})._id; //TODO: the find returns a cursor, not a Group object. so you cant ._id it. need to iterate such as by fetch()[0] or use findOne
		
    	console.log(courseID+ " courseID")
    	console.log(addTrainersArr.length+ " SIZE")
		Meteor.call("addTrainer", courseID, addTrainersArr);
	},

	"click #addMoreTrainers" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var trainerTimes = Session.get('trainerTimes');
		 var noOfTimes = trainerTimes+1;
		 if(isNaN(trainerTimes)) noOfTimes = 1;
		 console.log("trainerTimes " + trainerTimes);
		 console.log("noOfTimes " + noOfTimes);
		 Session.set('trainerTimes', noOfTimes);
	},

	"click #removeThisTrainer" : function(e) {
		e.preventDefault();
        var trainerTimes = Session.get('trainerTimes');

        // noOfTimes = _.reject(salesInput, function(x) {
        //     return x.salesId == salesId;
        // });

		 
		 if(isNaN(trainerTimes)) noOfTimes = 1;
		 var noOfTimes = trainerTimes-1;
		 Session.set('trainerTimes', noOfTimes);
	}
});
