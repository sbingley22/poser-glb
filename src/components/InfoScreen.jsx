/* eslint-disable react/prop-types */

const pClass = "p-4"

const InfoScreen = ({ buttonClass, setShowInfo }) => {
  return (
    <div className="flex flex-col h-screen items-center text-center bg-gradient-to-t from-slate-400 to-slate-200">

      <h1 className="text-7xl m-4 p-2 mt-4 pt-0">How To Use:</h1>

      <button className={buttonClass} onClick={()=>setShowInfo(false)}>
        Return
      </button>

      <div className="m-2 p-6 md:p-20 rounded-md border-solid border-2 border-blue-800 text-2xl bg-slate-100">
        <p className="p-4">Pose various characters in a background of your chosing. Click a control to activate the gizmo tool, you can change the operation between translate, rotate, and scale using the sidebars or mouse button 4.</p>
        <p className={pClass}>You can change various setting using the floating menu on the right. This includes adding effects like pixelation, changing the background image, altering gizmo size, taking a screenshot, etc.</p>
        <p className={pClass}>Add additional characters, props, and images by using the presets in the right hand menu or drag and dropping your own glb files or images.</p>
        <p className={pClass}>Double click to deselect gizmo and temporarily hide controls.</p>
        <p className={pClass}>To select props and images you must first deselect everything (double click or use the menu) and then click the prop or image.</p>
      </div>

    </div>
  )
}

export default InfoScreen