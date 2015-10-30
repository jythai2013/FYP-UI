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
    'change .myFileInput':function(evt,tmpl){
      FS.Utility.eachFile(event,function(file){
        var fileObj = new FS.File(file);
        Files.insert(fileObj),function(err){
          console.log(err);
        }
      })
    }
  });