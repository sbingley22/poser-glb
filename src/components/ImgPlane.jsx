/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { TextureLoader } from 'three';

const ImgPlane = ({ imageUrl, position, width, height, imgLock, imgsVisible, transformControlsRef }) => {
  const texture = useLoader(TextureLoader, imageUrl)
  const meshRef = useRef()

  const clicked = () => {
    if (imgLock) return

    // Only select images if nothing else is selected
    if (transformControlsRef.current.object) return

    transformControlsRef.current.attach(meshRef.current)
  }

  useEffect(()=>{
    if (!meshRef.current) return
    meshRef.current.userData = { url: imageUrl }
  },[imageUrl, meshRef])

  useEffect(()=>{
    if (!meshRef) return
    if (imgsVisible) meshRef.current.visible = true
    else meshRef.current.visible = false
  },[imgsVisible])
  
  return (
    <mesh 
      ref={meshRef}
      position={position}
      onClick={clicked}
      name="ImgPlane"
    >
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent={true} alphaTest={0.5} />
    </mesh>
  );
}

export default ImgPlane
