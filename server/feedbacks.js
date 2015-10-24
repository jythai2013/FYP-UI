 Meteor.methods({ 

  'editFeedback': function editFeedback(_id, courseI, sessionI, questionsI, answersI){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      
      // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
      Feedbacks.update(_id, {
        $set: {
          course: bookingDateI,
          session: sessionNoI,
          question: questionI,
          answer: answerI
        }
      });
    },
    
    'deleteFeedback': function deleteFeedback(_id){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Feedbacks.remove(_id);
    },
    
    'createFeedback': function createFeedback(courseI, sessionI, questionsI, answersI){
      // debugger;
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Feedbacks.insert({
          course: bookingDateI,
          session: sessionNoI,
          question: questionI,
          answer: answerI
      });
  }
 });