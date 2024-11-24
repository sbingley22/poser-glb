import glbMonsters from "./Monsters.glb?url"
import glbCemetry from "./WhitbyCemetry.glb?url"
import poses from "../poses.json"

export const presetModels = {
  Razelle: {
    url: glbMonsters,
    preset: {
      hidden: [],
      show: ["Razelle"],
      showContains: ["Razelle"],
      charNode: "Razelle",
    }
  },
  Raziel: {
    url: glbMonsters,
    preset: {
      hidden: [],
      show: ["Raziel"],
      showContains: ["Raziel"],
      charNode: "Raziel",
    }
  },
}

export const presetProps = {
  Cemetry: {
    url: glbCemetry,
    preset: {
      hidden: [],
      // mainNode: "Church",
    }
  },
}

export const presetEnviroments = {
  environment: "night",
  show: false,
}

export const hdrTexture = null

export const presetImgs = {
}

export const presetPoses = poses