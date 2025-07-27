const router =require("express").Router();

const {authenticateToken} = require("./userAuth");

const Book =require("../models/book");

const Order =require("../models/order");

const User = require("../models/user");

// place order :
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        if (!id) return res.status(400).json({ message: "User ID is missing" });
        if (!order || !order.length) return res.status(400).json({ message: "Cart is empty" });

        console.log("Processing order for user:", id);
        console.log("Order Data:", order);

        for (const orderData of order) {
            if (!orderData._id) {
                console.log("Invalid book data:", orderData);
                return res.status(400).json({ message: "Invalid book in order" });
            }

            const newOrder = new Order({
                user: id,
                book: orderData._id,
                status: "Pending", // Ensure this is a valid enum value
            });

            const orderDataFromDb = await newOrder.save();
            console.log("Saved Order:", orderDataFromDb);

            await User.findByIdAndUpdate(id, { $push: { orders: orderDataFromDb._id } });
            await User.findByIdAndUpdate(id, { $pull: { cart: orderData._id } });
        }

        return res.json({ status: "Success", message: "Order placed successfully" });
    } catch (error) {
        console.error("Order Placement Error:", error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});



// get order history of particular user :

router.get("/get-order-history",authenticateToken,async(req,res)=>{

    try {

        const {id}=req.headers;
        const userdata=await User.findById(id).populate({

            path:"orders",
            populate:{path:"book"},

        });

        const orderData = userdata.orders.reverse();
        return res.json({
            status:"Success",
            data:orderData,
        });
    }
    catch(error) {
        console.log(error);
    }
})

// get all orders : admin

router.get("/get-all-order",authenticateToken,async(req,res)=>{

    try {
        
        const userData = await Order.find()
            .populate({
                path:"book",
            })
            .populate({
                path:"user",
            })
            .sort({
                createdAt:-1
            })
        return res.json({
            status:"success",
            data:userData,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({message:"An error Occured"})
    }
})


// update order - admin :

router.put("/update-status/:id",authenticateToken,async(req,res)=>{

    try {
        
        const {id} = req.params;

        await Order.findByIdAndUpdate(id,{status:req.body.status});

        return res.json({
            status:"Success",
            message:"Status Updated successfully",
        })

    } catch (error) {
        
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
})


module.exports = router;
