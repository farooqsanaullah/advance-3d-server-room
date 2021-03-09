import React from 'react'
import '../App.css';

import CreateRoom from './CreateRoom';
import * as THREE from 'three'
function DisplayTotalRoom(paramaters) {
    const { id, height, width, length, x_axis, y_axis, color, angle_room } = paramaters.paramaters;
    const CheckEven = (id) => {

        console.log(id)

    }
    return (
        <group className="hover__mouse" onClick={CheckEven.bind(this, id)} rotation={[0, THREE.Math.degToRad(angle_room), 0]} position={[x_axis, 0, y_axis]} scale={[width,height, length]}>
            <CreateRoom position={[0, 0, 0]} color={color} scale={[10, 1, 10]} />
            <CreateRoom position={[0, 5.5, -4.85]} color={color} scale={[9.4, 10, .3]} />
            <CreateRoom position={[4.85, 5.5, 0]} color={color} scale={[.3, 10, 10]} />
            <CreateRoom position={[-4.85, 5.5, 0]} color={color} scale={[.3, 10, 10]} />
        </group>
    )
}

export default DisplayTotalRoom
