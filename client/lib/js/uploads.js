  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.course.helpers({
    counter: function () {
      return Session.get("counter");
    },
    uploads:function(){
      var a = Files.find({});
			console.log(a);
      return a;
    }
  });

  Template.course.events({

  'click .myFileInputButton':function(event, template){
      var courseId = document.getElementById("cUploadCourseCode").value;
      console.log(courseId);
      var sessionId = document.getElementById("cUploadSession").value;
      console.log(sessionId);
      var files = document.getElementById("myFileInput").files;
      // var fileZero = (files[0]);
      // var fileObj = new FS.File(files[0]);
      // Files.insert(fileZero);
			
			var fileObjId;
			console.log(Files);
      Files.insert(files[0], function (err, fileObj) {
        if (err){
          // handle error
					console.log(err);
        } else {
          var userId = Meteor.userId();
					fileObjId = fileObj._id;
					// console.log(fileObj);
					// console.log(Files);
					// console.log(fileObjId = fileObj._id);
        }
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
			
      Meteor.call("createMaterial",courseId, sessionId, fileObjId);
    }
  });
	
Files.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  },
  download: function(){
    return false;
  }
});

Files.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});