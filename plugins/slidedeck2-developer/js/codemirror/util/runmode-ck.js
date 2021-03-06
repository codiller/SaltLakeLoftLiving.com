CodeMirror.runMode = function(e, t, n, r) {
  var i = CodeMirror.getMode(CodeMirror.defaults, t), s = n.nodeType == 1, o = r && r.tabSize || CodeMirror.defaults.tabSize;
  if (s) {
    var u = n, a = [], f = 0;
    n = function(e, t) {
      if (e == "\n") {
        a.push("<br>");
        f = 0;
        return;
      }
      var n = "";
      for (var r = 0; ; ) {
        var i = e.indexOf("	", r);
        if (i == -1) {
          n += CodeMirror.htmlEscape(e.slice(r));
          f += e.length - r;
          break;
        }
        f += i - r;
        n += CodeMirror.htmlEscape(e.slice(r, i));
        var s = o - f % o;
        f += s;
        for (var u = 0; u < s; ++u) n += " ";
        r = i + 1;
      }
      t ? a.push('<span class="cm-' + CodeMirror.htmlEscape(t) + '">' + n + "</span>") : a.push(n);
    };
  }
  var l = CodeMirror.splitLines(e), c = CodeMirror.startState(i);
  for (var h = 0, p = l.length; h < p; ++h) {
    h && n("\n");
    var d = new CodeMirror.StringStream(l[h]);
    while (!d.eol()) {
      var v = i.token(d, c);
      n(d.current(), v, h, d.start);
      d.start = d.pos;
    }
  }
  s && (u.innerHTML = a.join(""));
};