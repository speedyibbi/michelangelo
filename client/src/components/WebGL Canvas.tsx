import React, { ReactElement } from 'react'
import { Canvas } from '@react-three/fiber'
import WebGLPlayground from './WebGL Playground'

const WebGLCanvas = (): ReactElement => {
  return (
    <Canvas>
      <WebGLPlayground color='#00ffaa' />
    </Canvas>
  )
}

export default WebGLCanvas
