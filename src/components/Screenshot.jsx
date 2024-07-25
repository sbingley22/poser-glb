/* eslint-disable react/prop-types */
import { useThree } from '@react-three/fiber'
import { button, useControls } from 'leva'
import { useState } from 'react';
import * as THREE from 'three';

const Screenshot = () => {
  const { camera } = useThree()
  const [savedPosition, setSavedPosition] = useState(new THREE.Vector3())
  const [savedRotation, setSavedRotation] = useState(new THREE.Euler())

  const saveCameraPosition = () => {
    setSavedPosition(camera.position.clone())
    setSavedRotation(camera.rotation.clone())
  }
  const resetCameraPosition = () => {
    camera.position.copy(savedPosition)
    camera.rotation.copy(savedRotation)
  }

  useControls('Screenshot', {
    Clipboard: button(() => {
      handleScreenshot('clip')
    }),
    "Save Img": button(() => {
      handleScreenshot('save')
    }),
    SaveCameraPosition: button(saveCameraPosition),
    ResetCameraPosition: button(resetCameraPosition),
  }, { collapsed: true }, [savedPosition, savedRotation])

  const handleScreenshot = async (type) => {
    // Make sure canvas has:
    // <Canvas gl={{ preserveDrawingBuffer: true }} >
    const canvas = document.querySelector('canvas')

    if (type === 'clip') {
      canvas.toBlob((blob) => {
        // Copy the screenshot to the clipboard
        navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      }, 'image/png')
    } 
    else if (type === 'save') {
      canvas.toBlob((blob) => {
        const a = document.createElement('a')
        const url = URL.createObjectURL(blob)

        a.href = url
        a.download = 'screenshot.png'

        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)

        URL.revokeObjectURL(url)
      }, 'image/png')
    }
  }

  return
}

export default Screenshot