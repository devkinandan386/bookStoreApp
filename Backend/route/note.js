import express from "express";
import Note from "../model/Note";

const router = express.Router();

router.post("/add",middleware, async(req, res) => {
    try {
        const { title, description } = req.body;
        const newNote = new Note({ title, description, userID: req.user._id });
        await newNote.save();

        return res.status(200).json({success: true, message: "Note added successfully" });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: "Error in adding note" });
    }
})

router.get("/",middleware, async(req, res) => {
    try {
        const notes = await Note.find();
        return res.status(200).json({success: true, message: "Notes fetched successfully", notes });

    }catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: "Error in fetching notes" });
    }
})

router.put("/:id",middleware, async(req, res) => {
    try {
        const {id}=req.params;
        const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({success: true, message: "Note updated successfully", updatedNote });

    }catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: "Error in updating note" });
    }
})

router.delete("/:id",middleware, async(req, res) => {
    try {
        const {id}=req.params;
        const updatedNote = await Note.findByIdAndDelete(id);
        return res.status(200).json({success: true, message: "Note Deleted successfully", updatedNote });

    }catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: "Error in Deleting note" });
    }
})
export default router;