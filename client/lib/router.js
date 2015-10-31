Router.map(function() {
    this.route('Sterling Traning Hub', {
        path:'/website',
        template: 'website',
        layoutTemplate: "layoutWebsite",
		onAfterAction: function() {
	        document.title = this.route.getName();
	    }
    });

    this.route('facDev', {
        path:'/facDev',
        template: 'facilityManagement',
        layoutTemplate: "loginLayout",
				waitOn: function(){
					// console.log("READYYYY2");
					// waitOn makes sure that this publication is ready before rendering your template
					return Meteor.subscribe("facilitiesData");
				},
				data: function(){
					// this will be used as the current data context in your template
					t = Facilities.find();
					return t;
				}
    });

    this.route('loginPage', {
        path:'/login',
        template: 'loginPage',
        layoutTemplate: "loginLayout"
    });

    this.route('userProfile', {
        path:'/profile',
        template: 'profile',
        layoutTemplate: "mainLayout"
    });

    // Registration 
    this.route('registerAdmin', {
        path:'/registerAdmin',
        template: 'registerAdmin',
        layoutTemplate: "mainLayout"
    });

    this.route('registerCorporation', {
        path:'/registerCorporation',
        template: 'registerCorporation',
        layoutTemplate: "mainLayout"
    });

    this.route('registerLearner', {
        path:'/registerLearner',
        template: 'registerLearner',
        layoutTemplate: "mainLayout"
    });

    this.route('registerTrainer', {
        path:'/registerTrainer',
        template: 'registerTrainer',
        layoutTemplate: "mainLayout"
    });
    
});