Courses = new Mongo.Collection("courses");
CoursesImages = new Mongo.Collection("coursesImages");
Groups = new Mongo.Collection("group");
Timeslots = new Mongo.Collection("timeslots");
Bookings = new Mongo.Collection("bookings");
Facilities = new Mongo.Collection("facilities");
Materials = new Mongo.Collection("materials");
// Userss = new Mongo.Collection("userss");
FutureTasks = new Meteor.Collection('future_tasks'); // server-side only
//UserAccounts = new Mongo.Collection('users');


//prevents users from changing their priviledges
//Meteor.users.deny({
  //update: function() {
    //return true;
//  }
//});


FS.debug = true;

var dropboxStore = new FS.Store.Dropbox("files", {
  key: "mn4ezqpq3mcxrmu",
  secret: "x2k4ofzty9jyerw",
  token: "tGDuXGtqdm4AAAAAAAAHGErhWft9IMF_EGAzX7BgHvxw5Th-i8qOeBmRZjjdTn0F", // Don’t share your access token with anyone.
  folder: "MeteorTest", //optional, which folder (key prefix) to use
  // The rest are generic store options supported by all storage adapters
  maxTries: 1 //optional, default 5
});

Files = new FS.Collection("files", {
  stores: [dropboxStore]
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