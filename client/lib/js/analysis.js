function courseData(){
    console.log("> Function courseData");
    var courseArray = Courses.find({}).fetch();
    //find the number of class the course have had in history
    var returnArray = [];
    for (var i = 0; i < courseArray.length; i++){
        var cCode = courseArray[i].courseCode;
        var groupsSize = Groups.find({courseCode: cCode}).count();
        //{year: '2008', value: 20 }
        var data = {year: cCode, value: groupsSize};
        // console.log("Function courseData : >> push "+ data);
        returnArray.push(data);
    }
    console.log("return >> " + returnArray);
    return returnArray;
}
function groupData(){
    var groupArray = Groups.find({}).fetch();
    console.log("> Function groupData");
    
    var returnArray = new Array();
    for (var i = 0; i < groupArray.length; i++){
        var classList = groupArray[i].classlist;
        var groupID = groupArray[i].courseCode;
        var data = {group: groupID, value: classList.length};
        console.log("Function courseData : >> push "+ data);
        returnArray.push(data);
    }
    return returnArray;  
};

function revenueData(){
    var courseArray = Courses.find({}).fetch();
    console.log("> Function revenueData");

    //find the number of class the course have had in history
    var revenue = 0;
    var returnArray = new Array();
    console.log("courseArray : " + courseArray.length);
    for (var i = 0; i < courseArray.length; i++){
        revenue = 0;
        var cCode = courseArray[i].courseCode;
        console.log("for "+ cCode);
        var groups = Groups.find({courseCode: cCode}).fetch();
        for (var j = 0; j < groups.length; j ++){
           var classList = groups[j].classlist;
           var courseFee = parseInt(courseArray[i].courseFees);
           revenue  = classList.length * courseFee;
        }
        console.log("cost "+ revenue);
        var data = {group: cCode, value: revenue};
        returnArray.push(data);
    }
    return returnArray;
};

Template.courseData.helpers({
    "courseDataArray" : function getCourseDataArray(e) {
        var coursesArray = courseData();
        // console.log("CourseDataArray >>>");
        // console.log(coursesArray);
        return coursesArray;
    }
});

Template.courseData.onRendered(function drawChart1() {
    //clear the contents of the div, in the event this function is called more than once.
    $('#courseClassSummary').empty();
    var data = courseData();

    //example of how to load data from a collection that already contains data in the appropriate format
    //var data = MyCollection.find({}, {fields: { year: 1, value: 1}, {sort: year: 1}}).fetch();

    if (data) {
        new Morris.Bar({
            // ID of the element in which to draw the chart.
            element: 'courseClassSummary',
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data:    data,
            // The name of the data record attribute that contains x-values.
            xkey:    'year',
            // A list of names of data record attributes that contain y-values.
            ykeys:   ['value'],
            // Labels for the ykeys -- will be displayed when you hover over the
            // chart.
            labels:  ['Value'],
            resize:  true
        });
    }
});

Template.groupData.onRendered(function drawChart2() {
    //clear the contents of the div, in the event this function is called more than once.
    $('#classesConductedSummary').empty();
    var data = groupData();

    if (data) {
        new Morris.Bar({
            // ID of the element in which to draw the chart.
            element: 'classesConductedSummary',
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data:    data,
            // The name of the data record attribute that contains x-values.
            xkey:    'group',
            // A list of names of data record attributes that contain y-values.
            ykeys:   ['value'],
            // Labels for the ykeys -- will be displayed when you hover over the
            // chart.
            labels:  ['Value'],
            resize:  true
        });
    }
});

Template.revenueData.onRendered(function drawChart3() {
    //clear the contents of the div, in the event this function is called more than once.
    $('#courseRevenueSummary').empty();
    var data = revenueData();

    if (data) {
        new Morris.Bar({
            // ID of the element in which to draw the chart.
            element: 'courseRevenueSummary',
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data:    data,
            // The name of the data record attribute that contains x-values.
            xkey:    'group',
            // A list of names of data record attributes that contain y-values.
            ykeys:   ['value'],
            // Labels for the ykeys -- will be displayed when you hover over the
            // chart.
            labels:  ['Value'],
            resize:  true
        });
    }
});
