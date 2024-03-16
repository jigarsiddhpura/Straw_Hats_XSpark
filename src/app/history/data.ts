import React from "react";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "CLASS", uid: "class" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Engagement", uid: "engagement" },
  { name: "Excitement", uid: "excitement" },
  { name: "Boredom", uid: "boredom" },
  { name: "Confused", uid: "confused" },
  { name: "Frustrated", uid: "frustrated" },
  { name: "Fearful", uid: "fearful" },
];

const users = [
  {
    id: 1,
    name: "Aman Nambisan",
    class: "Math",
    status: "engagement",
    Lecture: 1,
    age: "29",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKf4OFSZ0LEnFJqY4rzJ7N2TUIPGjxNZY1PpQ5K9XdJ=s476-c-no",
    email: "aman2003nambisan@gmail.com",
  },
  {
    id: 2,
    name: "Jigar Siddhapuria",
    role: "Tech Lead",
    Lecture: 1,
    class: "Math",
    status: "excitement",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "jsiddhpura2812@gmail.com",
  },
  {
    id: 3,
    name: "Hemant Singh",
    role: "Sr. Dev",
    class: "Math",
    Lecture: 1,
    status: "boredom",
    age: "22",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJA6zlbgtAeseRioXQNn-bBBMTT2wC3EC8ZlDW9Jv_llw=s360-c-no",
    email: "hphemant373@gmail.com",
  },
  {
    id: 4,
    name: "Varun Vishwanath",
    role: "Designer",
    class: "Math",
    Lecture: 1,
    status: "boredom",
    age: "27",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKAcTvDScKPnj4wY3tWBFYuKtoJN-hWKk1nTHbyyqOj-cI=s96-c",
    email: "varunvis2903@gmail.com",
  },
  {
    id: 5,
    name: "Aman Nambisan",
    role: "C.M.",
    Lecture: 2,
    class: "Biology",
    status: "confused",
    age: "28",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKf4OFSZ0LEnFJqY4rzJ7N2TUIPGjxNZY1PpQ5K9XdJ=s476-c-no",
    email: "aman2003nambisan@gmail.com",
  },

  {
    id: 6,
    name: "Jigar Siddhapuria",
    role: "S. Manager",
    class: "Biology",
    Lecture: 2,
    status: "frustrated",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "jsiddhpura2812@gmail.com",
  },
  {
    id: 7,
    name: "Hemant Singh",
    role: "P. Manager",
    class: "Biology",
    Lecture: 2,
    age: "29",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJA6zlbgtAeseRioXQNn-bBBMTT2wC3EC8ZlDW9Jv_llw=s360-c-no",
    email: "hphemant373@gmail.com",
    status: "Active",
  },

  {
    id: 8,
    name: "Varun Vishwanath",
    role: "HR Manager",
    class: "Biology",
    Lecture: 2,
    status: "active",
    age: "31",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKAcTvDScKPnj4wY3tWBFYuKtoJN-hWKk1nTHbyyqOj-cI=s96-c",
    email: "varunvis2903@gmail.com",
  },
];

export { columns, users, statusOptions };
