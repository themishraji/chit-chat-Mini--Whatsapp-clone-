const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


let allChats = [
    {
    from: "neha",
    to: "priya",
    msg: "send me your exam sheets",
    created_at: new Date(),

    },
    {
        from: "Rohit",
        to: "Mohit",
        msg: "teach me JS callbacks",
        created_at: new Date(),
    
    },
    {
        from: "amit",
        to: "sumit",
        msg: "All the best",
        created_at: new Date(),
    
    },
    {
        from: "sahil",
        to: "vinod",
        msg: "finially I placed ",
        created_at: new Date(),
    
    },   
];

Chat.insertMany(allChats)
  
