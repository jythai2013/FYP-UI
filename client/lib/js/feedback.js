// http://stackoverflow.com/questions/1183419/parse-page-for-checkboxes-via-javascript
// http://stackoverflow.com/questions/4606791/how-to-access-checkboxes-and-their-values-with-getelementsbyname
// http://stackoverflow.com/questions/169506/obtain-form-input-fields-using-jquery

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
	// console.log($("input"));
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

Template.viewQn.helpers({
	"editAddDropdownFields": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('dropdownFieldsEd'); i++){
			fakeArray.push("a")
		}
    return fakeArray;
	},	

	"editAddRadioInlineFields": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('radioInlineFieldsEd'); i++){
			fakeArray.push("a")
		}
    return fakeArray;
	},	

	"editAddCheckboxFields": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('checkboxFieldsEd'); i++){
			fakeArray.push("a")
		}
    return fakeArray;
	},	

	"editAddRadioFields": function() {
		var fakeArray = new Array();
		for(i = 0; i < Session.get('radioFieldsEd'); i++){
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
	"sessionQnID": function() {
		return Session.get('sessionQnID');
	}	
});


Template.feedbackList.helpers({
	"survey": function() {
		return Feedback.find({});
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
		//
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
		var question = document.getElementById("qnQn").value;
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
		//console.log(hello);
		Session.set('sessionQnID', null);
		Meteor.call("editQuestion", fbId, qnID, question, qnType, LSPQnID, optionsForQn);
	},

	"click #editFields" : function(e) {
		 e.preventDefault();
		 console.log(this);
		 console.log(this.feedbackDetails);
		 console.log(this.feedbackDetails.qnID);
		 Session.set("sessionQnID", this.feedbackDetails.qnID);
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

		 var radioFieldsEd = Session.get('radioFieldsEd');
		 var noOfRadioFields = radioFieldsEd+1;
		 if(isNaN(radioFieldsEd)) noOfRadioFields = 1;
		 console.log("radioFieldsEd " + radioFieldsEd);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('radioFieldsEd', noOfRadioFields);
	},
	"click #removeRadioFieldEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var radioFieldsEd = Session.get('radioFieldsEd');
		 if(isNaN(radioFieldsEd)) noOfRadioFields = 1;
		 var noOfRadioFields = radioFieldsEd-1;
		 console.log("radioFieldsEd " + radioFieldsEd);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('radioFieldsEd', noOfRadioFields);
	},
	"click #addRadioInlineEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var radioInlineFieldsEd = Session.get('radioInlineFieldsEd');
		 var noOfRadioFields = radioInlineFieldsEd+1;
		 if(isNaN(radioInlineFieldsEd)) noOfRadioFields = 1;
		 console.log("radioInlineFieldsEd " + radioInlineFieldsEd);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('radioInlineFieldsEd', noOfRadioFields);
	},
	"click #removeRadioInlineFieldEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var radioInlineFieldsEd = Session.get('radioInlineFieldsEd');
		 if(isNaN(radioInlineFieldsEd)) noOfRadioFields = 1;
		 var noOfRadioFields = radioInlineFieldsEd-1;
		 console.log("radioInlineFieldsEd " + radioInlineFieldsEd);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('radioInlineFieldsEd', noOfRadioFields);
	},
	"click #addCheckboxesEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var checkboxFieldsEd = Session.get('checkboxFieldsEd');
		 var noOfRadioFields = checkboxFieldsEd+1;
		 if(isNaN(checkboxFieldsEd)) noOfRadioFields = 1;
		 console.log("checkboxFieldsEd " + checkboxFieldsEd);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('checkboxFieldsEd', noOfRadioFields);
	},
	"click #removeCheckboxFieldEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var checkboxFieldsEd = Session.get('checkboxFieldsEd');
		 if(isNaN(checkboxFieldsEd)) noOfRadioFields = 1;
		 var noOfRadioFields = checkboxFieldsEd-1;
		 console.log("checkboxFieldsEd " + checkboxFieldsEd);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('checkboxFieldsEd', noOfRadioFields);
	},
	"click #addDropdownEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var dropdownFieldsEd = Session.get('dropdownFieldsEd');
		 var noOfRadioFields = dropdownFieldsEd+1;
		 if(isNaN(dropdownFieldsEd)) noOfRadioFields = 1;
		 console.log("dropdownFieldsEd " + dropdownFieldsEd);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('dropdownFieldsEd', noOfRadioFields);
	},
	"click #removeDropdownFieldEd" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var dropdownFieldsEd = Session.get('dropdownFieldsEd');
		 if(isNaN(dropdownFieldsEd)) noOfRadioFields = 1;
		 var noOfRadioFields = dropdownFieldsEd-1;
		 console.log("dropdownFieldsEd " + dropdownFieldsEd);
		 console.log("noOfRadioFields " + noOfRadioFields);
		 Session.set('dropdownFieldsEd', noOfRadioFields);
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

        // noOfTimes = _.reject(salesInput, function(x) {
        //     return x.salesId == salesId;
        // });

		 var noOfFields = fields-1;
		 Session.set('fields', noOfFields);
	}

});





Template.addFeedback.events({
	"submit #feedbackFormadt" : function submitFeedbackFormadtHandler(e) {
		e.preventDefault();
		// console.log(e);
		var options = new Object();
		
		// options.quantitative = new Array();
		// options.qualitatives = new Array();
		
		quantitative = new Object();
		qualitatives = new Object();
		questions = new Object();
		
		// console.log($(".qualitativeQuestion"));
		
		$(".quantitativeQuestion").each(function(index, value){
			// console.log(index);
			// console.log(value);
			// console.log(value.value);
			// console.log(value.nextSibling);
			// var key = value.nextSibling.innerHTML.toString();
			// console.log(key);
			// quantitative[key] = value.value;
			if(quantitative[this.name] != undefined){
				var temp = quantitative[this.name];
				if( Object.prototype.toString.call( temp ) === '[object Array]' ) {
					temp.push(value.value);
				} else{
					var temp2 = new Array();
					temp2.push(temp);
					temp2.push(value.value);
					temp = temp2;
				}
				quantitative[this.name] = temp;
			} else{
				quantitative[this.name] = this.value;
			}
			// console.log(quantitative);
		});
		
		$(".qualitativeQuestion").each(function(index, value){
			qualitatives[this.name] = value.value;
			// console.log(qualitatives);
		});
		
		$(".questionLabel").each(function(index, value){
			console.log(this);
			var n = this.getAttribute("name");
			// var v = this.getAttribute("data-question-label"); //this also works. choose
			questions[n] = this.innerHTML;
			console.log(questions);
		});
		
		options.questions = questions;
		options.qualitatives = qualitatives;
		options.quantitative = quantitative;
		
		
		
		
		
		
    // // get all the inputs into an array.
    // var $inputs = $('#myForm :input');

    // // not sure if you wanted this, but I thought I'd add it.
    // // get an associative array of just the values.
    // var values = {};
    // $inputs.each(function() {
        // values[this.name] = $(this).val();
    // });
		
		
		
		// Session.set("option", options);
		console.log(options);
		Meteor.call("createFeedback", options);
	}, 
	
	"submit #feedbackForm" : function submitFeedbackFormHandler(e, t) {
		e.preventDefault();
		options = {};
		options.qnID = 
		options.courseID = 
		options.trainerID = 
		options.facilityID = 
		options.response.studentID = 
		options.response.response = 
		Meteor.call("upsertFeedback", options);
/*

editTitleFeedback	//Title of survey
saveSurvey //button to save survey to db
launchSurvey //button to save survey to db and launch it (set status to active)


feedbackAnswer{
	qnID: (link to the qnID)
	courseID: 
	trainerID: [If evaluating trainer]
	facilityID: [If evaluating facility]
	Response: [
		studentID:
		response:
	]
}

*/
	}
});

// Template.addTrainer.helpers({
	// "times" : function listCourseEventHandler(e) {
		// Session.set('times', 0);
	// }
// });
