// const mongoose = require("mongoose")
// const Document = require("./Document")
// // mongoose.connect("mongodb://0.0.0.0/googleDocsClone").then(()=>console.log("Running"))
// mongoose.connect("mongodb://127.0.0.1:27017/googleDocsClone").then(()=>console.log("Running"))

// const io = require("socket.io")(3000, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// })

// const defaultValue = ""

// io.on("connection", socket => {
//   socket.on("get-document", async documentId => {
//     const document = await findOrCreateDocument(documentId)
//     socket.join(documentId)
//     socket.emit("load-document", document.data)

//     socket.on("send-changes", delta => {
//       socket.broadcast.to(documentId).emit("receive-changes", delta)
//     })

//     socket.on("save-document", async data => {
//       await Document.findByIdAndUpdate(documentId, { data })
//     })
//   })
// })

// async function findOrCreateDocument(id) {
//   if (id == null) return

//   const document = await Document.findById(id)
//   if (document) return document
//   return await Document.create({ _id: id, data: defaultValue })
// }