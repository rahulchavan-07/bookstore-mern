const router = require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt  =require("jsonwebtoken")
const {authenticateToken} =require("./userAuth")

//sign up :

router.post("/sign-up",async(req,res)=>{

    try {
        const {username,email,password,address,role}=req.body;

        //check username length is more than four :

        if(username.length<4) {
            return res.status(400).json({message:"Username length should be greater than 3"})
        }
        //check username is already exists or not :

        const existingUsername = await User.findOne({username:username});

        if(existingUsername) {
            return res.status(400).json({message:"Username already exists"})
        }
        // check email already exists : 

        const existingEmail = await User.findOne({email:email});

        if(existingEmail) {
            return res.status(400).json({message:"email already exists"})
        }
        // check password length :

        if(password.length <=5) {
            return res.status(400).json("Password length should be greater than 5")
        }
        // bcrypt password for security :
        
        const hashpass = await bcrypt.hash(password,10)

        const newuser = new User({
            username,
            email,
            password: hashpass,
            address,
            role: role || "user"
          });
      

        await newuser.save();

        return res.status(200).json({message:"SignUp Successfull"})
        
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

// sign in :

router.post("/sign-in",async(req,res)=>{

    try {

        const {username,password} =  req.body;

         // check for user is exist or not
        
        const existingUser= await User.findOne({username});

        if(!existingUser) {
            res.status(400).json({message:"Invalid credentials"})
        }

        await bcrypt.compare(password,existingUser.password,(err,data)=>{

            if(data) {

                const authClaims=[
                    {name:existingUser.username},
                    {role:existingUser.role},
                ]
                const token = jwt.sign({authClaims},"bookStore123",{expiresIn:"30d"})

                res.status(200).json({id:existingUser._id,role:existingUser.role,token:token})
            }
            else {
                res.status(400).json({message:"Invalid creaditials"})
            }
        }) 
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

// get user information :

router.get("/get-user-info",authenticateToken,async(req,res)=>{

    try{
        const {id}=req.headers;
        const data=await User.findById(id).select("-password");
        return res.status(200).json(data);
    }
    catch(error) {
        res.status(500).json({message:"Internal sever error"})
    }
});

//update address :

router.put("/update-address",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const {address} =req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"address updated succesfully"});
    }
    catch(error) {
        res.status(500).json({message:"internal server error"})
    }
})

module.exports=router;