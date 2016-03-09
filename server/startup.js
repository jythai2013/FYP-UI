Meteor.startup(function() {

	FutureTasks.find().forEach(function(mail) {
		if (mail.date < new Date()) {
			Meteor.call("sendMail", mail);
		} else {
			addTask(mail._id, mail);
		}
	});
	SyncedCron.start();
	
	//if(Meteor.users.findOne({userType:{admin:true}}) == undefined){
	if(Meteor.users.findOne({username:"admin"}) == undefined){
		var ust = new Object();
		ust.admin = true;
		var options = {username:"admin", email:"admin@sterling", password:"admin", userType:ust, mobileNo:987654321, fullName:"Elements Admin"};
		var id = Accounts.createUser(options)
		console.log(id);
	}
	
});