import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Model from "../components/Model";
import Loader from "../components/Loading";
import style from "./Portfolio.module.css";

function Portfolio() {
    // State to handle loading status and current message
    const [isLoading, setIsLoading] = useState(true);
    const [currentMessage, setCurrentMessage] = useState('');

    // useEffect to manage the loading timer
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Set loading to false after 5 seconds
        }, 5000);

        // Clean up the timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    // Function to update the current message based on the model's rotation
    const handleShowMessage = (message) => {
        setCurrentMessage(message);
    };

    return (
        <div className={style.Container}>
            {/* Canvas for rendering the 3D scene */}
            <Canvas shadows camera={{ position: [0, 5, 8], fov: 30 }}>
                {/* Fog to add depth to the scene */}
                <fog attach="fog" args={["#87CEEB", 10, 50]} />
                {/* Ambient light for general illumination */}
                <ambientLight intensity={0.4} />
                {/* Hemisphere light for soft, diffused lighting */}
                <hemisphereLight skyColor={"#ffffff"} groundColor={"#444444"} intensity={0.6} />
                {/* Directional light for main lighting source */}
                <directionalLight
                    position={[5, 10, 7.5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                {/* Additional point and spot lights for more dynamic lighting */}
                <pointLight position={[-10, 10, -10]} intensity={0.5} />
                <spotLight position={[15, 20, 5]} angle={0.3} penumbra={1} intensity={1} castShadow />

                {isLoading ? (
                    // Show loading component while the scene is loading
                    <Loader />
                ) : (
                    // Show the 3D scene when loading is complete
                    <Suspense fallback={<Loader />}>
                        <Environment preset="sunset" />
                        {/* Model component with message handling */}
                        <Model path="/Model/scene.gltf" onShowMessage={handleShowMessage} />
                        {/* OrbitControls to control the camera */}
                        {/*<OrbitControls enableRotate={true} enableZoom={true} enablePan={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />*/}
                    </Suspense>
                )}
            </Canvas>
            {/* Display the current message as a bubble at the bottom of the page */}
            {currentMessage && (
                <div className={`${style.BubbleMessage} ${currentMessage ? style.show : ''}`}>
                    {currentMessage}
                </div>
            )}
        </div>
    );
}

export default Portfolio;
