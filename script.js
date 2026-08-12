const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
const hero = document.querySelector('.hero');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const activeCards = new Set();

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
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '-4% 0px -7% 0px' });
  revealItems.forEach((item) => observer.observe(item));
}

if (reduceMotion || !('IntersectionObserver' in window)) {
  cards.forEach((card) => activeCards.add(card));
} else {
  const stageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) activeCards.add(entry.target);
      else activeCards.delete(entry.target);
    });
  }, { rootMargin: '70% 0px 70% 0px' });
  cards.forEach((card) => stageObserver.observe(card));
}

const progress = document.querySelector('.scroll-progress span');
let scrollFrame = 0;
const updateProgress = () => {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
  if (!reduceMotion && hero) {
    const fadeDistance = Math.max(hero.offsetHeight * 0.68, 420);
    const heroFade = Math.min(window.scrollY / fadeDistance, 1);
    hero.style.setProperty('--hero-opacity', String(1 - heroFade * .68));
    hero.style.setProperty('--hero-shift', `${heroFade * -24}px`);
    hero.style.setProperty('--hero-blur', `${heroFade * 5}px`);
  }
  if (!reduceMotion) {
    activeCards.forEach((card) => {
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
  document.querySelectorAll('.button, .filter').forEach((control) => {
    control.addEventListener('pointermove', (event) => {
      const rect = control.getBoundingClientRect();
      control.style.setProperty('--glass-x', `${event.clientX - rect.left}px`);
      control.style.setProperty('--glass-y', `${event.clientY - rect.top}px`);
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
      { opacity: 1, filter: 'blur(0)', transform: 'translateY(0) scale(1)' },
      { opacity: 0, filter: 'blur(7px)', transform: 'translateY(12px) scale(.985)' },
    ], { duration: 360, delay: index * 24, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'both' })));
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
      { opacity: 0, filter: 'blur(9px)', transform: 'translateY(20px) scale(.985)' },
      { opacity: 1, filter: 'blur(0)', transform: 'translateY(0) scale(1)' },
    ], { duration: 620, delay: index * 55, easing: 'cubic-bezier(.2,.75,.2,1)', fill: 'both' })));
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

const copyEmailButton = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
copyEmailButton?.addEventListener('click', async () => {
  const email = copyEmailButton.dataset.email;
  let copied = false;
  try {
    await navigator.clipboard.writeText(email);
    copied = true;
  } catch {
    const helper = document.createElement('textarea');
    helper.value = email;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    copied = document.execCommand('copy');
    helper.remove();
  }
  copyStatus.textContent = copied ? '邮箱已复制，可以直接粘贴到邮件客户端。' : `请复制邮箱：${email}`;
  if (copied) copyEmailButton.firstChild.textContent = '已复制 ';
});
