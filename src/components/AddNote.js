import React from 'react'
import { useContext,useState } from 'react';
import Context from '../contexts/noteContexts' 
export const AddNote = () => {
    const context = useContext(Context);
    const {addNote}=context;

    const [note, setNote] = useState({title:"",description:"",tag:"default"});
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
    return (
        <div>
             <h2>Add a note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="title" onChange={onchange}/>
                                    </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" name="description" id="description" onChange={onchange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}
export default AddNote;