Router.map(function() {
    this.route('Sterling Training Hub', {
        path:'/website',
        template: 'websitePages',
        layoutTemplate: "layoutWebsiteJade",
		onAfterAction: function() {
	        document.title = this.route.getName();
	    }
    });

    this.route('Individual Course Signup', {
        path:'/courseSignup',
        template: 'registerForCourse',
        layoutTemplate: "layoutWebsite2Jade"
    });

    this.route('Course Details', {
        path:'/website/courseDetails',
        template: 'websitCourseDetails',
        layoutTemplate: "layoutWebsite2Jade"
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

Router.route('/CourseModule/course/:_id', {
    template: 'course',
    courseIdPage: function(){
        var courseId = this.params._id;
        console.log(Courses.findOne({ courseCode: courseId }));
        return Courses.findOne({ courseCode: courseId });
    }
});

Router.route('/CourseModule/facilityManagement', {
    template: 'facilityManagement',
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