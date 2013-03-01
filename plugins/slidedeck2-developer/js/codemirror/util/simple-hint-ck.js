(function() {
  CodeMirror.simpleHint = function(e, t) {
    function i(t) {
      e.replaceRange(t, n.from, n.to);
    }
    function h() {
      if (c) return;
      c = !0;
      s.parentNode.removeChild(s);
    }
    function p() {
      i(r[o.selectedIndex]);
      h();
      setTimeout(function() {
        e.focus();
      }, 50);
    }
    if (e.somethingSelected()) return;
    var n = t(e);
    if (!n || !n.list.length) return;
    var r = n.list;
    if (r.length == 1) {
      i(r[0]);
      return !0;
    }
    var s = document.createElement("div");
    s.className = "CodeMirror-completions";
    var o = s.appendChild(document.createElement("select"));
    window.opera || (o.multiple = !0);
    for (var u = 0; u < r.length; ++u) {
      var a = o.appendChild(document.createElement("option"));
      a.appendChild(document.createTextNode(r[u]));
    }
    o.firstChild.selected = !0;
    o.size = Math.min(10, r.length);
    var f = e.cursorCoords();
    s.style.left = f.x + "px";
    s.style.top = f.yBot + "px";
    document.body.appendChild(s);
    var l = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
    l - f.x < o.clientWidth && (s.style.left = f.x - o.clientWidth + "px");
    r.length <= 10 && (s.style.width = o.clientWidth - 1 + "px");
    var c = !1;
    CodeMirror.connect(o, "blur", h);
    CodeMirror.connect(o, "keydown", function(n) {
      var r = n.keyCode;
      if (r == 13) {
        CodeMirror.e_stop(n);
        p();
      } else if (r == 27) {
        CodeMirror.e_stop(n);
        h();
        e.focus();
      } else if (r != 38 && r != 40) {
        h();
        e.focus();
        e.triggerOnKeyDown(n);
        setTimeout(function() {
          CodeMirror.simpleHint(e, t);
        }, 50);
      }
    });
    CodeMirror.connect(o, "dblclick", p);
    o.focus();
    window.opera && setTimeout(function() {
      c || o.focus();
    }, 100);
    return !0;
  };
})();