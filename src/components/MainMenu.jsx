/* eslint-disable react/prop-types */
import { useState } from "react"
import InfoScreen from "./InfoScreen"

const buttonClass = "m-2 p-4 bg-slate-100 hover:bg-slate-200 rounded-xl text-3xl border-solid border-2 border-blue-800"

const MainMenu = ({ presetNames, setPresetSelected }) => {
  const [showInfo, setShowInfo] = useState(false)
  
  const formatName = (name) => {
    return name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([a-zA-Z])([0-9])/g, '$1 $2');
  }

  if (showInfo) return <InfoScreen buttonClass={buttonClass} setShowInfo={setShowInfo} />

  return (
    <div className="flex flex-col h-screen items-center text-center bg-gradient-to-t from-slate-400 to-slate-200">
      <h1 className="text-6xl font-mono font-bold m-6 p-4 mt-0 pt-4 bg-slate-50 w-screen border-b-4 border-slate-300">
        GLB Poser
      </h1>

      <button className={buttonClass} onClick={()=>setShowInfo(true)}>
        How To Use
      </button>

      <div className="m-0 mt-8 p-6 md:p-20 rounded-md border-solid border-2 border-blue-800 bg-slate-500">
        <h3 className="m-4 p-4 pt-0 text-4xl text-white">Select theme:</h3>
        <div className="grid md:grid-rows-3 grid-flow-row gap-4">
          {presetNames.map(name => (
            <button 
              key={name+"button"} 
              onClick={()=>setPresetSelected(name)}
              className={buttonClass}
            >
              {formatName(name)}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

export default MainMenu