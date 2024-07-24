import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Pixelation,
  SSAO,
  Sepia,
  Vignette,
} from '@react-three/postprocessing'
import { useControls } from "leva"

const PostProcess = () => {
  const { pixelate, noiseValue, chromaticValue, sepiaValue, vignetteOffset, vignetteStrength, bloom, ssaoIntensity } = useControls('Compositor', {
    pixelate: {
      label: 'Pixelate',
      value: 0,
      min: 0,
      max: 12,
      step: 1
    },
    noiseValue: {
      label: 'Noise',
      value: 0,
      min: 0,
      max: 0.4,
      step: 0.01
    },
    chromaticValue: {
      label: 'Chromatic',
      value: false
    },
    sepiaValue: {
      label: 'Sepia',
      value: 0,
      min: 0,
      max: 1,
      step: 0.1
    },
    vignetteOffset: {
      label: 'Vignette Offset',
      value: 0,
      min: 0,
      max: 1,
      step: 0.1
    },
    vignetteStrength: {
      label: 'Vignette Strength',
      value: 0,
      min: 0,
      max: 1,
      step: 0.1
    },
    bloom: {
      label: 'Bloom',
      value: 0,
      min: 0,
      max: 1,
      step: 0.1
    },
    ssaoIntensity: {
      label: 'SSAO',
      value: 0,
      min: 0,
      max: 50,
      step: 1
    },
  }, { collapsed: true })

  return (
    <EffectComposer depthBuffer autoClear={false} enableNormalPass>
      <Noise opacity={noiseValue} />
      <Pixelation granularity={pixelate} />
      <ChromaticAberration offset={chromaticValue ? [0.001, 0.001] : [0, 0]} />
      <Sepia intensity={sepiaValue} />
      <Vignette offset={vignetteOffset} darkness={vignetteStrength} />
      <Bloom intensity={bloom} />
      <SSAO
        samples={31}
        radius={5}
        intensity={ssaoIntensity}
      />
    </EffectComposer>
  )
}

export default PostProcess