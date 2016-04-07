Template.facility.onRendered(function(){
	Session.set("facilitySearchName", null);
	Session.set("facilitySearchType", null);
	Session.set("facilitySearchLess", null);
	Session.set("facilitySearchEqua", null);
	Session.set("facilitySearchMore", null);
	Session.set("facilitySearchCaps", null);
});


/*SEARCH START*/
/*SEARCH START*/
/*SEARCH START*/
/*SEARCH START*/
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
				return (e.courseType.toLowerCase().indexOf(cType.toLowerCase())>-1);
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
		console.log(cType);
		Session.set("courseSearchCode", cCode);
		Session.set("courseSearchType", cType);
	},
	
	"keydown #cSearchCode" : function doSearch(e){
		// console.log(e);
		setTimeout(function(){			
			var cCode = document.getElementById("cSearchCode").value;
			var cType = document.getElementById("courseSearchType").value;
			console.log(cType);
			Session.set("courseSearchCode", cCode);
			Session.set("courseSearchType", cType);
		}, 2)
	}
});
/*SEARCH END*/
/*SEARCH END*/
/*SEARCH END*/
/*SEARCH END*/

Template.viewCourseForm.helpers({

	"currentCourseCode" : function listCourseEventHandler(e) {
		var currentCode = Session.get('currentCourseCode');
		var currentCourse = Courses.find({courseCode:currentCode}).fetch();
		//console.log(currentCode + " current codes bitch");
		//console.log(currentCourse);
		return currentCourse[0];
	}
});

Template.addClassForm.helpers({

	"cCourse" : function(e) {
		// var currentCode = Session.get('currentCourseCode');
		// var currentCourse = Courses.find({courseCode:currentCode}).fetch();
		//console.log(currentCode + " current codes bitch");
		//console.log(currentCourse);
		return Courses.find({});
	}
});

Template.addCourseForm.helpers({
	
	"exisitingCourse" : function(e){
		return Courses.find({});
	}, 
	"noOfCourseReq" : function(e){
		var fakeArray = new Array();
		for(i = 0; i < Session.get('courseTimes'); i++){
			fakeArray.push("a")
		}
    	return fakeArray;
	}
});

Template.course.onRendered(function(e){
	var url =  window.location.href;
	var positionFirstEqual = url.indexOf('=');	
	var currentCourseEsc=url.substring(positionFirstEqual+1);
	console.log(currentCourseEsc+ " currnt course code escaped");
	var currentCourse=unescape(currentCourseEsc);
	Session.set("currentCourseCode", currentCourse);
	$('#cNewPrereq').select2();
});

Template.course.helpers({

	"trainerList" : function(e) {
		var currentCourse=Session.get("currentCourseCode");
		var size = Courses.findOne({courseCode:currentCourse});
		console.log(size);
		var a =  Courses.findOne({courseCode:currentCourse}).courseTrainers;

		var trainersArr = new Array();
		for(var x = 0, l = a.length; x < l;  x++){
			var obj = new Object();
			var entry = a[x].trainerID;
			obj.trainerID = entry;
			var trainer = Meteor.users.findOne({_id:entry});
    		obj.trainerName = trainer.fullName;

    		var classTaught = Groups.find({courseCode:currentCourse, "courseTrainers.trainerId":entry}).fetch();
    		

    		for(var i = 0, k = classTaught.length; i < k;  i++){
    			var classesTrainer = classTaught[i];
    			obj.courseCode = currentCourse;
    			obj.classesTaught = classesTrainer.grpNum;
    			console.log(obj.classesTaught);
    		}
			trainersArr.push(obj);
    	}


		return trainersArr;
		
	},
	"courseComponents" : function(e) {
		// var url =  window.location.href;
		// var positionFirstEqual = url.indexOf('=');	
		// var currentCourseEsc=url.substring(positionFirstEqual+1);
    	// console.log(currentCourseEsc+ " currnt course code escaped");
		var currentCourse=Session.get("currentCourseCode");
		var size = Courses.findOne({courseCode:currentCourse});
		console.log(size);
		var a =  Courses.findOne({courseCode:currentCourse}).components;

		var componentsArr = new Array();
		for(var x = 0, l = a.length; x < l;  x++){
			var obj = new Object();
			obj.componentName = a[x].component;
			obj.weightage = a[x].weightage;
			componentsArr.push(obj);
    	}

    	componentsArr.forEach(function(entry) {
   			console.log(entry + " full name");

		});

		return componentsArr;
		
	},
	"trainersOwnClass" : function(e) {
		console.log(this);
		var trainersClasses = new Array();
		var currentCourse=Session.get("currentCourseCode");
		var classTaught = Groups.find({courseCode:currentCourse, "courseTrainers.trainerId":this.trainerID}).fetch();
		for (var x = 0, l = classTaught.length; x < l;  x++){
			var obj = new Object();
			obj.classesTaught = classTaught[x].grpNum;
			trainersClasses.push(obj);
		}
		return trainersClasses;
		
	},
	"gotNoClass" : function(e) {
		console.log(this);
		var currentCourse=Session.get("currentCourseCode");
		var classTaught = Groups.find({courseCode:currentCourse, "courseTrainers.trainerId":this.trainerID}).fetch();
    	if(classTaught.length == 0 ){
			return true
    	}else {
    		return false;
    	}
		
		
	}
});

Template.addClass.helpers({
	"courseTrainers" : function trainerList(e) {
		
		var url =  window.location.href;
		var positionFirstEqual = url.indexOf('=');	
		var currentCourseEsc=url.substring(positionFirstEqual+1);
    	console.log(currentCourseEsc+ " currnt course code escaped");
		var currentCourse=unescape(currentCourseEsc);
		//console.log(currentCourse + "Code");

		//var size = Courses.find({courseCode:currentCourse}).count();
		var theCourse = Courses.findOne({courseCode:currentCourse});
		console.log(theCourse);
		var a =  Courses.findOne({courseCode:currentCourse}).courseTrainers;

		var trainersArr = new Array();
		for(var x = 0, l = a.length; x < l;  x++){
			var entry = a[x].trainerID;
			var trainer = Meteor.users.findOne({_id:entry});
			trainersArr.push(trainer);
    	}

    	trainersArr.forEach(function(entry) {
   			console.log(entry + " full name");

		});

		return trainersArr;
	}
});

Template.removeTrainer.helpers({

	"trainer2" : function(e) {
		//console.log("here");
		//var currentCourse = Session.get('currentCourseCode');
		
		var url =  window.location.href;
		var positionFirstEqual = url.indexOf('=');	
		var currentCourseEsc=url.substring(positionFirstEqual+1);
    	console.log(currentCourseEsc+ " currnt course code escaped");
		var currentCourse=unescape(currentCourseEsc);
		//console.log(currentCourse + "Code");

		var size = Courses.find({courseCode:currentCourse}).count();
		//console.log(size + " size");
		var courseTrainersID =  Courses.findOne({courseCode:currentCourse}).courseTrainers;
		var fakeArray = new Array();
		for (i = 0; i < courseTrainersID.length; i++){
			//var trainerName = Meteor.users.find({userType:{"trainer":true}}).count();
			//console.log(courseTrainersID[i]);
			//fakeArray.push(trainerName);

			fakeArray.push(Meteor.users.findOne({_id:courseTrainersID[i].trainerID}) );
		}
		//console.log(courseTrainersID);
		console.log(fakeArray);
		return fakeArray;
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
		// var cPrereq = document.getElementById("cNewPrereq").value;


		var cPrereq = document.getElementsByName("cNewPrereq");
		console.log(cPrereq +" adding PREREQ");
		var addPrereqArr = new Array();
		for(var x = 0, l = cPrereq.length; x < l;  x++){
   			console.log(cPrereq[x] + "cPrereq line 236");
			
			addPrereqArr.push(cPrereq[x].value);
    	}

    	addPrereqArr.forEach(function(entry) {
   			console.log(entry + "cPrereq");
		});


		var cGenre = document.getElementById("cNewGenre").value;

		console.log("here8");
		Meteor.call("createCourse", cName, cCode, cFee, cNoOfHours, cDescription, cType, cFLR, addPrereqArr, cGenre);
		var temp = Session.get("courseSearchCode");
		Session.set("courseSearchCode", "123");
		Session.set("courseSearchCode", temp);

	},
	"click #addMoreCourses" : function(e) {
		
		 e.preventDefault();

		 var courseTimes = Session.get('courseTimes');
		 var noOfCourses = courseTimes+1;
		 if(isNaN(courseTimes)) noOfCourses = 1;
		 console.log("courseTimes " + courseTimes);
		 console.log("noOfCourses " + noOfCourses);
		 Session.set('courseTimes', noOfCourses);
	},

	"click #removeMoreCourses" : function(e) {
		
		 e.preventDefault();

		 var courseTimes = Session.get('courseTimes');
		 var noOfCourses = courseTimes-1;
		 if(isNaN(courseTimes)) noOfCourses = 0;
		 console.log("courseTimes " + courseTimes);
		 console.log("noOfCourses " + noOfCourses);
		 Session.set('courseTimes', noOfCourses);
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
		
		var url =  window.location.href;
		var positionFirstEqual = url.indexOf('=');	
		var currentCourse=url.substring(positionFirstEqual+1);
		console.log(currentCourse);
		var _id = Courses.findOne({courseCode:currentCourse})._id;
		console.log(_id);

		var cCode = document.getElementById("cCCode").value;
		console.log(cCode);
		var cName = document.getElementById("cCName").value;
		var cDesc = document.getElementById("cCDesc").value;
		var cHours = document.getElementById("cCHour").value;
		var cFees = document.getElementById("cCFees").value;
		var cFLR = document.getElementById("cCFLR").value;
		var cGenre = document.getElementById("cCGenre").value;
		var cType = document.getElementById("cCType").value;
		//var cTrainers = document.getElementById("cCTrainers").value;

		
		console.log("here8");
		Meteor.call("editCourse", _id, cCode, cName, cDesc, cHours, cFees, cFLR, cGenre, cType);
		var newURL =url.substring(0, positionFirstEqual+1); ;
		window.location.assign(newURL +cCode);
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
		console.log(this);
		// this.trainerID
		var currentCourse=Session.get("currentCourseCode");
		Meteor.call("removeTrainer", currentCourse, this.trainerID);
	}
});

Template.addTrainer.events({
	"click #addTrainerButton" : function addTrainerEventHandler() {
		//var addTrainers = document.getElementsById("newTrainersC").value;
		var addTrainers = document.getElementsByName("newTrainersC");
		console.log(addTrainers +" adding trainers");
		var addTrainersArr = new Array();
		for(var x = 0, l = addTrainers.length; x < l;  x++){
   			console.log(addTrainers[x] + "addTrainers line 236");
			
			addTrainersArr.push(addTrainers[x].value);
    	}

    	addTrainersArr.forEach(function(entry) {
   			console.log(entry + "addTrainers");
		});

    	console.log(addTrainers.length+ " SIZE");

    	//extract course
		var url =  window.location.href;
		var positionFirstEqual = url.indexOf('=');	
		var currentCourseEsc=url.substring(positionFirstEqual+1);
    	console.log(currentCourseEsc+ " currnt course code escaped");
		var currentCourse=unescape(currentCourseEsc);

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

Template.addComponents.onRendered(function(){
	Session.set("componentsTimes", 1);
});

Template.addComponents.helpers({

	"noOfTimesComponents" : function (e) {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('componentsTimes'); i++){
			fakeArray.push("a")
		}
    return fakeArray;
	},
	"componentCourse" : function (e) {
		var currentCourse=Session.get("currentCourseCode");
		//console.log(currentCourse + "Code");

		//var size = Courses.find({courseCode:currentCourse}).count();
		var size = Courses.findOne({courseCode:currentCourse});
		console.log(size);
		var a =  Courses.findOne({courseCode:currentCourse}).components;

		var componentsArr = new Array();
		for(var x = 0, l = a.length; x < l;  x++){
			var obj = new Object();
			obj.componentName = a[x].component;
			obj.weightage = a[x].weightage;

			componentsArr.push(obj);
    	}

    	componentsArr.forEach(function(entry) {
   			console.log(entry + " full name");

		});

		return componentsArr;
	}
});



Template.addComponents.events({
	"click #addMoreComponents" : function deleteCourseEventHandler(e) {
		
		 e.preventDefault();

		 var componentsTimes = Session.get('componentsTimes');
		 var noOfRadioFields = componentsTimes+1;
		 if(isNaN(componentsTimes)) noOfRadioFields = 1;
		 console.log("componentsTimes " + componentsTimes);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('componentsTimes', noOfRadioFields);
	},
	"click #removeComponents" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var componentsTimes = Session.get('componentsTimes');
		 if(isNaN(componentsTimes)) noOfRadioFields = 1;
		 var noOfRadioFields = componentsTimes-1;
		 console.log("componentsTimes " + componentsTimes);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('componentsTimes', noOfRadioFields);
	},
	"click #editComponentsButton" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		var courseCode=Session.get("currentCourseCode");
		 console.log(courseCode);
		var components = new Array();
		var courseComponents = document.getElementsByName("components");
		var componentWeightage = document.getElementsByName("weightage");


		var courseComponentsArr = new Array();
		for(var x = 0, l = courseComponents.length; x < l;  x++){
			courseComponentsArr.push(courseComponents[x].value);
    	}

		var componentWeightageArr = new Array();
		for(var x = 0, l = componentWeightage.length; x < l;  x++){
			componentWeightageArr.push(componentWeightage[x].value);
    	}

		for(i = 0; i < courseComponents.length; i++){
			var obj = new Object();
			obj.component = courseComponentsArr[i];
		 console.log(courseComponentsArr[i]);
			obj.weightage = componentWeightageArr[i];
		 console.log(componentWeightageArr[i]);
			components.push(obj)
		}
		Meteor.call("editComponents", courseCode, components);
	}
});



Template.course.events({
	"click #removeComponentButton" : function (e) {
		console.log(this);

		// this.trainerID
		var currentCourse=Session.get("currentCourseCode");
		Meteor.call("removeComponent", currentCourse, this.componentName);
	}
});


// WEBSITE
Template.courses.helpers({
	"retrieveAllCourse" : function retrieveAllCourse() {
		console.log(">> Courses Helper");
		return Courses.find({});
	}
});