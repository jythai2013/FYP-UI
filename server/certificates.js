 Meteor.methods({ 

  'editCertificate': function editCertificate(_id, courseI, sessionI, questionsI, answersI){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      
      // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
      Certificates.update(_id, {
        $set: {
          course: bookingDateI,
          session: sessionNoI,
          question: questionI,
          answer: answerI
        }
      });
    },
    
    'deleteCertificate': function deleteCertificate(_id){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Certificates.remove(_id);
    },
    
    'createCertificate': function createCertificate(courseI, sessionI, questionsI, answersI){
      // debugger;
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Certificates.insert({
          course: bookingDateI,
          session: sessionNoI,
          question: questionI,
          answer: answerI
      });
  });