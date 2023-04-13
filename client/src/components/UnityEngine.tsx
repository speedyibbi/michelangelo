/* eslint-disable no-tabs */
import React, { ReactElement } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'

const UnityEngine = (props: { game: string }): ReactElement => {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: `/games/${props.game}/file?type=loader`,
    dataUrl: `/games/${props.game}/file?type=data`,
    frameworkUrl: `/games/${props.game}/file?type=framework`,
    codeUrl: `/games/${props.game}/file?type=wasm`
  })

  return (
		<>
			{!isLoaded &&
				<div className='flex flex-col items-center justify-center w-full h-full'>
					<span className='w-20 h-20 border-2 rounded-full border-b-secondary border-neutral-600 animate-spin' />
					<p className='m-10 text-white'>
						{Math.round(loadingProgression * 100)}%
					</p>
				</div>}
			<Unity
				unityProvider={unityProvider}
				style={{ width: '100%', height: '100%', margin: '0', padding: '0', visibility: isLoaded ? 'visible' : 'hidden' }}
			/>
		</>
  )
}

export default UnityEngine
