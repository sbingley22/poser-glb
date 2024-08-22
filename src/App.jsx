import { useState } from "react"
import Game from "./components/Game"
import MainMenu from "./components/MainMenu"

import { presets } from "./assets/presets"
//import { presets } from "./assets/dev/presets"

function App() {
  const [presetSelected, setPresetSelected] = useState("")

  if (presetSelected === "") {
    return <MainMenu presetNames={Object.keys(presets)} setPresetSelected={setPresetSelected} />
  }

  return (
    <Game 
      presets={presets}
      presetSelected={presetSelected}
    />
  )
}

export default App
