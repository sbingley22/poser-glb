/* eslint-disable react/prop-types */

const MainMenu = ({ presetNames, setPresetSelected }) => {

  const buttonClass = "m-2 p-4 bg-slate-300 hover:bg-slate-200 rounded-xl text-3xl border-solid border-2 border-blue-800"
  
  const formatName = (name) => {
    return name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([a-zA-Z])([0-9])/g, '$1 $2');
  }

  return (
    <div className="flex flex-col h-screen items-center text-center bg-gradient-to-t from-slate-400 to-slate-200">
      <h1 className="text-7xl m-12 p-12 mt-4 pt-0">GLB Poser</h1>
      <h3 className="m-4 p-4 text-3xl">Select theme:</h3>
      <div className="m-0 p-6 md:p-20 rounded-md border-solid border-2 border-blue-800">
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