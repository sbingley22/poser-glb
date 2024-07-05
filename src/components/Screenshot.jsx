/* eslint-disable react/prop-types */
import { button, useControls } from 'leva'

const Screenshot = () => {
  useControls('Screenshot', {
    Clipboard: button(() => {
      handleScreenshot('clip')
    }),
    Save: button(() => {
      handleScreenshot('save')
    })
  }, { collapsed: true })

  const handleScreenshot = async (type) => {
    // Make sure canvas has:
    // <Canvas gl={{ preserveDrawingBuffer: true }} >
    const canvas = document.querySelector('canvas')

    if (type === 'clip') {
      canvas.toBlob((blob) => {
        // Copy the screenshot to the clipboard
        navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      }, 'image/png')
    } 
    else if (type === 'save') {
      canvas.toBlob((blob) => {
        const a = document.createElement('a')
        const url = URL.createObjectURL(blob)

        a.href = url
        a.download = 'screenshot.png'

        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)

        URL.revokeObjectURL(url)
      }, 'image/png')
    }
  }

  return <></>
}

export default Screenshot