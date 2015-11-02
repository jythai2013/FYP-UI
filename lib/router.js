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
        template: 'loginModal',
        layoutTemplate: "loginLayout"
    });

    this.route('userProfile', {
        path:'/profile',
        template: 'profile',
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

Router.route('/website/courseDetails/:_id', function () {
    this.layout('layoutWebsite2Jade');
    this.render('websiteCourseDetails', {
        getCourseIDFromPath: function () {
            var id = this.params._id
            console.log("STELLA " + id);
            return Courses.findOne({Courses: id});
        }
    });
},{
    name: 'Course Details'
});