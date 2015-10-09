if (Meteor.isServer) {
    
}

if (Meteor.isClient) {


    Handlebars.registerHelper("KAZOOM", function(title) {
    if(title) {
        document.title = title;
    } else {
        document.title = "Your default title";
    }
});
}