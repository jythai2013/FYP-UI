Template.addClass.helpers({

	"courses" : function listCourseEventHandler(e) {
		console.log("here");

		return Courses.find({});
	}
});


Template.addClass.events({
	"click #addGroupButton" : function createGroupEventHandler(e) {
		e.preventDefault();
		//TODO: Validation of user
		// if(Meteor.user.userType != "admin"){
		// return false;
		// }
		console.log("here1");

		//TODO: Validation of input
		var gCourseCode = document.getElementById("gCourseCode").value;
		var gGroupNum = document.getElementById("gNewGroupNum").value;
		var gStartDate = document.getElementById("gNewStartDate").value;
		var gEndDate = document.getElementById("gNewEndDate").value;
		var gDeadline = document.getElementById("cNewDeadline").value;
		var gStatus = document.getElementById("gNewStatus").value;

		Meteor.call("createGroup", gCourseCode, gGroupNum, gStartDate, gEndDate, gDeadline, gStatus);
	}
});


// Template.Class.events({

// 	//consider switching to this way
// 	//http://hacktivist.in/articles/Simple-crud-app-in-meteor/
// 	"click .editClass" : function updateClassEventHandler(e) {
// 		// debugger;
// 		// console.log(e);
// 		// console.log(this.name);
// 		var originalHTML = "" +
// 			"<h2>Name: {{name}}</h2><br />" +
// 			"<b>ClassCode:</b> {{ClassCode}}<br />" +
// 			"<b>fee:</b> {{fee}}<br />" +
// 			// "<b>min:</b> {{min}}<br />" +
// 			// "<b>max:</b> {{max}}<br />" +
// 			"<br />" +
// 			"<span class=\"text\">description: {{description}}</span><br />" +
// 			"<button class=\"editClass\">edit</button>" +
// 			"<button class=\"deleteClass\">delete</button>";

// 		var newHTML = "" +
// 			"<form class=\"ClassEditForm\"" +
// 			"<h2>Name: <input type=\"text\" value=\"" + this.name + "\" id=\"ClassEditName\"></h2><br />" +
// 			"<b>ClassCode:</b> <input type=\"text\" value=\"" + this.ClassCode + "\" id=\"ClassEditClassCode\"><br />" +
// 			"<b>fee:</b> <input type=\"text\" value=\"" + this.fee + "\" id=\"ClassEditFee\"><br />" +
// 			// "<b>min:</b> <input type=\"text\" value=\"" + this.min + "\" id=\"ClassEditMin\"><br />" +
// 			// "<b>max:</b> <input type=\"text\" value=\"" + this.max + "\" id=\"ClassEditMax\"><br />" +
// 			"<br />" +
// 			"<span class=\"text\">description: <textarea  id=\"ClassEditDescription\">" + this.description + "</textarea></span><br />" +
// 			"<button class=\"editClassSave\" >Save</button>" +
// 			"</form>";

// 		document.getElementById("ClassNodeIdObjectID(\"" + this._id + "\")").innerHTML = newHTML;
// 	},

// 	"submit .ClassEditForm" : function updateClassSaveEventHandler(e) {
// 		//TODO: Validation of user
// 		// if(Meteor.user.userType != "admin"){
// 		// return false;
// 		// }

// 		//TODO: Validation of input
// 		e.preventDefault();

// 		name = document.getElementById("ClassEditName").value,
// 		ClassCode = document.getElementById("ClassEditClassCode").value,
// 		fee = document.getElementById("ClassEditFee").value,
// 		// min = document.getElementById("ClassEditMin").value,
// 		// max = document.getElementById("ClassEditMax").value,
// 		description = document.getElementById("ClassEditDescription").value
// 			Meteor.call("updateClass", this._id, name, ClassCode, fee, description);

// 		// replace back with original HTML
// 		var originalHTML = "" +
// 			"<h2>Name: " + this.name + "</h2><br />" +
// 			"<b>ClassCode:</b> " + this.ClassCode + "<br />" +
// 			"<b>fee:</b> " + this.fee + "<br />" +
// 			// "<b>min:</b> " + this.min + "<br />" +
// 			// "<b>max:</b> " + this.max + "<br />" +
// 			"<br />" +
// 			"<span class=\"text\">description: " + this.description + "</span><br />" +
// 			"<button class=\"editClass\">edit</button>" +
// 			"<button class=\"deleteClass\">delete</button>";

// 		document.getElementById("ClassNodeIdObjectID(\"" + this._id + "\")").innerHTML = originalHTML;
// 	},

// 	"click .deleteClass" : function deleteClassEventHandler(e) {
// 		console.log(this._id);
// 		Meteor.call("deleteClass", this._id);
// 	}
// });