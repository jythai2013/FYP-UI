navRoutes = [
  new NavRoute('dashboard', 'fa-dashboard')

  #Accounts
  new NavRoute('AccountsMgmt', 'fa-group ', {label: "Accounts Management"})
  new NavRoute('studentList', '', {parentName: 'AccountsMgmt', label: "Student List"})

  # Facility
  new NavRoute('FacilityModule', 'fa-institution', {label: "Facility Management"})
  new NavRoute('facility', 'fa-institution', {parentName: 'FacilityModule', label: "View Facilities"})
  new NavRoute('facilityBooking', 'fa-institution', 
    {
      parentName: 'FacilityModule', 
      label: "Book Facilities",
      template: 'facilityManagement'
    })

  new NavRoute('CourseModule', 'fa-table', {label: "Course Management"})
  new NavRoute('courseList', '', {parentName: 'CourseModule', label: "Course List"})
  new NavRoute('course', '', {parentName: 'CourseModule', label: "Course"})
  new NavRoute('classHomepage', '', {parentName: 'CourseModule', label: "Class Homepage"})
  new NavRoute('group', '', {parentName: 'CourseModule', label: "Class"})

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