import glbFem from "./basic.glb?url"
import glbFemSD from "./basicSD.glb?url"
import glbMale from "./basicMale.glb?url"
import poses from "../poses.json"

export const presetModels = {
  FemaleSD: {
    url: glbFemSD,
    preset: {
      hidden: [],
      charNode: "AnaGenSD",
      skinIndex: 3,
    }
  },
  Female: {
    url: glbFem,
    preset: {
      hidden: [],
      charNode: "AnaGen",
      skinIndex: 3,
    }
  },
  Male: {
    url: glbMale,
    preset: {
      hidden: [],
      charNode: "Adam",
      skinIndex: 0,
    }
  },
}

export const presetProps = {
}

export const presetEnviroments = {
  environment: "warehouse",
  show: false,
}

export const hdrTexture = null

export const presetImgs = {
}

export const presetPoses = poses
