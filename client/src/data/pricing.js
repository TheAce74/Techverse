const tickets = [
  {
    type: "Gold",
    price: 5000,
    iconFill: "accent-400",
    buttonColor: "secondary",
    content: [
      {
        id: 1,
        text: "Full access to all sessions, workshops, and networking events.",
      },
      {
        id: 2,
        text: "Priority seating and VIP perks.",
      },
      {
        id: 3,
        text: "Exclusive access to speakers Branded souvenirs.",
      },
    ],
    id: 1,
  },
  {
    type: "Silver",
    price: 3000,
    iconFill: "neutral-200",
    buttonColor: "accent",
    content: [
      {
        id: 1,
        text: "Access to limited sessions, workshops, and networking events.",
      },
      {
        id: 2,
        text: "Preferred seating positions.",
      },
      {
        id: 3,
        text: "Join post-conference event Branded notebooks.",
      },
    ],
    id: 2,
  },
  {
    type: "Bronze",
    price: 1000,
    iconFill: "accent-500",
    buttonColor: "primary",
    content: [
      {
        id: 1,
        text: "Access to keynote and panel sessions.",
      },
      {
        id: 2,
        text: "Networking opportunities.",
      },
      {
        id: 3,
        text: "Access to panel sessions.",
      },
    ],
    id: 3,
  },
];

export { tickets };
