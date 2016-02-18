Template.dashboard.rendered = function(){
  Tracker.autorun(function(){
    var array = Bookings.find();
    

    $('#dashboardCalendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        events: function(start, end, callback){
          events = [];
          array.fetch().forEach(function(booking){
            oneCourse = Courses.findOne({courseCode:booking.course});
            if(oneCourse != undefined)
              courseName = oneCourse.courseName;
            else
              courseName = booking.course
            booking.title = courseName + "-" + booking.sessionNo;

            events.push({
              id: booking._id,
              start: booking.start,
              end: booking.end,
              title: booking.title, 
              allDay: false,
              editable: true
            });
          });

          callback(events);

        }
    })

  })
}

Template.trainerDashboard.rendered = function(){
  Tracker.autorun(function(){
    var array = Bookings.find();
    

    $('#dashboardCalendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        events: function(start, end, callback){
          events = [];
          array.fetch().forEach(function(booking){
            oneCourse = Courses.findOne({courseCode:booking.course});
            if(oneCourse != undefined)
              courseName = oneCourse.courseName;
            else
              courseName = booking.course
            booking.title = courseName + "-" + booking.sessionNo;

            events.push({
              id: booking._id,
              start: booking.start,
              end: booking.end,
              title: booking.title, 
              allDay: false,
              editable: true
            });
          });

          callback(events);

        }
    })

  })
}

// Template.studentDashboard.rendered = function(){
  // Tracker.autorun(function(){
    // var array = Bookings.find();
    

    // $('#dashboardCalendar').fullCalendar({
        // header: {
          // left: 'prev,next today',
          // center: 'title',
          // right: 'month,agendaWeek,agendaDay'
        // },
        // events: function(start, end, callback){
          // events = [];
          // array.fetch().forEach(function(booking){
            // oneCourse = Courses.findOne({courseCode:booking.course});
            // if(oneCourse != undefined)
              // courseName = oneCourse.courseName;
            // else
              // courseName = booking.course
            // booking.title = courseName + "-" + booking.sessionNo;

            // events.push({
              // id: booking._id,
              // start: booking.start,
              // end: booking.end,
              // title: booking.title, 
              // allDay: false,
              // editable: true
            // });
          // });

          // callback(events);

        // }
    // })

  // })
// }


