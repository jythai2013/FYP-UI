
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
		console.log("(editAnnouncementupdate) "+gId+" >>> From: "+announList.length);
		Groups.update({_id:gId}, {$set:{announcement:announList}});
		console.log(">> updated");
	}
});