import React, { useContext, useEffect } from 'react'
import noteContexts from '../contexts/noteContexts'
const About = () => {
    const a=useContext(noteContexts);
   
    return (
        <div>
            I am about
        </div>
    )
}

export default About
