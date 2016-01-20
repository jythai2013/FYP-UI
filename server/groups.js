 Meteor.methods({ 

  'editGroup': function editGroup(_id, courseCodeI, grpNumI, dateTimeSessionI, startDateI,endDateI, studentListI, trainersI, gradesI, paymentDeadlineI, minI, maxI, attendanceI, statusI){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      
      // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
      Groups.update(_id, {
        $set: {
          courseCode: courseCodeI,
          grpNum: grpNumI,
          startDate: startDateI,
          endDate: endDateI,
          startTime: startTimeI,
          endTime:endTimeI,
          studentList: studentList,
          paymentDeadline: paymentDeadlineI,
          status: statusI
        }
      });
    },

  'insertGroupAnnouncement': function editGroupAnnounce(_id, aTitle, aDetails, aAuthor){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      console.log("in SERVER");
      console.log(aTitle);
      // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
      Groups.update(_id, {
        $push: {
          announcement: 
          {
          title: aTitle,
          content:aDetails,
          author:aAuthor,
          dateTime: new Date()
          }
        }
      });
      console.log("in SERVER");
    },

  'addStudent': function addStudent(_id, cCode, sFirstName, sLastName){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      
      // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
      Groups.update( 
        {courseCode: cCode},
        {
          studentList:{
            studFirstName: sFirstName, 
            studLastName: sLastName
          } 
        },
        {upsert:true}
      );
    },
    
    'deleteGroup': function deleteGroup(_id){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Groups.remove(_id);
    },

    'deleteStudent': function deleteStudent(sFirstName, sLastName){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }

      Groups.remove({ studFirstName: sFirstName, studLastName: sLastName });
    },
    


    'createGroup': function createGroup(courseCodeI, grpNumI1, startTimeI, endTimeI, startDateI, endDateI, paymentDeadlineI, statusI, addClassDaysArr){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }

      console.log(courseCodeI);

      //var id = 
      Groups.insert({
          courseCode: courseCodeI,
          grpNum: grpNumI1,
          startTime: startTimeI,
          endTime:endTimeI,
          startDate: startDateI,
          endDate: endDateI,
          paymentDeadline: paymentDeadlineI,
          status: statusI,
          classDays: addClassDaysArr
      });

      //console.log(id);
			
			/*
			test blast reminder 3 days before groups start. (for development it is blast immediately)
			change it to 1 minute later and test to test scheduling
			change it to 3 days before
			*/
			// blastReminderCall(courseCodeI, grpNumI1, startTimeI, endTimeI, startDateI, endDateI, paymentDeadlineI, statusI);
			
      console.log(Groups.find().count());
		},
		
		//can use this on a button to test also. after testing can just remove and use the above one
		'blastReminder':function blast(courseCodeI, grpNumI1, startTimeI, endTimeI, startDateI, endDateI, paymentDeadlineI, statusI){
			
			blastReminderCall(courseCodeI, grpNumI1, startTimeI, endTimeI, startDateI, endDateI, paymentDeadlineI, statusI);
			
		}
 }); 
 
function blastReminderCall(courseCodeI, grpNumI1, startTimeI, endTimeI, startDateI, endDateI, paymentDeadlineI, statusI){
	// details.date = startDateI + 3 days; //<-TODO
	details.date = startDateI;
	details.jobType = "blastReminder"
	details.courseCode = courseCodeI;
	details.grpNum = grpNumI1;
	var id = FutureTasks.insert(details);
	SyncedCron.add({
		name: id,
		schedule: function(parser) {
			return parser.recur().on(details.date).fullDate();
		},
		job: function() {
			blastReminder(details);
			FutureTasks.remove(id);
			SyncedCron.remove(id);
				return id;
		}
	});
}
 
function blastReminder(details){
	subject = "aSubject";
	text = new Date();
	var theGroup = Groups.findOne({courseCode:details.courseCode, grpNum:details.grpNum})
	console.log(theGroup);
	studentList = theGroup.studentList;
	console.log(studentList);
	
	studentList.forEach(function(student){
		toEmail = student.emails[0];
		details2 = {to:toEmail, from:"asdf154+from@gmail.com", subject:subject, text:text, date:tDate}
		Meteor.call("scheduleMail", details2)
	})
}
 
 