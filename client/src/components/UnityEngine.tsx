import React, { ReactElement } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'

const UnityEngine = (): ReactElement => {
  const { unityProvider } = useUnityContext({
    loaderUrl: '/game/game.loader.js',
    dataUrl: '/game/game.data',
    frameworkUrl: '/game/game.framework.js',
    codeUrl: '/game/game.wasm'
  })

  return (
    <Unity unityProvider={unityProvider} style={{ width: '100%', height: '100%', margin: '0', padding: '0' }} />
  )
}

export default UnityEngine
