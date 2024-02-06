const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

const allChats = [
  {
    from: "neha",
    to: "priya",
    msg: "send me your exam sheets",
    created_at: new Date(),
  },
  // Add other chat objects here
];

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/whatsapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server after the database connection is successful
    app.listen(8080, () => {
      console.log("Server is listening on port 8080");

      // Insert allChats into the database after the server starts
      insertChatsIntoDatabase();
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

async function insertChatsIntoDatabase() {
  // Insert allChats into the database
  await Chat.insertMany(allChats);
  console.log("Chats inserted into the database successfully");
}

// Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  // console.log(chats);
  res.render("index.ejs", { chats });
});

// New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create Route
app.post("/chats", async (req, res) => {
    let { from, to, msg } = req.body;
  const newChat = new Chat({
    from,
    to,
    msg,
    created_at: new Date(),
  });

  await newChat.save();
  console.log("New chat saved successfully:", newChat);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("Root is working");
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

//New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});



// Create Route
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
      from: from,
      to: to,
      msg: msg,
      created_at: new Date(),
     });
     newChat
     .save()
     .then((res) => {
      console.log("chat was saved");
    })
    .catch((err)  => {
      console.log(err)
    }); 

     res.redirect("/chats");
 });


 //Edit Route
 app.get("/chats/:id/edit", async (req, res) => {
     let {id} = req.params;
     let chat = await Chat.findById(id);
     res.render("edit.ejs", {chat});
 })


//Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  console.log(newMsg);
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
     {msg: newMsg},
     {runValidators: true, new: true }
    );

    console.log(updatedChat);
    res.redirect("/chats");
  });

  //Destroy Route
  app.delete("/chats/:id", async (req, res) => {
      let { id } = req.params;
      let deletedChat = await Chat.findByIdAndDelete(id);
      console.log(deletedChat);
      res.redirect("/chats");

  });

app.get("/", (req, res) => {
  res.send("Root is working");
});

let chat1 = new Chat({
  from: "neha",
  to: "priya",
  msg: "send me your exam sheets",
  created_at: new Date(),
});

chat1.save()
  .then((savedChat) => {
    console.log("Chat saved successfully:", savedChat);
  })
  .catch((error) => {
    console.error("Error saving chat:", error);
  });
