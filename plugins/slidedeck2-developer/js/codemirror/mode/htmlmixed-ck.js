CodeMirror.defineMode("htmlmixed", function(e, t) {
  function s(e, t) {
    var s = n.token(e, t.htmlState);
    if (s == "tag" && e.current() == ">" && t.htmlState.context) if (/^script$/i.test(t.htmlState.context.tagName)) {
      t.token = u;
      t.localState = r.startState(n.indent(t.htmlState, ""));
      t.mode = "javascript";
    } else if (/^style$/i.test(t.htmlState.context.tagName)) {
      t.token = a;
      t.localState = i.startState(n.indent(t.htmlState, ""));
      t.mode = "css";
    }
    return s;
  }
  function o(e, t, n) {
    var r = e.current(), i = r.search(t);
    i > -1 && e.backUp(r.length - i);
    return n;
  }
  function u(e, t) {
    if (e.match(/^<\/\s*script\s*>/i, !1)) {
      t.token = s;
      t.localState = null;
      t.mode = "html";
      return s(e, t);
    }
    return o(e, /<\/\s*script\s*>/, r.token(e, t.localState));
  }
  function a(e, t) {
    if (e.match(/^<\/\s*style\s*>/i, !1)) {
      t.token = s;
      t.localState = null;
      t.mode = "html";
      return s(e, t);
    }
    return o(e, /<\/\s*style\s*>/, i.token(e, t.localState));
  }
  var n = CodeMirror.getMode(e, {
    name: "xml",
    htmlMode: !0
  }), r = CodeMirror.getMode(e, "javascript"), i = CodeMirror.getMode(e, "css");
  return {
    startState: function() {
      var e = n.startState();
      return {
        token: s,
        localState: null,
        mode: "html",
        htmlState: e
      };
    },
    copyState: function(e) {
      if (e.localState) var t = CodeMirror.copyState(e.token == a ? i : r, e.localState);
      return {
        token: e.token,
        localState: t,
        mode: e.mode,
        htmlState: CodeMirror.copyState(n, e.htmlState)
      };
    },
    token: function(e, t) {
      return t.token(e, t);
    },
    indent: function(e, t) {
      return e.token == s || /^\s*<\//.test(t) ? n.indent(e.htmlState, t) : e.token == u ? r.indent(e.localState, t) : i.indent(e.localState, t);
    },
    compareStates: function(e, t) {
      return e.mode != t.mode ? !1 : e.localState ? CodeMirror.Pass : n.compareStates(e.htmlState, t.htmlState);
    },
    electricChars: "/{}:"
  };
}, "xml", "javascript", "css");

CodeMirror.defineMIME("text/html", "htmlmixed");