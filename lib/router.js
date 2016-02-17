

Router.map(function() {
	this.route('generatePDF', {
        path: '/api/generatePDF',
        where: 'server',
        action: function() {
            var webshot = Meteor.npmRequire('webshot');
            var fs      = Npm.require('fs');
            //var fut = new Future();
						Future = Npm.require('fibers/future');
            var fut = new Future();
            var fileName = "generated_"+Random.id()+".pdf";
            var url = Meteor.absoluteUrl("/login");

            var options = {
              renderDelay:5000,
                "paperSize": {
                    "format": "Letter", 
                    "orientation": "portrait", 
                    "margin": "1cm"
                }
            };

            webshot(url, fileName, options, function(err) {
              fs.readFile(fileName, function (err,data) {
                if (err) {
                  return console.log(err);
                }

                fs.unlinkSync(fileName);
                fut.return(data);
              });
            });

            this.response.writeHead(200, {'Content-Type': 'application/pdf',"Content-Disposition": "attachment; filename=generated.pdf"});
            this.response.end(fut.wait());
        }
    });
		
    this.route('Sterling Training Hub', {
        path:'/website',
        template: 'websitePages',
        layoutTemplate: "layoutWebsiteJade",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });

    this.route("Trainer's Portal", {
        path:'/trainer',
        template: 'trainerDashboard',
        layoutTemplate: "trainerIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });

    this.route("Trainer Classlist", {
        path:'/trainerClasslist',
        template: 'trainerClassList',
        layoutTemplate: "trainerIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });

    this.route("Upload Documents", {
        path:'/trainerUploads',
        template: 'trainerUploads',
        layoutTemplate: "trainerIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });

    this.route("View Class", {
        path:'/trainerClass',
        template: 'trainerClass',
        layoutTemplate: "trainerIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });


    this.route('testyWord', {
        path:'/testyWord',
        template: 'testyWord',
        layoutTemplate: "loginLayout"
    });
		
    this.route('testyGroup', {
        path:'/testyGroup',
        template: 'groupRegistration',
        layoutTemplate: "loginLayout"
    });

    this.route('testyCert', {
        path:'/testyCert',
        template: 'certificateTemplate',
        layoutTemplate: "loginLayout"
    });

    this.route('testyForm', {
        path:'/testyForm',
        template: 'feedbackCenter',
        layoutTemplate: "loginLayout"
    });

    this.route('testyAttendance', {
        path:'/testyAttendance',
        template: 'testyAttendance',
        layoutTemplate: "loginLayout"
    });

    this.route('testyGrades', {
        path:'/testyGrades',
        template: 'testyGrades',
        layoutTemplate: "loginLayout"
    });

		
    this.route('testyClasslist', {
        path:'/testyClasslist',
        template: 'testyClasslist',
        layoutTemplate: "loginLayout"
    });

		
    this.route('testyCass', {
        path:'/testyCass',
        template: 'feedbackQnMgmt',
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
		
		/*this.route('certificateManagement', {
				path:'/certificateManagement',
				template: 'certificate',
        layoutTemplate: "mainLayout"
		});*/

    this.route('certificateStudentList', {
        path:'/certificateStudentList',
        template: 'certificateStudentList',
        layoutTemplate: "mainLayout"
    });
});

Router.route('/CourseModule/course', {
    template: 'course',
    data: function(){
        var courseId = this.params.query.cCode;
        return Courses.findOne({ courseCode: courseId });
    }
});

Router.route('/CourseModule/class', {
    template: 'group',
    data: function(){
        var courseId = this.params.query.cCode;
        var courseGrp = this.params.query.cgrpNum;
        //console.log(courseGrp + "URL");
        //console.log("router"+Groups.findOne({ courseCode: courseId,grpNum:courseGrp }));
        return Groups.findOne({ courseCode: courseId,grpNum:courseGrp });
    }
});

Router.route('/FeedbackMgmt/feedbackQnMgmt', {
    template: 'feedbackQnMgmt',
    data: function(){
        var feedbackId = this.params.query._id;
        var courseGrp = this.params.query.cgrpNum;
        console.log(courseGrp + "URL");
        return Feedback.findOne({ _id: feedbackId });
    }
});

Router.route('/signInReg', {
    template:'signInReg',
    path:'/signInReg',

});

Router.route('/resetPassword', {
    template:'resetPassword',
    path:'/resetPassword',
    layoutTemplate: "resetLayout"
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
