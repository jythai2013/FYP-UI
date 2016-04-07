 function getTrainerOngoingCourse(e) {
  console.log("trainerPortal.js - trainerOngoingCourses >>>");
  var tId = Meteor.user()._id;
  var coursesTaught = Groups.find({courseTrainers: {trainerId: tId}});
  return coursesTaught;
}

//Sidebar
Template.trainerSidebar.helpers({
  //set active
  'checkisActive': function trainerUrl(headerName){
    var url =  Router.current().url;
    var isActive = url.endsWith(headerName);
    if (isActive){
      return "active";
    } else {
      return "";
    }
  }
});

Template.trainerClass.helpers({
  'storeAttributeValue': function storeAttributeValue(value){
    var retrieveValue = {
      indexValue: value
    }
  }
});
// Handlebars.registerHelper('storeAttributeValue', function(value){
//     this.index = value;
// });

Template.trainerUploads.helpers({
  "trainerOngoingCourses" : function findTrainerUploads(e) {
    var a = getTrainerOngoingCourse();
    return a;
  }
});
Template.tcCourseMaterials.helpers({  
  uploads:function(){
    var a = Files.find({type: "course"});
    var fileList = Materials.find({type:"groups"});
    var fileList2 = Materials.find({type: "course"});
    console.log(fileList);
    var a = new Array();

    fileList.forEach(function(item, index){
      // console.log(item.fileName);
      a.push(Files.findOne(item.fileName));
      // console.log(item);
    });

    fileList2.forEach(function(item, index){
      console.log(item.fileName);
      a.push(Files.findOne(item.fileName));
      console.log(item);
    });

    console.log(a);
    return a;
  }
});

Template.trainerAnnouncment.helpers({
  "trainerOngoingCourses1" : function findTrainerAnnouncement(e) {
    var a = getTrainerOngoingCourse();
    // console.log("HI trainerAnnouncment >>>");
    return a;
  },

  'authorName': function getTAAuthorName(authorId) {
    return Meteor.users.findOne({_id: authorId}).fullName;
  }
});

UI.registerHelper('addIndex', function(thatArray) {
  if (thatArray && thatArray.length) {
    $.each(thatArray, function (position, thatObject) {
      thatObject.index = position;
      thatArray[position] = thatObject;
    });
    return thatArray;
  }
});

Template.addAnnouncement.helpers({
	"trainerOngoingCourses1" : function findTrainerAddAnnoun(e) {
		var a = getTrainerOngoingCourse();
    return a;
  }
});


Template.trainerUploads.onRendered(function(){
	// console.log($("#courseCode")[0].value);
	Session.set("trainerOngoingCourseSelected", $("#courseCode")[0].value);
});

Template.trainerUploads.events({
	"change #courseCode":function(e){
		e.preventDefault();
		Session.set("trainerOngoingCourseSelected", e.target.value);
		// console.log(e.target.value);
	}
});

Template.trainerClassList.helpers({
  "classesCL" : function findTrainerOngoingCoursesCL(e) {
    var tId = Meteor.user()._id;
    // add date factor here
    return Groups.find({courseTrainers: {trainerId: tId}}).count();
  },

  "getCourseDesc" : function findDescCL(cName) {
    console.log("trainerPortal.js, (getCorseDesc) " + cName);
    console.log(Courses.findOne({"courseCode": cName}));
    var desc = Courses.findOne({"courseCode": cName}).courseDescription;
    return desc;
  },

  "trainerOngoingCourses" : function findTrainerOngoingCoursesCL(e) {
    return getTrainerOngoingCourse();
  }
});


Template.trainerIndex.helpers({
    "test" : function test2(e) {
      return Meteor.user().fullName;
  }
});

Template.trainerClass.onRendered(function(){
  var courseGrp =  Router.current().url;
  var positionFirstEqual = courseGrp.indexOf('=');
  //extracting course
  var currentCourseGrp=courseGrp.substr(positionFirstEqual+1);  
  var positionOfAND = courseGrp.indexOf('&');
  var currentCourse=courseGrp.substring(positionFirstEqual+1, positionOfAND);

  //extracting grpNum
  var grpNumStr=courseGrp.substr(positionOfAND-1);
  var positionSecondEqual = currentCourseGrp.indexOf('=');
  var currentGrpNum=currentCourseGrp.substr(positionSecondEqual+1);
  console.log(currentGrpNum + "grpNum");

  var group = Groups.findOne({courseCode:currentCourse,grpNum:currentGrpNum});
  console.log("setupSession : " + group);
  Session.set('trainerClass', group);
});


Template.trainerClass.helpers({
  "getStudentDetails" : function tcStudentDetails(cList) {
    var classList = cList;
    if(classList !== undefined){  
      console.log("getStudentDetails >>>> " + classList);
      var studentArray = new Array();
      classList.forEach(function(curr,ind,arr){
        var student = Meteor.users.findOne({_id:curr});
        studentArray.push(student);
        // console.log(student.fullName);
      });
      return studentArray;
    } else {
      return false;
    }
  }
});

Template.tcViewStudentGrade.helpers({
  "studentGradeDetails" : function sgradeStudentDetails(cList) {
    var studId = this._id;
    // var courseId = this.courseId;
    // console.log(courseId);
    var gradeObj = Meteor.users.findOne({_id: studId}).grades;
      // console.log("grade >>> " + gradeObj[courseId]);
      // console.log("grade >>> " + gradeObj[courseId].passStatus);
    if (gradeObj !== undefined){
      return gradeObj;
    } else {
      return new Array();
    }
  }
});



// // Sidebar
// Template.trainerSidebar.helpers({
// 	'isActive' : function(browserN) {

// 		var browserUrl =  window.location.href;
// 		var positionFirstEqual = browserUrl.indexOf('/');
// 		var removeDomain=browserUrl.substr(positionFirstEqual+1);
// 		var positionSecondEqual = removeDomain.indexOf('/');
// 		console.log("url "browerURL.length);
// 		console.log("url "positionSecondEqual);
// 		var browerName=removeDomain.substr(positionSecondEqual+1);
// 		console.log(browerName " equals "browserN);
// 		var a = browerName == browserN;
// 		console.log(a);
// 		if (browerName === browserN){
// 			return "active";
// 		} else {
// 			return "";
// 		}
// 	}
// });
// 		