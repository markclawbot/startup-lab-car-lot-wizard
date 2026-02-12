// Car Lot Wizard — Prototype Interactions

document.addEventListener('DOMContentLoaded', () => {
  // Screen navigation
  const screens = document.querySelectorAll('.screen');
  const navLinks = document.querySelectorAll('[data-screen]');

  function showScreen(id) {
    screens.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    navLinks.forEach(l => {
      l.classList.toggle('active', l.dataset.screen === id);
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => showScreen(link.dataset.screen));
  });

  // Logo click → landing
  document.querySelector('.nav-logo')?.addEventListener('click', () => showScreen('landing'));

  // Generate Report button
  document.getElementById('generate-btn')?.addEventListener('click', () => showScreen('report'));

  // View Report links from pricing
  document.querySelectorAll('[data-action="report"]').forEach(btn => {
    btn.addEventListener('click', () => showScreen('report'));
  });

  // Tab switching
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab)?.classList.add('active');
    });
  });

  // Phase navigation
  const phaseBtns = document.querySelectorAll('.phase-btn');
  const phases = document.querySelectorAll('.phase-content');

  phaseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      phaseBtns.forEach(b => b.classList.remove('active'));
      phases.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.phase)?.classList.add('active');
    });
  });

  // Expandable tactic cards
  document.querySelectorAll('.tactic-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.tactic-card').classList.toggle('open');
    });
  });

  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const block = btn.closest('.script-block, .dialogue');
      if (!block) return;
      const text = block.childNodes[0]?.textContent?.trim() || block.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = 'Copy';
        }, 1500);
      });
    });
  });

  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('nav-links');
  if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinksEl.classList.toggle('open');
    });
    // Close menu on nav link click
    navLinksEl.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksEl.classList.remove('open');
      });
    });
  }

  // Show landing by default
  showScreen('landing');
});
