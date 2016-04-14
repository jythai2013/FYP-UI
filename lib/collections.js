Courses = new Mongo.Collection("courses");
CoursesImages = new Mongo.Collection("coursesImages");
Groups = new Mongo.Collection("groups");
Timeslots = new Mongo.Collection("timeslots");
Bookings = new Mongo.Collection("bookings");
Facilities = new Mongo.Collection("facilities");
Materials = new Mongo.Collection("materials");
Feedback = new Mongo.Collection("feedback");
FeedbackQuestions = new Mongo.Collection("feedbackQuestions");
FeedbackSurvey = new Mongo.Collection("feedbackSurvey");
FeedbackAnswers = new Mongo.Collection("feedbackAnswers");
// Userss = new Mongo.Collection("userss");
FutureTasks = new Meteor.Collection('future_tasks'); // server-side only
LSPSurvey = new Mongo.Collection('lspSurvey');


//prevents users from changing their priviledges
//Meteor.users.deny({
  //update: function() {
    //return true;
//  }
//});


// FS.debug = true;

// var dropboxStore = new FS.Store.Dropbox("files", {
//   key: "mn4ezqpq3mcxrmu",
//   secret: "x2k4ofzty9jyerw",
//   token: "tGDuXGtqdm4AAAAAAAAHGErhWft9IMF_EGAzX7BgHvxw5Th-i8qOeBmRZjjdTn0F", // Don’t share your access token with anyone.
//   folder: "MeteorTest", //optional, which folder (key prefix) to use
//   // The rest are generic store options supported by all storage adapters
//   maxTries: 1 //optional, default 5
// });


// var s3Store = new FS.Store.S3("files", {
//   /* REQUIRED */
//   accessKeyId: Meteor.settings.private.AWSAccessKeyId, 
//   secretAccessKey: Meteor.settings.private.AWSSecretAccessKey, 
//   bucket: Meteor.settings.private.AWSBucket
// });

// Files = new FS.Collection("files", {
//   stores: [s3Store]
// });
// // Images = new FS.Collection("Images", {
// //   stores: [s3Store],
// //   filter: {
// //     allow: {
// //       contentTypes: ['image/*']
// //     }
// //   }
// // });

	
// Files.deny({
//   insert: function(){
//     return false;
//   },
//   update: function(){
//     return false;
//   },
//   remove: function(){
//     return false;
//   },
//   download: function(){
//     return false;
//   }
// });

// Files.allow({
//   insert: function(userId){
//     return userId != null; ;
//   },
//   update: function(userId){
//     return userId != null; ;
//   },
//   remove: function(){
//     return true;
//   },
//   download: function(){
//     return true;
//   }
// });