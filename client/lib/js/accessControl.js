
Router.onBeforeAction(accessControlAdminHookFunction, {
  only: ['test']
  // except: ['routeOne', 'routeTwo']
});

Router.onBeforeAction(accessControlLoggedInFunction, {
  // only: ['test']
  except: ['website']
});

// Router.onBeforeAction(function () {
  // // all properties available in the route function
  // // are also available here such as this.params

  // if (!Meteor.userId()) {
    // // if the user is not logged in, render the Login template
    // this.render('Login');
  // } else {
    // // otherwise don't hold up the rest of hooks or our route/action function
    // // from running
    // this.next();
  // }
// });

function accessControlLoggedInFunction(){
  // all properties available in the route function
  // are also available here such as this.params
	// console.log(Meteor.user());
	// console.log(Meteor.user().userType);
  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('Login');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
}

function accessControlAdminHookFunction(){
  // all properties available in the route function
  // are also available here such as this.params
	// console.log(Meteor.user());
	// console.log(Meteor.user().userType);
  if (Meteor.user().userType == null || Meteor.user().userType.admin != true) {
    // if the user is not logged in, render the Login template
    alert("You not admin.");
    alert("DIE DIE DIE!");
		history.back();
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
}