Meteor.methods({
	
	"upsertFeedback":function upsertFeedback(options){
		// reads db if qnID alr exists. if yes, update the response array with the latest response (ie push it in). else insert the whole thing
		console.log(options);
		var fObj = Feedback.findOne({_id:options.qnID});
		console.log(fObj);
		
		
		if(fObj == null || fObj == undefined){ //a feedback for this qnID does not yet exist. so just add the whole thing in
			newObj.qnID 			= options.qnID
			newObj.courseID 	= options.courseID
			newObj.trainerID 	= options.trainerID
			newObj.facilityID = options.facilityID
			newObj.responses 	= new Array();
			newObj.responses.push(options.response);
			var newObj = {};
			Feedback.insert(newObj);
			
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

	
	"createNewFeedback":function(title, type, size){

			Feedback.insert({
				feedbackTitle: title,
				feedbackType: type,
				qnSize: size
			});
		
	},

	"createNewQuestion":function(feedbackID, size, qnNum, question, questionType, lspId, optionsForQn){

   		Feedback.update(feedbackID, {
   			$set: {
				qnSize: size
			},


	        $push: {
	        	qnOptions:{
	        		qnID: qnNum,
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
		console.log("Question with _id: " + _id + " has been removed");
	}
	
	//"deleteFeedback":function deleteFeedback(_id){
	//	console.log(_id);
	//	Feedback.remove(_id);
	//}
});