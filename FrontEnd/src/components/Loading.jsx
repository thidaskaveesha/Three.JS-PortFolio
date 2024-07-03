import React, { useRef, useState, useEffect } from "react";
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

// Loader component to display a rotating box and animated loading text
const Loader = () => {
    const meshRef = useRef(); // Reference to the mesh object
    const [loadingText, setLoadingText] = useState("Loading"); // State to manage loading text animation

    // Rotate the loader box on every frame
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01; // Increment the rotation around x-axis
            meshRef.current.rotation.y += 0.01; // Increment the rotation around y-axis
        }
    });

    // Animation for loading text to add dots
    useEffect(() => {
        const interval = setInterval(() => {
            // Toggle between "Loading", "Loading.", "Loading..", and "Loading..."
            setLoadingText((prev) => (prev === "Loading..." ? "Loading" : prev + "."));
        }, 500); // Change text every 500ms

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    return (
        <group>
            {/* Rotating box geometry */}
            <mesh ref={meshRef} position={[0, 0.5, 0]}>
                <boxGeometry args={[1, 1, 1]} /> {/* Box with dimensions 1x1x1 */}
                <meshStandardMaterial color="#00adb5" metalness={0.2} roughness={0.8} /> {/* Material with color and properties */}
            </mesh>
            {/* Loading text below the rotating box */}
            <Text
                position={[0, -1.5, 0]} // Position the text below the box
                fontSize={0.5} // Font size
                color="#393e46" // Text color
                anchorX="center" // Center text horizontally
                anchorY="middle" // Center text vertically
                font="https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Me5Q.ttf"    // Font URL
            >
                {loadingText} {/* Display the animated loading text */}
            </Text>
        </group>
    );
};

export default Loader;
