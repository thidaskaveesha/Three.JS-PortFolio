import React, { Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei'; // Importing necessary components from drei
import Model from "../components/Model"; // Importing Model component
import style from "./Portfolio.module.css"; // Importing optional CSS module for styling

// Custom loading component for Suspense fallback
const Loader = () => {
    return (
        <mesh>
            {/* Creating a simple box geometry */}
            <boxGeometry args={[1, 1, 1]} />
            {/* Applying a light gray material */}
            <meshStandardMaterial color="lightgray" />
        </mesh>
    );
};

function Portfolio() {
    return (
        <div className={style.Container}> {/* Applying a CSS class for styling purposes */}
            {/* Setting up the Canvas with a camera */}
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
                {/* Adding fog to the scene */}
                <fog attach="fog" args={["#87CEEB", 10, 50]} />
                {/* Ambient light with 40% intensity */}
                <ambientLight intensity={0.4} />
                {/* Hemisphere light with sky and ground colors */}
                <hemisphereLight skyColor={"#ffffff"} groundColor={"#444444"} intensity={0.6} />
                {/* Directional light with shadow casting */}
                <directionalLight
                    position={[5, 10, 7.5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                {/* Point light with 50% intensity */}
                <pointLight position={[-10, 10, -10]} intensity={0.5} />
                {/* Spot light with specific position and properties */}
                <spotLight position={[15, 20, 5]} angle={0.3} penumbra={1} intensity={1} castShadow />
                {/* Adding Suspense for async loading fallback */}
                <Suspense fallback={<Loader />}>
                    {/* Adding an environment preset for lighting and background */}
                    <Environment preset="sunset" />
                    {/* Loading your 3D model using the Model component */}
                    <Model path="/Model/scene.gltf" />
                    {/* Adding OrbitControls for interactive camera movement */}
                    <OrbitControls />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default Portfolio;
