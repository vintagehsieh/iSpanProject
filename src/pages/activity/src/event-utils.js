let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

let act1Time = new Date("2023-04-22T19:00:00");
let act1Str = act1Time.toISOString();

let act2Time = new Date("2023-05-06T19:30:00");
let act2Str = act2Time.toISOString();

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "動力火車 都是因為愛 世界巡迴演唱會 台北安可場",
    start: act1Str,
  },
  {
    id: createEventId(),
    title: "『Let’s Depart ！給世界最悠長的吻』",
    start: act2Str,
  },
];

export function createEventId() {
  return String(eventGuid++);
}
