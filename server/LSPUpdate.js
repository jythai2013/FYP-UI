Meteor.methods({
	"updateLSPForMattThing": function(LSP, _id){
		LSPSurvey.update({_id:_id}, LSP);
	}
});