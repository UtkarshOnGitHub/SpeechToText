
import React, { useState, useEffect } from 'react'
import './App.css'
import {FaMicrophone , FaMicrophoneSlash} from "react-icons/fa"
import AOS from 'aos';
import 'aos/dist/aos.css';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function App() {
  AOS.init();
  const [micState , setMicState] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [micState])

  const handleListen = () => {
    if (micState) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }
return (
      <div className='parent'>
          <div className='child'> 
              {micState ? <FaMicrophone onClick={()=>setMicState(!micState)}/> : <FaMicrophoneSlash onClick={()=>setMicState(!micState)}/> }
              {micState ? <img src="https://c.tenor.com/ZIfbZJ1CPO8AAAAi/sound.gif"/> : ""}
          </div>
          <div className='notes' data-aos="zoom-in-right">
                <h3>{note}</h3>
          </div>

      </div>
  )
}

export default App
