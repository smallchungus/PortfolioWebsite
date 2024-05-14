import React from 'react'
import birdScene from '../assets/bird.glb'
import { useGLTF } from '@react-three/drei'


const Bird = () => {
    const {bird, animations} = useGLTF(birdScene)

  return (
    <mesh>
        <primitive object={scene} />
    </mesh>
  )
}

export default Bird