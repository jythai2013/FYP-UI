Template.testyRec.helpers({
	"recommendedCourse" : function(){
		return Session.get("recommendedCourses");
	}
})

Template.testyRec.helpers({
	"Students":function(){
		return Meteor.users.find({userType:{learner:true}})
	},
	
	"Groups": function(){
		return Groups.find({classlist:Session.get("testyRecstudentId")});
	}
});

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
	},
	
	"change #htmlnode_studentId":function(){
		console.log("Change");
		var a = document.getElementById("htmlnode_studentId");
		var studentId = a.value;
		Session.set("testyRecstudentId", studentId)
	}
})