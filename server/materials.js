 Meteor.methods({ 

  'editMaterial': function editMaterial(_id, groupIdI, courseI, fileNameI, fileI){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      
      // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
      Materials.update(_id, {
        $set: {
          groupId: groupIdI,
          course: courseI,
          fileName: fileNameI,
          file: fileI
        }
      });
    },
    
    'deleteMaterial': function deleteMaterial(_id){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Materials.remove(_id);
    },
    
    'createMaterial': function createMaterial(groupIdI, courseI, fileNameI, fileI){
      // debugger;
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Materials.insert({
          groupId: groupIdI,
          course: courseI,
          fileName: fileNameI,
          file: fileI
      });
  });