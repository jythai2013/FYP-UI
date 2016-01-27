 Meteor.methods({ 

  'editFeedbacks': function editFeedback(_id, courseI, sessionI, questionsI, answersI){
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
    
    'deleteFeedbacks': function deleteFeedback(_id){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Feedbacks.remove(_id);
    },
    
    'createFeedbacks': function createFeedback(courseI, sessionI, questionsI, answersI){
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