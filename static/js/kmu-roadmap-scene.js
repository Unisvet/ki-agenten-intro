// Three.js full-screen 3D Roadmap Scene for kmu.html

let scene, camera, renderer;
let starParticles;
let pathCurve;
let roadmapNodes = [];
let roadmapLabels = [];
let raycaster, mouse;
let container;

// Camera target coordinates for smooth flight transitions
const defaultCameraPos = new THREE.Vector3(0, 1, 9);
const defaultLookAt = new THREE.Vector3(0, 0, 0);
let targetCameraPos = defaultCameraPos.clone();
let targetLookAt = defaultLookAt.clone();

// 3D coordinates for our 5 roadmap nodes
const nodePositions = [
    new THREE.Vector3(-5.2, -1.2, 0.5),    // 1. Plattformen
    new THREE.Vector3(-2.6, 0.8, -1.0),    // 2. Lokale KI
    new THREE.Vector3(0.0, -1.0, 1.2),     // 3. Die 5 Phasen
    new THREE.Vector3(2.6, 1.2, -1.0),      // 4. Governance & Recht
    new THREE.Vector3(5.2, -1.0, 0.5)      // 5. Fallstricke
];

const nodeTitles = [
    "1. Plattformen-Kategorien",
    "2. Lokale KI & Gemma 4",
    "3. Die 5-Phasen-Roadmap",
    "4. Governance & EU AI Act",
    "5. Kritische Fallstricke"
];

function initRoadmap() {
    container = document.querySelector('.fullscreen-layout');
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene Setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06060c);
    scene.fog = new THREE.FogExp2(0x06060c, 0.04);

    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.copy(defaultCameraPos);

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('roadmap-canvas'), antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lights Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xcd0a1e, 1.5); // Brand red light glow
    dirLight2.position.set(-5, -5, -3);
    scene.add(dirLight2);

    // 5. Starfield background particles
    createStarfield();

    // 6. Draw Roadmap Path & Nodes
    buildRoadmap();

    // 7. Raycaster & Event Listeners
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onClick);

    // Start Animation Loop
    animate();
}

function createStarfield() {
    const starsCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 45;
        positions[i + 1] = (Math.random() - 0.5) * 45;
        positions[i + 2] = (Math.random() - 0.7) * 35;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xcd0a1e,
        size: 0.08,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true
    });

    starParticles = new THREE.Points(geometry, material);
    scene.add(starParticles);
}

function buildRoadmap() {
    // Construct the path spline running through all nodes
    pathCurve = new THREE.CatmullRomCurve3(nodePositions);
    
    // Draw the path line in 3D
    const pathPoints = pathCurve.getPoints(100);
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const pathMaterial = new THREE.LineBasicMaterial({
        color: 0xcd0a1e,
        transparent: true,
        opacity: 0.45,
        linewidth: 2 // Note: linewidth > 1 is usually not supported by WebGL implementations, but standard is fine
    });
    
    const pathLine = new THREE.Line(pathGeometry, pathMaterial);
    scene.add(pathLine);

    // Create 3D Nodes (Glowing red spheres) and their 2D HTML Label overlays
    const nodeGeometry = new THREE.SphereGeometry(0.32, 32, 32);
    const labelContainer = document.getElementById('roadmap-label-container');

    nodePositions.forEach((pos, idx) => {
        // 3D sphere mesh
        const nodeMat = new THREE.MeshStandardMaterial({
            color: 0xcd0a1e,
            emissive: 0xcd0a1e,
            emissiveIntensity: 0.6,
            roughness: 0.2,
            metalness: 0.8
        });
        const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMat);
        nodeMesh.position.copy(pos);
        nodeMesh.userData = { nodeIndex: idx, baseScale: 1, title: nodeTitles[idx] };
        
        scene.add(nodeMesh);
        roadmapNodes.push(nodeMesh);

        // 2D HTML Label overlay
        const label = document.createElement('div');
        label.className = 'roadmap-label-overlay';
        label.innerText = nodeTitles[idx];
        labelContainer.appendChild(label);
        roadmapLabels.push(label);
    });
}

// Camera transition flight functions (called by kmu-main.js)
function focusNode(index) {
    const node = roadmapNodes[index];
    if (node) {
        // Position camera slightly offset to the left/front of the node to leave space for the sidebar
        targetCameraPos.set(node.position.x - 1.2, node.position.y + 0.3, node.position.z + 4.2);
        targetLookAt.copy(node.position);
    }
}

function resetCamera() {
    targetCameraPos.copy(defaultCameraPos);
    targetLookAt.copy(defaultLookAt);
}

// Projection Vector variable
const tempV = new THREE.Vector3();

function animate(time) {
    requestAnimationFrame(animate);

    const seconds = time * 0.001;

    // Rotate star background slowly
    if (starParticles) {
        starParticles.rotation.y = seconds * 0.01;
    }

    // Animate and float 3D nodes
    roadmapNodes.forEach((node, idx) => {
        // Slow float sine motion
        node.position.y = nodePositions[idx].y + Math.sin(seconds * 2.0 + idx * 1.5) * 0.06;
        
        // Rotate nodes
        node.rotation.y = seconds * 0.3;

        // Hover scale animation
        const targetScale = node.userData.hovered ? 1.35 : 1.0;
        node.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

        // Synchronize 2D HTML Label positioning
        const label = roadmapLabels[idx];
        if (label) {
            tempV.copy(node.position);
            tempV.project(camera);

            // Convert to screen percentage pixels
            const x = (tempV.x * 0.5 + 0.5) * window.innerWidth;
            const y = (tempV.y * -0.5 + 0.5) * window.innerHeight;

            label.style.left = `${x}px`;
            label.style.top = `${y - 25}px`; // Draw above the node

            // Hide labels that clip behind the camera plane
            if (tempV.z > 1) {
                label.style.opacity = 0;
                label.style.pointerEvents = 'none';
            } else {
                label.style.opacity = 1;
                label.style.pointerEvents = 'auto';
            }
        }
    });

    // Smoothly fly camera to its targets
    camera.position.lerp(targetCameraPos, 0.05);
    
    // Look at target interpolation
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    camera.getWorldDirection(currentLookAt);
    const focusTarget = new THREE.Vector3().copy(camera.position).add(currentLookAt);
    focusTarget.lerp(targetLookAt, 0.05);
    camera.lookAt(focusTarget);

    renderer.render(scene, camera);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function onMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Check node intersections
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(roadmapNodes);

    let foundHoverObj = null;

    if (intersects.length > 0) {
        foundHoverObj = intersects[0].object;
    }

    roadmapNodes.forEach((node, idx) => {
        const label = roadmapLabels[idx];
        if (node === foundHoverObj) {
            node.userData.hovered = true;
            if (label) label.classList.add('hovered');
            document.body.style.cursor = 'pointer';
        } else {
            node.userData.hovered = false;
            if (label) label.classList.remove('hovered');
        }
    });

    if (!foundHoverObj) {
        document.body.style.cursor = 'default';
    }
}

function onClick(event) {
    event.preventDefault();

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(roadmapNodes);

    if (intersects.length > 0) {
        const clickedNode = intersects[0].object;
        const index = clickedNode.userData.nodeIndex;
        
        // Trigger details sidebar in kmu-main.js
        if (typeof selectRoadmapTopic === 'function') {
            selectRoadmapTopic(index);
        }
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initRoadmap();
});
