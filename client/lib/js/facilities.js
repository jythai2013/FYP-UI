Template.facility.onRendered(function(){
	Session.set("facilitySearchName", null);
	Session.set("facilitySearchType", null);
	Session.set("facilitySearchLess", null);
	Session.set("facilitySearchEqua", null);
	Session.set("facilitySearchMore", null);
	Session.set("facilitySearchCaps", null);
});

Template.facility.helpers({

  "facilities" : function listFacilityEventHandler(e) {
		var verbose = true;
		var facName = Session.get("facilitySearchName");
		var facType = Session.get("facilitySearchType");
		var facLess = Session.get("facilitySearchLess");
		var facEqua = Session.get("facilitySearchEqua");
		var facMore = Session.get("facilitySearchMore");
		var facCaps = Session.get("facilitySearchCaps");
		var v = Facilities.find({}).fetch();
		if(facName != null && facName != undefined && facName.length > 0){
			v = v.filter(function(e){
				if(verbose){
					console.log(e);
					console.log(e.fac.toLowerCase().indexOf(facName.toLowerCase())>-1);
				}
				return (e.fac.toLowerCase().indexOf(facName.toLowerCase()));
			});
		}
		if(facType != null && facType != undefined && facType.length > 0){
			v = v.filter(function(e){
				if(verbose){
					console.log(e);
					console.log(e.facType.toLowerCase().indexOf(facType.toLowerCase()));
				}
				return (e.facType.toLowerCase().indexOf(facType.toLowerCase())>-1);
			});
		}
		if(facLess){
			v = v.filter(function(e){
				if(verbose){
					console.log(e)
					console.log(facCaps)
				}
				return (e.capacity < facCaps);
			});
		}
		if(facEqua){
			v = v.filter(function(e){
				if(verbose){
					console.log(e)
					console.log(facCaps)
				}
				return (e.capacity == facCaps);
			});
		}
		if(facMore){
			v = v.filter(function(e){
				if(verbose){
					console.log(e)
					console.log(facCaps)
				}
				return (e.capacity > facCaps);
			});
		}
		if(verbose){
			console.log(v);
		}
		return v;
  }
});

Template.facility.events({
	"click #filter" : function doSearch(e){
		// console.log(e);
		var facName = document.getElementById("facilityName").value;
		var facType = document.getElementById("facilitySearchType").value;       
		var facCaps = document.getElementById("fCapacity").value;  
		var facLess = document.getElementById("optionsRadios1").checked;
		var facEqua = document.getElementById("optionsRadios2").checked;
		var facMore = document.getElementById("optionsRadios3").checked;
		Session.set("facilitySearchName", facName);
		Session.set("facilitySearchType", facType);
		Session.set("facilitySearchCaps", facCaps);
		Session.set("facilitySearchLess", facLess);
		Session.set("facilitySearchEqua", facEqua);
		Session.set("facilitySearchMore", facMore);
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