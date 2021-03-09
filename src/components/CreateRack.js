import React from 'react'

export default function CreateRack({ position, rotation, color, scale }) {
    return (
       
        <mesh position={position} rotation={rotation} scale={scale} receiveShadow >
            <boxBufferGeometry attach="geometry"
            />
            <meshPhongMaterial attach="material" color={color} />
        </mesh>
    )
}
