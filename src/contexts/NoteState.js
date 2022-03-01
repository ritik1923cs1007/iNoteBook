import noteContexts from "./noteContexts";
import { useState } from "react";
const host = "http://localhost:5000";
const NoteState = (props) => {
  const initialNotes = [];
  const [notes, setnotes] = useState(initialNotes)
  const deleteNote = async(id) => {
       const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const Newnote = notes.filter((note) => { return note._id !== id });
    setnotes(Newnote);


  }
  const getNote=async ()=>{
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
     
    });
    const data=await response.json();
    setnotes(Array.from(data));
    console.log(notes);
  }
  const editNote = async (id,title,description,tag) => {
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });
    let newnotes=JSON.parse(JSON.stringify(notes))
    for(let index=0;index<newnotes.length;index++){
      const element=newnotes[index];
      if(element._id===id){
        newnotes[index].title=title;
        newnotes[index].description=description;
        newnotes[index].tag=tag;
        break;
      }
    }
    setnotes(newnotes);
    return response.json();

  }
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/note/addanote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });
    const note= await response.json();
    
    setnotes(notes.concat(note));
  }
  return (
    <noteContexts.Provider value={{ notes, addNote, editNote, deleteNote,getNote }}>
      {props.children}
    </noteContexts.Provider>
  )
}
export default NoteState;

