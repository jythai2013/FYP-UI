navRoutes = [
  new NavRoute('dashboard', 'fa-dashboard')

  #Accounts
  new NavRoute('AccountsMgmt', 'fa-group ', {label: "Accounts Management"})
  new NavRoute('studentList', '', {parentName: 'AccountsMgmt', label: "Student List"})
  new NavRoute('trainerList', '', {parentName: 'AccountsMgmt', label: "Trainer List"})
  new NavRoute('administratorList', '', {parentName: 'AccountsMgmt', label: "Administrator List"})

  # Certificate
  new NavRoute('groupExcelUpload', 'fa-institution', {label: "Group Signup"})
  new NavRoute('certificateManagement', 'fa-institution', {label: "Certs Management"})
  
  # Facility
  new NavRoute('FacilityModule', 'fa-institution', {label: "Facility Management"})
  new NavRoute('facility', 'fa-institution', {parentName: 'FacilityModule', label: "View Facilities"})
  new NavRoute('facilityBooking', 'fa-institution', 
    {
      parentName: 'FacilityModule', 
      label: "Book Facilities",
      template: 'facilityManagement'
    })

  new NavRoute('FormsMgmt', 'fa-group ', {label: "LSP Forms Management"})
  new NavRoute('formRespo', '', {parentName: 'FormsMgmt', label: "LSP Form Template Repository"})
  new NavRoute('lspRespo', '', {parentName: 'FormsMgmt', label: "Completed LSP Form Repository"})
  new NavRoute('CFTRespo', '', {parentName: 'FormsMgmt', label: "Course/Facility/ Trainer LSP Form"})

  new NavRoute('CourseModule', 'fa-table', {label: "Course Management"})
  new NavRoute('courseList', '', {parentName: 'CourseModule', label: "Course List"})
  new NavRoute('classList', '', {parentName: 'CourseModule', label: "Class List"})

  new NavRoute('FeedbackMgmt', 'fa-file-text ', {label: "Feedback Management"})
  new NavRoute('feedbackList', '', {parentName: 'FeedbackMgmt', label: "Feedback List"})
  #new NavRoute('feedbackQnMgmt', '', {parentName: 'FeedbackMgmt', label: "Feedback Questions"})

  #Analytics
  new NavRoute('adminAnalytics', 'fa-group ', {label: "Analytics Overview"})

  #new NavRoute('forms', 'fa-edit')
  #new NavRoute('ui-elements', 'fa-wrench', {label: "UI Elements"})
  #new NavRoute('grid', '', {parentName: 'ui-elements'})
  #new NavRoute('panels-and-wells', '', {parentName: 'ui-elements', label: 'Panels and Wells'})
  #new NavRoute('pages', 'fa-files-o', {label: "Sample Pages"})
  #new NavRoute('blank', '', {parentName: 'pages', label: "Blank Page"})
  #new NavRoute('loginModal', '', {parentName: 'pages', label: "Sign In Modal", layoutTemplate: 'loginLayout'})
]

navRouteList = new NavRouteList(navRoutes)

Session.set('navRoots', navRouteList.rootNavRoutes)