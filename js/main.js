/* ==========================================
   OPTRAA™ — Main JavaScript
   INZAxis Tech Services Pvt. Ltd.
   ========================================== */

'use strict';

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===== AOS (Animate on Scroll) ===== */
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-aos]').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.05}s`;
  aosObserver.observe(el);
});

/* ===== ERP PLANS DATA ===== */
const plansData = {
  school: [
    {
      name: 'Basic Tracker',
      icon: '📋',
      tagline: 'For small schools just getting started with digital management.',
      ribbon: { text: 'Starter', cls: 'starter' },
      price: '4,999',
      period: '/month',
      note: 'Per institution · Up to 500 students',
      features: [
        'Student & Staff Management',
        'Attendance Tracking',
        'Basic Report Cards',
        'Parent SMS Alerts',
        'Fee Management',
        { text: 'Tally Integration', na: true },
        { text: 'Mobile App Access', na: true },
        { text: 'AI Performance Analytics', na: true },
      ],
      popular: false,
    },
    {
      name: 'Comprehensive ERP',
      icon: '🏫',
      tagline: 'The complete solution for growing schools — everything you need.',
      ribbon: { text: 'Most Popular', cls: '' },
      price: '12,999',
      period: '/month',
      note: 'Per institution · Up to 2,000 students',
      features: [
        'Everything in Basic Tracker',
        'Tally & Fee Integration',
        'Pre-Admission Portal',
        'AI Performance Analytics',
        'Mobile App (Parent & Staff)',
        'Communication Hub (SMS/Email)',
        'Exam & Result Management',
        '24×7 Premium Support',
      ],
      popular: true,
    },
    {
      name: 'Enterprise Suite',
      icon: '🏢',
      tagline: 'For large school groups, chains, and multi-branch institutions.',
      ribbon: null,
      price: 'Custom',
      period: '',
      note: 'Unlimited students · Multi-branch',
      features: [
        'Everything in Comprehensive',
        'Multi-Branch Management',
        'Custom ERP Integration',
        'Dedicated Account Manager',
        'On-site Staff Training',
        'Custom Module Development',
        'White-label Option',
        'SLA with 4hr Response',
      ],
      popular: false,
    },
  ],
  college: [
    {
      name: 'College Starter',
      icon: '🎓',
      tagline: 'For small degree colleges beginning their ERP journey.',
      ribbon: { text: 'Starter', cls: 'starter' },
      price: '7,999',
      period: '/month',
      note: 'Per institution · Up to 1,000 students',
      features: [
        'Student & Faculty Management',
        'Attendance Module',
        'Internal Marks & Grading',
        'Parent / Guardian Portal',
        'Fee Management',
        { text: 'Admission Management', na: true },
        { text: 'Hostel Module', na: true },
        { text: 'Library Integration', na: true },
      ],
      popular: false,
    },
    {
      name: 'College Comprehensive',
      icon: '🏛️',
      tagline: 'Full-featured college ERP — academic, financial, and administrative.',
      ribbon: { text: 'Most Popular', cls: '' },
      price: '18,999',
      period: '/month',
      note: 'Per institution · Up to 5,000 students',
      features: [
        'Everything in College Starter',
        'Admission Management System',
        'Tally & Finance Integration',
        'Hostel & Transport Module',
        'Library Management System',
        'Mobile App (Students & Faculty)',
        'Placement Cell Module',
        '24×7 Premium Support',
      ],
      popular: true,
    },
    {
      name: 'University Suite',
      icon: '🏗️',
      tagline: 'For universities, autonomous colleges, and multi-campus networks.',
      ribbon: null,
      price: 'Custom',
      period: '',
      note: 'Unlimited students · Multi-campus',
      features: [
        'Everything in Comprehensive',
        'Multi-Campus Management',
        'UGC/NAAC Reporting Tools',
        'Research & Publication Tracker',
        'Alumni Management Portal',
        'API & Third-party Integration',
        'Dedicated Implementation Team',
        'Custom SLA Agreement',
      ],
      popular: false,
    },
  ],
};

function renderPlans(type) {
  const grid = document.getElementById('plansGrid');
  const plans = plansData[type];
  grid.innerHTML = plans.map(plan => `
    <div class="plan-card${plan.popular ? ' popular' : ''}">
      ${plan.ribbon ? `<div class="plan-ribbon${plan.ribbon.cls ? ' ' + plan.ribbon.cls : ''}">${plan.ribbon.text}</div>` : ''}
      <div class="plan-icon">${plan.icon}</div>
      <div class="plan-name">${plan.name}</div>
      <p class="plan-tagline">${plan.tagline}</p>
      <div class="plan-price">
        ${plan.price === 'Custom' ? `<span class="price-amount" style="font-size:1.8rem">Custom</span>` : `<span class="price-currency">₹</span><span class="price-amount">${plan.price}</span><span class="price-period">${plan.period}</span>`}
      </div>
      <p class="price-note">${plan.note}</p>
      <ul class="plan-features">
        ${plan.features.map(f => {
          if (typeof f === 'string') return `<li>${f}</li>`;
          return `<li class="na">${f.text}</li>`;
        }).join('')}
      </ul>
      <a href="#contact" class="plan-cta">${plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}</a>
    </div>
  `).join('');
}

const moduleToggle = document.getElementById('moduleToggle');
const lblSchool = document.getElementById('lbl-school');
const lblCollege = document.getElementById('lbl-college');

renderPlans('school');

moduleToggle.addEventListener('change', () => {
  const isCollege = moduleToggle.checked;
  renderPlans(isCollege ? 'college' : 'school');
  lblSchool.style.color = isCollege ? 'var(--text-muted)' : 'var(--primary)';
  lblCollege.style.color = isCollege ? 'var(--secondary)' : 'var(--text-muted)';
  // Re-observe new cards
  document.querySelectorAll('.plan-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 80);
  });
});

/* ===== LOGIN MODAL ===== */
const loginModal = document.getElementById('loginModal');
const openLoginBtn = document.getElementById('openLoginModal');
const closeModalBtn = document.getElementById('closeModal');

openLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginModal.classList.add('open');
  document.body.style.overflow = 'hidden';
});
closeModalBtn.addEventListener('click', () => {
  loginModal.classList.remove('open');
  document.body.style.overflow = '';
});
loginModal.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.classList.remove('open');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    loginModal.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ===== MODAL TABS ===== */
const mtabs = document.querySelectorAll('.mtab');
const adminTab = document.getElementById('adminTab');
const parentTab = document.getElementById('parentTab');
mtabs.forEach(tab => {
  tab.addEventListener('click', () => {
    mtabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    if (tab.dataset.tab === 'admin') {
      adminTab.classList.remove('hidden');
      parentTab.classList.add('hidden');
    } else {
      adminTab.classList.add('hidden');
      parentTab.classList.remove('hidden');
    }
  });
});

/* ===== CONTACT FORM ===== */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  const original = btn.innerHTML;
  btn.innerHTML = '✅ Request Submitted! We\'ll call you shortly.';
  btn.style.background = '#22c55e';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 5000);
});

/* ===== RIPPLE EFFECT ===== */
document.querySelectorAll('.ripple-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:rgba(255,255,255,0.3);
      transform:scale(0);
      animation:ripple-anim 0.5s ease-out;
      top:${e.clientY - rect.top - size/2}px;
      left:${e.clientX - rect.left - size/2}px;
      pointer-events:none;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple keyframe
const style = document.createElement('style');
style.textContent = `@keyframes ripple-anim { to { transform: scale(2.5); opacity: 0; } }`;
document.head.appendChild(style);

/* ===== ROADMAP LINE HIGHLIGHT ===== */
const roadmapLine = document.querySelector('.roadmap-line');
if (roadmapLine) {
  const roadmapSection = document.querySelector('.roadmap');
  window.addEventListener('scroll', () => {
    if (!roadmapSection) return;
    const rect = roadmapSection.getBoundingClientRect();
    const sectionH = roadmapSection.offsetHeight;
    const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (sectionH + window.innerHeight)));
    roadmapLine.style.background = `linear-gradient(to bottom,
      var(--primary-light) 0%,
      var(--primary) ${progress * 100}%,
      var(--border) ${progress * 100}%,
      var(--border) 100%
    )`;
  });
}

/* ===== SMOOTH ACTIVE NAV ===== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--primary)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => activeObserver.observe(s));
