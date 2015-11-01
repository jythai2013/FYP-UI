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
      },
          defaultView: 'agendaWeek',
          events: [
            {
                title  : 'Workplace Literacy and Numeracy Fundamentals',
                start  : '2015-10-19T09:00:00',
                end    : '2015-10-19T12:00:00',
                allDay : false
            },
            {
                title  : 'Workplace Health and Safety',
                start  : '2015-10-19T13:00:00',
                end    : '2015-10-19T17:00:00',
                allDay : false 
            },
            {
                title  : 'Strategic Business Planning for Training Organizations (SBPTO)',
                start  : '2015-10-19T13:00:00',
                end    : '2015-10-19T17:00:00',
                allDay : false
            },
            {
                title  : 'Workplace Trainer Programme ',
                start  : '2015-10-20T09:00:00',
                end    : '2015-10-20T12:00:00',
                allDay : false 
            },            
            {
                title  : 'Managing Operations in Training Organisations',
                start  : '2015-10-20T09:00:00',
                end    : '2015-10-20T12:00:00',
                allDay : false 
            },
            {
                title  : 'Strategic Business Planning for Training Organizations ',
                start  : '2015-10-20T13:00:00',
                end    : '2015-10-20T17:00:00',
                allDay : false 
            },
            {
                title  : 'Develop an On-the-Job Training Programme ',
                start  : '2015-10-21T09:00:00',
                end    : '2015-10-21T12:00:00',
                allDay : false 
            },            
            {
                title  : 'Strategic Business Planning for Training Organizations ',
                start  : '2015-10-21T13:00:00',
                end    : '2015-10-21T17:00:00',
                allDay : false 
            },
            {
                title  : 'Workplace Health and Safety',
                start  : '2015-10-21T13:00:00',
                end    : '2015-10-21T17:00:00',
                allDay : false 
            },
            {
                title  : 'Workplace Trainer Programme',
                start  : '2015-10-22T09:00:00',
                end    : '2015-10-22T12:00:00',
                allDay : false 
            },
            {
                title  : 'Managing Operations in Training Organisations ',
                start  : '2015-10-22T09:00:00',
                end    : '2015-10-22T12:00:00',
                allDay : false 
            },
            {
                title  : 'Develop and Review Competency-based Assessment ',
                start  : '2015-10-22T13:00:00',
                end    : '2015-10-22T17:00:00',
                allDay : false 
            },
            {
                title  : 'WSQ Specialist Diploma in Advanced Facilitation ',
                start  : '2015-10-23T09:00:00',
                end    : '2015-10-23T12:00:00',
                allDay : false 
            },

            {
                title  : 'WSQ Specialist Diploma in Advanced Facilitation ',
                start  : '2015-10-23T13:00:00',
                end    : '2015-10-23T17:00:00',
                allDay : false 
            },

            {
                title  : 'Conduct a Training Needs Analysis ',
                start  : '2015-10-23T13:00:00',
                end    : '2015-10-23T17:00:00',
                allDay : false 
            },

            {
                title  : 'Branding for Professional Success in a Digital Age',
                start  : '2015-10-24T09:00:00',
                end    : '2015-10-24T12:00:00',
                allDay : false 
            },

          ]
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

Template.facilityManagement.helpers({
  options: function() {
      return {
        header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
          defaultView: 'agendaWeek',
          events: [
            {
                title  : 'Workplace Literacy and Numeracy Fundamentals',
                start  : '2015-10-19T09:00:00',
                end    : '2015-10-19T12:00:00',
                allDay : false
            },
            {
                title  : 'Workplace Health and Safety',
                start  : '2015-10-19T13:00:00',
                end    : '2015-10-19T17:00:00',
                allDay : false 
            },
            {
                title  : 'Strategic Business Planning for Training Organizations (SBPTO)',
                start  : '2015-10-19T13:00:00',
                end    : '2015-10-19T17:00:00',
                allDay : false
            },
            {
                title  : 'Workplace Trainer Programme ',
                start  : '2015-10-20T09:00:00',
                end    : '2015-10-20T12:00:00',
                allDay : false 
            },            
            {
                title  : 'Managing Operations in Training Organisations',
                start  : '2015-10-20T09:00:00',
                end    : '2015-10-20T12:00:00',
                allDay : false 
            },
            {
                title  : 'Strategic Business Planning for Training Organizations ',
                start  : '2015-10-20T13:00:00',
                end    : '2015-10-20T17:00:00',
                allDay : false 
            },
            {
                title  : 'Develop an On-the-Job Training Programme ',
                start  : '2015-10-21T09:00:00',
                end    : '2015-10-21T12:00:00',
                allDay : false 
            },            
            {
                title  : 'Strategic Business Planning for Training Organizations ',
                start  : '2015-10-21T13:00:00',
                end    : '2015-10-21T17:00:00',
                allDay : false 
            },
            {
                title  : 'Workplace Health and Safety',
                start  : '2015-10-21T13:00:00',
                end    : '2015-10-21T17:00:00',
                allDay : false 
            },
            {
                title  : 'Workplace Trainer Programme',
                start  : '2015-10-22T09:00:00',
                end    : '2015-10-22T12:00:00',
                allDay : false 
            },
            {
                title  : 'Managing Operations in Training Organisations ',
                start  : '2015-10-22T09:00:00',
                end    : '2015-10-22T12:00:00',
                allDay : false 
            },
            {
                title  : 'Develop and Review Competency-based Assessment ',
                start  : '2015-10-22T13:00:00',
                end    : '2015-10-22T17:00:00',
                allDay : false 
            },
            {
                title  : 'WSQ Specialist Diploma in Advanced Facilitation ',
                start  : '2015-10-23T09:00:00',
                end    : '2015-10-23T12:00:00',
                allDay : false 
            },

            {
                title  : 'WSQ Specialist Diploma in Advanced Facilitation ',
                start  : '2015-10-23T13:00:00',
                end    : '2015-10-23T17:00:00',
                allDay : false 
            },

            {
                title  : 'Conduct a Training Needs Analysis ',
                start  : '2015-10-23T13:00:00',
                end    : '2015-10-23T17:00:00',
                allDay : false 
            },

            {
                title  : 'Branding for Professional Success in a Digital Age',
                start  : '2015-10-24T09:00:00',
                end    : '2015-10-24T12:00:00',
                allDay : false 
            },

          ]
      };
  }
});


