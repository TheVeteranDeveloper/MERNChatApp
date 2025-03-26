// auto seed the DB with some users
import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

// random male and female users to be seeded to DB
const seedUsers = [
  // Female Users
  {
    email: "joe.scott@example.com",
    userName: "js123",
    fullName: "Joe Scott",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    userName: "om123",
    fullName: "Olivia Miller",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "sophia.davis@example.com",
    userName: "sd123",
    fullName: "Sophia Davis",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "ava.wilson@example.com",
    userName: "aw123",
    fullName: "Ava Wilson",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "isabella.brown@example.com",
    userName: "ib123",
    fullName: "Isabella Brown",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "mia.johnson@example.com",
    userName: "mj123",
    fullName: "Mia Johnson",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "charlotte.williams@example.com",
    userName: "cw123",
    fullName: "Charlotte Williams",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "amelia.garcia@example.com",
    userName: "ag123",
    fullName: "Amelia Garcia",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    userName: "ja123",
    fullName: "James Anderson",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "william.clark@example.com",
    userName: "wc123",
    fullName: "William Clark",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "benjamin.taylor@example.com",
    userName: "bt123",
    fullName: "Benjamin Taylor",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "lucas.moore@example.com",
    userName: "lm123",
    fullName: "Lucas Moore",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "henry.jackson@example.com",
    userName: "hj123",
    fullName: "Henry Jackson",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "alexander.martin@example.com",
    userName: "am123",
    fullName: "Alexander Martin",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "daniel.rodriguez@example.com",
    userName: "dr123",
    fullName: "Daniel Rodriguez",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
