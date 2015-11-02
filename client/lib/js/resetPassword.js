Template.loginPage.events({
	"click #sign-up-button":function(e){
		e.preventDefault();
		// alert();
		var emailI = prompt("Please enter your email");
		var options = new Object();
		options.email = emailI;
		Accounts.forgotPassword(options, function(e){
			if(e != undefined)alert(e);
			else alert("Email sent to " + options.email);
			console.log(options);
			console.log(e);
		});
		console.log(options);
	}
});