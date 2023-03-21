let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

let act1Time = new Date("2023-04-22T19:00:00");
let act1Str = act1Time.toISOString();

let act2Time = new Date("2023-04-09T09:00:00+08:00");
let act2Str = act2Time.toISOString();

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "金門音樂季",
    start: "2023-03-01 20:00:00",
    end: "2023-03-05 20:00:00",
    color: "grey",
  },
  {
    id: createEventId(),
    title: "台秋祭 (Tai Chill City)",
    start: "2023-03-10 17:00:00",
    end: "2023-03-13 20:00:00",
    color: "grey",
  },
  {
    id: createEventId(),
    title: "台北微遠虎山",
    start: "2023-03-15 13:00:00",
    end: "2023-03-19 17:00:00",
    color: "grey",
  },
  {
    id: createEventId(),
    title: "『Let’s Depart ！給世界最悠長的吻』",
    start: "2023-03-28 19:30:00",
    end: "2023-03-29 17:30:00",
    color: "green",
  },
  {
    id: createEventId(),
    title: "告五人第一次新世界巡迴演唱會",
    start: "2023-03-30 19:30:00",
    end: "2023-03-31 19:30:00",
    color: "green",
  },
  {
    id: createEventId(),
    title: "aMEI ASMR 世界巡迴演唱會",
    start: "2023-03-31 20:00:00",
    end: "2023-04-01 19:30:00",
    color: "green",
  },
  {
    id: createEventId(),
    title: "大港開唱 Megaport Festival",
    start: "2023-04-02 12:00:00",
    end: "2023-04-03 20:00:00",
    color: "green",
  },
  {
    id: createEventId(),
    title: "五月天2023 諾亞方舟放大版演唱會",
    start: "2023-04-06 12:00:00",
    end: "2023-04-08 12:00:00",
    color: "green",
  },
  {
    id: createEventId(),
    title: "TOMORROW X TOGETHER",
    start: "2023-04-15 12:00:00",
    end: "2023-04-17 12:00:00",
    color: "green",
  },
  {
    id: createEventId(),
    title: "白藝潾2023台北演唱會",
    start: "2023-04-23 12:00:00",
    end: "2023-04-24 18:00:00",
    color: "green",
  },
  {
    id: createEventId(),
    title: "蕭秉治巡迴演唱會",
    start: "2023-04-27 12:00:00",
    end: "2023-04-28 12:00:00",
    color: "green",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
