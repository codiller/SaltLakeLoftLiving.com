/**
 * SlideDeck 2 Developer for WordPress Admin JavaScript
 * 
 * More information on this project:
 * http://www.slidedeck.com/
 * 
 * Full Usage Documentation: http://www.slidedeck.com/usage-documentation 
 * 
 * @package SlideDeck
 * @subpackage SlideDeck 2 Pro for WordPress
 * 
 * @author dtelepathy
 *//*
Copyright 2012 digital-telepathy  (email : support@digital-telepathy.com)

This file is part of SlideDeck.

SlideDeck is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

SlideDeck is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with SlideDeck.  If not, see <http://www.gnu.org/licenses/>.
*/(function(e, t, n) {
  SlideDeckPlugin.LensEditor = {
    editor: null,
    line: null,
    textarea: null,
    initialize: function() {
      var t = this;
      e("#lens").bind("change", function() {
        e(this).closest("form").submit();
      });
      e("#lens-change-submit").hide();
      this.textarea = e("#slidedeck-lens-editor").find("textarea");
      if (this.textarea.length) {
        this.editor = CodeMirror.fromTextArea(this.textarea[0], {
          lineNumbers: !0,
          mode: "html",
          theme: "slidedeck",
          readOnly: !1,
          indentUnit: 4,
          tabSize: 4,
          lineWrapping: !0,
          onCursorActivity: function() {
            SlideDeckPlugin.LensEditor.editor.setLineClass(SlideDeckPlugin.LensEditor.line, null);
            SlideDeckPlugin.LensEditor.line = SlideDeckPlugin.LensEditor.editor.setLineClass(SlideDeckPlugin.LensEditor.editor.getCursor().line, "activeline");
          }
        });
        this.line = this.editor.setLineClass(0, "activeline");
      }
    }
  };
  SlideDeckPlugin.LensManagementDevelopers = {
    elems: {},
    validateForm: function(t) {
      var n = this;
      typeof t == "undefined" && (t = !1);
      n.elems.newLensSlugLabel.removeClass("invalid valid").addClass("loading");
      e.getJSON(ajaxurl + "?action=slidedeck_validate_copy_lens&slug=" + this.elems.newLensSlug.val(), function(e) {
        n.elems.newLensSlugLabel.removeClass("loading");
        if (e.valid === !0) {
          n.elems.newLensSlugLabel.removeClass("invalid").addClass("valid");
          t === !0 && n.elems.copyLensForm[0].submit();
        } else n.elems.newLensSlugLabel.removeClass("valid").addClass("invalid");
      });
    },
    initialize: function() {
      var t = this;
      this.elems.copyLensForm = e("#slidedeck-copy-lens");
      if (this.elems.copyLensForm.length) {
        this.elems.newLensSlug = e("#new-lens-slug");
        this.elems.newLensSlugLabel = this.elems.newLensSlug.closest("label");
        this.elems.newLensSlug.bind("keyup", function(e) {
          this.timer && clearTimeout(this.timer);
          this.timer = setTimeout(function() {
            t.validateForm();
          }, 100);
        });
        this.elems.copyLensForm.bind("submit", function(e) {
          e.preventDefault();
          t.validateForm(!0);
        });
      }
    }
  };
  e(document).ready(function() {
    SlideDeckPlugin.LensEditor.initialize();
    SlideDeckPlugin.LensManagementDevelopers.initialize();
  });
})(jQuery, window, null);