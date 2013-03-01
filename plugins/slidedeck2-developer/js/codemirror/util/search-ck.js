// Define search commands. Depends on dialog.js or another
// implementation of the openDialog method.
// Replace works a little oddly -- it will do the replace on the next
// Ctrl-G (or whatever is bound to findNext) press. You prevent a
// replace by making sure the match is no longer selected when hitting
// Ctrl-G.
(function() {
  function e() {
    this.posFrom = this.posTo = this.query = null;
    this.marked = [];
  }
  function t(t) {
    return t._searchState || (t._searchState = new e);
  }
  function n(e, t, n, r) {
    e.openDialog ? e.openDialog(t, r) : r(prompt(n, ""));
  }
  function r(e, t, n, r) {
    e.openConfirm ? e.openConfirm(t, r) : confirm(n) && r[0]();
  }
  function i(e) {
    var t = e.match(/^\/(.*)\/$/);
    return t ? new RegExp(t[1]) : e;
  }
  function o(e, r) {
    var o = t(e);
    if (o.query) return u(e, r);
    n(e, s, "Search for:", function(t) {
      e.operation(function() {
        if (!t || o.query) return;
        o.query = i(t);
        if (e.lineCount() < 2e3) for (var n = e.getSearchCursor(t); n.findNext(); ) o.marked.push(e.markText(n.from(), n.to(), "CodeMirror-searching"));
        o.posFrom = o.posTo = e.getCursor();
        u(e, r);
      });
    });
  }
  function u(e, n) {
    e.operation(function() {
      var r = t(e), i = e.getSearchCursor(r.query, n ? r.posFrom : r.posTo);
      if (!i.find(n)) {
        i = e.getSearchCursor(r.query, n ? {
          line: e.lineCount() - 1
        } : {
          line: 0,
          ch: 0
        });
        if (!i.find(n)) return;
      }
      e.setSelection(i.from(), i.to());
      r.posFrom = i.from();
      r.posTo = i.to();
    });
  }
  function a(e) {
    e.operation(function() {
      var n = t(e);
      if (!n.query) return;
      n.query = null;
      for (var r = 0; r < n.marked.length; ++r) n.marked[r].clear();
      n.marked.length = 0;
    });
  }
  function h(e, t) {
    n(e, f, "Replace:", function(s) {
      if (!s) return;
      s = i(s);
      n(e, l, "Replace with:", function(n) {
        if (t) e.compoundChange(function() {
          e.operation(function() {
            for (var t = e.getSearchCursor(s); t.findNext(); ) if (typeof s != "string") {
              var r = e.getRange(t.from(), t.to()).match(s);
              t.replace(n.replace(/\$(\d)/, function(e, t) {
                return r[t];
              }));
            } else t.replace(n);
          });
        }); else {
          a(e);
          var i = e.getSearchCursor(s, e.getCursor());
          function o() {
            var t = i.from(), n;
            if (!(n = i.findNext())) {
              i = e.getSearchCursor(s);
              if (!(n = i.findNext()) || i.from().line == t.line && i.from().ch == t.ch) return;
            }
            e.setSelection(i.from(), i.to());
            r(e, c, "Replace?", [ function() {
              u(n);
            }, o ]);
          }
          function u(e) {
            i.replace(typeof s == "string" ? n : n.replace(/\$(\d)/, function(t, n) {
              return e[n];
            }));
            o();
          }
          o();
        }
      });
    });
  }
  var s = 'Search: <input type="text" style="width: 10em"/> <span style="color: #888">(Use /re/ syntax for regexp search)</span>', f = 'Replace: <input type="text" style="width: 10em"/> <span style="color: #888">(Use /re/ syntax for regexp search)</span>', l = 'With: <input type="text" style="width: 10em"/>', c = "Replace? <button>Yes</button> <button>No</button> <button>Stop</button>";
  CodeMirror.commands.find = function(e) {
    a(e);
    o(e);
  };
  CodeMirror.commands.findNext = o;
  CodeMirror.commands.findPrev = function(e) {
    o(e, !0);
  };
  CodeMirror.commands.clearSearch = a;
  CodeMirror.commands.replace = h;
  CodeMirror.commands.replaceAll = function(e) {
    h(e, !0);
  };
})();