import glbRe2 from "./re2.glb?url"
import poses from "../poses.json"
import bgPoliceStation from "./bgPoliceOffice.jpg"
import bgUnderground from "./bgUnderground.jpg"

export const presetModels = {
  Claire: {
    url: glbRe2,
    preset: {
      hidden: ["leon", "EM12B"],
      charNode: "claire",
    }
  },
  Leon: {
    url: glbRe2,
    preset: {
      hidden: ["claire", "EM12B"],
      charNode: "leon",
    }
  },
  EM12B: {
    url: glbRe2,
    preset: {
      hidden: ["claire", "leon"],
      charNode: "EM12B",
    }
  },
}

export const presetProps = {}

export const presetEnviroments = {
  environment: "night"
}

export const hdrTexture = null

export const presetImgs = {
  "BG-PoliceStation": bgPoliceStation,
  "BG-Underground": bgUnderground,
}

export const presetPoses = poses