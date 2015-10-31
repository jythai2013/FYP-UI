
Meteor.methods({ 
	
	'insertAnnouncement': function insertAnnouncement(aTitle, aDetails, aAuthor, classId, cCode){
		// if(Meteor.user.userType != "admin"){
			// return false; //TODO: output error message in client
		// }
		Groups.update(_id, 
			{
				courseCode: cCode, 
				groupNum: classId,
				
			}, //Query

			{ $set:
				{
					annoucement : {
						annouTitle: aTitle,
						annouDetails: aDetails,
						annouDate: new Date(),
						annouAuthor: aAuthor
					}
				}

			},
			{ upset:true} //Append
		)
	}
});