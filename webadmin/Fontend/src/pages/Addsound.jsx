import React, { useState, useRef, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import { Link } from "react-router-dom"
import { useNavigate  } from "react-router-dom"
import "../css/addsound.css"

const Addsound = () => {
    const [emotion, setemotion] = useState("")
    const [text, settext] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:5001/addemotion', {
            emotion: emotion,
            text: text
        })
        .then(response => {
            // navigate('/success') // Redirect to a success page
        })
        .catch(error => {
            console.error('There was an error!', error)
        })
    }

    return (
        <div className="">
            <Container>
                <div class="d-flex justify-content-center mt-5">
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="emotion">Emotion</label>
                            <input type="text" class="form-control" id="emotion" value={emotion} onChange={e => setemotion(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="text">Text</label>
                            <textarea class="form-control" id="text" rows="3" value={text} onChange={e => settext(e.target.value)}></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default Addsound;