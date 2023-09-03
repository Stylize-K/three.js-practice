import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function ThreeScene() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneContainer = sceneRef.current;

    // Создаем сцену
    const scene = new THREE.Scene();

    // Создаем камеру
    const camera = new THREE.PerspectiveCamera(
      75,
      sceneContainer.clientWidth / sceneContainer.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);

    // Создаем геометрию (куб)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Анимация: вращение куба
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      sceneContainer.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={sceneRef} style={{ width: '100%', height: '100vh' }} />;
}

export default ThreeScene;
