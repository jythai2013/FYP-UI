 Meteor.methods({ 

  'editMaterial': function editMaterial(_id, courseI, sessionNoI, fileIdI){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      
      // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
      Materials.update(_id, {
        $set: {
          course: courseI,
          sessionNo: sessionNoI,
          fileName: fileIdI
        }
      });
    },
    
    'deleteMaterial': function deleteMaterial(_id){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      Materials.remove(_id);
    },
    
    'createMaterial': function createMaterial(courseI, sessionNoI, fileIdI){
      // debugger;
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      console.log("materialdbbb")
      Materials.insert({
          course: courseI,
          sessionNo: sessionNoI,
          fileName: fileIdI
      });
  }
 });