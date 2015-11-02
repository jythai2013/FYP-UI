
// Template.sendEmail.events({
//   'click #sendTestEmailButton': function(e) {
// 	e.preventDefault();
// 	classlist = e.target.value;
// 	var subject = "test Subject";
// 	var text = "test content";
// 	//to, from, subject, text
//     tDate = new Date();
//     // tDate.setMinutes(tDate.getMinutes() + 1) // send email 1 minute from now
		
// 		//loop through the users in this class and send
// 		classlist.forEach(function(student){
// 			toEmail = student.email[0];
// 			details = {to:toEmail, from:"asdf154+from@gmail.com", subject:subject, text:text, date:tDate}
// 			Meteor.call("scheduleMail", details)
// 		});
		
// 		// //Original send to only 1 person code:
// 		// toEmail = "asdf154@gmail.com";
//     // details = {to:toEmail, from:"asdf154+from@gmail.com", subject:subject, text:text, date:tDate}
// 		// Meteor.call("scheduleMail", details)
//   }
// });


// Template.blastReminder.events({
//   'click #sendTestEmailButton': function(e) {
// 		e.preventDefault();
		
		
		
// 		var subject = "Course Payment Due";
// 		var text = 	"Dear Sir/Mdm,\n"+
// 								"\n"+
// 								"Thank you for showing your interest in {courseName}\n"+
// 								"The payment deadline for {courseName} is due in 3 days time. Please make your payment otherwise we not allow you to attend the course.\n"+
// 								"\n"+
// 								"Best regards,\n"+
// 								"Sterling Training Hub\n"+
// 								"\n"+
// 								"Disclaimer: If you have already paid for the course, please ignore this email.";
// 		tDate = new Date(); //date to send mail
// 		// tDate.setMinutes(tDate.getMinutes() + 1) // send email 1 minute from now
		
		
		
// 		var someDate = new Date();
// 		var numberOfDaysToAdd = 3;
// 		someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
// 		var groupsToBlast = Groups.find({"start":{$lte: someDate}});
		
		
		
// 		groupsToBlast.forEach(function(group){
// 			group.classlist.forEach(function(student){
// 				toEmail = student.email[0];
// 				details = {to:toEmail, from:"asdf154dev@gmail.com", subject:subject, text:text, date:tDate} //to, from, subject, text
// 				Meteor.call("scheduleMail", details)
// 			});
// 		});
// 	}
// });