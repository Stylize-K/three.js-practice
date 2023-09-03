import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import earthTexture from './earth.jpg'; // Путь к текстуре Земли

function RotatingEarthWithLight() {
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
    camera.position.set(0, 0, 15);

    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);

    // Создаем Землю
    const earthGeometry = new THREE.SphereGeometry(7, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(earthTexture),
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Создаем источник света
    const light = new THREE.PointLight(0xffffff, 58);
    light.position.set(40, 0, 10);
    scene.add(light);

    // Анимация: вращение Земли и источника света
    const animate = () => {
      requestAnimationFrame(animate);

      earth.rotation.y += 0.001;

      const radius = 15;
      const angle = Date.now() * 0.0002;
      light.position.x = Math.cos(angle) * radius;
      light.position.z = Math.sin(angle) * radius;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      sceneContainer.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={sceneRef} style={{ width: '100%', height: '100vh' }} />;
}

export default RotatingEarthWithLight;
