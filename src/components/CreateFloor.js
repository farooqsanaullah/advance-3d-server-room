import React from 'react'

export default function CreateFloor({ position, rotation, color, scale }) {
    return (
       
        <mesh position={position} rotation={rotation} scale={scale} receiveShadow >
            <boxBufferGeometry attach="geometry"
            />
            <meshPhongMaterial attach="material" color={color} />
        </mesh>
    )
}
