// HARIS.STUDIO/Script.js
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: function() {
                preloader.style.display = 'none';
            }
        });
    });

    // Mobile Menu
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuBtn.querySelector('i').classList.toggle('fa-bars');
        menuBtn.querySelector('i').classList.toggle('fa-times');
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Progress
    window.addEventListener('scroll', function() {
        const scrollProgress = document.querySelector('.scroll-progress');
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        const scrollPercentRounded = Math.round(scrollPercent * 100);
        scrollProgress.style.width = scrollPercentRounded + '%';
    });

    // Initialize GSAP with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5
    });

    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.8
    });

    gsap.to('.hero-description', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 1.1
    });

    gsap.to('.btn', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        delay: 1.4
    });

    // Services Animation
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Skills Animation
    gsap.to('.skills-image', {
        opacity: 1,
        x: 0,
        duration: 1.5,
        scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Animate skill bars
    gsap.utils.toArray('.skill-progress-bar').forEach(bar => {
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(bar, {
                    width: bar.getAttribute('data-width'),
                    duration: 2,
                    ease: 'power3.out'
                });
            }
        });
    });

    // Gallery Items Animation
    gsap.utils.toArray('.gallery-item').forEach(item => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // About Section Animation
    gsap.to('.about-image', {
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Animate stats
    gsap.utils.toArray('.stat-number').forEach(stat => {
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            onEnter: () => {
                const target = parseInt(stat.getAttribute('data-count'));
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(count);
                }, 16);
            }
        });
    });

    // Contact Section Animation
    gsap.to('.contact-info', {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    gsap.to('.contact-form', {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }, 1500);
        }
    });

    // Initialize particle network
    initParticleNetwork();

    function initParticleNetwork() {
        const canvas = document.querySelector('.particle-network');
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 100 };

        // Set canvas size
        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Mouse position
        canvas.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

    }
    
    // Scroll Text Animation System
    function initScrollTextAnimation() {
        // Elements
        const scrollTextContainer = document.querySelector('.scroll-text-container');
        const scrollText = document.getElementById('scrollText');
        const heroContent = document.getElementById('heroContent');
        const scrollIndicator = document.getElementById('scrollIndicator');
        const body = document.body;
        
        // Text sequences for scrolling animation
        const textSequences = [
            "Welcome To My Portfolio",
            "Graphic Design",
            "Video Editing", 
            "Motion Graphics",
            "Visual Storytelling",
            "Let's Begin"
        ];
        
        // Animation state
        let currentTextIndex = 0;
        let isAnimating = false;
        let scrollCooldown = false;
        let scrollEnabled = false;
        
        // Show initial text
        scrollText.textContent = textSequences[0];
        
        // Prevent default scrolling during animation
        function preventScroll(e) {
            if (!scrollEnabled) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }
        
        // Disable scrolling
        function disableScroll() {
            scrollEnabled = false;
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });
            window.addEventListener('keydown', preventKeyScroll, { passive: false });
            body.classList.remove('scroll-enabled');
        }
        
        // Enable scrolling
        function enableScroll() {
            scrollEnabled = true;
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            window.removeEventListener('keydown', preventKeyScroll);
            body.classList.add('scroll-enabled');
        }
        
        // Prevent keyboard scrolling
        function preventKeyScroll(e) {
            if (!scrollEnabled && [32, 33, 34, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
                return false;
            }
        }
        
        // Initialize with scrolling disabled
        disableScroll();
        
        // Change text with animation
        function changeText(direction) {
            if (isAnimating || scrollCooldown) return;
            
            isAnimating = true;
            scrollCooldown = true;
            
            // Set cooldown to prevent rapid scrolling
            setTimeout(() => {
                scrollCooldown = false;
            }, 800);
            
            // Calculate new index
            let newIndex = currentTextIndex + direction;
            
            // Check bounds
            if (newIndex < 0) newIndex = 0;
            if (newIndex >= textSequences.length) {
                // End of sequence - show hero content
                scrollText.classList.remove('active');
                scrollText.classList.add(direction > 0 ? 'next' : 'prev');
                
                setTimeout(() => {
                    scrollTextContainer.style.display = 'none';
                    heroContent.classList.add('visible');
                    scrollIndicator.classList.add('hidden');
                    
                    // Enable scrolling after animation completes
                    setTimeout(() => {
                        enableScroll();
                        // Force a scroll event to trigger any scroll-based animations
                        window.dispatchEvent(new Event('scroll'));
                    }, 500);
                }, 600);
                
                isAnimating = false;
                return;
            }
            
            // Update current text index
            currentTextIndex = newIndex;
            
            // Animate text change
            scrollText.classList.remove('active');
            scrollText.classList.add(direction > 0 ? 'prev' : 'next');
            
            setTimeout(() => {
                scrollText.textContent = textSequences[currentTextIndex];
                scrollText.classList.remove('prev', 'next');
                scrollText.classList.add('active');
                
                isAnimating = false;
            }, 600);
        }
        
        // Handle scroll events
        function handleScroll(direction) {
            changeText(direction);
        }
        
        // Add scroll event listener with throttle
        let scrollTimeout;
        function handleWheel(e) {
            if (!scrollEnabled) {
                if (!scrollTimeout) {
                    scrollTimeout = setTimeout(function() {
                        scrollTimeout = null;
                        handleScroll(e.deltaY > 0 ? 1 : -1);
                    }, 100);
                }
                e.preventDefault();
            }
        }
        
        window.addEventListener('wheel', handleWheel, { passive: false });
        
        // Touch events for mobile
        let touchStartY = 0;
        let touchMoveY = 0;
        
        window.addEventListener('touchstart', function(e) {
            if (!scrollEnabled) {
                touchStartY = e.touches[0].clientY;
            }
        });
        
        window.addEventListener('touchmove', function(e) {
            if (!scrollEnabled) {
                touchMoveY = e.touches[0].clientY;
                const diff = touchStartY - touchMoveY;
                
                // Only trigger if the swipe is significant enough
                if (Math.abs(diff) > 50) {
                    if (!scrollTimeout) {
                        scrollTimeout = setTimeout(function() {
                            scrollTimeout = null;
                            const direction = diff > 0 ? 1 : -1;
                            handleScroll(direction);
                            touchStartY = touchMoveY; // Reset for continuous scrolling
                        }, 100);
                    }
                }
                e.preventDefault();
            }
        }, { passive: false });
        
        // Keyboard events for accessibility
        window.addEventListener('keydown', function(e) {
            if (!scrollEnabled) {
                if ([40, 34].indexOf(e.keyCode) > -1) { // Down Arrow, Page Down
                    e.preventDefault();
                    if (!scrollTimeout) {
                        scrollTimeout = setTimeout(function() {
                            scrollTimeout = null;
                            handleScroll(1);
                        }, 100);
                    }
                } else if ([38, 33].indexOf(e.keyCode) > -1) { // Up Arrow, Page Up
                    e.preventDefault();
                    if (!scrollTimeout) {
                        scrollTimeout = setTimeout(function() {
                            scrollTimeout = null;
                            handleScroll(-1);
                        }, 100);
                    }
                }
            }
        });
    }

    // Initialize scroll text animation
    initScrollTextAnimation();

    // WebGL Animation Setup
    // Track loading progress
    const totalAssets = 8;
    let loadedAssets = 0;
    
    function updateProgress() {
        loadedAssets++;
        const progress = (loadedAssets / totalAssets) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
        document.getElementById('loading-text').textContent = 
            `Initializing energy fields... ${Math.round(progress)}%`;
        
        // When everything is loaded
        if (loadedAssets >= totalAssets) {
            completeLoading();
        }
    }
    
    function completeLoading() {
        document.getElementById('loading-text').textContent = "Energy Stabilized!";
        document.getElementById('progress-bar').style.width = "100%";
        
        setTimeout(() => {
            document.getElementById('loading').style.opacity = "0";
            setTimeout(() => {
                document.getElementById('loading').style.display = "none";
            }, 1000);
        }, 500);
    }
    
    // Initialize Three.js
    const container = document.getElementById('webgl-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    updateProgress(); // 1/8
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    updateProgress(); // 2/8
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    container.appendChild(renderer.domElement);
    updateProgress(); // 3/8
    
    // Post-processing setup
    const bloomParams = {
        exposure: 1,
        bloomStrength: 1.5,
        bloomThreshold: 0,
        bloomRadius: 0.5
    };
    
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        bloomParams.bloomStrength,
        bloomParams.bloomRadius,
        bloomParams.bloomThreshold
    );
    
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    updateProgress(); // 4/8
    
    // Create scene objects
    createSceneObjects();
    
    function createSceneObjects() {
        // Create energy grid
        const gridGroup = new THREE.Group();
        scene.add(gridGroup);
        
        const gridSize = 10;
        const gridDivisions = 15;
        const gridGeometry = new THREE.BufferGeometry();
        const gridPositions = [];
        
        // Create horizontal lines
        for (let i = 0; i <= gridDivisions; i++) {
            const y = -gridSize / 2 + (i * gridSize) / gridDivisions;
            
            gridPositions.push(-gridSize / 2, y, 0);
            gridPositions.push(gridSize / 2, y, 0);
            
            gridPositions.push(-gridSize / 2, 0, y);
            gridPositions.push(gridSize / 2, 0, y);
        }
        
        // Create vertical lines
        for (let i = 0; i <= gridDivisions; i++) {
            const x = -gridSize / 2 + (i * gridSize) / gridDivisions;
            
            gridPositions.push(x, -gridSize / 2, 0);
            gridPositions.push(x, gridSize / 2, 0);
            
            gridPositions.push(0, -gridSize / 2, x);
            gridPositions.push(0, gridSize / 2, x);
        }
        
        gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(gridPositions, 3));
        
        const gridMaterial = new THREE.LineBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.2
        });
        
        const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
        gridGroup.add(grid);
        updateProgress(); // 5/8
        
        // Create energy particles
        const particleCount = 1000;
        const particles = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);
        const particleSizes = new Float32Array(particleCount);
        
        const colorPalette = [
            new THREE.Color(0x00ffcc), // Cyan
            new THREE.Color(0xf8e300)  // Yellow
        ];
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            particlePositions[i] = (Math.random() - 0.5) * 40;
            particlePositions[i + 1] = (Math.random() - 0.5) * 40;
            particlePositions[i + 2] = (Math.random() - 0.5) * 40;
            
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            particleColors[i] = color.r;
            particleColors[i + 1] = color.g;
            particleColors[i + 2] = color.b;
            
            particleSizes[i / 3] = Math.random() * 0.5 + 0.1;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
        particles.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
        updateProgress(); // 6/8
        
        // Create energy orbs
        const orbGroup = new THREE.Group();
        scene.add(orbGroup);
        
        const orbGeometry = new THREE.SphereGeometry(1, 32, 32);
        const orbPositions = [
            { x: -5, y: 0, z: 0 },
            { x: 5, y: 0, z: 0 },
            { x: 0, y: -5, z: 0 },
            { x: 0, y: 5, z: 0 },
            { x: 0, y: 0, z: -5 },
            { x: 0, y: 0, z: 5 }
        ];
        
        const orbs = [];
        
        orbPositions.forEach((pos, i) => {
            const orbMaterial = new THREE.MeshBasicMaterial({
                color: colorPalette[i % colorPalette.length],
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending
            });
            
            const orb = new THREE.Mesh(orbGeometry, orbMaterial);
            orb.position.set(pos.x, pos.y, pos.z);
            orb.scale.setScalar(0.8 + Math.random() * 0.5);
            orbs.push(orb);
            orbGroup.add(orb);
        });
        updateProgress(); // 7/8
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);
        
        const pointLights = [];
        const lightColors = [0x00ffcc, 0x0066ff, 0xcc00ff, 0xff0066];
        
        lightColors.forEach(color => {
            const light = new THREE.PointLight(color, 3, 30);
            light.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            scene.add(light);
            pointLights.push(light);
        });
        updateProgress(); // 8/8
        
        // Start animation loop
        startAnimation(gridGroup, particleSystem, orbs, pointLights, camera, composer);
    }
    
    function startAnimation(gridGroup, particleSystem, orbs, pointLights, camera, composer) {
        let scrollPercent = 0;
        let targetScroll = 0;
        let time = 0;
        
        // Handle scroll events
        function updateScroll() {
            targetScroll = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            
            document.querySelectorAll('h1, p').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.75) {
                    el.classList.add('visible');
                }
            });
        }
        
        window.addEventListener('scroll', updateScroll);
        updateScroll();
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            time += 0.01;
            
            scrollPercent += (targetScroll - scrollPercent) * 0.05;
            
            // Animate grid
            gridGroup.rotation.x = time * 0.1;
            gridGroup.rotation.y = time * 0.05;
            gridGroup.rotation.z = time * 0.08;
            
            // Animate particles
            const positions = particleSystem.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                // Create flowing motion
                positions[i] += Math.sin(time * 0.5 + i * 0.01) * 0.02;
                positions[i + 1] += Math.cos(time * 0.3 + i * 0.01) * 0.02;
                positions[i + 2] += Math.sin(time * 0.7 + i * 0.01) * 0.02;
            }
            particleSystem.geometry.attributes.position.needsUpdate = true;
            particleSystem.rotation.y = time * 0.01;
            
            // Animate orbs
            orbs.forEach((orb, i) => {
                const phase = time * 0.5 + i;
                orb.rotation.x = time * 0.2;
                orb.rotation.y = time * 0.3;
                
                // Pulsating effect
                const pulse = 0.8 + Math.sin(time * 2 + i) * 0.3;
                orb.scale.set(pulse, pulse, pulse);
                
                // Orbital movement
                orb.position.x = Math.sin(phase) * (5 + scrollPercent * 5);
                orb.position.y = Math.cos(phase * 0.7) * (5 + scrollPercent * 5);
                orb.position.z = Math.sin(phase * 0.3) * (5 + scrollPercent * 5);
            });
            
            // Animate lights
            pointLights.forEach((light, i) => {
                const angle = time * 0.5 + i * Math.PI * 0.5;
                const radius = 10 + Math.sin(time * 0.3 + i) * 5;
                light.position.x = Math.cos(angle) * radius;
                light.position.y = Math.sin(angle * 0.7) * radius;
                light.position.z = Math.sin(angle * 0.3) * radius;
                light.intensity = 2 + Math.sin(time * 3 + i) * 1;
            });
            
            // Camera movement based on scroll
            camera.position.z = 12 + Math.sin(scrollPercent * Math.PI) * 10;
            camera.position.x = Math.sin(time * 0.1 + scrollPercent * Math.PI) * 5;
            camera.position.y = Math.cos(time * 0.05 + scrollPercent * Math.PI) * 3;
            
            // Look at different points based on scroll
            const lookAtX = Math.sin(scrollPercent * Math.PI * 2) * 8;
            const lookAtY = Math.cos(scrollPercent * Math.PI) * 4;
            camera.lookAt(lookAtX, lookAtY, 0);
            
            // Adjust bloom based on scroll
            bloomPass.strength = 1.2 + Math.sin(time * 0.5) * 0.3 + scrollPercent * 0.8;
            bloomPass.radius = 0.4 + scrollPercent * 0.6;
            
            composer.render();
        }
        
        // Handle resize
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        }
        
        window.addEventListener('resize', onWindowResize);
        
        // Start animation
        animate();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(50px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // See More functionality
    const seeMoreBtn = document.querySelector('.see-more-btn');
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    let itemsVisible = false;
    
    seeMoreBtn.addEventListener('click', () => {
        if (!itemsVisible) {
            hiddenItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                }, index * 100);
            });
            seeMoreBtn.innerHTML = 'Show Less <i class="fas fa-arrow-up"></i>';
            itemsVisible = true;
        } else {
            hiddenItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(50px)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }, 300);
                }, index * 50);
            });
            seeMoreBtn.innerHTML = 'See More <i class="fas fa-arrow-down"></i>';
            itemsVisible = false;
        }
    });
    
    // Modal functionality
    const modal = document.getElementById('galleryModal');
    const modalBody = document.querySelector('.modal-body');
    const modalTitle = document.querySelector('.modal-title');
    const modalCategory = document.querySelector('.modal-category');
    const closeBtn = document.querySelector('.close-btn');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('.gallery-title').textContent;
            const category = item.querySelector('.gallery-category').textContent;
            const itemCategory = item.getAttribute('data-category');
            
            // Clear previous content
            modalBody.innerHTML = '';
            
            // Add appropriate content based on category
            if (itemCategory === 'video' || itemCategory === 'motion') {
                // For video items, use the video element
                const videoContainer = document.createElement('div');
                videoContainer.className = 'modal-video-container';
                
                const video = document.createElement('video');
                video.className = 'modal-local-video';
                video.controls = true;
                
                // Get the source from the clicked item
                const sourceElement = item.querySelector('source');
                if (sourceElement) {
                    video.src = sourceElement.src;
                    video.type = sourceElement.type;
                }
                
                videoContainer.appendChild(video);
                modalBody.appendChild(videoContainer);
            } else {
                // For images, use the image
                const imgSrc = item.querySelector('.gallery-img').src;
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = title;
                img.className = 'modal-image';
                modalBody.appendChild(img);
            }
            
            // Set modal info
            modalTitle.textContent = title;
            modalCategory.textContent = category;
            
            // Show modal
            modal.style.display = 'block';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            // Pause any videos when closing modal
            const video = document.querySelector('.modal-local-video');
            if (video) {
                video.pause();
            }
        }, 300);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                // Pause any videos when closing modal
                const video = document.querySelector('.modal-local-video');
                if (video) {
                    video.pause();
                }
            }, 300);
        }
    });
});


  document.addEventListener('DOMContentLoaded', function() {
            // Elements
            const filterButtons = document.querySelectorAll('.filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');
            const seeMoreBtn = document.querySelector('.see-more-btn');
            const modal = document.getElementById('galleryModal');
            const closeBtn = document.querySelector('.close-btn');
            const modalBody = document.querySelector('.modal-body');
            const modalTitle = document.querySelector('.modal-title');
            const modalCategory = document.querySelector('.modal-category');
            const loader = document.querySelector('.loader');
            
            // Filter functionality
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Update active button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    const filter = button.getAttribute('data-filter');
                    
                    // Filter items
                    galleryItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                            // Add animation
                            item.style.animation = 'none';
                            setTimeout(() => {
                                item.style.animation = 'fadeInUp 0.6s forwards';
                            }, 10);
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
            
            // See more functionality
            let visibleItems = 4; // Initial number of visible items
            const allItems = Array.from(galleryItems);
            
            // Hide items beyond the initial visible count
            allItems.forEach((item, index) => {
                if (index >= visibleItems) {
                    item.classList.add('hidden');
                }
            });
            
            seeMoreBtn.addEventListener('click', () => {
                // Show next set of items
                const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
                const itemsToShow = Math.min(3, hiddenItems.length);
                
                for (let i = 0; i < itemsToShow; i++) {
                    if (hiddenItems[i]) {
                        hiddenItems[i].classList.remove('hidden');
                        hiddenItems[i].style.animation = 'fadeInUp 0.6s forwards';
                    }
                }
                
                // Hide button if no more items
                if (document.querySelectorAll('.gallery-item.hidden').length === 0) {
                    seeMoreBtn.style.display = 'none';
                }
            });
            
            // Modal functionality
            galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                    const isVideo = item.querySelector('.video-container');
                    const title = item.querySelector('.gallery-title').textContent;
                    const category = item.querySelector('.gallery-category').textContent;
                    
                    // Show loader
                    loader.style.display = 'block';
                    modalBody.innerHTML = '';
                    
                    // Set modal content
                    modalTitle.textContent = title;
                    modalCategory.textContent = category;
                    
                    if (isVideo) {
                        const video = item.querySelector('.video-element');
                        const videoSrc = video.querySelector('source').getAttribute('src');
                        const poster = video.getAttribute('poster');
                        
                        // Create video element for modal - NO CONTROLS ATTRIBUTE
                        const modalVideo = document.createElement('video');
                        modalVideo.className = 'modal-local-video';
                        modalVideo.setAttribute('poster', poster);
                        
                        const source = document.createElement('source');
                        source.setAttribute('src', videoSrc);
                        source.setAttribute('type', 'video/mp4');
                        
                        modalVideo.appendChild(source);
                        
                        // Create video controls container
                        const videoContainer = document.createElement('div');
                        videoContainer.className = 'modal-video-container';
                        
                        // Add video controls
                        const controls = document.createElement('div');
                        controls.className = 'video-controls';
                        
                        // Play/Pause button
                        const playBtn = document.createElement('button');
                        playBtn.className = 'video-control-btn';
                        playBtn.innerHTML = '<i class="fas fa-play"></i>';
                        
                        // Progress bar
                        const progressContainer = document.createElement('div');
                        progressContainer.className = 'progress-bar';
                        
                        const progress = document.createElement('div');
                        progress.className = 'progress';
                        
                        progressContainer.appendChild(progress);
                        
                        // Time display
                        const timeDisplay = document.createElement('div');
                        timeDisplay.className = 'time-display';
                        timeDisplay.textContent = '0:00 / 0:00';
                        
                        // Volume control
                        const volumeControl = document.createElement('div');
                        volumeControl.className = 'volume-control';
                        
                        const volumeBtn = document.createElement('button');
                        volumeBtn.className = 'video-control-btn';
                        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                        
                        const volumeSlider = document.createElement('div');
                        volumeSlider.className = 'volume-slider';
                        
                        const volumeLevel = document.createElement('div');
                        volumeLevel.className = 'volume-level';
                        
                        volumeSlider.appendChild(volumeLevel);
                        volumeControl.appendChild(volumeBtn);
                        volumeControl.appendChild(volumeSlider);
                        
                        // Fullscreen button
                        const fullscreenBtn = document.createElement('button');
                        fullscreenBtn.className = 'video-control-btn';
                        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                        
                        // Add controls to container
                        controls.appendChild(playBtn);
                        controls.appendChild(progressContainer);
                        controls.appendChild(timeDisplay);
                        controls.appendChild(volumeControl);
                        controls.appendChild(fullscreenBtn);
                        
                        videoContainer.appendChild(modalVideo);
                        videoContainer.appendChild(controls);
                        modalBody.appendChild(videoContainer);
                        
                        // Video control functionality
                        let isPlaying = false;
                        
                        // Auto-play video when modal opens
                        setTimeout(() => {
                            modalVideo.play();
                            isPlaying = true;
                            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        }, 300);
                        
                        playBtn.addEventListener('click', () => {
                            if (isPlaying) {
                                modalVideo.pause();
                                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                            } else {
                                modalVideo.play();
                                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                            }
                            isPlaying = !isPlaying;
                        });
                        
                        modalVideo.addEventListener('play', () => {
                            isPlaying = true;
                            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        });
                        
                        modalVideo.addEventListener('pause', () => {
                            isPlaying = false;
                            playBtn.innerHTML = '<i class="fas fa-play"></i>';
                        });
                        
                        // Progress bar update
                        modalVideo.addEventListener('timeupdate', () => {
                            const percent = (modalVideo.currentTime / modalVideo.duration) * 100;
                            progress.style.width = `${percent}%`;
                            
                            // Update time display
                            const currentTime = formatTime(modalVideo.currentTime);
                            const duration = formatTime(modalVideo.duration);
                            timeDisplay.textContent = `${currentTime} / ${duration}`;
                        });
                        
                        // Progress bar click to seek
                        progressContainer.addEventListener('click', (e) => {
                            const rect = progressContainer.getBoundingClientRect();
                            const percent = (e.clientX - rect.left) / rect.width;
                            modalVideo.currentTime = percent * modalVideo.duration;
                        });
                        
                        // Volume control
                        let isMuted = false;
                        
                        volumeBtn.addEventListener('click', () => {
                            if (isMuted) {
                                modalVideo.volume = 0.7;
                                volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                                volumeLevel.style.width = '70%';
                            } else {
                                modalVideo.volume = 0;
                                volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                                volumeLevel.style.width = '0%';
                            }
                            isMuted = !isMuted;
                        });
                        
                        volumeSlider.addEventListener('click', (e) => {
                            const rect = volumeSlider.getBoundingClientRect();
                            const percent = (e.clientX - rect.left) / rect.width;
                            modalVideo.volume = percent;
                            volumeLevel.style.width = `${percent * 100}%`;
                            
                            if (percent === 0) {
                                volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                                isMuted = true;
                            } else {
                                volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                                isMuted = false;
                            }
                        });
                        
                        // Fullscreen
                        fullscreenBtn.addEventListener('click', () => {
                            if (!document.fullscreenElement) {
                                videoContainer.requestFullscreen().catch(err => {
                                    console.log(`Error attempting to enable fullscreen: ${err.message}`);
                                });
                                fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
                            } else {
                                document.exitFullscreen();
                                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                            }
                        });
                        
                        // Format time helper function
                        function formatTime(seconds) {
                            const mins = Math.floor(seconds / 60);
                            const secs = Math.floor(seconds % 60);
                            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
                        }
                        
                    } else {
                        // Handle image modal
                        const imgSrc = item.querySelector('.gallery-img').getAttribute('src');
                        const img = document.createElement('img');
                        img.className = 'modal-image';
                        img.src = imgSrc;
                        img.alt = title;
                        
                        modalBody.appendChild(img);
                    }
                    
                    // Hide loader and show modal
                    setTimeout(() => {
                        loader.style.display = 'none';
                        modal.classList.add('show');
                    }, 500);
                });
            });
            
            // Close modal
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
                
                // Pause any playing videos
                const modalVideo = modalBody.querySelector('video');
                if (modalVideo) {
                    modalVideo.pause();
                }
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    
                    // Pause any playing videos
                    const modalVideo = modalBody.querySelector('video');
                    if (modalVideo) {
                        modalVideo.pause();
                    }
                }
            });
            
            // Auto-play gallery videos on hover
            galleryItems.forEach(item => {
                const video = item.querySelector('.video-element');
                if (video) {
                    item.addEventListener('mouseenter', () => {
                        video.play();
                    });
                    
                    item.addEventListener('mouseleave', () => {
                        video.pause();
                        video.currentTime = 0;
                    });
                }
            });
        });
