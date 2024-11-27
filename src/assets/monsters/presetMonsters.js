import glbMonsters from "./Monsters.glb?url"
import glbCemetry from "./WhitbyCemetry.glb?url"
import glbSurgicalRoom from "./ExperimentChamber.glb?url"
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
  Fran: {
    url: glbMonsters,
    preset: {
      hidden: [],
      show: ["Frany"],
      showContains: ["Frany", "Wheel"],
      charNode: "Frany",
    }
  },
  Frankenstien: {
    url: glbMonsters,
    preset: {
      hidden: [],
      show: ["Frank"],
      showContains: [],
      charNode: "Frank",
      noSkinTextures: true,
    }
  },
}

export const presetProps = {
  Cemetry: {
    url: glbCemetry,
    preset: {
      hidden: [],
    }
  },
  "Surgical Room": {
    url: glbSurgicalRoom,
    preset: {
      hidden: [],
    }
  },
}

export const presetEnviroments = {
  environment: "warehouse",
  show: false,
}

export const hdrTexture = null

export const presetImgs = {
}

export const presetPoses = poses