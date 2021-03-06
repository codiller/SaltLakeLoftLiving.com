// CodeMirror version 2.25
//
// All functions that need access to the editor's state live inside
// the CodeMirror function. Below that, at the bottom of the file,
// some utilities are defined.
// CodeMirror is the only global var we claim
var CodeMirror = function() {
  function e(r, i) {
    function Gt(e) {
      return e >= 0 && e < wt.size;
    }
    function Zt(e) {
      return E(wt, e);
    }
    function en(e, t) {
      jt = !0;
      var n = t - e.height;
      for (var r = e; r; r = r.parent) r.height += n;
    }
    function tn(e) {
      var t = {
        line: 0,
        ch: 0
      };
      yn(t, {
        line: wt.size - 1,
        ch: Zt(wt.size - 1).text.length
      }, ut(e), t, t);
      Mt = !0;
    }
    function nn() {
      var e = [];
      wt.iter(0, wt.size, function(t) {
        e.push(t.text);
      });
      return e.join("\n");
    }
    function rn(e) {
      function c(e) {
        var t = Ir(e, !0);
        if (t && !Z(t, o)) {
          St || mn();
          o = t;
          Vn(r, t);
          Mt = !1;
          var n = In();
          if (t.line >= n.to || t.line < n.from) u = setTimeout(Yr(function() {
            c(e);
          }), 150);
        }
      }
      function h(e) {
        clearTimeout(u);
        var t = Ir(e);
        t && Vn(r, t);
        L(e);
        Hn();
        Mt = !0;
        p();
        f();
      }
      Xn(D(e, "shiftKey"));
      for (var t = M(e); t != C; t = t.parentNode) if (t.parentNode == J && t != K) return;
      for (var t = M(e); t != C; t = t.parentNode) if (t.parentNode == rt) {
        s.onGutterClick && s.onGutterClick(Yt, st(rt.childNodes, t) + Rt, e);
        return L(e);
      }
      var r = Ir(e);
      switch (_(e)) {
       case 3:
        j && !n && qr(e);
        return;
       case 2:
        r && Kn(r.line, r.ch, !0);
        setTimeout(Hn, 20);
        return;
      }
      if (!r) {
        M(e) == V && L(e);
        return;
      }
      St || mn();
      var i = +(new Date);
      if (Ct && Ct.time > i - 400 && Z(Ct.pos, r)) {
        L(e);
        setTimeout(Hn, 20);
        return ir(r.line);
      }
      if (Nt && Nt.time > i - 400 && Z(Nt.pos, r)) {
        Ct = {
          time: i,
          pos: r
        };
        L(e);
        return rr(r);
      }
      Nt = {
        time: i,
        pos: r
      };
      var o = r, u;
      if (s.dragDrop && X && !s.readOnly && !Z(xt.from, xt.to) && !et(r, xt.from) && !et(xt.to, r)) {
        R && (lt.draggable = !0);
        function a(t) {
          R && (lt.draggable = !1);
          Lt = !1;
          f();
          l();
          if (Math.abs(e.clientX - t.clientX) + Math.abs(e.clientY - t.clientY) < 10) {
            L(t);
            Kn(r.line, r.ch, !0);
            Hn();
          }
        }
        var f = P(document, "mouseup", Yr(a), !0), l = P(V, "drop", Yr(a), !0);
        Lt = !0;
        lt.dragDrop && lt.dragDrop();
        return;
      }
      L(e);
      Kn(r.line, r.ch, !0);
      var p = P(document, "mousemove", Yr(function(e) {
        clearTimeout(u);
        L(e);
        !F && !_(e) ? h(e) : c(e);
      }), !0), f = P(document, "mouseup", Yr(h), !0);
    }
    function sn(e) {
      for (var t = M(e); t != C; t = t.parentNode) if (t.parentNode == rt) return L(e);
      var n = Ir(e);
      if (!n) return;
      Ct = {
        time: +(new Date),
        pos: n
      };
      L(e);
      rr(n);
    }
    function on(e) {
      if (s.onDragEvent && s.onDragEvent(Yt, k(e))) return;
      e.preventDefault();
      var t = Ir(e, !0), n = e.dataTransfer.files;
      if (!t || s.readOnly) return;
      if (n && n.length && window.FileReader && window.File) {
        function r(e, n) {
          var r = new FileReader;
          r.onload = function() {
            o[n] = r.result;
            if (++u == i) {
              t = Gn(t);
              Yr(function() {
                var e = Tn(o.join(""), t, t);
                Vn(t, e);
              })();
            }
          };
          r.readAsText(e);
        }
        var i = n.length, o = Array(i), u = 0;
        for (var a = 0; a < i; ++a) r(n[a], a);
      } else try {
        var o = e.dataTransfer.getData("Text");
        o && Zr(function() {
          var e = xt.from, n = xt.to;
          Vn(t, t);
          Lt && Tn("", e, n);
          Nn(o);
          Hn();
        });
      } catch (e) {}
    }
    function un(e) {
      var t = Ln();
      e.dataTransfer.setData("Text", t);
      if (j || U) {
        var n = document.createElement("img");
        n.scr = "data:image/gif;base64,R0lGODdhAgACAIAAAAAAAP///ywAAAAAAgACAAACAoRRADs=";
        e.dataTransfer.setDragImage(n, 0, 0);
      }
    }
    function an(e, t) {
      if (typeof e == "string") {
        e = u[e];
        if (!e) return !1;
      }
      var n = Tt;
      try {
        s.readOnly && (Ot = !0);
        t && (Tt = null);
        e(Yt);
      } catch (r) {
        if (r != B) throw r;
        return !1;
      } finally {
        Tt = n;
        Ot = !1;
      }
      return !0;
    }
    function fn(e) {
      function u() {
        o = !0;
      }
      var t = f(s.keyMap), n = t.auto;
      clearTimeout(hn);
      n && !c(e) && (hn = setTimeout(function() {
        f(s.keyMap) == t && (s.keyMap = n.call ? n.call(null, Yt) : n);
      }, 50));
      var r = ft[D(e, "keyCode")], i = !1;
      if (r == null || e.altGraphKey) return !1;
      D(e, "altKey") && (r = "Alt-" + r);
      D(e, "ctrlKey") && (r = "Ctrl-" + r);
      D(e, "metaKey") && (r = "Cmd-" + r);
      var o = !1;
      D(e, "shiftKey") ? i = l("Shift-" + r, s.extraKeys, s.keyMap, function(e) {
        return an(e, !0);
      }, u) || l(r, s.extraKeys, s.keyMap, function(e) {
        if (typeof e == "string" && /^go[A-Z]/.test(e)) return an(e);
      }, u) : i = l(r, s.extraKeys, s.keyMap, an, u);
      o && (i = !1);
      if (i) {
        L(e);
        Rr();
        if (F) {
          e.oldKeyCode = e.keyCode;
          e.keyCode = 0;
        }
      }
      return i;
    }
    function ln(e, t) {
      var n = l("'" + t + "'", s.extraKeys, s.keyMap, function(e) {
        return an(e, !0);
      });
      if (n) {
        L(e);
        Rr();
      }
      return n;
    }
    function pn(e) {
      St || mn();
      F && e.keyCode == 27 && (e.returnValue = !1);
      An && Dn() && (An = !1);
      if (s.onKeyEvent && s.onKeyEvent(Yt, k(e))) return;
      var t = D(e, "keyCode");
      Xn(t == 16 || D(e, "shiftKey"));
      var r = fn(e);
      if (window.opera) {
        cn = r ? t : null;
        !r && t == 88 && D(e, n ? "metaKey" : "ctrlKey") && Nn("");
      }
    }
    function dn(e) {
      An && Dn();
      if (s.onKeyEvent && s.onKeyEvent(Yt, k(e))) return;
      var t = D(e, "keyCode"), n = D(e, "charCode");
      if (window.opera && t == cn) {
        cn = null;
        L(e);
        return;
      }
      if ((window.opera && (!e.which || e.which < 10) || W) && fn(e)) return;
      var r = String.fromCharCode(n == null ? t : n);
      s.electricChars && bt.electricChars && s.smartIndent && !s.readOnly && bt.electricChars.indexOf(r) > -1 && setTimeout(Yr(function() {
        or(xt.to.line, "smart");
      }), 75);
      if (ln(e, r)) return;
      Mn();
    }
    function vn(e) {
      if (s.onKeyEvent && s.onKeyEvent(Yt, k(e))) return;
      D(e, "keyCode") == 16 && (Tt = null);
    }
    function mn() {
      if (s.readOnly == "nocursor") return;
      if (!St) {
        s.onFocus && s.onFocus(Yt);
        St = !0;
        C.className.search(/\bCodeMirror-focused\b/) == -1 && (C.className += " CodeMirror-focused");
        Bt || Pn(!0);
      }
      On();
      Rr();
    }
    function gn() {
      if (St) {
        s.onBlur && s.onBlur(Yt);
        St = !1;
        Wt && Yr(function() {
          if (Wt) {
            Wt();
            Wt = null;
          }
        })();
        C.className = C.className.replace(" CodeMirror-focused", "");
      }
      clearInterval(yt);
      setTimeout(function() {
        St || (Tt = null);
      }, 150);
    }
    function yn(e, t, n, r, i) {
      if (Ot) return;
      if (Jt) {
        var o = [];
        wt.iter(e.line, t.line + 1, function(e) {
          o.push(e.text);
        });
        Jt.addChange(e.line, n.length, o);
        while (Jt.done.length > s.undoDepth) Jt.done.shift();
      }
      Sn(e, t, n, r, i);
    }
    function bn(e, t) {
      if (!e.length) return;
      var n = e.pop(), r = [];
      for (var i = n.length - 1; i >= 0; i -= 1) {
        var s = n[i], o = [], u = s.start + s.added;
        wt.iter(s.start, u, function(e) {
          o.push(e.text);
        });
        r.push({
          start: s.start,
          added: s.old.length,
          old: o
        });
        var a = Gn({
          line: s.start + s.old.length - 1,
          ch: it(o[o.length - 1], s.old[s.old.length - 1])
        });
        Sn({
          line: s.start,
          ch: 0
        }, {
          line: u - 1,
          ch: Zt(u - 1).text.length
        }, s.old, a, a);
      }
      Mt = !0;
      t.push(r);
    }
    function wn() {
      bn(Jt.done, Jt.undone);
    }
    function En() {
      bn(Jt.undone, Jt.done);
    }
    function Sn(e, t, n, r, i) {
      function T(e) {
        return e <= Math.min(t.line, t.line + y) ? e : e + y;
      }
      if (Ot) return;
      var o = !1, u = Xt.length;
      s.lineWrapping || wt.iter(e.line, t.line + 1, function(e) {
        if (!e.hidden && e.text.length == u) {
          o = !0;
          return !0;
        }
      });
      if (e.line != t.line || n.length > 1) jt = !0;
      var a = t.line - e.line, f = Zt(e.line), l = Zt(t.line);
      if (e.ch == 0 && t.ch == 0 && n[n.length - 1] == "") {
        var c = [], h = null;
        if (e.line) {
          h = Zt(e.line - 1);
          h.fixMarkEnds(l);
        } else l.fixMarkStarts();
        for (var p = 0, d = n.length - 1; p < d; ++p) c.push(g.inheritMarks(n[p], h));
        a && wt.remove(e.line, a, Ft);
        c.length && wt.insert(e.line, c);
      } else if (f == l) if (n.length == 1) f.replace(e.ch, t.ch, n[0]); else {
        l = f.split(t.ch, n[n.length - 1]);
        f.replace(e.ch, null, n[0]);
        f.fixMarkEnds(l);
        var c = [];
        for (var p = 1, d = n.length - 1; p < d; ++p) c.push(g.inheritMarks(n[p], f));
        c.push(l);
        wt.insert(e.line + 1, c);
      } else if (n.length == 1) {
        f.replace(e.ch, null, n[0]);
        l.replace(null, t.ch, "");
        f.append(l);
        wt.remove(e.line + 1, a, Ft);
      } else {
        var c = [];
        f.replace(e.ch, null, n[0]);
        l.replace(null, t.ch, n[n.length - 1]);
        f.fixMarkEnds(l);
        for (var p = 1, d = n.length - 1; p < d; ++p) c.push(g.inheritMarks(n[p], f));
        a > 1 && wt.remove(e.line + 1, a - 1, Ft);
        wt.insert(e.line + 1, c);
      }
      if (s.lineWrapping) {
        var v = Math.max(5, V.clientWidth / Br() - 3);
        wt.iter(e.line, e.line + n.length, function(e) {
          if (e.hidden) return;
          var t = Math.ceil(e.text.length / v) || 1;
          t != e.height && en(e, t);
        });
      } else {
        wt.iter(e.line, e.line + n.length, function(e) {
          var t = e.text;
          if (!e.hidden && t.length > u) {
            Xt = t;
            u = t.length;
            Vt = null;
            o = !1;
          }
        });
        o && (It = !0);
      }
      var m = [], y = n.length - a - 1;
      for (var p = 0, b = Et.length; p < b; ++p) {
        var w = Et[p];
        w < e.line ? m.push(w) : w > t.line && m.push(w + y);
      }
      var E = e.line + Math.min(n.length, 500);
      Vr(e.line, E);
      m.push(E);
      Et = m;
      Jr(100);
      Dt.push({
        from: e.line,
        to: t.line + 1,
        diff: y
      });
      var S = {
        from: e,
        to: t,
        text: n
      };
      if (Pt) {
        for (var x = Pt; x.next; x = x.next) ;
        x.next = S;
      } else Pt = S;
      $n(r, i, T(xt.from.line), T(xt.to.line));
      V.clientHeight && (J.style.height = wt.height * Dr() + 2 * jr() + "px");
    }
    function xn() {
      var e = 0;
      Xt = "";
      Vt = null;
      wt.iter(0, wt.size, function(t) {
        var n = t.text;
        if (!t.hidden && n.length > e) {
          e = n.length;
          Xt = n;
        }
      });
      It = !1;
    }
    function Tn(e, t, n) {
      function r(r) {
        if (et(r, t)) return r;
        if (!et(n, r)) return i;
        var s = r.line + e.length - (n.line - t.line) - 1, o = r.ch;
        r.line == n.line && (o += e[e.length - 1].length - (n.ch - (n.line == t.line ? t.ch : 0)));
        return {
          line: s,
          ch: o
        };
      }
      t = Gn(t);
      n ? n = Gn(n) : n = t;
      e = ut(e);
      var i;
      Cn(e, t, n, function(e) {
        i = e;
        return {
          from: r(xt.from),
          to: r(xt.to)
        };
      });
      return i;
    }
    function Nn(e, t) {
      Cn(ut(e), xt.from, xt.to, function(e) {
        return t == "end" ? {
          from: e,
          to: e
        } : t == "start" ? {
          from: xt.from,
          to: xt.from
        } : {
          from: xt.from,
          to: e
        };
      });
    }
    function Cn(e, t, n, r) {
      var i = e.length == 1 ? e[0].length + t.ch : e[e.length - 1].length, s = r({
        line: t.line + e.length - 1,
        ch: i
      });
      yn(t, n, e, s.from, s.to);
    }
    function kn(e, t) {
      var n = e.line, r = t.line;
      if (n == r) return Zt(n).text.slice(e.ch, t.ch);
      var i = [ Zt(n).text.slice(e.ch) ];
      wt.iter(n + 1, r, function(e) {
        i.push(e.text);
      });
      i.push(Zt(r).text.slice(0, t.ch));
      return i.join("\n");
    }
    function Ln() {
      return kn(xt.from, xt.to);
    }
    function On() {
      if (An) return;
      mt.set(s.pollInterval, function() {
        Kr();
        Dn();
        St && On();
        Qr();
      });
    }
    function Mn() {
      function t() {
        Kr();
        var n = Dn();
        if (!n && !e) {
          e = !0;
          mt.set(60, t);
        } else {
          An = !1;
          On();
        }
        Qr();
      }
      var e = !1;
      An = !0;
      mt.set(20, t);
    }
    function Dn() {
      if (Bt || !St || at(z) || s.readOnly) return !1;
      var e = z.value;
      if (e == _n) return !1;
      Tt = null;
      var t = 0, n = Math.min(_n.length, e.length);
      while (t < n && _n[t] == e[t]) ++t;
      t < _n.length ? xt.from = {
        line: xt.from.line,
        ch: xt.from.ch - (_n.length - t)
      } : At && Z(xt.from, xt.to) && (xt.to = {
        line: xt.to.line,
        ch: Math.min(Zt(xt.to.line).text.length, xt.to.ch + (e.length - t))
      });
      Nn(e.slice(t), "end");
      e.length > 1e3 ? z.value = _n = "" : _n = e;
      return !0;
    }
    function Pn(e) {
      if (!Z(xt.from, xt.to)) {
        _n = "";
        z.value = Ln();
        Y(z);
      } else e && (_n = z.value = "");
    }
    function Hn() {
      s.readOnly != "nocursor" && z.focus();
    }
    function Bn() {
      if (!ht.getBoundingClientRect) return;
      var e = ht.getBoundingClientRect();
      if (F && e.top == e.bottom) return;
      var t = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
      (e.top < 0 || e.bottom > t) && ht.scrollIntoView();
    }
    function jn() {
      var e = kr(xt.inverted ? xt.from : xt.to), t = s.lineWrapping ? Math.min(e.x, lt.offsetWidth) : e.x;
      return Fn(t, e.y, t, e.yBot);
    }
    function Fn(e, t, n, r) {
      var i = Fr(), o = jr();
      t += o;
      r += o;
      e += i;
      n += i;
      var u = V.clientHeight, a = V.scrollTop, f = !1, l = !0;
      if (t < a) {
        V.scrollTop = Math.max(0, t);
        f = !0;
      } else if (r > a + u) {
        V.scrollTop = r - u;
        f = !0;
      }
      var c = V.clientWidth, h = V.scrollLeft, p = s.fixedGutter ? nt.clientWidth : 0, d = e < p + i + 10;
      if (e < h + p || d) {
        d && (e = 0);
        V.scrollLeft = Math.max(0, e - 10 - p);
        f = !0;
      } else if (n > c + h - 3) {
        V.scrollLeft = n + 10 - c;
        f = !0;
        n > J.clientWidth && (l = !1);
      }
      f && s.onScroll && s.onScroll(Yt);
      return l;
    }
    function In() {
      var e = Dr(), t = V.scrollTop - jr(), n = Math.max(0, Math.floor(t / e)), r = Math.ceil((t + V.clientHeight) / e);
      return {
        from: x(wt, n),
        to: x(wt, r)
      };
    }
    function qn(e, t) {
      function p() {
        Vt = V.clientWidth;
        var e = dt.firstChild, t = !1;
        wt.iter(Rt, Ut, function(n) {
          if (!n.hidden) {
            var r = Math.round(e.offsetHeight / l) || 1;
            if (n.height != r) {
              en(n, r);
              jt = t = !0;
            }
          }
          e = e.nextSibling;
        });
        t && (J.style.height = wt.height * l + 2 * jr() + "px");
        return t;
      }
      if (!V.clientWidth) {
        Rt = Ut = qt = 0;
        return;
      }
      var n = In();
      if (e !== !0 && e.length == 0 && n.from > Rt && n.to < Ut) return;
      var r = Math.max(n.from - 100, 0), i = Math.min(wt.size, n.to + 100);
      Rt < r && r - Rt < 20 && (r = Rt);
      Ut > i && Ut - i < 20 && (i = Math.min(wt.size, Ut));
      var o = e === !0 ? [] : Rn([ {
        from: Rt,
        to: Ut,
        domStart: 0
      } ], e), u = 0;
      for (var a = 0; a < o.length; ++a) {
        var f = o[a];
        if (f.from < r) {
          f.domStart += r - f.from;
          f.from = r;
        }
        f.to > i && (f.to = i);
        f.from >= f.to ? o.splice(a--, 1) : u += f.to - f.from;
      }
      if (u == i - r && r == Rt && i == Ut) return;
      o.sort(function(e, t) {
        return e.domStart - t.domStart;
      });
      var l = Dr(), c = nt.style.display;
      dt.style.display = "none";
      Un(r, i, o);
      dt.style.display = nt.style.display = "";
      var h = r != Rt || i != Ut || zt != V.clientHeight + l;
      h && (zt = V.clientHeight + l);
      Rt = r;
      Ut = i;
      qt = T(wt, r);
      K.style.top = qt * l + "px";
      V.clientHeight && (J.style.height = wt.height * l + 2 * jr() + "px");
      if (dt.childNodes.length != Ut - Rt) throw new Error("BAD PATCH! " + JSON.stringify(o) + " size=" + (Ut - Rt) + " nodes=" + dt.childNodes.length);
      if (s.lineWrapping) p(); else {
        Vt == null && (Vt = xr(Xt));
        if (Vt > V.clientWidth) {
          lt.style.width = Vt + "px";
          J.style.width = "";
          J.style.width = V.scrollWidth + "px";
        } else lt.style.width = J.style.width = "";
      }
      nt.style.display = c;
      (h || jt) && zn() && s.lineWrapping && p() && zn();
      Wn();
      !t && s.onUpdate && s.onUpdate(Yt);
      return !0;
    }
    function Rn(e, t) {
      for (var n = 0, r = t.length || 0; n < r; ++n) {
        var i = t[n], s = [], o = i.diff || 0;
        for (var u = 0, a = e.length; u < a; ++u) {
          var f = e[u];
          if (i.to <= f.from && i.diff) s.push({
            from: f.from + o,
            to: f.to + o,
            domStart: f.domStart
          }); else if (i.to <= f.from || i.from >= f.to) s.push(f); else {
            i.from > f.from && s.push({
              from: f.from,
              to: i.from,
              domStart: f.domStart
            });
            i.to < f.to && s.push({
              from: i.to + o,
              to: f.to + o,
              domStart: f.domStart + (i.to - f.from)
            });
          }
        }
        e = s;
      }
      return e;
    }
    function Un(e, t, n) {
      if (!n.length) dt.innerHTML = ""; else {
        function r(e) {
          var t = e.nextSibling;
          e.parentNode.removeChild(e);
          return t;
        }
        var i = 0, s = dt.firstChild, o;
        for (var u = 0; u < n.length; ++u) {
          var a = n[u];
          while (a.domStart > i) {
            s = r(s);
            i++;
          }
          for (var f = 0, l = a.to - a.from; f < l; ++f) {
            s = s.nextSibling;
            i++;
          }
        }
        while (s) s = r(s);
      }
      var c = n.shift(), s = dt.firstChild, f = e, h = document.createElement("div");
      wt.iter(e, t, function(e) {
        c && c.to == f && (c = n.shift());
        if (!c || c.from > f) {
          if (e.hidden) var t = h.innerHTML = "<pre></pre>"; else {
            var t = "<pre" + (e.className ? ' class="' + e.className + '"' : "") + ">" + e.getHTML(lr) + "</pre>";
            e.bgClassName && (t = '<div style="position: relative"><pre class="' + e.bgClassName + '" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: -2">&#160;</pre>' + t + "</div>");
          }
          h.innerHTML = t;
          dt.insertBefore(h.firstChild, s);
        } else s = s.nextSibling;
        ++f;
      });
    }
    function zn() {
      if (!s.gutter && !s.lineNumbers) return;
      var e = K.offsetHeight, t = V.clientHeight;
      nt.style.height = (e - t < 2 ? t : e) + "px";
      var n = [], r = Rt, i;
      wt.iter(Rt, Math.max(Ut, Rt + 1), function(e) {
        if (e.hidden) n.push("<pre></pre>"); else {
          var t = e.gutterMarker, o = s.lineNumbers ? r + s.firstLineNumber : null;
          t && t.text ? o = t.text.replace("%N%", o != null ? o : "") : o == null && (o = " ");
          n.push(t && t.style ? '<pre class="' + t.style + '">' : "<pre>", o);
          for (var u = 1; u < e.height; ++u) n.push("<br/>&#160;");
          n.push("</pre>");
          t || (i = r);
        }
        ++r;
      });
      nt.style.display = "none";
      rt.innerHTML = n.join("");
      if (i != null) {
        var o = rt.childNodes[i - Rt], u = String(wt.size).length, a = G(o), f = "";
        while (a.length + f.length < u) f += " ";
        f && o.insertBefore(document.createTextNode(f), o.firstChild);
      }
      nt.style.display = "";
      var l = Math.abs((parseInt(lt.style.marginLeft) || 0) - nt.offsetWidth) > 2;
      lt.style.marginLeft = nt.offsetWidth + "px";
      jt = !1;
      return l;
    }
    function Wn() {
      var e = Z(xt.from, xt.to), t = kr(xt.from, !0), n = e ? t : kr(xt.to, !0), r = xt.inverted ? t : n, i = Dr(), o = Q(C), u = Q(dt);
      A.style.top = Math.max(0, Math.min(V.offsetHeight, r.y + u.top - o.top)) + "px";
      A.style.left = Math.max(0, Math.min(V.offsetWidth, r.x + u.left - o.left)) + "px";
      if (e) {
        ht.style.top = r.y + "px";
        ht.style.left = (s.lineWrapping ? Math.min(r.x, lt.offsetWidth) : r.x) + "px";
        ht.style.display = "";
        pt.style.display = "none";
      } else {
        var a = t.y == n.y, f = "", l = lt.clientWidth || lt.offsetWidth, c = lt.clientHeight || lt.offsetHeight;
        function h(e, t, n, r) {
          var i = q ? "width: " + (n ? l - n - e : l) + "px" : "right: " + n + "px";
          f += '<div class="CodeMirror-selected" style="position: absolute; left: ' + e + "px; top: " + t + "px; " + i + "; height: " + r + 'px"></div>';
        }
        if (xt.from.ch && t.y >= 0) {
          var p = a ? l - n.x : 0;
          h(t.x, t.y, p, i);
        }
        var d = Math.max(0, t.y + (xt.from.ch ? i : 0)), v = Math.min(n.y, c) - d;
        v > .2 * i && h(0, d, 0, v);
        (!a || !xt.from.ch) && n.y < c - .5 * i && h(0, n.y, l - n.x, i);
        pt.innerHTML = f;
        ht.style.display = "none";
        pt.style.display = "";
      }
    }
    function Xn(e) {
      e ? Tt = Tt || (xt.inverted ? xt.to : xt.from) : Tt = null;
    }
    function Vn(e, t) {
      var n = Tt && Gn(Tt);
      n && (et(n, e) ? e = n : et(t, n) && (t = n));
      $n(e, t);
      _t = !0;
    }
    function $n(e, t, n, r) {
      tr = null;
      if (n == null) {
        n = xt.from.line;
        r = xt.to.line;
      }
      if (Z(xt.from, e) && Z(xt.to, t)) return;
      if (et(t, e)) {
        var i = t;
        t = e;
        e = i;
      }
      if (e.line != n) {
        var o = Jn(e, n, xt.from.ch);
        o ? e = o : Er(e.line, !1);
      }
      t.line != r && (t = Jn(t, r, xt.to.ch));
      Z(e, t) ? xt.inverted = !1 : Z(e, xt.to) ? xt.inverted = !1 : Z(t, xt.from) && (xt.inverted = !0);
      if (s.autoClearEmptyLines && Z(xt.from, xt.to)) {
        var u = xt.inverted ? e : t;
        if (u.line != xt.from.line && xt.from.line < wt.size) {
          var a = Zt(xt.from.line);
          /^\s+$/.test(a.text) && setTimeout(Yr(function() {
            if (a.parent && /^\s+$/.test(a.text)) {
              var e = S(a);
              Tn("", {
                line: e,
                ch: 0
              }, {
                line: e,
                ch: a.text.length
              });
            }
          }, 10));
        }
      }
      xt.from = e;
      xt.to = t;
      Ht = !0;
    }
    function Jn(e, t, n) {
      function r(t) {
        var r = e.line + t, i = t == 1 ? wt.size : -1;
        while (r != i) {
          var o = Zt(r);
          if (!o.hidden) {
            var u = e.ch;
            if (s || u > n || u > o.text.length) u = o.text.length;
            return {
              line: r,
              ch: u
            };
          }
          r += t;
        }
      }
      var i = Zt(e.line), s = e.ch == i.text.length && e.ch != n;
      return i.hidden ? e.line >= t ? r(1) || r(-1) : r(-1) || r(1) : e;
    }
    function Kn(e, t, n) {
      var r = Gn({
        line: e,
        ch: t || 0
      });
      (n ? Vn : $n)(r, r);
    }
    function Qn(e) {
      return Math.max(0, Math.min(e, wt.size - 1));
    }
    function Gn(e) {
      if (e.line < 0) return {
        line: 0,
        ch: 0
      };
      if (e.line >= wt.size) return {
        line: wt.size - 1,
        ch: Zt(wt.size - 1).text.length
      };
      var t = e.ch, n = Zt(e.line).text.length;
      return t == null || t > n ? {
        line: e.line,
        ch: n
      } : t < 0 ? {
        line: e.line,
        ch: 0
      } : e;
    }
    function Yn(e, t) {
      function o() {
        for (var t = r + e, n = e < 0 ? -1 : wt.size; t != n; t += e) {
          var i = Zt(t);
          if (!i.hidden) {
            r = t;
            s = i;
            return !0;
          }
        }
      }
      function u(t) {
        if (i == (e < 0 ? 0 : s.text.length)) {
          if (!!t || !o()) return !1;
          i = e < 0 ? s.text.length : 0;
        } else i += e;
        return !0;
      }
      var n = xt.inverted ? xt.from : xt.to, r = n.line, i = n.ch, s = Zt(r);
      if (t == "char") u(); else if (t == "column") u(!0); else if (t == "word") {
        var a = !1;
        for (;;) {
          if (e < 0 && !u()) break;
          if (ot(s.text.charAt(i))) a = !0; else if (a) {
            if (e < 0) {
              e = 1;
              u();
            }
            break;
          }
          if (e > 0 && !u()) break;
        }
      }
      return {
        line: r,
        ch: i
      };
    }
    function Zn(e, t) {
      var n = e < 0 ? xt.from : xt.to;
      if (Tt || Z(xt.from, xt.to)) n = Yn(e, t);
      Kn(n.line, n.ch, !0);
    }
    function er(e, t) {
      Z(xt.from, xt.to) ? e < 0 ? Tn("", Yn(e, t), xt.to) : Tn("", xt.from, Yn(e, t)) : Tn("", xt.from, xt.to);
      _t = !0;
    }
    function nr(e, t) {
      var n = 0, r = kr(xt.inverted ? xt.from : xt.to, !0);
      tr != null && (r.x = tr);
      t == "page" ? n = Math.min(V.clientHeight, window.innerHeight || document.documentElement.clientHeight) : t == "line" && (n = Dr());
      var i = Lr(r.x, r.y + n * e + 2);
      t == "page" && (V.scrollTop += kr(i, !0).y - r.y);
      Kn(i.line, i.ch, !0);
      tr = r.x;
    }
    function rr(e) {
      var t = Zt(e.line).text, n = e.ch, r = e.ch;
      while (n > 0 && ot(t.charAt(n - 1))) --n;
      while (r < t.length && ot(t.charAt(r))) ++r;
      Vn({
        line: e.line,
        ch: n
      }, {
        line: e.line,
        ch: r
      });
    }
    function ir(e) {
      Vn({
        line: e,
        ch: 0
      }, Gn({
        line: e + 1,
        ch: 0
      }));
    }
    function sr(e) {
      if (Z(xt.from, xt.to)) return or(xt.from.line, e);
      var t = xt.to.line - (xt.to.ch ? 0 : 1);
      for (var n = xt.from.line; n <= t; ++n) or(n, e);
    }
    function or(e, t) {
      t || (t = "add");
      if (t == "smart") if (!bt.indent) t = "prev"; else var n = Xr(e);
      var r = Zt(e), i = r.indentation(s.tabSize), o = r.text.match(/^\s*/)[0], u;
      t == "prev" ? e ? u = Zt(e - 1).indentation(s.tabSize) : u = 0 : t == "smart" ? u = bt.indent(n, r.text.slice(o.length), r.text) : t == "add" ? u = i + s.indentUnit : t == "subtract" && (u = i - s.indentUnit);
      u = Math.max(0, u);
      var a = u - i;
      if (!a) {
        if (xt.from.line != e && xt.to.line != e) return;
        var f = o;
      } else {
        var f = "", l = 0;
        if (s.indentWithTabs) for (var c = Math.floor(u / s.tabSize); c; --c) {
          l += s.tabSize;
          f += "	";
        }
        while (l < u) {
          ++l;
          f += " ";
        }
      }
      Tn(f, {
        line: e,
        ch: 0
      }, {
        line: e,
        ch: o.length
      });
    }
    function ur() {
      bt = e.getMode(s, s.mode);
      wt.iter(0, wt.size, function(e) {
        e.stateAfter = null;
      });
      Et = [ 0 ];
      Jr();
    }
    function ar() {
      var e = s.gutter || s.lineNumbers;
      nt.style.display = e ? "" : "none";
      e ? jt = !0 : dt.parentNode.style.marginLeft = 0;
    }
    function fr(e, t) {
      if (s.lineWrapping) {
        C.className += " CodeMirror-wrap";
        var n = V.clientWidth / Br() - 3;
        wt.iter(0, wt.size, function(e) {
          if (e.hidden) return;
          var t = Math.ceil(e.text.length / n) || 1;
          t != 1 && en(e, t);
        });
        lt.style.width = J.style.width = "";
      } else {
        C.className = C.className.replace(" CodeMirror-wrap", "");
        Vt = null;
        Xt = "";
        wt.iter(0, wt.size, function(e) {
          e.height != 1 && !e.hidden && en(e, 1);
          e.text.length > Xt.length && (Xt = e.text);
        });
      }
      Dt.push({
        from: 0,
        to: wt.size
      });
    }
    function lr(e) {
      var t = s.tabSize - e % s.tabSize, n = $t[t];
      if (n) return n;
      for (var r = '<span class="cm-tab">', i = 0; i < t; ++i) r += " ";
      return $t[t] = {
        html: r + "</span>",
        width: t
      };
    }
    function cr() {
      V.className = V.className.replace(/\s*cm-s-\S+/g, "") + s.theme.replace(/(^|\s)\s*/g, " cm-s-");
    }
    function hr() {
      var e = a[s.keyMap].style;
      C.className = C.className.replace(/\s*cm-keymap-\S+/g, "") + (e ? " cm-keymap-" + e : "");
    }
    function pr() {
      this.set = [];
    }
    function dr(e, t, n) {
      function i(e, t, n, i) {
        Zt(e).addMark(new v(t, n, i, r));
      }
      e = Gn(e);
      t = Gn(t);
      var r = new pr;
      if (!et(e, t)) return r;
      if (e.line == t.line) i(e.line, e.ch, t.ch, n); else {
        i(e.line, e.ch, null, n);
        for (var s = e.line + 1, o = t.line; s < o; ++s) i(s, null, null, n);
        i(t.line, null, t.ch, n);
      }
      Dt.push({
        from: e.line,
        to: t.line + 1
      });
      return r;
    }
    function vr(e) {
      e = Gn(e);
      var t = new m(e.ch);
      Zt(e.line).addMark(t);
      return t;
    }
    function mr(e) {
      e = Gn(e);
      var t = [], n = Zt(e.line).marked;
      if (!n) return t;
      for (var r = 0, i = n.length; r < i; ++r) {
        var s = n[r];
        (s.from == null || s.from <= e.ch) && (s.to == null || s.to >= e.ch) && t.push(s.marker || s);
      }
      return t;
    }
    function gr(e, t, n) {
      typeof e == "number" && (e = Zt(Qn(e)));
      e.gutterMarker = {
        text: t,
        style: n
      };
      jt = !0;
      return e;
    }
    function yr(e) {
      typeof e == "number" && (e = Zt(Qn(e)));
      e.gutterMarker = null;
      jt = !0;
    }
    function br(e, t) {
      var n = e, r = e;
      typeof e == "number" ? r = Zt(Qn(e)) : n = S(e);
      if (n == null) return null;
      if (!t(r, n)) return null;
      Dt.push({
        from: n,
        to: n + 1
      });
      return r;
    }
    function wr(e, t, n) {
      return br(e, function(e) {
        if (e.className != t || e.bgClassName != n) {
          e.className = t;
          e.bgClassName = n;
          return !0;
        }
      });
    }
    function Er(e, t) {
      return br(e, function(e, n) {
        if (e.hidden != t) {
          e.hidden = t;
          if (!s.lineWrapping) {
            var r = e.text;
            if (t && r.length == Xt.length) It = !0; else if (!t && r.length > Xt.length) {
              Xt = r;
              Vt = null;
              It = !1;
            }
          }
          en(e, t ? 0 : 1);
          var i = xt.from.line, o = xt.to.line;
          if (t && (i == n || o == n)) {
            var u = i == n ? Jn({
              line: i,
              ch: 0
            }, i, 0) : xt.from, a = o == n ? Jn({
              line: o,
              ch: 0
            }, o, 0) : xt.to;
            if (!a) return;
            $n(u, a);
          }
          return jt = !0;
        }
      });
    }
    function Sr(e) {
      if (typeof e == "number") {
        if (!Gt(e)) return null;
        var t = e;
        e = Zt(e);
        if (!e) return null;
      } else {
        var t = S(e);
        if (t == null) return null;
      }
      var n = e.gutterMarker;
      return {
        line: t,
        handle: e,
        text: e.text,
        markerText: n && n.text,
        markerClass: n && n.style,
        lineClass: e.className,
        bgClass: e.bgClassName
      };
    }
    function xr(e) {
      ct.innerHTML = "<pre><span>x</span></pre>";
      ct.firstChild.firstChild.firstChild.nodeValue = e;
      return ct.firstChild.firstChild.offsetWidth || 10;
    }
    function Tr(e, t) {
      function i(e) {
        return Cr(n, e).left;
      }
      if (t <= 0) return 0;
      var n = Zt(e), r = n.text, s = 0, o = 0, u = r.length, a, f = Math.min(u, Math.ceil(t / Br()));
      for (;;) {
        var l = i(f);
        if (!(l <= t && f < u)) {
          a = l;
          u = f;
          break;
        }
        f = Math.min(u, Math.ceil(f * 1.2));
      }
      if (t > a) return u;
      f = Math.floor(u * .8);
      l = i(f);
      if (l < t) {
        s = f;
        o = l;
      }
      for (;;) {
        if (u - s <= 1) return a - t > t - o ? s : u;
        var c = Math.ceil((s + u) / 2), h = i(c);
        if (h > t) {
          u = c;
          a = h;
        } else {
          s = c;
          o = h;
        }
      }
    }
    function Cr(e, t) {
      if (t == 0) return {
        top: 0,
        left: 0
      };
      var n = s.lineWrapping && t < e.text.length && $.test(e.text.slice(t - 1, t + 1));
      ct.innerHTML = "<pre>" + e.getHTML(lr, t, Nr, n) + "</pre>";
      var r = document.getElementById(Nr), i = r.offsetTop, o = r.offsetLeft;
      if (F && i == 0 && o == 0) {
        var u = document.createElement("span");
        u.innerHTML = "x";
        r.parentNode.insertBefore(u, r.nextSibling);
        i = u.offsetTop;
      }
      return {
        top: i,
        left: o
      };
    }
    function kr(e, t) {
      var n, r = Dr(), i = r * (T(wt, e.line) - (t ? qt : 0));
      if (e.ch == 0) n = 0; else {
        var o = Cr(Zt(e.line), e.ch);
        n = o.left;
        s.lineWrapping && (i += Math.max(0, o.top));
      }
      return {
        x: n,
        y: i,
        yBot: i + r
      };
    }
    function Lr(e, t) {
      function c(e) {
        var t = Cr(u, e);
        if (f) {
          var r = Math.round(t.top / n);
          return Math.max(0, t.left + (r - l) * V.clientWidth);
        }
        return t.left;
      }
      t < 0 && (t = 0);
      var n = Dr(), r = Br(), i = qt + Math.floor(t / n), o = x(wt, i);
      if (o >= wt.size) return {
        line: wt.size - 1,
        ch: Zt(wt.size - 1).text.length
      };
      var u = Zt(o), a = u.text, f = s.lineWrapping, l = f ? i - T(wt, o) : 0;
      if (e <= 0 && l == 0) return {
        line: o,
        ch: 0
      };
      var h = 0, p = 0, d = a.length, v, m = Math.min(d, Math.ceil((e + l * V.clientWidth * .9) / r));
      for (;;) {
        var g = c(m);
        if (!(g <= e && m < d)) {
          v = g;
          d = m;
          break;
        }
        m = Math.min(d, Math.ceil(m * 1.2));
      }
      if (e > v) return {
        line: o,
        ch: d
      };
      m = Math.floor(d * .8);
      g = c(m);
      if (g < e) {
        h = m;
        p = g;
      }
      for (;;) {
        if (d - h <= 1) return {
          line: o,
          ch: v - e > e - p ? h : d
        };
        var y = Math.ceil((h + d) / 2), b = c(y);
        if (b > e) {
          d = y;
          v = b;
        } else {
          h = y;
          p = b;
        }
      }
    }
    function Ar(e) {
      var t = kr(e, !0), n = Q(lt);
      return {
        x: n.left + t.x,
        y: n.top + t.y,
        yBot: n.top + t.yBot
      };
    }
    function Dr() {
      if (_r == null) {
        _r = "<pre>";
        for (var e = 0; e < 49; ++e) _r += "x<br/>";
        _r += "x</pre>";
      }
      var t = dt.clientHeight;
      if (t == Mr) return Or;
      Mr = t;
      ct.innerHTML = _r;
      Or = ct.firstChild.offsetHeight / 50 || 1;
      ct.innerHTML = "";
      return Or;
    }
    function Br() {
      if (V.clientWidth == Hr) return Pr;
      Hr = V.clientWidth;
      return Pr = xr("x");
    }
    function jr() {
      return lt.offsetTop;
    }
    function Fr() {
      return lt.offsetLeft;
    }
    function Ir(e, t) {
      var n = Q(V, !0), r, i;
      try {
        r = e.clientX;
        i = e.clientY;
      } catch (e) {
        return null;
      }
      if (!t && (r - n.left > V.clientWidth || i - n.top > V.clientHeight)) return null;
      var s = Q(lt, !0);
      return Lr(r - s.left, i - s.top);
    }
    function qr(e) {
      function s() {
        var e = ut(z.value).join("\n");
        e != i && Yr(Nn)(e, "end");
        A.style.position = "relative";
        z.style.cssText = r;
        I && (V.scrollTop = n);
        Bt = !1;
        Pn(!0);
        On();
      }
      var t = Ir(e), n = V.scrollTop;
      if (!t || window.opera) return;
      (Z(xt.from, xt.to) || et(t, xt.from) || !et(t, xt.to)) && Yr(Kn)(t.line, t.ch);
      var r = z.style.cssText;
      A.style.position = "absolute";
      z.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) + "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: white; " + "border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
      Bt = !0;
      var i = z.value = Ln();
      Hn();
      Y(z);
      if (j) {
        O(e);
        var o = P(window, "mouseup", function() {
          o();
          setTimeout(s, 20);
        }, !0);
      } else setTimeout(s, 50);
    }
    function Rr() {
      clearInterval(yt);
      var e = !0;
      ht.style.visibility = "";
      yt = setInterval(function() {
        ht.style.visibility = (e = !e) ? "" : "hidden";
      }, 650);
    }
    function zr(e) {
      function v(e, t, n) {
        if (!e.text) return;
        var r = e.styles, i = o ? 0 : e.text.length - 1, s;
        for (var a = o ? 0 : r.length - 2, f = o ? r.length : -2; a != f; a += 2 * u) {
          var l = r[a];
          if (r[a + 1] != null && r[a + 1] != h) {
            i += u * l.length;
            continue;
          }
          for (var c = o ? 0 : l.length - 1, v = o ? l.length : -1; c != v; c += u, i += u) if (i >= t && i < n && d.test(s = l.charAt(c))) {
            var m = Ur[s];
            if (m.charAt(1) == ">" == o) p.push(s); else {
              if (p.pop() != m.charAt(0)) return {
                pos: i,
                match: !1
              };
              if (!p.length) return {
                pos: i,
                match: !0
              };
            }
          }
        }
      }
      var t = xt.inverted ? xt.from : xt.to, n = Zt(t.line), r = t.ch - 1, i = r >= 0 && Ur[n.text.charAt(r)] || Ur[n.text.charAt(++r)];
      if (!i) return;
      var s = i.charAt(0), o = i.charAt(1) == ">", u = o ? 1 : -1, a = n.styles;
      for (var f = r + 1, l = 0, c = a.length; l < c; l += 2) if ((f -= a[l].length) <= 0) {
        var h = a[l + 1];
        break;
      }
      var p = [ n.text.charAt(r) ], d = /[(){}[\]]/;
      for (var l = t.line, c = o ? Math.min(l + 100, wt.size) : Math.max(-1, l - 100); l != c; l += u) {
        var n = Zt(l), m = l == t.line, g = v(n, m && o ? r + 1 : 0, m && !o ? r : n.text.length);
        if (g) break;
      }
      g || (g = {
        pos: null,
        match: !1
      });
      var h = g.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket", y = dr({
        line: t.line,
        ch: r
      }, {
        line: t.line,
        ch: r + 1
      }, h), b = g.pos != null && dr({
        line: l,
        ch: g.pos
      }, {
        line: l,
        ch: g.pos + 1
      }, h), w = Yr(function() {
        y.clear();
        b && b.clear();
      });
      e ? setTimeout(w, 800) : Wt = w;
    }
    function Wr(e) {
      var t, n;
      for (var r = e, i = e - 40; r > i; --r) {
        if (r == 0) return 0;
        var o = Zt(r - 1);
        if (o.stateAfter) return r;
        var u = o.indentation(s.tabSize);
        if (n == null || t > u) {
          n = r - 1;
          t = u;
        }
      }
      return n;
    }
    function Xr(e) {
      var t = Wr(e), n = t && Zt(t - 1).stateAfter;
      n ? n = h(bt, n) : n = p(bt);
      wt.iter(t, e, function(e) {
        e.highlight(bt, n, s.tabSize);
        e.stateAfter = h(bt, n);
      });
      t < e && Dt.push({
        from: t,
        to: e
      });
      e < wt.size && !Zt(e).stateAfter && Et.push(e);
      return n;
    }
    function Vr(e, t) {
      var n = Xr(e);
      wt.iter(e, t, function(e) {
        e.highlight(bt, n, s.tabSize);
        e.stateAfter = h(bt, n);
      });
    }
    function $r() {
      var e = +(new Date) + s.workTime, t = Et.length;
      while (Et.length) {
        if (!Zt(Rt).stateAfter) var n = Rt; else var n = Et.pop();
        if (n >= wt.size) continue;
        var r = Wr(n), i = r && Zt(r - 1).stateAfter;
        i ? i = h(bt, i) : i = p(bt);
        var o = 0, u = bt.compareStates, a = !1, f = r, l = !1;
        wt.iter(f, wt.size, function(t) {
          var r = t.stateAfter;
          if (+(new Date) > e) {
            Et.push(f);
            Jr(s.workDelay);
            a && Dt.push({
              from: n,
              to: f + 1
            });
            return l = !0;
          }
          var c = t.highlight(bt, i, s.tabSize);
          c && (a = !0);
          t.stateAfter = h(bt, i);
          var p = null;
          if (u) {
            var d = r && u(r, i);
            d != B && (p = !!d);
          }
          p == null && (c !== !1 || !r ? o = 0 : ++o > 3 && (!bt.indent || bt.indent(r, "") == bt.indent(i, "")) && (p = !0));
          if (p) return !0;
          ++f;
        });
        if (l) return;
        a && Dt.push({
          from: n,
          to: f + 1
        });
      }
      t && s.onHighlightComplete && s.onHighlightComplete(Yt);
    }
    function Jr(e) {
      if (!Et.length) return;
      gt.set(e, Yr($r));
    }
    function Kr() {
      Mt = _t = Pt = null;
      Dt = [];
      Ht = !1;
      Ft = [];
    }
    function Qr() {
      var e = !1, t;
      It && xn();
      Ht && (e = !jn());
      if (Dt.length) t = qn(Dt, !0); else {
        Ht && Wn();
        jt && zn();
      }
      e && jn();
      if (Ht) {
        Bn();
        Rr();
      }
      St && !Bt && (Mt === !0 || Mt !== !1 && Ht) && Pn(_t);
      Ht && s.matchBrackets && setTimeout(Yr(function() {
        if (Wt) {
          Wt();
          Wt = null;
        }
        Z(xt.from, xt.to) && zr(!1);
      }), 20);
      var n = Pt, r = Ft;
      Ht && s.onCursorActivity && s.onCursorActivity(Yt);
      n && s.onChange && Yt && s.onChange(Yt, n);
      for (var i = 0; i < r.length; ++i) r[i](Yt);
      t && s.onUpdate && s.onUpdate(Yt);
    }
    function Yr(e) {
      return function() {
        Gr++ || Kr();
        try {
          var t = e.apply(this, arguments);
        } finally {
          --Gr || Qr();
        }
        return t;
      };
    }
    function Zr(e) {
      Jt.startCompound();
      try {
        return e();
      } finally {
        Jt.endCompound();
      }
    }
    var s = {}, d = e.defaults;
    for (var y in d) d.hasOwnProperty(y) && (s[y] = (i && i.hasOwnProperty(y) ? i : d)[y]);
    var C = document.createElement("div");
    C.className = "CodeMirror" + (s.lineWrapping ? " CodeMirror-wrap" : "");
    C.innerHTML = '<div style="overflow: hidden; position: relative; width: 3px; height: 0px;"><textarea style="position: absolute; padding: 0; width: 1px; height: 1em" wrap="off" autocorrect="off" autocapitalize="off"></textarea></div><div class="CodeMirror-scroll" tabindex="-1"><div style="position: relative"><div style="position: relative"><div class="CodeMirror-gutter"><div class="CodeMirror-gutter-text"></div></div><div class="CodeMirror-lines"><div style="position: relative; z-index: 0"><div style="position: absolute; width: 100%; height: 0; overflow: hidden; visibility: hidden;"></div><pre class="CodeMirror-cursor">&#160;</pre><div style="position: relative; z-index: -1"></div><div></div></div></div></div></div></div>';
    r.appendChild ? r.appendChild(C) : r(C);
    var A = C.firstChild, z = A.firstChild, V = C.lastChild, J = V.firstChild, K = J.firstChild, nt = K.firstChild, rt = nt.firstChild, lt = nt.nextSibling.firstChild, ct = lt.firstChild, ht = ct.nextSibling, pt = ht.nextSibling, dt = pt.nextSibling;
    cr();
    hr();
    t && (z.style.width = "0px");
    R || (lt.draggable = !0);
    lt.style.outline = "none";
    s.tabindex != null && (z.tabIndex = s.tabindex);
    s.autofocus && Hn();
    !s.gutter && !s.lineNumbers && (nt.style.display = "none");
    W && (A.style.height = "1px", A.style.position = "absolute");
    try {
      xr("x");
    } catch (vt) {
      vt.message.match(/runtime/i) && (vt = new Error("A CodeMirror inside a P-style element does not work in Internet Explorer. (innerHTML bug)"));
      throw vt;
    }
    var mt = new H, gt = new H, yt, bt, wt = new w([ new b([ new g("") ]) ]), Et, St;
    ur();
    var xt = {
      from: {
        line: 0,
        ch: 0
      },
      to: {
        line: 0,
        ch: 0
      },
      inverted: !1
    }, Tt, Nt, Ct, kt = 0, Lt, At = !1, Ot = !1, Mt, _t, Dt, Pt, Ht, Bt, jt, Ft, It, qt = 0, Rt = 0, Ut = 0, zt = 0, Wt, Xt = "", Vt, $t = {};
    Yr(function() {
      tn(s.value || "");
      Mt = !1;
    })();
    var Jt = new N;
    P(V, "mousedown", Yr(rn));
    P(V, "dblclick", Yr(sn));
    P(lt, "selectstart", L);
    j || P(V, "contextmenu", qr);
    P(V, "scroll", function() {
      kt = V.scrollTop;
      qn([]);
      s.fixedGutter && (nt.style.left = V.scrollLeft + "px");
      s.onScroll && s.onScroll(Yt);
    });
    P(window, "resize", function() {
      qn(!0);
    });
    P(z, "keyup", Yr(vn));
    P(z, "input", Mn);
    P(z, "keydown", Yr(pn));
    P(z, "keypress", Yr(dn));
    P(z, "focus", mn);
    P(z, "blur", gn);
    if (s.dragDrop) {
      P(lt, "dragstart", un);
      function Kt(e) {
        if (s.onDragEvent && s.onDragEvent(Yt, k(e))) return;
        O(e);
      }
      P(V, "dragenter", Kt);
      P(V, "dragover", Kt);
      P(V, "drop", Yr(on));
    }
    P(V, "paste", function() {
      Hn();
      Mn();
    });
    P(z, "paste", Mn);
    P(z, "cut", Yr(function() {
      s.readOnly || Nn("");
    }));
    W && P(J, "mouseup", function() {
      document.activeElement == z && z.blur();
      Hn();
    });
    var Qt;
    try {
      Qt = document.activeElement == z;
    } catch (vt) {}
    Qt || s.autofocus ? setTimeout(mn, 20) : gn();
    var Yt = C.CodeMirror = {
      getValue: nn,
      setValue: Yr(tn),
      getSelection: Ln,
      replaceSelection: Yr(Nn),
      focus: function() {
        window.focus();
        Hn();
        mn();
        Mn();
      },
      setOption: function(e, t) {
        var n = s[e];
        s[e] = t;
        if (e == "mode" || e == "indentUnit") ur(); else if (e == "readOnly" && t == "nocursor") {
          gn();
          z.blur();
        } else e == "readOnly" && !t ? Pn(!0) : e == "theme" ? cr() : e == "lineWrapping" && n != t ? Yr(fr)() : e == "tabSize" ? qn(!0) : e == "keyMap" && hr();
        if (e == "lineNumbers" || e == "gutter" || e == "firstLineNumber" || e == "theme") {
          ar();
          qn(!0);
        }
      },
      getOption: function(e) {
        return s[e];
      },
      undo: Yr(wn),
      redo: Yr(En),
      indentLine: Yr(function(e, t) {
        typeof t != "string" && (t == null ? t = s.smartIndent ? "smart" : "prev" : t = t ? "add" : "subtract");
        Gt(e) && or(e, t);
      }),
      indentSelection: Yr(sr),
      historySize: function() {
        return {
          undo: Jt.done.length,
          redo: Jt.undone.length
        };
      },
      clearHistory: function() {
        Jt = new N;
      },
      matchBrackets: Yr(function() {
        zr(!0);
      }),
      getTokenAt: Yr(function(e) {
        e = Gn(e);
        return Zt(e.line).getTokenAt(bt, Xr(e.line), e.ch);
      }),
      getStateAfter: function(e) {
        e = Qn(e == null ? wt.size - 1 : e);
        return Xr(e + 1);
      },
      cursorCoords: function(e, t) {
        e == null && (e = xt.inverted);
        return this.charCoords(e ? xt.from : xt.to, t);
      },
      charCoords: function(e, t) {
        e = Gn(e);
        return t == "local" ? kr(e, !1) : t == "div" ? kr(e, !0) : Ar(e);
      },
      coordsChar: function(e) {
        var t = Q(lt);
        return Lr(e.x - t.left, e.y - t.top);
      },
      markText: Yr(dr),
      setBookmark: vr,
      findMarksAt: mr,
      setMarker: Yr(gr),
      clearMarker: Yr(yr),
      setLineClass: Yr(wr),
      hideLine: Yr(function(e) {
        return Er(e, !0);
      }),
      showLine: Yr(function(e) {
        return Er(e, !1);
      }),
      onDeleteLine: function(e, t) {
        if (typeof e == "number") {
          if (!Gt(e)) return null;
          e = Zt(e);
        }
        (e.handlers || (e.handlers = [])).push(t);
        return e;
      },
      lineInfo: Sr,
      addWidget: function(e, t, n, r, i) {
        e = kr(Gn(e));
        var s = e.yBot, o = e.x;
        t.style.position = "absolute";
        J.appendChild(t);
        if (r == "over") s = e.y; else if (r == "near") {
          var u = Math.max(V.offsetHeight, wt.height * Dr()), a = Math.max(J.clientWidth, lt.clientWidth) - Fr();
          e.yBot + t.offsetHeight > u && e.y > t.offsetHeight && (s = e.y - t.offsetHeight);
          o + t.offsetWidth > a && (o = a - t.offsetWidth);
        }
        t.style.top = s + jr() + "px";
        t.style.left = t.style.right = "";
        if (i == "right") {
          o = J.clientWidth - t.offsetWidth;
          t.style.right = "0px";
        } else {
          i == "left" ? o = 0 : i == "middle" && (o = (J.clientWidth - t.offsetWidth) / 2);
          t.style.left = o + Fr() + "px";
        }
        n && Fn(o, s, o + t.offsetWidth, s + t.offsetHeight);
      },
      lineCount: function() {
        return wt.size;
      },
      clipPos: Gn,
      getCursor: function(e) {
        e == null && (e = xt.inverted);
        return tt(e ? xt.from : xt.to);
      },
      somethingSelected: function() {
        return !Z(xt.from, xt.to);
      },
      setCursor: Yr(function(e, t, n) {
        t == null && typeof e.line == "number" ? Kn(e.line, e.ch, n) : Kn(e, t, n);
      }),
      setSelection: Yr(function(e, t, n) {
        (n ? Vn : $n)(Gn(e), Gn(t || e));
      }),
      getLine: function(e) {
        if (Gt(e)) return Zt(e).text;
      },
      getLineHandle: function(e) {
        if (Gt(e)) return Zt(e);
      },
      setLine: Yr(function(e, t) {
        Gt(e) && Tn(t, {
          line: e,
          ch: 0
        }, {
          line: e,
          ch: Zt(e).text.length
        });
      }),
      removeLine: Yr(function(e) {
        Gt(e) && Tn("", {
          line: e,
          ch: 0
        }, Gn({
          line: e + 1,
          ch: 0
        }));
      }),
      replaceRange: Yr(Tn),
      getRange: function(e, t) {
        return kn(Gn(e), Gn(t));
      },
      triggerOnKeyDown: Yr(pn),
      execCommand: function(e) {
        return u[e](Yt);
      },
      moveH: Yr(Zn),
      deleteH: Yr(er),
      moveV: Yr(nr),
      toggleOverwrite: function() {
        if (At) {
          At = !1;
          ht.className = ht.className.replace(" CodeMirror-overwrite", "");
        } else {
          At = !0;
          ht.className += " CodeMirror-overwrite";
        }
      },
      posFromIndex: function(e) {
        var t = 0, n;
        wt.iter(0, wt.size, function(r) {
          var i = r.text.length + 1;
          if (i > e) {
            n = e;
            return !0;
          }
          e -= i;
          ++t;
        });
        return Gn({
          line: t,
          ch: n
        });
      },
      indexFromPos: function(e) {
        if (e.line < 0 || e.ch < 0) return 0;
        var t = e.ch;
        wt.iter(0, e.line, function(e) {
          t += e.text.length + 1;
        });
        return t;
      },
      scrollTo: function(e, t) {
        e != null && (V.scrollLeft = e);
        t != null && (V.scrollTop = t);
        qn([]);
      },
      operation: function(e) {
        return Yr(e)();
      },
      compoundChange: function(e) {
        return Zr(e);
      },
      refresh: function() {
        qn(!0);
        V.scrollHeight > kt && (V.scrollTop = kt);
      },
      getInputField: function() {
        return z;
      },
      getWrapperElement: function() {
        return C;
      },
      getScrollerElement: function() {
        return V;
      },
      getGutterElement: function() {
        return nt;
      }
    }, cn = null, hn, An = !1, _n = "", tr = null;
    pr.prototype.clear = Yr(function() {
      var e = Infinity, t = -Infinity;
      for (var n = 0, r = this.set.length; n < r; ++n) {
        var i = this.set[n], s = i.marked;
        if (!s || !i.parent) continue;
        var o = S(i);
        e = Math.min(e, o);
        t = Math.max(t, o);
        for (var u = 0; u < s.length; ++u) s[u].marker == this && s.splice(u--, 1);
      }
      e != Infinity && Dt.push({
        from: e,
        to: t + 1
      });
    });
    pr.prototype.find = function() {
      var e, t;
      for (var n = 0, r = this.set.length; n < r; ++n) {
        var i = this.set[n], s = i.marked;
        for (var o = 0; o < s.length; ++o) {
          var u = s[o];
          if (u.marker == this) if (u.from != null || u.to != null) {
            var a = S(i);
            if (a != null) {
              u.from != null && (e = {
                line: a,
                ch: u.from
              });
              u.to != null && (t = {
                line: a,
                ch: u.to
              });
            }
          }
        }
      }
      return {
        from: e,
        to: t
      };
    };
    var Nr = "CodeMirror-temp-" + Math.floor(Math.random() * 16777215).toString(16), Or, Mr, _r, Pr, Hr = 0, Ur = {
      "(": ")>",
      ")": "(<",
      "[": "]>",
      "]": "[<",
      "{": "}>",
      "}": "{<"
    }, Gr = 0;
    for (var ei in o) o.propertyIsEnumerable(ei) && !Yt.propertyIsEnumerable(ei) && (Yt[ei] = o[ei]);
    return Yt;
  }
  function f(e) {
    return typeof e == "string" ? a[e] : e;
  }
  function l(e, t, n, r, i) {
    function s(t) {
      t = f(t);
      var n = t[e];
      if (n != null && r(n)) return !0;
      if (t.nofallthrough) {
        i && i();
        return !0;
      }
      var o = t.fallthrough;
      if (o == null) return !1;
      if (Object.prototype.toString.call(o) != "[object Array]") return s(o);
      for (var u = 0, a = o.length; u < a; ++u) if (s(o[u])) return !0;
      return !1;
    }
    return t && s(t) ? !0 : s(n);
  }
  function c(e) {
    var t = ft[D(e, "keyCode")];
    return t == "Ctrl" || t == "Alt" || t == "Shift" || t == "Mod";
  }
  function h(e, t) {
    if (t === !0) return t;
    if (e.copyState) return e.copyState(t);
    var n = {};
    for (var r in t) {
      var i = t[r];
      i instanceof Array && (i = i.concat([]));
      n[r] = i;
    }
    return n;
  }
  function p(e, t, n) {
    return e.startState ? e.startState(t, n) : !0;
  }
  function d(e, t) {
    this.pos = this.start = 0;
    this.string = e;
    this.tabSize = t || 8;
  }
  function v(e, t, n, r) {
    this.from = e;
    this.to = t;
    this.style = n;
    this.marker = r;
  }
  function m(e) {
    this.from = e;
    this.to = e;
    this.line = null;
  }
  function g(e, t) {
    this.styles = t || [ e, null ];
    this.text = e;
    this.height = 1;
    this.marked = this.gutterMarker = this.className = this.bgClassName = this.handlers = null;
    this.stateAfter = this.parent = this.hidden = null;
  }
  function y(e, t, n, r) {
    for (var i = 0, s = 0, o = 0; s < t; i += 2) {
      var u = n[i], a = s + u.length;
      if (o == 0) {
        a > e && r.push(u.slice(e - s, Math.min(u.length, t - s)), n[i + 1]);
        a >= e && (o = 1);
      } else o == 1 && (a > t ? r.push(u.slice(0, t - s), n[i + 1]) : r.push(u, n[i + 1]));
      s = a;
    }
  }
  function b(e) {
    this.lines = e;
    this.parent = null;
    for (var t = 0, n = e.length, r = 0; t < n; ++t) {
      e[t].parent = this;
      r += e[t].height;
    }
    this.height = r;
  }
  function w(e) {
    this.children = e;
    var t = 0, n = 0;
    for (var r = 0, i = e.length; r < i; ++r) {
      var s = e[r];
      t += s.chunkSize();
      n += s.height;
      s.parent = this;
    }
    this.size = t;
    this.height = n;
    this.parent = null;
  }
  function E(e, t) {
    while (!e.lines) for (var n = 0; ; ++n) {
      var r = e.children[n], i = r.chunkSize();
      if (t < i) {
        e = r;
        break;
      }
      t -= i;
    }
    return e.lines[t];
  }
  function S(e) {
    if (e.parent == null) return null;
    var t = e.parent, n = st(t.lines, e);
    for (var r = t.parent; r; t = r, r = r.parent) for (var i = 0, s = r.children.length; ; ++i) {
      if (r.children[i] == t) break;
      n += r.children[i].chunkSize();
    }
    return n;
  }
  function x(e, t) {
    var n = 0;
    e : do {
      for (var r = 0, i = e.children.length; r < i; ++r) {
        var s = e.children[r], o = s.height;
        if (t < o) {
          e = s;
          continue e;
        }
        t -= o;
        n += s.chunkSize();
      }
      return n;
    } while (!e.lines);
    for (var r = 0, i = e.lines.length; r < i; ++r) {
      var u = e.lines[r], a = u.height;
      if (t < a) break;
      t -= a;
    }
    return n + r;
  }
  function T(e, t) {
    var n = 0;
    e : do {
      for (var r = 0, i = e.children.length; r < i; ++r) {
        var s = e.children[r], o = s.chunkSize();
        if (t < o) {
          e = s;
          continue e;
        }
        t -= o;
        n += s.height;
      }
      return n;
    } while (!e.lines);
    for (var r = 0; r < t; ++r) n += e.lines[r].height;
    return n;
  }
  function N() {
    this.time = 0;
    this.done = [];
    this.undone = [];
    this.compound = 0;
    this.closed = !1;
  }
  function C() {
    O(this);
  }
  function k(e) {
    e.stop || (e.stop = C);
    return e;
  }
  function L(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = !1;
  }
  function A(e) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
  }
  function O(e) {
    L(e);
    A(e);
  }
  function M(e) {
    return e.target || e.srcElement;
  }
  function _(e) {
    if (e.which) return e.which;
    if (e.button & 1) return 1;
    if (e.button & 2) return 3;
    if (e.button & 4) return 2;
  }
  function D(e, t) {
    var n = e.override && e.override.hasOwnProperty(t);
    return n ? e.override[t] : e[t];
  }
  function P(e, t, n, r) {
    if (typeof e.addEventListener == "function") {
      e.addEventListener(t, n, !1);
      if (r) return function() {
        e.removeEventListener(t, n, !1);
      };
    } else {
      var i = function(e) {
        n(e || window.event);
      };
      e.attachEvent("on" + t, i);
      if (r) return function() {
        e.detachEvent("on" + t, i);
      };
    }
  }
  function H() {
    this.id = null;
  }
  function J(e, t, n) {
    if (t == null) {
      t = e.search(/[^\s\u00a0]/);
      t == -1 && (t = e.length);
    }
    for (var r = 0, i = 0; r < t; ++r) e.charAt(r) == "	" ? i += n - i % n : ++i;
    return i;
  }
  function K(e) {
    return e.currentStyle ? e.currentStyle : window.getComputedStyle(e, null);
  }
  function Q(e, t) {
    var n = e.ownerDocument.body, r = 0, i = 0, s = !1;
    for (var o = e; o; o = o.offsetParent) {
      var u = o.offsetLeft, a = o.offsetTop;
      if (o == n) {
        r += Math.abs(u);
        i += Math.abs(a);
      } else r += u, i += a;
      t && K(o).position == "fixed" && (s = !0);
    }
    var f = t && !s ? null : n;
    for (var o = e.parentNode; o != f; o = o.parentNode) if (o.scrollLeft != null) {
      r -= o.scrollLeft;
      i -= o.scrollTop;
    }
    return {
      left: r,
      top: i
    };
  }
  function G(e) {
    return e.textContent || e.innerText || e.nodeValue || "";
  }
  function Y(e) {
    if (t) {
      e.selectionStart = 0;
      e.selectionEnd = e.value.length;
    } else e.select();
  }
  function Z(e, t) {
    return e.line == t.line && e.ch == t.ch;
  }
  function et(e, t) {
    return e.line < t.line || e.line == t.line && e.ch < t.ch;
  }
  function tt(e) {
    return {
      line: e.line,
      ch: e.ch
    };
  }
  function rt(e) {
    nt.textContent = e;
    return nt.innerHTML;
  }
  function it(e, t) {
    if (!t) return 0;
    if (!e) return t.length;
    for (var n = e.length, r = t.length; n >= 0 && r >= 0; --n, --r) if (e.charAt(n) != t.charAt(r)) break;
    return r + 1;
  }
  function st(e, t) {
    if (e.indexOf) return e.indexOf(t);
    for (var n = 0, r = e.length; n < r; ++n) if (e[n] == t) return n;
    return -1;
  }
  function ot(e) {
    return /\w/.test(e) || e.toUpperCase() != e.toLowerCase();
  }
  e.defaults = {
    value: "",
    mode: null,
    theme: "default",
    indentUnit: 2,
    indentWithTabs: !1,
    smartIndent: !0,
    tabSize: 4,
    keyMap: "default",
    extraKeys: null,
    electricChars: !0,
    autoClearEmptyLines: !1,
    onKeyEvent: null,
    onDragEvent: null,
    lineWrapping: !1,
    lineNumbers: !1,
    gutter: !1,
    fixedGutter: !1,
    firstLineNumber: 1,
    readOnly: !1,
    dragDrop: !0,
    onChange: null,
    onCursorActivity: null,
    onGutterClick: null,
    onHighlightComplete: null,
    onUpdate: null,
    onFocus: null,
    onBlur: null,
    onScroll: null,
    matchBrackets: !1,
    workTime: 100,
    workDelay: 200,
    pollInterval: 100,
    undoDepth: 40,
    tabindex: null,
    autofocus: null
  };
  var t = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent), n = t || /Mac/.test(navigator.platform), r = /Win/.test(navigator.platform), i = e.modes = {}, s = e.mimeModes = {};
  e.defineMode = function(t, n) {
    !e.defaults.mode && t != "null" && (e.defaults.mode = t);
    if (arguments.length > 2) {
      n.dependencies = [];
      for (var r = 2; r < arguments.length; ++r) n.dependencies.push(arguments[r]);
    }
    i[t] = n;
  };
  e.defineMIME = function(e, t) {
    s[e] = t;
  };
  e.resolveMode = function(t) {
    if (typeof t == "string" && s.hasOwnProperty(t)) t = s[t]; else if (typeof t == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(t)) return e.resolveMode("application/xml");
    return typeof t == "string" ? {
      name: t
    } : t || {
      name: "null"
    };
  };
  e.getMode = function(t, n) {
    var n = e.resolveMode(n), r = i[n.name];
    return r ? r(t, n) : e.getMode(t, "text/plain");
  };
  e.listModes = function() {
    var e = [];
    for (var t in i) i.propertyIsEnumerable(t) && e.push(t);
    return e;
  };
  e.listMIMEs = function() {
    var e = [];
    for (var t in s) s.propertyIsEnumerable(t) && e.push({
      mime: t,
      mode: s[t]
    });
    return e;
  };
  var o = e.extensions = {};
  e.defineExtension = function(e, t) {
    o[e] = t;
  };
  var u = e.commands = {
    selectAll: function(e) {
      e.setSelection({
        line: 0,
        ch: 0
      }, {
        line: e.lineCount() - 1
      });
    },
    killLine: function(e) {
      var t = e.getCursor(!0), n = e.getCursor(!1), r = !Z(t, n);
      !r && e.getLine(t.line).length == t.ch ? e.replaceRange("", t, {
        line: t.line + 1,
        ch: 0
      }) : e.replaceRange("", t, r ? n : {
        line: t.line
      });
    },
    deleteLine: function(e) {
      var t = e.getCursor().line;
      e.replaceRange("", {
        line: t,
        ch: 0
      }, {
        line: t
      });
    },
    undo: function(e) {
      e.undo();
    },
    redo: function(e) {
      e.redo();
    },
    goDocStart: function(e) {
      e.setCursor(0, 0, !0);
    },
    goDocEnd: function(e) {
      e.setSelection({
        line: e.lineCount() - 1
      }, null, !0);
    },
    goLineStart: function(e) {
      e.setCursor(e.getCursor().line, 0, !0);
    },
    goLineStartSmart: function(e) {
      var t = e.getCursor(), n = e.getLine(t.line), r = Math.max(0, n.search(/\S/));
      e.setCursor(t.line, t.ch <= r && t.ch ? 0 : r, !0);
    },
    goLineEnd: function(e) {
      e.setSelection({
        line: e.getCursor().line
      }, null, !0);
    },
    goLineUp: function(e) {
      e.moveV(-1, "line");
    },
    goLineDown: function(e) {
      e.moveV(1, "line");
    },
    goPageUp: function(e) {
      e.moveV(-1, "page");
    },
    goPageDown: function(e) {
      e.moveV(1, "page");
    },
    goCharLeft: function(e) {
      e.moveH(-1, "char");
    },
    goCharRight: function(e) {
      e.moveH(1, "char");
    },
    goColumnLeft: function(e) {
      e.moveH(-1, "column");
    },
    goColumnRight: function(e) {
      e.moveH(1, "column");
    },
    goWordLeft: function(e) {
      e.moveH(-1, "word");
    },
    goWordRight: function(e) {
      e.moveH(1, "word");
    },
    delCharLeft: function(e) {
      e.deleteH(-1, "char");
    },
    delCharRight: function(e) {
      e.deleteH(1, "char");
    },
    delWordLeft: function(e) {
      e.deleteH(-1, "word");
    },
    delWordRight: function(e) {
      e.deleteH(1, "word");
    },
    indentAuto: function(e) {
      e.indentSelection("smart");
    },
    indentMore: function(e) {
      e.indentSelection("add");
    },
    indentLess: function(e) {
      e.indentSelection("subtract");
    },
    insertTab: function(e) {
      e.replaceSelection("	", "end");
    },
    defaultTab: function(e) {
      e.somethingSelected() ? e.indentSelection("add") : e.replaceSelection("	", "end");
    },
    transposeChars: function(e) {
      var t = e.getCursor(), n = e.getLine(t.line);
      t.ch > 0 && t.ch < n.length - 1 && e.replaceRange(n.charAt(t.ch) + n.charAt(t.ch - 1), {
        line: t.line,
        ch: t.ch - 1
      }, {
        line: t.line,
        ch: t.ch + 1
      });
    },
    newlineAndIndent: function(e) {
      e.replaceSelection("\n", "end");
      e.indentLine(e.getCursor().line);
    },
    toggleOverwrite: function(e) {
      e.toggleOverwrite();
    }
  }, a = e.keyMap = {};
  a.basic = {
    Left: "goCharLeft",
    Right: "goCharRight",
    Up: "goLineUp",
    Down: "goLineDown",
    End: "goLineEnd",
    Home: "goLineStartSmart",
    PageUp: "goPageUp",
    PageDown: "goPageDown",
    Delete: "delCharRight",
    Backspace: "delCharLeft",
    Tab: "defaultTab",
    "Shift-Tab": "indentAuto",
    Enter: "newlineAndIndent",
    Insert: "toggleOverwrite"
  };
  a.pcDefault = {
    "Ctrl-A": "selectAll",
    "Ctrl-D": "deleteLine",
    "Ctrl-Z": "undo",
    "Shift-Ctrl-Z": "redo",
    "Ctrl-Y": "redo",
    "Ctrl-Home": "goDocStart",
    "Alt-Up": "goDocStart",
    "Ctrl-End": "goDocEnd",
    "Ctrl-Down": "goDocEnd",
    "Ctrl-Left": "goWordLeft",
    "Ctrl-Right": "goWordRight",
    "Alt-Left": "goLineStart",
    "Alt-Right": "goLineEnd",
    "Ctrl-Backspace": "delWordLeft",
    "Ctrl-Delete": "delWordRight",
    "Ctrl-S": "save",
    "Ctrl-F": "find",
    "Ctrl-G": "findNext",
    "Shift-Ctrl-G": "findPrev",
    "Shift-Ctrl-F": "replace",
    "Shift-Ctrl-R": "replaceAll",
    "Ctrl-[": "indentLess",
    "Ctrl-]": "indentMore",
    fallthrough: "basic"
  };
  a.macDefault = {
    "Cmd-A": "selectAll",
    "Cmd-D": "deleteLine",
    "Cmd-Z": "undo",
    "Shift-Cmd-Z": "redo",
    "Cmd-Y": "redo",
    "Cmd-Up": "goDocStart",
    "Cmd-End": "goDocEnd",
    "Cmd-Down": "goDocEnd",
    "Alt-Left": "goWordLeft",
    "Alt-Right": "goWordRight",
    "Cmd-Left": "goLineStart",
    "Cmd-Right": "goLineEnd",
    "Alt-Backspace": "delWordLeft",
    "Ctrl-Alt-Backspace": "delWordRight",
    "Alt-Delete": "delWordRight",
    "Cmd-S": "save",
    "Cmd-F": "find",
    "Cmd-G": "findNext",
    "Shift-Cmd-G": "findPrev",
    "Cmd-Alt-F": "replace",
    "Shift-Cmd-Alt-F": "replaceAll",
    "Cmd-[": "indentLess",
    "Cmd-]": "indentMore",
    fallthrough: [ "basic", "emacsy" ]
  };
  a["default"] = n ? a.macDefault : a.pcDefault;
  a.emacsy = {
    "Ctrl-F": "goCharRight",
    "Ctrl-B": "goCharLeft",
    "Ctrl-P": "goLineUp",
    "Ctrl-N": "goLineDown",
    "Alt-F": "goWordRight",
    "Alt-B": "goWordLeft",
    "Ctrl-A": "goLineStart",
    "Ctrl-E": "goLineEnd",
    "Ctrl-V": "goPageUp",
    "Shift-Ctrl-V": "goPageDown",
    "Ctrl-D": "delCharRight",
    "Ctrl-H": "delCharLeft",
    "Alt-D": "delWordRight",
    "Alt-Backspace": "delWordLeft",
    "Ctrl-K": "killLine",
    "Ctrl-T": "transposeChars"
  };
  e.fromTextArea = function(t, n) {
    function r() {
      t.value = u.getValue();
    }
    n || (n = {});
    n.value = t.value;
    !n.tabindex && t.tabindex && (n.tabindex = t.tabindex);
    n.autofocus == null && t.getAttribute("autofocus") != null && (n.autofocus = !0);
    if (t.form) {
      var i = P(t.form, "submit", r, !0);
      if (typeof t.form.submit == "function") {
        var s = t.form.submit;
        function o() {
          r();
          t.form.submit = s;
          t.form.submit();
          t.form.submit = o;
        }
        t.form.submit = o;
      }
    }
    t.style.display = "none";
    var u = e(function(e) {
      t.parentNode.insertBefore(e, t.nextSibling);
    }, n);
    u.save = r;
    u.getTextArea = function() {
      return t;
    };
    u.toTextArea = function() {
      r();
      t.parentNode.removeChild(u.getWrapperElement());
      t.style.display = "";
      if (t.form) {
        i();
        typeof t.form.submit == "function" && (t.form.submit = s);
      }
    };
    return u;
  };
  e.copyState = h;
  e.startState = p;
  d.prototype = {
    eol: function() {
      return this.pos >= this.string.length;
    },
    sol: function() {
      return this.pos == 0;
    },
    peek: function() {
      return this.string.charAt(this.pos);
    },
    next: function() {
      if (this.pos < this.string.length) return this.string.charAt(this.pos++);
    },
    eat: function(e) {
      var t = this.string.charAt(this.pos);
      if (typeof e == "string") var n = t == e; else var n = t && (e.test ? e.test(t) : e(t));
      if (n) {
        ++this.pos;
        return t;
      }
    },
    eatWhile: function(e) {
      var t = this.pos;
      while (this.eat(e)) ;
      return this.pos > t;
    },
    eatSpace: function() {
      var e = this.pos;
      while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) ++this.pos;
      return this.pos > e;
    },
    skipToEnd: function() {
      this.pos = this.string.length;
    },
    skipTo: function(e) {
      var t = this.string.indexOf(e, this.pos);
      if (t > -1) {
        this.pos = t;
        return !0;
      }
    },
    backUp: function(e) {
      this.pos -= e;
    },
    column: function() {
      return J(this.string, this.start, this.tabSize);
    },
    indentation: function() {
      return J(this.string, null, this.tabSize);
    },
    match: function(e, t, n) {
      if (typeof e != "string") {
        var i = this.string.slice(this.pos).match(e);
        i && t !== !1 && (this.pos += i[0].length);
        return i;
      }
      function r(e) {
        return n ? e.toLowerCase() : e;
      }
      if (r(this.string).indexOf(r(e), this.pos) == this.pos) {
        t !== !1 && (this.pos += e.length);
        return !0;
      }
    },
    current: function() {
      return this.string.slice(this.start, this.pos);
    }
  };
  e.StringStream = d;
  v.prototype = {
    attach: function(e) {
      this.marker.set.push(e);
    },
    detach: function(e) {
      var t = st(this.marker.set, e);
      t > -1 && this.marker.set.splice(t, 1);
    },
    split: function(e, t) {
      if (this.to <= e && this.to != null) return null;
      var n = this.from < e || this.from == null ? null : this.from - e + t, r = this.to == null ? null : this.to - e + t;
      return new v(n, r, this.style, this.marker);
    },
    dup: function() {
      return new v(null, null, this.style, this.marker);
    },
    clipTo: function(e, t, n, r, i) {
      e && r > this.from && (r < this.to || this.to == null) ? this.from = null : this.from != null && this.from >= t && (this.from = Math.max(r, this.from) + i);
      n && (t < this.to || this.to == null) && (t > this.from || this.from == null) ? this.to = null : this.to != null && this.to > t && (this.to = r < this.to ? this.to + i : t);
    },
    isDead: function() {
      return this.from != null && this.to != null && this.from >= this.to;
    },
    sameSet: function(e) {
      return this.marker == e.marker;
    }
  };
  m.prototype = {
    attach: function(e) {
      this.line = e;
    },
    detach: function(e) {
      this.line == e && (this.line = null);
    },
    split: function(e, t) {
      if (e < this.from) {
        this.from = this.to = this.from - e + t;
        return this;
      }
    },
    isDead: function() {
      return this.from > this.to;
    },
    clipTo: function(e, t, n, r, i) {
      if ((e || t < this.from) && (n || r > this.to)) {
        this.from = 0;
        this.to = -1;
      } else this.from > t && (this.from = this.to = Math.max(r, this.from) + i);
    },
    sameSet: function(e) {
      return !1;
    },
    find: function() {
      return !this.line || !this.line.parent ? null : {
        line: S(this.line),
        ch: this.from
      };
    },
    clear: function() {
      if (this.line) {
        var e = st(this.line.marked, this);
        e != -1 && this.line.marked.splice(e, 1);
        this.line = null;
      }
    }
  };
  g.inheritMarks = function(e, t) {
    var n = new g(e), r = t && t.marked;
    if (r) for (var i = 0; i < r.length; ++i) if (r[i].to == null && r[i].style) {
      var s = n.marked || (n.marked = []), o = r[i], u = o.dup();
      s.push(u);
      u.attach(n);
    }
    return n;
  };
  g.prototype = {
    replace: function(e, t, n) {
      var r = [], i = this.marked, s = t == null ? this.text.length : t;
      y(0, e, this.styles, r);
      n && r.push(n, null);
      y(s, this.text.length, this.styles, r);
      this.styles = r;
      this.text = this.text.slice(0, e) + n + this.text.slice(s);
      this.stateAfter = null;
      if (i) {
        var o = n.length - (s - e);
        for (var u = 0; u < i.length; ++u) {
          var a = i[u];
          a.clipTo(e == null, e || 0, t == null, s, o);
          if (a.isDead()) {
            a.detach(this);
            i.splice(u--, 1);
          }
        }
      }
    },
    split: function(e, t) {
      var n = [ t, null ], r = this.marked;
      y(e, this.text.length, this.styles, n);
      var i = new g(t + this.text.slice(e), n);
      if (r) for (var s = 0; s < r.length; ++s) {
        var o = r[s], u = o.split(e, t.length);
        if (u) {
          i.marked || (i.marked = []);
          i.marked.push(u);
          u.attach(i);
          u == o && r.splice(s--, 1);
        }
      }
      return i;
    },
    append: function(e) {
      var t = this.text.length, n = e.marked, r = this.marked;
      this.text += e.text;
      y(0, e.text.length, e.styles, this.styles);
      if (r) for (var i = 0; i < r.length; ++i) r[i].to == null && (r[i].to = t);
      if (n && n.length) {
        r || (this.marked = r = []);
        e : for (var i = 0; i < n.length; ++i) {
          var s = n[i];
          if (!s.from) for (var o = 0; o < r.length; ++o) {
            var u = r[o];
            if (u.to == t && u.sameSet(s)) {
              u.to = s.to == null ? null : s.to + t;
              if (u.isDead()) {
                u.detach(this);
                n.splice(i--, 1);
              }
              continue e;
            }
          }
          r.push(s);
          s.attach(this);
          s.from += t;
          s.to != null && (s.to += t);
        }
      }
    },
    fixMarkEnds: function(e) {
      var t = this.marked, n = e.marked;
      if (!t) return;
      for (var r = 0; r < t.length; ++r) {
        var i = t[r], s = i.to == null;
        if (s && n) for (var o = 0; o < n.length; ++o) if (n[o].sameSet(i)) {
          s = !1;
          break;
        }
        s && (i.to = this.text.length);
      }
    },
    fixMarkStarts: function() {
      var e = this.marked;
      if (!e) return;
      for (var t = 0; t < e.length; ++t) e[t].from == null && (e[t].from = 0);
    },
    addMark: function(e) {
      e.attach(this);
      this.marked == null && (this.marked = []);
      this.marked.push(e);
      this.marked.sort(function(e, t) {
        return (e.from || 0) - (t.from || 0);
      });
    },
    highlight: function(e, t, n) {
      var r = new d(this.text, n), i = this.styles, s = 0, o = !1, u = i[0], a;
      this.text == "" && e.blankLine && e.blankLine(t);
      while (!r.eol()) {
        var f = e.token(r, t), l = this.text.slice(r.start, r.pos);
        r.start = r.pos;
        if (s && i[s - 1] == f) i[s - 2] += l; else if (l) {
          !o && (i[s + 1] != f || s && i[s - 2] != a) && (o = !0);
          i[s++] = l;
          i[s++] = f;
          a = u;
          u = i[s];
        }
        if (r.pos > 5e3) {
          i[s++] = this.text.slice(r.pos);
          i[s++] = null;
          break;
        }
      }
      if (i.length != s) {
        i.length = s;
        o = !0;
      }
      s && i[s - 2] != a && (o = !0);
      return o || (i.length < 5 && this.text.length < 10 ? null : !1);
    },
    getTokenAt: function(e, t, n) {
      var r = this.text, i = new d(r);
      while (i.pos < n && !i.eol()) {
        i.start = i.pos;
        var s = e.token(i, t);
      }
      return {
        start: i.start,
        end: i.pos,
        string: i.current(),
        className: s || null,
        state: t
      };
    },
    indentation: function(e) {
      return J(this.text, null, e);
    },
    getHTML: function(e, t, n, r) {
      function u(t, n) {
        if (!t) return;
        s && F && t.charAt(0) == " " && (t = " " + t.slice(1));
        s = !1;
        if (t.indexOf("	") == -1) {
          o += t.length;
          var r = rt(t);
        } else {
          var r = "";
          for (var u = 0; ; ) {
            var a = t.indexOf("	", u);
            if (a == -1) {
              r += rt(t.slice(u));
              o += t.length - u;
              break;
            }
            o += a - u;
            var f = e(o);
            r += rt(t.slice(u, a)) + f.html;
            o += f.width;
            u = a + 1;
          }
        }
        n ? i.push('<span class="', n, '">', r, "</span>") : i.push(r);
      }
      function v(e) {
        return e ? "cm-" + e.replace(/ +/g, " cm-") : null;
      }
      var i = [], s = !0, o = 0, a = u;
      if (t != null) {
        var f = 0, l = '<span id="' + n + '">';
        a = function(e, n) {
          var s = e.length;
          if (t >= f && t < f + s) {
            if (t > f) {
              u(e.slice(0, t - f), n);
              r && i.push("<wbr>");
            }
            i.push(l);
            var o = t - f;
            u(window.opera ? e.slice(o, o + 1) : e.slice(o), n);
            i.push("</span>");
            window.opera && u(e.slice(o + 1), n);
            t--;
            f += s;
          } else {
            f += s;
            u(e, n);
            f == t && f == d ? i.push(l + " </span>") : f > t + 10 && /\s/.test(e) && (a = function() {});
          }
        };
      }
      var c = this.styles, h = this.text, p = this.marked, d = h.length;
      if (!h && t == null) a(" "); else if (!p || !p.length) for (var m = 0, g = 0; g < d; m += 2) {
        var y = c[m], b = c[m + 1], w = y.length;
        g + w > d && (y = y.slice(0, d - g));
        g += w;
        a(y, v(b));
      } else {
        var E = 0, m = 0, S = "", b, x = 0, T = p[0].from || 0, N = [], C = 0;
        function k() {
          var e;
          while (C < p.length && ((e = p[C]).from == E || e.from == null)) {
            e.style != null && N.push(e);
            ++C;
          }
          T = C < p.length ? p[C].from : Infinity;
          for (var t = 0; t < N.length; ++t) {
            var n = N[t].to || Infinity;
            n == E ? N.splice(t--, 1) : T = Math.min(n, T);
          }
        }
        var L = 0;
        while (E < d) {
          T == E && k();
          var A = Math.min(d, T);
          for (;;) {
            if (S) {
              var O = E + S.length, M = b;
              for (var _ = 0; _ < N.length; ++_) M = (M ? M + " " : "") + N[_].style;
              a(O > A ? S.slice(0, A - E) : S, M);
              if (O >= A) {
                S = S.slice(A - E);
                E = A;
                break;
              }
              E = O;
            }
            S = c[m++];
            b = v(c[m++]);
          }
        }
      }
      return i.join("");
    },
    cleanUp: function() {
      this.parent = null;
      if (this.marked) for (var e = 0, t = this.marked.length; e < t; ++e) this.marked[e].detach(this);
    }
  };
  b.prototype = {
    chunkSize: function() {
      return this.lines.length;
    },
    remove: function(e, t, n) {
      for (var r = e, i = e + t; r < i; ++r) {
        var s = this.lines[r];
        this.height -= s.height;
        s.cleanUp();
        if (s.handlers) for (var o = 0; o < s.handlers.length; ++o) n.push(s.handlers[o]);
      }
      this.lines.splice(e, t);
    },
    collapse: function(e) {
      e.splice.apply(e, [ e.length, 0 ].concat(this.lines));
    },
    insertHeight: function(e, t, n) {
      this.height += n;
      this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
      for (var r = 0, i = t.length; r < i; ++r) t[r].parent = this;
    },
    iterN: function(e, t, n) {
      for (var r = e + t; e < r; ++e) if (n(this.lines[e])) return !0;
    }
  };
  w.prototype = {
    chunkSize: function() {
      return this.size;
    },
    remove: function(e, t, n) {
      this.size -= t;
      for (var r = 0; r < this.children.length; ++r) {
        var i = this.children[r], s = i.chunkSize();
        if (e < s) {
          var o = Math.min(t, s - e), u = i.height;
          i.remove(e, o, n);
          this.height -= u - i.height;
          if (s == o) {
            this.children.splice(r--, 1);
            i.parent = null;
          }
          if ((t -= o) == 0) break;
          e = 0;
        } else e -= s;
      }
      if (this.size - t < 25) {
        var a = [];
        this.collapse(a);
        this.children = [ new b(a) ];
        this.children[0].parent = this;
      }
    },
    collapse: function(e) {
      for (var t = 0, n = this.children.length; t < n; ++t) this.children[t].collapse(e);
    },
    insert: function(e, t) {
      var n = 0;
      for (var r = 0, i = t.length; r < i; ++r) n += t[r].height;
      this.insertHeight(e, t, n);
    },
    insertHeight: function(e, t, n) {
      this.size += t.length;
      this.height += n;
      for (var r = 0, i = this.children.length; r < i; ++r) {
        var s = this.children[r], o = s.chunkSize();
        if (e <= o) {
          s.insertHeight(e, t, n);
          if (s.lines && s.lines.length > 50) {
            while (s.lines.length > 50) {
              var u = s.lines.splice(s.lines.length - 25, 25), a = new b(u);
              s.height -= a.height;
              this.children.splice(r + 1, 0, a);
              a.parent = this;
            }
            this.maybeSpill();
          }
          break;
        }
        e -= o;
      }
    },
    maybeSpill: function() {
      if (this.children.length <= 10) return;
      var e = this;
      do {
        var t = e.children.splice(e.children.length - 5, 5), n = new w(t);
        if (!e.parent) {
          var r = new w(e.children);
          r.parent = e;
          e.children = [ r, n ];
          e = r;
        } else {
          e.size -= n.size;
          e.height -= n.height;
          var i = st(e.parent.children, e);
          e.parent.children.splice(i + 1, 0, n);
        }
        n.parent = e.parent;
      } while (e.children.length > 10);
      e.parent.maybeSpill();
    },
    iter: function(e, t, n) {
      this.iterN(e, t - e, n);
    },
    iterN: function(e, t, n) {
      for (var r = 0, i = this.children.length; r < i; ++r) {
        var s = this.children[r], o = s.chunkSize();
        if (e < o) {
          var u = Math.min(t, o - e);
          if (s.iterN(e, u, n)) return !0;
          if ((t -= u) == 0) break;
          e = 0;
        } else e -= o;
      }
    }
  };
  N.prototype = {
    addChange: function(e, t, n) {
      this.undone.length = 0;
      var r = +(new Date), i = this.done[this.done.length - 1], s = i && i[i.length - 1], o = r - this.time;
      if (this.compound && i && !this.closed) i.push({
        start: e,
        added: t,
        old: n
      }); else if (o > 400 || !s || this.closed || s.start > e + n.length || s.start + s.added < e) {
        this.done.push([ {
          start: e,
          added: t,
          old: n
        } ]);
        this.closed = !1;
      } else {
        var u = Math.max(0, s.start - e), a = Math.max(0, e + n.length - (s.start + s.added));
        for (var f = u; f > 0; --f) s.old.unshift(n[f - 1]);
        for (var f = a; f > 0; --f) s.old.push(n[n.length - f]);
        u && (s.start = e);
        s.added += t - (n.length - u - a);
      }
      this.time = r;
    },
    startCompound: function() {
      this.compound++ || (this.closed = !0);
    },
    endCompound: function() {
      --this.compound || (this.closed = !0);
    }
  };
  e.e_stop = O;
  e.e_preventDefault = L;
  e.e_stopPropagation = A;
  e.connect = P;
  H.prototype = {
    set: function(e, t) {
      clearTimeout(this.id);
      this.id = setTimeout(t, e);
    }
  };
  var B = e.Pass = {
    toString: function() {
      return "CodeMirror.Pass";
    }
  }, j = /gecko\/\d{7}/i.test(navigator.userAgent), F = /MSIE \d/.test(navigator.userAgent), I = /MSIE [1-8]\b/.test(navigator.userAgent), q = F && document.documentMode == 5, R = /WebKit\//.test(navigator.userAgent), U = /Chrome\//.test(navigator.userAgent), z = /Apple Computer/.test(navigator.vendor), W = /KHTML\//.test(navigator.userAgent), X = function() {
    if (I) return !1;
    var e = document.createElement("div");
    return "draggable" in e || "dragDrop" in e;
  }(), V = function() {
    var e = document.createElement("textarea");
    e.value = "foo\nbar";
    return e.value.indexOf("\r") > -1 ? "\r\n" : "\n";
  }(), $ = /^$/;
  j ? $ = /$'/ : z ? $ = /\-[^ \-?]|\?[^ !'\"\),.\-\/:;\?\]\}]/ : U && ($ = /\-[^ \-\.?]|\?[^ \-\.?\]\}:;!'\"\),\/]|[\.!\"#&%\)*+,:;=>\]|\}~][\(\{\[<]|\$'/);
  document.documentElement.getBoundingClientRect != null && (Q = function(e, t) {
    try {
      var n = e.getBoundingClientRect();
      n = {
        top: n.top,
        left: n.left
      };
    } catch (r) {
      n = {
        top: 0,
        left: 0
      };
    }
    if (!t) if (window.pageYOffset == null) {
      var i = document.documentElement || document.body.parentNode;
      i.scrollTop == null && (i = document.body);
      n.top += i.scrollTop;
      n.left += i.scrollLeft;
    } else {
      n.top += window.pageYOffset;
      n.left += window.pageXOffset;
    }
    return n;
  });
  var nt = document.createElement("pre");
  rt("a") == "\na" ? rt = function(e) {
    nt.textContent = e;
    return nt.innerHTML.slice(1);
  } : rt("	") != "	" && (rt = function(e) {
    nt.innerHTML = "";
    nt.appendChild(document.createTextNode(e));
    return nt.innerHTML;
  });
  e.htmlEscape = rt;
  var ut = "\n\nb".split(/\n/).length != 3 ? function(e) {
    var t = 0, n, r = [];
    while ((n = e.indexOf("\n", t)) > -1) {
      r.push(e.slice(t, e.charAt(n - 1) == "\r" ? n - 1 : n));
      t = n + 1;
    }
    r.push(e.slice(t));
    return r;
  } : function(e) {
    return e.split(/\r?\n/);
  };
  e.splitLines = ut;
  var at = window.getSelection ? function(e) {
    try {
      return e.selectionStart != e.selectionEnd;
    } catch (t) {
      return !1;
    }
  } : function(e) {
    try {
      var t = e.ownerDocument.selection.createRange();
    } catch (n) {}
    return !t || t.parentElement() != e ? !1 : t.compareEndPoints("StartToEnd", t) != 0;
  };
  e.defineMode("null", function() {
    return {
      token: function(e) {
        e.skipToEnd();
      }
    };
  });
  e.defineMIME("text/plain", "null");
  var ft = {
    3: "Enter",
    8: "Backspace",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Ctrl",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Esc",
    32: "Space",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "Left",
    38: "Up",
    39: "Right",
    40: "Down",
    44: "PrintScrn",
    45: "Insert",
    46: "Delete",
    59: ";",
    91: "Mod",
    92: "Mod",
    93: "Mod",
    127: "Delete",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'",
    63276: "PageUp",
    63277: "PageDown",
    63275: "End",
    63273: "Home",
    63234: "Left",
    63232: "Up",
    63235: "Right",
    63233: "Down",
    63302: "Insert",
    63272: "Delete"
  };
  e.keyNames = ft;
  (function() {
    for (var e = 0; e < 10; e++) ft[e + 48] = String(e);
    for (var e = 65; e <= 90; e++) ft[e] = String.fromCharCode(e);
    for (var e = 1; e <= 12; e++) ft[e + 111] = ft[e + 63235] = "F" + e;
  })();
  return e;
}();