import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import textureImage from './texture.jpg'; // Путь к текстуре

function ComplexSceneWithLightAndTexture() {
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
    camera.position.set(0, 0, 10);

    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);

    // Создаем освещение
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff0000);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Загружаем текстуру
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(textureImage);

    // Создаем геометрию (куб, сфера и конус) с текстурой
    const cubeGeometry = new THREE.BoxGeometry();
    const cubeMaterial = new THREE.MeshPhongMaterial({ map: texture });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-2, 0, 0);
    scene.add(cube);

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshLambertMaterial({ map: texture });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(2, 0, 0);
    scene.add(sphere);

    const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
    const coneMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.set(0, 2, 0);
    scene.add(cone);

    // Анимация: вращение фигур
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;

      cone.rotation.x += 0.01;
      cone.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      sceneContainer.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={sceneRef} style={{ width: '100%', height: '100vh' }} />;
}

export default ComplexSceneWithLightAndTexture;
