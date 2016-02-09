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
	"click #deleteQn" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		 var fields = Session.get('fields');
		 var noOfFields = fields+1;
		 if(isNaN(fields)) noOfFields = 1;
		 console.log("fields " + fields);
		 console.log("noOfFields " + noOfFields);
		 Session.set('fields', noOfFields);
	},
	"click #editTitle" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();
		 Session.set('statusTitle', "editting");
	},
	"click #saveTitle" : function(e) {
		 //var name = template.$(event.target).data('modal-template');
		 e.preventDefault();

		var newTitle = document.getElementById("editTitleFeedback").value;
		//all the backend and blah
		 Session.set('statusTitle', "notEditting");
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
		 if(isNaN(checkboxFields)) noOfCheckboxFields = 3;
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
		 if(isNaN(dropdownFields)) noOfDropdownFields = 3;
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
	"submit #feedbackForm" : function submitFeedbackFormHandler(e) {
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
	}
});

// Template.addTrainer.helpers({
	// "times" : function listCourseEventHandler(e) {
		// Session.set('times', 0);
	// }
// });