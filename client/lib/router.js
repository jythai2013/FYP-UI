Router.map(function() {
    this.route('Sterling Traning Hub', {
        path:'/website',
        template: 'website',
        layoutTemplate: "layoutWebsite",
		onAfterAction: function() {
	        document.title = this.route.getName();
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