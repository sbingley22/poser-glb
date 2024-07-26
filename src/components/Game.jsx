/* eslint-disable react/no-unknown-property */
import { Environment, OrbitControls, TransformControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import Character from "./Character"
import { button, folder, useControls } from "leva"
import Screenshot from "./Screenshot"
import { v4 as uuidv4 } from 'uuid'
import ImgPlane from "./ImgPlane"
import ShadowCatcher from "./ShadowCatcher"
import PostProcess from "./PostProcess"

// Preset models
import { presetModels, presetProps, presetEnviroments, hdrTexture } from "../assets/presets"
//import { presetModels, presetProps, presetEnviroments, hdrTexture } from "../assets/dev/sgrs/presets"
//import { presetModels, presetProps, presetEnviroments, hdrTexture } from "../assets/dev/tj4/presets"
import HUD from "./HUD"
import Items from "./Items"

function Game() {
  const containerRef = useRef()
  const canvasRef = useRef()
  const [characters, setCharacters] = useState([])
  const charIndex = useRef(0)
  const [items, setItems] = useState([])
  const propIndex = useRef(0)
  const transformControlsRef = useRef()
  const [controlsHidden, setControlsHidden] = useState(false)
  const [controlSize, setControlSize] = useState(1.5)
  const [images, setImages] = useState([])

  // Gizmo Controls
  const { gizmoSize, controlSizeLeva, ctrlRootAlwaysOn, hideCtrlOnDblClick, clogObj, clogMat, clogCol } = useControls('Controls', {
    "Cycle Gizmo": button(() => {
      cycleGizmo()
    }),
    gizmoSize: {
      label: "Gizmo Size",
      value: 0.4,
      min: 0.1,
      max: 2,
      step: 0.1
    },
    "Hide Controls": button(() => {
      setControlsHidden(!controlsHidden)
    }),
    controlSizeLeva: {
      label: "Control Size",
      value: 0.5,
      min: 0.2,
      max: 2,
      step: 0.1
    },
    ctrlRootAlwaysOn: {
      label: "Root Always Visible",
      value: false
    },
    hideCtrlOnDblClick: {
      label: "Double Click Hides Controls",
      value: true
    },
    "Console Logs": folder({
      clogObj: {
        label: "Log Obj",
        value: false
      },
      clogMat: {
        label: "Log Material",
        value: false
      },
      clogCol: {
        label: "Log Color",
        value: false
      },
    }, { collapsed: true })
  }, { collapsed: true }, [controlsHidden])

  // Adding Preset Character
  const handleCharacterChange = (char) => {
    if (char === '') return
    
    let url, preset = null
    let name = "C"

    Object.keys(presetModels).forEach(presetName => {
      if (char !== presetName) return
      const currentModel = presetModels[presetName]
      url = currentModel.url
      preset = currentModel.preset
      name = presetName
    })

    if (!url) return

    addCharacter(url, preset, name)
  }
  const addCharacter = (url, preset, name="C") => {
    charIndex.current += 1
    setCharacters(prevCharacters => {
      const temp = [...prevCharacters]
      temp.push({
        url: url,
        id: uuidv4(),
        preset: preset,
        index: charIndex.current,
        name: name
      })
      return temp
    })
  }
  const deleteCharacter = (id) => {
    setCharacters(prevCharacters => prevCharacters.filter(character => character.id !== id))
  }
  // Character Controls
  useControls(`Characters`, {
    character: {
      label: "Add",
      value: '',
      options: Object.keys(presetModels),
      onChange: handleCharacterChange
    }
  }, { collapsed: false })

  // Adding Preset Prop
  const handlePropChange = (prop) => {
    if (prop === '') return
    //debugger
    
    let url, preset = null
    let name = "C"

    Object.keys(presetProps).forEach(presetName => {
      if (prop !== presetName) return
      const currentProp = presetProps[presetName]
      url = currentProp.url
      preset = currentProp.preset
      name = presetName
    })

    if (!url) return

    addProp(url, preset, name)
  }
  const addProp = (url, preset, name="P") => {
    propIndex.current += 1
    setItems(prevProps => {
      const temp = [...prevProps]
      temp.push({
        url: url,
        id: uuidv4(),
        preset: preset,
        index: propIndex.current,
        name: name
      })
      return temp
    })
  }
  const deleteProp = (id) => {
    setItems(prevProps => prevProps.filter(prop => prop.id !== id))
  }
  // Prop Controls
  useControls(`Props`, {
    prop: {
      label: "Add",
      value: '',
      options: Object.keys(presetProps),
      onChange: handlePropChange
    }
  }, { collapsed: false })

  // Image Controls
  const { imgLock, imgsVisible, imgBrightness } = useControls('Images', {
    imgLock: {
      label: "Lock Selection",
      value: false
    },
    imgsVisible: {
      label: "Show Imgs",
      value: true
    },
    imgBrightness: {
      label: "Brightness",
      value: 1,
      min: 0,
      max: 2,
      step: 0.1
    },
    "Delete Selected": button(() => {
      deleteImage()
    }),
  }, { collapsed: true }, [images])
  const deleteImage = () => {
    if (!transformControlsRef.current?.object) return
    if (!transformControlsRef.current.object.name.includes("ImgPlane")) return

    //console.log(transformControlsRef.current.object.userData.url, images[0].url)

    const urlToDelete = transformControlsRef.current.object.userData.url
    setImages(prevImages => prevImages.filter(image => image.url !== urlToDelete))
    transformControlsRef.current.detach()
  }

  // Image Brightness update
  useEffect(()=>{
    if (!transformControlsRef.current?.object) return
    if (!transformControlsRef.current.object.name.includes("ImgPlane")) return

    //console.log(transformControlsRef.current.object)
    transformControlsRef.current?.object.material.color.setScalar(imgBrightness)
  },[imgBrightness])
  
  // Compositor Controls
  const { dpr } = useControls('Compositor', {
    dpr: {
      label: "Dynamic Pixels",
      value: 1,
      min: 0.1,
      max: 1,
      step: 0.1,
    },
  }, { collapsed: true })

  // Enviroment Controls
  const environmentStrings = [
    "apartment",
    "city",
    "dawn",
    "forest",
    "lobby",
    "night",
    "park",
    "studio",
    "sunset",
    "warehouse",
    ""
  ]
  const { environmentShow, showShadowCatcher, environmentGround, environmentRotation, environmentScale, environmentBlur, lightIntensity, environmentPreset } = useControls('Environment', {
    environmentShow: {
      label: "Show",
      value: true,
    },
    showShadowCatcher: {
      label: "Shadow Catcher",
      value: true
    },
    environmentGround: {
      label: "Ground",
      value: true,
    },
    environmentScale: {
      label: "Scale",
      value: 8,
      min: 4,
      max: 12,
      step: 1
    },
    environmentRotation: {
      label: "Rotation",
      value: 0,
      min: 0,
      max: 9,
      step: 0.1
    },
    environmentBlur: {
      label: "Blur",
      value: 0,
      min: 0,
      max: 0.1,
      step: 0.01
    },
    lightIntensity: {
      label: "Light Intensity",
      value: 1,
      min: 0,
      max: 1,
      step: 0.1
    },
    environmentPreset: {
      label: "Environment",
      value: presetEnviroments?.environment? presetEnviroments.environment : 'forest',
      options: environmentStrings,
    }
  }, { collapsed: true })

  // Gizmo Modes
  const cycleGizmo = () => {
    if (!transformControlsRef.current) return
    if (transformControlsRef.current.mode === "translate") {
      transformControlsRef.current.mode = "rotate"
    }
    else if (transformControlsRef.current.mode === "rotate") {
      //transformControlsRef.current.mode = "scale"
      transformControlsRef.current.mode = "translate"
    }
    else if (transformControlsRef.current.mode === "scale") {
      transformControlsRef.current.mode = "translate"
    }
  }
  const setGizmoMode = (mode) => {
    if (!transformControlsRef.current) return
    transformControlsRef.current.mode = mode
  }

  // Gizmo Size
  useEffect(()=>{
    if (!transformControlsRef.current) return
    transformControlsRef.current.size = gizmoSize
  },[gizmoSize])
  // Control Size
  useEffect(()=>{
    setControlSize(controlSizeLeva)
  },[controlSizeLeva])

  // Click Events
  useEffect(()=>{
    const onPointerDown = (event) => {
      //console.log(event)
      event.preventDefault()

      if (event.button >= 3) {
        cycleGizmo()
      }
    }

    const onDoubleClick = (event) => {
      event.preventDefault()
      event.stopPropagation()
      event.returnValue = false

      transformControlsRef.current.detach()
      if (hideCtrlOnDblClick) {
        setControlsHidden(prev => !prev)
      }
    }

    const canvas = canvasRef.current
    canvas.addEventListener("pointerdown", onPointerDown)
    canvas.addEventListener("dblclick", onDoubleClick)

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown)
      canvas.removeEventListener("dblclick", onDoubleClick)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Drag N Drop
  const handleDrop = (event) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)

    files.forEach((file, index) => {
      if (file && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file)
        const img = new Image()
        img.src = url
        img.onload = () => {
          const { width, height } = img
          setImages((prevImages) => [
            ...prevImages,
            { url, position: [index * 1.5, 0, 0], width: width / 100, height: height / 100 }
          ])
        }
      } else if (file && file.type === 'model/gltf-binary') {
        const url = URL.createObjectURL(file);
        setCharacters((prev) => [
          ...prev,
          {
            url: url,
            id: uuidv4(),
            preset: null,
            index: charIndex.current
          }
        ])
        charIndex.current += 1
      }
    })
  }
  const handleDragOver = (event) => {
    event.preventDefault()
  }

  // Add initial character
  useEffect(()=>{
    if (charIndex.current === 0) {
      const presetNames = Object.keys(presetModels)
      if (presetNames.length === 0) return

      handleCharacterChange(presetNames[0])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="w-screen h-screen bg-gradient-to-t from-slate-700 to-gray-600"
      onDrop={handleDrop} 
      onDragOver={handleDragOver} 
    >
      <Canvas 
        ref={canvasRef}
        camera={{position: [0.5, 1.75, 1.5], near: 0.01, far: 20}}
        gl={{ preserveDrawingBuffer: true }}
        shadows
        dpr={dpr}
      >
        <Suspense>

          <Environment 
            preset={environmentPreset} 
            background={environmentShow}
            backgroundIntensity={lightIntensity}
            backgroundRotation={[0,environmentRotation,0]}
            backgroundBlurriness={environmentBlur}
            blur={environmentBlur}
            environmentIntensity={lightIntensity} 
            environmentRotation={[0,environmentRotation,0]}
            ground={environmentGround ? {
              height: 15, // Height of the camera  (Default: 15)
              radius: 60, // Radius of the world. (Default 60)
              scale: environmentScale, // (Default: 1000)
            } : false}
            files={hdrTexture}
          />

          <OrbitControls
            target={[0,1.2,0]}
            position={[0,2,2]}
            zoomSpeed={2}
            makeDefault
          />

          <TransformControls 
            ref={transformControlsRef}
            size={0.3}
          />

          {showShadowCatcher &&
            <>
              <ShadowCatcher />
              <directionalLight
                position={[0,10,0]}
                intensity={0.1}
                castShadow
              />
            </>
          }

          {characters && characters.map( (c, index) => (
            <Character 
              key={c.id}
              id={c.id}
              url={c.url}
              index={c.index}
              name={c.name}
              preset={c.preset}
              position={[0.5*index,0,-0.5*index]} 
              rotation={[0, 0, 0]} 
              canvasRef={canvasRef}
              controlsHidden={controlsHidden}
              setControlsHidden={setControlsHidden}
              hideCtrlOnDblClick={hideCtrlOnDblClick}
              transformControlsRef={transformControlsRef}
              controlSize={controlSize}
              ctrlRootAlwaysOn={ctrlRootAlwaysOn}
              clogObj={clogObj}
              clogMat={clogMat}
              clogCol={clogCol}
              deleteCharacter={deleteCharacter}
            />
          ))}

          {items && items.map( (p, index) => (
            <Items 
              key={p.id}
              id={p.id}
              url={p.url}
              index={p.index}
              preset={p.preset}
              name={p.name}
              position={[0.5*index,0,-0.5*index]} 
              rotation={[0, 0, 0]} 
              canvasRef={canvasRef}
              controlsHidden={controlsHidden}
              setControlsHidden={setControlsHidden}
              hideCtrlOnDblClick={hideCtrlOnDblClick}
              transformControlsRef={transformControlsRef}
              controlSize={controlSize}
              ctrlRootAlwaysOn={ctrlRootAlwaysOn}
              clogObj={clogObj}
              clogMat={clogMat}
              clogCol={clogCol}
              deleteProp={deleteProp}
            />
          ))}

          {images.map((image, index) => (
            <ImgPlane 
              key={index} 
              imageUrl={image.url} 
              position={image.position}
              width={image.width} 
              height={image.height} 
              imgLock={imgLock}
              imgsVisible={imgsVisible}
              transformControlsRef={transformControlsRef}
            />
          ))}

        </Suspense>

        <PostProcess />

        <Screenshot />

      </Canvas>

      <HUD 
        setGizmoMode={setGizmoMode}
        setControlsHidden={setControlsHidden}
        controlSize={controlSize}
        setControlSize={setControlSize}
      />

    </div>
  )
}

export default Game
