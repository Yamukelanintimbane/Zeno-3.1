// Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Save theme preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
        
        // FAQ accordion
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
        
        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        menuToggle.querySelector('i').classList.add('fa-bars');
                        menuToggle.querySelector('i').classList.remove('fa-times');
                    }
                }
            });
        });

        // Map enquiry types to readable format
        const enquiryTypes = {
            'web-development': 'Web Development',
            'mobile-apps': 'Mobile Apps',
            'ecommerce': 'E-Commerce',
            'business-registration': 'Business Registration',
            'other': 'Other'
        };

        const planNames = {
            'starter-pack': 'Starter Pack (R999)',
            'basic': 'Basic (R1,499)',
            'professional': 'Professional (R3,999)',
            'enterprise': 'Enterprise (R7,499)',
            'ecommerce-pro': 'eCommerce Pro (R4,999/mo)',
            'business-launch-pack': 'Business Launch Pack (R14,999)'
        };

        // Get form data
        function getFormData() {
            return {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                enquiryType: document.getElementById('enquiryType').value,
                plan: document.getElementById('plan').value,
                message: document.getElementById('message').value
            };
        }

        // Validate form
        function validateForm() {
            // Get form data
            const formData = getFormData();

            // Check for empty fields
            const missingFields = [];
            if (!formData.name?.trim()) missingFields.push("Name");
            if (!formData.email?.trim()) missingFields.push("Email");
            if (!formData.message?.trim()) missingFields.push("Message");

            // If any field is missing, show error and prevent submission
            if (missingFields.length > 0) {
                showValidationError(`Please fill in all required fields:\n${missingFields.join(", ")}`);
                return false;
            }

            // Additional validation (e.g., email format)
            if (!isValidEmail(formData.email)) {
                showValidationError("Please enter a valid email address.");
                return false;
            }

            // All checks passed
            return true;
        }

        /**
         * Displays a styled error message (replaces default `alert()`).
         * @param {string} message - The error message to display.
         */
        function showValidationError(message) {
            // Create a modal or use a nicer alert (e.g., SweetAlert, Toast, or custom HTML)
            const errorBox = document.createElement("div");
            errorBox.className = "validation-error";
            errorBox.innerHTML = `
                <div class="error-content">
                    <span class="close-btn">&times;</span>
                    <p>${message}</p>
                </div>
            `;
            document.body.appendChild(errorBox);

            // Close on button click
            errorBox.querySelector(".close-btn").addEventListener("click", () => {
                errorBox.remove();
            });

            // Auto-close after 5 seconds
            setTimeout(() => errorBox.remove(), 5000);
        }

        /**
         * Basic email validation.
         * @param {string} email - The email to validate.
         * @returns {boolean} - `true` if valid, `false` otherwise.
         */
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Email button handler
        document.getElementById('emailBtn').addEventListener('click', function() {
            if (!validateForm()) return;
            
            const formData = getFormData();
            const subject = `Enquiry About ${enquiryTypes[formData.enquiryType]} - My Plan: ${planNames[formData.plan]}`;
            const body = `Dear Zenolaunch Team,\n\nI would like to discuss a project:\n\nProject Type: ${enquiryTypes[formData.enquiryType]}\nPlan: ${planNames[formData.plan]}\n\nProject Details:\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`;
            
            // Encode for mailto link
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(body);
            
            // Show success message
            const successElement = document.getElementById('emailSuccess');
            successElement.style.display = 'block';
            
            // Redirect to email client after delay
            setTimeout(() => {
                window.location.href = `mailto:yamukelanintimbane@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
                successElement.style.display = 'none';
            }, 1000);
            
            // Reset form
            document.getElementById('contactForm').reset();
        });
        
        // Process Animation
        const processLine = document.getElementById('processLine');
        const steps = [
            document.getElementById('step1'),
            document.getElementById('step2'),
            document.getElementById('step3'),
            document.getElementById('step4'),
            document.getElementById('step5')
        ];
        const restartBtn = document.getElementById('restartBtn');
        let currentStep = 0;
        let animationInterval;
        
        // Function to animate the process
        function animateProcess() {
            // Reset all steps
            steps.forEach(step => {
                step.classList.remove('active');
            });
            
            // Reset progress line
            processLine.style.width = '0';
            
            // Reset current step
            currentStep = 0;
            
            // Start animation
            animationInterval = setInterval(() => {
                // Activate current step
                steps[currentStep].classList.add('active');
                
                // Update progress line
                const progressPercentage = (currentStep / (steps.length - 1)) * 100;
                processLine.style.width = `${progressPercentage}%`;
                
                // Move to next step
                currentStep++;
                
                // Stop when we reach the end
                if (currentStep >= steps.length) {
                    clearInterval(animationInterval);
                    
                    // Add pulse animation to the last step
                    steps[steps.length - 1].querySelector('.step-number').style.animation = 'pulse 1s ease-in-out 2';
                    
                    // Restart animation after delay
                    setTimeout(() => {
                        animateProcess();
                    }, 3000);
                }
            }, 800);
        }
        
        // Start the animation when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            // Animate project cards
            document.querySelectorAll('.type-card').forEach(card => {
                card.classList.add('animate');
            });
            
            // Start process animation
            animateProcess();
        });
        
        // Restart button
        restartBtn.addEventListener('click', () => {
            clearInterval(animationInterval);
            animateProcess();
        });
        
        // Animate elements when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe all elements that need to be animated
        document.querySelectorAll('.type-card, .faq-item, .footer-column').forEach(el => {
            observer.observe(el);
        });