
	Meteor.publish('userData',function() {
		// if(!this.userId) return null;
		return Meteor.users.find({});
	});
	
	Meteor.publish('courseData',function() {
		// if(!this.userId) return null;
		return Courses.find({},{sort:{courseCode:1}});
	});
	
	Meteor.publish('sessionsData',function() {
		// if(!this.userId) return null; //TODO: test make sure that it returns only the sessions taught by the current logged in user
		return Sessions.find({trainerId: {$regex : ".*"+Meteor.user()._id+".*"}});
	});
	
	Meteor.publish("images", function(){
		return Images.find();
	});