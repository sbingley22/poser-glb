/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei"
import glb from "../assets/char.glb?url"
import { useEffect, useRef, useState } from "react"
import { useThree } from "@react-three/fiber"
import * as THREE from 'three'
import { useSkinnedMeshClone } from "./SkinnedMeshClone"
import { button, folder, useControls } from "leva"

const Character = ({ id, char, index, position, rotation, controlsHidden, transformControlsRef, controlSize, deleteCharacter, bonesChest=true, bonesShoulder=true }) => {
  const { camera } = useThree()
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())
  const { scene, nodes, materials } = useSkinnedMeshClone(glb)
  const fkControls = useRef([])
  const lmbHoldTime = useRef(null)
  const [updateLeva, setUpdateLeva] = useState(null)

  const hideControls = () => {
    const b = controlsHidden
    if (b) {
      fkControls.current.forEach(fk => {
        fk.visible = false
      })
    }
    else {
      fkControls.current.forEach(fk => {
        fk.visible = true
      })
    }
  }

  // Show / Hide Controls
  useEffect(()=>{
    hideControls()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[controlsHidden])

  // Change Control Size
  useEffect(()=>{
    if (fkControls.current.length < 1) return

    fkControls.current.forEach( fk => {
      //console.log(fk)
      fk.scale.setScalar(controlSize)
    })
  },[controlSize])

  // Setup FK Controls
  useEffect(()=>{
    console.log(nodes, materials)

    if (fkControls.current.length > 0) return

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

    // Create controls
    const createControlBox = (name, color = 0xff0000, scale = [0.1,0.1,0.1]) => {
      const geometry = new THREE.BoxGeometry(...scale)
      const material = new THREE.MeshBasicMaterial({ color: color, wireframe: true, depthTest: false })
      const box = new THREE.Mesh(geometry, material)
      box.name = name
      return box
    }

    const controlBoxRig = createControlBox("Control-FK-Rig", 0x00ff00, [0.2,0.02,0.2])
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

    fkControls.current.forEach( fk => {
      fk.scale.setScalar(controlSize)
    })

    hideControls()

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

        mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
        raycaster.current.setFromCamera(mouse.current, camera)

        const intersects = raycaster.current.intersectObjects(scene.children, true)
        for (let i=0; i < intersects.length; i++) {
          const intersected = intersects[i].object
          //console.log("clicked", intersected.name)

          if (intersected.userData.control) {
            const control = intersected.userData.control
            transformControlsRef.current.attach(control)
            if (intersected.name.includes("FK-Rig")) {
              transformControlsRef.current.mode = "translate"
              //transformControlsRef.current.size = 1.0
            }
            else if (intersected.name.includes("FK")) {
              transformControlsRef.current.mode = "rotate"
              //transformControlsRef.current.size = 0.3
            }
            break
          }
        }
      }
    }

    window.addEventListener("pointerup", onPointerUp)
    window.addEventListener("pointerdown", onPointerDown)

    return () => {
      window.removeEventListener("pointerup", onPointerUp)
      window.addEventListener("pointerdown", onPointerDown)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, scene.children])

  // Character Presets
  useEffect(() => {
    Object.keys(nodes).forEach(meshName => {
      const node = nodes[meshName]
      if (node.type !== "Mesh" && node.type !== "Group" && node.type !== "SkinnedMesh") return
      node.castShadow = true
      
      if (node.type !== "Group" && node.parent?.type === "Group") return
      if (meshName === "Scene") return

      node.visible = false
    })

    if (char === "F Famer") {
      const visible = ["Ana", "Baggy", "ConeHat", "Shoes-Boots", "ShortShirt", "Wavy"]
      if (nodes["AnaGen"]) visible[0] = "AnaGen"
      const hidden = ["ana_2"]

      visible.forEach( v => {
        if (nodes[v]) nodes[v].visible = true
      })
      hidden.forEach( v => {
        if (nodes[v]) nodes[v].visible = false
      })

      const skinMat = "Ana.Top"
      if (materials[skinMat]) {
        nodes["Ana"].children.forEach( ch => {
          ch.material = materials[skinMat]
        })
      }
    }
    else if (char === "F Gladiator") {
      const visible = ["Ana", "PlateAbs", "PlateBoots", "PlateChest", "PlateForearms", "PlateShins", "PlateShoulder", "PlateThighs", "Shield", "Sword", "Wavy"]
      if (nodes["AnaGen"]) visible[0] = "AnaGen"
      const hidden = []

      visible.forEach( v => {
        if (nodes[v]) nodes[v].visible = true
      })
      hidden.forEach( v => {
        if (nodes[v]) nodes[v].visible = false
      })

      const skinMat = "Ana.Face"
      if (materials[skinMat]) {
        nodes["Ana"].children.forEach( ch => {
          ch.material = materials[skinMat]
        })
      }
    }
    else if (char === "M Agent") {
      const visible = ["Adam", "Pistol"]
      const hidden = []

      visible.forEach( v => {
        if (nodes[v]) nodes[v].visible = true
      })
      hidden.forEach( v => {
        if (nodes[v]) nodes[v].visible = false
      })

      const skinMat = "Adam.Bottom"
      if (materials[skinMat]) {
        nodes["Adam"].children.forEach( ch => {
          ch.material = materials[skinMat]
        })
      }
    }
    else if (char === "M Cyber") {
      const visible = ["Adam"]
      const hidden = []

      visible.forEach( v => {
        if (nodes[v]) nodes[v].visible = true
      })
      hidden.forEach( v => {
        if (nodes[v]) nodes[v].visible = false
      })

      const skinMat = "Adam.Top"
      if (materials[skinMat]) {
        nodes["Adam"].children.forEach( ch => {
          ch.material = materials[skinMat]
        })
      }
    }

    setUpdateLeva(prev => !prev)
    
  }, [nodes, char, materials])

  // Leva Mesh Controls
  useControls(
    () => {
      if (updateLeva === null) return {}
      const controls = {}
      const folderControls = {}
      //console.log("LEVA MESH CTRLS ENTERED")

      Object.keys(nodes).forEach(meshName => {
        const node = nodes[meshName]
        if (node.type !== "Mesh" && node.type !== "Group" && node.type !== "SkinnedMesh") return
        if (node.type !== "Group" && node.parent?.type === "Group") {
          if (node.parent.name !== "Ana" && node.parent.name !== "AnaGen" && node.parent.name !== "Adam") return
        }
        
        folderControls[meshName] = {
          label: `${meshName}`,
          value: node.visible,
          onChange: (value) => {
            node.visible = value
          }
        }
      })

      controls["Characters"] = folder({
        [`C-${index}`]: folder({
          'Visibility': folder(folderControls, { collapsed: true })
        }, { collapsed: true })
      })
      return controls
    },
    [updateLeva]
  )

  // Leva Morph Controls
  useControls(
    () => {
      if (updateLeva === null) return {}
      const controls = {}
      const folderControls = {}

      let character = "Ana"
      if (nodes["Adam"]?.visible) character = "Adam"
      if (nodes["AnaGen"]?.visible) character = "AnaGen"

      // If character contains sub meshes apply morphs to those as well
      if (nodes[character].type !== "Group") {
        const morphs = nodes[character].morphTargetDictionary
      
        Object.keys(morphs).forEach(morphName => {
          folderControls[morphName] = {
            label: `${morphName}`,
            value: 0,
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
      
        Object.keys(morphs).forEach(morphName => {
          folderControls[morphName] = {
            label: `${morphName}`,
            value: 0,
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
        [`C-${index}`]: folder({
          'Morphs': folder(folderControls, { collapsed: true })
        }, { collapsed: true })
      })
      return controls
    },
    [updateLeva]
  )

  useControls("Characters", {
    [`C-${index}`]: folder({
      "Delete": button(()=>{
        deleteCharacter(id)
      }) 
    })
  })

  // Leva Skin Controls
  useControls(
    () => {
      if (updateLeva === null) return {}

      const controls = {}
      const folderControls = {}
      const skinMaterials = []
      const skinNames = []

      // Get relevant skin textures
      Object.keys(materials).forEach(matName => {
        if (matName.includes("Ana") || matName.includes("Adam")) {
          const mat = materials[matName]
          const mapName = mat.map.name.replace('BaseColor.1001', '').replace('Skin', '')
          if (skinNames.includes(mapName)) return

          skinMaterials.push(mat)
          skinNames.push(mapName)
        }        
      })

      // Apply to this char model and determine if it is a Group or Skinned Mesh
      const char = nodes["Ana"].visible ? "Ana" : nodes["AnaGen"]?.visible ? "AnaGen" : "Adam"
      const val = nodes[char].type === "Group"
      ? 
      nodes[char].children[0].material.map.name.replace('BaseColor.1001', '').replace('Skin', '')
      :
      nodes[char].material.map.name.replace('BaseColor.1001', '').replace('Skin', '')

      folderControls["Texture"] = {
        label: `Texture`,
        value: val,
        options: skinNames,
        onChange: (value) => {
          if (value === "") return
          const index = skinNames.indexOf(value)

          if (nodes[char].type === "Group") {
            nodes[char].children.forEach( ch => {
              ch.material = skinMaterials[index]
            })
          }
          else {
            nodes[char].material = skinMaterials[index]
          }
        }
      }

      controls["Characters"] = folder({
        [`C-${index}`] : folder({
          'Skin': folder(folderControls, { collapsed: true })
        }, { collapsed: true })
      })

      return controls
    },
    [updateLeva]
  )

  return (
    <group>
      <primitive object={scene} dispose={null} />
    </group>
  )
}

export default Character

useGLTF.preload(glb)