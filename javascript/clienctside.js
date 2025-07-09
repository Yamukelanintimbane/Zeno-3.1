// Theme toggle functionality
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
        
        // Logo preview functionality
        const logoUpload = document.getElementById('logoUpload');
        const logoPreview = document.getElementById('logoPreview');
        const previewImage = document.getElementById('previewImage');
        
        logoUpload.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    logoPreview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });
        
        // Form validation and submission
        const businessForm = document.getElementById('businessForm');
        
        function showValidationMessage(message, type) {
            // Remove existing messages
            const existingMessages = document.querySelectorAll('.validation-message');
            existingMessages.forEach(msg => msg.remove());
            
            const messageBox = document.createElement("div");
            messageBox.className = `validation-message validation-${type}`;
            messageBox.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                    <span class="close-btn">&times;</span>
                </div>
            `;
            document.body.appendChild(messageBox);
            
            // Close on button click
            messageBox.querySelector(".close-btn").addEventListener("click", () => {
                messageBox.remove();
            });
            
            // Auto-close after 5 seconds
            setTimeout(() => messageBox.remove(), 5000);
        }
        
        function validateForm() {
            // Check required fields
            const companyName = document.getElementById('companyName').value.trim();
            const businessType = document.getElementById('businessType').value;
            const address = document.getElementById('address').value.trim();
            const registered = document.querySelector('input[name="registered"]:checked');
            const gdpr = document.getElementById('gdpr').checked;
            
            if (!companyName) {
                showValidationMessage("Please enter your company name.", 'error');
                return false;
            }
            
            if (!businessType) {
                showValidationMessage("Please select your business type.", 'error');
                return false;
            }
            
            if (!address) {
                showValidationMessage("Please enter your business address.", 'error');
                return false;
            }
            
            if (!registered) {
                showValidationMessage("Please specify if your business is registered.", 'error');
                return false;
            }
            
            if (!gdpr) {
                showValidationMessage("You must agree to the data processing terms.", 'error');
                return false;
            }
            
            return true;
        }
        
        function getFormData() {
            return {
                companyName: document.getElementById('companyName').value,
                businessType: document.getElementById('businessType').value,
                address: document.getElementById('address').value,
                registered: document.querySelector('input[name="registered"]:checked')?.value,
                designStyle: document.getElementById('designStyle').value,
                members: document.getElementById('members').value,
                hostingBudget: document.getElementById('hostingBudget').value,
                preferences: document.getElementById('preferences').value,
                hasLogo: logoUpload.files.length > 0 ? "Yes" : "No"
            };
        }
        
        function sendEmail(formData) {
            const subject = "New Business Information Submission";
            let body = `New business information submitted:\n\n`;
            
            body += `Company Name: ${formData.companyName}\n`;
            body += `Business Type: ${formData.businessType}\n`;
            body += `Business Address: ${formData.address}\n`;
            body += `Registered Business: ${formData.registered}\n`;
            body += `Design Preference: ${formData.designStyle || 'Not specified'}\n`;
            body += `Team Members: ${formData.members || 'Not specified'}\n`;
            body += `Hosting Budget: ${formData.hostingBudget || 'Not specified'}\n`;
            body += `Logo Uploaded: ${formData.hasLogo}\n\n`;
            body += `Additional Preferences:\n${formData.preferences || 'None'}\n`;
            
            // Encode for mailto link
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(body);
            
            // Show success message
            showValidationMessage("Your information has been submitted successfully! Redirecting to email...", 'success');
            
            // Redirect to email client after delay
            setTimeout(() => {
                window.location.href = `mailto:yamukelanintimbane@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
            }, 1500);
        }
        
        businessForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) return;
            
            const formData = getFormData();
            sendEmail(formData);
        });