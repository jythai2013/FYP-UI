

 $(document).ready(function() {

    // page is now ready, initialize the calendar...
   // jQuery.noConflict();
   makeQTip();

});

// Setup QTip
  function makeQTip() {
   var date = new Date();
   var d = date.getDate();
   var m = date.getMonth();
   var y = date.getFullYear();

   tooltip = $('<div/>').qtip({
     id: 'fullcalendar',
     prerender: true,
     content: {
       text: ' ',
       title: {
         button: true
       }
     },
     position: {
       my: 'bottom center',
       at: 'top center',
       target: 'mouse',
       viewport: $('#fullCalendarDiv'),
       adjust: {
         mouse: false,
         scroll: false
       }
     },
     show: false,
     hide: false,
     style: 'qtip-light'
   }).qtip('api');
  }
	
	
	
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

        },
      eventMouseover: function(data, event, view) {
				// alert();
        var content = '<h3>'+data.title+'</h3>' + 
          '<p><b>Start:</b> '+data.start+'<br />' + 
          (data.end && '<p><b>End:</b> '+data.end+'</p>' || '');

        tooltip.set({
          'content.text': content
        })
        .reposition(event).show(event);
      },
      eventMouseout: function() {tooltip.hide()},
      dayClick: function() { tooltip.hide() },
      eventResizeStart: function() { tooltip.hide() },
      eventDragStart: function() { tooltip.hide() },
      viewDisplay: function() { tooltip.hide() },
    })

  })
}

// Template.trainerDashboard.rendered = function(){
//   Tracker.autorun(function(){
//     var array = Bookings.find();
    

//     $('#dashboardCalendar').fullCalendar({
//         header: {
//           left: 'prev,next today',
//           center: 'title',
//           right: 'month,agendaWeek,agendaDay'
//         },
//         events: function(start, end, callback){
//           events = [];
//           array.fetch().forEach(function(booking){
//             oneCourse = Courses.findOne({courseCode:booking.course});
//             if(oneCourse != undefined)
//               courseName = oneCourse.courseName;
//             else
//               courseName = booking.course
//             booking.title = courseName + "-" + booking.sessionNo;

//             events.push({
//               id: booking._id,
//               start: booking.start,
//               end: booking.end,
//               title: booking.title, 
//               allDay: false,
//               editable: true
//             });
//           });

//           callback(events);

//         }
//     })

//   })
// }

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


