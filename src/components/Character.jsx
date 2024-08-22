/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from "react"
import * as THREE from 'three'
import { useThree } from "@react-three/fiber"
import { useSkinnedMeshClone } from "./SkinnedMeshClone"
import { button, folder, useControls } from "leva"

const Character = ({ id, url, index, name, preset, position, rotation, canvasRef, controlsHidden, hideCtrlOnDblClick, transformControlsRef, controlSize, ctrlRootAlwaysOn, clogObj, clogMat, clogCol, deleteCharacter, presetPoses={pose:"log"}, bonesChest=true, bonesShoulder=true }) => {
  //console.log("Character render")
  const { camera } = useThree()
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())
  const { scene, nodes, materials } = useSkinnedMeshClone(url)
  const fkControls = useRef([])
  const lmbHoldTime = useRef(null)
  const [updateLeva, setUpdateLeva] = useState(null)
  const skinSlot = useRef(-1)

  // Show / Hide Controls
  const hideControls = (hide) => {
    if (hide) {
      fkControls.current.forEach(fk => {
	if (!fk) return
        fk.visible = false
        if (ctrlRootAlwaysOn && fk.name.includes("Rig")) fk.visible = true
      })
    }
    else {
      fkControls.current.forEach(fk => {
	if (!fk) return
        fk.visible = true
      })
    }
  }
  useEffect(()=>{
    hideControls(controlsHidden)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[controlsHidden])

  // Node Setup
  useEffect(() => {
    Object.keys(nodes).forEach(nodeName => {
      const node = nodes[nodeName]
      if (node.type === "Mesh" || node.type === "SkinnedMesh") {
        node.frustumCulled = false
      }
    })
  })

  // Change Control Size
  useEffect(()=>{
    if (fkControls.current.length < 1) return

    fkControls.current.forEach( fk => {
      //console.log(fk)
      fk.scale.setScalar(controlSize)
    })
  },[controlSize])

  // Setup FK Controls
  const createControlBox = (name, color = 0x00ff00, scale = [0.1,0.1,0.1]) => {
    const geometry = new THREE.BoxGeometry(...scale)
    const material = new THREE.MeshBasicMaterial({ 
      color: color, 
      wireframe: true, 
      depthTest: false ,
      transparent: true,
      opacity: 0.2
    })
    const box = new THREE.Mesh(geometry, material)
    box.name = name
    return box
  }
  const setupUnkownRig = () => {
    const controlBoxes = []
    Object.keys(nodes).forEach(nodeName => {
      const node = nodes[nodeName]
      if (node.type !== "Bone") return
      const ctrlBox = createControlBox(`Control-FK-${node.name}`)
      controlBoxes.push(ctrlBox)
      node.add(ctrlBox)
      ctrlBox.userData = { control: node }
      fkControls.current.push(ctrlBox)

      fkControls.current.forEach( fk => {
        fk.scale.setScalar(controlSize)
      })  
      hideControls(controlsHidden)
    })
    
  }
  useEffect(()=>{
    if (fkControls.current.length > 0) return
    console.log(nodes)

    let rigType = null
    if (nodes["DEF-spine001"] && nodes["DEF-f_index01L"]) rigType = "rigify"
    else if (nodes["DEF-spine001"] && nodes["DEF-forearmR"]) rigType = "rigifyBasic"
    else {
      console.log("Rig Unknown!")
      setupUnkownRig()
      return
    }

    // Reparent
    nodes["DEF-upper_armL"].removeFromParent()
    nodes["DEF-shoulderL"].attach(nodes["DEF-upper_armL"])    
    nodes["DEF-shoulderL"].removeFromParent()
    nodes["DEF-spine003"].attach(nodes["DEF-shoulderL"])    
    nodes["DEF-breastL"].removeFromParent()
    nodes["DEF-spine003"].attach(nodes["DEF-breastL"])
    nodes["DEF-upper_armR"].removeFromParent()
    nodes["DEF-shoulderR"].attach(nodes["DEF-upper_armR"])    
    nodes["DEF-shoulderR"].removeFromParent()
    nodes["DEF-spine003"].attach(nodes["DEF-shoulderR"])    
    nodes["DEF-breastR"].removeFromParent()
    nodes["DEF-spine003"].attach(nodes["DEF-breastR"])
    nodes["DEF-thighL"].removeFromParent()
    nodes["DEF-pelvisL"].attach(nodes["DEF-thighL"])   
    nodes["DEF-pelvisL"].removeFromParent()
    nodes["DEF-spine"].attach(nodes["DEF-pelvisL"])
    nodes["DEF-thighR"].removeFromParent()
    nodes["DEF-pelvisR"].attach(nodes["DEF-thighR"])    
    nodes["DEF-pelvisR"].removeFromParent()
    nodes["DEF-spine"].attach(nodes["DEF-pelvisR"])

    // Extra reparenting required for rigify
    if (rigType === "rigify") {
      Object.keys(nodes).forEach(nodeName => {
        const node = nodes[nodeName]
        if (node.type !== "Bone") return
        if (node.parent.name.includes("DEF-")) return
        if (nodeName === "DEF-spine") return

        if (nodeName.includes("eye")) {
          if (nodeName.includes("DEF-eyeL")) return
          if (nodeName.includes("DEF-eyeR")) return
        }
        else if (nodeName.includes("jaw")) {
          if (nodeName === "DEF-jaw") {
            node.removeFromParent()
            nodes["DEF-jaw_master"].attach(node)
            return
          }
          if (nodeName === "DEF-jawL" || nodeName === "DEF-jawR") {
            node.removeFromParent()
            nodes["DEF-jaw"].attach(node)
            return
          }
          if (nodeName === "DEF-jawL001") {
            node.removeFromParent()
            nodes["DEF-jawL"].attach(node)
            return
          }
          if (nodeName === "DEF-jawR001") {
            node.removeFromParent()
            nodes["DEF-jawR"].attach(node)
            return
          }
        }

        node.removeFromParent()
        nodes["DEF-spine005"].attach(node)

        //console.log(nodeName)
      })
    }

    const controlBoxRig = createControlBox("Control-FK-Rig", 0xff0000, [0.2,0.02,0.2])
    const controlBoxHip = createControlBox("Control-FK-Hip")
    const controlBoxSp2 = createControlBox("Control-FK-Sp2")
    const controlBoxSp5 = createControlBox("Control-FK-Sp5")
    const controlBoxUpAmL = createControlBox("Control-FK-ShL")
    const controlBoxUpAmR = createControlBox("Control-FK-ShR")
    const controlBoxFrAmL = createControlBox("Control-FK-FrAmL")
    const controlBoxFrAmR = createControlBox("Control-FK-FrAmR")
    const controlBoxHfkL = createControlBox("Control-FK-HL")
    const controlBoxHfkR = createControlBox("Control-FK-HR")
    const controlBoxThL = createControlBox("Control-FK-ThL")
    const controlBoxThR = createControlBox("Control-FK-ThR")
    const controlBoxShinL = createControlBox("Control-FK-ShL")
    const controlBoxShinR = createControlBox("Control-FK-ShR")
    const controlBoxFootL = createControlBox("Control-FK-FootL")
    const controlBoxFootR = createControlBox("Control-FK-FootR")

    nodes["rig"].add(controlBoxRig)
    nodes["DEF-spine"].add(controlBoxHip)
    nodes["DEF-spine002"].add(controlBoxSp2)
    nodes["DEF-spine005"].add(controlBoxSp5)
    nodes["DEF-upper_armL"].add(controlBoxUpAmL)
    nodes["DEF-upper_armR"].add(controlBoxUpAmR)
    nodes["DEF-forearmL"].add(controlBoxFrAmL)
    nodes["DEF-forearmR"].add(controlBoxFrAmR)
    nodes["DEF-handL"].add(controlBoxHfkL)
    nodes["DEF-handR"].add(controlBoxHfkR)
    nodes["DEF-thighL"].add(controlBoxThL)
    nodes["DEF-thighR"].add(controlBoxThR)
    nodes["DEF-shinL"].add(controlBoxShinL)
    nodes["DEF-shinR"].add(controlBoxShinR)
    nodes["DEF-footL"].add(controlBoxFootL)
    nodes["DEF-footR"].add(controlBoxFootR)

    controlBoxRig.userData = { control: nodes["rig"] }
    controlBoxHip.userData = { control: nodes["DEF-spine"] }
    controlBoxSp2.userData = { control: nodes["DEF-spine002"] }
    controlBoxSp5.userData = { control: nodes["DEF-spine005"] }
    controlBoxUpAmL.userData = { control: nodes["DEF-upper_armL"] }
    controlBoxUpAmR.userData = { control: nodes["DEF-upper_armR"] }
    controlBoxFrAmL.userData = { control: nodes["DEF-forearmL"] }
    controlBoxFrAmR.userData = { control: nodes["DEF-forearmR"] }
    controlBoxHfkL.userData = { control: nodes["DEF-handL"] }
    controlBoxHfkR.userData = { control: nodes["DEF-handR"] }
    controlBoxThL.userData = { control: nodes["DEF-thighL"] }
    controlBoxThR.userData = { control: nodes["DEF-thighR"] }
    controlBoxShinL.userData = { control: nodes["DEF-shinL"] }
    controlBoxShinR.userData = { control: nodes["DEF-shinR"] }
    controlBoxFootL.userData = { control: nodes["DEF-footL"] }
    controlBoxFootR.userData = { control: nodes["DEF-footR"] }

    fkControls.current.push(controlBoxRig)
    fkControls.current.push(controlBoxHip)
    fkControls.current.push(controlBoxSp2)
    fkControls.current.push(controlBoxSp5)
    fkControls.current.push(controlBoxUpAmL)
    fkControls.current.push(controlBoxUpAmR)
    fkControls.current.push(controlBoxFrAmL)
    fkControls.current.push(controlBoxFrAmR)
    fkControls.current.push(controlBoxHfkL)
    fkControls.current.push(controlBoxHfkR)
    fkControls.current.push(controlBoxThL)
    fkControls.current.push(controlBoxThR)
    fkControls.current.push(controlBoxShinL)
    fkControls.current.push(controlBoxShinR)
    fkControls.current.push(controlBoxFootL)
    fkControls.current.push(controlBoxFootR)

    if (bonesShoulder) {
      const controlBoxShL = createControlBox("Control-FK-ShL", 0xffff00, [0.08, 0.08, 0.08])
      const controlBoxShR = createControlBox("Control-FK-ShR", 0xffff00, [0.08, 0.08, 0.08])
      nodes["DEF-shoulderL"].add(controlBoxShL)
      nodes["DEF-shoulderR"].add(controlBoxShR)
      controlBoxShL.userData = { control: nodes["DEF-shoulderL"] }
      controlBoxShR.userData = { control: nodes["DEF-shoulderR"] }
      fkControls.current.push(controlBoxShL)
      fkControls.current.push(controlBoxShR)
    }

    if (bonesChest) {
      const controlBoxChL = createControlBox("Control-FK-ChL", 0xffff00, [0.08, 0.08, 0.08])
      const controlBoxChR = createControlBox("Control-FK-ChR", 0xffff00, [0.08, 0.08, 0.08])
      nodes["DEF-breastL"].add(controlBoxChL)
      nodes["DEF-breastR"].add(controlBoxChR)
      controlBoxChL.userData = { control: nodes["DEF-breastL"] }
      controlBoxChR.userData = { control: nodes["DEF-breastR"] }
      fkControls.current.push(controlBoxChL)
      fkControls.current.push(controlBoxChR)
    }

    if (rigType === "rigify") {
      const controlBoxEyeL = createControlBox("Control-FK-EyeL", 0xffff00, [0.02, 0.02, 0.02])
      const controlBoxEyeR = createControlBox("Control-FK-EyeR", 0xffff00, [0.02, 0.02, 0.02])
      //const controlJaw = createControlBox("Control-FK-Jaw", 0xffff00, [0.02, 0.02, 0.02])
      nodes["DEF-eyeL"].add(controlBoxEyeL)
      nodes["DEF-eyeR"].add(controlBoxEyeR)
      //nodes["DEF-jaw_master"].add(controlJaw)
      controlBoxEyeL.userData = { control: nodes["DEF-eyeL"] }
      controlBoxEyeR.userData = { control: nodes["DEF-eyeR"] }
      //controlJaw.userData = { control: nodes["DEF-jaw_master"] }
      fkControls.current.push(controlBoxEyeL)
      fkControls.current.push(controlBoxEyeR)
      //fkControls.current.push(controlJaw)
    }

    fkControls.current.forEach( fk => {
      fk.scale.setScalar(controlSize)
    })

    hideControls(controlsHidden)

    transformControlsRef.current.attach(nodes["rig"])

    nodes["rig"].position.set(...position)
    nodes["rig"].rotation.set(...rotation)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, position, scene])

  // Raycasting
  useEffect(()=>{
    const onPointerDown = (event) => {
      if (event.button === 0) {
        lmbHoldTime.current = Date.now()
      }
    }
    const onPointerUp = (event) => {
      //console.log(event)

      if (event.button === 0) {
        const duration = Date.now() - lmbHoldTime.current
        if (duration > 450) return

        mouse.current.x = (event.clientX / event.srcElement.width) * 2 - 1
        mouse.current.y = -(event.clientY / event.srcElement.height) * 2 + 1
        raycaster.current.setFromCamera(mouse.current, camera)

        console.log(event.srcElement, mouse.current.x, mouse.current.y)

        const intersects = raycaster.current.intersectObjects(scene.children, true)
        for (let i=0; i < intersects.length; i++) {
          const intersected = intersects[i].object
          //console.log("clicked", intersected.name)

          if (clogObj) {
            console.log(intersected.name, intersected)
          }
          if (clogMat) {
            console.log(intersected.name, intersected.material)
          }
          if (clogCol) {
            console.log(intersected.name, intersected.material.color)
          }

          if (intersected.userData.control) {
            const control = intersected.userData.control
            transformControlsRef.current.attach(control)

            if (hideCtrlOnDblClick) {
              //setControlsHidden(false)
              hideControls(false)
            }

            if (intersected.name.includes("FK-Rig")) {
              transformControlsRef.current.mode = "translate"
              intersected.visible = true
            }
            else if (intersected.name.includes("FK")) {
              transformControlsRef.current.mode = "rotate"
            }
            break
          }
        }
      }
    }

    const canvas = canvasRef.current
    canvas.addEventListener("pointerup", onPointerUp)
    canvas.addEventListener("pointerdown", onPointerDown)

    return () => {
      canvas.removeEventListener("pointerup", onPointerUp)
      canvas.addEventListener("pointerdown", onPointerDown)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, scene.children, clogObj, clogMat, clogCol])

  // Check for character body
  const getCharacter = () => {
    let character = ""
    if (nodes["Char"]?.visible) character = "Char"
    if (nodes["char"]?.visible) character = "char"
    if (nodes["character"]?.visible) character = "character"
    if (nodes["male"]?.visible) character = "male"
    if (nodes["female"]?.visible) character = "female"
    if (nodes["Adam"]?.visible) character = "Adam"
    if (nodes["Ana"]?.visible) character = "Ana"
    if (nodes["AnaGen"]?.visible) character = "AnaGen"
    if (preset?.charNode) character = preset.charNode

    return character
  }

  // Character Presets
  useEffect(() => {
    Object.keys(nodes).forEach(meshName => {
      const node = nodes[meshName]
      if (node.type !== "Mesh" && node.type !== "Group" && node.type !== "SkinnedMesh") return
      node.castShadow = true
    })

    if (!preset) {
      setUpdateLeva(prev => !prev)
      return
    }

    if (preset.hidden) {
      preset.hidden.forEach( v => {
        if (nodes[v]) nodes[v].visible = false
      })
    }

    setUpdateLeva(prev => !prev)
    
  }, [nodes, preset, materials])

  // Mesh Visibility
  useControls(
    () => {
      if (updateLeva === null) return {}
      //debugger
      const controls = {}
      const folderControls = {}
      //console.log("LEVA Mesh Visibility Ctrls ENTERED")
      const character = getCharacter()

      Object.keys(nodes).forEach(meshName => {
        const node = nodes[meshName]
	if (!node) return
        if (node.type !== "Mesh" && node.type !== "Group" && node.type !== "SkinnedMesh") return
        if (node.type !== "Group" && node.parent?.type === "Group") {
          if (node.parent.name !== "Ana" && node.parent.name !== "AnaGen" && node.parent.name !== "Adam" && node.parent.name !== character) return
        }
        
        folderControls[meshName] = {
          label: `${meshName}`,
          value: node.visible,
          onChange: (value) => {
	    if (!node) return
            node.visible = value
          }
        }
      })

      controls["Characters"] = folder({
        [`${name}-${index}`]: folder({
          'Meshes': folder(folderControls, { collapsed: true })
        }, { collapsed: true })
      })
      return controls
    },
    [updateLeva]
  )

  // Morph Controls
  useControls(
    () => {
      if (updateLeva === null) return {}
      const controls = {}
      const folderControls = {}
      //console.log("Leva Morph Controls entered")

      const character = getCharacter()
      if (character === "") return {}

      // If character contains sub meshes apply morphs to those as well
      if (nodes[character].type !== "Group") {
        const morphs = nodes[character].morphTargetDictionary
        if (!morphs) return {}
      
        Object.keys(morphs).forEach(morphName => {
          folderControls[morphName] = {
            label: `${morphName}`,
            value: nodes[character].morphTargetInfluences[nodes[character].morphTargetDictionary[morphName]],
            min: 0,
            max: 1,
            onChange: (value) => {
              nodes[character].morphTargetInfluences[nodes[character].morphTargetDictionary[morphName]] = value
            }
          }
        })      
      }
      else {
        const morphs = nodes[character].children[0].morphTargetDictionary
        if (!morphs) return {}

        Object.keys(morphs).forEach(morphName => {
          folderControls[morphName] = {
            label: `${morphName}`,
            value: nodes[character].children[0].morphTargetInfluences[nodes[character].children[0].morphTargetDictionary[morphName]],
            min: 0,
            max: 1,
            onChange: (value) => {
              nodes[character].children.forEach(child => {
                child.morphTargetInfluences[child.morphTargetDictionary[morphName]] = value
              })
            }
          }
        })
      }

      controls["Characters"] = folder({
        [`${name}-${index}`]: folder({
          'Morphs': folder(folderControls, { collapsed: true })
        }, { collapsed: true })
      })

      return controls
    },
    [updateLeva]
  )

  // Delete Character
  useControls("Characters", {
    [`${name}-${index}`]: folder({
      "Delete": button(()=>{
        deleteCharacter(id)
      }) 
    })
  })

  // Skin Texture
  useControls(
    () => {
      if (updateLeva === null) return {}
      //console.log("Leva Skin Ctrls Entered")
      //debugger

      const controls = {}
      const folderControls = {}
      const skinMaterials = []
      const skinNames = []

      const char = getCharacter()
      if (char === "") return {}
      
      // Get skin textures
      const charNode = nodes[char]
      if (charNode.type === "Group") {
        charNode.children.forEach(child => {
          if (skinNames.includes(child.material.map.name)) return
          skinMaterials.push(child.material)
          skinNames.push(child.material.map.name)
        })
      } else {
	return {}
      }

      // Apply preset skin if there is one
      if (preset.charNode && preset.skinIndex) {
        const charNode = nodes[preset.charNode]
        if (charNode && charNode.type === "Group") {
          charNode.children.forEach( ch => {
            ch.material = charNode.children[preset.skinIndex].material
          })
        }
      }

      // Apply to this char model and determine if it is a Group or Skinned Mesh
      const val = nodes[char].type === "Group"
      ? 
      nodes[char].children[0].material.map.name
      :
      nodes[char].material.map.name

      folderControls["Texture"] = {
        label: `Texture`,
        value: val,
        options: skinNames,
        onChange: (value) => {
          if (value === "") return
          const i = skinNames.indexOf(value)

          if (nodes[char].type === "Group") {
            nodes[char].children.forEach( (ch, index) => {
	      if (skinSlot.current === -1 || skinSlot.current === index) ch.material = skinMaterials[i]
            })
          }
          else {
            nodes[char].material = skinMaterials[index]
          }
        }
      }

      folderControls["Slot"] = {
        label: "Slot",
	value: -1,
	options: [-1,0,1,2,3,4],
	onChange: (value) => {
	  //setSkinSlot(value)
	  skinSlot.current = value
	}
      }

      controls["Characters"] = folder({
        [`${name}-${index}`] : folder({
          'Skin': folder(folderControls, { collapsed: true })
        }, { collapsed: true })
      })

      //console.log("Skin Ctrls Finished")

      return controls
    },
    [updateLeva]
  )

  // Poses
  const handlePoseChange = (pose) => {
    if (pose === "") return

    if (presetPoses[pose] == "log") {
      const bones = []
      fkControls.current.forEach(ctrl => {
        const bone = ctrl.userData.control
        bones.push({name: bone.name, rotation: bone.rotation})
      })
      console.log({"LogPose": bones})
      return
    }

    // Apply Pose
    presetPoses[pose].forEach(p => {
      const node = nodes[p.name]
      if (!node) return
      
      node.rotation.setFromVector3(new THREE.Vector3(p.rotation._x, p.rotation._y, p.rotation._z))
    })
    
  }
  useControls(`Characters`, {
    [`${name}-${index}`]: folder({
      Poses: {
        label: "Poses",
        value: '',
        options: Object.keys(presetPoses),
        onChange: handlePoseChange
      }
    })
  }, { collapsed: false })

  return (
    <group>
      <primitive object={scene} dispose={null} />
    </group>
  )
}

export default Character
