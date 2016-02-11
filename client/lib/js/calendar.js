// Template.main.rendered = function(){
  // var calendar = $('#calendar').fullCalendar({


// })

// }

Template.dashboard.helpers({
  options: function() {
      return {
        header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
        }
      };
  }
});

Template.dashboard.events({
  "click .fc-widget-content": function() {
    Modal.show('exampleModal')
  }
});

// Template.main.rendered = function(){
  // var calendar = $('#calendar').fullCalendar({


// })

// }


