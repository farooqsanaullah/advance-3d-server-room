import React from 'react'
import CreateRack from './CreateRack';
import '../App.css';
import * as THREE from 'three'
export default function DisplayTotalRack(paramaters) {
    // console.log(paramaters);
    const { id, height, width, length, x_axis, y_axis, color, angle_rack } = paramaters.paramaters;



    const CheckEven = (id) => {
        //    console.log(id);
        //    paramaters.greet();
        console.log(id)

    }

    return (
        <>
            <group className="hover__mouse" onClick={CheckEven.bind(this, id)} rotation={[0, THREE.Math.degToRad(angle_rack), 0]} position={[x_axis, 1.5, y_axis]} scale={[width, height, length]}>
                <CreateRack position={[0, 10.5, 0]} color={color} scale={[10, .3, 10]} />
                <CreateRack position={[0, 0.5, 0]} color={color} scale={[10, 1, 10]} />
                <CreateRack position={[0, 5.5, -4.85]} color={color} scale={[10, 10, .3]} />
                <CreateRack position={[4.85, 5.5, 0]} color={color} scale={[.3, 10, 10]} />
                <CreateRack position={[-4.85, 5.5, 0]} color={color} scale={[.3, 10, 10]} />
            </group>
        </>
    )
}
