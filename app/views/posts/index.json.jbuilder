json.array!(@events) do |event|
  json.id event.id
  json.title event.title
  json.color event.color
  json.start event.start_time
  json.end event.end_time
  json.deadline event.deadline
end