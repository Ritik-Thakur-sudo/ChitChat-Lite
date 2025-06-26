const mongoose = require("mongoose");
const Chat = require("./models/chat.js")

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
};

let allChats = [
    {
        from: "Gautam",
        to: "Deepak",
        message: "Send me 500 rupees",
        created_at: Date(),
    },
    {
        from: "Deepak",
        to: "Gautam",
        message: "This shirt is good or not?",
        created_at: Date()
    },
    {
        from: "Adam",
        to: "Eve",
        message: "All the best",
        created_at: Date()
    },
    {
        from: "Me",
        to: "You",
        message: "You fool",
        created_at: Date()
    },
    {
        from: "You",
        to: "Me",
        message: "No, me you fool!",
        created_at: Date()
    },
    {
        from: "Natuto",
        to: "Kakashi",
        message: "Sensei, teach me your moral of life!",
        created_at: Date()
    },
    {
        from: "Naruto",
        to: "All villagers",
        message: "I will become Hokage, Belive me!",
        created_at: Date()
    }
];

Chat.insertMany(allChats);