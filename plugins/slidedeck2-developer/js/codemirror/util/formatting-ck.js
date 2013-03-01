// ============== Formatting extensions ============================
// A common storage for all mode-specific formatting features
CodeMirror.modeExtensions || (CodeMirror.modeExtensions = {});

CodeMirror.defineExtension("getModeExt", function() {
  var e = CodeMirror.resolveMode(this.getOption("mode")).name, t = CodeMirror.modeExtensions[e];
  if (!t) throw new Error("No extensions found for mode " + e);
  return t;
});

CodeMirror.defineExtension("getModeExtAtPos", function(e) {
  var t = this.getTokenAt(e);
  return t && t.state && t.state.mode ? CodeMirror.modeExtensions[t.state.mode == "html" ? "htmlmixed" : t.state.mode] : this.getModeExt();
});

CodeMirror.defineExtension("commentRange", function(e, t, n) {
  var r = this.getModeExtAtPos(this.getCursor());
  if (e) {
    var i = this.getRange(t, n);
    this.replaceRange(r.commentStart + this.getRange(t, n) + r.commentEnd, t, n);
    t.line == n.line && t.ch == n.ch && this.setCursor(t.line, t.ch + r.commentStart.length);
  } else {
    var s = this.getRange(t, n), o = s.indexOf(r.commentStart), u = s.lastIndexOf(r.commentEnd);
    o > -1 && u > -1 && u > o && (s = s.substr(0, o) + s.substring(o + r.commentStart.length, u) + s.substr(u + r.commentEnd.length));
    this.replaceRange(s, t, n);
  }
});

CodeMirror.defineExtension("autoIndentRange", function(e, t) {
  var n = this;
  this.operation(function() {
    for (var r = e.line; r <= t.line; r++) n.indentLine(r, "smart");
  });
});

CodeMirror.defineExtension("autoFormatRange", function(e, t) {
  var n = this.indexFromPos(e), r = this.indexFromPos(t), i = this.getModeExt().autoFormatLineBreaks(this.getValue(), n, r), s = this;
  this.operation(function() {
    s.replaceRange(i, e, t);
    var r = s.posFromIndex(n).line, o = s.posFromIndex(n + i.length).line;
    for (var u = r; u <= o; u++) s.indentLine(u, "smart");
  });
});

CodeMirror.modeExtensions.css = {
  commentStart: "/*",
  commentEnd: "*/",
  wordWrapChars: [ ";", "\\{", "\\}" ],
  autoFormatLineBreaks: function(e) {
    return e.replace(new RegExp("(;|\\{|\\})([^\r\n])", "g"), "$1\n$2");
  }
};

CodeMirror.modeExtensions.javascript = {
  commentStart: "/*",
  commentEnd: "*/",
  wordWrapChars: [ ";", "\\{", "\\}" ],
  getNonBreakableBlocks: function(e) {
    var t = [ new RegExp("for\\s*?\\(([\\s\\S]*?)\\)"), new RegExp("'([\\s\\S]*?)('|$)"), new RegExp('"([\\s\\S]*?)("|$)'), new RegExp("//.*([\r\n]|$)") ], n = new Array;
    for (var r = 0; r < t.length; r++) {
      var i = 0;
      while (i < e.length) {
        var s = e.substr(i).match(t[r]);
        if (s == null) break;
        n.push({
          start: i + s.index,
          end: i + s.index + s[0].length
        });
        i += s.index + Math.max(1, s[0].length);
      }
    }
    n.sort(function(e, t) {
      return e.start - t.start;
    });
    return n;
  },
  autoFormatLineBreaks: function(e) {
    var t = 0, n = new RegExp("(;|\\{|\\})([^\r\n])", "g"), r = this.getNonBreakableBlocks(e);
    if (r != null) {
      var i = "";
      for (var s = 0; s < r.length; s++) {
        if (r[s].start > t) {
          i += e.substring(t, r[s].start).replace(n, "$1\n$2");
          t = r[s].start;
        }
        if (r[s].start <= t && r[s].end >= t) {
          i += e.substring(t, r[s].end);
          t = r[s].end;
        }
      }
      t < e.length - 1 && (i += e.substr(t).replace(n, "$1\n$2"));
      return i;
    }
    return e.replace(n, "$1\n$2");
  }
};

CodeMirror.modeExtensions.xml = {
  commentStart: "<!--",
  commentEnd: "-->",
  wordWrapChars: [ ">" ],
  autoFormatLineBreaks: function(e) {
    var t = e.split("\n"), n = new RegExp("(^\\s*?<|^[^<]*?)(.+)(>\\s*?$|[^>]*?$)"), r = new RegExp("<", "g"), i = new RegExp("(>)([^\r\n])", "g");
    for (var s = 0; s < t.length; s++) {
      var o = t[s].match(n);
      if (o != null && o.length > 3) {
        t[s] = o[1] + o[2].replace(r, "\n$&").replace(i, "$1\n$2") + o[3];
        continue;
      }
    }
    return t.join("\n");
  }
};

CodeMirror.modeExtensions.htmlmixed = {
  commentStart: "<!--",
  commentEnd: "-->",
  wordWrapChars: [ ">", ";", "\\{", "\\}" ],
  getModeInfos: function(e, t) {
    var n = new Array;
    n[0] = {
      pos: 0,
      modeExt: CodeMirror.modeExtensions.xml,
      modeName: "xml"
    };
    var r = new Array;
    r[0] = {
      regex: new RegExp("<style[^>]*>([\\s\\S]*?)(</style[^>]*>|$)", "i"),
      modeExt: CodeMirror.modeExtensions.css,
      modeName: "css"
    };
    r[1] = {
      regex: new RegExp("<script[^>]*>([\\s\\S]*?)(</script[^>]*>|$)", "i"),
      modeExt: CodeMirror.modeExtensions.javascript,
      modeName: "javascript"
    };
    var i = typeof t != "undefined" ? t : e.length - 1;
    for (var s = 0; s < r.length; s++) {
      var o = 0;
      while (o <= i) {
        var u = e.substr(o).match(r[s].regex);
        if (u == null) break;
        if (u.length > 1 && u[1].length > 0) {
          var a = o + u.index + u[0].indexOf(u[1]);
          n.push({
            pos: a,
            modeExt: r[s].modeExt,
            modeName: r[s].modeName
          });
          n.push({
            pos: a + u[1].length,
            modeExt: n[0].modeExt,
            modeName: n[0].modeName
          });
          o += u.index + u[0].length;
          continue;
        }
        o += u.index + Math.max(u[0].length, 1);
      }
    }
    n.sort(function(t, n) {
      return t.pos - n.pos;
    });
    return n;
  },
  autoFormatLineBreaks: function(e, t, n) {
    var r = this.getModeInfos(e), i = new RegExp("^\\s*?\n"), s = new RegExp("\n\\s*?$"), o = "";
    if (r.length > 1) for (var u = 1; u <= r.length; u++) {
      var a = r[u - 1].pos, f = u < r.length ? r[u].pos : n;
      if (a >= n) break;
      if (a < t) {
        if (f <= t) continue;
        a = t;
      }
      f > n && (f = n);
      var l = e.substring(a, f);
      if (r[u - 1].modeName != "xml") {
        !i.test(l) && a > 0 && (l = "\n" + l);
        !s.test(l) && f < e.length - 1 && (l += "\n");
      }
      o += r[u - 1].modeExt.autoFormatLineBreaks(l);
    } else o = r[0].modeExt.autoFormatLineBreaks(e.substring(t, n));
    return o;
  }
};