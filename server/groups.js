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
          dateTimeSession: dateTimeSessionI,
          startDate: startDateI,
          endDate: endDateI,
          studentList: studentListI,
          trainers: trainersI,
          grades: gradesI,
          paymentDeadline: paymentDeadlineI,
          min: minI,
          max: maxI,
          attendance: attendanceI,
          status: statusI
        }
      });
    },
    
    'deleteGroup': function deleteGroup(_id){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Groups.remove(_id);
    },
    
    'createGroup': function createGroup(courseI, sessionI, questionsI, answersI){
      // debugger;
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Groups.insert({
          courseCode: courseCodeI,
          grpNum: grpNumI,
          dateTimeSession: dateTimeSessionI,
          startDate: startDateI,
          endDate: endDateI,
          studentList: studentListI,
          trainers: trainersI,
          grades: gradesI,
          paymentDeadline: paymentDeadlineI,
          min: minI,
          max: maxI,
          attendance: attendanceI,
          status: statusI
      });
  }
 }); 