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
    expandRows: true,
    allDayText: '終日',
    events:'/posts.json',

    // Handle the event click
    eventClick: function(arg) {
      var eventUrl = '/posts/' + arg.event.id;
      window.location.href = eventUrl;
    },
    eventColor: function(arg) {
      var eventColor = arg.event.color;
      return eventColor;
    },
    eventDidMount: function(arg) {
      var startTime = arg.event.start;
      var endTime = arg.event.end;
      var deadline = arg.event.deadline;
      // startTime から endTime までの全体の期間
      var totalTime = endTime - startTime;
      var oikomi = endTime - deadline;
      var deadlinePercentage = oikomi / totalTime * 100; // パーセンテージに変換

      var style = 'position: absolute; ' +
      'content: ""; ' +
      'top: 0; ' +
      'right: 0; ' +
      'bottom: 0; ' +
      'width: ' + deadlinePercentage + '%; ' +
      'background-color: red; ' +
      'z-index: 1;';

      // fc-event-main 要素にスタイルを追加
      arg.el.querySelector('.fc-event-main').insertAdjacentHTML('beforeend', '<div style="' + style + '"></div>');
    },
  });

  calendar.render();
});
