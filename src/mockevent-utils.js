let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    title: "All-day event",
    date: todayStr,
  },
  {
    title: "Timed event",
    start: todayStr + "T12:00:00",
  },
  {
    title: "All Day Event",
    start: "2023-03-08",
  },
  {
    title: "Long Event",
    start: "2023-03-08",
    end: "2023-03-10",
  },
  {
    groupId: 999,
    title: "Repeating Event",
    start: "2023-03-08T16:00:00",
  },
  {
    groupId: 999,
    title: "Repeating Event",
    start: "2023-03-10T16:00:00",
  },
  {
    title: "Conference",
    start: "2023-03-08",
    end: "2023-03-09",
  },
  {
    title: "Meeting",
    start: "2023-03-08T10:30:00",
    end: "2023-03-08T12:30:00",
  },
  {
    title: "Lunch",
    start: "2023-03-08T12:00:00",
  },
  {
    title: "Meeting",
    start: "2023-03-08T14:30:00",
  },
  {
    title: "Happy Hour",
    start: "2023-03-08T17:30:00",
  },
  {
    title: "Dinner",
    start: "2023-03-08T20:00:00",
  },
  {
    title: "Birthday Party",
    start: "2023-03-09T07:00:00",
  },
  {
    title: "Click for Google",
    url: "http://google.com/", // 클릭시 해당 url로 이동
    start: "2023-03-11",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
