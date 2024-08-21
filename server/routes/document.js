import express from 'express';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import User from '../schema/user.js'
import cors from 'cors';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(cors());
router.use(express.json());


// Route to get all documents for a user
router.post('/:username', async (req, res) => {
    try {
      console.log('printing req');
      console.log(req.params);
      const username = req.params.username;
      console.log(username);
  
      // Find the user by ID
      // const user = await User.find({username : username}).populate('documents').populate('sharedDocuments');
      const user = await User.find({username : username}).populate('documents');
      console.log('printing user');
      console.log(user);
  
      if (!user) {
        console.log('user not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      const createdDocuments = user[0];
      // const sharedDocuments = user.sharedDocuments;

      console.log("request khatam");
      console.log(createdDocuments);
  
    //  res.json({ createdDocuments, sharedDocuments });
     res.json({ createdDocuments});
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
      console.log("gfgcvbhnj");
    }
  });


  export default router