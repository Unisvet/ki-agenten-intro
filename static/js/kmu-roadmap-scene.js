// Three.js full-screen 3D Roadmap Scene for kmu.html with Floating Drones

let scene, camera, renderer;
let starParticles;
let pathCurve;
let roadmapNodes = [];
let roadmapLabels = [];
let roadmapDrones = [];
let droneLabels = [];
let raycaster, mouse;
let container;

// Camera target coordinates for smooth flight transitions
const defaultCameraPos = new THREE.Vector3(0, 1.2, 8.5);
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
    const width = window.innerWidth || 800;
    const height = window.innerHeight || 600;

    // 1. Scene Setup
    scene = new THREE.Scene();
    // Transparent background so the futuristic office image shows through
    scene.background = null;

    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.copy(defaultCameraPos);

    // 3. Renderer Setup (Enable alpha transparency)
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('roadmap-canvas'), antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent clear color

    // 4. Lights Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xcd0a1e, 1.8); // Brand red light glow
    dirLight2.position.set(-5, -3, -3);
    scene.add(dirLight2);

    // 5. Starfield background particles
    createStarfield();

    // 6. Draw Roadmap Path, Nodes, and Drones
    buildRoadmap();
    buildDrones();

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
    const starsCount = 400;
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
        opacity: 0.4,
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
        opacity: 0.5,
        linewidth: 2
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
            emissiveIntensity: 0.7,
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

function buildDrones() {
    const droneGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const droneMaterial = new THREE.MeshStandardMaterial({
        color: 0x06b6d4, // Cyan drone core
        emissive: 0x06b6d4,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8
    });

    const ringGeometry = new THREE.TorusGeometry(0.24, 0.02, 8, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true });

    const labelContainer = document.getElementById('roadmap-label-container');

    // Floating drone coordinates in the sky
    const dronePositions = [
        new THREE.Vector3(-4.0, 1.9, -1.0),
        new THREE.Vector3(-1.2, 2.3, 0.0),
        new THREE.Vector3(1.2, 2.3, 0.0),
        new THREE.Vector3(4.0, 1.9, -1.0),
        new THREE.Vector3(-2.8, -0.2, 0.5),
        new THREE.Vector3(2.8, 0.0, 0.5)
    ];

    dronePositions.forEach((pos, idx) => {
        const droneGroup = new THREE.Group();
        
        const coreMesh = new THREE.Mesh(droneGeometry, droneMaterial);
        droneGroup.add(coreMesh);

        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringMesh.rotation.x = Math.PI / 2;
        droneGroup.add(ringMesh);

        droneGroup.position.copy(pos);
        droneGroup.userData = { isDrone: true, droneIndex: idx, baseScale: 1, baseY: pos.y };

        scene.add(droneGroup);
        roadmapDrones.push(droneGroup);

        // Create HTML overlay label for the drone quiz
        const label = document.createElement('div');
        label.className = 'roadmap-label-overlay';
        label.style.borderColor = 'rgba(6, 182, 212, 0.7)';
        label.style.color = '#e0f2fe';
        label.innerHTML = `<i class="fa-solid fa-plane-up" style="color:#06b6d4; margin-right:6px;"></i> Drohnen-Quiz ${idx + 1}`;
        labelContainer.appendChild(label);
        droneLabels.push(label);
    });
}

// Camera transition flight functions
function focusNode(index) {
    const node = roadmapNodes[index];
    if (node) {
        // Shift camera left/front of the node to leave space for the wide sidebar on the right
        targetCameraPos.set(node.position.x - 2.0, node.position.y + 0.3, node.position.z + 4.5);
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
        starParticles.rotation.y = seconds * 0.008;
    }

    // Animate and float 3D nodes
    roadmapNodes.forEach((node, idx) => {
        node.position.y = nodePositions[idx].y + Math.sin(seconds * 1.8 + idx * 1.5) * 0.05;
        node.rotation.y = seconds * 0.25;

        // Hover scale animation
        const targetScale = node.userData.hovered ? 1.35 : 1.0;
        node.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

        // Synchronize 2D HTML Label positioning
        const label = roadmapLabels[idx];
        if (label) {
            tempV.copy(node.position);
            tempV.project(camera);
            const x = (tempV.x * 0.5 + 0.5) * window.innerWidth;
            const y = (tempV.y * -0.5 + 0.5) * window.innerHeight;

            label.style.left = `${x}px`;
            label.style.top = `${y - 25}px`;

            if (tempV.z > 1) {
                label.style.opacity = 0;
            } else {
                label.style.opacity = 1;
            }
        }
    });

    // Animate and float 3D drones
    roadmapDrones.forEach((drone, idx) => {
        // Drone bobbing motion
        const basePos = drone.userData.baseY !== undefined ? drone.userData.baseY : 1.0;
        drone.position.y = basePos + Math.sin(seconds * 2.8 + idx * 2.0) * 0.08;
        
        // Spin the drone rotor ring
        drone.children[1].rotation.z = seconds * 7;

        // Hover scale
        const targetScale = drone.userData.hovered ? 1.35 : 1.0;
        drone.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

        // Sync 2D label
        const label = droneLabels[idx];
        if (label) {
            tempV.copy(drone.position);
            tempV.project(camera);
            const x = (tempV.x * 0.5 + 0.5) * window.innerWidth;
            const y = (tempV.y * -0.5 + 0.5) * window.innerHeight;

            label.style.left = `${x}px`;
            label.style.top = `${y - 20}px`;

            if (tempV.z > 1) {
                label.style.opacity = 0;
            } else {
                label.style.opacity = 1;
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
    const width = window.innerWidth || 800;
    const height = window.innerHeight || 600;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function onMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Check intersections on both nodes and drones
    raycaster.setFromCamera(mouse, camera);
    const targetObjects = [...roadmapNodes, ...roadmapDrones];
    const intersects = raycaster.intersectObjects(targetObjects, true);

    let foundHoverObj = null;

    if (intersects.length > 0) {
        let curr = intersects[0].object;
        while (curr.parent && curr.parent !== scene) {
            curr = curr.parent;
        }
        foundHoverObj = curr;
    }

    // Update hover states
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

    roadmapDrones.forEach((drone, idx) => {
        const label = droneLabels[idx];
        if (drone === foundHoverObj) {
            drone.userData.hovered = true;
            if (label) label.classList.add('hovered');
            document.body.style.cursor = 'pointer';
        } else {
            drone.userData.hovered = false;
            if (label) label.classList.remove('hovered');
        }
    });

    if (!foundHoverObj) {
        document.body.style.cursor = 'default';
    }
}

function onClick(event) {
    event.preventDefault();

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const targetObjects = [...roadmapNodes, ...roadmapDrones];
    const intersects = raycaster.intersectObjects(targetObjects, true);

    if (intersects.length > 0) {
        let curr = intersects[0].object;
        while (curr.parent && curr.parent !== scene) {
            curr = curr.parent;
        }

        if (curr.userData.isDrone) {
            const droneIdx = curr.userData.droneIndex;
            if (typeof openQuiz === 'function') {
                openQuiz(droneIdx);
            }
        } else if (roadmapNodes.includes(curr)) {
            const index = curr.userData.nodeIndex;
            if (typeof selectRoadmapTopic === 'function') {
                selectRoadmapTopic(index);
            }
        }
    }
}

// Initialize on page load and trigger resizing
window.addEventListener('DOMContentLoaded', () => {
    initRoadmap();
    
    // Sizing timing fixes
    setTimeout(onWindowResize, 100);
    setTimeout(onWindowResize, 500);
    setTimeout(onWindowResize, 1000);
});
