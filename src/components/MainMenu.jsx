/* eslint-disable react/prop-types */
import { useState } from "react"
import InfoScreen from "./InfoScreen"

const buttonClass = "m-2 p-2 bg-slate-300 hover:bg-slate-400 rounded-xl text-2xl border-solid border-2 border-blue-800"

const MainMenu = ({ presetNames, setPresetSelected, setLoadData }) => {
  const [showInfo, setShowInfo] = useState(false)
  
  const formatName = (name) => {
    return name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([a-zA-Z])([0-9])/g, '$1 $2');
  }

  const loadData = () => {
    const rawData = localStorage.getItem('autosave')
    if (!rawData) {
      console.log("No save data")
      return
    }

    const data = JSON.parse(rawData)
    console.log(data)
    setLoadData(data)
    setPresetSelected(data.presetSelected)
  }

  if (showInfo) return <InfoScreen buttonClass={buttonClass} setShowInfo={setShowInfo} />

  return (
    <div className="flex flex-col h-screen box-border items-center text-center bg-gradient-to-t from-slate-400 to-slate-200">
      <div className="m-0 p-4 pt-4 bg-slate-300 w-screen border-b-4 border-slate-300 flex justify-between items-center">
	      <h1 className="text-4xl font-mono font-bold inline mb-0 pb-0">
		GLB Poser
	      </h1>

	      <div>
		      <button className={buttonClass} onClick={()=>setShowInfo(true)}>
			How To Use
		      </button>

		      <button className={buttonClass} onClick={()=>loadData()}>
			Load Last
		      </button>
	      </div>
      </div>

      <div className="m-0 mt-8 p-4 md:p-12 rounded-md border-solid border-2 border-blue-800 bg-slate-500">
        <h3 className="m-1 p-1 pt-0 text-2xl text-white">Select theme:</h3>
        <div className="grid md:grid-rows-3 grid-flow-row gap-2">
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
