function feedbackData(question){

    console.log(question);


    // var courseArray = Courses.find({}).fetch();
    // //find the number of class the course have had in history
    var returnArray = [];

        for (var i = 0; i < question.numQn.options.length; i++){
            var feedbackTemplate = question.feedbackTemplate;
            // var feedbackType = Feedback.findOne({_id:feedbackTemplate}).feedbackType;

            var questionFromFeedback = question.qn.options[i];
            console.log(questionFromFeedback)
            var ansFromFeedbackAns = question.numQn.options[i];
            console.log(ansFromFeedbackAns)
        //     var cCode = courseArray[i].courseCode;
        //     var groupsSize = Groups.find({courseCode: cCode}).count();
        //     //{year: '2008', value: 20 }
            var data = {question: questionFromFeedback, answer: ansFromFeedbackAns};
            console.log("Function courseData : >> push "+ data);
            returnArray.push(data);
        }
    console.log("return >> " + returnArray);
    return returnArray;
}


// CASS's
Template.displayFeedbackResults.onRendered(function drawingChart() { //create one template for each graph
    //clear the contents of the div, in the event this function is called more than once.
    $('#displayFeedbackChart').empty();

     var url =  window.location.href;
        
    var positionFirstEqual = url.indexOf('=');
    var fbidAns=url.substr(positionFirstEqual+1);    

    var numQns = FeedbackAnswers.findOne({_id:fbidAns}).options;
    console.log(numQns.length);
        var feedbackTemplate = FeedbackAnswers.findOne({_id:fbidAns}).feedbackTemplateID;


    for(i = 0; i < numQns.length; i++){
        var obj = new Object();
        console.log(numQns[i]);
        obj.numQn = numQns[i];
        // obj.feedbackTemplate = FeedbackAnswers.findOne({_id:fbidAns}).feedbackTemplateID;
        obj.qn = Feedback.findOne({_id:feedbackTemplate}).qnOptions[i];
        console.log(Feedback.findOne({_id:feedbackTemplate}).qnOptions[i]);
        var data = feedbackData(obj);

    
    // var data = [
    //     { year: '2008', value: 20 },
    //     { year: '2009', value: 10 },
    //     { year: '2010', value: 5 },
    //     { year: '2011', value: 5 },
    //     { year: '2012', value: 20 }
    // ];

    //example of how to load data from a collection that already contains data in the appropriate format
    //var data = MyCollection.find({}, {fields: { year: 1, value: 1}, {sort: year: 1}}).fetch();

    if (data) {
        new Morris.Bar({
            // ID of the element in which to draw the chart.
            element: '#{_id}_displayFeedbackChart', //must be same as line 60
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data:    data, //reflects line 61
            // The name of the data record attribute that contains x-values.
            xkey:    'question', //tallies with line 10
            // A list of names of data record attributes that contain y-values.
            ykeys:   ['answer'],
            // Labels for the ykeys -- will be displayed when you hover over the
            // chart.
            labels:  ['Value'],
            resize:  true
        });
    }

    }
});





Template.displayFeedbackResults.helpers({

    "feedbackQns": function() {

         var url =  window.location.href;
        
        var positionFirstEqual = url.indexOf('=');
        var fbidAns=url.substr(positionFirstEqual+1);
        var feedbackAnsOptions = FeedbackAnswers.findOne({_id:fbidAns}).options;    


        var fakeArray = new Array();
        for(i = 0; i < feedbackAnsOptions.length; i++){
            fakeArray.push(feedbackAnsOptions[i].feedbackQn)
        }
        return fakeArray;
    }
});