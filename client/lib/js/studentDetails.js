function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    url = url;
    name = name.replace(/[\[\]]/g, "\\$&").toString();
		console.log(name);
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
		console.log(results);
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

Template.studentDetails.helpers({
	"recommendeds" : function(){
		var ah = Session.get("recommendedCoursesRecEngine");
		console.log(ah);
		return ah;
	},
	"enrolledCourses" : function(){
		// console.log(this);
		var ah = Groups.find({classlist:this._id});
		// var ah = new Array();
		// ah.push("abcd");
		// ah.push("abcd");
		// ah.push("abcd");
		// ah.push("abcd");
		console.log(ah);
		return ah;
	}
});

