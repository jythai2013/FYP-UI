function courseData(){
    var courseArray = Courses.find({}).fetch();
    //find the number of class the course have had in history
    var returnArray = new Array();
    for (var i = 0; i < courseArray.length; i ){
      var groups = Groups.find({courseCode: courseArray[i].courseCode}).fetch();
      var data = [courseArray[i], groups.length];
      //console.log("Function courseData : >> push "+ data);
      returnArray.push(data);
    }
    return returnArray;
}

function groupData(){
    var groupArray = Groups.find({}).fetch();
  
    var returnArray = new Array();
    for (var i = 0; i < groupArray.length; i ){
        var classList = groupArray[i].studentList;
        var data = [groupArray[i], classList.length];
        returnArray.push(data);
    }
    return returnArray;  
};

function revenueData(){
    var courseArray = Courses.find({}).fetch();
    //find the number of class the course have had in history
    var revenue = 0;
    var returnArray = new Array();
    for (var i = 0; i < courseArray.length; i ){
        revenue = 0;
        var groups = Groups.find({courseCode: courseArray[i].courseCode}).fetch();
        for (var j = 0; j < groups.length; j ){
           var classList = groups[j].classList;
           var courseFee = parseInt(courseArray[i].courseFees);
           revenue  = classList.length * courseFee
        }
        var data = [courseArray[i], revenue];
        returnArray.push(data);
    }
    return returnArray;
};

Template.adminAnalytics.onRendered(function drawChartAdmin() {
    //clear the contents of the div, in the event this function is called more than once.
    console.log("courseData chart >> Start ");
    $('#adminCourseChart').empty();
    var data = courseData();
    console.log(data);

    // if (data) {
    //     new Morris.Line({
    //         element: 'adminCourseChart',
    //         data:    data,
    //         xkey:    'course',
    //         ykeys:   ['value'],
    //         // chart.
    //         labels:  ['Value'],
    //         resize:  true
    //     });
    // }
    console.log("courseData chart >> END");
});



// STELLA's
Template.trainerGraph.onRendered(function drawChart() {
    //clear the contents of the div, in the event this function is called more than once.
    $('#myfirstchart').empty();

    var data = [
        { year: '2008', value: 20 },
        { year: '2009', value: 10 },
        { year: '2010', value: 5 },
        { year: '2011', value: 5 },
        { year: '2012', value: 20 }
    ];

    //example of how to load data from a collection that already contains data in the appropriate format
    //var data = MyCollection.find({}, {fields: { year: 1, value: 1}, {sort: year: 1}}).fetch();

    if (data) {
        new Morris.Line({
            // ID of the element in which to draw the chart.
            element: 'myfirstchart',
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
