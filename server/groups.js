 Meteor.methods({ 

  'pushStudentIdToGroupClasslist': function editGroup(theGroup_id, user_id){
		// console.log(courseCode + " " + grpNum);
		Groups.update({_id:theGroup_id},{$push:{classlist:user_id}});
		// console.log(classlist);
	},
	
  'updateGroupClasslist': function editGroup(courseCode, grpNum, classlist){
		// console.log(courseCode + " " + grpNum);
		Groups.update({courseCode:courseCode, grpNum:grpNum},{$set:{classlist:classlist}});
		// console.log(classlist);
	},

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
    
    'deleteGroup': function deleteGroup(removeCurrentGroupsArr){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      console.log("in server delete group")
      // for (var _id in removeCurrentGroupsIDArr){
      //   console.log("in for loop delete group")
      //   console.log(_id+ " _id")
      removeCurrentGroupsArr.forEach(function(_id) {
        console.log(_id);
        Groups.remove(_id);
      });
         
      // }
     
    },
    
    'deleteClass': function deleteClass(_id){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      console.log("in server delete group")
      // for (var _id in removeCurrentGroupsIDArr){
      //   console.log("in for loop delete group")
      //   console.log(_id+ " _id")
      
        console.log(_id);
        Groups.remove(_id);
         
      // }
     
    },

    'deleteStudent': function deleteStudent(sFirstName, sLastName){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }

      Groups.remove({ studFirstName: sFirstName, studLastName: sLastName });
    },
    
    'createGroup': function createGroup(obj){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }

      console.log("create group >> Server");
      console.log(obj);
      obj.classlist = new Array();
      var options = obj;
      //var id = 
      Groups.insert(obj);

      //console.log(id);
			
			/*
			test blast reminder 3 days before groups start. (for development it is blast immediately)
			change it to 1 minute later and test to test scheduling
			change it to 3 days before
			*/
			// blastReminderCall(courseCodeI, grpNumI1, startTimeI, endTimeI, startDateI, endDateI, paymentDeadlineI, statusI);
			
			//TODO: test schedule payment reminder checking
			var courseName = Courses.findOne({courseCode:courseCodeI}).courseName;
			var timeInMin = 1;
			var nowDateTime = new Date();
			var year = nowDateTime.getFullYear();
			var month = nowDateTime.getMonth();
			var dayD = nowDateTime.getDate();
			var hours = nowDateTime.getHours();
			var mins = nowDateTime.getMinutes();
			var seconds = nowDateTime.getSeconds();
			var newDateObj = new Date(year, month, dayD, hours, mins + 1, seconds);
			// var newDateObj = new Date(startTimeI.getTime() + timeInMin*60000);
			Meteor.call("schedulePaymentReminder", courseCodeI, grpNumI1, newDateObj);
			
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
	text = "aText";
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
 
 