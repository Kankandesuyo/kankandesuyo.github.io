const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
const hero = document.querySelector('.hero');
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
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.1, rootMargin: '-4% 0px -7% 0px' });
  revealItems.forEach((item) => observer.observe(item));
}

const progress = document.querySelector('.scroll-progress span');
let scrollFrame = 0;
const updateProgress = () => {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
  if (!reduceMotion && hero) {
    const fadeDistance = Math.max(hero.offsetHeight * 0.68, 420);
    const heroFade = Math.min(window.scrollY / fadeDistance, 1);
    hero.style.setProperty('--hero-opacity', String(1 - heroFade * .72));
    hero.style.setProperty('--hero-shift', `${heroFade * -28}px`);
    hero.style.setProperty('--hero-blur', `${heroFade * 1.5}px`);
  }
  if (!reduceMotion) {
    cards.forEach((card) => {
      if (card.classList.contains('hidden')) return;
      const rect = card.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const cardCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
      const activeRange = Math.max(window.innerHeight * .8, rect.height * .7);
      const stageProgress = Math.max(0, 1 - distanceFromCenter / activeRange);
      card.style.setProperty('--project-progress', stageProgress.toFixed(3));
    });
  }
  scrollFrame = 0;
};
window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
}, { passive: true });
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

let filtering = false;

const animateCard = (card, keyframes, options) => {
  const animation = card.animate(keyframes, options);
  return animation.finished.catch(() => undefined).finally(() => animation.cancel());
};

const applyFilter = async (button) => {
  if (filtering || button.classList.contains('active')) return;
  filtering = true;
  filters.forEach((item) => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
    item.disabled = true;
  });

  const selected = button.dataset.filter;
  const visibleCards = [...cards].filter((card) => !card.classList.contains('hidden'));
  const shouldShow = (card) => selected === 'all' || card.dataset.categories.split(' ').includes(selected);
  const outgoing = visibleCards.filter((card) => !shouldShow(card));
  const incoming = [...cards].filter((card) => card.classList.contains('hidden') && shouldShow(card));

  if (!reduceMotion) {
    await Promise.all(outgoing.map((card, index) => animateCard(card, [
      { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
      { opacity: 0, transform: 'translateY(14px) scale(.975)', filter: 'blur(5px)' },
    ], { duration: 220, delay: index * 24, easing: 'ease-in', fill: 'both' })));
  }

  outgoing.forEach((card) => {
    card.classList.add('hidden');
    card.setAttribute('aria-hidden', 'true');
  });
  incoming.forEach((card) => {
    card.classList.remove('hidden');
    card.removeAttribute('aria-hidden');
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight * .94 && rect.bottom > 0) card.classList.add('is-visible');
  });

  if (!reduceMotion) {
    await Promise.all(incoming.map((card, index) => animateCard(card, [
      { opacity: 0, transform: 'translateY(24px) scale(.975)', filter: 'blur(6px)' },
      { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
    ], { duration: 460, delay: index * 70, easing: 'cubic-bezier(.2,.75,.2,1)', fill: 'both' })));
  }

  filters.forEach((item) => { item.disabled = false; });
  filtering = false;
};

filters.forEach((button) => {
  button.setAttribute('aria-pressed', String(button.classList.contains('active')));
  button.addEventListener('click', () => {
    applyFilter(button);
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
