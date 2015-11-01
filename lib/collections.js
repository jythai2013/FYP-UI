<<<<<<< HEAD
Courses = new Mongo.Collection("courses");
=======
Courses = new Mongo.Collection("course");
Groups = new Mongo.Collection("group");
Timeslots = new Mongo.Collection("timeslots");
Bookings = new Mongo.Collection("bookings");
Facilities = new Mongo.Collection("facilities");
Materials = new Mongo.Collection("materials");


var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
  stores: [imageStore]
});

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
