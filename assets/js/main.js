document.addEventListener('DOMContentLoaded', () => {
  const normalizedPath = window.location.pathname.replace(/index\.html$/, '') || '/';
  const links = document.querySelectorAll('.menu a');
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const hrefPath = new URL(href, window.location.origin).pathname.replace(/index\.html$/, '') || '/';
    const isHome = normalizedPath === '/' && (hrefPath === '/' || hrefPath === '/index.html');
    const isExact = hrefPath === normalizedPath;
    const inServices = normalizedPath.startsWith('/tjanster/') && hrefPath.startsWith('/tjanster/');
    const inAbout = normalizedPath.startsWith('/om/') && hrefPath.startsWith('/om/');
    if (isHome || isExact || inServices || inAbout) {
      link.classList.add('active');
    }
  });

  const accordions = document.querySelectorAll('[data-accordion]');
  accordions.forEach((accordion) => {
    const triggers = accordion.querySelectorAll('.accordion-trigger');
    triggers.forEach((trigger) => {
      const panel = trigger.nextElementSibling;
      if (!panel) return;
      panel.hidden = true;
      panel.setAttribute('tabindex', '-1');
      trigger.setAttribute('aria-expanded', 'false');

      const toggle = () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!isExpanded));
        panel.hidden = isExpanded;
        if (!isExpanded) {
          panel.focus({ preventScroll: false });
        } else {
          trigger.focus({ preventScroll: false });
        }
      };

      trigger.addEventListener('click', toggle);
      trigger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggle();
        }
      });
    });
  });
});
