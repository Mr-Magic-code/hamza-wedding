export type EventItem = {
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
};

export const wedding = {
  couple: {
    bride: {
      firstName: "ABC",
      fullName: "ABC",
      parents: "Daughter of Mr. & Mrs. Riyaz",
    },
    groom: {
      firstName: "Hamza",
      fullName: "Muhammad Hamza Amin",
      parents: "Son of Mr. & Mrs. Amin",
    },
    hashtag: "#Aminfamily",
  },
  dateISO: "2027-03-21T19:00:00+05:00",
  displayDate: "Sunday, 21 March 2027",
  displayTime: "7:00 PM onwards",
  venue: {
    name: "POF Welfare Marriage Hall",
    address: "Wah Cantt, Pakistan",
    mapUrl: "https://share.google/iBEIaSdQj3XoN9f3J",
  },
  inviteLine: "Together with their families",
  quote:
    "And of all the places I could be, I just want to be here with you.",
  
  events: [
    {
      name: "Walima",
      date: "21 March 2027",
      time: "7:00 PM",
      venue: "POF Welfare Marriage Hall",
      address: "Wah Cantt, Pakistan",
    },
  ] as EventItem[],
  guests: [
    "Muhammad Yasin",
    "Muhammad Adeel",
    "Muhammad Mustafa",
    "Irfan Ul Haq",
    "Abdul Qadeer",
    "Zain",
    "Subhan",
  ],
  music: {
    src: "",
    title: "Festive Celebration",
  },
  theme: "ivory-gold",
};

export type Wedding = typeof wedding;
