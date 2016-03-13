function courseData(){
  var courseArray = Courses.find({}).fetch();
  //find the number of class the course have had in history
  var returnArray = [];
  for (var i = 0; i < courseArray.length; i++){
    var groups = Groups.find({courseCode: courseArray[i].courseCode}).fetch();
    var data = [courseArray[i], groups.length];
    returnArray.push(data);
  }

};

function groupData(){
  var groupArray = Groups.find({}).fetch();

  var returnArray = [];
  for (var i = 0; i < groupArray.length; i++){
    var classList = groupArray[i].studentList;
    var data = [groupArray[i], classList.length];
    returnArray.push(data);
  }  
};

function revenueData(){
  var courseArray = Courses.find({}).fetch();
  //find the number of class the course have had in history
  var revenue = 0;
  var returnArray = [];
  for (var i = 0; i < courseArray.length; i++){
    revenue = 0;
    var groups = Groups.find({courseCode: courseArray[i].courseCode}).fetch();
    for (var j = 0; j < groups.length; j++){
      var classList = groups[j].classList;
      var courseFee = parseInt(courseArray[i].courseFees);
      revenue += classList.length * courseFee
    }
    var data = [courseArray[i], revenue];
    returnArray.push(data);
  }

};