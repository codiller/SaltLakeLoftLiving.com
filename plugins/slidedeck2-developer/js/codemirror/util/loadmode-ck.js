(function() {
  function t(e, t) {
    var n = t;
    return function() {
      --n == 0 && e();
    };
  }
  function n(e, n) {
    var r = CodeMirror.modes[e].dependencies;
    if (!r) return n();
    var i = [];
    for (var s = 0; s < r.length; ++s) CodeMirror.modes.hasOwnProperty(r[s]) || i.push(r[s]);
    if (!i.length) return n();
    var o = t(n, i.length);
    for (var s = 0; s < i.length; ++s) CodeMirror.requireMode(i[s], o);
  }
  CodeMirror.modeURL || (CodeMirror.modeURL = "../mode/%N/%N.js");
  var e = {};
  CodeMirror.requireMode = function(t, r) {
    typeof t != "string" && (t = t.name);
    if (CodeMirror.modes.hasOwnProperty(t)) return n(t, r);
    if (e.hasOwnProperty(t)) return e[t].push(r);
    var i = document.createElement("script");
    i.src = CodeMirror.modeURL.replace(/%N/g, t);
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(i, s);
    var o = e[t] = [ r ], u = 0, a = setInterval(function() {
      if (++u > 100) return clearInterval(a);
      if (CodeMirror.modes.hasOwnProperty(t)) {
        clearInterval(a);
        e[t] = null;
        n(t, function() {
          for (var e = 0; e < o.length; ++e) o[e]();
        });
      }
    }, 200);
  };
  CodeMirror.autoLoadMode = function(e, t) {
    CodeMirror.modes.hasOwnProperty(t) || CodeMirror.requireMode(t, function() {
      e.setOption("mode", e.getOption("mode"));
    });
  };
})();