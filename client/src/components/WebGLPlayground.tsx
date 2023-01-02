/* eslint-disable react/no-unknown-property */
import React, { ReactElement, useRef, useMemo, useCallback } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
// @ts-expect-error
import particle from '../utilities/particle.png'

const WebGLCanvas = (props: { color: string }): ReactElement => {
  const particleImage: any = useLoader(THREE.TextureLoader, particle)
  const orbitControlsRef = useRef<any>(null)
  const bufferRef = useRef<any>(null)

  const pointCount = 100
  const pointSeperation = 3

  let phase = 0
  const amplitude = 3

  const graph = useCallback((x: number, z: number) => {
    return Math.sin(0.0005 * ((x ** 2) + (z ** 2) + phase)) * amplitude
  }, [phase, amplitude])

  const positions = useMemo(() => {
    const coordinates = []

    for (let i = 0; i < pointCount; i++) {
      for (let j = 0; j < pointCount; j++) {
        const x = pointSeperation * (i - pointCount / 2)
        const z = pointSeperation * (j - pointCount / 2)
        const y = graph(x, z)
        coordinates.push(x, y, z)
      }
    }

    return new Float32Array(coordinates)
  }, [pointCount, pointSeperation, graph])

  useFrame((state) => {
    const { x } = state.mouse
    if (orbitControlsRef.current != null) {
      orbitControlsRef.current.setAzimuthalAngle(-x * (Math.PI / 180) * 10)
    }

    const positions = bufferRef.current.array
    let index = 0
    phase += 50

    for (let i = 0; i < pointCount; i++) {
      for (let j = 0; j < pointCount; j++) {
        const x = pointSeperation * (i - pointCount / 2)
        const z = pointSeperation * (j - pointCount / 2)
        positions[index + 1] = graph(x, z)
        index += 3
      }
    }

    bufferRef.current.needsUpdate = true
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[100, 10, 0]} fov={50}
      aspect={window.innerWidth / window.innerHeight} />
      <OrbitControls ref={orbitControlsRef}
      minPolarAngle={(Math.PI / 180) * 80} maxPolarAngle={(Math.PI / 180) * 100}
      minAzimuthAngle={(Math.PI / 180) * -10} maxAzimuthAngle={(Math.PI / 180) * 10}
      enableZoom={true} />
      <points>
          <bufferGeometry attach="geometry">
            <bufferAttribute
            ref={bufferRef}
            attach="attributes-position"
            count={positions.length / 3}
            itemSize={3}
            array={positions} />
          </bufferGeometry>
          <pointsMaterial attach="material" map={particleImage} color={props.color} size={0.5}
          alphaTest={0.5} opacity={1} />
      </points>
      <ambientLight intensity={1} />
    </>
  )
}

const WebGLPlayground = (): ReactElement => {
  return (
    <Canvas>
      <WebGLCanvas color='#00E676' />
    </Canvas>
  )
}

export default WebGLPlayground
