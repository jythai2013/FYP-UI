
Template.sendEmail.events({
  'click .sendCancelEmailBtn': function(e) {
    e.preventDefault();
	var subject = "test Subject";
	var text = "test content";
	//to, from, subject, text
    tDate = new Date();
    tDate.setMinutes(tDate.getMinutes() + 1)
    details = {to:"asdf154@gmail.com", from:"asdf154+from@gmail.com", subject:subject, text:text, date:tDate}
		Meteor.call("scheduleMail", details)
  }
});