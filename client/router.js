Router.map(function() {
    this.route('Sterling Traning Hub', {
        path:'/website',
        template: 'websitePages',
        layoutTemplate: "layoutWebsiteJade",
		onAfterAction: function() {
	        document.title = this.route.getName();
	    }
    });

    this.route('facDev', {
        path:'/facDev',
        template: 'facilityManagement',
        layoutTemplate: "loginLayout"
    });

    this.route('loginPage', {
        path:'/login',
        template: 'loginModal',
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