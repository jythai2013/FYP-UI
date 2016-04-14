var s3Store = new FS.Store.S3("files", {
  /* REQUIRED */
  accessKeyId: Meteor.settings.private.AWSAccessKeyId, 
  secretAccessKey: Meteor.settings.private.AWSSecretAccessKey, 
  bucket: Meteor.settings.private.AWSBucket
});

Files = new FS.Collection("files", {
  stores: [s3Store]
});

Meteor.startup(function () {
    // code to run on server at startup
  Files.allow({
    insert: function(userId){
      return userId != null; ;
    },
    update: function(userId){
      return userId != null; ;
    },
    remove: function(){
      return true;
    },
    download: function(){
      return true;
    }
  });
});