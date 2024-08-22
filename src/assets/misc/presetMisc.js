import glbFarmer from "./farmer.glb?url"
import glbShark from "./shark.glb?url"
import poses from "../poses.json"

export const presetModels = {
  Farmer: {
    url: glbFarmer,
    preset: {
      hidden: ["ana_2", "PlateForearms", "PlateShoulder"],
      charNode: "Ana",
      skinIndex: 0,
    }
  },
  Shark: {
    url: glbShark,
    preset: {
      hidden: [],
      charNode: "Shark",
      skinIndex: 0,
    }
  },
}

export const presetProps = {
}

export const presetEnviroments = {
  environment: "forest"
}

export const hdrTexture = null

export const presetImgs = {
}

export const presetPoses = poses