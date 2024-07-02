import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ path }) => {
    const gltf = useLoader(GLTFLoader, path);
    return <primitive object={gltf.scene} />;
};

export default Model;