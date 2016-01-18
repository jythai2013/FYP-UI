
Template.signInReg.events({
	"click #signReg" : function signRegEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		console.log("editting HERE");

		//TODO: Validation of input
		// var cCode = document.getElementById("cCCode").value;
		// var cName = document.getElementById("cCName").value;
		// var cDesc = document.getElementById("cCDesc").value;
		// var cSession = document.getElementById("cCSession").value;
		// var cFees = document.getElementById("cCFees").value;
		// var cMin = document.getElementById("cCMin").value;
		// var cMax = document.getElementById("cCMax").value;
		// var cType = document.getElementById("cCType").value;
		// var cTrainers = document.getElementById("cCTrainers").value;

        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        console.log(email + "     sdfgsdfhtrgfbtrhg");
        Accounts.createUser({
        	
            email: email,
            password: password
        }, function(err) {
  			if (err)
    			console.log(err);
  			else
    			console.log('success!');

		//Meteor.call("editCourse", cCode, cName, cDesc, cSession, cFees, cMin, cMax, cType, cTrainers);
	
		});
	}

});