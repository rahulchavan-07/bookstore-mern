const router = require("express").Router();
const User = require("../models/user")
const {authenticateToken}=require("./userAuth");

// add book to favourite :

router.put("/add-book-to-favourite",authenticateToken,async(req,res)=>{

    try {

        const {bookid,id}=req.headers;
        const userData = await User.findById(id);

        const isBookFavourite = userData.favourites.includes(bookid);

        if(isBookFavourite) {
            return res.status(200).json({message:"book is already in favourite"})
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}})

        return res.status(200).json({message:"book added to favourite"})

    } catch (error) {
        res.status(500).json({message:"Internal Server error"})
    }
})

// delete from favourite :

router.delete("/delete-book-from-favourite",authenticateToken,async(req,res)=>{

    try {

        const {bookid,id}=req.headers;
        const userData = await User.findById(id);

        const isBookFavourite = userData.favourites.includes(bookid);

        if(isBookFavourite) {

            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}})
        }
       
        return res.status(200).json({message:"book removed from favourite"})

    } catch (error) {
        res.status(500).json({message:"Internal Server error"})
    }
})

// get favourite book of particular user :

router.get("/get-favourite-books",authenticateToken,async(req,res)=>{

    try {
        
        const {id} = req.headers;

        const userData = await User.findById(id).populate("favourites")

        const favouritebooks = userData.favourites;

        return res.json({
            status:"success",
            data:favouritebooks,
        });


    } catch (error) {
        res.status(500).json({message:"Internal Server error"})
    }
})

module.exports=router;