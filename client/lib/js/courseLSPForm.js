

Template.courseLSPForm.helpers({
	"courseTrainers2":function(){
		// console.log(this);
		var CT = this.courseTrainers;
		var returnString = "";
		if(Array.isArray(CT)){
			CT.forEach(function(a,b,c){
				returnString += a + ", "
			});
			returnString = returnString.substring(0, returnString.length - 2);
		} else if(typeof CT == "string"){
			returnString = CT;
		}
		console.log(Array.isArray(CT));
		console.log(typeof CT);
		return returnString;
	},
	
	"loggedInUsersName":function(){
		return Meteor.user().fullname;
	},
	
	"todayDate":function(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
				dd='0'+dd
		} 

		if(mm<10) {
				mm='0'+mm
		} 

		today = mm+'/'+dd+'/'+yyyy;
		return today;
	}
});