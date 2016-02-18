
Meteor.methods({ 
	
	'insertAnnouncement': function insertAnnouncement(gId, announList){
		console.log("announcement.js >> insertAnnouncement (Server)");
		console.log("update: "+gId);
		Groups.update({_id:gId},{$set:{announcement:announList}});
		console.log(">> insertAnnouncement (+1)");
	},

	'isLauncherActive': function checkForWindowURL(){

		if(window.location == 'myfixedurl')
		{
		    return true;
		}
		return false;
	}
});