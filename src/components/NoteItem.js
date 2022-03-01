import React from 'react'
import noteContexts from '../contexts/noteContexts'
import { useContext } from 'react'
const NoteItem = (props) => {
    const note=props;
    console.log(note);
    const context = useContext(noteContexts);
    const {deleteNote}=context;
    //console.log(notes);
    return (
        <div className="col-md-4 my-3">
            <div className="card" >
  
            <div className="card-body">
                <div className="d-flex align-items-center">
                <h2 className="card-title">{props.note.title}</h2>
                <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(props.note._id)}}></i>
                <i className="fas fa-user-edit mx-2" onClick={()=>{props.updateNote(props.note)}}></i>
                </div>
                
                <p className="card-text">{props.note.description}</p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
            </div>
        </div>
    )
}
export default NoteItem;