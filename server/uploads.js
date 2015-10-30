Meteor.startup(function () {
    // code to run on server at startup
  Files.allow({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    download: function(){
      return true;
    }
  });
});