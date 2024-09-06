const express = require("express");
const libraryRouter = express.Router();
const LibraryModel = require("../Models/library.model")
const auth = require("../Middleware/auth.middleware")
const authorize  = require("../Middleware/authorization.middleware");
const { sendEmailNotification } = require("../Middleware/mailer");



// Creator
libraryRouter.post("/create",auth,authorize(["creator","viewer"]),async (req,res)=>{
    const{title,author,genre, publishedYear,createdAt,description,language} = req.body;
    const createdBy = req.user.id;
    const userName = req.user.name;
    try {
        const libraryData = new LibraryModel({
            title,
            author,
            genre,
            publishedYear,
            createdAt,
            description,
            language,
            createdBy,
            userName
        })
        await libraryData.save()
        await sendEmailNotification(libraryData);
        res.status(201).json({message:"Book is added to the library"})
    } catch (error) {
        res.status(404).json({message:"Error while adding the book to the library",error})
    }
})

// Delete Book
libraryRouter.delete("/delete/:id",auth,authorize(["creator"]),async(req,res)=>{
    const{id} = req.params;
    try {
        const deleteLib = await LibraryModel.findByIdAndDelete({_id:id})
        res.status(201).json({message:"Book delete successfully",deleteLib})
    } catch (error) {
        res.status(303).json({message:"Error while deleting the book",error})
    }
})

// View All
libraryRouter.get("/books",auth,async(req,res)=>{
    const { old, New} = req.query;

   try {
    let libraryData;
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000); 

    if (old) {
            libraryData = await LibraryModel.find({ createdAt: { $lte: tenMinutesAgo } });
        } else if (New) {
        libraryData = await LibraryModel.find({ createdAt: { $gt: tenMinutesAgo } });
    } else {
        libraryData = await LibraryModel.find();
    }

    res.status(201).json({ message: "Books data fetched successfully", libraryData });
   } catch (error) {
    res.status(303).json({message:"Error while fetching the books data",error})
   }
    
})

// Viewer
libraryRouter.get("/view_books",auth,authorize(["viewer"]),async (req,res)=>{
    const userId = req.user.id;
    try {
        const books = await LibraryModel.find({ createdBy: userId }); 
        res.status(200).json({ message: "Books data fetched successfully", books });
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
    
})


module.exports = libraryRouter;