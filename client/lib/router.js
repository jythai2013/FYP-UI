Router.map(function() {
    this.route('Sterling Traing Hub', {
        path:'/index.html',
        template: 'intro',
        layoutTemplate: "layout",
		onAfterAction: function() {
	        document.title = this.route.getName();
	    }
    });

    this.route('admin', {
        path:'/admin.html',
        template: 'adminDashboard',
        layoutTemplate: "layoutAdmin"
    });

    this.route('profile', {
        path:'/profile.html',
        template: 'profile',
        layoutTemplate: "layoutAdmin"
    });

    // Registration 
    this.route('registerAdmin', {
        path:'/registerAdmin',
        template: 'registerAdmin',
        layoutTemplate: "layoutAdmin"
    });

    this.route('registerCorporation', {
        path:'/registerCorporation',
        template: 'registerCorporation',
        layoutTemplate: "layoutAdmin"
    });

    this.route('registerLearner', {
        path:'/registerLearner',
        template: 'registerLearner',
        layoutTemplate: "layoutAdmin"
    });

    this.route('registerTrainer', {
        path:'/registerTrainer',
        template: 'registerTrainer',
        layoutTemplate: "layoutAdmin"
    });


    this.route('classHomepage', {
        path:'/classHomePage',
        template: 'homePage',
        layoutTemplate: "layoutAdmin"
    });


    this.route('facilityBooking', {
        path:'/facilityBooking',
        template: 'facilityBooking',
        layoutTemplate: "layoutAdmin"
    });
    
});