/* eslint-disable react/no-unknown-property */
import React, { ReactElement } from 'react'
import { Canvas } from '@react-three/fiber'

const HomeCanvas = (): ReactElement => {
  return (
    <Canvas>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
    </Canvas>
  )
}

export default HomeCanvas
