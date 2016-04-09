#ADMIN > PROFILE
Template.profilePage.helpers(
  errorUpdateProfileMessage: () ->
    return Session.get('errorUpdateProfileMessage')

  updateProfileSuccessMessage: () ->
    return Session.get('updateProfileSuccessMessage')	
)

#ADMIN > ADMINISTRATOR LIST
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

#STUDENT > DROPBOX
Template.studentUpload.helpers(
  errorStudentUploadMessage: () ->
    return Session.get('errorStudentUploadMessage')

  studentUploadSuccessMessage: () ->
    return Session.get('studentUploadSuccessMessage') 
)

#TRAINER > ANNOUNCEMENT
Template.addAnnouncement.helpers(
  erroraddTAnnouncementMessage: () ->
    return Session.get('erroraddTAnnouncementMessage')

  addTAnnouncementSuccessMessage: () ->
    return Session.get('addTAnnouncementSuccessMessage') 
)

#WEBSITE > Signup
Template.registerForCourse.helpers(
  errorWebsiteSignUpMessage: () ->
    return Session.get('errorWebsiteSignUpMessage')
)


