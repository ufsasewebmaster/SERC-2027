export type ScheduleActivity = {
  title: string;
  start: string;
  end: string;
  category:
    "registration" | "ceremony" | "workshop" | "activity" | "meal" | "career";
};

export type ScheduleBlock = {
  title?: string;
  activities: ScheduleActivity[];
};

export const scheduleLocation =
  "Reitz Union · University of Florida · Gainesville, FL";

export const schedule: ScheduleBlock[] = [
  {
    activities: [
      {
        title: "Registration",
        start: "08:00",
        end: "09:00",
        category: "registration",
      },
    ],
  },
  {
    activities: [
      {
        title: "Opening Ceremony",
        start: "09:00",
        end: "09:50",
        category: "ceremony",
      },
    ],
  },
  {
    activities: [
      {
        title: "Workshop Block 1",
        start: "10:00",
        end: "10:40",
        category: "workshop",
      },
    ],
  },
  {
    activities: [
      {
        title: "Activity Block 1",
        start: "10:50",
        end: "11:50",
        category: "activity",
      },
    ],
  },
  {
    activities: [
      {
        title: "Workshop Block 2",
        start: "12:00",
        end: "12:40",
        category: "workshop",
      },
    ],
  },
  {
    title: "Lunch & Activities",
    activities: [
      { title: "Lunch", start: "12:50", end: "14:50", category: "meal" },
      {
        title: "Activity Block 2",
        start: "13:20",
        end: "14:50",
        category: "activity",
      },
    ],
  },
  {
    activities: [
      {
        title: "Workshop Block 3",
        start: "15:00",
        end: "15:40",
        category: "workshop",
      },
    ],
  },
  {
    activities: [
      {
        title: "Closing Ceremony",
        start: "15:50",
        end: "16:50",
        category: "ceremony",
      },
    ],
  },
  {
    activities: [
      {
        title: "Career Fair",
        start: "17:00",
        end: "20:00",
        category: "career",
      },
    ],
  },
];
