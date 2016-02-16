// Template.main.rendered = function(){
  // var calendar = $('#calendar').fullCalendar({


// })

// }

// Template.dashboard.helpers({
//   options: function() {
//       return {
//         header: {
//         left: 'prev,next today',
//         center: 'title',
//         right: 'month,agendaWeek,agendaDay'
//         }
//       };
//   }
// });

// Template.dashboard.events({
//   "click .fc-widget-content": function() {
//     Modal.show('exampleModal')
//   }
// });

// Template.main.rendered = function(){
  // var calendar = $('#calendar').fullCalendar({


// })

// }

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


