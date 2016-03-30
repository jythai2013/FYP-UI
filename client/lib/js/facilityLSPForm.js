function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    url = url;
    name = name.replace(/[\[\]]/g, "\\$&").toString();
		//console.log(name);
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
		//console.log(results);
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

Template.facilityLSPForm.onRendered(function(){
	var fLSP = getParameterByName("fLSP");
	Session.set("currentFacilityIDLSPForm2", fLSP);
});

Template.facilityLSPRatings.helpers({
	"facAverageRating":function(){
		//console.log(this);
		var sum = 0;
		var num = 0;
		for(i=0;i<this.options.length;i++){
			num += this.options[i];
			sum += this.options[i]*(i+1);
		}
		//console.log("sum = " + sum);
		//console.log("num = " + num);
		var res = sum/num;
		if (isNaN(res)) res = "-";
		return res;
	},
	
	"testFac":function(a){
		console.log(this);
		console.log(a);
		
		//calculate average rating
		var sum = 0;
		var num = 0;
		for(i=0;i<this.options.length;i++){
			num += this.options[i];
			sum += this.options[i]*(i+1);
		}
		//console.log("sum = " + sum);
		//console.log("num = " + num);
		var avg = sum/num;
		
		
		
		var res = "";
		for(i=0;i<a.length;i++){
			if(Math.round(avg) == (i+1)){
				res += '<input type="radio" id="optradio" name="qnOptions'+this.qnID+'" value="'+i+'" checked="checked">'+i;
			} else{
				res += '<input type="radio" id="optradio" name="qnOptions'+this.qnID+'" value="'+i+'">'+i;
			}
		}
		
		return Spacebars.SafeString(res);
	},
	
	"toBeChecked":function(a){
		console.log(this);
		console.log(a);
		return true;
	}
});

Template.facilityLSPForm.helpers({
	"facilityLSPQns":function(){
		var facilityId = Session.get("currentFacilityIDLSPForm2");
		var theFacility = Facilities.findOne({_id:facilityId});
		var facilityName = theFacility.fac;
		var feedbackAnswerObj = FeedbackAnswers.findOne({assessedOn:facilityName});
		console.log(feedbackAnswerObj);
		return feedbackAnswerObj.options
	},
	
	"loggedInUsersName":function(){
		return Meteor.user().fullname;
	},
	
	"facTodayDate":function(){
		var mmlookup = [];
		mmlookup.push("Jan");
		mmlookup.push("Feb");
		mmlookup.push("Mar");
		mmlookup.push("Apr");
		mmlookup.push("May");
		mmlookup.push("Jun");
		mmlookup.push("Jul");
		mmlookup.push("Aug");
		mmlookup.push("Sep");
		mmlookup.push("Oct");
		mmlookup.push("Nov");
		mmlookup.push("Dec");
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var mmm = mmlookup[mm-1];

		if(dd<10) {
				dd='0'+dd
		} 

		if(mm<10) {
				mm='0'+mm
		} 

		today = dd+'-'+mmm+'-'+yyyy;
		return today;
	}
});