import React, { useEffect, useState } from 'react'

import piwo from '../assets/piwkotesco_beat.mp3'

export default function Home() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const playSound = async () => {
    new Audio(piwo).play()
    setIsButtonDisabled(true);
  }



  return (
    <div>
      <h1>Home</h1>
      <img src="/src/assets/piwo.gif"></img>
      <button onClick={playSound} disabled={isButtonDisabled}>Piwko</button>
    </div>
  )
}
