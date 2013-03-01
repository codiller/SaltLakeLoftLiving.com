(function() {
  function e(e, t) {
    for (var n = 0, r = e.length; n < r; ++n) t(e[n]);
  }
  function t(e, t) {
    if (!Array.prototype.indexOf) {
      var n = e.length;
      while (n--) if (e[n] === t) return !0;
      return !1;
    }
    return e.indexOf(t) != -1;
  }
  function n(e, t, n) {
    var r = e.getCursor(), i = n(e, r), s = i;
    /^[\w$_]*$/.test(i.string) || (i = s = {
      start: r.ch,
      end: r.ch,
      string: "",
      state: i.state,
      className: i.string == "." ? "property" : null
    });
    while (s.className == "property") {
      s = n(e, {
        line: r.line,
        ch: s.start
      });
      if (s.string != ".") return;
      s = n(e, {
        line: r.line,
        ch: s.start
      });
      if (s.string == ")") {
        var o = 1;
        do {
          s = n(e, {
            line: r.line,
            ch: s.start
          });
          switch (s.string) {
           case ")":
            o++;
            break;
           case "(":
            o--;
            break;
           default:
          }
        } while (o > 0);
        s = n(e, {
          line: r.line,
          ch: s.start
        });
        if (s.className != "variable") return;
        s.className = "function";
      }
      if (!u) var u = [];
      u.push(s);
    }
    return {
      list: f(i, u, t),
      from: {
        line: r.line,
        ch: i.start
      },
      to: {
        line: r.line,
        ch: i.end
      }
    };
  }
  function r(e, t) {
    var n = e.getTokenAt(t);
    if (t.ch == n.start + 1 && n.string.charAt(0) == ".") {
      n.end = n.start;
      n.string = ".";
      n.className = "property";
    } else if (/^\.[\w$_]*$/.test(n.string)) {
      n.className = "property";
      n.start++;
      n.string = n.string.replace(/\./, "");
    }
    return n;
  }
  function f(n, r, u) {
    function l(e) {
      e.indexOf(f) == 0 && !t(a, e) && a.push(e);
    }
    function c(t) {
      typeof t == "string" ? e(i, l) : t instanceof Array ? e(s, l) : t instanceof Function && e(o, l);
      for (var n in t) l(n);
    }
    var a = [], f = n.string;
    if (r) {
      var h = r.pop(), p;
      h.className == "variable" ? p = window[h.string] : h.className == "string" ? p = "" : h.className == "atom" ? p = 1 : h.className == "function" && (window.jQuery == null || h.string != "$" && h.string != "jQuery" || typeof window.jQuery != "function" ? window._ != null && h.string == "_" && typeof window._ == "function" && (p = window._()) : p = window.jQuery());
      while (p != null && r.length) p = p[r.pop().string];
      p != null && c(p);
    } else {
      for (var d = n.state.localVars; d; d = d.next) l(d.name);
      c(window);
      e(u, l);
    }
    return a;
  }
  CodeMirror.javascriptHint = function(e) {
    return n(e, u, function(e, t) {
      return e.getTokenAt(t);
    });
  };
  CodeMirror.coffeescriptHint = function(e) {
    return n(e, a, r);
  };
  var i = "charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search".split(" "), s = "length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ".split(" "), o = "prototype apply call bind".split(" "), u = "break case catch continue debugger default delete do else false finally for function if in instanceof new null return switch throw true try typeof var void while with".split(" "), a = "and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes".split(" ");
})();