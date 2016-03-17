Template.nationalityList.helpers({
	// http://stackoverflow.com/questions/33818755/populating-html-select-dropdown-from-a-database-in-meteor
    'setDropdownValue': function(){
    	console.log("setDropdownValue: ID=" + this._id);
    	console.log("setDropdownValue: N=" + this.nationality);
		$("#nationality").val(this.nationality);
	}

});