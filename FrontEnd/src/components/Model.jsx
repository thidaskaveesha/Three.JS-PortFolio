import React, { useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ path, onShowMessage }) => {
    // Load the GLTF model using the GLTFLoader
    const gltf = useLoader(GLTFLoader, path);

    // Create a reference to the model object
    const modelRef = useRef();

    // Define an array of messages with corresponding rotation ranges
    const messages = [
        { text: "Hello I'm Thidas Kaveesha", range: [Math.PI / 4, Math.PI / 2] },
        { text: "Welcome to My Portfolio", range: [Math.PI / 2, 3 * Math.PI / 4] },
        { text: "Check Out My Projects", range: [3 * Math.PI / 4, Math.PI] },
        { text: "Let's Connect!", range: [Math.PI, 5 * Math.PI / 4] }
    ];

    // useFrame is called on every frame, allowing for animations and updates
    useFrame(() => {
        if (modelRef.current) {
            // Rotate the model around the Y-axis
            modelRef.current.rotation.y += 0.003;

            // Set the model's Y position to -1.25
            modelRef.current.position.y = -1.25;

            // Calculate the current rotation angle around the Y-axis, normalized within the range [0, 2π]
            const rotationY = modelRef.current.rotation.y % (2 * Math.PI);

            // Determine which message to display based on the current rotation angle
            let message = '';
            for (let i = 0; i < messages.length; i++) {
                const { text, range } = messages[i];
                if (rotationY >= range[0] && rotationY <= range[1]) {
                    message = text;
                    break;
                }
            }

            // Call the onShowMessage function with the determined message
            onShowMessage(message);
        }
    });

    // Render the GLTF model using a primitive and attach the modelRef to it
    return <primitive object={gltf.scene} ref={modelRef} />;
};

export default Model;
