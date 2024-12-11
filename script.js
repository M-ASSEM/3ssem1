document.addEventListener('DOMContentLoaded', function() {
    // Advanced Typing Effect with Multiple Languages
    const typedTextElement = document.querySelector('.input');
    const phrases = [
        'UX Designer 🎨', 
        'AI Enthusiast 🤖', 
        'Python Developer 🐍', 
        'Machine Learning Expert 📊',
        'Tech Innovator 💡'
    ];
    let phraseIndex = 0;
    let letterIndex = 0;
    let currentPhrase = [];
    let isDeleting = false;

    function type() {
        const fullPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            currentPhrase.pop();
            typedTextElement.textContent = currentPhrase.join('');
        } else {
            currentPhrase.push(fullPhrase[letterIndex]);
            typedTextElement.textContent = currentPhrase.join('');
            letterIndex++;
        }

        if (!isDeleting && typedTextElement.textContent === fullPhrase) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && typedTextElement.textContent === '') {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            letterIndex = 0;
            setTimeout(type, 500);
        } else {
            const speed = isDeleting ? 50 : 100;
            setTimeout(type, speed);
        }
    }

    type();

    // Advanced Parallax and Mouse Tracking
    const heroSection = document.querySelector('.hero-header');
    const heroText = document.querySelector('.hero-text');
    const heroPic = document.querySelector('.hero-pic');

    window.addEventListener('mousemove', function(e) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (e.clientX - centerX) / 50;
        const moveY = (e.clientY - centerY) / 50;

        heroText.style.transform = `translate(${moveX}px, ${moveY}px) perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
        heroPic.style.transform = `translate(${-moveX * 1.5}px, ${-moveY * 1.5}px) perspective(1000px) rotateX(${moveY}deg) rotateY(${-moveX}deg)`;
    });

    // Advanced Scroll Reveal with Staggered Animation
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-section');
                    entry.target.style.transitionDelay = `${index * 0.2}s`;
                }, 100);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Code Snippet Hover Effect
    const codeSnippets = document.querySelectorAll('.code-snippet');
    
    codeSnippets.forEach(snippet => {
        snippet.addEventListener('mouseenter', function() {
            this.classList.add('highlight');
        });

        snippet.addEventListener('mouseleave', function() {
            this.classList.remove('highlight');
        });
    });

    // Navigation and Smooth Scroll Enhancements
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const toggleBtn = document.querySelector('.togglebtn');
    const navMenu = document.querySelector('.navlinks');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu after selection
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                toggleBtn.classList.remove('active');
            }
        });
    });

    toggleBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Cursor Trail Effect
    function createCursorTrail(e) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 500);
    }

    window.addEventListener('mousemove', createCursorTrail);

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (!name.value || !email.value || !message.value) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email.value)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual backend logic)
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification-${type}`);
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto-remove notification
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
    
    // Add notification styles to the document
    const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 30px;
        border-radius: 10px;
        z-index: 1000;
        color: white;
        font-weight: bold;
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        transition: opacity 0.5s ease;
    }
    
    .notification-success {
        background: linear-gradient(to right, #2ecc71, #27ae60);
    }
    
    .notification-error {
        background: linear-gradient(to right, #e74c3c, #c0392b);
    }
    
    .notification.fade-out {
        opacity: 0;
    }`;
    
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = notificationStyles;
    document.head.appendChild(styleSheet);
});
