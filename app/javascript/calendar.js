import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

document.addEventListener('turbolinks:load', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    locale: 'ja',
    timeZone: 'Asia/Tokyo',
    headerToolbar: {
      start: 'prev,next,today',
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    buttonText: {
      today: '今日'
    },
    events:'/posts.json',

    // Handle the event click
    eventClick: function(arg) {
      var eventUrl = '/posts/' + arg.event.id; // Assuming your event has an 'id' attribute
      window.location.href = eventUrl;
      info.el.style.borderColor = 'red';
    },
  });

  calendar.render();
});
