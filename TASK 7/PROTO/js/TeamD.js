import * as THREE from 'three';

// Planet class for Team D
export class PlanetD {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;

        // Main planet system group
        this.group = new THREE.Group();

        // -------------------------
        // STEP 1: CREATE PLANET
        // -------------------------
        const planetGeometry = new THREE.SphereGeometry(1.8, 48, 48);
        const planetMaterial = new THREE.MeshStandardMaterial({
            color: 0x4466aa,
            roughness: 0.9,
            metalness: 0.1
        });

        this.planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        this.planetMesh.castShadow = true;
        this.planetMesh.receiveShadow = true;
        this.group.add(this.planetMesh);

        // -------------------------
        // STEP 2: ADD MOONS
        // -------------------------
        this.moons = [];

        for (let i = 0; i < 2; i++) {
            const moonPivot = new THREE.Group();

            const moonGeometry = new THREE.SphereGeometry(0.35 + i * 0.08, 24, 24);
            const moonMaterial = new THREE.MeshStandardMaterial({
                color: i === 0 ? 0xbbbbbb : 0x8888aa,
                roughness: 1.0,
                metalness: 0.0
            });

            const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
            moonMesh.castShadow = true;
            moonMesh.receiveShadow = true;

            const moonDistance = 3 + i * 1.2;
            moonMesh.position.x = moonDistance;

            moonPivot.rotation.y = Math.random() * Math.PI * 2;
            moonPivot.add(moonMesh);
            this.group.add(moonPivot);

            this.moons.push({
                pivot: moonPivot,
                mesh: moonMesh,
                speed: 0.01 + i * 0.01
            });
        }

        // -------------------------
        // STEP 3: ADD PROPS / CRITTERS
        // -------------------------
        // For now, use simple meshes as placeholders instead of Blender models
        this.clickableObjects = [];
        this.critters = [];

        for (let i = 0; i < 4; i++) {
            const critterGroup = new THREE.Group();

            // Body
            const bodyGeometry = new THREE.BoxGeometry(0.35, 0.35, 0.35);
            const bodyMaterial = new THREE.MeshStandardMaterial({
                color: 0xff8844,
                roughness: 0.7
            });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            body.castShadow = true;
            body.receiveShadow = true;
            critterGroup.add(body);

            // Little antenna / hat
            const topGeometry = new THREE.ConeGeometry(0.12, 0.25, 8);
            const topMaterial = new THREE.MeshStandardMaterial({
                color: 0xffff66,
                roughness: 0.5
            });
            const top = new THREE.Mesh(topGeometry, topMaterial);
            top.position.y = 0.3;
            top.castShadow = true;
            top.receiveShadow = true;
            critterGroup.add(top);

            // Put critter on planet surface
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;
            const radius = 1.8;

            const x = Math.sin(theta) * Math.cos(phi) * radius;
            const y = Math.cos(theta) * radius;
            const z = Math.sin(theta) * Math.sin(phi) * radius;

            critterGroup.position.set(x, y, z);

            // Make the critter stand outward from the planet surface
            const normal = new THREE.Vector3(x, y, z).normalize();
            critterGroup.quaternion.setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                normal
            );

            this.planetMesh.add(critterGroup);

            this.clickableObjects.push(body, top);
            this.critters.push({
                group: critterGroup,
                body: body,
                isAnimating: false,
                animTime: 0,
                baseScale: 1
            });
        }

        // -------------------------
        // RAYCASTER
        // -------------------------
        this.raycaster = new THREE.Raycaster();

        this.scene.add(this.group);
    }

    update(delta) {
        // Orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;

        // Rotate planet
        this.planetMesh.rotation.y += delta * 0.5;

        // Moon orbits
        this.moons.forEach((moon) => {
            moon.pivot.rotation.y += delta * moon.speed * 30;
            moon.mesh.rotation.y += delta * 0.8;
        });

        // Critter idle animation + click animation
        this.critters.forEach((critter, index) => {
            // idle bob
            critter.group.position.multiplyScalar(1); // keeps same structure
            critter.group.rotation.z = Math.sin(performance.now() * 0.002 + index) * 0.1;

            if (critter.isAnimating) {
                critter.animTime += delta * 3;

                const bounce = 1 + Math.sin(critter.animTime * 10) * 0.35;
                critter.group.scale.set(bounce, bounce, bounce);

                if (critter.animTime > 1) {
                    critter.isAnimating = false;
                    critter.animTime = 0;
                    critter.group.scale.set(1, 1, 1);
                }
            }
        });
    }

    click(mouse, scene, camera) {
        this.raycaster.setFromCamera(mouse, camera);
        const intersects = this.raycaster.intersectObjects(this.clickableObjects, false);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            this.critters.forEach((critter) => {
                if (critter.group.children.includes(clickedObject)) {
                    critter.isAnimating = true;
                    critter.animTime = 0;

                    // change color when clicked
                    critter.body.material.color.setHex(Math.random() * 0xffffff);
                }
            });
        }
    }
}