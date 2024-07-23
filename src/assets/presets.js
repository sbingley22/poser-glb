import glbFarmer from "./farmer.glb?url"
import glbCyber from "./cyber.glb?url"
import hdr from "./hotelcell.hdr?url"

export const presetModels = {
  Farmer: {
    url: glbFarmer,
    preset: {
      hidden: ["ana_2", "PlateForearms", "PlateShoulder"],
      charNode: "Ana",
      skinIndex: 0
    }
  },
  Cyber: {
    url: glbCyber
  }
}

export const presetEnviroments = {
  environment: "forest"
}

export const hdrTexture = hdr