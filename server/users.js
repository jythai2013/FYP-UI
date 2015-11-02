   Meteor.methods({ 

    'editUsers': function editUsers(_id, uFirstName, uLastName, uGender, uDOB, uIdType, uIdNumber, uNationality, uCompany, uResidence, uAdd, uPostal, uMobile, uOffice, uPreferredLang, uQualification, eName, eContact, eAdd, ePostal, eRelationship){
        // if(Meteor.user.userType != "admin"){
          // return false; //TODO: output error message in client
        // }
        
        // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
        Users.update(_id, {
          $set: {
                userFirstName: uFirstName,
                userLastName: uLastName,
                userGender: uGender,
                userDOB: uDOB,
                userIdType: uIdType,
                userIdNumber: uIdNumber,
                userNationality: uNationality,
                userCompany: uCompany,
                userEmail: cEmail,
                userAdd: uAdd,
                userPostal: uPostal,
                userTelephone: [{
                    userResidence: uResidence,
                    userMobile: uMobile,
                    userOffice: uOffice
                }],
                userPreferredLang: uPreferredLang,
                userQualification: uQualification,
                userEmergency:[
                    {ecName:eName,
                    ecContact:eContact,
                    ecAdd:eAdd,
                    ecPostal:ePostal,
                    ecRelationship: eRelationship
                }
                ]
          }
        });
      },
      
      'deleteUsers': function deleteUsers(_id){
        // if(Meteor.user.userType != "admin"){
          // return false; //TODO: output error message in client
        // }
        Users.remove(_id);
      },
      
      'createUsers': function createUsers(uFirstName, uLastName, uGender, uDOB, uEmail, uIdType, uIdNumber, uNationality, uCompany, uResidence, uAdd, uPostal, uMobile, uOffice, uPreferredLang, uQualification, eName, eContact, eAdd, ePostal, eRelationship){
        // debugger;
        // if(Meteor.user.userType != "admin"){
          // return false; //TODO: output error message in client
        // }
        console.log("in create users fk you");

        Users.insert({
                userFirstName: uFirstName,
                userLastName: uLastName,
                userGender: uGender,
                userDOB: uDOB,
                userEmail: uEmail,
                userIdType: uIdType,
                userIdNumber: uIdNumber,
                userNationality: uNationality,
                userCompany: uCompany,
                userAdd: uAdd,
                userPostal: uPostal,
                userTelephone: [{
                    userResidence: uResidence,
                    userMobile: uMobile,
                    userOffice: uOffice
                }],
                userPreferredLang: uPreferredLang,
                userQualification: uQualification,
                userEmergency:[
                    {ecName:eName,
                    ecContact:eContact,
                    ecAdd:eAdd,
                    ecPostal:ePostal,
                    ecRelationship: eRelationship
                }
                ]
        });
    }
 });