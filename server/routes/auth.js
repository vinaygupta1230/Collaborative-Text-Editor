import express from 'express';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import User from '../schema/user.js'


const router = express.Router();
const SECRET_KEY = 'appleisred';


router.post('/login', async (req, res) => {
    //   res.send('Hello World')
        // let logincred = req.body;
        // console.log(logincred);
        // console.log(req.body);
        // const { email, password } = req.body;
        // console.log("Hiii");
        // console.log('Received email:', email);
        // console.log('Received password:', password);
        // res.send([{email: 'vinay', password: 'gupta'}, {email: 'vishal', password: 'kh'}, {email: 'vinnu', password: 'sharma'}, {email: 'meri', password: 'girlfriend'}])
        // // console.log(connectDB);
    
    
    try {
        const { username, password } = req.body;
    
        // Find the user by email
        const user = await User.findOne({ username });
        if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
        }
    
        // Compare the password
        user.comparePassword(password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: 'Server error', err });
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
    
        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    
        res.json({ token, username });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
    
})



router.post('/signup', async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ name, username, email, passwordHash });
        await user.save();

        res.status(201).json({ message: 'User created successfully' , user:user } );
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


// module.exports = router;
export default router