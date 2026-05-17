// Lightweight UX helpers for the demo: modals, toasts, table-row selection.
(function () {
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  // Modal: any [data-modal-open="<id>"] opens, [data-modal-close] closes nearest modal.
  document.addEventListener('click', function (e) {
    var openBtn = e.target.closest('[data-modal-open]');
    if (openBtn) {
      var id = openBtn.getAttribute('data-modal-open');
      var modal = document.getElementById(id);
      if (modal) { modal.removeAttribute('hidden'); document.body.style.overflow = 'hidden'; }
      return;
    }
    var closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) {
      var m = closeBtn.closest('[data-modal]');
      if (m) { m.setAttribute('hidden', ''); document.body.style.overflow = ''; }
      return;
    }
    // Click on overlay closes.
    if (e.target.matches('[data-modal] [data-modal-backdrop]')) {
      var m2 = e.target.closest('[data-modal]');
      if (m2) { m2.setAttribute('hidden', ''); document.body.style.overflow = ''; }
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      $$('[data-modal]:not([hidden])').forEach(function (m) { m.setAttribute('hidden', ''); });
      document.body.style.overflow = '';
    }
  });

  // Toast helper: window.toast('message', 'success'|'error'|'info')
  window.toast = function (msg, type) {
    var host = document.getElementById('toast-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'toast-host';
      host.className = 'fixed bottom-6 right-6 z-[200] flex flex-col gap-2';
      document.body.appendChild(host);
    }
    var palette = {
      success: 'bg-secondary text-white',
      error: 'bg-error text-white',
      info: 'bg-inverse-surface text-inverse-on-surface'
    };
    var el = document.createElement('div');
    el.className = 'toast ' + (palette[type] || palette.info) + ' px-4 py-3 rounded-lg shadow-lg text-sm font-medium max-w-sm';
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(function () { el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; el.style.transition = 'all 200ms'; }, 2400);
    setTimeout(function () { el.remove(); }, 2700);
  };

  // Bulk selection: rows with class .js-row, checkboxes data-row-check, master data-row-check-all
  function syncBulkBar() {
    var rows = $$('[data-row-check]');
    var selected = rows.filter(function (cb) { return cb.checked; });
    var bar = document.querySelector('[data-bulk-bar]');
    if (bar) {
      if (selected.length > 0) {
        bar.removeAttribute('hidden');
        var count = bar.querySelector('[data-bulk-count]');
        if (count) count.textContent = selected.length;
      } else {
        bar.setAttribute('hidden', '');
      }
    }
    rows.forEach(function (cb) {
      var row = cb.closest('tr');
      if (!row) return;
      if (cb.checked) row.classList.add('bg-primary/5'); else row.classList.remove('bg-primary/5');
    });
    var master = document.querySelector('[data-row-check-all]');
    if (master) {
      master.checked = rows.length > 0 && selected.length === rows.length;
      master.indeterminate = selected.length > 0 && selected.length < rows.length;
    }
  }
  document.addEventListener('change', function (e) {
    if (e.target.matches('[data-row-check]')) syncBulkBar();
    if (e.target.matches('[data-row-check-all]')) {
      $$('[data-row-check]').forEach(function (cb) { cb.checked = e.target.checked; });
      syncBulkBar();
    }
  });
  document.addEventListener('click', function (e) {
    var clearBtn = e.target.closest('[data-bulk-clear]');
    if (clearBtn) {
      $$('[data-row-check]').forEach(function (cb) { cb.checked = false; });
      syncBulkBar();
    }
  });
  document.addEventListener('DOMContentLoaded', syncBulkBar);

  // Active sidebar highlight based on current page filename.
  document.addEventListener('DOMContentLoaded', function () {
    var path = location.pathname.split('/').pop() || 'index.html';
    $$('[data-nav]').forEach(function (a) {
      var match = a.getAttribute('data-nav');
      if (match && path.indexOf(match) !== -1) {
        a.classList.add('bg-primary/10', 'text-primary', 'font-bold', 'border-l-4', 'border-primary');
        a.classList.remove('text-on-surface-variant', 'hover:bg-surface-container-low');
      }
    });
  });
})();
