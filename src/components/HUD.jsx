/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const HUD = ({ setGizmoMode, setControlsHidden, controlSize, setControlSize }) => {
  const [visible, setVisible] = useState(true)
  const [locked, setLocked] = useState(true)
  const [dockedLeft, setDockedLeft] = useState(false)
  const [gizmoSize, setGizmoSize] = useState(0.5)

  const updateLocked = () => {
    setLocked(prev => !prev)
    setVisible(true)
  }

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (locked) return

      if (dockedLeft) {
        if (event.clientX <= 100) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      } else {
        const threshold = window.innerHeight - 50
        if (event.clientY >= threshold) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [locked, dockedLeft])

  const toggleDockingPosition = () => {
    setDockedLeft(!dockedLeft)
  }

  const handleSliderChange = (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setGizmoSize(value)
    }
  }

  const handleControlSliderChange = (event) => {
    const value = parseFloat(event.target.value)
    if (!isNaN(value)) {
      setControlSize(value)
    }
  }

  const buttonClass = "p-2 m-1 bg-green-700 hover:bg-green-800 border-solid border-black border-2"

  return (
    <div
      id="bottom-bar"
      className={`fixed ${
        dockedLeft ? 'left-0 top-0 h-full w-26' : 'bottom-0 left-0 w-full h-12'
      } bg-green-600 text-white text-center p-2 transition-transform duration-300 z-50 ${
        visible ? 'translate-x-0 translate-y-0' : dockedLeft ? '-translate-x-full' : 'translate-y-full'
      } flex items-center justify-center ${dockedLeft ? 'flex-col' : 'flex-row'}`}
    >
      <button 
        onClick={toggleDockingPosition}
        className={buttonClass + ` ${dockedLeft ? "mb-2 bg-gradient-to-t  from-black to-transparent" : "mr-2 bg-gradient-to-r from-black to-transparent"} w-10 h-10`}
      ></button>

      <button 
        onClick={updateLocked}
        className={buttonClass + ` ${dockedLeft ? "mb-4" : "mr-4"}`}
      >{locked ? "Unlock" : "Lock"}</button>

      <div className={`flex items-center ml-2 ${dockedLeft ? 'flex-col mb-4' : 'flex-row mr-4'} border-solid border-black border-2 p-2`}>
        <label htmlFor="gizmo-slider" className="mr-2">Gizmo: {gizmoSize.toFixed(1)}</label>
        <input
          type="range"
          id="gizmo-slider"
          min="0.1"
          max="1"
          step="0.1"
          value={gizmoSize}
          onChange={handleSliderChange}
          className="w-20"
        />
      </div>
      
      <button 
        onClick={()=>setGizmoMode("translate")}
        className={buttonClass}
      >Translate</button>
      <button 
        onClick={()=>setGizmoMode("rotate")}
        className={buttonClass}
      >Rotate</button>
      <button 
        onClick={()=>setGizmoMode("scale")}
        className={buttonClass + ` ${dockedLeft ? "mb-4" : "mr-4"}`}
      >Scale</button>
      
      <button 
        onClick={()=>setControlsHidden(prev => !prev)}
        className={buttonClass}
      >Controls:</button>
      <div className={`flex items-center ml-2 ${dockedLeft ? 'flex-col' : 'flex-row'} border-solid border-black border-2 p-2`}>
        <label htmlFor="gizmo-slider" className="mr-2">{controlSize.toFixed(1)}</label>
        <input
          type="range"
          id="gizmo-slider"
          min="0.2"
          max="2"
          step="0.1"
          value={controlSize}
          onChange={handleControlSliderChange}
          className="w-20"
        />
      </div>

    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default HUD