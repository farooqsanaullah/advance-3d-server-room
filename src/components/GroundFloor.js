import React from 'react'
import * as THREE from 'three'
import { Canvas } from "react-three-fiber";

import { softShadows, OrbitControls } from 'drei';

export default function GroundFloor({scale,color}) {
    return (

        <group>

            <mesh position={[0, -2, 0]} rotation={[THREE.Math.degToRad(-90), 0, 0]} scale={scale} receiveShadow>
                <planeGeometry attach="geometry" />
                <meshStandardMaterial attach="material" color={color} />
            </mesh>
        </group>

    )
}
