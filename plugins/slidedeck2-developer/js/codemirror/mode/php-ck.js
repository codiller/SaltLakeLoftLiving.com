(function() {
  function e(e) {
    var t = {}, n = e.split(" ");
    for (var r = 0; r < n.length; ++r) t[n[r]] = !0;
    return t;
  }
  function t(e) {
    return function(t, n) {
      t.match(e) ? n.tokenize = null : t.skipToEnd();
      return "string";
    };
  }
  var n = {
    name: "clike",
    keywords: e("abstract and array as break case catch class clone const continue declare default do else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach function global goto if implements interface instanceof namespace new or private protected public static switch throw trait try use var while xor die echo empty exit eval include include_once isset list require require_once return print unset __halt_compiler self static parent"),
    blockKeywords: e("catch do else elseif for foreach if switch try while"),
    atoms: e("true false null TRUE FALSE NULL"),
    multiLineStrings: !0,
    hooks: {
      $: function(e, t) {
        e.eatWhile(/[\w\$_]/);
        return "variable-2";
      },
      "<": function(e, n) {
        if (e.match(/<</)) {
          e.eatWhile(/[\w\.]/);
          n.tokenize = t(e.current().slice(3));
          return n.tokenize(e, n);
        }
        return !1;
      },
      "#": function(e, t) {
        while (!e.eol() && !e.match("?>", !1)) e.next();
        return "comment";
      },
      "/": function(e, t) {
        if (e.eat("/")) {
          while (!e.eol() && !e.match("?>", !1)) e.next();
          return "comment";
        }
        return !1;
      }
    }
  };
  CodeMirror.defineMode("php", function(e, t) {
    function u(e, t) {
      var n = t.mode == "php";
      e.sol() && t.pending != '"' && (t.pending = null);
      if (t.curMode == r) {
        if (e.match(/^<\?\w*/)) {
          t.curMode = o;
          t.curState = t.php;
          t.curClose = "?>";
          t.mode = "php";
          return "meta";
        }
        if (t.pending == '"') {
          while (!e.eol() && e.next() != '"') ;
          var a = "string";
        } else if (t.pending && e.pos < t.pending.end) {
          e.pos = t.pending.end;
          var a = t.pending.style;
        } else var a = r.token(e, t.curState);
        t.pending = null;
        var f = e.current(), l = f.search(/<\?/);
        if (l != -1) {
          a == "string" && /\"$/.test(f) && !/\?>/.test(f) ? t.pending = '"' : t.pending = {
            end: e.pos,
            style: a
          };
          e.backUp(f.length - l);
        } else if (a == "tag" && e.current() == ">" && t.curState.context) if (/^script$/i.test(t.curState.context.tagName)) {
          t.curMode = i;
          t.curState = i.startState(r.indent(t.curState, ""));
          t.curClose = /^<\/\s*script\s*>/i;
          t.mode = "javascript";
        } else if (/^style$/i.test(t.curState.context.tagName)) {
          t.curMode = s;
          t.curState = s.startState(r.indent(t.curState, ""));
          t.curClose = /^<\/\s*style\s*>/i;
          t.mode = "css";
        }
        return a;
      }
      if ((!n || t.php.tokenize == null) && e.match(t.curClose, n)) {
        t.curMode = r;
        t.curState = t.html;
        t.curClose = null;
        t.mode = "html";
        return n ? "meta" : u(e, t);
      }
      return t.curMode.token(e, t.curState);
    }
    var r = CodeMirror.getMode(e, {
      name: "xml",
      htmlMode: !0
    }), i = CodeMirror.getMode(e, "javascript"), s = CodeMirror.getMode(e, "css"), o = CodeMirror.getMode(e, n);
    return {
      startState: function() {
        var e = r.startState();
        return {
          html: e,
          php: o.startState(),
          curMode: t.startOpen ? o : r,
          curState: t.startOpen ? o.startState() : e,
          curClose: t.startOpen ? /^\?>/ : null,
          mode: t.startOpen ? "php" : "html",
          pending: null
        };
      },
      copyState: function(e) {
        var t = e.html, n = CodeMirror.copyState(r, t), i = e.php, s = CodeMirror.copyState(o, i), u;
        e.curState == t ? u = n : e.curState == i ? u = s : u = CodeMirror.copyState(e.curMode, e.curState);
        return {
          html: n,
          php: s,
          curMode: e.curMode,
          curState: u,
          curClose: e.curClose,
          mode: e.mode,
          pending: e.pending
        };
      },
      token: u,
      indent: function(e, t) {
        return e.curMode != o && /^\s*<\//.test(t) || e.curMode == o && /^\?>/.test(t) ? r.indent(e.html, t) : e.curMode.indent(e.curState, t);
      },
      electricChars: "/{}:"
    };
  }, "xml", "clike", "javascript", "css");
  CodeMirror.defineMIME("application/x-httpd-php", "php");
  CodeMirror.defineMIME("application/x-httpd-php-open", {
    name: "php",
    startOpen: !0
  });
  CodeMirror.defineMIME("text/x-php", n);
})();