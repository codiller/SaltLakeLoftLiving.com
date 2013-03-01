// the tagRangeFinder function is
//   Copyright (C) 2011 by Daniel Glazman <daniel@glazman.org>
// released under the MIT license (../../LICENSE) like the rest of CodeMirror
CodeMirror.tagRangeFinder = function(e, t, n) {
  var r = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", i = r + "-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", s = new RegExp("^[" + r + "][" + i + "]*"), o = e.getLine(t), u = !1, a = null, f = 0;
  while (!u) {
    f = o.indexOf("<", f);
    if (-1 == f) return;
    if (f + 1 < o.length && o[f + 1] == "/") {
      f++;
      continue;
    }
    if (!o.substr(f + 1).match(s)) {
      f++;
      continue;
    }
    var l = o.indexOf(">", f + 1);
    if (-1 == l) {
      var c = t + 1, h = !1, p = e.lineCount();
      while (c < p && !h) {
        var d = e.getLine(c), v = d.indexOf(">");
        if (-1 != v) {
          h = !0;
          var m = d.lastIndexOf("/", v);
          if (-1 != m && m < v) {
            var g = o.substr(m, v - m + 1);
            if (!g.match(/\/\s*\>/)) {
              n === !0 && c++;
              return c;
            }
          }
        }
        c++;
      }
      u = !0;
    } else {
      var y = o.lastIndexOf("/", l);
      if (-1 == y) u = !0; else {
        var g = o.substr(y, l - y + 1);
        g.match(/\/\s*\>/) || (u = !0);
      }
    }
    if (u) {
      var b = o.substr(f + 1);
      a = b.match(s);
      if (a) {
        a = a[0];
        -1 != o.indexOf("</" + a + ">", f) && (u = !1);
      } else u = !1;
    }
    u || f++;
  }
  if (u) {
    var w = "(\\<\\/" + a + "\\>)|(\\<" + a + "\\>)|(\\<" + a + "\\s)|(\\<" + a + "$)", E = new RegExp(w, "g"), S = "</" + a + ">", x = 1, c = t + 1, p = e.lineCount();
    while (c < p) {
      o = e.getLine(c);
      var T = o.match(E);
      if (T) for (var N = 0; N < T.length; N++) {
        T[N] == S ? x-- : x++;
        if (!x) {
          n === !0 && c++;
          return c;
        }
      }
      c++;
    }
    return;
  }
};

CodeMirror.braceRangeFinder = function(e, t, n) {
  var r = e.getLine(t), i = r.lastIndexOf("{");
  if (i < 0 || r.lastIndexOf("}") > i) return;
  var s = e.getTokenAt({
    line: t,
    ch: i
  }).className, o = 1, u = e.lineCount(), a;
  e : for (var f = t + 1; f < u; ++f) {
    var l = e.getLine(f), c = 0;
    for (;;) {
      var h = l.indexOf("{", c), p = l.indexOf("}", c);
      h < 0 && (h = l.length);
      p < 0 && (p = l.length);
      c = Math.min(h, p);
      if (c == l.length) break;
      if (e.getTokenAt({
        line: f,
        ch: c + 1
      }).className == s) if (c == h) ++o; else if (!--o) {
        a = f;
        break e;
      }
      ++c;
    }
  }
  if (a == null || a == t + 1) return;
  n === !0 && a++;
  return a;
};

CodeMirror.indentRangeFinder = function(e, t) {
  var n = e.getOption("tabSize"), r = e.getLineHandle(t).indentation(n), i;
  for (var s = t + 1, o = e.lineCount(); s < o; ++s) {
    var u = e.getLineHandle(s);
    if (!/^\s*$/.test(u.text)) {
      if (u.indentation(n) <= r) break;
      i = s;
    }
  }
  return i ? i + 1 : null;
};

CodeMirror.newFoldFunction = function(e, t, n) {
  function i(e, t) {
    for (var n = 0; n < r.length; ++n) {
      var i = e.lineInfo(r[n].start);
      if (!i) r.splice(n--, 1); else if (i.line == t) return {
        pos: n,
        region: r[n]
      };
    }
  }
  function s(e, t) {
    e.clearMarker(t.start);
    for (var n = 0; n < t.hidden.length; ++n) e.showLine(t.hidden[n]);
  }
  var r = [];
  t == null && (t = '<div style="position: absolute; left: 2px; color:#600">&#x25bc;</div>%N%');
  return function(o, u) {
    o.operation(function() {
      var a = i(o, u);
      if (a) {
        r.splice(a.pos, 1);
        s(o, a.region);
      } else {
        var f = e(o, u, n);
        if (f == null) return;
        var l = [];
        for (var c = u + 1; c < f; ++c) {
          var h = o.hideLine(c);
          h && l.push(h);
        }
        var p = o.setMarker(u, t), d = {
          start: p,
          hidden: l
        };
        o.onDeleteLine(p, function() {
          s(o, d);
        });
        r.push(d);
      }
    });
  };
};