Template.login.events({
  'submit #sign-up-form': (e, t) ->
    e.preventDefault()
    Session.set('signUpErrorMessage', false)
    Session.set('signUpSuccessMessage', false)
    email = t.find('#login-email').value
    password = t.find('#login-password').value

    # Accounts.createUser({email, password}, (err) ->
    Meteor.loginWithPassword(email, password, (err) ->
      if err?
        Session.set('signUpErrorMessage', 'Sign In Failed: ' + err.reason)
      else
        Session.set('signUpSuccessMessage', 'Sign Up Succeeded.')
        Meteor.setTimeout(() ->
          Session.set('signUpSuccessMessage', false)
          Router.go('/dashboard')
        , 600)
    )
    return false
})

Template.login.helpers(
  errorMessage: () ->
    return Session.get('signUpErrorMessage')

  signUpSuccessMessage: () ->
    if Meteor.user()
      return 'Logged in as: ' + Meteor.user().emails[0].address
    else
      return false
)

Template.loginModal.helpers(
  isLoggedIn: () ->
    if Meteor.user()
      Meteor.setTimeout(() ->
            Session.set('signUpSuccessMessage', false)
            Router.go('/dashboard')
          , 600)
      return true
    else
      return false
)

Template.checkUserLogin.helpers(
  isLoggedIn: () ->
    if Meteor.user()
      return true
    else
      Session.set('signUpErrorMessage', 'Please Sign In')
      Router.go('/login')
      return false
)