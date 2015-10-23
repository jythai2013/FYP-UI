navRoutes = [
  new NavRoute('dashboard', 'fa-dashboard')
  new NavRoute('facilityMgmt', 'fa-table', {label: "Facility Management"})
  new NavRoute('admin', '', {label: "Accounts Admin ???"})
  new NavRoute('calendar', '', {label: "Calendar ???"})
  new NavRoute('classHomepage', '', {label: "Class Homepage"})
  new NavRoute('profile', '', {isMainNav: false})

  new NavRoute('forms', 'fa-edit')
  new NavRoute('ui-elements', 'fa-wrench', {label: "UI Elements"})
  new NavRoute('buttons', '', {parentName: 'ui-elements'})
  new NavRoute('grid', '', {parentName: 'ui-elements'})
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