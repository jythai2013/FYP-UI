// to customize reset email:
// http://docs.meteor.com/#/full/accounts_emailtemplates
Template.resetPassword.events({
	"click #resetPasswordButton":function(e){
		e.preventDefault();
		// alert("reset password");
		// var emailI = prompt("Please enter your email");
		var options = new Object();
		options.email = document.getElementById("login-email").value;
		//fires the forgotPassword(option, callback) method
		Accounts.forgotPassword(options, function(e){
			if(e != undefined)console.log(e); //got error
			else alert("Email sent to " + options.email); //no error
			// console.log(options); //rest of the callback
			// console.log(e);
		});
		// console.log("options");
		console.log(options);
	}
});