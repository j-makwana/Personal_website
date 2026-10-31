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

(() => {
  const flow = document.querySelector('[data-panel-flow]');
  const model = flow?.querySelector('.cabinet3d');
  if (!flow || !model || !window.matchMedia) return;

  document.documentElement.classList.add('js');
  const items = [...flow.querySelectorAll('.ownership-list li[data-stage]')];
  const buttons = [...flow.querySelectorAll('[data-stage-button]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const setStage = (stage) => {
    if (model.dataset.stage === String(stage) && flow.classList.contains('is-linked')) return;
    model.dataset.stage = String(stage);
    for (const item of items) item.classList.toggle('is-active', item.dataset.stage === String(stage));
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.stageButton === String(stage)));
  };

  // While the card is pinned, the scroll position drives the build directly:
  // parts drop in, the plate slides into the cabinet and the door closes as you scroll.
  // Clicking a stage scrolls to it, so the scroll position and the stage always agree.
  const pin = flow.closest('[data-panel-pin]');
  const travel = () => Math.round(window.innerHeight * 0.9);
  const clamp = (value) => Math.min(1, Math.max(0, value));
  const smooth = (value) => value * value * (3 - 2 * value);
  const stageTargets = { 1: 0.08, 2: 0.5, 3: 1 };
  let pinTop = 0;
  let pinned = false;

  const render = (progress) => {
    const build = clamp((progress - 0.12) / 0.45);
    const release = smooth(clamp((progress - 0.6) / 0.35));
    const door = smooth(clamp((progress - 0.72) / 0.26));
    model.style.setProperty('--build', build.toFixed(3));
    model.style.setProperty('--pz', `${(150 * (1 - release)).toFixed(1)}px`);
    model.style.setProperty('--py', `${(-6 * (1 - release)).toFixed(1)}px`);
    model.style.setProperty('--door', `${(106 * (1 - door)).toFixed(1)}deg`);
    setStage(progress < 1 / 3 ? 1 : progress < 2 / 3 ? 2 : 3);
  };

  const layout = () => {
    if (!pin) return;
    // Measure in the pinned style, which is more compact on phones.
    pin.classList.add('is-pinned');
    const cardHeight = flow.offsetHeight;
    pinned = !reducedMotion.matches && cardHeight + 120 < window.innerHeight;
    pin.classList.toggle('is-pinned', pinned);
    model.classList.toggle('is-scrub', pinned);
    if (!pinned) {
      pin.style.removeProperty('height');
      for (const name of ['--build', '--pz', '--py', '--door']) model.style.removeProperty(name);
      return;
    }
    pinTop = Math.max(84, Math.round((window.innerHeight - cardHeight) / 2));
    flow.style.top = `${pinTop}px`;
    pin.style.height = `${cardHeight + travel()}px`;
  };

  const onScroll = () => {
    if (pinned) render(clamp((pinTop - pin.getBoundingClientRect().top) / travel()));
  };

  const goToStage = (stage) => {
    if (!pinned) {
      setStage(stage);
      return;
    }
    const pinStart = pin.getBoundingClientRect().top + window.scrollY - pinTop;
    window.scrollTo({ top: pinStart + stageTargets[stage] * travel(), behavior: 'smooth' });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    layout();
    onScroll();
  });
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', layout);

  flow.classList.add('is-linked');
  setStage(1);
  layout();
  onScroll();
  for (const button of buttons) button.addEventListener('click', () => goToStage(button.dataset.stageButton));
  for (const item of items) item.addEventListener('click', () => goToStage(item.dataset.stage));

  // A small tilt toward the pointer so the cabinet reads as a solid object.
  if (window.matchMedia('(hover: hover)').matches) {
    model.addEventListener('pointermove', (event) => {
      if (reducedMotion.matches) return;
      const box = model.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      model.style.setProperty('--tilt-y', `${(x * 16).toFixed(2)}deg`);
      model.style.setProperty('--tilt-x', `${(y * -8).toFixed(2)}deg`);
    });
    model.addEventListener('pointerleave', () => {
      model.style.removeProperty('--tilt-y');
      model.style.removeProperty('--tilt-x');
    });
  }
})();

(() => {
  const demo = document.querySelector('[data-demo]');
  if (!demo) return;

  const steps = [...demo.querySelectorAll('.demo-steps li')];
  const order = demo.querySelector('[data-order]');
  const suggestion = demo.querySelector('[data-suggestion]');
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, reducedMotion ? 0 : ms));
  const original = order.innerHTML;
  let running = false;

  const show = (state, focusSelector) => {
    demo.dataset.state = state;
    const target = focusSelector && demo.querySelector(focusSelector);
    if (target) target.focus({ preventScroll: true });
  };

  const reset = () => {
    order.innerHTML = original;
    suggestion.classList.remove('is-resolved');
    for (const step of steps) step.className = '';
  };

  demo.querySelector('[data-demo-run]').addEventListener('click', async () => {
    if (running) return;
    running = true;
    reset();
    show('run');
    for (const [index, step] of steps.entries()) {
      step.classList.add('is-active');
      await wait(index === 3 ? 1400 : 650);
      step.classList.replace('is-active', 'is-done');
      if (index === 3) break;
    }
    await wait(300);
    running = false;
    show('review', '[data-demo-apply]');
  });

  demo.querySelector('[data-demo-apply]').addEventListener('click', () => {
    const item = order.querySelector('[data-move-item]');
    const target = order.querySelector('[data-move-target]');
    order.insertBefore(item, target);
    item.classList.add('is-moved');
    suggestion.classList.add('is-resolved');
    demo.querySelector('[data-demo-build]').focus({ preventScroll: true });
  });

  demo.querySelector('[data-demo-reject]').addEventListener('click', () => {
    suggestion.classList.add('is-resolved');
    demo.querySelector('[data-demo-build]').focus({ preventScroll: true });
  });

  demo.querySelector('[data-demo-build]').addEventListener('click', async () => {
    show('run');
    for (const step of steps) step.className = 'is-done';
    steps[4].className = 'is-active';
    await wait(900);
    steps[4].className = 'is-done';
    await wait(250);
    show('done', '[data-demo-reset]');
  });

  demo.querySelector('[data-demo-reset]').addEventListener('click', () => {
    reset();
    show('idle', '[data-demo-run]');
  });
})();
