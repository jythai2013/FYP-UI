// // http://stackoverflow.com/questions/1183419/parse-page-for-checkboxes-via-javascript
// // http://stackoverflow.com/questions/4606791/how-to-access-checkboxes-and-their-values-with-getelementsbyname
// // http://stackoverflow.com/questions/169506/obtain-form-input-fields-using-jquery

// // Template.addFeedback.events({
// 	// "submit #feedbackForm" : function deleteCourseEventHandler(e) {
// 		// console.log(e);
// 		// Meteor.call("deleteCourse", this._id);
// 	// }
// // });

// // Template.addTrainer.helpers({
// 	// "times" : function listCourseEventHandler(e) {
// 		// Session.set('times', 0);
// 	// }
// // });

// Template.addFeedback.onRendered(function(){
// 	// console.log($("input")[0]);
// 	// console.log($("input"));
// 	$("input")[0].focus();
// });

// Template.viewResults.rendered = function() {
//     var pieChart = nv.models.pieChart()
//       .x(function(d) { return d.label })
//       .y(function(d) { return d.value })
//       .showLabels(true)     //Display pie labels
//       .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
//       .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
//       .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
//       .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
//       ;

//     nv.addGraph(function() {
//     //   chart.xAxis.axisLabel('Person number').tickFormat(d3.format('d'));
//     //   chart.yAxis.axisLabel('Age (years)').tickFormat(d3.format('d'));
//     //   d3.select('#chart svg').datum(
//     //     [{ values: People.find().fetch(), key: 'Age' }]
//     //   ).call(chart);
//     //   nv.utils.windowResize(function() { chart.update(); });
//     //   return chart;
//     // });

//     this.autorun(function () {
//       d3.select("#chart2 svg")
//         .datum(exampleData())
//         .transition().duration(350)
//         .call(chart);

//   	return chart;
// 	});
//   };

// function exampleData() {
//   return  [
//       { 
//         "label": "One",
//         "value" : 29.765957771107
//       } , 
//       { 
//         "label": "Two",
//         "value" : 0
//       } , 
//       { 
//         "label": "Three",
//         "value" : 32.807804682612
//       } , 
//       { 
//         "label": "Four",
//         "value" : 196.45946739256
//       } , 
//       { 
//         "label": "Five",
//         "value" : 0.19434030906893
//       } , 
//       { 
//         "label": "Six",
//         "value" : 98.079782601442
//       } , 
//       { 
//         "label": "Seven",
//         "value" : 13.925743130903
//       } , 
//       { 
//         "label": "Eight",
//         "value" : 5.1387322875705
//       }
//     ];
// }










// Template.feedbackQnMgmt.onRendered(function(){
// 	// console.log($("input")[0]);
// 	// console.log($("input"));
// 	Session.set('statusTitle', 'notEditting');

// 	 var currentFbId = getParameterByName("fbid");
// 	console.log(currentFbId);
//   Session.set('currentFeedback', currentFbId);



// });

// Template.feedbackQnMgmt.helpers({
// 	"noOfFields": function() {
// 		var fakeArray = new Array();
// 		for(i = 0; i < Session.get('fields'); i++){
// 			fakeArray.push("a")
// 		}
//     return fakeArray;
// 	},
// 	"feedbackTitle": function() {
// 		var url =  window.location.href;
// 		var positionEqual = url.indexOf('=');	
// 		var fbId=url.substring(positionEqual+1);

// 		var feedbackTitle = Feedback.findOne({_id:fbId}).feedbackTitle;
//     		console.log(feedbackTitle+ " feedbackTitle")
//     	return feedbackTitle;
// 	}
// });

// Template.viewQn.helpers({
// 	"feedbackQns": function() {

// 		var url =  window.location.href;
// 		var positionEqual = url.indexOf('=');	
// 		var fbId=url.substring(positionEqual+1);

// 		var feedbackQnResults = FeedbackAnswers.findOne({_id:fbId}).qnOptions;

// 		 return feedbackQnOptions;
// 	}
// });

// Template.feedbackList.helpers({
// 	"survey": function() {
// 		return Feedback.find({});
// 	}	
// });

// Template.feedbackQnMgmt.helpers({
// 	"statusTitle": function() {
// 		return Session.get('statusTitle');
// 	}	
// });

// Template.registerHelper('equals', function (a, b) {
//       return a == b;
//     });


// Template.feedbackQnMgmt.events({
// 	"click #addFields" : function(e) {
// 		 //var name = template.$(event.target).data('modal-template');
// 		 e.preventDefault();

// 		 var fields = Session.get('fields');
// 		 var noOfFields = fields+1;
// 		 if(isNaN(fields)) noOfFields = 1;
// 		 console.log("fields " + fields);
// 		 console.log("noOfFields " + noOfFields);
// 		 Session.set('fields', noOfFields);
// 	},
// 	"click #deleteQn" : function(e) {
// 		 //var name = template.$(event.target).data('modal-template');
// 		 e.preventDefault();

// 		 var fields = Session.get('fields');
// 		 var noOfFields = fields+1;
// 		 if(isNaN(fields)) noOfFields = 1;
// 		 console.log("fields " + fields);
// 		 console.log("noOfFields " + noOfFields);
// 		 Session.set('fields', noOfFields);
// 	},
// 	"click #saveFeedback" : function(e) {
// 		//
// 	},
// 	"click #editTitle" : function(e) {
// 		 //var name = template.$(event.target).data('modal-template');
// 		 e.preventDefault();
// 		 Session.set('statusTitle', "editting");
// 	},
// 	"click #saveTitle" : function(e) {
// 		 //var name = template.$(event.target).data('modal-template');
// 		 e.preventDefault();

// 		var url =  window.location.href;
//     		console.log(url+ " url")
// 		var positionEqual = url.indexOf('=');	
// 		var fbId=url.substring(positionEqual+1);
// 		var newTitle = document.getElementById("editTitleFeedback").value;
// 		var newType = document.getElementById("editFeedbackType").value;
// 		//all the backend and blah
// 		Meteor.call("editFeedbackDetails", fbId, newTitle, newType);

// 		 Session.set('statusTitle', "notEditting");
// 	}

// });

// Template.createQn.events({
// 	"click #saveQn" : function(e) {
// 		 //var name = template.$(event.target).data('modal-template');
// 		 e.preventDefault();

// 		var url =  window.location.href;
//     		console.log(url+ " url")
// 		var positionEqual = url.indexOf('=');	
// 		var fbId=url.substring(positionEqual+1);
//    //  		console.log(currentCourse+ " currnt course code");
// 			// var meep = Feedback.findOne({_id:fbId});

// 		var question = document.getElementById("qnQn").value;
// 		var LSPQnID = "not yet";
// 		 var qnType = Session.get('qnType');
// 		 var optionsForQn =  new Array();

// 		 if(qnType==="vtext" || qnType==="paraText"){
// 	    		console.log( " do nth")
// 		} else {
// 			var qnOptions = document.getElementsByName("qnOptions");
//     		console.log(qnOptions.length+ " qn options length");
// 			for(var x = 0, l = qnOptions.length; x < l;  x++){
// 				var qnOption = qnOptions[x].value;				
// 				optionsForQn.push(qnOption);
				
//     		}
// 	    	console.log(optionsForQn.length+ " ARR SIZE")
// 		}
// 		Meteor.call("createNewQuestion", fbId, question, qnType, LSPQnID, optionsForQn);
// 	}

// });

// Template.addFeedbackForm.events({
// 	"click #addFeedbackButton" : function(e) {
// 		 //var name = template.$(event.target).data('modal-template');
// 		 e.preventDefault();

// 		var feedbackTitle = document.getElementById("feedbackTitle").value;
// 		var feedbackType = document.getElementById("feedbackType").value;
// 		Meteor.call("createNewFeedback", feedbackTitle, feedbackType);
		
// 	}

// });

// Template.viewQn.events({
// 	"click #editFields" : function(e) {
// 		 e.preventDefault();
// 		 console.log(this);
// 	}
// });



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
// /*

// editTitleFeedback	//Title of survey
// saveSurvey //button to save survey to db
// launchSurvey //button to save survey to db and launch it (set status to active)
//  class="feedbackQuestion"

// feedbackQn{
// 	qnID: (Mongo self generate also can)
// 	surveyID: 
// 	feedbackType: (either trainer/facility/course)
// 	inputType: (eg radiobutton);
// 	question: (qn goes here)
// 	Options: (list of options they can choose from or nothing here is input type is text)
// 	LSPQnID: [If got link to LSP qn]
// }

// feedbackAnswer{
// 	qnID: (link to the qnID)
// 	courseID: 
// 	trainerID: [If evaluating trainer]
// 	facilityID: [If evaluating facility]
// 	Response: [
// 		studentID:
// 		response:
// 	]
// }

// */
// 	}
// });

// // Template.addTrainer.helpers({
// 	// "times" : function listCourseEventHandler(e) {
// 		// Session.set('times', 0);
// 	// }
// // });


