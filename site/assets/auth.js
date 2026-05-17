// Tiny localStorage-based session for the demo. No real auth.
(function () {
  var KEY = 'kumho_npp_session';

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
    catch (_) { return null; }
  }
  function write(s) { localStorage.setItem(KEY, JSON.stringify(s)); }
  function clear() { localStorage.removeItem(KEY); }

  // Determine role from the identifier the user typed at login.
  // Email -> Kumho admin. Phone number -> NPP. Demo only.
  function detectRole(identifier) {
    if (!identifier) return null;
    var s = String(identifier).trim();
    if (s.indexOf('@') !== -1) return 'kumho';
    if (/^[0-9\s]+$/.test(s)) return 'npp';
    return 'kumho';
  }

  var defaultProfiles = {
    kumho: { name: 'Admin Kumho', subtitle: 'Quản trị viên', initials: 'KV', area: 'Toàn quốc' },
    npp:   { name: 'NPP Miền Đông', subtitle: 'Nhà phân phối', initials: 'NĐ', area: 'Miền Nam' }
  };

  // Tài khoản demo. Key = identifier normalized (lowercase, no spaces).
  // password chỉ để hiển thị trên login page — không validate ở demo.
  var demoAccounts = {
    'admin@kumho.vn':  { role: 'kumho', password: 'kumho2026',  name: 'Trần Quốc Admin',    subtitle: 'Quản trị viên Kumho', initials: 'TA', area: 'Toàn quốc',     firstLogin: false },
    'ops@kumho.vn':    { role: 'kumho', password: 'kumho2026',  name: 'Lê Vận Hành',         subtitle: 'Vận hành Kumho',      initials: 'LV', area: 'Toàn quốc',     firstLogin: false },
    'marketing@kumho.vn': { role: 'kumho', password: 'kumho2026', name: 'Phạm Marketing',   subtitle: 'Marketing Kumho',     initials: 'PM', area: 'Toàn quốc',     firstLogin: false },
    '0912345678':      { role: 'npp',   password: 'npp@default', name: 'NPP Miền Đông',      subtitle: 'Nhà phân phối',       initials: 'NĐ', area: 'Đông Nam Bộ',  firstLogin: true  },
    '0901234567':      { role: 'npp',   password: 'npp2026',     name: 'NPP Miền Tây',       subtitle: 'Nhà phân phối',       initials: 'NT', area: 'Tây Nam Bộ',   firstLogin: false },
    '0987654321':      { role: 'npp',   password: 'npp2026',     name: 'NPP Miền Bắc',       subtitle: 'Nhà phân phối',       initials: 'NB', area: 'Miền Bắc',     firstLogin: false }
  };

  function normalizeId(s) { return String(s || '').replace(/\s+/g, '').toLowerCase(); }

  window.Auth = {
    getSession: read,
    setSession: write,
    clear: clear,
    detectRole: detectRole,
    accounts: demoAccounts,
    findAccount: function (identifier) { return demoAccounts[normalizeId(identifier)] || null; },
    login: function (identifier, opts) {
      opts = opts || {};
      var account = demoAccounts[normalizeId(identifier)];
      var role = account ? account.role : detectRole(identifier);
      var profile = account || defaultProfiles[role] || defaultProfiles.kumho;
      var session = {
        role: role,
        identifier: identifier,
        name: profile.name,
        subtitle: profile.subtitle,
        initials: profile.initials,
        area: profile.area,
        // NPP login lần đầu (B2 trong Flow.md) — bị buộc đổi mật khẩu.
        // Account demo có cờ riêng; user cũng có thể tick checkbox trên form.
        firstLogin: role === 'npp' && (!!opts.firstLogin || !!(account && account.firstLogin)),
        loginAt: new Date().toISOString()
      };
      write(session);
      return session;
    },
    logout: function () {
      clear();
      // Go back to login from wherever we are.
      var depth = location.pathname.split('/').filter(Boolean).length;
      var prefix = depth > 1 ? '../' : '';
      location.href = prefix + 'index.html';
    },
    // Used by partials.js: any role page calls this. If no session or wrong role,
    // we redirect. Returns the session for chaining.
    requireRole: function (expected) {
      var s = read();
      if (!s) { location.href = '../index.html'; return null; }
      if (s.role !== expected) {
        // User logged in with the other role — send them to that role's landing.
        var landing = s.role === 'kumho' ? '../kumho/duyet-dai-ly.html' : '../npp/quan-ly-dai-ly.html';
        location.href = landing;
        return null;
      }
      if (s.firstLogin) {
        // NPP must change default password before using the portal.
        if (location.pathname.indexOf('doi-mat-khau-lan-dau.html') === -1) {
          location.href = '../doi-mat-khau-lan-dau.html';
          return null;
        }
      }
      return s;
    }
  };
})();
