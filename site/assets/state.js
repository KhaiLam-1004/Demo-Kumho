// Persistent demo state — survives reloads so actions feel real.
// Stored in localStorage under "kumho_npp_state".
(function () {
  var KEY = 'kumho_npp_state';

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
    catch (_) { return {}; }
  }
  function write(s) { localStorage.setItem(KEY, JSON.stringify(s)); }

  window.State = {
    get: read,
    clear: function () { localStorage.removeItem(KEY); },

    getDealer: function (id) {
      var s = read();
      return (s.dealers && s.dealers[id]) || null;
    },
    setDealer: function (id, payload) {
      var s = read();
      s.dealers = s.dealers || {};
      s.dealers[id] = Object.assign({ updatedAt: new Date().toISOString() }, payload);
      write(s);
    },

    getOrder: function (id) {
      var s = read();
      return (s.orders && s.orders[id]) || null;
    },
    setOrder: function (id, payload) {
      var s = read();
      s.orders = s.orders || {};
      s.orders[id] = Object.assign({ updatedAt: new Date().toISOString() }, payload);
      write(s);
    }
  };
})();
