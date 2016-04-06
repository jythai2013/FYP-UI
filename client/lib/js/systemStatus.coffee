Template.profilePage.helpers(
  errorUpdateProfileMessage: () ->
    return Session.get('errorUpdateProfileMessage')

  updateProfileSuccessMessage: () ->
    return Session.get('updateProfileSuccessMessage')	
)
