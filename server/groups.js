//schedules checking of recommendations for a student when he finishes a course
scheduleRecommender = function addTask(id, details) {
	// console.log("addTask");
	SyncedCron.add({
		name: id,
		schedule: function(parser) {
			return parser.recur().on(details.date).fullDate();
		},
		job: function() {
			// console.log(details);
			studentId = details.studentId;
			groupId = details.groupId;
			console.log("start");
			var a = studentFinishedCourseRecommender(studentId, groupId)
			console.log(a);
			FutureTasks.remove(id);
			SyncedCron.remove(id);
			console.log("end");
			return id;
		}
	});
};

//checks for differences between 2 arrays
function arr_diff (a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }
    for (var k in a) {
        diff.push(k);
    }
    return diff;
};

Meteor.methods({

  'pushStudentIdToGroupClasslist': function editGroup(theGroup_id, user_id){
		// console.log(courseCode + " " + grpNum);
		Groups.update({_id:theGroup_id},{$push:{classlist:user_id}});
		// console.log(classlist);
		
		// details = {"studentId": user_id};
		// var theGroup = Groups.findOne({_id:theGroup_id});
		// dateClassFinishes = theGroup.endDate;
		// details.date = dateClassFinishes	//TODO: Date when course finishes
		// details.date = new Date();
		// details.groupId = theGroup_id;
		// var thisId = FutureTasks.insert(details);
		// scheduleRecommender(thisId, details);
		// recEngine.link(user_id, theGroup.courseId);
	},
	
  'updateGroupClasslist': function editGroup(courseCode, grpNum, classlist){
		// console.log(courseCode + " " + grpNum);
		Groups.update({courseCode:courseCode, grpNum:grpNum},{$set:{classlist:classlist}});
		// console.log(classlist);
		
		theGroup = Groups.findOne({courseCode:courseCode, grpNum:grpNum});
		oldClasslist = theGroup.classlist;
		studentsToSchedule = arr_diff(oldClasslist, classlist);
		studentsToSchedule.forEach(function(student, index, arr){
			studentId = student._id;
			details = {"studentId": studentId};
			dateClassFinishes = theGroup.endDate;
			details.date = dateClassFinishes	//TODO: Date when course finishes
			details.groupId = theGroup._id;
			var thisId = FutureTasks.insert(details);
			scheduleRecommender(thisId, details);
			recEngine.link(user_id, theGroup.courseId);
		})
	},

  // 'editGroup': function editGroup(_id, venueI, startTimeI, endTimeI, startDateI, endDateI, daysI, trainersToAddI){
  //     // if(Meteor.user.userType != "admin"){
  //       // return false; //TODO: output error message in client
  //     // }
      
  //     // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
  //     Groups.update(_id, {
  //       $set: {
  //         venue:venueI,
  //         startDate: startDateI,
  //         endDate: endDateI,
  //         startTime: startTimeI,
  //         endTime:endTimeI,
  //         days: daysI, 
  //         courseTrainers:trainersToAddI
  //       }

  //     });
  //   },

  'editGroup': function editGroup(_id, object){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      
      // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
      Groups.update(_id, {
        $set: {
          venue:object.venue,
          startDate: object.startDate,
          endDate: object.endDate,
          startTime: object.startTime,
          endTime:object.endTime,
          days: object.days, 
          courseTrainers: object.courseTrainers
        }


      });
    },

  'removeStudentFromClass': function(groupID, studID){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      console.log("here");
        Groups.update({_id: groupID},
			{ $pull: { 
				classlist: studID}
				} 
			// }
      	);
    },

  'addClassToStudent': function(studID, groupId, gradesInfo, paymentStatusArr){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }


		var theUser = Meteor.users.findOne({_id:studID});
		console.log(theUser);
		 if(theUser.grades == undefined || theUser.grades == null){ theUser.grades = {}; }
		 if(theUser.paymentStatus == undefined || theUser.paymentStatus == null){ theUser.paymentStatus = {}; }
		theUser.grades[groupId] = gradesInfo;
		theUser.paymentStatus[groupId] = gradesInfo;
		console.log(theUser)
		// console.log(inObj.StudentID)
		// console.log(theUser.grades)
		
		Meteor.users.update({_id:studID}, theUser);


      console.log("here");
    },
    

  'studentPaid': function(groupID, studID){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      console.log("here");
      	Meteor.users.update({'_id': studID, "paymentStatus.groupID":groupID}, 
      		{ $set:{
					status: "paid"
				}
			}

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
    
    'deleteTrainer': function (groupID, trainerID){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      console.log("in server delete group")
      // for (var _id in removeCurrentGroupsIDArr){
      //   console.log("in for loop delete group")
      //   console.log(_id+ " _id")
      
        // console.log(_id);
      		Groups.update({_id: groupID},

      			{ $pull: { 
					courseTrainers: trainerID} 
      			}


      		);
         
      // }
     
    },
    
    'createGroup': function createGroup(obj){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }

      console.log("create group >> Server");
      console.log(obj);
      //var id = 
			if(obj.classlist == undefined) obj.classlist = new Array();
      Groups.insert(obj);

      //console.log(id);
			
			/*
			test blast reminder 3 days before groups start. (for development it is blast immediately)
			change it to 1 minute later and test to test scheduling
			change it to 3 days before
			*/
			// blastReminderCall(courseCodeI, grpNumI1, startTimeI, endTimeI, startDateI, endDateI, paymentDeadlineI, statusI);
			
			//TODO: test schedule payment reminder checking
			var cCode = obj.courseCode;
			var grpNum = obj.grpNum;
			var theCourse = Courses.findOne({courseCode:cCode});
			if(theCourse == undefined){return false;}
			var courseName = theCourse.courseName;
			// console.log("courseName: " + courseName);
			var timeInMin = 1;
			var nowDateTime = new Date();
			var year = nowDateTime.getFullYear();
			var month = nowDateTime.getMonth();
			var dayD = nowDateTime.getDate();
			var hours = nowDateTime.getHours();
			var mins = nowDateTime.getMinutes();
			var seconds = nowDateTime.getSeconds();
			var newDateObj = new Date(year, month, dayD, hours, mins, seconds+10);
			// var newDateObj = new Date(startTimeI.getTime() + timeInMin*60000);
			console.log(newDateObj);
			console.log("schedulePaymentReminder1");
			Meteor.call("schedulePaymentReminder", cCode, obj.grpNum, newDateObj);
			console.log("schedulePaymentReminder2");
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
 
 