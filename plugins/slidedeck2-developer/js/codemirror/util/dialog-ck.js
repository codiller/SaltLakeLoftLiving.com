// Open simple dialogs on top of an editor. Relies on dialog.css.
(function() {
  function e(e, t) {
    var n = e.getWrapperElement(), r = n.insertBefore(document.createElement("div"), n.firstChild);
    r.className = "CodeMirror-dialog";
    r.innerHTML = "<div>" + t + "</div>";
    return r;
  }
  CodeMirror.defineExtension("openDialog", function(t, n) {
    function o() {
      if (i) return;
      i = !0;
      r.parentNode.removeChild(r);
    }
    var r = e(this, t), i = !1, s = this, u = r.getElementsByTagName("input")[0];
    if (u) {
      CodeMirror.connect(u, "keydown", function(e) {
        if (e.keyCode == 13 || e.keyCode == 27) {
          CodeMirror.e_stop(e);
          o();
          s.focus();
          e.keyCode == 13 && n(u.value);
        }
      });
      u.focus();
      CodeMirror.connect(u, "blur", o);
    }
    return o;
  });
  CodeMirror.defineExtension("openConfirm", function(t, n) {
    function a() {
      if (s) return;
      s = !0;
      r.parentNode.removeChild(r);
      o.focus();
    }
    var r = e(this, t), i = r.getElementsByTagName("button"), s = !1, o = this, u = 1;
    i[0].focus();
    for (var f = 0; f < i.length; ++f) {
      var l = i[f];
      (function(e) {
        CodeMirror.connect(l, "click", function(t) {
          CodeMirror.e_preventDefault(t);
          a();
          e && e(o);
        });
      })(n[f]);
      CodeMirror.connect(l, "blur", function() {
        --u;
        setTimeout(function() {
          u <= 0 && a();
        }, 200);
      });
      CodeMirror.connect(l, "focus", function() {
        ++u;
      });
    }
  });
})();