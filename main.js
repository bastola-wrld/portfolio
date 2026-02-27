import { animate, stagger } from 'animejs';

document.addEventListener('DOMContentLoaded', () => {
  // Dynamic Year in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });
  }

  // Smooth Scrolling for Inter-page links (Optional: standard HTML scroll-behavior handles most)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
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

  initAiBackground();
  initTypewriter();
  initContactForm('contact');
  initContactForm('home-contact');
  initAnimeBackground();
});

// AnimeJS Hero Animated SVG Background
function initAnimeBackground() {
  const shadowSvg = document.querySelector('.anime-shadow-svg');
  if (!shadowSvg) return;

  // Breathing effect on the shadow shapes
  animate('.shadow-head, .shadow-body', {
    scale: [
      { to: 1.04, ease: 'inOutSine', duration: 2000 },
      { to: 1, ease: 'inOutSine', duration: 2000 }
    ],
    opacity: [
      { to: 0.28, ease: 'inOutSine', duration: 2000 },
      { to: 0.15, ease: 'inOutSine', duration: 2000 }
    ],
    loop: true,
    alternate: true,
    delay: stagger(400)
  });

  // Slow floating drift
  animate('.shadow-body', {
    translateY: [
      { to: -12, ease: 'inOutQuad', duration: 3500 },
      { to: 0, ease: 'inOutQuad', duration: 3500 }
    ],
    loop: true,
    alternate: true
  });

  // Particle Aura
  animate('.aura-particle', {
    translateX: () => (Math.random() - 0.5) * 80,
    translateY: () => (Math.random() - 0.5) * 80,
    opacity: [
      { to: 0.6, duration: 1500 },
      { to: 0, duration: 1500 }
    ],
    scale: [
      { to: 1.5, duration: 1500 },
      { to: 0.5, duration: 1500 }
    ],
    loop: true,
    alternate: true,
    delay: stagger(150, { from: 'center' }),
    ease: 'inOutSine'
  });

  // Mouse Parallax Effect
  document.addEventListener('mousemove', (e) => {
    const xOffset = (e.clientX / window.innerWidth - 0.5) * 30;
    const yOffset = (e.clientY / window.innerHeight - 0.5) * 20;

    animate('.shadow-group', {
      translateX: xOffset,
      translateY: yOffset,
      duration: 1200,
      ease: 'outExpo'
    });
  });
}

// Typewriter Effect
function initTypewriter() {
  const textElement = document.querySelector('.typewriter-text');
  if (!textElement) return;

  const phrases = [
    "a Software Engineer.",
    "an AI Researcher.",
    "an Ethical Innovator.",
    "a System Architect."
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // Deleting is faster
    } else {
      textElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100; // Typing speed
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before new phrase
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// AI Background Animation Logic
function initAiBackground() {
  const canvas = document.createElement('canvas');
  canvas.id = 'ai-background';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  // Configuration
  const particleCount = window.innerWidth < 768 ? 50 : 100; // Fewer particles on mobile
  const connectionDistance = 150;
  const mouseDistance = 200;
  const particleSpeed = 0.5;

  let mouse = { x: null, y: null };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  resize();
  window.addEventListener('resize', () => {
    resize();
    initParticles(); // Re-init on resize to prevent clustering
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * particleSpeed;
      this.vy = (Math.random() - 0.5) * particleSpeed;
      this.size = Math.random() * 2 + 1;
      this.color = 'rgba(59, 130, 246, ' + (Math.random() * 0.5 + 0.2) + ')'; // Blue-ish
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off walls
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x != null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseDistance - distance) / mouseDistance;
          const directionX = forceDirectionX * force * particleSpeed * 5; // Push strength
          const directionY = forceDirectionY * force * particleSpeed * 5;

          // Gently push away
          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connections
      for (let j = i; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          ctx.beginPath();
          let opacity = 1 - (distance / connectionDistance);
          ctx.strokeStyle = 'rgba(59, 130, 246, ' + (opacity * 0.2) + ')'; // Subtle blue lines
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
}

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
      btn.textContent = 'Send Message';

      if (state.status === 'success') {
        msgEl.textContent = "Message sent! Important: Since this is the first time, you might need to click an activation link sent to your email by Formsubmit.co.";
        msgEl.style.color = '#10B981'; // Green
      } else if (state.status === 'error') {
        msgEl.textContent = "Something went wrong. Please try again.";
        msgEl.style.color = '#EF4444'; // Red
      }
    }
  }

  // "Controlled" Event Listeners
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
