//インストールしたファイルたちを呼び出します。
import { Calendar} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import monthGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

//<div id='calendar'></div>のidからオブジェクトを定義してカレンダーを作っていきます。
document.addEventListener('turbolinks:load', function() {
    var calendarEl = document.getElementById('calendar');

    //カレンダーの中身を設定(月表示とか、クリックアクション起こしたいとか、googleCalendar使うととか)
    var calendar = new Calendar(calendarEl, {
        plugins: [ monthGridPlugin, interactionPlugin ,timeGridPlugin ],


        //細かな表示設定
        locale: 'ja',
        timeZone: 'Asia/Tokyo',
        firstDay: 1,
        headerToolbar: {
          start: 'prev,next,today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay' 
        },
        expandRows: true,
        stickyHeaderDates: true,
        buttonText: {
          today: '今日'
        }, 
        allDayText: '終日',
        height: "auto",

        dateClick: function(info){
            //日付をクリックしたときのイベント
        },
        eventClick: function(info){
            //表示されたイベントをクリックしたときのイベント
        },
        eventClassNames: function(arg){
            //表示されたイベントにclassをcss用に追加する
        },
    });
    //カレンダー表示
    calendar.render();

});
