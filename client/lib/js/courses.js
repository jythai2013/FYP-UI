Template.courseList.helpers({

	"courses" : function listCourseEventHandler(e) {
		return Courses.find({});
	}
});

Template.viewCourseForm.helpers({

	"currentCourseCode" : function listCourseEventHandler(e) {
		var currentCode = Session.get('currentCourseCode');
		var currentCourse = Courses.find({courseCode:currentCode}).fetch();
		return currentCourse[0];
	}
});


Template.addTrainer.helpers({
	"noOfTimes": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('times'); i++){
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

	"click #addMoreTrainer" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var times = Session.get('times');
		 var noOfTimes = times+1;
		 if(isNaN(times)) noOfTimes = 1;
		 console.log("times " + times);
		 console.log("noOfTimes " + noOfTimes);
		 Session.set('times', noOfTimes);
	}
});

// Template.trainerAddDelete.events({
// 	"click #addMoreTrainers" : function() {
// 		 //var name = template.$(event.target).data('modal-template');
// 		 //e.preventDefault();

// 		 var times = Session.get('times');
// 		 var noOfTimes = times+1;
// 		 Session.set('times', noOfTimes);
// 	},

// 	"click #removeThisTrainer" : function() {
// 		//var salesId = Template.instance().$('.salesItem').attr('salesId');
//         var times = Session.get('times');

//         // noOfTimes = _.reject(salesInput, function(x) {
//         //     return x.salesId == salesId;
//         // });

// 		 var noOfTimes = times-1;
// 		 Session.set('times', noOfTimes);
// 	}

//});