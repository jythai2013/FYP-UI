  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.course.helpers({
    counter: function () {
      return Session.get("counter");
    },
    uploads:function(){
      console.log(Files.find({}));
      return Files.find({});
    }
  });

  Template.course.events({

  'click .myFileInputButton':function(event, template){
      var courseId = document.getElementById("cUploadCourseCode").value;
      console.log(courseId);
      var sessionId = document.getElementById("cUploadSession").value;
      console.log(sessionId);
      var files = document.getElementById("myFileInput").files;
      var fileObj = new FS.File(files[0]);
      Files.insert(fileObj);
      Meteor.call("createMaterial",courseId, sessionId, fileObj._id);
    }


  });
