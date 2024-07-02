import React, { useRef } from "react";
import style from "./Portfolio.module.css";
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Model from "../components/Model";

// const Box = () => {
//     const mesh = useRef();
//     useFrame(() => {
//         if (mesh.current) {
//             mesh.current.rotation.x += 0.01;
//             mesh.current.rotation.y += 0.01;
//         }
//     });
//     return (
//         <mesh ref={mesh}>
//             <boxGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial color="orange" />
//         </mesh>
//     );
// };

function Portfolio() {
    return (
        <div className={style.Container}>
            <Canvas>
                <ambientLight intensity={0.8} />
                <hemisphereLight intensity={0.35} />
                <directionalLight
                    position={[10, 10, 10]}
                    intensity={1.5}
                    castShadow
                />
                <Model path="/adamHead.gltf" />
                <OrbitControls />
            </Canvas>
        </div>
    );
}
export default Portfolio;

