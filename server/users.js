   Meteor.methods({ 

    'editStudent': function editStudent(_id, firsNameI, lastNameI, genderI, idTypeI, idNoI, companyI, emailI, addressI,postalCodeI,telephoneI,bDayI,resStatI, nationalityI,languageI,emergencyContactI){
        // if(Meteor.user.userType != "admin"){
          // return false; //TODO: output error message in client
        // }
        
        // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
        Students.update(_id, {
          $set: {
            firstName: firstNameI,
            lastName: lastNameI,
            gender: genderI,
            idType: eidTypeI,
            idNo: idNoI,
            company: companyI,
            email: emailI,
            address: addressI,
            postalCode: postalCodeI,
            telephone: telePhoneI,
            bday:bdayI,
            resStat: resStatI,
            nationality: nationlityI,
            language: languageI,
            emergencyContact: emergencContactI
          }
        });
      },
      
      'deleteStudent': function deleteStudent(_id){
        // if(Meteor.user.userType != "admin"){
          // return false; //TODO: output error message in client
        // }
        Students.remove(_id);
      },
      
      'createStudent': function createStudent(firsNameI, lastNameI, genderI, idTypeI, idNoI, companyI, emailI, addressI,postalCodeI,telephoneI,bDayI,resStatI, nationalityI,languageI,emergencyContactI){
        // debugger;
        // if(Meteor.user.userType != "admin"){
          // return false; //TODO: output error message in client
        // }
        Students.insert({
            firstName: firstNameI,
            lastName: lastNameI,
            gender: genderI,
            idType: eidTypeI,
            idNo: idNoI,
            company: companyI,
            email: emailI,
            address: addressI,
            postalCode: postalCodeI,
            telephone: telePhoneI,
            bday:bdayI,
            resStat: resStatI,
            nationality: nationlityI,
            language: languageI,
            emergencyContact: emergencContactI
        });
    }
 });