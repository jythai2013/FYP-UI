Template.facility.helpers({

  "facilities" : function listFacilityEventHandler(e) {
    console.log("here");
    return Facilities.find({});
  }
});

Template.addFacilityForm.events({
  "click #addFacilityButton" : function createFacilityEventHandler(e) {
    e.preventDefault();
    //TODO: Validation of user
    // if(Meteor.user.userType != "admin"){
    // return false;
    // }
    console.log("here2");

    //TODO: Validation of input
    var cType = document.getElementById("cNewType").value;
    var cName = document.getElementById("cNewName").value;
    var cCapicity = parseInt(document.getElementById("cNewCapacity").value);
    var cDescription = document.getElementById("cNewDesc").value;

    Meteor.call("createFacility", cType, cName, cCapicity, cDescription);
  }
});

Template.deleteFacility.events({
	"click #deleteFacilityButton" : function deleteFacilityEventHandler(e) {
			console.log(this._id);
			Meteor.call("deleteFacility", this._id);
	}
});