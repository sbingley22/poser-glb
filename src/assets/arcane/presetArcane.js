import glbArcane from "./arcane.glb?url"
import poses from "../poses.json"

export const presetModels = {
  Jinx: {
    url: glbArcane,
    preset: {
      hidden: ["ViBody", "ViHair", "ViHead"],
      charNode: "jinxBody",
    }
  },
  Vi: {
    url: glbArcane,
    preset: {
      hidden: ["jinxBody", "jinxHair", "jinxHead"],
      charNode: "ViBody",
    }
  },
}

export const presetProps = {}

export const presetEnviroments = {
  environment: "sunset",
}

export const hdrTexture = null

export const presetImgs = {
}

export const presetPoses = poses
