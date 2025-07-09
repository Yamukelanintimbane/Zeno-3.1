document.addEventListener('DOMContentLoaded', function() {
    // Map service types to readable format
    const planTypes = {
        'enterprise': 'Portfolio (R499)',
        'starter-pack': 'Starter Pack (R999)',
        'Business': 'Business (R2,499)',
        'professional': 'Professional (R3,999)',
        'e-commerce-pro': 'ecommerce-pro (R6,999)'
    };

    // Get form data
    function getFormData() {
        return {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
    }

    // Validate form
    function validateForm() {
        const formData = getFormData();
        const missingFields = [];
        
        // Check required fields
        if (!formData.name.trim()) missingFields.push("Full Name");
        if (!formData.email.trim()) missingFields.push("Email Address");
        if (!formData.phone.trim()) missingFields.push("Phone Number");
        if (!formData.service.trim()) missingFields.push("Selected Plan");
        if (!formData.message.trim()) missingFields.push("Project Details");

        // GDPR consent
        const gdprCheckbox = document.getElementById('gdpr');
        if (!gdprCheckbox.checked) {
            missingFields.push("GDPR Consent");
        }

        // Show errors if any missing fields
        if (missingFields.length > 0) {
            showValidationMessage(`Please complete: ${missingFields.join(', ')}`, 'error');
            return false;
        }

        // Email validation
        if (!isValidEmail(formData.email)) {
            showValidationMessage("Please enter a valid email address", 'error');
            return false;
        }

        // Phone validation (at least 8 digits)
        const digits = formData.phone.replace(/\D/g, '');
        if (digits.length < 8) {
            showValidationMessage("Phone number must have at least 8 digits", 'error');
            return false;
        }

        return true;
    }

    // Show validation message
    function showValidationMessage(message, type) {
        // Remove existing messages
        const existing = document.querySelectorAll('.validation-message');
        existing.forEach(msg => msg.remove());
        
        // Create message element
        const messageBox = document.createElement('div');
        messageBox.className = `validation-message validation-${type}`;
        messageBox.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="close-btn">&times;</span>
            </div>
        `;
        
        document.body.appendChild(messageBox);
        
        // Add close functionality
        messageBox.querySelector('.close-btn').addEventListener('click', function() {
            messageBox.remove();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => messageBox.remove(), 5000);
    }

    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Handle form submission
    function handleFormSubmission(isBooking) {
        if (!validateForm()) return;
        
        const formData = getFormData();
        const planText = planTypes[formData.service] || formData.service;
        
        // Prepare email content
        const subject = isBooking ? 
            `Booking Consultation: ${planText}` : 
            `Enquiry: ${planText}`;
        
        const body = `Hello Zenolaunch Team,%0A%0A
I'm interested in: ${planText}%0A%0A
Project Details:%0A
${formData.message}%0A%0A
Contact Information:%0A
Name: ${formData.name}%0A
Email: ${formData.email}%0A
Phone: ${formData.phone}%0A%0A
Best regards,%0A
${formData.name}`;
        
        // Show confirmation
        showValidationMessage(
            "Your message is ready! Opening email client...", 
            'success'
        );
        
        // Open email client
        setTimeout(() => {
            window.location.href = `mailto:yamukelanintimbane@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        }, 1500);
        
        // Reset form
        document.getElementById('contactForm').reset();
    }

    // Event Listeners
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(false);
    });
    
    document.getElementById('projectBooking').addEventListener('click', function(e) {
        e.preventDefault();
        handleFormSubmission(true);
    });
});

///

// WILL IT CRASH ??

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
        showValidationError(`Please fill in all required fields: ${missingFields.join(", ")}`);
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
 * Displays a styled error message
 * @param {string} message - The error message to display.
 */
function showValidationError(message) {
    // Create error element
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
 * Basic email validation
 * @param {string} email - The email to validate
 * @returns {boolean} - `true` if valid, `false` otherwise
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