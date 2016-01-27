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