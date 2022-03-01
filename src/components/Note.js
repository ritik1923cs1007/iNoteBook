import React, { useEffect,useState } from 'react'
import noteContexts from '../contexts/noteContexts'
import NoteItem from './NoteItem'
import { useContext } from 'react'
import { useRef } from 'react'
import { useHistory } from 'react-router-dom'
const Note = () => {
  const contexts = useContext(noteContexts);
  const { notes, getNote,addNote,editNote} = contexts;
  console.log(notes);
  let history=useHistory();
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNote()
    }
    else
    {
      history.push("/login")
    }
    
  }, [])

const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"});
    const handleClick=(e)=>{
        console.log('updating the note',note);
       
        editNote(note.id,note.etitle,note.edescription,note.etag);
        closeRef.current.click();
        e.preventDefault();
        
    }
    const updateNote=(currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description});
    
    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
const ref=useRef(null);
const closeRef=useRef(null);
  return (
    <>
    <div id="modal">
        <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal" >
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="etitle" onChange={onchange}/>
                                    </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" name="edescription" id="edescription" value={note.edescription} onChange={onchange}/>
                </div>
               
               
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={closeRef} className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="row my-5">

        {
          notes.map((note) => {
            return (
              <NoteItem note={note} updateNote={updateNote} />
            )
          }
          )
        }
      </div>
    </>
  )
}

export default Note
