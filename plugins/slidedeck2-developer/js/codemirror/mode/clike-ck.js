CodeMirror.defineMode("clike", function(e, t) {
  function l(e, t) {
    var n = e.next();
    if (o[n]) {
      var u = o[n](e, t);
      if (u !== !1) return u;
    }
    if (n == '"' || n == "'") {
      t.tokenize = c(n);
      return t.tokenize(e, t);
    }
    if (/[\[\]{}\(\),;\:\.]/.test(n)) {
      f = n;
      return null;
    }
    if (/\d/.test(n)) {
      e.eatWhile(/[\w\.]/);
      return "number";
    }
    if (n == "/") {
      if (e.eat("*")) {
        t.tokenize = h;
        return h(e, t);
      }
      if (e.eat("/")) {
        e.skipToEnd();
        return "comment";
      }
    }
    if (a.test(n)) {
      e.eatWhile(a);
      return "operator";
    }
    e.eatWhile(/[\w\$_]/);
    var l = e.current();
    if (r.propertyIsEnumerable(l)) {
      i.propertyIsEnumerable(l) && (f = "newstatement");
      return "keyword";
    }
    return s.propertyIsEnumerable(l) ? "atom" : "word";
  }
  function c(e) {
    return function(t, n) {
      var r = !1, i, s = !1;
      while ((i = t.next()) != null) {
        if (i == e && !r) {
          s = !0;
          break;
        }
        r = !r && i == "\\";
      }
      if (s || !r && !u) n.tokenize = null;
      return "string";
    };
  }
  function h(e, t) {
    var n = !1, r;
    while (r = e.next()) {
      if (r == "/" && n) {
        t.tokenize = null;
        break;
      }
      n = r == "*";
    }
    return "comment";
  }
  function p(e, t, n, r, i) {
    this.indented = e;
    this.column = t;
    this.type = n;
    this.align = r;
    this.prev = i;
  }
  function d(e, t, n) {
    return e.context = new p(e.indented, t, n, null, e.context);
  }
  function v(e) {
    var t = e.context.type;
    if (t == ")" || t == "]" || t == "}") e.indented = e.context.indented;
    return e.context = e.context.prev;
  }
  var n = e.indentUnit, r = t.keywords || {}, i = t.blockKeywords || {}, s = t.atoms || {}, o = t.hooks || {}, u = t.multiLineStrings, a = /[+\-*&%=<>!?|\/]/, f;
  return {
    startState: function(e) {
      return {
        tokenize: null,
        context: new p((e || 0) - n, 0, "top", !1),
        indented: 0,
        startOfLine: !0
      };
    },
    token: function(e, t) {
      var n = t.context;
      if (e.sol()) {
        n.align == null && (n.align = !1);
        t.indented = e.indentation();
        t.startOfLine = !0;
      }
      if (e.eatSpace()) return null;
      f = null;
      var r = (t.tokenize || l)(e, t);
      if (r == "comment" || r == "meta") return r;
      n.align == null && (n.align = !0);
      if (f != ";" && f != ":" || n.type != "statement") if (f == "{") d(t, e.column(), "}"); else if (f == "[") d(t, e.column(), "]"); else if (f == "(") d(t, e.column(), ")"); else if (f == "}") {
        while (n.type == "statement") n = v(t);
        n.type == "}" && (n = v(t));
        while (n.type == "statement") n = v(t);
      } else f == n.type ? v(t) : (n.type == "}" || n.type == "top" || n.type == "statement" && f == "newstatement") && d(t, e.column(), "statement"); else v(t);
      t.startOfLine = !1;
      return r;
    },
    indent: function(e, t) {
      if (e.tokenize != l && e.tokenize != null) return 0;
      var r = e.context, i = t && t.charAt(0);
      r.type == "statement" && i == "}" && (r = r.prev);
      var s = i == r.type;
      return r.type == "statement" ? r.indented + (i == "{" ? 0 : n) : r.align ? r.column + (s ? 0 : 1) : r.indented + (s ? 0 : n);
    },
    electricChars: "{}"
  };
});

(function() {
  function e(e) {
    var t = {}, n = e.split(" ");
    for (var r = 0; r < n.length; ++r) t[n[r]] = !0;
    return t;
  }
  function n(e, t) {
    if (!t.startOfLine) return !1;
    e.skipToEnd();
    return "meta";
  }
  function r(e, t) {
    var n;
    while ((n = e.next()) != null) if (n == '"' && !e.eat('"')) {
      t.tokenize = null;
      break;
    }
    return "string";
  }
  var t = "auto if break int case long char register continue return default short do sizeof double static else struct entry switch extern typedef float union for unsigned goto while enum void const signed volatile";
  CodeMirror.defineMIME("text/x-csrc", {
    name: "clike",
    keywords: e(t),
    blockKeywords: e("case do else for if switch while struct"),
    atoms: e("null"),
    hooks: {
      "#": n
    }
  });
  CodeMirror.defineMIME("text/x-c++src", {
    name: "clike",
    keywords: e(t + " asm dynamic_cast namespace reinterpret_cast try bool explicit new " + "static_cast typeid catch operator template typename class friend private " + "this using const_cast inline public throw virtual delete mutable protected " + "wchar_t"),
    blockKeywords: e("catch class do else finally for if struct switch try while"),
    atoms: e("true false null"),
    hooks: {
      "#": n
    }
  });
  CodeMirror.defineMIME("text/x-java", {
    name: "clike",
    keywords: e("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while"),
    blockKeywords: e("catch class do else finally for if switch try while"),
    atoms: e("true false null"),
    hooks: {
      "@": function(e, t) {
        e.eatWhile(/[\w\$_]/);
        return "meta";
      }
    }
  });
  CodeMirror.defineMIME("text/x-csharp", {
    name: "clike",
    keywords: e("abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long namespace new object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw try typeof uint ulong unchecked unsafe ushort using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
    blockKeywords: e("catch class do else finally for foreach if struct switch try while"),
    atoms: e("true false null"),
    hooks: {
      "@": function(e, t) {
        if (e.eat('"')) {
          t.tokenize = r;
          return r(e, t);
        }
        e.eatWhile(/[\w\$_]/);
        return "meta";
      }
    }
  });
})();