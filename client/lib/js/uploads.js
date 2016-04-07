// counter starts at 0
Session.setDefault("counter", 0);

Template.course.helpers({
  counter: function () {
    return Session.get("counter");
  },
  uploads:function(){
    var a = Files.find({type: "course"});
    var fileList = Materials.find({type:"groups"});
    var fileList2 = Materials.find({type: "course"});
    console.log(fileList);
    var a = new Array();

    fileList.forEach(function(item, index){
      console.log(item.fileName);
      a.push(Files.findOne(item.fileName));
      console.log(item);
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

Template.course.events({

'click .myFileInputButton':function(event, template){
    var type = "course";
    var courseId = document.getElementById("cUploadCourseCode").value;
    console.log(courseId);
    var sessionId = document.getElementById("cUploadSession").value;
    console.log(sessionId);
    var files = document.getElementById("myFileInput").files;
		
		
		console.log(Files);
    var fileObjId = Files.insert(files[0], function (err, fileObj) {
      if (err){
        // handle error
				console.log(err);
      } else {
        var userId = Meteor.userId();
				fileObjId = fileObja._id;

      }
      // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
    });
		
    fileObjIdI = fileObjId._id;
    Meteor.call("createMaterial",type, courseId, sessionId, fileObjIdI);
  }
});

Template.formRespo.helpers({
  counter: function () {
    return Session.get("counter");
  },
  upload:function(){
    var fileList = Materials.find({type:"formLSP"});
    console.log(fileList);
    var a = new Array();

    fileList.forEach(function(item, index){
      console.log(item.fileName);
      a.push(Files.findOne(item.fileName));
      console.log(item);
    });

    console.log(a);
    return a;
  }
});

Template.addLSPFormForm.events({

'click .addFormButton':function(event, template){
    var typeI = "formLSP";
    var courseId = document.getElementById("formName").value;
    console.log(courseId);
    var sessionId = document.getElementById("categoryName").value;
    console.log(sessionId);
    var files = document.getElementById("myFileInput").files;
    // var fileZero = (files[0]);
    // var fileObj = new FS.File(files[0]);
    // Files.insert(fileZero);
    

    console.log(files);
    var fileObjId = new FS.File(files[0]);
    fileObjId.category = sessionId;
    var fName = fileObjId.name();
    console.log(fName);
    var a = Files.find({"original.name": fName}).fetch();
    if(a == null || a.length == 0)
    {
      var version = 1; 
      fileObjId.version = version;
    } else {
      var version = a.length + 1;
      fileObjId.version = version;
    } 

    Files.insert(fileObjId, function (err, fileObj) {
      if (err){
        // handle error
        console.log(err);
      } else {
        var userId = Meteor.userId();
        fileObjId = fileObja._id;

      }
      // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
    });
    fileObjIdI = fileObjId._id;
      Meteor.call("createMaterial", typeI,courseId, sessionId,  fileObjIdI);  
    
  }
});

Template.studentUpload.events({

  'click #submitAssignment':function(event, template){
    try {

      event.preventDefault();
      var type = "groups";

      var e = document.getElementById("courseCode");
      var courseIdI = e.options[e.selectedIndex].value;
      var groupList = Groups.find({_id: courseIdI}).fetch();



      var courseId = groupList[0].courseCode;

      console.log(courseId);
      var sessionId = groupList[0].grpNum;
      console.log(sessionId);
      var files = document.getElementById("attfileName").files;
      
      
      console.log(Files);
      var fileObjId = Files.insert(files[0], function (err, fileObj) {
        if (err){
          // handle error
          console.log(err);
        } else {
          console.log(fileObj);
          // console.log(Files);
          // console.log(fileObjId = fileObj._id);
        }
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
      
      console.log("bbbefore call");
      fileObjIdI = fileObjId._id;
      console.log("before call");
      Meteor.call("createMaterial",type, courseId, sessionId, fileObjIdI, function (err, result) {
        document.getElementById("attfileName").value = "";
        if (!err) {
          // If run is okay
          console.log(">>>upload assingment SUCCESS MSG");
          Session.set('studentUploadSuccessMessage', 'Your file has been uploaded')
          Meteor.setTimeout(function(){Session.set('studentUploadSuccessMessage', false);}, 4000);
        } else {
          console.log(">>>update profile FAILURE MSG");
          Session.set('errorStudentUploadMessage', 'Upload Failed: ' + err.reason);
          Meteor.setTimeout(function(){Session.set('errorStudentUploadMessage', false);}, 4000);
        }
      });
      console.log("!before call");
    } catch (e){
      console.log(">>>update profile FAILURE MSG");
      Session.set('errorStudentUploadMessage', 'Upload Failed: ' + e);
      Meteor.setTimeout(function(){Session.set('errorStudentUploadMessage', false);}, 4000);
    }
  }
});

Template.trainerUploads.events({

  'click #addFormButton':function(event, template){
    event.preventDefault();
    var type = "groups";

    var e = document.getElementById("courseCode");
    var courseIdI = e.options[e.selectedIndex].value;
    var groupList = Groups.find({_id: courseIdI}).fetch();



    var courseId = groupList[0].courseCode;

    console.log(courseId);
    var sessionId = groupList[0].grpNum;
    console.log(sessionId);
    var files = document.getElementById("attfileName").files;
    
    
    console.log(Files);
    var fileObjId = Files.insert(files[0], function (err, fileObj) {
      if (err){
        // handle error
        console.log(err);
      } else {
        console.log(fileObj);
        // console.log(Files);
        // console.log(fileObjId = fileObj._id);
      }
      // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
    });
    
		console.log("bbbefore call");
    fileObjIdI = fileObjId._id;
		console.log("before call");
    Meteor.call("createMaterial",type, courseId, sessionId, fileObjIdI);
		console.log("!before call");
  }
});

Template.lspRespo.helpers({
  counter: function () {
    return Session.get("counter");
  },
  upload:function(){
    var fileList = Materials.find({type:"completedLSP"});
    console.log(fileList);
    var a = new Array();

    fileList.forEach(function(item, index){
      console.log(item.fileName);
      a.push(Files.findOne(item.fileName));
      console.log(item);
    });
    // for(i = 0; i < fileList.fetch().length; i++){
    //   a += Files.findOne(fileList[i]);
    //   console.log(a);
    // }
    console.log(a);
    return a;
  }
});

Template.addNewLSPFormForm.events({

'click .addFormButton':function(event, template){
    var typeI = "completedLSP";
    var courseId = document.getElementById("formName").value;
    console.log(courseId);
    var sessionId = document.getElementById("categoryName").value;
    console.log(sessionId);
    var files = document.getElementById("myFileInput").files;

    console.log(files);
    var fileObjId = new FS.File(files[0]);
    fileObjId.category = sessionId;
    var fName = fileObjId.name();
    console.log(fName);
    var a = Files.find({"original.name": fName}).fetch();
    if(a == null || a.length == 0)
    {
      var version = 1; 
      fileObjId.version = version;
    } else {
      var version = a.length + 1;
      fileObjId.version = version;
    } 

    Files.insert(fileObjId, function (err, fileObj) {
      if (err){
        // handle error
        console.log(err);
      } else {
        var userId = Meteor.userId();
        fileObjId = fileObja._id;
        // console.log(fileObj);
        // console.log(Files);
        // console.log(fileObjId = fileObj._id);
      }
      // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
    });
    fileObjIdI = fileObjId._id;
      Meteor.call("createMaterial", typeI,courseId, sessionId,  fileObjIdI);  
  }
});
