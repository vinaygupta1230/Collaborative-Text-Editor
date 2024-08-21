const mongoose = require('mongoose');
const User = require('./models/User');
const Document = require('./models/Document');

// Replace 'your_database_url' with your actual MongoDB connection string
mongoose.connect('your_database_url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Example usage:

async function createUser() {
  const user = new User({
    username: 'john_doe',
    email: 'john@example.com',
    passwordHash: 'hashed_password_here'
  });

  await user.save();
  console.log('User created:', user);
}

async function createDocument(userId) {
  const document = new Document({
    title: 'My First Document',
    content: 'This is the content of the document.',
    ownerId: userId
  });

  await document.save();
  console.log('Document created:', document);
}

async function shareDocument(documentId, userId) {
  const document = await Document.findById(documentId);
  document.sharedWith.push(userId);
  await document.save();
  console.log('Document shared with user:', userId);
}

// Usage example:
createUser().then(user => {
  createDocument(user._id).then(document => {
    shareDocument(document._id, user._id);
  });
});





















/////////////////////////////////


// dashboard backend

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Document = require('./models/Document');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace 'your_database_url' with your actual MongoDB connection string
mongoose.connect('your_database_url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get all documents for a user
app.get('/user/:userId/documents', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId).populate('documents').populate('sharedDocuments');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const createdDocuments = user.documents;
    const sharedDocuments = user.sharedDocuments;

    res.json({ createdDocuments, sharedDocuments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// frontend

    async function fetchDocuments(userId) {
      try {
        const response = await fetch(`/user/${userId}/documents`);
        const data = await response.json();

        displayDocuments(data.createdDocuments, data.sharedDocuments);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    }

    function displayDocuments(createdDocuments, sharedDocuments) {
      const createdDocsContainer = document.getElementById('created-documents');
      const sharedDocsContainer = document.getElementById('shared-documents');

      createdDocuments.forEach(doc => {
        const docElement = document.createElement('div');
        docElement.innerHTML = `<h3>${doc.title}</h3><p>${doc.content}</p>`;
        createdDocsContainer.appendChild(docElement);
      });

      sharedDocuments.forEach(doc => {
        const docElement = document.createElement('div');
        docElement.innerHTML = `<h3>${doc.title}</h3><p>${doc.content}</p>`;
        sharedDocsContainer.appendChild(docElement);
      });
    }

    // Example usage: Replace 'your_user_id' with the actual user ID
    document.addEventListener('DOMContentLoaded', () => {
      fetchDocuments('your_user_id');
    });




////////////////////////////////////////////


