import React, { ReactElement } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'

const UnityEngine = (props: { title: string }): ReactElement => {
  const { unityProvider } = useUnityContext({
    loaderUrl: props.title !== '' ? `/games/file?title=${props.title}&type=loader` : '',
    dataUrl: props.title !== '' ? `/games/file?title=${props.title}&type=data` : '',
    frameworkUrl: props.title !== '' ? `/games/file?title=${props.title}&type=framework` : '',
    codeUrl: props.title !== '' ? `/games/file?title=${props.title}&type=wasm` : ''
  })

  return (
    <Unity unityProvider={unityProvider}
    style={{ width: '100%', height: '100%', margin: '0', padding: '0' }} />
  )
}

export default UnityEngine
