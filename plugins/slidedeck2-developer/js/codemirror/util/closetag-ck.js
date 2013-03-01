/**
 * Tag-closer extension for CodeMirror.
 *
 * This extension adds a "closeTag" utility function that can be used with key bindings to 
 * insert a matching end tag after the ">" character of a start tag has been typed.  It can
 * also complete "</" if a matching start tag is found.  It will correctly ignore signal
 * characters for empty tags, comments, CDATA, etc.
 *
 * The function depends on internal parser state to identify tags.  It is compatible with the
 * following CodeMirror modes and will ignore all others:
 * - htmlmixed
 * - xml
 *
 * See demos/closetag.html for a usage example.
 * 
 * @author Nathan Williams <nathan@nlwillia.net>
 * Contributed under the same license terms as CodeMirror.
 */(function() {
  function e(e, n, r, i) {
    if (t(e, n, i)) {
      e.replaceSelection("\n\n</" + i + ">", "end");
      e.indentLine(r.line + 1);
      e.indentLine(r.line + 2);
      e.setCursor({
        line: r.line + 1,
        ch: e.getLine(r.line + 1).length
      });
    } else {
      e.replaceSelection("</" + i + ">");
      e.setCursor(r);
    }
  }
  function t(e, t, r) {
    if (typeof t == "undefined" || t == null || t == 1) t = e.getOption("closeTagIndent");
    t || (t = []);
    return n(t, r.toLowerCase()) != -1;
  }
  function n(e, t) {
    if (e.indexOf) return e.indexOf(t);
    for (var n = 0, r = e.length; n < r; ++n) if (e[n] == t) return n;
    return -1;
  }
  function r(e, t, n) {
    e.replaceSelection("/" + n + ">");
    e.setCursor({
      line: t.line,
      ch: t.ch + n.length + 2
    });
  }
  CodeMirror.defaults.closeTagEnabled = !0;
  CodeMirror.defaults.closeTagIndent = [ "applet", "blockquote", "body", "button", "div", "dl", "fieldset", "form", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "html", "iframe", "layer", "legend", "object", "ol", "p", "select", "table", "ul" ];
  CodeMirror.defineExtension("closeTag", function(t, n, i) {
    if (!t.getOption("closeTagEnabled")) throw CodeMirror.Pass;
    var s = t.getOption("mode");
    if (s == "text/html") {
      var o = t.getCursor(), u = t.getTokenAt(o), a = u.state;
      if (a.mode && a.mode != "html") throw CodeMirror.Pass;
      if (n == ">") {
        var f = a.htmlState ? a.htmlState.type : a.type;
        if (u.className == "tag" && f == "closeTag") throw CodeMirror.Pass;
        t.replaceSelection(">");
        o = {
          line: o.line,
          ch: o.ch + 1
        };
        t.setCursor(o);
        u = t.getTokenAt(t.getCursor());
        a = u.state;
        f = a.htmlState ? a.htmlState.type : a.type;
        if (u.className == "tag" && f != "selfcloseTag") {
          var l = a.htmlState ? a.htmlState.context.tagName : a.tagName;
          l.length > 0 && e(t, i, o, l);
          return;
        }
        t.setSelection({
          line: o.line,
          ch: o.ch - 1
        }, o);
        t.replaceSelection("");
      } else if (n == "/" && u.className == "tag" && u.string == "<") {
        var l = a.htmlState ? a.htmlState.context ? a.htmlState.context.tagName : "" : a.context.tagName;
        if (l.length > 0) {
          r(t, o, l);
          return;
        }
      }
    }
    throw CodeMirror.Pass;
  });
})();