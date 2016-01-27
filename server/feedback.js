Meteor.methods({
	"createFeedback":function createFeedback(options){
		console.log(options);
		Courses.insert(options);
	},
	
	"readFeedback":function readFeedback(options){
		
	},
	
	"updateFeedback":function updateFeedback(cCode, options){
		console.log(cCode);
		console.log(options);
		Courses.update({courseCode: cCode}, {
			$set: options
		});
	},
	
	"deleteFeedback":function deleteFeedback(_id){
		console.log(_id);
		Feedback.remove(_id);
	}
});