document.addEventListener('DOMContentLoaded', () => {
  // Dynamic Year in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.nav-mobile-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const expanded = navLinks.classList.contains('active');
      mobileBtn.setAttribute('aria-expanded', expanded);
      mobileBtn.textContent = expanded ? '✕' : '☰';
    });
  }

  // Smooth Scrolling for Inter-page links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          if (mobileBtn) {
            mobileBtn.setAttribute('aria-expanded', 'false');
            mobileBtn.textContent = '☰';
          }
        }

        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  initContactForm('home-contact');

  // Scroll Reveal Logic
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(section => {
    observer.observe(section);
  });
});

// Contact Form Logic (Formsubmit.co)
const FORMS_ENDPOINT = "https://formsubmit.co/ajax/baburambastola716@gmail.com";

function initContactForm(formName) {
  const form = document.querySelector(`form[name="${formName}"]`);
  if (!form) return;

  const btn = form.querySelector('button[type="submit"]');
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  // State
  let state = {
    name: "",
    email: "",
    message: "",
    status: "idle" // "idle" | "sending" | "success" | "error"
  };

  // Status message element
  const msgEl = document.createElement('p');
  msgEl.className = 'form-status-msg';
  msgEl.style.marginTop = '15px';
  msgEl.style.fontWeight = '500';
  form.appendChild(msgEl);

  function render() {
    nameInput.value = state.name;
    emailInput.value = state.email;
    messageInput.value = state.message;

    if (state.status === 'sending') {
      btn.disabled = true;
      btn.textContent = 'Sending...';
      msgEl.textContent = '';
    } else {
      btn.disabled = false;
      btn.textContent = 'Deploy Message';

      if (state.status === 'success') {
        msgEl.textContent = "Message sent! Important: Since this is the first time, you might need to click an activation link sent to your email by Formsubmit.co.";
        msgEl.style.color = '#00ff88'; // Green accent matching theme
      } else if (state.status === 'error') {
        msgEl.textContent = "Something went wrong. Please try again.";
        msgEl.style.color = '#ff5f56'; // Red accent
      }
    }
  }

  nameInput.addEventListener('input', (e) => { state.name = e.target.value; render(); });
  emailInput.addEventListener('input', (e) => { state.email = e.target.value; render(); });
  messageInput.addEventListener('input', (e) => { state.message = e.target.value; render(); });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    state.status = 'sending';
    render();

    try {
      const response = await fetch(FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          message: state.message,
          _captcha: false
        })
      });

      if (response.ok) {
        state.status = 'success';
        state.name = '';
        state.email = '';
        state.message = '';
      } else {
        state.status = 'error';
      }
    } catch (err) {
      state.status = 'error';
    }
    render();
  });
}
