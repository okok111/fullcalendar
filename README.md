# メモ
- fullcalendarの実装
- 徒然なるままに書きます悪しからず
- jqueryを使わずに実装しました

## 理想はこんな感じ
https://fullcalendar.io/demos

## 導入
`yarn add @fullcalendar/core @fullcalendar/interaction @fullcalendar/daygrid @fullcalendar/timegrid`

## 追記・編集部分

- カラムは予定開始のカラムとしてstart_time、予定終了のカラムとしてend_time、予定表示用のカラムとしてtitleを用意

### app\javascript\packs\application.js
```javascript
import 'calendar'
```
### app\javascript\calendar.js （作成）
```javascript
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

```
### app\controllers\posts_controller.rb
```ruby
def index
    @posts = Post.all #投稿表示用（今回は使っていない）
    @events = Post.all #カレンダー表示用（一応分けておく方が良き）
end
```
### app\views\posts\index.html.erb

```ruby
<div id='calendar'></div>
```
### app\views\posts\index.json.jbuilder （作成）

```
json.array!(@events) do |event|
  json.id event.id
  json.title event.title
  json.start event.start_time
  json.end event.end_time
end
```