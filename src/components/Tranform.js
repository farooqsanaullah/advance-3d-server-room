
import React, { Suspense, useEffect, useRef } from "react"
import { Canvas, useLoader } from "react-three-fiber"
import { Controls, useControl } from "react-three-gui"
import { OrbitControls, TransformControls } from "drei"

import '../Style.css';


function Keen() {
  const orbit = useRef()
  const transform = useRef()
  const mode = useControl("mode", { type: "select", items: ["scale", "rotate", "translate"] })
 
  useEffect(() => {
    if (transform.current) {
      const controls = transform.current
      controls.setMode(mode)
      const callback = (event) => (orbit.current.enabled = !event.value)
      controls.addEventListener("dragging-changed", callback)
      return () => controls.removeEventListener("dragging-changed", callback)
    }
  })
  return (
    <>
      <TransformControls ref={transform}>
        <mesh position={[0, 0, 0]}>
          <boxBufferGeometry attach="geometry" args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial attach="material" color="orange" />
        </mesh>
      </TransformControls>
      <OrbitControls ref={orbit} />
    </>
  )
}



function Transform() {

  return (
    <>
       <Canvas shadowMap camera={{ position: [0, 0, 17], far: 50 }}>
        <ambientLight />
        <spotLight
          intensity={2}
          position={[40, 50, 50]}
          shadow-bias={-0.00005}
          penumbra={1}
          angle={Math.PI / 6}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          castShadow
        />
        <Suspense fallback={null}>
          <Keen />
        </Suspense>
      </Canvas>
      <Controls />
    </>
  );
}

export default Transform