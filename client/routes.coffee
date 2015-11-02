navRoutes = [
  new NavRoute('dashboard', 'fa-dashboard')

  # Facility
  new NavRoute('FacilityModule', 'fa-table', {label: "Facility Management"})
  new NavRoute('facility', 'fa-wrench', {parentName: 'FacilityModule', label: "View Facilities"})
  new NavRoute('facilityBooking', 'fa-wrench', 
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

  new NavRoute('forms', 'fa-edit')
  #new NavRoute('ui-elements', 'fa-wrench', {label: "UI Elements"})
  #new NavRoute('grid', '', {parentName: 'ui-elements'})
  #new NavRoute('panels-and-wells', '', {parentName: 'ui-elements', label: 'Panels and Wells'})
  #new NavRoute('pages', 'fa-files-o', {label: "Sample Pages"})
  #new NavRoute('blank', '', {parentName: 'pages', label: "Blank Page"})
  #new NavRoute('loginModal', '', {parentName: 'pages', label: "Sign In Modal", layoutTemplate: 'loginLayout'})

  new NavRoute('', '', {isMainNav: false, label: "redirect", template: 'dashboard'})
]

navRouteList = new NavRouteList(navRoutes)

Session.set('navRoots', navRouteList.rootNavRoutes)