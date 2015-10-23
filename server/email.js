//http://vazamb.github.io/email-in-meteor/



// process.env.MAIL_URL="smtp://username%40gmail.com:password@smtp.gmail.com:465/";
process.env.MAIL_URL="smtp://GmailUsername%40gmail.com:GmailPassword@smtp.gmail.com:465/";

Meteor.methods({
	"scheduleMail":function scheduleMail(details) { 
		if (details.date < new Date()) {
			sendMail(details);
		} else {
			var thisId = FutureTasks.insert(details);
			addTask(thisId, details);		
		}
		return true;
	},
	
	"sendMail":function(details){
		sendMail(details);
	},
		
	"addTask":function(id, details){
		addTask(id, details);
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
		
		FutureTasks.remove(details._id);
	}

function addTask(id, details) {
		SyncedCron.add({
			name: id,
			schedule: function(parser) {
				return parser.recur().on(details.date).fullDate();
			},
			job: function() {
				sendMail(details);
				FutureTasks.remove(id);
				SyncedCron.remove(id);
					return id;
			}
		});
	}

// to remove and stop running the job referenced by jobName.
// SyncedCron.remove(jobName) 

// To schedule a once off (i.e not recurring) event, create a job with a schedule like this 
// parser.recur().on(date).fullDate();