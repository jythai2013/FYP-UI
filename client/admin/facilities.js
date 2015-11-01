Template.facility.helpers({

  "facilities" : function listFacilityEventHandler(e) {
    console.log("here");
    return Facilities.find({});
  }
});

Template.addFacilityForm.events({
  "click #addFacilityButton" : function createFacilityEventHandler(e) {
    e.preventDefault();
    //TODO: Validation of user
    // if(Meteor.user.userType != "admin"){
    // return false;
    // }
    console.log("here1");

    //TODO: Validation of input
    var cType = document.getElementById("cNewType").value;
    var cName = document.getElementById("cNewName").value;
    var cCapicity = document.getElementById("cNewCapacity").value;
    var cDescription = document.getElementById("cNewDesc").value;

    Meteor.call("createFacility", cType, cName, cCapicity, cDescription);
  }
});

// Template.facility.events({

//   //consider switching to this way
//   //http://hacktivist.in/articles/Simple-crud-app-in-meteor/
//   "click .editFacility" : function updateCourseEventHandler(e) {
//     // debugger;
//     // console.log(e);
//     // console.log(this.name);
//     var originalHTML = "" +
//       "<h2>Name: {{name}}</h2><br />" +
//       "<b>courseCode:</b> {{courseCode}}<br />" +
//       "<b>fee:</b> {{fee}}<br />" +
//       // "<b>min:</b> {{min}}<br />" +
//       // "<b>max:</b> {{max}}<br />" +
//       "<br />" +
//       "<span class=\"text\">description: {{description}}</span><br />" +
//       "<button class=\"editCourse\">edit</button>" +
//       "<button class=\"deleteCourse\">delete</button>";

//     var newHTML = "" +
//       "<form class=\"courseEditForm\"" +
//       "<h2>Name: <input type=\"text\" value=\"" + this.name + "\" id=\"courseEditName\"></h2><br />" +
//       "<b>courseCode:</b> <input type=\"text\" value=\"" + this.courseCode + "\" id=\"courseEditCourseCode\"><br />" +
//       "<b>fee:</b> <input type=\"text\" value=\"" + this.fee + "\" id=\"courseEditFee\"><br />" +
//       // "<b>min:</b> <input type=\"text\" value=\"" + this.min + "\" id=\"courseEditMin\"><br />" +
//       // "<b>max:</b> <input type=\"text\" value=\"" + this.max + "\" id=\"courseEditMax\"><br />" +
//       "<br />" +
//       "<b>fee:</b> <input type=\"text\" value=\"" + this.Trainer + "\" id=\"courseEditTrainer\"><br />" +
//       "<span class=\"text\">description: <textarea  id=\"courseEditDescription\">" + this.description + "</textarea></span><br />" +
//       "<button class=\"editCourseSave\" >Save</button>" +
//       "</form>";

//     document.getElementById("courseNodeIdObjectID(\"" + this._id + "\")").innerHTML = newHTML;
//   },

//   "submit .courseEditForm" : function updateCourseSaveEventHandler(e) {
//     //TODO: Validation of user
//     // if(Meteor.user.userType != "admin"){
//     // return false;
//     // }

//     //TODO: Validation of input
//     e.preventDefault();

//     name = document.getElementById("courseEditName").value,
//     courseCode = document.getElementById("courseEditCourseCode").value,
//     fee = document.getElementById("courseEditFee").value,
//     // min = document.getElementById("courseEditMin").value,
//     // max = document.getElementById("courseEditMax").value,
//     description = document.getElementById("courseEditDescription").value,
//     trainer = document.getElementById("courseEditTrainer").value
//     Meteor.call("updateCourse", this._id, name, courseCode, fee, description,trainer);

//     // replace back with original HTML
//     var originalHTML = "" +
//       "<h2>Name: " + this.name + "</h2><br />" +
//       "<b>courseCode:</b> " + this.courseCode + "<br />" +
//       "<b>fee:</b> " + this.fee + "<br />" +
//       // "<b>min:</b> " + this.min + "<br />" +
//       // "<b>max:</b> " + this.max + "<br />" +
//       "<br />" +
//       "<b>fee:</b> " + this.trainer + "<br />" +
//       "<span class=\"text\">description: " + this.description + "</span><br />" +
//       "<button class=\"editCourse\">edit</button>" +
//       "<button class=\"deleteCourse\">delete</button>";

//     document.getElementById("courseNodeIdObjectID(\"" + this._id + "\")").innerHTML = originalHTML;
//   },

//   "click .deleteFacility" : function deleteCourseEventHandler(e) {
//     console.log(this._id);
//     Meteor.call("deleteFacility", this._id);
//   }
// });