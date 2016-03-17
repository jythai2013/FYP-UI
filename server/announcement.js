
Meteor.methods({ 
	
	'insertAnnouncement': function insertAnnouncement(gId, announList){
		console.log("announcement.js >> insertAnnouncement (Server)");
		console.log("update: "+gId);
		Groups.update(gId,{
			$push:{
				announcement:
				announList
			}
		});
		console.log(">> insertAnnouncement (+1)");
	},

	'editAnnouncement': function editAnnouncement(gId, announList){
		console.log("announcement.js >> editAnnouncement (Server)");
		console.log("update: "+gId);
		Groups.update({_id:gId},{$set:{announcement:announList}});
		console.log(">> updated");
	},

	'deleteAnnouncement': function editAnnouncement(gId, aId){
		console.log("announcement.js >> deleteAnnouncement (Server)");
		console.log("update: "+gId);
		// {courseTrainers: {trainerId: tId}
		Groups.findOne({_id:gId}).announcement.remove({_id:aId});
		console.log(">> updated");
	},


	'isLauncherActive': function checkForWindowURL(){

		if(window.location == 'myfixedurl')
		{
		    return true;
		}
		return false;
	}
});