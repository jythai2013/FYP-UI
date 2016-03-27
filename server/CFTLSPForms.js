Meteor.methods({
	

	
	"createNewLSPForm":function(id, type, IassessedBy, IassessmentDate){

			LSPSurvey.insert({
				asessedOn: id,
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