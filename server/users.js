   Meteor.methods({ 

    'editUser': function editUser(_id, firsNameI, lastNameI, genderI, idTypeI, idNoI, companyI, emailI, addressI,postalCodeI,telephoneI,bDayI,resStatI, nationalityI,languageI,emergencyContactI){
        // if(Meteor.user.userType != "admin"){
          // return false; //TODO: output error message in client
        // }
        
        // if (typeof cDescriptionI === 'undefined') { cDescriptionI = 'default description'; }
        Users.update(_id, {
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
      
      'deleteUser': function deleteUser(_id){
        // if(Meteor.user.userType != "admin"){
          // return false; //TODO: output error message in client
        // }
        Users.remove(_id);
      },
      
      'createUser': function createUser(firsNameI, lastNameI, genderI, idTypeI, idNoI, companyI, emailI, addressI,postalCodeI,telephoneI,bDayI,resStatI, nationalityI,languageI,emergencyContactI){
        // debugger;
        // if(Meteor.user.userType != "admin"){
          // return false; //TODO: output error message in client
        // }
        Users.insert({
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
    });