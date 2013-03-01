// Define match-highlighter commands. Depends on searchcursor.js
// Use by attaching the following function call to the onCursorActivity event:
//myCodeMirror.matchHighlight(minChars);
// And including a special span.CodeMirror-matchhighlight css class (also optionally a separate one for .CodeMirror-focused -- see demo matchhighlighter.html)
(function() {
  function t() {
    this.marked = [];
  }
  function n(e) {
    return e._matchHighlightState || (e._matchHighlightState = new t);
  }
  function r(e) {
    var t = n(e);
    for (var r = 0; r < t.marked.length; ++r) t.marked[r].clear();
    t.marked = [];
  }
  function i(t, i, s) {
    r(t);
    s = typeof s != "undefined" ? s : e;
    if (t.somethingSelected() && t.getSelection().replace(/^\s+|\s+$/g, "").length >= s) {
      var o = n(t), u = t.getSelection();
      t.operation(function() {
        if (t.lineCount() < 2e3) for (var e = t.getSearchCursor(u); e.findNext(); ) (e.from().line !== t.getCursor(!0).line || e.from().ch !== t.getCursor(!0).ch) && o.marked.push(t.markText(e.from(), e.to(), i));
      });
    }
  }
  var e = 2;
  CodeMirror.defineExtension("matchHighlight", function(e, t) {
    i(this, e, t);
  });
})();