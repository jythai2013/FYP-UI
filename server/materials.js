 Meteor.methods({ 

  'editMaterial': function editMaterial(_id, typeI, courseI, sessionNoI, fileIdI){
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      
      // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
      Materials.update(_id, {
        $set: {
          type: typeI,
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
    
    'createMaterial': function createMaterial(typeI, courseI, sessionNoI, fileIdI){
      // debugger;
      // if(Meteor.user.userType != "admin"){
        // return false; //TODO: output error message in client
      // }
      console.log(fileIdI);
      console.log("materialdbbb")
      Materials.insert({
          type: typeI,
          course: courseI,
          sessionNo: sessionNoI,
          fileName: fileIdI
      });

  }
 });