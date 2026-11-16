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
      firstName: "D/O Safdar Razzaq",
      fullName: "D/O Safdar Razzaq",
      parents: "Daughter of Mr. & Mrs. Safdar Razzaq",
    },
    groom: {
      firstName: "Aqib Riaz",
      fullName: "Aqib Riaz",
      parents: "Son of Mr. & Mrs. Riaz",
    },
    hashtag: "#RiazFamily",
  },
  dateISO: "2026-12-27T13:00:00+05:00",
  displayDate: "Sunday, 27 December 2026",
  displayTime: "1:00 PM onwards",
  venue: {
    name: "AL MAKKA BANGQUET HALL",
    address: "Khayban E Sir Syed, IJP Road, Rawalpindi, Pakistan",
    mapUrl: "https://maps.app.goo.gl/AN7mfAuSxszK22yx9",
  },
  inviteLine: "Together with their families",
  quote:
    "And of all the places I could be, I just want to be here with you.",
  
  events: [
    {
      name: "Walima",
      date: "27 December 2026",
      time: "1:00 PM",
      venue: "AL MAKKA BANGQUET HALL",
      address: "Khayban E Sir Syed, IJP Road, Rawalpindi",
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
