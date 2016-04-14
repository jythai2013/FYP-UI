Router.route('/', function () {
    this.layout("layoutWebsiteJade");
    this.redirect('Sterling Training Hub');
});


Router.map(function() {
		
    this.route('testyStudDetails', {
        path:'/testyStudDetails',
        template: 'studentDetails',
        layoutTemplate: "layoutWebsiteJade",
        onAfterAction: function() { 
					document.title = "Student Details";
        },
        data: function(){
					var stud_id = this.params.query.id;
					theStud = Meteor.users.findOne({_id:stud_id});
					console.log(theStud);
					return theStud;
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

    // TRAINER

    this.route("Trainer Portal", {
        path:'/trainer',
        template: 'trainerClassList',
        layoutTemplate: "trainerIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });

    this.route("Classlist - Trainer Portal", {
        path:'/trainer/classlist',
        template: 'trainerClassList',
        layoutTemplate: "trainerIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });

    this.route("Upload - Trainer Portal", {
        path:'/trainer/uploads',
        template: 'trainerUploads',
        layoutTemplate: "trainerIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        }
    });

    this.route("Class - Trainer Portal", {
        path:'/trainer/viewClass',
        template: 'trainerClass',
        layoutTemplate: "trainerIndex",
        onAfterAction: function() { 
            document.title = this.route.getName();
        },
        data: function(){
            var courseId = this.params.query.cCode;
            var courseGrp = this.params.query.grpNum;
            return Groups.findOne({ courseCode: courseId,grpNum:courseGrp });
        }
    });

    this.route("Announcements - Trainer Portal", {
        path:'/trainer/announcement',
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
            var courseId = this.params.query.cCode;
            var courseGrp = this.params.query.grpNum;
            return Groups.findOne({ courseCode: courseId,grpNum:courseGrp });
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
            var courseId = this.params.query.cCode;
            var courseGrp = this.params.query.grpNum;
            return Groups.findOne({ courseCode: courseId,grpNum:courseGrp });
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
            var courseId = this.params.query.cCode;
            var courseGrp = this.params.query.grpNum;
            return Groups.findOne({ courseCode: courseId,grpNum:courseGrp });
        }
    });


    // WEBSITE
    this.route("View Course Info", {

        path:'/website/courseDetail',
        template: 'websiteCourseDetails1',
        layoutTemplate: "layoutWebsiteJade",
        onAfterAction: function() { 
            document.title = this.route.getName();
        },
        data: function(){
            var courseId = this.params.query.cCode;
            return Courses.findOne({ courseCode: courseId });
        }
    });

    this.route("Signup", {

        path:'website/courseSignup',
        template: 'websiteCourseDetails1',
        layoutTemplate: "registerForCourse",
        onAfterAction: function() { 
            document.title = this.route.getName();
        },
        data: function(){
            var courseId = this.params.query.cCode;
            return Courses.findOne({ courseCode: courseId });
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
        template: 'profilePage',
        layoutTemplate: "mainLayout",
        data: function(){
            var user = Meteor.user();
            return user;
        }
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
        return Feedback.findOne({ _id: feedbackId });
    }
});

Router.route('/doFeedbackSurvey', {
    template: 'doFeedbackSurvey',
    layoutTemplate: "layoutWebsiteJade",

    data: function(){
        var feedbackId = this.params.query.fbidAns;
        var studId = this.params.query.studID;
        // Session.set("studentDoingFeedback", studId)
        return FeedbackAnswers.findOne({ _id: feedbackId });
    }
});

Router.route('/CourseModule/displayFeedbackResults', {
    template: 'displayFeedbackResults',
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
Router.route('/FormsMgmt/trainerLSP', {
    template: 'trainerLSPForm',
    data: function(){
        var feedbackId = this.params.query.tLSP;
        return Meteor.users.find({ _id: feedbackId})
    }
});

Router.route('/resetPassword', {
    template:'resetPassword',
    path:'/resetPassword',
    layoutTemplate: "resetLayout"
});