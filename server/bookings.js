 Meteor.methods({ 

  'editBooking': function editBooking(_id, bookingDateI, sessionNoI, startTimeI, endTimeI, facIdI){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      
      // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
      Bookings.update(_id, {
        $set: {
          bookingDate: bookingDateI,
          sessionNo: sessionNoI,
          startTime: startTimeI,
          endTime: endTimeI,
          facId: facIdI
        }
      });
    },
    
    'deleteBooking': function deleteBooking(_id){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Bookings.remove(_id);
    },
    
    'createBooking': function createBooking(bookingDateI, sessionNoI, startTimeI, endTimeI, facIdI){
      // debugger;
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Bookings.insert({
          bookingDate: bookingDateI,
          sessionNo: sessionNoI,
          startTime: startTimeI,
          endTime: endTimeI,
          facId: facIdI
      });
  }
 });