// Template.addFeedback.events({
	// "submit #feedbackForm" : function deleteCourseEventHandler(e) {
		// console.log(e);
		// Meteor.call("deleteCourse", this._id);
	// }
// });

// Template.addTrainer.helpers({
	// "times" : function listCourseEventHandler(e) {
		// Session.set('times', 0);
	// }
// });

function getParameterByName(name) {
	//console.log(name);
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	//console.log(name);
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
	//console.log(regex);
	//console.log(results);
	//console.log(decodeURIComponent(results[1].replace(/\+/g, " ")));
	//console.log(results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")));
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


Template.feedbackQnMgmt.onRendered(function(){
  var currentfb = getParameterByName("fbid");
  Session.set('currentfb', currentfb);
});

Template.viewFeedbackSurvey.onRendered(function(){
  var currentfb = getParameterByName("fbid");
  Session.set('currentViewingfb', currentfb);
});

Template.doFeedbackSurvey.onRendered(function(){
  var currentfb = getParameterByName("fbidAns");
  Session.set('currentDoingfb', currentfb);
});

Template.radioCreate.onRendered(function(){
  Session.set('radioFields', 0);
});

Template.checkBoxesCreate.onRendered(function(){
  Session.set('checkboxFieldsEd', 0);
});

Template.radioCreateInline.onRendered(function(){
  Session.set('radioInlineFieldsEd', 0);
});

Template.viewQn.onRendered(function(){
  Session.set('dropdownFieldsEdView', 0);
  Session.set('radioInlineFieldsEdView', 0);
  Session.set('checkboxFieldsEdView', 0);
  Session.set('radioFieldsEdView', 0);
});

Template.addFeedback.onRendered(function(){
	// console.log($("input")[0]);
	// console.log($("input"));
	$("input")[0].focus();
});

Template.createQn.onRendered(function(){
	// console.log($("input")[0]);
	// console.log($("input"));
	Session.set('qnType', 'vtext');
});

Template.feedbackQnMgmt.onRendered(function(){
	// console.log($("input")[0]);
	console.log(Session.get("sessionQnID") + " sessionQnID");
	Session.set('statusTitle', 'notEditting');
});

Template.feedbackQnMgmt.helpers({
	"noOfFields": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('fields'); i++){
			fakeArray.push("a")
		}
    return fakeArray;
	},

	"feedbackTitle": function() {
		var fbId=Session.get("currentfb");

		var feedbackTitle = Feedback.findOne({_id:fbId}).feedbackTitle;
    		console.log(feedbackTitle+ " feedbackTitle")
    	return feedbackTitle;
	},

	"feedbackQns": function() {
		//Session.set('currentfb', currentfb);	
		var fbId = Session.get("currentfb");
		//console.log(fbId);
		//var fbId=Session.set('currentfb', currentfb);
		var feedbackQnOptions = Feedback.findOne({_id:fbId}).qnOptions;
		// var feedbackQnOptions = Feedback.findOne({_id:fbId});
		console.log(feedbackQnOptions);
		 return feedbackQnOptions;
	}
});


Template.viewFeedbackSurvey.helpers({

	"viewFeedbackDetails": function() {
		var fbId=Session.get("currentViewingfb");

		var feedbackTitle = Feedback.findOne({_id:fbId});
    		console.log(feedbackTitle);
    	return feedbackTitle;
	},

	"viewFeedbackQns1": function() {
		var fbId = Session.get("currentViewingfb");
		console.log(fbId);
		//console.log(fbId);
		//var fbId=Session.set('currentfb', currentfb);
		var feedbackQnOptions = Feedback.findOne({_id:fbId}).qnOptions;
		// var feedbackQnOptions = Feedback.findOne({_id:fbId});
		 return feedbackQnOptions;
	}
});

Template.addFeedback.helpers({

	"feedbackTemplateType": function() {
		var feedbackType=Session.get("classFeedbackType");

		var feedbackTitle = Feedback.find({feedbackType:feedbackType,status:"launched"});
    		console.log(feedbackTitle);
    	return feedbackTitle;
	}
});

Template.viewQn.helpers({
	"editAddDropdownFields": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('dropdownFieldsEdView'); i++){
			fakeArray.push("a")
		}
    return fakeArray;
	},	

	"editAddRadioInlineFields": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('radioInlineFieldsEdView'); i++){
			fakeArray.push("a")
		}
    return fakeArray;
	},	

	"editAddCheckboxFields": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('checkboxFieldsEdView'); i++){
			fakeArray.push("a")
		}
    return fakeArray;
	},	

	"editAddRadioFields": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('radioFieldsEdView'); i++){
			fakeArray.push("a")
		}
    return fakeArray;
	}

});

Template.radioCreate.helpers({
	"addRadioFields": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('radioFields'); i++){
			fakeArray.push("a")
		}
    	return fakeArray;
	}	
});

Template.radioCreate.helpers({
	"addRadioFields": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('radioFields'); i++){
			fakeArray.push("a")
		}
    return fakeArray;
	}	
});

Template.checkBoxesCreate.helpers({
	"addCheckboxFields": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('checkboxFields'); i++){
			fakeArray.push("a")
		}
    return fakeArray;
	}	
});

Template.dropdownCreate.helpers({
	"addDropdownFields": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('dropdownFields'); i++){
			fakeArray.push(i+1)
		}
    return fakeArray;
	}	
});

Template.radioCreateInline.helpers({
	"addRadioInlineFields": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('radioInlineFields'); i++){
			fakeArray.push(i+1)
		}
    return fakeArray;
	}	
});

Template.createQn.helpers({
	"qnType": function() {
		return Session.get('qnType');
	}	
});

Template.viewQn.helpers({
	"sessionQnIDView": function() {
		return Session.get('sessionQnIDEd');
	}	
});


Template.feedbackList.helpers({
	"survey": function() {
		return Feedback.find({status:"editting"});
	},	
	"launchedSurvey": function() {
		return Feedback.find({status:"launched"});
	}	
});

Template.feedbackQnMgmt.helpers({
	"statusTitle": function() {
		return Session.get('statusTitle');
	}	
});

Template.registerHelper('equals', function (a, b) {
      return a == b;
    });


Template.feedbackQnMgmt.events({
	"click #addFields" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var fields = Session.get('fields');
		 var noOfFields = fields+1;
		 if(isNaN(fields)) noOfFields = 1;
		 console.log("fields " + fields);
		 console.log("noOfFields " + noOfFields);
		 Session.set('fields', noOfFields);
	},

	"click #saveFeedback" : function(e) {
		var arr = $("div .subtemplate-wrapper");
		console.log(arr);
	},

	"click #editTitle" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();
		 Session.set('statusTitle', "editting");
	},

	"click #saveTitle" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		var url =  window.location.href;
    		console.log(url+ " url")
		var positionEqual = url.indexOf('=');	
		var fbId=url.substring(positionEqual+1);
		var newTitle = document.getElementById("editTitleFeedback").value;
		var newType = document.getElementById("editFeedbackType").value;
		//all the backend and blah
		Meteor.call("editFeedbackDetails", fbId, newTitle, newType);

		 Session.set('statusTitle', "notEditting");
	},
	"click #launchSurvey" : function(e) {
		
		var url =  window.location.href;
    		console.log(url+ " url")
		var positionEqual = url.indexOf('=');	
		var fbId=url.substring(positionEqual+1);

		Meteor.call("launchSurvey", fbId); 
	}

});


Template.createQn.events({
	"click #saveQn" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		var url =  window.location.href;
    		console.log(url+ " url")
		var positionEqual = url.indexOf('=');	
		var fbId=url.substring(positionEqual+1);
   //  		console.log(currentCourse+ " currnt course code");
			// var meep = Feedback.findOne({_id:fbId});

		var qnSize =  Feedback.findOne({_id:fbId}).qnSize;
		console.log(qnSize);
		if(isNaN(qnSize)) qnSize = 0;
		var qnNum =  qnSize+1;
		var qnSize = qnNum;
		console.log (qnNum + " question number");
		var question = document.getElementById("qnQn").value;
		var LSPQnID = "not yet";
		 var qnType = Session.get('qnType');
		 var optionsForQn =  new Array();

		 if(qnType==="vtext" || qnType==="paraText"){
	    		console.log( " do nth")
		} else {
			var qnOptions = document.getElementsByName("qnOptions");
    		console.log(qnOptions.length+ " qn options length");
			for(var x = 0, l = qnOptions.length; x < l;  x++){

				var qnOption = qnOptions[x].value;				
				optionsForQn.push(qnOption);
				
    		}
	    	console.log(optionsForQn.length+ " ARR SIZE")
		}
		Meteor.call("createNewQuestion", fbId, qnSize, qnNum, question, qnType, LSPQnID, optionsForQn);
	}

});

Template.addFeedbackForm.events({
	"click #addFeedbackButton" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		var feedbackTitle = document.getElementById("feedbackTitle").value;
		console.log(feedbackTitle);
		var feedbackType = document.getElementById("feedbackType").value;
		var feedbackQnSize = 0;
		Meteor.call("createNewFeedback", feedbackTitle, feedbackType, feedbackQnSize);
		
	}

});

Template.deleteFeedback.events({
	"click #deleteFeedbackButton" : function(e) {
		 e.preventDefault();
		Meteor.call("deleteFeedback", this._id);
	}
});

Template.feedbackList.events({
	"click #viewFeedback" : function(e) {
		 e.preventDefault();
		Session.set('currentFeedback', this._id);
	}
});

Template.viewQn.events({
	"click #saveFieldsEd" : function(e) {		 
		 e.preventDefault();

		var url =  window.location.href;
    		console.log(url+ " url")
		var positionEqual = url.indexOf('=');	
		var fbId=url.substring(positionEqual+1);
   //  		console.log(currentCourse+ " currnt course code");
			// var meep = Feedback.findOne({_id:fbId});

		// var qnSize =  Feedback.findOne({_id:fbId}).qnSize;
		// console.log(qnSize);
		// if(isNaN(qnSize)) qnSize = 0;
		// var qnNum =  qnSize+1;

		var qnID =  this.feedbackDetails.qnID;
		var question = document.getElementById("textQn").value;
		console.log(question);
		var LSPQnID = "not yet";
		 var qnType = this.feedbackDetails.qnType;
		 var optionsForQn =  new Array();

		 if(qnType==="vtext" || qnType==="paraText"){
	    		console.log( " do nth")
		} else {
			var qnOptions = document.getElementsByName("qnOptionsEd");
    		console.log(qnOptions.length+ " qn options length");
			for(var x = 0, l = qnOptions.length; x < l;  x++){

				var qnOption = qnOptions[x].value;				
				optionsForQn.push(qnOption);
				
    		}
	    	console.log(optionsForQn.length+ " ARR SIZE") 
		}
		//var hello=Feedback.find ({ _id:fbId}, {qnOptions:{qnID: qnId}});
		
		Session.set('sessionQnIDEd', null);
		console.log("Hello");
		Meteor.call("editQuestion", fbId, qnID, question, qnType, LSPQnID, optionsForQn);
	},

	"click #editFields" : function(e) {
		 e.preventDefault();
		 console.log(this);
		 console.log(this.feedbackDetails);
		 console.log(this.feedbackDetails.qnID);
		 Session.set("sessionQnIDEd", this.feedbackDetails.qnID);
	},

	"click #deleteQnEd" : function(e) {
		 e.preventDefault();
		 console.log(this);
		 console.log(this.feedbackDetails.qnID);
		 
		 
		var url =  window.location.href;
    		console.log(url+ " url")
		var positionEqual = url.indexOf('=');	
		var fbId=url.substring(positionEqual+1);

		Meteor.call("deleteOldQuestion",fbId, this.feedbackDetails.qnID); 


	},

	"click #addRadioEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var noOfRadioFields = Session.get('radioFieldsEdView');
		 if(isNaN(noOfRadioFields)) noOfRadioFields = 0;
		 if(noOfRadioFields<0) noOfRadioFields = 0;
		 var noOfRadioFields = noOfRadioFields+1;
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('radioFieldsEdView', noOfRadioFields);
	},
	"click #removeRadioFieldEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var noOfRadioFields = Session.get('radioFieldsEdView');
		 console.log(noOfRadioFields);
		 if(isNaN(noOfRadioFields)) noOfRadioFields = 1;
		 if(noOfRadioFields<0) noOfRadioFields = 1;
		 var noOfRadioFields = noOfRadioFields-1;
		 if(noOfRadioFields<0) noOfRadioFields = 0;
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('radioFieldsEdView', noOfRadioFields);
	},
	"click #addRadioInlineEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var radioInlineFieldsEdView = Session.get('radioInlineFieldsEdView');
		 var noOfRadioFields = radioInlineFieldsEdView+1;
		 if(isNaN(radioInlineFieldsEdView)) noOfRadioFields = 1;
		 console.log("radioInlineFieldsEdView " + radioInlineFieldsEdView);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('radioInlineFieldsEdView', noOfRadioFields);
	},
	"click #removeRadioInlineFieldEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var radioInlineFieldsEdView = Session.get('radioInlineFieldsEdView');
		 if(isNaN(radioInlineFieldsEdView)) noOfRadioFields = 1;
		 if(noOfRadioFields<0) noOfRadioFields = 1;
		 var noOfRadioFields = radioInlineFieldsEdView-1;
		 if(noOfRadioFields<0) noOfRadioFields = 0;
		 console.log("radioInlineFieldsEdView " + radioInlineFieldsEdView);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('radioInlineFieldsEdView', noOfRadioFields);
	},
	"click #addCheckboxesEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var checkboxFieldsEdView = Session.get('checkboxFieldsEdView');
		 var noOfRadioFields = checkboxFieldsEdView+1;
		 if(isNaN(checkboxFieldsEdView)) noOfRadioFields = 1;
		 console.log("checkboxFieldsEdView " + checkboxFieldsEdView);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('checkboxFieldsEdView', noOfRadioFields);
	},
	"click #removeCheckboxFieldEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var checkboxFieldsEdView = Session.get('checkboxFieldsEdView');
		 if(isNaN(checkboxFieldsEdView)) noOfRadioFields = 1;
		 var noOfRadioFields = checkboxFieldsEdView-1;
		 if(noOfRadioFields<0) noOfRadioFields = 0;
		 console.log("checkboxFieldsEdView " + checkboxFieldsEdView);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('checkboxFieldsEdView', noOfRadioFields);
	},
	"click #addDropdownEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var dropdownFieldsEdView = Session.get('dropdownFieldsEdView');
		 var noOfRadioFields = dropdownFieldsEdView+1;
		 if(isNaN(dropdownFieldsEdView)) noOfRadioFields = 1;
		 console.log("dropdownFieldsEdView " + dropdownFieldsEdView);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('dropdownFieldsEdView', noOfRadioFields);
	},
	"click #removeDropdownFieldEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var dropdownFieldsEdView = Session.get('dropdownFieldsEdView');
		 if(isNaN(dropdownFieldsEdView)) noOfRadioFields = 1;
		 var noOfRadioFields = dropdownFieldsEdView-1;
		 if(noOfRadioFields<0) noOfRadioFields = 0;
		 console.log("dropdownFieldsEdView " + dropdownFieldsEdView);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('dropdownFieldsEdView', noOfRadioFields);
	}

});

Template.radioCreate.events({
	"click #addRadio" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var radioFields = Session.get('radioFields');
		 var noOfRadioFields = radioFields+1;
		 if(isNaN(radioFields)) noOfRadioFields = 1;
		 console.log("radioFields " + radioFields);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('radioFields', noOfRadioFields);
	},
	"click #removeRadioField" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var radioFields = Session.get('radioFields');
		 if(isNaN(radioFields)) noOfRadioFields = 1;
		 var noOfRadioFields = radioFields-1;
		 console.log("radioFields " + radioFields);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('radioFields', noOfRadioFields);
	}

});

Template.checkBoxesCreate.events({
	"click #addCheckboxes" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var checkboxFields = Session.get('checkboxFields');
		 var noOfCheckboxFields = checkboxFields+1;
		 if(isNaN(checkboxFields)) noOfCheckboxFields = 1;
		 console.log("checkboxFields " + checkboxFields);
		 console.log("noOfCheckboxFields " + noOfCheckboxFields);
		 Session.set('checkboxFields', noOfCheckboxFields);
	},
	"click #removeCheckboxField" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var checkboxFields = Session.get('checkboxFields');
		 if(isNaN(checkboxFields)) noOfCheckboxFields = 1;
		 var noOfCheckboxFields = checkboxFields-1;
		 console.log("checkboxFields " + checkboxFields);
		 console.log("noOfCheckboxFields " + noOfCheckboxFields);
		 Session.set('checkboxFields', noOfCheckboxFields);
	}

});

Template.dropdownCreate.events({
	"click #addDropdown" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var dropdownFields = Session.get('dropdownFields');
		 var noOfDropdownFields = dropdownFields+1;
		 if(isNaN(dropdownFields)) noOfDropdownFields = 1;
		 console.log("dropdownFields " + dropdownFields);
		 console.log("noOfDropdownFields " + noOfDropdownFields);
		 Session.set('dropdownFields', noOfDropdownFields);
	},
	"click #removeDropdownField" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var dropdownFields = Session.get('dropdownFields');
		 if(isNaN(dropdownFields)) noOfDropdownFields = 1;
		 var noOfDropdownFields = dropdownFields-1;
		 console.log("dropdownFields " + dropdownFields);
		 console.log("noOfDropdownFields " + noOfDropdownFields);
		 Session.set('dropdownFields', noOfDropdownFields);
	}

});

Template.radioCreateInline.events({
	"click #addRadioInline" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var radioInlineFields = Session.get('radioInlineFields');
		 var noOfRadioInlineFields = radioInlineFields+1;
		 if(isNaN(radioInlineFields)) noOfRadioInlineFields = 1;
		 console.log("radioInlineFields " + radioInlineFields);
		 console.log("noOfRadioInlineFields " + noOfRadioInlineFields);
		 Session.set('radioInlineFields', noOfRadioInlineFields);
	},
	"click #removeRadioInlineField" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var radioInlineFields = Session.get('radioInlineFields');
		 if(isNaN(radioInlineFields)) noOfRadioInlineFields = 1;
		 var noOfRadioInlineFields = radioInlineFields-1;
		 console.log("radioInlineFields " + radioInlineFields);
		 console.log("noOfRadioInlineFields " + noOfRadioInlineFields);
		 Session.set('radioInlineFields', noOfRadioInlineFields);
	}

});


Template.feedbackQnMgmt.events({
	"click #launchSurvey" : function(e) {
		
		var url =  window.location.href;
    		console.log(url+ " url")
		var positionEqual = url.indexOf('=');	
		var fbId=url.substring(positionEqual+1);

		Meteor.call("launchSurvey", fbId); 
	}

});

Template.createQn.events({
	"click #addField" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();
		 




		 //call save method




		 
		 var fields = Session.get('fields');
		 var noOfFields = fields+1;
		 if(isNaN(fields)) noOfFields = 1;
		 console.log("fields " + fields);
		 console.log("noOfFields " + noOfFields);
		 Session.set('fields', noOfFields);
	},

	"change #qnType" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();
		 console.log(" qn type");
		var qnType = document.getElementById("qnType").value;
		 console.log(qnType + " qn type");
		 Session.set('qnType', qnType);
		 //set some session variable???

	},

	"click #removeField" : function(e) {
		e.preventDefault();
        var fields = Session.get('fields');
		 if(isNaN(fields)) fields = 1;
		 if(fields<0) fields = 1;
		 var fields = fields-1;
		 if(fields<0) fields = 0;
        // noOfTimes = _.reject(salesInput, function(x) {
        //     return x.salesId == salesId;
        // });

		 var noOfFields = fields-1;
		 Session.set('fields', noOfFields);
	}

});

Template.addFeedback.events({
	"change #feedbackSearchType" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();
		var feedbackType = document.getElementById("feedbackSearchType").value;
		 console.log(feedbackType + " feedbackType");
		 Session.set('classFeedbackType', feedbackType);
		 //set some session variable???

	},

	"click #addFeedbackClassButton" : function(e) {
		e.preventDefault();
		var feedbackType = document.getElementById("feedbackSearchType").value;
		var feedbackTemplate = document.getElementById("feedbackTemplateType").value;
        
		var a = Groups.findOne({_id:this._id});

        if (feedbackType==="Trainer"){
			var classCFTType = Groups.findOne({_id:this._id}).courseTrainers.trainerId;
        } else if(feedbackType === "Facility"){
			var classCFTType = Groups.findOne({_id:this._id}).venue;
        }else{
			var classCFTType = Groups.findOne({_id:this._id}).courseCode;
        }

        console.log(classCFTType);

		var thisFeedbackQnOptions = Feedback.findOne({_id:feedbackTemplate}).qnOptions;
		console.log(feedbackTemplate);
		var today = new Date();

		var fakeArray2 = new Array();
		console.log(thisFeedbackQnOptions.length);
		
			for(i = 0; i < thisFeedbackQnOptions.length; i++){
				var fakeArray = new Array();
				// var optionsNumber = new Array();
				// var object = new Object();
				var obj = new Object();
					console.log(thisFeedbackQnOptions[i].options.length + "inforloop");
				for(j = 0; j < thisFeedbackQnOptions[i].options.length; j++){
					fakeArray.push(0);
				}
				
				console.log(thisFeedbackQnOptions[i].qnID + " qnID");
				// console.log(optionsNumber);

				obj.qnID = thisFeedbackQnOptions[i].qnID;
				obj.feedbackQn = thisFeedbackQnOptions[i].feedbackQn;
				obj.lspQnId = thisFeedbackQnOptions[i].lspQnId;
				obj.options = fakeArray;
				fakeArray2.push(obj);
				
			}
			console.log (fakeArray2);

		Meteor.call("createFeedbackResults", feedbackTemplate, this._id, classCFTType, today, fakeArray2);


		//TODO: Email all the students in this class with the link to do the feedback.
		// link is /CourseModule/doFeedbackSurvey?fbid=(feedbackAns._id)&studID=(student's ID from class list)
		var feedbackAnsID = FeedbackAnswers.findOne({groupID:this._id, dateCreated: today, feedbackTemplateID: feedbackTemplate})._id;


	}

});



Template.doFeedbackSurvey.helpers({

	"viewFeedbackDetails1": function() {
		var fbId=Session.get("currentDoingfb");
		var feedbackTemplateID = FeedbackAnswers.findOne({_id:fbId}).feedbackTemplateID;

		var feedbackTitle = Feedback.findOne({_id:feedbackTemplateID});
    		console.log(feedbackTitle);
    	return feedbackTitle;
	},

	"viewFeedbackQns2": function() {
		var fbId = Session.get("currentDoingfb");
		var feedbackTemplate = FeedbackAnswers.findOne({_id:fbId}).feedbackTemplateID;
		console.log(feedbackTemplate);
		var feedbackQnOptions = Feedback.findOne({_id:feedbackTemplate}).qnOptions;
		 return feedbackQnOptions;
	}

});

Template.viewFeedbackSurvey.helpers({

	"viewFeedbackDetails2": function() {
		var fbId=Session.get("currentDoingfb");
		var feedbackTemplateID = FeedbackAnswers.findOne({_id:fbId}).feedbackTemplateID;

		var feedbackTitle = Feedback.findOne({_id:feedbackTemplateID});
    		console.log(feedbackTitle);
    	return feedbackTitle;
	},

	"viewFeedbackQns3": function() {
		var fbId = Session.get("currentDoingfb");
		var feedbackTemplate = FeedbackAnswers.findOne({_id:fbId}).feedbackTemplateID;
		console.log(feedbackTemplate);
		var feedbackQnOptions = Feedback.findOne({_id:feedbackTemplate}).qnOptions;
		 return feedbackQnOptions;
	}

});

Template.doFeedbackSurvey.events({
	"click #saveFeedbackAnswersModal" : function(e) {
        $("#saveSurvey").modal("show");
	}	
});


Template.saveSurvey.events({
	"click #saveFeedbackAnswers" : function(e) {
		e.preventDefault();
		var feedbackTemplate = FeedbackAnswers.findOne({_id:this._id}).feedbackTemplateID;
		//trying to get the name of the options out
		var feedbackTemplateQnOptions = Feedback.findOne({_id:feedbackTemplate}).qnOptions;
		console.log(feedbackTemplateQnOptions.length);
		//loop to get the qns out
		for (var i = 0, l = feedbackTemplateQnOptions.length; i < l; i++)
    	{
	        var ans = Session.get(feedbackTemplateQnOptions[i].feedbackQn);
	        console.log(ans);
	        console.log(feedbackTemplateQnOptions[i].options.length);
	        var qnID = qnID = feedbackTemplateQnOptions[i].feedbackQn;
	        console.log(qnID);
	        //extracting the options
		        var optionsTotalnum = FeedbackAnswers.findOne({_id:this._id}).options[i].options;

		        console.log(optionsTotalnum);
	        for (var j = 0, k = feedbackTemplateQnOptions[i].options.length; j < k; j++)
    		{

    			for (var h = 0, g = ans.length; h < g; h++)
    			{	
	    			if(feedbackTemplateQnOptions[i].options[j] === ans[h]){
	    				// var ansOptions = FeedbackAnswers.findOne({_id:this._id}).options;
	    				// console.log(ansOptions);
						
	    				var num = optionsTotalnum[j];
	    				num = num +1;
	    				optionsTotalnum[j]=num;
		        	console.log(optionsTotalnum);


	    			}
	    		}
    		}	

    		Meteor.call("insertFeedbackAnswers", this._id, qnID ,optionsTotalnum);
    	}

		 // return feedbackQnOptions;
	}
});



Template.doSurveyQn.events({
	"change #findmyans" : function(e) {
		e.preventDefault();
		console.log(this);
		console.log(this.feedbackDetails.feedbackQn);
		var qn = this.feedbackDetails.feedbackQn
		var answers = new Array()
		var elements  = document.getElementsByName(qn);
		// console.log(elements);
		for (var i = 0, l = elements.length; i < l; i++)
    	{
	        if (elements[i].checked)
	        {
	            console.log (elements[i].value);
	            answers.push(elements[i].value);
	        }
    	}
    	var qn  = this.feedbackDetails.feedbackQn;
    	console.log(qn);
    	Session.set(qn, answers);
	},	
	"click #saveFieldsDo" : function(e) {
		e.preventDefault();

		console.log(this);
		console.log(this.feedbackDetails.feedbackQn);
		var qn = this.feedbackDetails.feedbackQn
		var ans = new Array()
		var elements  = document.getElementsByName(qn);
		// console.log(elements);
		for (var i = 0, l = elements.length; i < l; i++)
    	{
	        if (elements[i].checked)
	        {
	            console.log (elements[i].value);
	            ans.push(elements[i].value);
	        }
    	}
    	

		var url =  window.location.href;
		var positionEqual = url.indexOf('=');	
		var fbIdAns=url.substring(positionEqual+1);
		console.log (fbIdAns);
		var feedbackTemplate = FeedbackAnswers.findOne({_id:fbIdAns}).feedbackTemplateID;
		var feedbackTemplateQnOptions = Feedback.findOne({_id:feedbackTemplate}).qnOptions;

 		for (var i = 0, k = feedbackTemplateQnOptions.length; i < k; i++)
    		{
    			var optionsTotalnum = FeedbackAnswers.findOne({_id:fbIdAns}).options[i].options;
	        	var qnQn = feedbackTemplateQnOptions[i].feedbackQn;

		        console.log(optionsTotalnum);
    			for (var j = 0, k = feedbackTemplateQnOptions[i].options.length; j < k; j++)
    			{
	    			for (var h = 0, g = ans.length; h < g; h++)
	    			{	
		    			if(feedbackTemplateQnOptions[i].options[j] === ans[h]){
		    				// var ansOptions = FeedbackAnswers.findOne({_id:this._id}).options;
		    				// console.log(ansOptions);
							
		    				var num = optionsTotalnum[j];
		    				num = num +1;
		    				optionsTotalnum[j]=num;
			        	console.log(optionsTotalnum);


		    			}
		    		}
		    	}
		    	Meteor.call("insertFeedbackAnswers", fbIdAns, qnQn ,optionsTotalnum);
    		}
	// 
	// 	//trying to get the name of the options out
	// 	console.log(feedbackTemplateQnOptions.length);
	// 	//loop to get the qns out
	// 	for (var i = 0, l = feedbackTemplateQnOptions.length; i < l; i++)
 //    	{
	//         var ans = Session.get(feedbackTemplateQnOptions[i].feedbackQn);
	//         console.log(ans);
	//         console.log(feedbackTemplateQnOptions[i].options.length);
	//         var qnID = qnID = feedbackTemplateQnOptions[i].feedbackQn;
	//         console.log(qnID);
	//         //extracting the options
	// 	        var optionsTotalnum = FeedbackAnswers.findOne({_id:this._id}).options[i].options;

	// 	        console.log(optionsTotalnum);
	//        	

 //    		Meteor.call("insertFeedbackAnswers", this._id, qnID ,optionsTotalnum);
 //    	}

}







});


// Template.addFeedback.events({
// 	"submit #feedbackFormadt" : function submitFeedbackFormadtHandler(e) {
// 		e.preventDefault();
// 		// console.log(e);
// 		var options = new Object();
		
// 		// options.quantitative = new Array();
// 		// options.qualitatives = new Array();
		
// 		quantitative = new Object();
// 		qualitatives = new Object();
// 		questions = new Object();
		
// 		// console.log($(".qualitativeQuestion"));
		
// 		$(".quantitativeQuestion").each(function(index, value){
// 			// console.log(index);
// 			// console.log(value);
// 			// console.log(value.value);
// 			// console.log(value.nextSibling);
// 			// var key = value.nextSibling.innerHTML.toString();
// 			// console.log(key);
// 			// quantitative[key] = value.value;
// 			if(quantitative[this.name] != undefined){
// 				var temp = quantitative[this.name];
// 				if( Object.prototype.toString.call( temp ) === '[object Array]' ) {
// 					temp.push(value.value);
// 				} else{
// 					var temp2 = new Array();
// 					temp2.push(temp);
// 					temp2.push(value.value);
// 					temp = temp2;
// 				}
// 				quantitative[this.name] = temp;
// 			} else{
// 				quantitative[this.name] = this.value;
// 			}
// 			// console.log(quantitative);
// 		});
		
// 		$(".qualitativeQuestion").each(function(index, value){
// 			qualitatives[this.name] = value.value;
// 			// console.log(qualitatives);
// 		});
		
// 		$(".questionLabel").each(function(index, value){
// 			console.log(this);
// 			var n = this.getAttribute("name");
// 			// var v = this.getAttribute("data-question-label"); //this also works. choose
// 			questions[n] = this.innerHTML;
// 			console.log(questions);
// 		});
		
// 		options.questions = questions;
// 		options.qualitatives = qualitatives;
// 		options.quantitative = quantitative;
		
		
		
		
		
		
//     // // get all the inputs into an array.
//     // var $inputs = $('#myForm :input');

//     // // not sure if you wanted this, but I thought I'd add it.
//     // // get an associative array of just the values.
//     // var values = {};
//     // $inputs.each(function() {
//         // values[this.name] = $(this).val();
//     // });
		
		
		
// 		// Session.set("option", options);
// 		console.log(options);
// 		Meteor.call("createFeedback", options);
// 	}, 
	
// 	"submit #feedbackForm" : function submitFeedbackFormHandler(e, t) {
// 		e.preventDefault();
// 		options = {};
// 		options.qnID = 
// 		options.courseID = 
// 		options.trainerID = 
// 		options.facilityID = 
// 		options.response.studentID = 
// 		options.response.response = 
// 		Meteor.call("upsertFeedback", options);

// 	}
// });


