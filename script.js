/* ===============================================================
   SITE FUNCTIONALITY
   To edit YOUR CONTENT, open content.js instead of this file.
   =============================================================== */
(() => {
  'use strict';

  const data = typeof SITE_DATA === 'object' ? SITE_DATA : null;
  if (!data) {
    console.error('Missing content.js — the portfolio cannot be initialized.');
    return;
  }

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const byId = id => document.getElementById(id);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const imgFallback = 'linear-gradient(130deg, #675540 0%, #30373a 52%, #111114 100%)';
  const playSvg = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="m8.5 5.5 11 6.5-11 6.5z"/></svg>`;

  function setText(id, value) {
    const element = byId(id);
    if (element && value != null) element.textContent = String(value);
  }

  function setHeading(id, text, punctuation = '.') {
    const element = byId(id);
    if (!element) return;
    let title = String(text || '').trim();
    let end = '';
    if (/[.!?]$/.test(title)) {
      end = title.slice(-1);
      title = title.slice(0, -1);
    } else if (punctuation) {
      end = punctuation;
    }
    element.replaceChildren(document.createTextNode(title));
    if (end) {
      const accent = document.createElement('span');
      accent.className = 'accent-period';
      accent.textContent = end;
      element.append(accent);
    }
  }

  // Only known video platforms receive an embedded player. All other URLs remain links.
  function mediaSource(url) {
    if (!url || typeof url !== 'string') return { kind: 'none' };
    let parsed;
    try { parsed = new URL(url, window.location.href); } catch { return { kind: 'none' }; }
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:' && parsed.protocol !== 'file:') return { kind: 'none' };
    const host = parsed.hostname.toLowerCase();
    const path = parsed.pathname;

    // Self-hosted MP4 and WebM files also work on GitHub Pages.
    if (/\.(mp4|webm|ogv)$/i.test(path)) return { kind: 'video', src: parsed.href };

    let embed = '';
    if (host === 'youtu.be') {
      const id = path.split('/').filter(Boolean)[0];
      if (/^[\w-]{11}$/.test(id || '')) embed = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
    } else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'www.youtube-nocookie.com'].includes(host)) {
      const id = path.startsWith('/embed/') ? path.split('/')[2] : parsed.searchParams.get('v');
      if (/^[\w-]{11}$/.test(id || '')) embed = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
    } else if (host === 'vimeo.com' || host === 'www.vimeo.com' || host === 'player.vimeo.com') {
      const id = path.split('/').filter(Boolean).find(segment => /^\d+$/.test(segment));
      if (id) embed = `https://player.vimeo.com/video/${id}`;
    } else if (host === 'rutube.ru' || host === 'www.rutube.ru') {
      const match = path.match(/^\/(?:video|play\/embed)\/([\w-]+)/);
      if (match) embed = `https://rutube.ru/play/embed/${match[1]}/`;
    } else if (host === 'vkvideo.ru' || host === 'www.vkvideo.ru' || host === 'vk.com' || host === 'www.vk.com') {
      // For VK video, paste the embed URL supplied by the platform.
      if (path === '/video_ext.php') embed = parsed.href;
    }
    if (embed) return { kind: 'embed', src: embed };
    return { kind: 'link', src: parsed.href };
  }

  function setBackground(element, url, fallback = imgFallback) {
    if (!element) return;
    const overlay = 'linear-gradient(135deg, rgba(13,13,15,.08), rgba(13,13,15,.12))';
    if (url) {
      // Background urls live in content.js. Use a CSSStyleDeclaration to set them.
      const cleaned = String(url).replace(/["'\\\r\n]/g, '');
      element.style.backgroundImage = `${overlay}, url("${cleaned}")`;
    } else {
      element.style.backgroundImage = fallback;
    }
  }

  // === Brand + hero ===
  document.title = data.pageTitle || data.name;
  $('meta[name="description"]')?.setAttribute('content', data.description || '');
  $('meta[property="og:title"]')?.setAttribute('content', document.title);
  $('meta[property="og:description"]')?.setAttribute('content', data.description || '');

  const namePieces = (data.name || 'Wayfare Films').trim().split(/\s+/);
  const lastName = namePieces.pop() || '';
  const wordmark = byId('wordmark');
  wordmark.replaceChildren(document.createTextNode((namePieces.join(' ') + ' ').toUpperCase()));
  const lightName = document.createElement('span');
  lightName.textContent = lastName.toUpperCase();
  const dot = document.createElement('span');
  dot.className = 'wordmark-dot'; dot.textContent = '.';
  wordmark.append(lightName, dot);
  wordmark.setAttribute('aria-label', `${data.name}, homepage`);
  const footerBrand = byId('footer-name');
  footerBrand.replaceChildren(document.createTextNode(data.name.toUpperCase()));
  const footerDot = document.createElement('span');
  footerDot.className = 'accent-period';
  footerDot.textContent = '.';
  footerBrand.append(footerDot);
  setText('footer-description', `Documentary and commercial video\n${data.location}`);
  byId('footer-description').style.whiteSpace = 'pre-line';
  setText('copyright', `© ${new Date().getFullYear()} ${data.name}. All rights reserved.`);

  const hero = data.hero || {};
  setText('hero-overline', hero.overline);
  setHeading('hero-title', hero.title);
  setText('hero-subtitle', hero.subtitle);
  setBackground(byId('hero-media'), hero.image);
  byId('hero-media').setAttribute('aria-label', hero.imageAlt || 'Film still');

  if (hero.video && !reduceMotion) {
    const video = byId('hero-video');
    video.src = hero.video;
    video.hidden = false;
    video.poster = hero.image || '';
    video.play().catch(() => { video.hidden = true; });
  }

  const reelLink = byId('reel-link');
  if (hero.reelUrl) {
    reelLink.href = '#reel';
    reelLink.addEventListener('click', event => {
      event.preventDefault();
      showProject({ title: 'Wayfare Films — Showreel', type: 'Showreel', year: String(new Date().getFullYear()), client: data.name, image: hero.image, description: hero.subtitle, videoUrl: hero.reelUrl });
    });
  }

  // === Work: filter tabs, cards, filmstrip scrubbing ===
  const categories = ['All', ...new Set((data.projects || []).map(project => project.type).filter(Boolean))];
  const filters = byId('filters');
  const grid = byId('project-grid');
  let activeCategory = 'All';
  setHeading('work-title', data.work?.title || 'Stories that earned their screen time');
  $('.work-head .section-intro').textContent = data.work?.intro || '';

  categories.forEach(category => {
    const button = document.createElement('button');
    button.className = 'filter-btn';
    button.type = 'button';
    button.textContent = category;
    button.setAttribute('aria-pressed', category === 'All' ? 'true' : 'false');
    button.addEventListener('click', () => {
      activeCategory = category;
      filters.querySelectorAll('button').forEach(btn => btn.setAttribute('aria-pressed', String(btn === button)));
      renderProjects();
    });
    filters.append(button);
  });

  function timecodeFromSeconds(seconds) {
    const totalFrames = Math.max(0, Math.round(seconds * 24));
    const frames = totalFrames % 24;
    const totalSeconds = Math.floor(totalFrames / 24);
    const pad = number => String(number).padStart(2, '0');
    return `${pad(Math.floor(totalSeconds / 3600))}:${pad(Math.floor(totalSeconds / 60) % 60)}:${pad(totalSeconds % 60)}:${pad(frames)}`;
  }

  function createProjectCard(project, index) {
    const article = document.createElement('article');
    article.className = 'project-card';
    article.style.animationDelay = `${Math.min(index * 35, 180)}ms`;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-preview';
    button.setAttribute('aria-label', `View ${project.title} project details`);

    const image = document.createElement('img');
    image.src = project.image || '';
    image.alt = `${project.title} — film still`;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.addEventListener('error', () => {
      image.style.opacity = '0';
      button.style.background = 'linear-gradient(130deg,#564f44,#252628)';
    });

    const time = document.createElement('span');
    time.className = 'project-timecode';
    time.textContent = '00:00:00:00';
    time.setAttribute('aria-hidden', 'true');

    const play = document.createElement('span');
    play.className = 'project-play';
    play.innerHTML = playSvg;
    play.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.className = 'project-type-overlay';
    label.textContent = 'VIEW PROJECT ↗';
    label.setAttribute('aria-hidden', 'true');

    const strip = document.createElement('span');
    strip.className = 'filmstrip';
    strip.setAttribute('aria-hidden', 'true');
    strip.innerHTML = `<span class="sprockets"></span><span class="scrub-track"><span class="scrub-fill"></span><span class="scrub-head"></span></span><span class="sprockets"></span>`;

    let previewVideo;
    if (project.previewVideo && !reduceMotion) {
      previewVideo = document.createElement('video');
      previewVideo.src = project.previewVideo;
      previewVideo.muted = true;
      previewVideo.playsInline = true;
      previewVideo.preload = 'metadata';
      previewVideo.className = 'preview-video';
    }

    button.append(image);
    if (previewVideo) button.append(previewVideo);
    button.append(time, play, label, strip);
    button.addEventListener('click', () => showProject(project));

    if (!reduceMotion) {
      button.addEventListener('pointermove', event => {
        // This is a visual preview when no previewVideo is supplied.
        // If a video exists, the hover position really seeks through it.
        if (event.pointerType === 'touch') return;
        const rect = button.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        strip.style.setProperty('--progress', `${(ratio * 100).toFixed(2)}%`);
        const duration = (previewVideo?.duration && Number.isFinite(previewVideo.duration))
          ? previewVideo.duration : (Number(project.durationSeconds) || 120);
        const current = duration * ratio;
        time.textContent = timecodeFromSeconds(current);
        if (previewVideo && previewVideo.readyState > 0) {
          try { previewVideo.currentTime = Math.min(current, duration - .02); } catch { /* seek not available yet */ }
          button.classList.add('preview-playing');
        }
      });
      button.addEventListener('pointerleave', () => {
        time.textContent = '00:00:00:00';
        strip.style.setProperty('--progress', '0%');
        button.classList.remove('preview-playing');
        previewVideo?.pause();
      });
    }

    const info = document.createElement('div');
    info.className = 'project-info';
    const meta = document.createElement('div');
    meta.className = 'project-metadata';
    const type = document.createElement('span'); type.textContent = project.type || 'Film';
    const year = document.createElement('span'); year.className = 'project-year'; year.textContent = project.year || '';
    meta.append(type, year);

    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.title || 'Untitled project';

    const client = document.createElement('div');
    client.className = 'project-client';
    client.textContent = project.client || '';

    info.append(meta, title, client);
    article.append(button, info);
    return article;
  }

  function renderProjects() {
    const visible = (data.projects || []).filter(project => activeCategory === 'All' || project.type === activeCategory);
    const fragment = document.createDocumentFragment();
    visible.forEach((project, index) => fragment.append(createProjectCard(project, index)));
    grid.replaceChildren(fragment);
    byId('work-count').textContent = `${String(visible.length).padStart(2, '0')} ${visible.length === 1 ? 'PROJECT' : 'PROJECTS'}`;
    byId('empty-state').hidden = visible.length !== 0;
  }
  renderProjects();

  // === Project modal ===
  const dialog = byId('project-dialog');
  const dialogContent = byId('dialog-content');
  const dialogClose = byId('dialog-close');
  let previousFocus = null;

  function showProject(project) {
    previousFocus = document.activeElement;
    const media = document.createElement('div');
    media.className = 'dialog-media';
    const source = mediaSource(project.videoUrl);
    if (source.kind === 'video') {
      const video = document.createElement('video');
      video.controls = true; video.playsInline = true;
      video.poster = project.image || '';
      video.src = source.src;
      media.append(video);
    } else if (source.kind === 'embed') {
      const iframe = document.createElement('iframe');
      iframe.src = source.src;
      iframe.title = `Video: ${project.title}`;
      iframe.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      media.append(iframe);
    } else {
      const img = document.createElement('img');
      img.src = project.image || '';
      img.alt = `${project.title} — film still`;
      media.append(img);
    }

    const body = document.createElement('div');
    body.className = 'dialog-body';
    const meta = document.createElement('div');
    meta.className = 'dialog-meta';
    meta.textContent = `${project.type || 'Film'} / ${project.year || ''}`;
    const title = document.createElement('h2');
    title.id = 'dialog-title'; title.textContent = project.title || '';
    const client = document.createElement('div');
    client.className = 'dialog-client'; client.textContent = project.client || '';
    const description = document.createElement('p');
    description.className = 'dialog-description'; description.textContent = project.description || '';
    body.append(meta, title, client, description);

    if (source.kind === 'link') {
      const link = document.createElement('a');
      link.className = 'text-cta'; link.href = source.src;
      link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.textContent = 'Watch video on external site ↗';
      body.append(link);
    } else if (source.kind === 'none') {
      const note = document.createElement('p');
      note.className = 'dialog-placeholder';
      note.textContent = 'Demo still. Add a videoUrl for this project in content.js to show the playable film here.';
      body.append(note);
    }

    dialogContent.replaceChildren(media, body);
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }

  dialogClose.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    dialogContent.replaceChildren(); // unload any playing video or iframe
    if (previousFocus?.isConnected) previousFocus.focus();
  });

  // === About ===
  setHeading('about-title', data.about?.title || 'The story behind the lens');
  setBackground(byId('about-photo'), data.about?.image);
  byId('about-photo').setAttribute('aria-label', data.about?.imageAlt || 'About photo');
  const aboutBody = byId('about-body');
  (data.about?.paragraphs || []).forEach(paragraph => {
    const p = document.createElement('p'); p.textContent = paragraph;
    aboutBody.append(p);
  });
  const stats = byId('stats');
  (data.about?.stats || []).forEach(stat => {
    const wrapper = document.createElement('div');
    const value = document.createElement('span'); value.className = 'stat-value'; value.textContent = stat.value;
    const label = document.createElement('span'); label.className = 'stat-label'; label.textContent = stat.label;
    wrapper.append(value, label); stats.append(wrapper);
  });

  // === Services ===
  setHeading('services-title', data.services?.title || 'Services');
  setText('services-intro', data.services?.intro);
  setText('pricing-note', data.services?.note);
  const servicesGrid = byId('services-grid');
  (data.services?.items || []).forEach((service, index) => {
    const card = document.createElement('article'); card.className = 'service-card reveal';
    const number = document.createElement('div'); number.className = 'service-index'; number.textContent = String(index + 1).padStart(2, '0') + ' /';
    const title = document.createElement('h3'); title.className = 'service-name'; title.textContent = service.name;
    const desc = document.createElement('p'); desc.className = 'service-desc'; desc.textContent = service.description;
    const specs = document.createElement('div'); specs.className = 'service-specs';
    const rate = document.createElement('div'); rate.className = 'service-spec';
    const rateLabel = document.createElement('span'); rateLabel.textContent = 'Day rate';
    const rateValue = document.createElement('strong'); rateValue.className = 'rate'; rateValue.textContent = service.dayRate;
    rate.append(rateLabel, rateValue);
    const turnaround = document.createElement('div'); turnaround.className = 'service-spec';
    const turnaroundLabel = document.createElement('span'); turnaroundLabel.textContent = 'Turnaround';
    const turnaroundValue = document.createElement('strong'); turnaroundValue.textContent = service.turnaround;
    turnaround.append(turnaroundLabel, turnaroundValue);
    specs.append(rate, turnaround);
    const includesHeading = document.createElement('div'); includesHeading.className = 'includes-heading'; includesHeading.textContent = 'INCLUDES';
    const includes = document.createElement('ul'); includes.className = 'includes-list';
    (service.includes || []).forEach(item => {
      const li = document.createElement('li'); li.textContent = item; includes.append(li);
    });
    card.append(number, title, desc, specs, includesHeading, includes);
    servicesGrid.append(card);
  });

  // === Contact and footer ===
  setHeading('contact-title', data.contact?.title || 'Have a story worth telling?', '?');
  setText('contact-copy', data.contact?.description);
  setText('contact-footnote', data.contact?.footnote);
  const email = data.contact?.email || '';
  const mailto = `mailto:${encodeURIComponent(email)}`;
  const emailAnchor = byId('contact-email');
  emailAnchor.textContent = email;
  emailAnchor.href = mailto;
  byId('contact-send').href = `${mailto}?subject=${encodeURIComponent('Let’s make something')}`;
  const phone = byId('contact-phone');
  if (data.contact?.phoneDisplay) {
    phone.textContent = data.contact.phoneDisplay;
    phone.href = `tel:${(data.contact.phoneLink || data.contact.phoneDisplay).replace(/[^+\d]/g, '')}`;
  } else {
    phone.hidden = true;
    $('.contact-phone-label').hidden = true;
  }
  const socialLinks = byId('social-links');
  (data.socials || []).forEach(item => {
    let url;
    try { url = new URL(item.url); } catch { return; }
    if (url.protocol !== 'https:') return;
    const link = document.createElement('a');
    link.textContent = item.name;
    link.href = url.href;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    socialLinks.append(link);
  });

  // === Menu and scroll effects ===
  const header = byId('site-header');
  const menuToggle = byId('menu-toggle');
  const mobileNav = byId('mobile-nav');
  function closeMenu() {
    mobileNav.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    header.classList.remove('is-menu-open');
  }
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    mobileNav.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    header.classList.toggle('is-menu-open', open);
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  const setHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 60);
  addEventListener('scroll', setHeader, { passive: true });
  setHeader();

  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .07, rootMargin: '0px 0px 20px 0px' });
    document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  }
})();
