document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  window.addEventListener('load', function() {
      const loader = document.querySelector('.loader');
      setTimeout(() => {
          loader.classList.add('hidden');
      }, 1000);
  });

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('nav');
  
  mobileMenuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.innerHTML = nav.classList.contains('active') ? 
          '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Close mobile menu when clicking on nav link
  document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
          nav.classList.remove('active');
          mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
  });

  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });

  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
          backToTopBtn.classList.add('visible');
      } else {
          backToTopBtn.classList.remove('visible');
      }
  });

  backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              window.scrollTo({
                  top: target.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Product card hover effect
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-10px)';
          this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
          this.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
      });
  });

  // Testimonial slider
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
      let isDown = false;
      let startX;
      let scrollLeft;

      testimonialSlider.addEventListener('mousedown', (e) => {
          isDown = true;
          startX = e.pageX - testimonialSlider.offsetLeft;
          scrollLeft = testimonialSlider.scrollLeft;
      });

      testimonialSlider.addEventListener('mouseleave', () => {
          isDown = false;
      });

      testimonialSlider.addEventListener('mouseup', () => {
          isDown = false;
      });

      testimonialSlider.addEventListener('mousemove', (e) => {
          if(!isDown) return;
          e.preventDefault();
          const x = e.pageX - testimonialSlider.offsetLeft;
          const walk = (x - startX) * 2;
          testimonialSlider.scrollLeft = scrollLeft - walk;
      });
  }

  // WhatsApp order confirmation
  document.querySelectorAll('.btn-wa').forEach(btn => {
      btn.addEventListener('click', function(e) {
          if (!confirm('Anda akan diarahkan ke WhatsApp untuk memesan. Lanjutkan?')) {
              e.preventDefault();
          }
      });
  });

  // Animation on scroll
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if(elementPosition < screenPosition) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  };

  // Set initial state for animation
  const animatedElements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card');
  animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Trigger once on load

  // Dark mode toggle (optional)
  const darkModeToggle = document.createElement('div');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.innerHTML = `
      <button class="toggle-btn" aria-label="Toggle dark mode">
          <i class="fas fa-moon"></i>
      </button>
  `;
  document.body.appendChild(darkModeToggle);

  const toggleBtn = document.querySelector('.toggle-btn');
  toggleBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const icon = this.querySelector('i');
      
      if(document.body.classList.contains('dark-mode')) {
          icon.classList.replace('fa-moon', 'fa-sun');
          localStorage.setItem('darkMode', 'enabled');
      } else {
          icon.classList.replace('fa-sun', 'fa-moon');
          localStorage.setItem('darkMode', 'disabled');
      }
  });

  // Check for saved dark mode preference
  if(localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      toggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
  }
});

// Dark mode styles
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
  body.dark-mode {
      background-color: #121212;
      color: #f5f5f5;
  }
  
  body.dark-mode header {
      background-color: #1e1e1e !important;
  }
  
  body.dark-mode nav {
      background-color: #1e1e1e !important;
  }
  
  body.dark-mode .feature-card,
  body.dark-mode .product-card,
  body.dark-mode .testimonial-card {
      background-color: #1e1e1e;
      color: #f5f5f5;
  }
  
  body.dark-mode .product-desc,
  body.dark-mode .section-subtitle {
      color: #ccc !important;
  }
  
  body.dark-mode .contact-item i {
      background-color: var(--secondary) !important;
  }
`;
document.head.appendChild(darkModeStyles);