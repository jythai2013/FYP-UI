// counter starts at 0
Session.setDefault("counter", 0);

Template.course.helpers({
  counter: function () {
    return Session.get("counter");
  },
  uploads:function(){
    var a = Files.find({type: "course"});
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
		
    Meteor.call("createMaterial",type, courseId, sessionId, fileObjId);
  }
});

Template.formRespo.helpers({
  counter: function () {
    return Session.get("counter");
  },
  upload:function(){
    var fileList = Materials.find({type:"formLSP"});
    console.log(fileList);
    var a;

    fileList.each(function(index, item){
      a+=Files.find(item);
      console.log(a);
    });



    // for(i = 0; i < fileList.fetch().length; i++){
    //   a += Files.findOne(fileList[i]);
    //   console.log(a);
    // }
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
    

    console.log(Files);
    var fileObjId = Files.insert(files[0], function (err, fileObj) {
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
    Meteor.call("createMaterial", typeI,courseId, sessionId, fileObjIdI);
  }
});