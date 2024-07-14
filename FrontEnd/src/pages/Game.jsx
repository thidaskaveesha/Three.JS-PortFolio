import React, { useEffect, useRef } from "react";
import style from "./Game.module.css";
import * as THREE from 'three';

function Game() {
    // Create a reference to the container element
    const containerRef = useRef(null);
    // Create a reference to the keys pressed set will help us keep track of which keys are currently pressed
    const keysPressed = useRef(new Set());

    useEffect(() => {
        // Create scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Append renderer to container
        containerRef.current.appendChild(renderer.domElement);

        // Set camera position to ensure the ground is visible
        camera.position.set(0, 5, 10);
        camera.lookAt(0, 0, 0);

        // Create ground
        const groundGeometry = new THREE.BoxGeometry(30, 1, 30);
        const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.position.y = -1;
        scene.add(ground);

        // Create player
        const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
        const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const player = new THREE.Mesh(playerGeometry, playerMaterial);
        player.position.y = 0.5;
        scene.add(player);

        // Player velocity
        const playerVelocity = new THREE.Vector3();

        // Animate function
        function animate() {
            requestAnimationFrame(animate);

            // Update player position based on velocity
            player.position.add(playerVelocity);

            // Slow down player (friction effect)
            playerVelocity.multiplyScalar(0.9);

            renderer.render(scene, camera);
        }
        animate();

        // Handle player movement (litteraly this will check which movement key is pressed)
        const handleKeyDown = (event) => {
            keysPressed.current.add(event.key.toLowerCase());
        };
        // Handle player movement ( this will remove the key from the set when the key is released)
        const handleKeyUp = (event) => {
            keysPressed.current.delete(event.key.toLowerCase());
        };
        // Add event listeners for keydown and keyup
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Update player velocity based on keys pressed
        const updateMovement = () => {
            if (keysPressed.current.has('w') || keysPressed.current.has('arrowup')) {
                playerVelocity.z -= 0.03;
            }
            if (keysPressed.current.has('s') || keysPressed.current.has('arrowdown')) {
                playerVelocity.z += 0.03;
            }
            if (keysPressed.current.has('d') || keysPressed.current.has('arrowright')) {
                playerVelocity.x += 0.03;
            }
            if (keysPressed.current.has('a') || keysPressed.current.has('arrowleft')) {
                playerVelocity.x -= 0.03;
            }
        };
        // Update player movement every 30 FPS 
        const movementInterval = setInterval(updateMovement, 1000 / 30); // 30 FPS

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('resize', handleResize);
            clearInterval(movementInterval);
            containerRef.current.removeChild(renderer.domElement);
        };
    }, []);
    // Return the container element
    return (
        <div ref={containerRef} className={style.Container}></div>
    );
}

export default Game;
