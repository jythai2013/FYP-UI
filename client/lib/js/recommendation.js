Template.testyRec.helpers({
	"recommendedCourse" : function(){
		return Session.get("recommendedCourses");
	}
})

Template.testyRec.events({
	"click #htmlnode_btn":function(evt){
		evt.preventDefault();
		if(document.getElementById("htmlnode_groupId") != null){
			a = document.getElementById("htmlnode_groupId").value;
			var b = document.getElementById("htmlnode_studentId").value;
			Meteor.call("recommend", a, b, function(error, result){
				console.log(error);
				console.log(result);
				Session.set("recommendedCourses", result);
				return result;
			});
			console.log("1");
			return Session.get("recommendedCourses");
		}
		console.log("2");
		return Session.get("recommendedCourses");
	}
})