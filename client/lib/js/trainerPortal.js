 function getTrainerOngoingCourse(e) {
  // console.log("trainerPortal.js - trainerOngoingCourses >>>");
  var tId = Meteor.user()._id;
  var coursesTaught = Groups.find({courseTrainers: {$in : [tId]}}).fetch();
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
    } else if(url.endsWith("classlist") && headerName === "trainer"){
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
  },

  "getCourseName" : function retrieveCourseNameTU(cCode) {
    var a = Courses.findOne({"courseCode": cCode});
    if (a  === undefined){
      return "";
    } else {
      return a.courseName;
    }
  }
});

Template.tcCourseMaterials.helpers({  
  uploads:function(){
    var courseGrp =  Router.current().url;
    var positionFirstEqual = courseGrp.indexOf('=');
    //extracting course
    var currentCourseGrp=courseGrp.substr(positionFirstEqual+1);  
    var positionOfAND = courseGrp.indexOf('&');
    var currentCourse=courseGrp.substring(positionFirstEqual+1, positionOfAND);

    var a = Files.find({type: "course"});
    var fileList = Materials.find({course: this.courseCode, type: "groups"});
    // var fileList2 = Materials.find({type: "course"});
    // console.log(fileList);
    var a = new Array();

    fileList.forEach(function(item, index){
      // console.log(item.fileName);
      a.push(Files.findOne(item.fileName));
      // console.log(item);
    });

    // fileList2.forEach(function(item, index){
    //   console.log(item.fileName);
    //   a.push(Files.findOne(item.fileName));
    //   console.log(item);
    // });

    console.log(a);
    return a;
  }
});

Template.tAssignmentMaterials.helpers({  
  assignments:function(){

    var a = Files.find({type: "assignment"});
    var fileList = Materials.find({sessionNo: this.courseCode});
    // var fileList2 = Materials.find({type: "course"});
    // console.log(fileList);
    var a = new Array();

    fileList.forEach(function(item, index){
      // console.log(item.fileName);
      a.push(Files.findOne(item.fileName));
      // console.log(item);
    });

    // fileList2.forEach(function(item, index){
    //   console.log(item.fileName);
    //   a.push(Files.findOne(item.fileName));
    //   console.log(item);
    // });

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
    return Groups.find({courseTrainers: {$in : [tId]}}).count();
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
    try {
      var classList = cList;
      if(classList !== undefined){  
        // console.log("getStudentDetails >>>> " + classList);
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
    } catch(e){
      //do nothing
    }
  }
});

Template.tcViewStudentGrade.helpers({
  "studentGradeDetails" : function sgradeStudentDetails(cList) {
    var studId = this._id;
    var url =  Router.current().url;
    var positionFirstEqual = url.indexOf('=');
    //problem starts here
    //extracting course
    var currentCourseGrp=url.substr(positionFirstEqual+1);    
    var positionOfAND = url.indexOf('&');
    var currentCourse=url.substring(positionFirstEqual+1, positionOfAND);
    //extracting grpNum
    var grpNumStr=url.substr(positionOfAND+1);
    var positionSecondEqual = grpNumStr.indexOf('=');
    var currentGrpNum=grpNumStr.substr(positionSecondEqual+1);
    var grpId = Groups.findOne({courseCode:currentCourse,grpNum:currentGrpNum})._id;

    var obj = Meteor.users.findOne({_id: studId});
    result = [];
    if(obj !== undefined){
      var gradeObj = obj.grades[grpId];
      for (var key in gradeObj){
        // key is the passStatus
        if (key !== "passStatus"){
          result.push({name:key,value:gradeObj[key]});
        }
      }
    }
    return result;
  }
});

Template.tcAttendence.helpers({
  "getStudentName" : function sAttendenceStudentDetails(id) {
    var a = Meteor.users.findOne({"userID": id});
    return a.fullName;
  },
  "studentAttendenceDetails" : function sAttendenceStudentDetails(cList) {
    var studId = this._id;
    var url =  Router.current().url;
    var positionFirstEqual = url.indexOf('=');
    //problem starts here
    //extracting course
    var currentCourseGrp=url.substr(positionFirstEqual+1);    
    var positionOfAND = url.indexOf('&');
    var currentCourse=url.substring(positionFirstEqual+1, positionOfAND);
    //extracting grpNum
    var grpNumStr=url.substr(positionOfAND+1);
    var positionSecondEqual = grpNumStr.indexOf('=');
    var currentGrpNum=grpNumStr.substr(positionSecondEqual+1);
    var obj = Groups.findOne({courseCode:currentCourse,grpNum:currentGrpNum});
    result = [];
    if(obj !== undefined){
      var grpAttendenceObj = obj.attendance;
      // var absentee = 0;
      // var absenteeList = [];
      for (var key in grpAttendenceObj){
        var result2 = [];
        var value1 = grpAttendenceObj[key];
        for (var key2 in value1){
          result2.push({studentId:key2,value:value1[key2]});
        }
        result.push({name:moment(key).format("Do MMM YYYY"),value:result2});
      }
    }
    return result;
  }
});