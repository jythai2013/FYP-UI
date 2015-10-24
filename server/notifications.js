 Meteor.methods({ 

  'editNotification': function editNotification(_id, userIdI, notificationI, toDoListI){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      
      // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
      Notifications.update(_id, {
        $set: {
          userId: userIdI,
          notification: notificationI,
          toDoList: toDoListI
        }
      });
    },
    
    'deleteNotification': function deleteNotification(_id){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Notifcations.remove(_id);
    },
    
    'createNotification': function createNotification(groupIdI, courseI, fileNameI, fileI){
      // debugger;
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Notifications.insert({
          userId: userIdI,
          notification: notificationI,
          toDoList: toDoListI
      });
  });