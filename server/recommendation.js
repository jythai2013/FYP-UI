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
		var ag = Session.get("testyRecstudentId");
		console.log(ag);
		return Groups.find({classlist:ag});
	}
});

Template.testyRec.events({
	"click #htmlnode_btn":function(evt){
		evt.preventDefault();
		if(document.getElementById("htmlnode_groupId") != null){
			var b = document.getElementById("htmlnode_groupId").value;
			var a = document.getElementById("htmlnode_studentId").value;
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





Template.testyValidate.events({
	"submit #vallllllll":function(e){
		e.preventDefault();
	}
});

Template.testyValidate.onRendered(function(){
	console.log("going to validate");
  var a = $('#vallllllll').validate({
		rules: {
			email:{
				required : true
			}
		}
	});
	console.log(a);
});