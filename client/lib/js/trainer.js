//TODO: RUD timeslots (C is done)

Template.setTimeslots.events({
	"submit #addTimeslotForm": function(e){
		e.preventDefault();
		// console.log(e);
		// console.log(this);
		startTimeInput = document.getElementById("addTimeslotStartTime");
		endTimeInput = document.getElementById("addTimeslotEndTime");
		console.log(startTimeInput.value);
		console.log(endTimeInput.value);
		Meteor.call("createTimeslot", startTimeInput.value, endTimeInput.value);
	}
});

Template.fileUpload.events({
  'change .myFileInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        if (err){
          // handle error
        } else {
            // handle success depending what you need to do
          var userId = Meteor.userId();
          var imagesURL = {
            "profile.image": "/cfs/files/images/" + fileObj._id
          };
          Meteor.users.update(userId, {$set: imagesURL});
        }
      });
    });
  }
});