// Combined script with all requested functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile navigation toggle
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            
            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                const icon = menuToggle.querySelector('i');
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
            
            // Close mobile menu when clicking links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                });
            });
            
            // Theme toggle
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.body.classList.toggle('dark-mode');
                    
                    // Save theme preference
                    if (document.body.classList.contains('dark-mode')) {
                        localStorage.setItem('theme', 'dark');
                    } else {
                        localStorage.setItem('theme', 'light');
                    }
                });
            }
            
            // Check for saved theme preference
            if (localStorage.getItem('theme') === 'dark') {
                document.body.classList.add('dark-mode');
            }
            
            // Active nav link highlighting
            window.addEventListener('scroll', function() {
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('.nav-links a');
                
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === current) {
                        link.classList.add('active');
                    }
                });
            });
            
            // Smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Back to top button
            const backToTop = document.querySelector('.back-to-top');
            if (backToTop) {
                window.addEventListener('scroll', function() {
                    if (window.pageYOffset > 300) {
                        backToTop.classList.add('visible');
                    } else {
                        backToTop.classList.remove('visible');
                    }
                });
                
                backToTop.addEventListener('click', function() {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
            
            // Form validation
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Get form data
                    const name = document.getElementById('name').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const phone = document.getElementById('phone').value.trim();
                    const service = document.getElementById('service').value;
                    const message = document.getElementById('message').value.trim();
                    const gdpr = document.getElementById('gdpr').checked;
                    
                    // Validate form
                    if (!name || !email || !phone || !service || !message || !gdpr) {
                        showValidationMessage('Please fill in all required fields and accept GDPR consent', 'error');
                        return;
                    }
                    
                    // Email validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        showValidationMessage('Please enter a valid email address', 'error');
                        return;
                    }
                    
                    // Phone validation (basic)
                    if (phone.replace(/\D/g, '').length < 8) {
                        showValidationMessage('Please enter a valid phone number', 'error');
                        return;
                    }
                    
                    // Show success message
                    showValidationMessage('Message sent successfully! We\'ll contact you soon.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                });
            }
            
            // Validation message function
            function showValidationMessage(message, type) {
                const messageElement = document.createElement('div');
                messageElement.className = `validation-message validation-${type}`;
                messageElement.innerHTML = `
                    <span>${message}</span>
                    <span class="close-btn">&times;</span>
                `;
                document.body.appendChild(messageElement);
                
                // Auto-remove after 5 seconds
                setTimeout(() => {
                    messageElement.remove();
                }, 5000);
                
                // Close button functionality
                messageElement.querySelector('.close-btn').addEventListener('click', function() {
                    messageElement.remove();
                });
            }
            
            // Project booking button
            document.getElementById('projectBooking').addEventListener('click', function() {
                window.location.href = 'Contact.html';
            });
            
            // Typing animation
            const phrases = [
                "Transform Your Digital Presence",
                "Premium Web Solutions",
                "E-Commerce Experts",
                "Mobile App Development",
                "Business Registration"
            ];
            
            const typingElement = document.querySelector('.typing-text');
            if (typingElement) {
                let currentPhraseIndex = 0;
                let charIndex = 0;
                let isDeleting = false;
                let typingSpeed = 150;
                
                function type() {
                    const currentPhrase = phrases[currentPhraseIndex];
                    
                    if (isDeleting) {
                        // Deleting characters
                        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                        charIndex--;
                        typingSpeed = 50;
                    } else {
                        // Typing characters
                        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                        charIndex++;
                        typingSpeed = 150;
                    }
                    
                    // When phrase is complete
                    if (!isDeleting && charIndex === currentPhrase.length) {
                        isDeleting = true;
                        typingSpeed = 2000; // Pause at end of phrase
                    } else if (isDeleting && charIndex === 0) {
                        isDeleting = false;
                        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                    }
                    
                    setTimeout(type, typingSpeed);
                }
                
                // Start typing animation
                setTimeout(type, 1000);
            }
            
            // Stats counter animation
            const stats = document.querySelectorAll('.stat-number');
            if (stats.length) {
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    let count = 0;
                    const increment = target / 50;
                    
                    const updateCount = () => {
                        if (count < target) {
                            count += increment;
                            stat.textContent = Math.min(Math.ceil(count), target);
                            setTimeout(updateCount, 50);
                        } else {
                            stat.textContent = target;
                        }
                    };
                    
                    // Start counting when element is in view
                    const observer = new IntersectionObserver((entries) => {
                        if (entries[0].isIntersecting) {
                            updateCount();
                            observer.disconnect();
                        }
                    }, { threshold: 0.5 });
                    
                    observer.observe(stat);
                });
            }
            
            // Initialize particles.js
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 80, density: { enable: true, value_area: 800 } },
                        color: { value: "#3b82f6" },
                        shape: { type: "circle" },
                        opacity: { value: 0.5, random: true },
                        size: { value: 3, random: true },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: "#8b5cf6",
                            opacity: 0.4,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: "none",
                            random: true,
                            straight: false,
                            out_mode: "out"
                        }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: { enable: true, mode: "grab" },
                            onclick: { enable: true, mode: "push" },
                            resize: true
                        }
                    }
                });
            }
            
            // Video modal functionality
            const modal = document.getElementById('videoModal');
            const video = document.getElementById('portfolioVideo');
            const viewBtn = document.getElementById('viewVideoBtn');
            const closeBtn = document.getElementById('closeModal');
            
            if (viewBtn && modal) {
                viewBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    modal.style.display = 'flex';
                    video.play();
                    document.body.style.overflow = 'hidden';
                });
                
                closeBtn.addEventListener('click', function() {
                    modal.style.display = 'none';
                    video.pause();
                    document.body.style.overflow = 'auto';
                });
                
                window.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        modal.style.display = 'none';
                        video.pause();
                        document.body.style.overflow = 'auto';
                    }
                });
            }
            
            // Process step animation
            let currentStep = 1;
            const processLine = document.getElementById('processLine');
            const steps = document.querySelectorAll('.step');
            
            function activateStep(stepNum) {
                steps.forEach(step => step.classList.remove('active'));
                document.getElementById(`step${stepNum}`).classList.add('active');
                processLine.style.width = `${(stepNum - 1) * 25}%`;
            }
            
            setInterval(() => {
                currentStep = currentStep < 5 ? currentStep + 1 : 1;
                activateStep(currentStep);
            }, 2000);
            
            activateStep(1);
        });

        // selector 
         
        function setSelectedPlan(planValue, planText) {
            document.getElementById("service").value = planValue;
            
            // Optional: Scroll to form
            document.getElementById("contactForm").scrollIntoView({ behavior: "smooth" });
        }

        