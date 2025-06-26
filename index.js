const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js")
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
};

// INDEX ROUTE

app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", { chats })
});

// NEW ROUTE

app.get("/chats/new", (req, res) => {
    res.render("new.ejs")
});

// CREATE ROUTE

app.post("/chats", (req, res) => {
    let { from, to, message } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        message: message,
        created_at: new Date()
    });

    newChat
        .save()
        .then((result) => {
            console.log("chat was saved");
            console.log(result); 
        })
        .catch((err) => {
            console.log(err); 
        });
    res.redirect("/chats");
});

//NEW - SHOW ROUTE

app.get("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { chat } = await Chat.findById(id);
    if (!chat) {
        throw new ExpressError(404, "Chat not found!")
    }
    res.render("edit.ejs", { chat })
})

// EDIT ROUTE

app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

//UPDATE ROUTE

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { message: newMessage } = req.body;
    console.log(newMessage);
    
    let updatedChat = await Chat.findByIdAndUpdate(id, { message: newMessage }, { runValidators: true, new: true });
    console.log(updatedChat);
    
    res.redirect("/chats");
});

//DESTROY ROUTE

app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
}); 

app.get("/", (req, res) => {
    res.send("root is working")
});

// Error handling middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Some Error Occurred" } = err;
    res.status(status).send(message);
});

app.listen(8080, () => {
    console.log("listening to port on port 8080");
    
});