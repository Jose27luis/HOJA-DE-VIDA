// Esperar a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Navegación suave y activa
    initSmoothNavigation();
    
    // Animaciones de las barras de habilidades
    initSkillBars();
    
    // Animaciones de entrada
    initScrollAnimations();
    
    // Formulario de contacto
    initContactForm();
    
    // Efectos de paralaje suave
    initParallaxEffects();
    
    // Animaciones de las formas flotantes
    initFloatingShapes();
});

// Navegación suave y destacado de sección activa
function initSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .inicio-section');
    
    // Función para actualizar el enlace activo
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Actualizar en scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Smooth scroll para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animación de las barras de habilidades
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;
    
    function animateSkillBars() {
        if (skillsAnimated) return;
        
        const skillSection = document.querySelector('#skill');
        if (!skillSection) return;
        
        const sectionTop = skillSection.offsetTop;
        const sectionHeight = skillSection.clientHeight;
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition >= sectionTop - window.innerHeight / 2 && 
            scrollPosition <= sectionTop + sectionHeight) {
            
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (width) {
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                }
            });
            
            skillsAnimated = true;
        }
    }
    
    window.addEventListener('scroll', animateSkillBars);
}

// Animaciones de entrada para elementos
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category');
    
    function checkAnimations() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar elementos para animación
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', checkAnimations);
    checkAnimations(); // Ejecutar una vez al cargar
}

// Funcionalidad del formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simular envío del formulario
            showFormStatus('Enviando mensaje...', 'info');
            
            // Simular procesamiento
            setTimeout(() => {
                showFormStatus('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
}

// Mostrar estado del formulario
function showFormStatus(message, type) {
    // Eliminar mensajes anteriores
    const existingMessage = document.querySelector('.form-status');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Crear nuevo mensaje
    const statusDiv = document.createElement('div');
    statusDiv.className = `form-status ${type}`;
    statusDiv.textContent = message;
    
    // Estilos para el mensaje
    statusDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #4CAF50, #45a049);' : ''}
        ${type === 'info' ? 'background: linear-gradient(135deg, #667eea, #764ba2);' : ''}
        ${type === 'error' ? 'background: linear-gradient(135deg, #f44336, #d32f2f);' : ''}
    `;
    
    document.body.appendChild(statusDiv);
    
    // Mostrar mensaje
    setTimeout(() => {
        statusDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar mensaje después de 4 segundos
    setTimeout(() => {
        statusDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (statusDiv.parentNode) {
                statusDiv.parentNode.removeChild(statusDiv);
            }
        }, 300);
    }, 4000);
}

// Efectos de paralaje suave
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-shapes');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
}

// Animaciones adicionales para las formas flotantes
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Añadir movimiento adicional con el mouse
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (clientX - centerX) * 0.01 * (index + 1);
            const moveY = (clientY - centerY) * 0.01 * (index + 1);
            
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Efecto de escritura para el título principal
function initTypewriterEffect() {
    const title = document.querySelector('.inicio-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
    
    // Iniciar el efecto después de un breve retraso
    setTimeout(typeWriter, 1000);
}

// Contador animado para las estadísticas
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let counterAnimated = false;
    
    function animateCounters() {
        if (counterAnimated) return;
        
        const aboutSection = document.querySelector('#about');
        if (!aboutSection) return;
        
        const sectionTop = aboutSection.offsetTop;
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition >= sectionTop - window.innerHeight / 2) {
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace('+', ''));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = counter.textContent.includes('+') ? `+${target}` : target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = counter.textContent.includes('+') ? `+${Math.floor(current)}` : Math.floor(current);
                    }
                }, 40);
            });
            counterAnimated = true;
        }
    }
    
    window.addEventListener('scroll', animateCounters);
}

// Inicializar contador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initCounterAnimation();
});

// Efecto de partículas de fondo
function initParticleEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    
    let particles = [];
    const maxParticles = 50;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < maxParticles; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
            ctx.fill();
        });
        
        // Conectar partículas cercanas
        particles.forEach((particle1, i) => {
            particles.slice(i + 1).forEach(particle2 => {
                const dx = particle1.x - particle2.x;
                const dy = particle1.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle1.x, particle1.y);
                    ctx.lineTo(particle2.x, particle2.y);
                    ctx.strokeStyle = `rgba(102, 126, 234, ${0.2 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    initParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Función para manejar intersecciones de elementos (Intersection Observer)
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Agregar clase de animación si es necesario
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    const elementsToObserve = document.querySelectorAll(
        '.timeline-item, .project-card, .skill-category, .about-content, .contact-content'
    );
    
    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(element);
    });
}

// Inicializar todas las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Funciones principales
    initSmoothNavigation();
    initSkillBars();
    initScrollAnimations();
    initContactForm();
    initParallaxEffects();
    initFloatingShapes();
    initCounterAnimation();
    initIntersectionObserver();
    
    // Efectos adicionales (opcional - pueden ser comentados si causan problemas de rendimiento)
    // initParticleEffect();
    // initTypewriterEffect();
    
    // Agregar efecto de carga suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Optimización de rendimiento para el scroll
let ticking = false;

function updateOnScroll() {
    // Aquí van las funciones que necesitan ejecutarse en scroll
    if (!ticking) {
        requestAnimationFrame(() => {
            // Ejecutar funciones de scroll aquí
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.log('Error detectado:', e.error);
    // Aquí puedes agregar logging o manejo de errores personalizado
});

// Función para detectar dispositivos móviles
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustes específicos para móviles
function initMobileOptimizations() {
    if (isMobile()) {
        // Reducir animaciones en móviles para mejor rendimiento
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.3s !important;
                transition-duration: 0.3s !important;
            }
        `;
        document.head.appendChild(style);
        
        // Deshabilitar efectos de paralaje en móviles
        const parallaxElements = document.querySelectorAll('.floating-shapes');
        parallaxElements.forEach(element => {
            element.style.transform = 'none';
        });
    }
}

// Inicializar optimizaciones móviles
document.addEventListener('DOMContentLoaded', initMobileOptimizations);