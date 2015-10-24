navRoutes = [
  new NavRoute('dashboard', 'fa-dashboard')
  new NavRoute('admin', '', {label: "Accounts Admin ???"})
  new NavRoute('calendar', '', {label: "Calendar ???"})


  new NavRoute('profile', '', {isMainNav: false, label: "redirect", template: 'profile'})
  new NavRoute('facilityMgmt', 'fa-table', {label: "Facility Management"})

  new NavRoute('courseMgmt', 'fa-wrench', {label: "Maintain Course"})
  new NavRoute('courseList', '', {parentName: 'courseMgmt', label: "Course List"})
  new NavRoute('course', '', {parentName: 'courseMgmt', label: "Course"})
  new NavRoute('classHomepage', '', {parentName: 'courseMgmt', label: "Class Homepage"})
  new NavRoute('class', '', {parentName: 'courseMgmt', label: "Class"})

  new NavRoute('forms', 'fa-edit')
  new NavRoute('ui-elements', 'fa-wrench', {label: "UI Elements"})
  new NavRoute('buttons', '', {parentName: 'ui-elements'})
  new NavRoute('grid', '', {parentName: 'ui-elements'})
  new NavRoute('todo', '', {parentName: 'ui-elements', label: "ToDo List"})
  new NavRoute('notifications', '', {parentName: 'ui-elements'})
  new NavRoute('panels-and-wells', '', {parentName: 'ui-elements', label: 'Panels and Wells'})
  new NavRoute('pages', 'fa-files-o', {label: "Sample Pages"})
  new NavRoute('blank', '', {parentName: 'pages', label: "Blank Page"})
  new NavRoute('signUp', '', {parentName: 'pages', label: "Sign Up", layoutTemplate: 'loginLayout'})

  new NavRoute('', '', {isMainNav: false, label: "redirect", template: 'dashboard'})


  new NavRoute('website', '', {isMainNav: false, template: 'website', layoutTemplate: 'layoutWebsite'})
]

navRouteList = new NavRouteList(navRoutes)

Session.set('navRoots', navRouteList.rootNavRoutes)