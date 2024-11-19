import glbBio from "./HumanoidCellsPoser.glb?url"
import glbProps from "./CellProps.glb?url"
import poses from "../poses.json"

export const presetModels = {
  Survivor: {
    url: glbBio,
    preset: {
      hidden: [],
      show: ["Survivor"],
      showContains: ["Gown", "S-"],
      charNode: "Survivor",
      skinIndex: 0,
    }
  },
  SurvivorAlt: {
    url: glbBio,
    preset: {
      hidden: [],
      show: ["SurvivorGen", ],
      showContains: ["Scuba-", "S-Hair-"],
      charNode: "SurvivorGen",
      skinIndex: 0,
    }
  },
  CellF: {
    url: glbBio,
    preset: {
      hidden: [],
      show: ["CellF", ],
      showContains: ["Hair-Parted"],
      charNode: "CellF",
      skinIndex: 0,
    }
  },
  CellM: {
    url: glbBio,
    preset: {
      hidden: [],
      show: ["CellM"],
      showContains: [],
      charNode: "CellM",
      skinIndex: 0,
    }
  },
  RBC: {
    url: glbBio,
    preset: {
      hidden: [],
      show: [],
      showContains: ["RBC"],
      charNode: "RBC",
      skinIndex: 0,
    }
  },
  Neutrophil: {
    url: glbBio,
    preset: {
      hidden: [],
      show: [],
      showContains: ["Neutro"],
      charNode: "Neutrophil",
      skinIndex: 0,
    }
  },
  Macrophage: {
    url: glbBio,
    preset: {
      hidden: [],
      show: [],
      showContains: ["Macrophage"],
      charNode: "Macrophage",
      skinIndex: 0,
    }
  },
  NaturalKiller: {
    url: glbBio,
    preset: {
      hidden: [],
      show: [],
      showContains: ["NKC"],
      charNode: "NKCell",
      skinIndex: 0,
    }
  },
  BNaive: {
    url: glbBio,
    preset: {
      hidden: [],
      show: [],
      showContains: ["BNaive"],
      charNode: "BNaive",
      skinIndex: 0,
    }
  },
  BPlasma: {
    url: glbBio,
    preset: {
      hidden: [],
      show: [],
      showContains: ["BPlasma"],
      charNode: "BPlasma",
      skinIndex: 0,
    }
  },
  BMemory: {
    url: glbBio,
    preset: {
      hidden: [],
      show: [],
      showContains: ["BMemory"],
      charNode: "BMemory",
      skinIndex: 0,
    }
  },
  TKiller: {
    url: glbBio,
    preset: {
      hidden: [],
      show: [],
      showContains: ["TKiller"],
      charNode: "TKiller",
      skinIndex: 0,
    }
  },
  THelper: {
    url: glbBio,
    preset: {
      hidden: [],
      show: [],
      showContains: ["THelper"],
      charNode: "THelper",
      skinIndex: 0,
    }
  },
  StaphAureus: {
    url: glbBio,
    preset: {
      hidden: [],
      show: [],
      showContains: ["StaphAureus"],
      charNode: "StaphAureus",
      skinIndex: 0,
    }
  },
}

export const presetProps = {
  Antibody: {
    url: glbProps,
    preset: {
      hidden: ["SHOW"],
      show: ["Antibody"],
      mainNode: "Antibody",
    }
  },
  Cytokine: {
    url: glbProps,
    preset: {
      hidden: ["SHOW"],
      show: ["Cytokine"],
      mainNode: "Cytokine",
    }
  },
  GranzymeBomb: {
    url: glbProps,
    preset: {
      hidden: ["SHOW"],
      show: ["GranzymeBomb"],
      mainNode: "GranzymeBomb",
    }
  },
  ROS: {
    url: glbProps,
    preset: {
      hidden: ["SHOW"],
      show: ["ROS"],
      mainNode: "ROS",
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
