courses = new Mongo.Collection("course");
groups = new Mongo.Collection("group");
Timeslots = new Mongo.Collection("timeslots");
Bookings = new Mongo.Collection("bookings");
Cacilities = new Mongo.Collection("facilities");



var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
  stores: [imageStore]
});