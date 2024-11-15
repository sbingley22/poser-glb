import glbCyber from "./EdgeRunners.glb?url"
import glbPunks from "./Punks.glb?url"
import glbProps from "./cyberpunkProps.glb?url"
import hdr from "./hotelcell.hdr?url"
import bgAfterlife from "./bgafterlife1.jpg"
import bgCyberpunkCity from "./bgcyberpunkcity.jpg"
import imgAdamSmasher from "./imgAdamSmasher.png"
import poses from "../poses.json"

export const presetModels = {
  V: {
    url: glbCyber,
    preset: {
      hidden: [
        "david", "davidBoots", "davidHair", "davidJacket", "davidPistol", "davidPants",
        "kiwi", "kiwiDress", "kiwiHair", 
        "lucy", "lucyBoots", "lucyHair", "lucyJacket", "lucyPistol", 
        "maine", "maineCannon", "maineGlasses", "maineHair", "maineJacket",
        "rebecca", "rebeccaArms", "rebeccaHair", "rebeccaJacket", "rebeccaShoes", "rebeccaShotgun",
        "vFemShotgun",
      ],
      charNode: "vFem",
      skinIndex: 0,
    }
  },
  David: {
    url: glbCyber,
    preset: {
      hidden: [
        "kiwi", "kiwiDress", "kiwiHair", 
        "lucy", "lucyBoots", "lucyHair", "lucyJacket", "lucyPistol", 
        "maine", "maineCannon", "maineGlasses", "maineHair", "maineJacket",
        "rebecca", "rebeccaArms", "rebeccaHair", "rebeccaJacket", "rebeccaShoes", "rebeccaShotgun",
        "vFem", "vFemBoots", "vFemHair", "vFemJacket", "vFemPistol", "vFemShotgun",
      ],
      charNode: "david",
      skinIndex: 0,
    }
  },
  Lucy: {
    url: glbCyber,
    preset: {
      hidden: [
        "david", "davidBoots", "davidHair", "davidJacket", "davidPistol", "davidPants",
        "kiwi", "kiwiDress", "kiwiHair", 
        "maine", "maineCannon", "maineGlasses", "maineHair", "maineJacket",
        "rebecca", "rebeccaArms", "rebeccaHair", "rebeccaJacket", "rebeccaShoes", "rebeccaShotgun",
        "vFem", "vFemBoots", "vFemHair", "vFemJacket", "vFemPistol", "vFemShotgun",
      ],
      charNode: "lucy",
      skinIndex: 0,
    }
  },
  Rebecca: {
    url: glbCyber,
    preset: {
      hidden: [
        "david", "davidBoots", "davidHair", "davidJacket", "davidPistol", "davidPants",
        "kiwi", "kiwiDress", "kiwiHair", 
        "lucy", "lucyBoots", "lucyHair", "lucyJacket", "lucyPistol", 
        "maine", "maineCannon", "maineGlasses", "maineHair", "maineJacket",
        "vFem", "vFemBoots", "vFemHair", "vFemJacket", "vFemPistol", "vFemShotgun",
      ],
      charNode: "rebecca",
      skinIndex: 0,
    }
  },
  Maine: {
    url: glbCyber,
    preset: {
      hidden: [
        "david", "davidBoots", "davidHair", "davidJacket", "davidPistol", "davidPants",
        "kiwi", "kiwiDress", "kiwiHair", 
        "lucy", "lucyBoots", "lucyHair", "lucyJacket", "lucyPistol", 
        "rebecca", "rebeccaArms", "rebeccaHair", "rebeccaJacket", "rebeccaShoes", "rebeccaShotgun",
        "vFem", "vFemBoots", "vFemHair", "vFemJacket", "vFemPistol", "vFemShotgun",
      ],
      charNode: "maine",
      skinIndex: 0,
    }
  },
  Kiwi: {
    url: glbCyber,
    preset: {
      hidden: [
        "david", "davidBoots", "davidHair", "davidJacket", "davidPistol", "davidPants",
        "lucy", "lucyBoots", "lucyHair", "lucyJacket", "lucyPistol", 
        "maine", "maineCannon", "maineGlasses", "maineHair", "maineJacket",
        "rebecca", "rebeccaArms", "rebeccaHair", "rebeccaJacket", "rebeccaShoes", "rebeccaShotgun",
        "vFem", "vFemBoots", "vFemHair", "vFemJacket", "vFemPistol", "vFemShotgun",
      ],
      charNode: "kiwi",
      skinIndex: 0,
    }
  },
  PunkA: {
    url: glbPunks,
    preset: {
      hidden: [],
      charNode: "Punk1",
      skinIndex: 0,
    }
  },
}

export const presetProps = {
  Car: {
    url: glbProps,
    preset: {
      hidden: ["dumpster", "motorcycle"],
      mainNode: "car",
    }
  },
  Motorcycle: {
    url: glbProps,
    preset: {
      hidden: ["car", "dumpster"],
      mainNode: "motorcycle",
    }
  },
  Dumpster: {
    url: glbProps,
    preset: {
      hidden: ["car", "motorcycle"],
      mainNode: "dumpster",
    }
  },
}

export const presetEnviroments = {
  environment: "city"
}

export const hdrTexture = hdr

export const presetImgs = {
  "BG-Afterlife": bgAfterlife,
  "BG-CyberPunk-City": bgCyberpunkCity,
  "Adam-Smasher": imgAdamSmasher,
}

export const presetPoses = poses