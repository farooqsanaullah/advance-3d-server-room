import React from 'react'
import { Canvas } from "react-three-fiber";
import '../App.css';

import * as THREE from 'three'
import { OrbitControls, Plane, Sphere } from 'drei';
function NestedMesh1() {
    return (
        <Canvas className="canvas" shadowMap colorManagement camera={{ position: [-10, 50, 150], fov: 80 }}>
            <ambientLight intensity={0.3} />
            <directionalLight

                intensity={.3}
                position={[10, 15, 10]}

            />
            <mesh position={[0, 6, 0]} scale={[10, 1, 10]} receiveShadow >
                <mesh position={[.5, 1, 0]} rotation={[THREE.Math.degToRad(2), THREE.Math.degToRad(92), 0]} scale={[0.1, 0.1, 0.1]} receiveShadow >
                    <boxBufferGeometry attach="geometry"
                    />
                    <meshPhongMaterial attach="material" color={'green'} />
                </mesh>
                <boxBufferGeometry attach="geometry"
                />
                <meshPhongMaterial attach="material" color={'red'} />
            </mesh>
            <OrbitControls />
        </Canvas>
    )
}

export default NestedMesh1
