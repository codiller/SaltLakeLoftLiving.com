CodeMirror.defineMode("css", function(e) {
  function r(e, t) {
    n = t;
    return e;
  }
  function i(e, t) {
    var n = e.next();
    if (n == "@") {
      e.eatWhile(/[\w\\\-]/);
      return r("meta", e.current());
    }
    if (n == "/" && e.eat("*")) {
      t.tokenize = s;
      return s(e, t);
    }
    if (n == "<" && e.eat("!")) {
      t.tokenize = o;
      return o(e, t);
    }
    if (n != "=") {
      if (n != "~" && n != "|" || !e.eat("=")) {
        if (n == '"' || n == "'") {
          t.tokenize = u(n);
          return t.tokenize(e, t);
        }
        if (n == "#") {
          e.eatWhile(/[\w\\\-]/);
          return r("atom", "hash");
        }
        if (n == "!") {
          e.match(/^\s*\w*/);
          return r("keyword", "important");
        }
        if (/\d/.test(n)) {
          e.eatWhile(/[\w.%]/);
          return r("number", "unit");
        }
        if (/[,.+>*\/]/.test(n)) return r(null, "select-op");
        if (/[;{}:\[\]]/.test(n)) return r(null, n);
        e.eatWhile(/[\w\\\-]/);
        return r("variable", "variable");
      }
      return r(null, "compare");
    }
    r(null, "compare");
  }
  function s(e, t) {
    var n = !1, s;
    while ((s = e.next()) != null) {
      if (n && s == "/") {
        t.tokenize = i;
        break;
      }
      n = s == "*";
    }
    return r("comment", "comment");
  }
  function o(e, t) {
    var n = 0, s;
    while ((s = e.next()) != null) {
      if (n >= 2 && s == ">") {
        t.tokenize = i;
        break;
      }
      n = s == "-" ? n + 1 : 0;
    }
    return r("comment", "comment");
  }
  function u(e) {
    return function(t, n) {
      var s = !1, o;
      while ((o = t.next()) != null) {
        if (o == e && !s) break;
        s = !s && o == "\\";
      }
      s || (n.tokenize = i);
      return r("string", "string");
    };
  }
  var t = e.indentUnit, n;
  return {
    startState: function(e) {
      return {
        tokenize: i,
        baseIndent: e || 0,
        stack: []
      };
    },
    token: function(e, t) {
      if (e.eatSpace()) return null;
      var r = t.tokenize(e, t), i = t.stack[t.stack.length - 1];
      if (n == "hash" && i != "rule") r = "string-2"; else if (r == "variable") if (i == "rule") r = "number"; else if (!i || i == "@media{") r = "tag";
      i == "rule" && /^[\{\};]$/.test(n) && t.stack.pop();
      n == "{" ? i == "@media" ? t.stack[t.stack.length - 1] = "@media{" : t.stack.push("{") : n == "}" ? t.stack.pop() : n == "@media" ? t.stack.push("@media") : i == "{" && n != "comment" && t.stack.push("rule");
      return r;
    },
    indent: function(e, n) {
      var r = e.stack.length;
      /^\}/.test(n) && (r -= e.stack[e.stack.length - 1] == "rule" ? 2 : 1);
      return e.baseIndent + r * t;
    },
    electricChars: "}"
  };
});

CodeMirror.defineMIME("text/css", "css");