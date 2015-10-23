
Template.sendEmail.events({
  'click #sendTestEmailButton': function(e) {
	e.preventDefault();
	classlist = e.target.value;
	var subject = "test Subject";
	var text = "test content";
	//to, from, subject, text
    tDate = new Date();
    // tDate.setMinutes(tDate.getMinutes() + 1) // send email 1 minute from now
		
		//loop through the users in this class and send
		classlist.forEach(function(student){
			toEmail = student.email[0];
			details = {to:toEmail, from:"asdf154+from@gmail.com", subject:subject, text:text, date:tDate}
			Meteor.call("scheduleMail", details)
		});
		
		// //Original send to only 1 person code:
		// toEmail = "asdf154@gmail.com";
    // details = {to:toEmail, from:"asdf154+from@gmail.com", subject:subject, text:text, date:tDate}
		// Meteor.call("scheduleMail", details)
  }
});