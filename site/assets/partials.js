// Renders the shared sidebar + topbar, and enforces role-based access.
// Each role page sets <div data-shell data-role="kumho|npp" data-active="...">.
(function () {
  // Sidebar gộp theo BRD v1.2/v1.3 (xem wireframe_update_checklist):
  // - Kumho: 1 entry "Quản lý đại lý" gộp Duyệt + Danh sách (2 tab nội bộ).
  //   Badge = số đại lý chờ duyệt.
  // - NPP: 1 entry "Quản lý đơn hàng" gộp Đơn cần xác nhận + Lịch sử (4 tab nội bộ).
  //   Badge = số đơn Chờ xác nhận (> 99 → "99+", = 0 → ẩn).
  var navItems = {
    kumho: [
      // Kumho default landing = tab "Duyệt đại lý" per BRD v1.2 (highest priority work).
      { key: 'quan-ly-dai-ly',     icon: 'groups',          label: 'Quản lý đại lý',   href: 'duyet-dai-ly.html',   badge: 10 },
      { key: 'quan-ly-don-hang',   icon: 'shopping_cart',   label: 'Quản lý đơn hàng', href: 'quan-ly-don-hang.html' },
      { key: 'quan-ly-npp',        icon: 'corporate_fare',  label: 'Quản lý NPP',      href: 'quan-ly-npp.html' },
      { key: 'lich-su-tra-qua',    icon: 'redeem',          label: 'Lịch sử trả thưởng', href: 'lich-su-tra-qua.html' }
    ],
    npp: [
      { key: 'quan-ly-dai-ly',     icon: 'group',           label: 'Quản lý đại lý',       href: 'quan-ly-dai-ly.html' },
      { key: 'quan-ly-don-hang',   icon: 'shopping_cart',   label: 'Quản lý đơn hàng',     href: 'quan-ly-don-hang.html', badge: 3 },
      { key: 'lich-su-tra-thuong', icon: 'payments',        label: 'Lịch sử trả thưởng',   href: 'lich-su-tra-thuong.html' }
    ]
  };

  var roleLabels = {
    kumho: {
      tag: 'Trung tâm điều hành',
      badge: 'Admin Kumho',
      title: 'Kumho HQ',
      icon: 'admin_panel_settings',
      iconBg: 'bg-primary text-on-primary',
      titleCls: 'text-primary',
      chipCls: 'bg-primary/10 text-primary border border-primary/20',
      chipIcon: 'shield_person',
      accentBar: 'bg-primary'
    },
    npp: {
      tag: 'Kênh phân phối',
      badge: 'Nhà phân phối',
      title: 'NPP Portal',
      icon: 'local_shipping',
      iconBg: 'bg-secondary text-on-secondary',
      titleCls: 'text-secondary',
      chipCls: 'bg-secondary-container/40 text-secondary border border-secondary/20',
      chipIcon: 'corporate_fare',
      accentBar: 'bg-secondary'
    }
  };

  function renderSidebar(role, active, session) {
    var items = navItems[role] || [];
    var label = roleLabels[role];
    var html = ''
      + '<aside class="fixed left-0 top-0 h-full w-[240px] bg-surface-container-lowest border-r border-outline-variant flex flex-col z-30">'
      + '  <div class="relative">'
      + '    <div class="absolute left-0 top-0 bottom-0 w-1 ' + label.accentBar + '"></div>'
      + '    <div class="p-lg flex items-center gap-3">'
      + '      <div class="w-11 h-11 ' + label.iconBg + ' rounded-lg flex items-center justify-center shadow-md shrink-0">'
      + '        <span class="material-symbols-outlined fill">' + label.icon + '</span>'
      + '      </div>'
      + '      <div class="min-w-0">'
      + '        <p class="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold leading-none">Kumho Tyre</p>'
      + '        <h1 class="text-h3 font-bold ' + label.titleCls + ' leading-none tracking-tight mt-1 truncate">' + label.title + '</h1>'
      + '        <p class="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mt-1 truncate">' + label.tag + '</p>'
      + '      </div>'
      + '    </div>'
      + '  </div>'
      + '  <div class="px-lg pb-md">'
      + '    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ' + label.chipCls + '">'
      + '      <span class="material-symbols-outlined text-[12px]">' + label.chipIcon + '</span>' + label.badge
      + '    </span>'
      + '  </div>'
      + '  <nav class="flex-1 overflow-y-auto scroll-hidden">';
    items.forEach(function (it) {
      var isActive = it.key === active;
      var base = 'flex items-center gap-3 px-4 py-3 transition-colors duration-200 ';
      var activeCls = 'bg-primary/10 text-primary font-bold border-l-4 border-primary';
      var idleCls = 'text-on-surface-variant hover:bg-surface-container-low border-l-4 border-transparent';
      html += '<a class="' + base + (isActive ? activeCls : idleCls) + '" href="' + it.href + '">'
        + '<span class="material-symbols-outlined' + (isActive ? ' fill' : '') + '">' + it.icon + '</span>'
        + '<span class="flex-1 font-label-md text-label-md">' + it.label + '</span>'
        + (it.badge ? '<span class="bg-primary text-on-primary text-[10px] px-2 py-0.5 rounded-full">' + it.badge + '</span>' : '')
        + '</a>';
    });
    html += '</nav>'
      + '<div class="p-md border-t border-outline-variant">'
      + '  <a href="../ho-so.html" class="flex items-center gap-sm p-2 rounded-lg hover:bg-surface-container-low transition-colors">'
      + '    <div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary font-bold">' + session.initials + '</div>'
      + '    <div class="flex-1 overflow-hidden">'
      + '      <p class="font-label-md text-label-md truncate">' + session.name + '</p>'
      + '      <p class="font-label-sm text-label-sm text-on-surface-variant truncate">' + session.subtitle + '</p>'
      + '    </div>'
      + '    <span class="material-symbols-outlined text-[20px] text-on-surface-variant">chevron_right</span>'
      + '  </a>'
      + '</div>'
      + '</aside>';
    return html;
  }

  function renderTopbar(role, breadcrumb, session) {
    var label = roleLabels[role];
    var crumbs = breadcrumb || [];
    var crumbHtml = '';
    crumbs.forEach(function (c, i) {
      var isLast = i === crumbs.length - 1;
      crumbHtml += '<span class="' + (isLast ? 'text-primary font-bold' : 'text-on-surface-variant') + ' font-label-md text-label-md">' + c + '</span>';
      if (!isLast) crumbHtml += '<span class="material-symbols-outlined text-[16px] text-outline">chevron_right</span>';
    });
    return ''
      + '<header class="fixed top-0 right-0 left-[240px] h-[60px] bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between px-margin-desktop z-20">'
      + '  <div class="flex items-center gap-sm">' + (crumbs.length ? crumbHtml : '<h2 class="font-h3 text-h3 text-on-surface">Kumho NPP Portal</h2>') + '</div>'
      + '  <div class="flex items-center gap-md">'
      + '    <button class="hover:bg-surface-container-low p-2 rounded-full transition-all text-on-surface-variant" title="Trợ giúp"><span class="material-symbols-outlined">help</span></button>'
      + '    <button class="hover:bg-surface-container-low p-2 rounded-full transition-all text-on-surface-variant relative" title="Thông báo">'
      + '      <span class="material-symbols-outlined">notifications</span>'
      + '      <span class="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>'
      + '    </button>'
      + '    <div class="w-px h-6 bg-outline-variant"></div>'
      + '    <div class="relative" data-user-menu>'
      + '      <button data-user-menu-trigger class="flex items-center gap-sm cursor-pointer hover:bg-surface-container-low px-2 py-1 rounded-lg transition-colors">'
      + '        <div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary text-label-sm font-bold">' + session.initials + '</div>'
      + '        <div class="hidden md:block text-left">'
      + '          <p class="font-label-md text-label-md text-on-surface leading-none">' + session.name + '</p>'
      + '          <p class="font-label-sm text-label-sm text-on-surface-variant leading-none mt-0.5">' + label.badge + '</p>'
      + '        </div>'
      + '        <span class="material-symbols-outlined text-[20px] text-on-surface-variant hidden md:inline">arrow_drop_down</span>'
      + '      </button>'
      + '      <div data-user-menu-panel hidden class="fade-in absolute right-0 top-full mt-2 w-[260px] bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl overflow-hidden z-30">'
      + '        <div class="px-md py-md border-b border-outline-variant flex items-center gap-3 bg-surface-container-low/40">'
      + '          <div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary font-bold">' + session.initials + '</div>'
      + '          <div class="flex-1 overflow-hidden">'
      + '            <p class="font-label-md text-label-md text-on-surface truncate">' + session.name + '</p>'
      + '            <p class="text-label-sm text-on-surface-variant truncate">' + (session.identifier || '') + '</p>'
      + '          </div>'
      + '        </div>'
      + '        <div class="py-xs">'
      + '          <a href="../ho-so.html" class="flex items-center gap-3 px-md py-2.5 hover:bg-surface-container-low transition-colors text-on-surface">'
      + '            <span class="material-symbols-outlined text-[20px] text-on-surface-variant">person</span>'
      + '            <span class="font-label-md text-label-md">Hồ sơ cá nhân</span>'
      + '          </a>'
      + '          <a href="../ho-so.html#password" class="flex items-center gap-3 px-md py-2.5 hover:bg-surface-container-low transition-colors text-on-surface">'
      + '            <span class="material-symbols-outlined text-[20px] text-on-surface-variant">lock</span>'
      + '            <span class="font-label-md text-label-md">Đổi mật khẩu</span>'
      + '          </a>'
      + '        </div>'
      + '        <div class="border-t border-outline-variant py-xs">'
      + '          <button data-logout class="w-full flex items-center gap-3 px-md py-2.5 hover:bg-error/10 transition-colors text-error">'
      + '            <span class="material-symbols-outlined text-[20px]">logout</span>'
      + '            <span class="font-label-md text-label-md font-bold">Đăng xuất</span>'
      + '          </button>'
      + '        </div>'
      + '      </div>'
      + '    </div>'
      + '  </div>'
      + '</header>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var shell = document.querySelector('[data-shell]');
    if (!shell) return;
    var role = shell.getAttribute('data-role');
    var active = shell.getAttribute('data-active');
    var breadcrumb = (shell.getAttribute('data-breadcrumb') || '').split('|').filter(Boolean);

    // Role guard — only render the shell if the session matches the page's role.
    var session = (window.Auth && Auth.requireRole) ? Auth.requireRole(role) : null;
    if (!session) return; // Auth.requireRole has already redirected.

    shell.insertAdjacentHTML('afterbegin', renderSidebar(role, active, session) + renderTopbar(role, breadcrumb, session));

    // User menu dropdown.
    var trigger = document.querySelector('[data-user-menu-trigger]');
    var panel = document.querySelector('[data-user-menu-panel]');
    if (trigger && panel) {
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        panel.toggleAttribute('hidden');
      });
      document.addEventListener('click', function (e) {
        if (!panel.hasAttribute('hidden') && !panel.contains(e.target) && !trigger.contains(e.target)) {
          panel.setAttribute('hidden', '');
        }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') panel.setAttribute('hidden', '');
      });
    }

    document.querySelectorAll('[data-logout]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (confirm('Bạn có chắc muốn đăng xuất khỏi Kumho NPP Portal?')) Auth.logout();
      });
    });
  });
})();
