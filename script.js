(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  if (header) {
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  if (toggle && nav && window.matchMedia) {
    const mobile = window.matchMedia('(max-width: 759px)');
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('[aria-hidden="true"]')?.replaceChildren(document.createTextNode(open ? '−' : '+'));
    };

    toggle.hidden = false;
    setOpen(false);
    root.classList.add('js');

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link || !mobile.matches) return;
      setOpen(false);

      if (link.hash && link.pathname === window.location.pathname) {
        const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
        if (target) {
          if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
          window.setTimeout(() => target.focus({ preventScroll: true }), 0);
          return;
        }
      }
      toggle.focus();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    const handleViewportChange = () => {
      const focusWasInNav = nav.contains(document.activeElement);
      setOpen(false);
      if (mobile.matches && focusWasInNav) toggle.focus();
    };
    if (mobile.addEventListener) mobile.addEventListener('change', handleViewportChange);
    else mobile.addListener(handleViewportChange);
  }

  const items = [...document.querySelectorAll('[data-reveal]')];
  if (!items.length || !window.IntersectionObserver || !window.matchMedia) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) return;

  let observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });

  for (const item of items) {
    item.classList.add('reveal');
    observer.observe(item);
  }

  const handleMotionChange = () => {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    for (const item of items) item.classList.remove('reveal');
  };
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', handleMotionChange);
  else reducedMotion.addListener(handleMotionChange);
})();
