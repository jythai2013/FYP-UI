 //   Meteor.methods({ 
 //      'createUsers': function createUsers(uFirstName, uLastName, uGender, uDOB, uEmail, uIdType, uIdNumber, uNationality, uCompany, uResidence, uAdd, uPostal, uMobile, uOffice, uPreferredLang, uQualification, eName, eContact, eAdd, ePostal, eRelationship){
 //        // debugger;
 //        // if(Meteor.user.userType != "admin"){
 //          // return false; //TODO: output error message in client
 //        // }
 //        console.log("in create users fk you");

 //        Users.insert({
 //                userFirstName: uFirstName,
 //                userLastName: uLastName,
 //                userGender: uGender,
 //                userDOB: uDOB,
 //                userEmail: uEmail,
 //                userIdType: uIdType,
 //                userIdNumber: uIdNumber,
 //                userNationality: uNationality,
 //                userCompany: uCompany,
 //                userAdd: uAdd,
 //                userPostal: uPostal,
 //                userTelephone: [{
 //                    userResidence: uResidence,
 //                    userMobile: uMobile,
 //                    userOffice: uOffice
 //                }],
 //                userPreferredLang: uPreferredLang,
 //                userQualification: uQualification,
 //                userEmergency:[
 //                    {ecName:eName,
 //                    ecContact:eContact,
 //                    ecAdd:eAdd,
 //                    ecPostal:ePostal,
 //                    ecRelationship: eRelationship
 //                }
 //                ]
 //        });
 //    }
 // });