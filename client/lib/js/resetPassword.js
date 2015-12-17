Template.loginPage.events({
	"click #sign-up-button":function(e){
		e.preventDefault();
		// alert();
		var emailI = prompt("Please enter your email");
		var options = new Object();
		options.email = emailI;
		//fires the forgotPassword(option, callback) method
		Accounts.forgotPassword(options, function(e){
			if(e != undefined)alert(e); //got error
			else alert("Email sent to " + options.email); //no error
			console.log(options); //rest of the callback
			console.log(e);
		});
		console.log(options);
	}
});