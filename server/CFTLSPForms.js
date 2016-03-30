Meteor.methods({
	

	
	"createNewLSPForm":function(id, type, IassessedBy, IassessmentDate){

			LSPSurvey.insert({
				assessedOn: id,
				formType: type,
				assessedBy: IassessedBy, 
				assessmentDate : IassessmentDate
			});
		
	}
	
	//"deleteFeedback":function deleteFeedback(_id){
	//	console.log(_id);
	//	Feedback.remove(_id);
	//}
});