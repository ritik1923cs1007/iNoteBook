import React from 'react'
import AddNote from './AddNote'
import  Note  from './Note'
const Home = () => {
    return (
        <div className="container my-3">
           <AddNote/>
           <h2 className="my-3">
               Your notes
               <Note/>
           </h2>
        </div>
    )
}


export default Home
