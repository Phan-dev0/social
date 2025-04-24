const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) =>{
    const {username, email, password} = req.body;

    try{
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });
        
        // save user and return res
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        return res.status(500).json(err);
    }

});

//Login
router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    
    try{
        // find user
        const user = await User.findOne({email: email});
        !user && res.status(404).json("user not found!"); 
        
        // check password
        const validPassword = await bcrypt.compare(password, user.password);
        !validPassword && res.status(400).json("wrong password");

        res.status(200).json(user);
    }catch(err){
        return res.status(500).json(err);
    }

});



module.exports = router;
