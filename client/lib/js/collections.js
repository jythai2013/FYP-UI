Courses = new Mongo.Collection("courses");
Sessions = new Mongo.Collection("sessions");
Timeslots = new Mongo.Collection("timeslots");



var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
  stores: [imageStore]
});