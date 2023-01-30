import React, { ReactElement } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'

const UnityEngine = (props: { game: string }): ReactElement => {
  const { unityProvider } = useUnityContext({
    loaderUrl: `/games/${props.game}/file?type=loader`,
    dataUrl: `/games/${props.game}/file?type=data`,
    frameworkUrl: `/games/${props.game}/file?type=framework`,
    codeUrl: `/games/${props.game}/file?type=wasm`
  })

  return (
    <Unity unityProvider={unityProvider}
    style={{ width: '100%', height: '100%', margin: '0', padding: '0' }} />
  )
}

export default UnityEngine
