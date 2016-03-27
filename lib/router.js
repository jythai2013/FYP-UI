Router.route('/', function () {
    this.layout("layoutWebsiteJade");
    this.redirect('Sterling Training Hub');
});


Router.map(function() {
		
    this.route('Sterling Training Hub', {
        path:'/website',
        template: 'websitePages',
        layoutTemplate: "layoutWebsiteJade",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });

    // TRAINER
    this.route("Trainer Graph", {
        path:'/trainerGraph',
        template: 'trainerDashboard',
        layoutTemplate: "trainerGraph",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });

    this.route("Trainer Portal", {
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

    this.route("Upload Documents - Trainer Portal", {
        path:'/trainerUploads',
        template: 'trainerUploads',
        layoutTemplate: "trainerIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });

    this.route("View Class - Trainer Portal", {
        path:'/trainerClass',
        template: 'trainerClass',
        layoutTemplate: "trainerIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });

    this.route("Annoucements Management - Trainer Portal", {
        path:'/announcement',
        template: 'trainerAnnouncment',
        layoutTemplate: "trainerIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });



    // STUDENTs
    // this.route("Student Portal", {
    //     path:'/student',
    //     // template: 'studentDashboard',
    //     // layoutTemplate: "studentIndex",
    //     // onAfterAction: function() { 
    //     //     document.title = this.route.getName();
    //     // }
    // });

    this.route("Upload Your Assignment", {
        path:'/student/assignmentDropbox',
        template: 'studentUpload',
        layoutTemplate: "studentIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });

    this.route("Download Materials", {
        path:'/student/courseMaterials',
        template: 'studentCourseMaterial',
        layoutTemplate: "studentIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        },
        data: function(){
            var courseGrp = this.params.query.group;
            console.log("Read url > "+ courseGrp);
        }
    });

    this.route("View your Classes", {
        path:'/student',
        template: 'studentClass',
        layoutTemplate: "studentIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });

    this.route("View Grades", {
        path:'/student/grades',
        template: 'studentGrades',
        layoutTemplate: "studentIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        },
        data: function(){
            var courseGrp = this.params.query.group;
            console.log("Read url > "+ courseGrp);
        }
    });

    this.route("View Attendence", {
        path:'/student/attendence',
        template: 'studentAttendence',
        layoutTemplate: "studentIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        },
        data: function(){
            var courseGrp = this.params.query.group;
            console.log("Read url > "+ courseGrp);
        }
    });


    // WEBSITE
    this.route("View Course Info", {

        path:'/website/courseDetail',
        template: 'websiteCourseDetails1',
        layoutTemplate: "layoutWebsite2Jade",
        onAfterAction: function() { 
            document.title = this.route.getName();
        },
        data: function(){
            var course = this.params.query.cCode;
            console.log("Read url > "+ course);
        }
});



    // LOGIN
    this.route('loginPage', {
        path:'/login',
        template: 'loginModal',
        layoutTemplate: "loginLayout"
    });




    // OTHERS
    this.route('testyRec', {
        path:'/testyRec',
        template: 'testyRec',
        layoutTemplate: "loginLayout"
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
        template: 'certificateStudentList'
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


Router.route('/FeedbackMgmt/viewFeedbackSurvey', {
    template: 'viewFeedbackSurvey',
    data: function(){
        var feedbackId = this.params.query._id;
        var courseGrp = this.params.query.cgrpNum;
        console.log(courseGrp + "URL");
        return Feedback.findOne({ _id: feedbackId });
    }
});

Router.route('/FeedbackMgmt/doFeedbackSurvey', {
    template: 'doFeedbackSurvey',
    data: function(){
        var feedbackId = this.params.query.fbidAns;
        return FeedbackAnswers.findOne({ _id: feedbackId });
    }
});

Router.route('/FormsMgmt/courseLSP', {
    template: 'courseLSPForm',
    data: function(){
        var feedbackId = this.params.query.cLSP;
        return Courses.findOne({ _id: feedbackId });
    }
});
Router.route('/FormsMgmt/facilityLSP', {
    template: 'facilityLSPForm',
    data: function(){
        var feedbackId = this.params.query.fLSP;
        return Facilities.findOne({ _id: feedbackId });
    }
});

Router.route('/resetPassword', {
    template:'resetPassword',
    path:'/resetPassword',
    layoutTemplate: "resetLayout"
});


Router.route('/website/courseDetails/CGM01v3', function () {
    this.layout("layoutWebsite2Jade");
    this.render('websiteCourseDetails');
});

Router.route('/website/courseSignup/CGM01v3', function () {
    this.layout("layoutWebsite2Jade");
    this.render('registerForCourse');
});