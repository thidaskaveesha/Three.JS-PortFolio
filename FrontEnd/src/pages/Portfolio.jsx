import React, { useRef } from "react";
import style from "./Portfolio.module.css";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Box = () => {
    const mesh = useRef();
    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.x += 0.01;
            mesh.current.rotation.y += 0.01;
        }
    });
    return (
        <mesh ref={mesh}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
};

function Portfolio() {
    return (
        <div className={style.Container}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Box />
                <OrbitControls />
            </Canvas>
        </div>
    );
}
export default Portfolio;

