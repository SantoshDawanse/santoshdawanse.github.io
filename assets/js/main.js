/**
 * Modern Minimalist Portfolio
 */

// ===================================
// Three.js Background Scene
// ===================================
function initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    // Create particles - more subtle
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0x00ff88,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create subtle geometric shapes
    const geometries = [
        new THREE.OctahedronGeometry(0.5),
        new THREE.IcosahedronGeometry(0.5)
    ];

    const material = new THREE.MeshStandardMaterial({
        color: 0x00ff88,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });

    const shapes = [];
    for (let i = 0; i < 8; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const mesh = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(50));
        mesh.position.set(x, y, z);
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;

        scene.add(mesh);
        shapes.push(mesh);
    }

    // Subtle lighting
    const pointLight = new THREE.PointLight(0x00ff88, 0.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Slow rotation
        particlesMesh.rotation.y += 0.0003;
        particlesMesh.rotation.x += 0.0001;

        // Rotate shapes
        shapes.forEach((shape, index) => {
            shape.rotation.x += 0.0005 * (index + 1);
            shape.rotation.y += 0.0005 * (index + 1);
            
            // Subtle floating
            shape.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.0005;
        });

        // Subtle camera movement based on mouse
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
        camera.position.y += (mouseY * 3 - camera.position.y) * 0.03;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();
}

// ===================================
// Navigation
// ===================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scroll with offset
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
      }
    });
  });
}

// ===================================
// Fade-in on Scroll
// ===================================
function initScrollAnimations() {
    const storyParagraphs = document.querySelectorAll('.story-paragraph');
    const timelinePoints = document.querySelectorAll('.timeline-point');
    const techCategories = document.querySelectorAll('.tech-category');
    const storyHighlightBox = document.querySelector('.story-highlight-box');
    const aboutLead = document.querySelector('.about-lead');
    const aboutCredentials = document.querySelector('.about-credentials');
    const aboutCta = document.querySelector('.about-cta');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.8s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe story paragraphs with stagger
    storyParagraphs.forEach((paragraph, index) => {
        paragraph.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(paragraph);
    });

    // Observe timeline points with stagger
    timelinePoints.forEach((point, index) => {
        point.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(point);
    });

    // Observe tech categories with stagger
    techCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(category);
    });

    // Observe highlight box
    if (storyHighlightBox) {
        observer.observe(storyHighlightBox);
    }

    // Observe about lead
    if (aboutLead) {
        observer.observe(aboutLead);
    }

    // Observe about credentials
    if (aboutCredentials) {
        observer.observe(aboutCredentials);
    }

    // Observe about CTA
    if (aboutCta) {
        observer.observe(aboutCta);
    }
}

// ===================================
// Smooth Page Load
// ===================================
function initPageLoad() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-in-out';
            document.body.style.opacity = '1';
        }, 50);
    });
}

// ===================================
// Theme Toggle
// ===================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a little rotation animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

// ===================================
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme toggle first
    initThemeToggle();
    
    // Initialize Three.js scene
    initThreeJS();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize page load animation
    initPageLoad();
});

// ===================================
// Cursor Effect (Subtle)
// ===================================
let lastTime = 0;
const throttleDelay = 100;

document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    
    if (currentTime - lastTime < throttleDelay) {
        return;
    }
    
    lastTime = currentTime;
    
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '4px';
    cursor.style.height = '4px';
    cursor.style.borderRadius = '50%';
    cursor.style.background = 'rgba(0, 255, 136, 0.4)';
    cursor.style.pointerEvents = 'none';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.zIndex = '9999';
    document.body.appendChild(cursor);

    setTimeout(() => {
        cursor.style.transition = 'all 0.5s ease-out';
        cursor.style.opacity = '0';
        cursor.style.transform = 'scale(2)';
        setTimeout(() => cursor.remove(), 500);
    }, 10);
});
