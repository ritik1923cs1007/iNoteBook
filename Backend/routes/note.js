const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes',fetchUser, async (req, res) => {
    
  try {
    const note = await Notes.find({ user: req.user.id })
    res.json(note);  
  } catch (error) {
    res.status(500).send("Internal server error");
  }
    

})
router.post('/addanote', fetchUser,body('title').isLength({ min: 3 }), body('description').isLength({ min: 5 }),async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {title,description,tag}=req.body;
  try {
      const note=new Notes({
        title,description,tag,user:req.user.id
      })
      const savedNote=await note.save();
      res.json(savedNote);
  } catch (error) {
      console.log(error.message);
    res.status(500).send("Internal server error");
  }
})
//update a note
router.put('/updatenote/:id', fetchUser,async (req, res) => {
  const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
const {title,description,tag}=req.body;
try {
    const newNote={};
    if(title){
      newNote.title=title;
    }
    if(description){
      newNote.description=description;
    }
    if(tag){
      newNote.tag=tag;
    }
      let note= await Notes.findById(req.params.id);
      if(!note){
        return res.status(404).send("Note not found");
      }
      // if(note.user.toString!==req.user.id){
      //   return res.status(401).send("Not Allowed");
      // }
    
    note =await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(note);
} catch (error) {
    console.log(error.message);
  res.status(500).send("Internal server error");
}
})
// delete a note
router.delete('/deletenote/:id', fetchUser,async (req, res) => {
 
const {title,description,tag}=req.body;
try {
   
   
      let note= await Notes.findById(req.params.id);
      if(!note){
        return res.status(404).send("Note not found");
      }
      if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
      }
    
    note =await Notes.findByIdAndDelete(req.params.id);
    res.json({"success":"note has been deleted"});
} catch (error) {
    console.log(error.message);
  res.status(500).send("Internal server error");
}
})
module.exports = router;