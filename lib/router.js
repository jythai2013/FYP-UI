Router.map(function() {
    this.route('Sterling Training Hub', {
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

Router.route('/CourseModule/course', {
    template: 'course',
    data: function(){
        var courseId = this.params.query.cCode;
        console.log("router"+Courses.findOne({ courseCode: courseId }));
        return Courses.findOne({ courseCode: courseId });
    }
});

// Router.route('/website/courseDetails/:_id', function () {
//     this.layout('layoutWebsite2Jade');
//     this.render('websiteCourseDetails', {
//         data: function () {
//             var id = this.params._id
//             var hrefLink = CoursesImages.findOne({code: id});
//             console.log("STELLA @" + id);
//             console.log("STELLA @" + hrefLink);
//             return CoursesImages.findOne({code: id});
//         }
//     });
// },{
//     name: 'Course Details'
// });

// Router.route('/website/courseSignup/:_id', function () {
//     this.layout('layoutWebsite2Jade');
//     this.render('registerForCourse', {
//         getCourseIDFromPath: function () {
//             var id = this.params._id
//             console.log("STELLA " + id);
//             return Courses.findOne({Courses: id});
//         }
//     });
// },{
//     name: 'Individual Course Signup'
// });

Router.route('/', function () {
    this.layout("layoutWebsiteJade");
    this.redirect('Sterling Training Hub');
});

Router.route('/website/courseDetails/CGM01v3', function () {
    this.layout("layoutWebsite2Jade");
    this.render('websiteCourseDetails');
});

Router.route('/website/courseSignup/CGM01v3', function () {
    this.layout("layoutWebsite2Jade");
    this.render('registerForCourse');
});

Router.route('/website/courseDetails/WSH01v2', function () {
    this.layout("layoutWebsite2Jade");
    this.render('websiteCourseDetails2');
});

Router.route('/website/courseSignup/WSH01v2', function () {
    this.layout("layoutWebsite2Jade");
    this.render('registerForCourse2');
});

Router.route('/website/courseDetails/CSCPM01', function () {
    this.layout("layoutWebsite2Jade");
    this.render('websiteCourseDetails3');
});

Router.route('/website/courseSignup/CSCPM01', function () {
    this.layout("layoutWebsite2Jade");
    this.render('registerForCourse3');
});