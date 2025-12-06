// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            if (window.innerWidth <= 768) {
                nav.style.display = 'none';
            }
        }
    });
    
    // Reservation Form Functionality
    const reservationForm = document.getElementById('reservationForm');
    const formNotification = document.getElementById('formNotification');
    const notificationText = document.getElementById('notificationText');
    
    if (reservationForm) {
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
            
            // Set maximum date to 6 months from now
            const maxDate = new Date();
            maxDate.setMonth(maxDate.getMonth() + 6);
            const maxDateFormatted = maxDate.toISOString().split('T')[0];
            dateInput.setAttribute('max', maxDateFormatted);
        }
        
        // Form submission
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            
            // Validation
            if (!name || !email || !phone || !date || !time || !guests) {
                showNotification('Veuillez remplir tous les champs obligatoires (*)', 'error');
                return;
            }
            
            // Format date for display
            const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Show success message
            showNotification('Réservation envoyée avec succès ! Vous recevrez une confirmation par email.', 'success');
            
            // Simulate form submission (in production, this would be an AJAX request)
            setTimeout(() => {
                // Reset form
                reservationForm.reset();
                
                // Update notification
                showNotification('Merci pour votre réservation. Notre équipe vous contactera dans les 24 heures pour confirmation.', 'success');
                
                // Hide notification after 5 seconds
                setTimeout(() => {
                    formNotification.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format French phone number: 01.23.45.67.89
            if (value.length > 2) {
                value = value.substring(0, 2) + '.' + value.substring(2);
            }
            if (value.length > 5) {
                value = value.substring(0, 5) + '.' + value.substring(5);
            }
            if (value.length > 8) {
                value = value.substring(0, 8) + '.' + value.substring(8);
            }
            if (value.length > 11) {
                value = value.substring(0, 11) + '.' + value.substring(11);
            }
            
            e.target.value = value;
        });
    }
    
    // Smooth scrolling for menu navigation
    const menuLinks = document.querySelectorAll('.menu-categories a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 120,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Helper function to show notifications
    function showNotification(message, type) {
        if (!formNotification || !notificationText) return;
        
        notificationText.textContent = message;
        
        if (type === 'success') {
            formNotification.style.backgroundColor = 'rgba(139, 115, 85, 0.1)';
            formNotification.style.borderColor = 'rgba(139, 115, 85, 0.3)';
            formNotification.querySelector('i').className = 'fas fa-check-circle';
        } else {
            formNotification.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            formNotification.style.borderColor = 'rgba(255, 0, 0, 0.3)';
            formNotification.querySelector('i').className = 'fas fa-exclamation-circle';
        }
        
        formNotification.style.display = 'flex';
    }
    
    // Initialize Model Viewer components
    if (typeof modelViewer !== 'undefined') {
        const models = document.querySelectorAll('model-viewer');
        models.forEach(model => {
            // Add loading state management
            model.addEventListener('load', () => {
                console.log('3D model loaded successfully');
            });
            
            model.addEventListener('error', () => {
                console.error('Failed to load 3D model');
            });
        });
    }
    
    // Responsive menu handling
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.style.display = '';
        } else {
            nav.style.display = 'none';
        }
    });
});
