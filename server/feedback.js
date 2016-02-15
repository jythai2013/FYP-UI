Meteor.methods({
	//"createFeedback":function createFeedback(options){
	//	console.log(options);
	//	Feedback.insert(options);
	//},
	
	//"readFeedback":function readFeedback(options){
	//	
	//},
	
	"upsertFeedback":function upsertFeedback(options){
		// reads db if qnID alr exists. if yes, update the response array with the latest response (ie push it in). else insert the whole thing
		console.log(options);
		var fObj = Feedback.findOne(options.qnID);
		console.log(fObj);
		
		
		if(fObj == null || fObj == undefined){ //a feedback for this qnID does not yet exist. so just add the whole thing in
			Feedback.insert(options);
		} else{ //a feedback for this qnID alr exists. so update it 
			var responses = fObj.response;
			var rObj = {};
			rObj.userId = options.userId;
			rObj.response = options.response;
			responses.push(rObj);
			Feedback.update({qnID:options.qnID},{$set:{response:responses}});
		}
		
	},
	
	"deleteFeedback":function(_id){
		console.log(_id);
      	Feedback.remove(_id);
		
	},

	
	"createNewFeedback":function(title, type){

			Feedback.insert({
				feedbackTitle: title,
				feedbackType: type
			});
		
	},

	"createNewQuestion":function(feedbackID, question, questionType, lspId, optionsForQn){

   		Feedback.update(feedbackID, {
	        $push: {
	        	qnOptions:{
					feedbackQn: question,
					qnType: questionType,
					lspQnId: lspId,
					options: optionsForQn
	          	}
	        }
	        		
	    });
		
	},		

	'editFeedbackDetails': function editFeedbackDetails(fbId, newTitle, newType){
			// if(Meteor.user.userType != "admin"){
				// return false; //TODO: output error message in client
			// }
			Feedback.update({_id: fbId}, {
		        $set: {
					feedbackTitle: newTitle,
					feedbackType: newType
				}
      		});
		},
		
	
	"deleteOldQuestion":function(_id){
		
			console.log(_id);
      		Feedback.remove(_id);
	}
	
	//"updateFeedback":function updateFeedback(cCode, options){
	//	console.log(cCode);
	//	console.log(options);
	//	Courses.update({courseCode: cCode}, {
	//		$set: options
	//	});
	//},
	
	//"deleteFeedback":function deleteFeedback(_id){
	//	console.log(_id);
	//	Feedback.remove(_id);
	//}
});