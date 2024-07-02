import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ path }) => {
    // Load the GLTF model using GLTFLoader from three.js
    const gltf = useLoader(GLTFLoader, path);

    // Create a reference to the model object for manipulation
    const modelRef = useRef();

    // Use useFrame to perform actions on every frame of the animation loop
    useFrame(() => {
        if (modelRef.current) {
            // Rotate the model around the Y-axis
            modelRef.current.rotation.y += 0.01;
        }
    });

    // Render the loaded model as a primitive and attach the modelRef to it
    return <primitive object={gltf.scene} ref={modelRef} />;
};

export default Model;
