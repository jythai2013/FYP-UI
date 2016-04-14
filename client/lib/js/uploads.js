var s3Store = new FS.Store.S3("files", {
});

Files = new FS.Collection("files", {
  stores: [s3Store]
});


// counter starts at 0
Session.setDefault("counter", 0);

Template.course.helpers({
  counter: function () {
    return Session.get("counter");
  },
  upload:function(){
    var a = Files.find({type: "course"});
    var fileList = Materials.find({course: this.courseCode});
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
    //   // console.log(item);
    // });

    // console.log(a);
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
    
    var user = Meteor.user();
    var insertFile = new FS.File(files[0]);
    insertFile.userType = sessionId;
    insertFile.userId = user._id;
    
    console.log(Files);
    var fileObjId = Files.insert(insertFile, function (err, fileObj) {
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
  },
  'click .myDeleteButton': function(e) {
    e.preventDefault();

    var sure = confirm('Are you sure you want to delete this file?');
    if (sure === true) {
      var idDelete = this._id;
      Files.remove({ _id:idDelete }, function(error,result) {
        if (error) {
          console.log("Oops");
        } else {
          var materialRecord = Materials.findOne({fileName: idDelete});
          Meteor.call("deleteMaterial", materialRecord._id);
        }
      })
    }
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

Template.addLSPTemplateForm.events({
  'click .addFormButton':function(event, template){
    var typeI = "formLSP";
    var courseId = "placeholder";
    console.log(courseId);
    var sessionId = document.getElementById("categoryName").value;
    console.log(sessionId);
    var files = document.getElementById("myFileInput").files;
    // var fileZero = (files[0]);
    // var fileObj = new FS.File(files[0]);
    // Files.insert(fileZero);
    
    var user = Meteor.user();
    var fileObjId = new FS.File(files[0]);
    fileObjId.category = sessionId;
    fileObjId.userType = user.username;
    fileObjId.userId = user._id;
    var fName = fileObjId.name();
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
      } else {
        var userId = Meteor.userId();

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


      //var e is the group unique ID string
      var sessionId = document.getElementById("courseCode").value;
      var groupList = Groups.find({_id: sessionId}).fetch();
      var type = "assignment";

      var courseId = groupList[0].courseCode;
      console.log(sessionId);
      var files = document.getElementById("attfileName").files;
      var user = Meteor.user();
      
      console.log(Files);
      var fileObjId = new FS.File(files[0]);
      fileObjId.category = sessionId;
      fileObjId.userType = user.username;
      fileObjId.userId = user._id; 
      Files.insert(fileObjId, function (err, fileObj) {
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
    var user = Meteor.user();
    var fileObjId = new FS.File(files[0]);
    fileObjId.category = sessionId;
    fileObjId.userType = user.username;
    fileObjId.userId = user._id; 
    Files.insert(fileObjId, function (err, fileObj) {
      if (err){

      } else {

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
    var courseId = "placeholder";
    console.log(courseId);
    var sessionId = document.getElementById("categoryName").value;
    console.log(sessionId);
    var files = document.getElementById("myFileInput").files;

    console.log(files);
    var user = Meteor.user();
    var fileObjId = new FS.File(files[0]);
    fileObjId.category = sessionId;
    fileObjId.userType = user.username;
    fileObjId.userId = user._id; 

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

      } else {

        // var userId = Meteor.userId();
        // fileObjId = fileObja._id;
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
