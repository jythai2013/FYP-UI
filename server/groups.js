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
    


    'createGroup': function createGroup(courseCodeI, grpNumI1, startTimeI, endTimeI, startDateI, endDateI, paymentDeadlineI, statusI){
      // debugger;
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      console.log("In server");

      //var grpNumI = "G2" ;

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
          status: statusI
      });

    //var grpNumI1 = Groups.find().count();
      //console.log(id);
      console.log(Groups.find().count());
      
      console.log("In server 2");
  }
 }); 