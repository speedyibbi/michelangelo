/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Unity, useUnityContext } from 'react-unity-webgl'

const UnityEngine = (): ReactElement => {
  const { title } = useParams()
  const { unityProvider } = useUnityContext({
    loaderUrl: '/game/game.loader.js',
    dataUrl: '/game/game.data',
    frameworkUrl: '/game/game.framework.js',
    codeUrl: '/game/game.wasm'
  })

  // useEffect(() => {
  //   const getGame = async (): Promise<void> => {
  //     const response = await fetch(`/game/file?title=${title !== undefined ? title : ''}`, { method: 'GET' })
  //       .then(async (res) => await res.blob())
  //       .then((blob) => new File([blob], 'webgl.zip'))
  //       .then((file) => {
  //         const fileReader = new FileReader()
  //         fileReader.readAsArrayBuffer(file)
  //         fileReader.onload = () => console.log(fileReader.result)
  //       })
  //       // .then((res) => res.headers.forEach(function (val, key) { console.log(key + ' -> ' + val) }))
  //     // console.log(response)
  //   }
  //   void getGame()
  // }, [])

  return (
    <Unity unityProvider={unityProvider} style={{ width: '100%', height: '100%', margin: '0', padding: '0' }} />
  )
}

export default UnityEngine
