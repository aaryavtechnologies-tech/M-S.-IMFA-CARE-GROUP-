/**
 * M/S. IMFA CARE GROUP – Main Website JavaScript
 * Handles navigation, mobile menu, scroll interactions, and WhatsApp form routing.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. DOM Elements ---
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const enquiryForm = document.getElementById('enquiryForm');

  // --- 2. Mobile Menu Toggle ---
  if (mobileToggle && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    const closeMenu = () => {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close on any nav link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          closeMenu();
        }
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // --- 3. Header Scroll Elevation & Shadow ---
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 4. Active Nav Item on Scroll (Scroll Spy) ---
  const sections = document.querySelectorAll('section[id], header[id]');
  const spyScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', spyScroll, { passive: true });

  // --- 5. WhatsApp Business Enquiry Form Submission ---
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const company = document.getElementById('companyName').value.trim();
      const category = document.getElementById('businessCategory').value;
      const phone = document.getElementById('phoneNumber').value.trim();
      const message = document.getElementById('enquiryMessage').value.trim();

      if (!name || !company || !category || !phone) {
        alert('Please fill in all required fields (*)');
        return;
      }

      // Format clean, professional WhatsApp text
      let text = `*BUSINESS ENQUIRY – M/S. IMFA CARE GROUP*\n`;
      text += `*Indian Medicines and Foods Arcade*\n`;
      text += `--------------------------------------\n`;
      text += `*Contact Person:* ${name}\n`;
      text += `*Company Name:* ${company}\n`;
      text += `*Category:* ${category}\n`;
      text += `*Phone Number:* ${phone}\n`;
      if (message) {
        text += `*Requirement Details:*\n${message}\n`;
      }
      text += `--------------------------------------\n`;
      text += `Enquiry submitted via Website Business Portal.`;

      const whatsappUrl = `https://wa.me/917606961180?text=${encodeURIComponent(text)}`;

      // Visual feedback on button
      const submitBtn = enquiryForm.querySelector('.btn-submit');
      const originalContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Opening WhatsApp...</span>`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Reset button state after brief delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
      }, 2500);
    });
  }
});

