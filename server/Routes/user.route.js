const express = require("express")
const userRouter = express.Router();
const UserModel = require("../Models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// Register
userRouter.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        bcrypt.hash(password, 4, async function (err, hash) {
            if (err) {
                return res.status(500).json({ message: "Error while hashing the password" });
            }

            const user = new UserModel({
                name,
                email,
                password: hash, // Use the hash here
                role
            });

            try {
                await user.save();
                res.status(201).json({ message: "User registered successfully" });
            } catch (error) {
                res.status(400).json({ message: `Error while registering the user: ${error.message}` });
            }
        });
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
});

// Login
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(303).json({message:`User not found`})
        }
        if(user){
            bcrypt.compare(password,user.password,async function(err,result){
                if(err){
                    return res.status(505).json({message:"Internal server Error"})
                }
                if(result){
                    const token =  jwt.sign({id:user._id},process.env.tokenKey)
                    res.status(201).json({message:"User logged in successfully",token})
                }
            })
        }
        
    } catch (error) {
        res.status(404).json({message:`Error while login in ${error}`})
    }
})


module.exports  = userRouter;