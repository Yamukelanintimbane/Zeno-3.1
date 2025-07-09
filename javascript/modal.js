    document.addEventListener('DOMContentLoaded', function() {
    // Video modal functionality
        const videoModal = document.getElementById('videoModal');
        const portfolioVideo = document.getElementById('portfolioVideo');
        const closeModalBtn = document.getElementById('closeModal');
        const viewVideoLinks = document.querySelectorAll('.view-video');
        
        // Open modal with video
        viewVideoLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                videoModal.classList.add('active');
                document.body.classList.add('modal-open');
                
                // Play video when modal is fully visible
                setTimeout(() => {
                    portfolioVideo.play();
                }, 500);
            });
        });
        
        // Close modal
        function closeModal() {
            videoModal.classList.remove('active');
            document.body.classList.remove('modal-open');
            portfolioVideo.pause();
        }
        
        closeModalBtn.addEventListener('click', closeModal);
        
        // Close modal when clicking outside content
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeModal();
            }
        });
        
        // Restart video when modal is closed
        portfolioVideo.addEventListener('pause', function() {
            if (!videoModal.classList.contains('active')) {
                portfolioVideo.currentTime = 0;
            }
        });
    });