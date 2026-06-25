// Three.js 3D Scene Initialization for AI Agents Presentation

// Global scene variables
let scene, camera, renderer;
let floatingObjects = [];
let starParticles;
let raycaster, mouse;
let canvasContainer;

const TOPIC_COLORS = {
    model: 0xff4d4d,       // Glowing light red
    tools: 0xff3333,       // Primary brand red
    orchestration: 0xb3001e, // Deep dark red
    deployment: 0xff8080   // Rose red
};

function init3D() {
    canvasContainer = document.getElementById('three-canvas').parentElement;
    const width = canvasContainer.clientWidth || 600;
    const height = canvasContainer.clientHeight || 480;

    // 1. Scene Setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06060c); // Starry night-sky background
    scene.fog = new THREE.FogExp2(0x06060c, 0.05);

    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8;

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lights Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xcd0a1e, 1.2); // Red corporate glow light
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // 5. Background Particle Starfield
    createStarfield();

    // 6. Create the 4 Topic Objects
    createFloatingObjects();

    // 7. Raycasting & Mouse Events
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('click', onCanvasClick);
    renderer.domElement.addEventListener('mousemove', onCanvasMouseMove);

    // Start Animation Loop
    animate();
}

function createStarfield() {
    const starsCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 40;     // X
        positions[i + 1] = (Math.random() - 0.5) * 40; // Y
        positions[i + 2] = (Math.random() - 0.8) * 30; // Z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xcd0a1e,
        size: 0.08,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });

    starParticles = new THREE.Points(geometry, material);
    scene.add(starParticles);
}

function createFloatingObjects() {
    // Shared materials parameters
    const glassMaterialParams = (color) => ({
        color: color,
        emissive: color,
        emissiveIntensity: 0.25,
        roughness: 0.1,
        metalness: 0.8,
        transparent: true,
        opacity: 0.85,
        flatShading: false
    });

    // --- OBJECT 0: Gehirn (Model) ---
    // A wireframe sphere that rotates and pulses
    const modelGroup = new THREE.Group();
    const sphereGeo = new THREE.IcosahedronGeometry(1.1, 2);
    
    // Core solid sphere
    const sphereMat = new THREE.MeshStandardMaterial(glassMaterialParams(TOPIC_COLORS.model));
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    modelGroup.add(sphereMesh);
    
    // Outer wireframe shell
    const outerWireGeo = new THREE.IcosahedronGeometry(1.25, 2);
    const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const wireMesh = new THREE.Mesh(outerWireGeo, wireMat);
    modelGroup.add(wireMesh);
    
    modelGroup.position.set(-4.2, 1.3, 0);
    modelGroup.userData = { topicIndex: 0, baseScale: 1, name: "model" };
    scene.add(modelGroup);
    floatingObjects.push(modelGroup);

    // --- OBJECT 1: Hände (Tools) ---
    // A Torus Knot representing mechanical connections/APIs
    const toolsGeo = new THREE.TorusKnotGeometry(0.7, 0.22, 100, 8);
    const toolsMat = new THREE.MeshStandardMaterial(glassMaterialParams(TOPIC_COLORS.tools));
    const toolsMesh = new THREE.Mesh(toolsGeo, toolsMat);
    
    toolsMesh.position.set(-1.4, -1.3, 0);
    toolsMesh.userData = { topicIndex: 1, baseScale: 1, name: "tools" };
    scene.add(toolsMesh);
    floatingObjects.push(toolsMesh);

    // --- OBJECT 2: Nervensystem (Orchestration) ---
    // Interlocking double rings representing loops and connections
    const orchGroup = new THREE.Group();
    
    const ringGeo1 = new THREE.TorusGeometry(0.8, 0.14, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial(glassMaterialParams(TOPIC_COLORS.orchestration));
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    orchGroup.add(ringMesh1);
    
    const ringGeo2 = new THREE.TorusGeometry(0.8, 0.14, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial(glassMaterialParams(TOPIC_COLORS.orchestration));
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 2;
    orchGroup.add(ringMesh2);
    
    orchGroup.position.set(1.4, 1.3, 0);
    orchGroup.userData = { topicIndex: 2, baseScale: 1, name: "orchestration" };
    scene.add(orchGroup);
    floatingObjects.push(orchGroup);

    // --- OBJECT 3: Entwicklung & Container (Deployment) ---
    // A wireframe cube inside a solid cube representing packaging
    const deployGroup = new THREE.Group();
    
    const cubeGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const cubeMat = new THREE.MeshStandardMaterial(glassMaterialParams(TOPIC_COLORS.deployment));
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    deployGroup.add(cubeMesh);
    
    const cubeFrameGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    const frameMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const frameMesh = new THREE.Mesh(cubeFrameGeo, frameMat);
    deployGroup.add(frameMesh);
    
    deployGroup.position.set(4.2, -1.3, 0);
    deployGroup.userData = { topicIndex: 3, baseScale: 1, name: "deployment" };
    scene.add(deployGroup);
    floatingObjects.push(deployGroup);
}

// Hover/click target animations
let targetRotationX = 0;
let targetRotationY = 0;
let targetCameraY = 0;

function animate(time) {
    requestAnimationFrame(animate);

    const seconds = time * 0.001;

    // Slow rotate star particles
    if (starParticles) {
        starParticles.rotation.y = seconds * 0.015;
    }

    // Animate floating shapes
    floatingObjects.forEach((obj, idx) => {
        // Floating upward/downward sine motion
        obj.position.y += Math.sin(seconds * 1.5 + idx * 2.5) * 0.003;

        // Custom rotations per shape type
        if (obj.userData.name === "model") {
            obj.rotation.y = seconds * 0.4;
            obj.rotation.x = seconds * 0.2;
            
            // Pulse scale
            const pulse = 1 + Math.sin(seconds * 3) * 0.04;
            obj.scale.set(pulse, pulse, pulse);
        } else if (obj.userData.name === "tools") {
            obj.rotation.x = seconds * 0.3;
            obj.rotation.y = seconds * 0.5;
        } else if (obj.userData.name === "orchestration") {
            obj.rotation.y = seconds * 0.4;
            obj.rotation.z = seconds * 0.2;
        } else if (obj.userData.name === "deployment") {
            obj.rotation.x = seconds * 0.35;
            obj.rotation.y = seconds * 0.35;
        }

        // Smoothly scale back to base scale if hover exits
        const targetScale = obj.userData.hovered ? 1.2 : 1;
        obj.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    });

    // Parallax camera effect based on mouse hover
    camera.position.x += (targetRotationX - camera.position.x) * 0.05;
    camera.position.y += (targetCameraY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

function onWindowResize() {
    const width = canvasContainer.clientWidth || 600;
    const height = canvasContainer.clientHeight || 480;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function onCanvasMouseMove(event) {
    event.preventDefault();

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Camera parallax target
    targetRotationX = mouse.x * 1.5;
    targetCameraY = mouse.y * 1.5;

    // Check hover
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(floatingObjects, true);

    let foundHoverObj = null;

    if (intersects.length > 0) {
        // Find topmost intersected object belonging to our floatingObjects list
        let curr = intersects[0].object;
        while (curr.parent && curr.parent !== scene) {
            curr = curr.parent;
        }
        
        if (floatingObjects.includes(curr)) {
            foundHoverObj = curr;
        }
    }

    floatingObjects.forEach(obj => {
        if (obj === foundHoverObj) {
            obj.userData.hovered = true;
            document.body.style.cursor = 'pointer';
        } else {
            obj.userData.hovered = false;
        }
    });

    if (!foundHoverObj) {
        document.body.style.cursor = 'default';
    }
}

function onCanvasClick(event) {
    event.preventDefault();

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(floatingObjects, true);

    if (intersects.length > 0) {
        let curr = intersects[0].object;
        // Traverse up groups to find root floating group
        while (curr.parent && curr.parent !== scene) {
            curr = curr.parent;
        }

        if (floatingObjects.includes(curr)) {
            const topicIndex = curr.userData.topicIndex;
            // Call the frontend topic selector function in main.js
            if (typeof selectTopic === 'function') {
                selectTopic(topicIndex);
            }
        }
    }
}

// Initialise on load
window.addEventListener('DOMContentLoaded', () => {
    init3D();
});
