// Main JavaScript file for EXPAT LAW website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navigation = document.querySelector('.navigation');
    
    if (navToggle) {
      navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');
        navigation.classList.toggle('mobile-nav');
      });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
          e.preventDefault();
          
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navigation ul li a');
    
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      
      if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
        link.classList.add('active');
      }
      
      if (currentLocation.endsWith('/') && linkPath === 'index.html') {
        link.classList.add('active');
      }
    });
    
    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        let isValid = true;
        
        // Simple validation
        if (!nameInput.value.trim()) {
          markInvalid(nameInput, 'Please enter your name');
          isValid = false;
        } else {
          markValid(nameInput);
        }
        
        if (!emailInput.value.trim()) {
          markInvalid(emailInput, 'Please enter your email');
          isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
          markInvalid(emailInput, 'Please enter a valid email address');
          isValid = false;
        } else {
          markValid(emailInput);
        }
        
        if (!messageInput.value.trim()) {
          markInvalid(messageInput, 'Please enter your message');
          isValid = false;
        } else {
          markValid(messageInput);
        }
        
        if (isValid) {
          // Here you would normally send the form data to a server
          const formSuccess = document.getElementById('form-success');
          if (formSuccess) {
            formSuccess.style.display = 'block';
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
              formSuccess.style.display = 'none';
            }, 5000);
          }
        }
      });
    }
    
    // Helper functions for form validation
    function markInvalid(input, message) {
      input.classList.add('invalid');
      const errorElement = input.nextElementSibling;
      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
      }
    }
    
    function markValid(input) {
      input.classList.remove('invalid');
      const errorElement = input.nextElementSibling;
      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
      }
    }
    
    function isValidEmail(email) {
      // Basic email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });