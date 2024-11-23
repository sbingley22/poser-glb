import glbRe2 from "./re2.glb?url"
import glbRe from "./poserRE.glb?url"
import poses from "../poses.json"
import bgPoliceStation from "./bgPoliceOffice.jpg"
import bgUnderground from "./bgUnderground.jpg"

export const presetModels = {
  Jill: {
    url: glbRe,
    preset: {
      hidden: [],
      show: ["Ana", "Pistol", "JacketShort", "Hair-Parted", "Shoes-HighTops"],
      showContains: [],
      charNode: "Ana",
    }
  },
  Leon: {
    url: glbRe,
    preset: {
      hidden: [],
      show: ["Leon", "Pistol"],
      showContains: [],
      charNode: "Leon",
    }
  },
  "Z Fem": {
    url: glbRe,
    preset: {
      hidden: [],
      show: ["ZFem"],
      showContains: [],
      charNode: "ZFem",
    }
  },
  "Z Male": {
    url: glbRe,
    preset: {
      hidden: [],
      show: ["ZMale"],
      showContains: [],
      charNode: "ZMale",
    }
  },
  Claire: {
    url: glbRe2,
    preset: {
      hidden: ["leon", "EM12B"],
      charNode: "claire",
    }
  },
  "Leon 2": {
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
  environment: "warehouse",
  show: false,
}

export const hdrTexture = null

export const presetImgs = {
  "BG-PoliceStation": bgPoliceStation,
  "BG-Underground": bgUnderground,
}

export const presetPoses = poses