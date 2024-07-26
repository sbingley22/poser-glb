/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from "react"
import { useThree } from "@react-three/fiber"
import * as THREE from 'three'
import { useSkinnedMeshClone } from "./SkinnedMeshClone"
import { button, folder, useControls } from "leva"

const Items = ({ id, url, index, preset, name, canvasRef, transformControlsRef, clogObj, clogMat, clogCol, deleteProp }) => {
  const groupRef = useRef()
  const { camera } = useThree()
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())
  const { scene, nodes } = useSkinnedMeshClone(url)
  const lmbHoldTime = useRef(null)
  // eslint-disable-next-line no-unused-vars
  const [updateLeva, setUpdateLeva] = useState(null)

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
        
        // Only select images if nothing else is selected
        if (transformControlsRef.current.object) return

        mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
        raycaster.current.setFromCamera(mouse.current, camera)

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

          transformControlsRef.current.attach(groupRef.current)
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

  // Prop Presets
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
        if (nodes[v]) { 
          nodes[v].visible = false
          nodes[v].frustumCulled = false
        }
      })
    }

    setUpdateLeva(prev => !prev)
    
  }, [nodes, preset])

  // Delete Item
  useControls("Props", {
    [`${name}-${index}`]: folder({
      "Delete": button(()=>{
        deleteProp(id)
      }) 
    })
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} dispose={null} />
    </group>
  )
}

export default Items