const router = require("express").Router();
const User = require("../models/user")
const jwt  =require("jsonwebtoken")
const Book = require("../models/book")
const {authenticateToken} =require("./userAuth");

// add book :

router.post("/add-book",authenticateToken,async(req,res)=>{

    try {

        const {id} = req.headers;
        const user = await User.findById(id);

        if(user.role !="admin") {
            return res.status(400).json({message:"You are not have access of admin role"})
        }
        const book = new Book({

            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        });

        await book.save();

        res.status(200).json({message:"book added successfully"})

    }
    catch(error) {
        res.status(500).json({message:"internal server error"})
    }
})

// update book

router.put("/update-book",authenticateToken,async (req,res)=> {

    try {

        const {bookid} = req.headers;

        await Book.findByIdAndUpdate(bookid , {

            utl:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language
        });
        
        return res.status(200).json({
            message:"Book Updated Successfulyy",
        })
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

// delete book :

router.delete("/delete-book",authenticateToken,async(req,res)=>{
    try {

        const {bookid}=req.headers;

        await Book.findByIdAndDelete(bookid);

        return res.status(200).json({
            message:"Book deleted successfully"
        });
        
    } catch (error) {
        res.status.json({message:"Internal server error"})
    }
})

//get all books :

router.get("/get-all-books",async(req,res)=>{

    try {

        const books=await Book.find().sort({createdAt:-1});

        return res.json({
            status:"success",
            data:books,
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({message:"An error Occured"})
    }
})

//get recently added books :

router.get("/get-recent-book",async(req,res)=>{

    try {
        
        const books=await Book.find().sort({createdAt:-1});

        return res.json({
            status:"success",
            data:books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error Occured"})
    }
})

// get book by id :

router.get("/get-book-by-id/:id",async (req,res)=>{

    try {
        
        const {id}=req.params;
        const book = await Book.findById(id);

        return res.json({
            status:"success",
            data:book,
        });
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

module.exports =router;