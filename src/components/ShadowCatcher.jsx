/* eslint-disable react/no-unknown-property */

const ShadowCatcher = (props) => {
  return (
    <mesh
      {...props}
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry attach="geometry" args={[10, 10]} />
      <shadowMaterial attach="material" opacity={0.8} transparent />
    </mesh>
  )
}

export default ShadowCatcher
