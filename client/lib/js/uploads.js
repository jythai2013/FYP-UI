  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.course.helpers({
    counter: function () {
      return Session.get("counter");
    },
    uploads:function(){
      return Files.find();
    }
  });

  Template.course.events({
    // 'change .myFileInput':function(evt,tmpl){
    //   FS.Utility.eachFile(event,function(file){
    //     var fileObj = new FS.File(file);
    //     Files.insert(fileObj),function(err){
    //       console.log(err);
    //     }
    //   })
    // }

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


  //   'click #myFileInputButton': function(event, template) {
  //   var files = document.getElementById("fileinput").files;
  //   files.forEach(function(file) {
  //     Images.insert(file, function (err, fileObj) {
  //       if (err){
  //         // handle error
  //       } else {
  //           // handle success depending what you need to do
  //         var userId = Meteor.userId();
  //         var imagesURL = {
  //           "profile.image": "/cfs/files/images/" + fileObj._id
  //         };
  //         Meteor.users.update(userId, {$set: imagesURL});
  //       }
  //     });
  //   });
  // }
