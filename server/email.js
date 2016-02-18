//http://vazamb.github.io/email-in-meteor/



// process.env.MAIL_URL="smtp://username%40gmail.com:password@smtp.gmail.com:465/";
process.env.MAIL_URL="smtp://asdf154dev%40gmail.com:1234512345a@smtp.gmail.com:465/";

Meteor.methods({
	"scheduleMail":function scheduleMail(details) {
		// console.log("scheduleMail");
		if (details.date < new Date()) {
			sendMail(details);
		} else {
			var thisId = FutureTasks.insert(details);
			// console.log(thisId);
			addTask(thisId, details);		
		}
		return true;
	},
	
	"sendMail":function(details){
		sendMail(details);
	},
		
	"addTask":function(id, details){
		addTask(id, details);
	},
	
	
	"schedulePaymentReminder":function(cCode, groupNum, dateToSend){
		// console.log("schedulePaymentReminder");
		var courseName = Courses.findOne({courseCode:cCode}).courseName;
		// console.log("2");
		var subject = "Course Payment Due";
		// console.log("3");
		var text = 	"Dear Sir/Mdm,\n"+
								"\n"+
								"Thank you for showing your interest in "+courseName+"\n"+
								"The payment deadline for "+courseName+" is due in 3 days time. Please make your payment otherwise we not allow you to attend the course.\n"+
								"\n"+
								"Best regards,\n"+
								"Sterling Training Hub\n"+
								"\n"+
								"Disclaimer: If you have already paid for the course, please ignore this email.";
		// console.log("4");
		tDate = dateToSend; //date to send mail
		// console.log("5");
		// tDate.setMinutes(tDate.getMinutes() + 1) // send email 1 minute from now



		//tDate = new Date();
		var numberOfDaysToAdd = 3;
		// console.log("6");
		//tDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
		var groupToBlast = Groups.findOne({grpNum:groupNum});
		// console.log("7");


		// console.log(cCode + "email");
		// console.log(groupNum);
		// console.log(dateToSend);
		// console.log(groupToBlast);
		// groupToBlast.forEach(function(group){
			groupToBlast.classlist.forEach(function(student){
				toEmail = student.email[0];
				details = {to:toEmail, from:"asdf154dev@gmail.com", subject:subject, text:text, date:tDate} //to, from, subject, text
				Meteor.call("scheduleMail", details)
			});
		// console.log("8");
				toEmail = "cassy94@gmail.com";
				details = {to:toEmail, from:"asdf154dev@gmail.com", subject:subject, text:text, date:tDate} //to, from, subject, text
		// 		console.log(details);
				Meteor.call("scheduleMail", details)
		// console.log("9");
		// });
	}
});


	
function sendMail(details) {
	// if(Meteor.user.userType != "admin"){
	// alert("You are not an admin"); //TODO: make a nice message
	// return false;
	// }
	to = details.to;
	from = details.from;
	subject = details.subject;
	text = details.text;
	check([to, from, subject, text], [String]);

	// this.unblock();

	Email.send({
		to: to,
		from: from,
		subject: subject,
		text: text
	});
	
	console.log("Email Sent")
	FutureTasks.remove(details._id);
}

function addTask(id, details) {
		// console.log("addTask");
		SyncedCron.add({
			name: id,
			schedule: function(parser) {
				return parser.recur().on(details.date).fullDate();
			},
			job: function() {
				// console.log(details);
				sendMail(details);
				FutureTasks.remove(id);
				SyncedCron.remove(id);
					return id;
			}
		});
		// console.log(SyncedCron._entries[0]);
	}

// to remove and stop running the job referenced by jobName.
// SyncedCron.remove(jobName) 

// To schedule a once off (i.e not recurring) event, create a job with a schedule like this 
// parser.recur().on(date).fullDate();


