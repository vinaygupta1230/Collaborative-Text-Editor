import express from 'express'
import cors from 'cors';
import mongoose from "mongoose";
import { Server } from "socket.io";
import User from './schema/user.js';
import Document from './schema/document.js';
// import bcrypt from bcrypt;
// import jwt from jsonwebtoken;
import authRoutes from'./routes/auth.js';
import documentRoutes from './routes/document.js';

const app = express()
const port = 3000;

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

mongoose.connect("mongodb+srv://vinaygupta1281:textEditorProject@cluster0.e8fkvzj.mongodb.net/textEditorData").then(()=>console.log("MongoDb is Running"))
// mongoose.connect("mongodb://127.0.0.1:27017/googleDocsClone").then(()=>console.log("MongoDb is Running"))


const server = app.listen(`${port}`, ()=>{
  console.log(`Server is running on port ${port}`);
})


const io = new Server(server, {
// const io = new Server(`${port}`, {
// const io = new Server(`${port}`, {
  cors: {
    origin: 'http://localhost:5173/',
    methods: ["GET", "POST"],
  },
});

// const io = require("socket.io")(3000, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// })


const defaultValue = "";
let nameeee = 'poiu';



app.post("/loginnnn" ,(req , res)=>{
  console.log("yesattttt");
  console.log(req.body);
  nameeee = req.body.username;
  res.send({});
});
// console.log(nameeee);
// let nammme = nameeee;
// console.log(nammme);

io.on("connection", socket => {
  console.log("Socket connected");
  console.log(nameeee);
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return
  let document = await Document.findById(id);
  if (!document) {
    document = await Document.create({ _id:id, docId: id, data: defaultValue, username: nameeee});
    const saveuser = await User.updateOne(
      { username: nameeee }, // Filter
        { $push: { documents: id } } // Update
    );
    console.log("Document updated successfully");
  }
  return document;
}





// app.post('/login', async (req, res) => {
// //   res.send('Hello World')
//     // let logincred = req.body;
//     // console.log(logincred);
//     // console.log(req.body);
//     // const { email, password } = req.body;
//     // console.log("Hiii");
//     // console.log('Received email:', email);
//     // console.log('Received password:', password);
//     // res.send([{email: 'vinay', password: 'gupta'}, {email: 'vishal', password: 'kh'}, {email: 'vinnu', password: 'sharma'}, {email: 'meri', password: 'girlfriend'}])
//     // // console.log(connectDB);


//     try {
//       const { email, password } = req.body;
  
//       // Find the user by email
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid email or password' });
//       }
  
//       // Compare the password
//       user.comparePassword(password, (err, isMatch) => {
//         if (err) return res.status(500).json({ message: 'Server error', err });
//         if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
  
//         // Create a JWT token
//         const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
  
//         res.json({ token });
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
    
// })


// app.post('/signup', async function (req, res) {
//   console.log('saving data on registration');
//   try {
//     const { username, password, email, name } = req.body;
//     const user = new User({ username, password, email, name });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error('Error registering user:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// })

// app.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash the password
//     const passwordHash = await bcrypt.hash(password, 10);

//     // Create a new user
//     const user = new User({ username, email, passwordHash });
//     await user.save();

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });


// app.get('/dashboard', function (req, res) {
//   res.send('Hello World')
// })

app.use('/auth', authRoutes);
app.use('/document', documentRoutes);

// app.get('/user/:userId/documents', async (req, res) => {
// app.get('/:username/dashboard', async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Find the user by ID
//     const user = await User.findById(userId).populate('documents').populate('sharedDocuments');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const createdDocuments = user.documents;
//     const sharedDocuments = user.sharedDocuments;

//     res.json({ createdDocuments, sharedDocuments });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });




// // GET route to retrieve a document by its ID
// app.get('/:username/documents/:documentId', async (req, res) => {
//   const documentId = req.params.documentId;
//   try {
//     const document = await Document.findById(documentId);
//     if (!document) {
//       return res.status(404).json({ error: 'Document not found' });
//     }
//     res.json(document);
//   } catch (error) {
//     console.error('Error retrieving document:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // POST route to create a new document
// app.post(':username/newdoc', async (req, res) => {
//   const defaultValue = "";
//   try {
//     const document = await Document.create({ data: defaultValue });
//     res.status(201).json(document);
//   } catch (error) {
//     console.error('Error creating document:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });





















///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



// import express from 'express';
// import cors from 'cors';
// import mongoose from "mongoose";
// import { Server } from "socket.io";

// import { User, Document }  from './schema.js';

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

// mongoose.connect("mongodb+srv://vinaygupta1281:textEditorProject@cluster0.e8fkvzj.mongodb.net/textEditorData")
//   .then(() => {
//     console.log("MongoDb is Running");
    
//     // Start the server after the database connection is established
//     const server = app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });

//     // Initialize Socket.IO with the same server instance
//     const io = new Server(server, {
//       cors: {
//         origin: `http://localhost:5173/documents`,
//         methods: ["GET", "POST"],
//       },
//     });

//     const defaultValue = "";

//     io.on("connection", socket => {
//       socket.on("get-document", async documentId => {
//         const document = await findOrCreateDocument(documentId);
//         socket.join(documentId);
//         socket.emit("load-document", document.data);

//         socket.on("send-changes", delta => {
//           socket.broadcast.to(documentId).emit("receive-changes", delta);
//         });

//         socket.on("save-document", async data => {
//           await Document.findByIdAndUpdate(documentId, { data });
//         });
//       });
//     });
//   })
//   .catch(err => {
//     console.error("Error connecting to MongoDB:", err);
//   });

// async function findOrCreateDocument(id) {
//   if (id == null) return;

//   const document = await Document.findById(id);
//   if (document) return document;
//   return await Document.create({ _id: id, data: defaultValue });
// }

// app.post('/api/login', function (req, res) {
//   console.log(req.body);
//   const { email, password } = req.body;
//   console.log("Received email:", email);
//   console.log("Received password:", password);
//   // You can implement authentication logic here
//   // Then send the appropriate response
//   res.send([{email: 'vinay', password: 'gupta'}, {email: 'vishal', password: 'kh'}, {email: 'vinnu', password: 'sharma'}, {email: 'meri', password: 'girlfriend'}]);
// });

// app.post('/signup', async function (req, res) {
//   console.log('saving data on registration');
//   try {
//     const { username, password, email, name } = req.body;
//     const user = new User({ username, password, email, name });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error('Error registering user:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/dashboard', function (req, res) {
//   res.send('Hello World');
// });

// app.get('//documents/:id', function (req, res) {
//   res.send('Hello World');
// });
