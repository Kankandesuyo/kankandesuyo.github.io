const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.documentElement.classList.add('motion-ready');

document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.setProperty('--stagger', `${(index % 2) * 110}ms`);
});

document.querySelectorAll('.principles article').forEach((item, index) => {
  item.style.setProperty('--stagger', `${index * 90}ms`);
});

const revealItems = document.querySelectorAll('.scroll-reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  revealItems.forEach((item) => observer.observe(item));
}

const progress = document.querySelector('.scroll-progress span');
const updateProgress = () => {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  cards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

const animateCount = (node) => {
  if (reduceMotion || node.dataset.animated) return;
  node.dataset.animated = 'true';
  const target = Number(node.dataset.count);
  const pad = Number(node.dataset.pad || 0);
  const start = performance.now();
  const duration = 850;
  const tick = (now) => {
    const progressValue = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progressValue, 3);
    node.textContent = String(Math.round(target * eased)).padStart(pad, '0');
    if (progressValue < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

setTimeout(() => document.querySelectorAll('[data-count]').forEach(animateCount), reduceMotion ? 0 : 520);

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle('active', item === button));
    cards.forEach((card) => {
      const categories = card.dataset.categories.split(' ');
      card.classList.toggle('hidden', selected !== 'all' && !categories.includes(selected));
    });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
