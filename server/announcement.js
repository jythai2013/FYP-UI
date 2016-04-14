
Meteor.methods({ 
	
	'insertAnnouncement': function insertServerAnnouncement(gId, announList){
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

	'editAnnouncement': function editServerAnnouncement(gId, announListObj){
		console.log("announcement.js >> editAnnouncement (Server)");
		console.log("(editAnnouncementupdate) "+gId+" >>> From: "+announListObj);
		Groups.update({_id:gId}, {$pull:{announcement:announListObj}});
		console.log(">> updated");
	}
});