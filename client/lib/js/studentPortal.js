 function getStudentOngoingCourse(e) {
    console.log("trainerPortal.js - trainerOngoingCourses >>>");
    var tId = Meteor.user()._id;
    var coursesEnrolled = Groups.find({classlist: {$in : [ tId ]}});
    console.log("getStudentOngoingCourse Return: " + coursesEnrolled.length);
    return coursesEnrolled;
 } 

 function getDDMMYYY(date) {
    return moment(date).format("DD-MM-YYYY");
 }

 Template.studentUpload.helpers({
    "studentOngoingCourses" : function findTrainerUploads(e) {
        var a = getStudentOngoingCourse();
        console.log("studentOngoingCourses >>> "+a);
        return a;
    },

    uploads:function(){
	    var a = Files.find({type: "course"});
	    var fileList = Materials.find({type:"groups"});
	    var fileList2 = Materials.find({type: "course"});
	    console.log(fileList);
	    var a = new Array();

	    fileList.forEach(function(item, index){
	      console.log(item.fileName);
	      a.push(Files.findOne(item.fileName));
	      console.log(item);
	    });

	    fileList2.forEach(function(item, index){
	      console.log(item.fileName);
	      a.push(Files.findOne(item.fileName));
	      console.log(item);
	    });

	    console.log(a);
	    return a;
	}
 });

//student/studentClass.html
Template.studentClass.helpers({
	"studentOngoingCourses" : function findTrainerOngoingCourses(e) {
		console.log("studentPortal.js - studentOngoingCourses >>>");
		var coursesEnrolled = getStudentOngoingCourse();
		// maybe need filter for ongoing courses only
		console.log(coursesEnrolled);
		return coursesEnrolled;
	}
});
