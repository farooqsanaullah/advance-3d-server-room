import React, { useState,useEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import  Draggable from './Draggable'

function Cube(props) {
    return (
        <mesh {...props}>
            <boxBufferGeometry />
            <meshNormalMaterial />
        </mesh>
    )
}

function Ground(props) {
    const onPointerDown = (e) => e.stopPropagation()
    return (
        <mesh onPointerDown={onPointerDown} rotation-x={-Math.PI / 2} {...props}>
            <planeBufferGeometry args={[5, 5]} />
            <meshStandardMaterial />
        </mesh>
    )
}

function Lighting() {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[2, 2, 2]} />
        </>
    )
}


function CallDraggale() {
    const [drag, setDrag] = useState(false)
    const dragProps = {
        onDragStart: () => setDrag(true),
        onDragEnd: () => setDrag(false),
    }

   useEffect(()=>{
       console.log(drag)
   })


    return (
        <Canvas camera={{ position: [0, 2, 4] }}>
            <color attach="background" args={['black']} />
            <OrbitControls enabled={!drag} />
            <Ground position-y={-0.5} />
            <Lighting />
            <Draggable {...dragProps}>
                <Cube />
            </Draggable>
        </Canvas>
    )
}

export default CallDraggale
