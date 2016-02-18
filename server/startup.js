Meteor.startup(function() {

	FutureTasks.find().forEach(function(mail) {
		if (mail.date < new Date()) {
			Meteor.call("sendMail", mail);
		} else {
			addTask(mail._id, mail);
		}
	});
	SyncedCron.start();

});