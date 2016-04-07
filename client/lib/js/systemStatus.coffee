Template.profilePage.helpers(
  errorUpdateProfileMessage: () ->
    return Session.get('errorUpdateProfileMessage')

  updateProfileSuccessMessage: () ->
    return Session.get('updateProfileSuccessMessage')	
)

Template.administratorList.helpers(
  errorAdminParticularsMessage: () ->
    return Session.get('errorAdminParticularsMessage')

  updateAdminParticularsSuccessMessage: () ->
    return Session.get('updateAdminParticularsSuccessMessage')	

  errorAdminDeleteMessage: () ->
    return Session.get('errorAdminDeleteMessage')

  updateAdminDeleteSuccessMessage: () ->
    return Session.get('updateAdminDeleteSuccessMessage')
    
  errorAdminAddMessage: () ->
    return Session.get('errorAdminAddMessage')

  updateAdminAddSuccessMessage: () ->
    return Session.get('updateAdminAddSuccessMessage')	
)


