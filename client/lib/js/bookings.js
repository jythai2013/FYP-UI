

Template.facilityManagement.rendered = function(){
  Tracker.autorun(function(){
    // Bookings.find();

    // var array = $.map(Bookings.find().collection._docs._map, function(value, index) {
    //    return [value];
    // });
    var array = Bookings.find();
    

    $('#fmCalendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        dayClick :function(date, allDay,jsEvent, view){
            $('#fmModal').modal('show');
            Session.set("currentDate",date);
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
Template.bookingFacilityForm.events({
  "change #facMgmtFormy" : function facilityManagementFormForMeteorOnChangeHandler(e){
    e.preventDefault();
    
    IfacType = document.getElementById("facType").value;
    Icapacity = document.getElementById("input_capacity_min").value;
    InumSessions = document.getElementById("facNumSessionSearch").value;
    var startDateTimeI = document.getElementById("input_time_beginning").value;
    var endinDateTimeI = document.getElementById("input_time_end").value;
    repeatOption = []
 
    var inputElements = document.getElementsByClassName('messageCheckbox');
    for(var i=0; inputElements[i]; ++i){
      if(inputElements[i].checked){
           repeatOption.push(parseInt(inputElements[i].value));
      }
    }

    var e = document.getElementById("courseId");
    var courseI = e.options[e.selectedIndex].value;
    
    startDateTime = new Date(moment(startDateTimeI,"DD/MM/YYYY hh:mm a").format());
    console.log(startDateTime);
    endinDateTime = new Date(moment(endinDateTimeI,"DD/MM/YYYY hh:mm a").format());
    
    // Session.set("facDaysSearch", IDays);
    Session.set("facTypeSearch", IfacType);
    Session.set("facCapacitySearch", Icapacity);
    Session.set("facNumSessionSearch", InumSessions);
    Session.set("facReapeatOptionSearch", repeatOption);
    Session.set("facStartDateTimeSearch", startDateTime);
    Session.set("facEndinDateTimeSearch", endinDateTime);
    Session.set("courseSearch", courseI);
  },

  "click #submitFmBooking" : function(e){
    e.preventDefault();
    // createBooking': function createBooking(bookingDateI, courseI, sessionNoI, startTimeI, endTimeI, facIdI){
    dates = getDatesFromRepeat();
    courseI = document.getElementById("courseId").value;
    sessionI = document.getElementById("groupId").value;
    dates.forEach(function(details){
      //comment on what this function do for later reference!!!
      start = new Date(moment(details.start,"DD/MM/YYYY hh:mm a").format())
      end = new Date(moment(details.end,"DD/MM/YYYY hh:mm a").format())
      Meteor.call("createBooking2", start, end, document.getElementById("fac").value, courseI, sessionI, function(err,value){
        if (!err){
          $('#fmModal').modal('hide');
        } else {
          alert(err);
        }
      });
    });
  },

  "click .deleteBooking" : function deleteBookingEventHandler(e) {
    console.log(this._id);
    Meteor.call("deleteBooking", this._id);
  }

});

// Template.facilityManagement.events({
  
// });


Template.facilityManagement.helpers({
  calOptions: function(){
    
    //converts the matchingFacilities.collection._docs._map into an array
    var array = $.map(Bookings.find().collection._docs._map, function(value, index) {
        return [value];
    });
    
    array.forEach(function(booking){
      oneCourse = Courses.findOne({courseCode:booking.course});
      if(oneCourse != undefined)
        courseName = oneCourse.courseName;
      else
        courseName = booking.course
      booking.title = courseName + "-" + booking.sessionNo;
    });
    
    return {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      events: array,
      eventMouseover: function(data, event, view) {
        alert();
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
    };
  }
});
  
Template.bookingFacilityForm.onRendered(function() {
  Tracker.autorun(function(){
      this.$('.datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY hh:mm a'
      });
      var currentDate = moment(Session.get('currentDate')).format('DD/MM/YYYY hh:mm a');
      // alert(currentDate);
      $('#input_time_beginning').val(currentDate);
      $('#input_time_end').val(currentDate);
      // Date selectedDate = Session.get("currentDate");

  });
});

Template.bookingFacilityForm.helpers({
  facilitySearchResult:function(){
    
    details = new Object();
    if (Session.get("facCapacitySearch")            != undefined) {details.capacity	= Session.get("facCapacitySearch"); }
    else{Session.set("facCapacitySearch", 0);}    
    if (Session.get("facStartDateTimeSearch")       != undefined) {details.start    = Session.get("facStartDateTimeSearch").value;}
    else{console.log("pls set date");}
    if (Session.get("facEndDateTimeSearch")       	!= undefined) {details.end    	= Session.get("facEndDateTimeSearch").value;}
    else{console.log("pls set start time");}
    if( Session.get("facTypeSearch") != undefined && Session.get("facTypeSearch").length > 0){
      ascapacity = parseInt(Session.get("facCapacitySearch"));
      typea = Session.get("facTypeSearch");
      console.log(ascapacity);
      console.log(typea);
      matchingFacilities = Facilities.find({"facType":typea, "capacity": {$gte : ascapacity}}).fetch();
      matchingFacilities = Facilities.find({"capacity": {$gte : ascapacity}}).fetch();
      if(isNaN(ascapacity)){matchingFacilities = Facilities.find({"facType":typea}).fetch();}
      console.log(matchingFacilities);
    } else{
      ascapacity = parseInt(Session.get("facCapacitySearch"));
      console.log(ascapacity);
      matchingFacilities = Facilities.find({"capacity": {$gte : ascapacity}}).fetch();
      if(isNaN(ascapacity)){matchingFacilities = Facilities.find({}).fetch();}
      console.log(matchingFacilities);
    }

    
    resultsF = new Array();
    console.log(resultsF);
    matchingFacilities.forEach(function(facility){
      console.log(facility);
      available = findIfFacilityIsAvailable(facility);
      // available = true;
      console.log(available);
      if(available){
        console.log(facility);
        resultsF.push(facility);
      } 
    });
    return resultsF;
  }
});

// facility, Iinput_date_beginning, Iinput_date_end, Iinput_time_beginning, Iinput_time_end, IrepeatOption
function findIfFacilityIsAvailable(facIdI) {
  dates = getDatesFromRepeat();
  var canBook = true;
  
  //check the whole repeat duration, if one session is not available then the repeat is invalid.
  dates.forEach(function(details){
    startDT = details.start; 
    endinDT = details.end;
    var available = isFacilityAvailableOnThistimeslot(facIdI, startDT, endinDT) | false;
    console.log(facIdI);
    console.log(available);
    if(!available){
      return false;
    }    
  });
  return canBook;
}


function isFacilityAvailableOnThistimeslot(facility, timeStart, timeEnd){
  // results = new Array();
  soFarSoGood = true;
  // |        |
  //    |   |
  existingBookings = Bookings.find({
                  "facId":facility._id,
                  "start":{$lte: timeStart },   
                  "end":{$gte: timeEnd }        
                }).fetch();
  if (existingBookings.length > 0){
    // already have a booking sometime in that time so make sure it does not get returned
    console.log("false");
    return false;
  }
  
  
  // |        |
  //    |       |
  existingBookings = Bookings.find({
                  "facId":facility._id,
                  "start":{$lte: timeStart }, 
                  "end":{$lte: timeEnd }        
                }).fetch();
  if (existingBookings.length > 0){
    // already have a booking sometime in that time so make sure it does not get returned
    console.log("false");
    return false;
  }
  
  
  //      |       |
  //    |   |
  existingBookings = Bookings.find({
                  "facId":facility._id,
                  "start":{$gte: timeStart },   
                  "end":{$gte: timeEnd }      
                }).fetch();
  if (existingBookings.length > 0){
    // already have a booking sometime in that time so make sure it does not get returned
    console.log("false");
    return false;
  }
  
  
  //      |       |
  //    |           |
  existingBookings = Bookings.find({
                  "facId":facility._id,
                  "start":{$gte: timeStart },   //      |       |
                  "end":{$lte: timeEnd }        //    |           |
                }).fetch();
  if (existingBookings.length > 0){
    // already have a booking sometime in that time so make sure it does not get returned
    console.log("false");
    return false;
  }
  console.log(soFarSoGood);
  return soFarSoGood;
}


// return an array of objects, each object having a start and end
function getDatesFromRepeat(){
  IDays = Session.get("facDaysSearch");
  IfacType = Session.get("facTypeSearch");
  Icapacity = Session.get("facCapacitySearch");
  InumSessions = Session.get("facNumSessionSearch");
  repeatOptions = Session.get("facReapeatOptionSearch");
  startDateTime = Session.get("facStartDateTimeSearch");
  endinDateTime = Session.get("facEndinDateTimeSearch");
  // console.log(this);
  // console.log(startDateTime);
  
  //for use in repeat calculations
  console.log("startDateTime is printing:");
  console.log(startDateTime);
  console.log("endDateTime is printing:");
  console.log(endinDateTime);

  var result = [];
	console.log(repeatOptions);
  if(repeatOptions === undefined || repeatOptions.length == 0){
    var timeslot = {};
    timeslot.start = startDateTime;
    timeslot.end = endinDateTime;
    result.push(timeslot);
  } else {
    var startTime = {
      hour: moment(startDateTime).hour(),
      minute: moment(startDateTime).minute()
    }

    var endTime = {
      hour: moment(endinDateTime).hour(),
      minute: moment(endinDateTime).minute()
    }
   
    currentStartDate = moment(startDateTime);
    currentEndDate = moment(endinDateTime);

    var dayDif = currentEndDate.diff(currentStartDate, 'days');

    var dayAdd = 0;
    var currentDate;

    while (dayAdd < dayDif) {
      if (result.length >= InumSessions) {
        break;
      }
      currentDate = moment(currentStartDate).add(dayAdd, "day");

      currentDateISO = currentDate.isoWeekday();
      if(repeatOptions.indexOf(currentDateISO) > -1) {
        var timeslot = {};
        timeslot.start = moment(currentDate).hour(startTime.hour).minute(startTime.minute);
        timeslot.end = moment(currentDate).hour(endTime.hour).minute(endTime.minute);     
        result.push(timeslot);
      }
      dayAdd += 1;

    } 
  }
	return result;
}


Template.bookingFacilityForm.helpers({
  courseSearchResult:function(){
    return course = Courses.find({}).fetch();
  }
});

Template.bookingFacilityForm.helpers({
  groupSearchResult:function(){
    var search = Session.get("courseSearch");
    return groups = Groups.find({courseCode: search}).fetch();
  }
});