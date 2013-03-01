(function(e) {
  var t = [ "options[show-title]", "options[show-excerpt]", "options[show-readmore]", "options[show-author]", "options[show-author-avatar]", "options[spineTitleLength]", "options[spineWidth]", "options[show-spine-titles]", "options[indexType]" ];
  for (i = 0; i < t.length; i++) {
    SlideDeckPreview.updates[t[i]] = function(e, t) {
      SlideDeckPreview.ajaxUpdate();
    };
    SlideDeckPreview.ajaxOptions.push(t[i]);
  }
  SlideDeckPreview.updates["options[inactiveSpineColor]"] = function(e, t) {
    var n = SlideDeckPreview.elems.iframeContents.find("#slidedeck-footer-styles"), r = n.text().replace(/\.sd2-spine-background-color\{background-color:([\#0-9a-fA-F]+);?\}/gi, ".sd2-spine-background-color{background-color:" + t + "}");
    n.text(r);
    ie < 9 && SlideDeckPreview.elems.slidedeckFrame.find(".sd2-spine-background-color").css("background-color", t);
  };
  SlideDeckPreview.updates["options[activeSpineColor]"] = function(e, t) {
    var n = SlideDeckPreview.elems.iframeContents.find("#slidedeck-footer-styles"), r = n.text().replace(/\.sd2-spine-background-color(\.active|:hover)\{background-color:([\#0-9a-fA-F]+);?\}/gi, ".sd2-spine-background-color$1{background-color:" + t + "}");
    n.text(r);
    if (ie < 9) {
      SlideDeckPreview.elems.slidedeckFrame.find(".sd2-spine-background-color:hover").css("background-color", t);
      SlideDeckPreview.elems.slidedeckFrame.find(".sd2-spine-background-color.active").css("background-color", t);
    }
  };
  SlideDeckPreview.updates["options[inactiveSpineTitleColor]"] = function(e, t) {
    var n = SlideDeckPreview.elems.iframeContents.find("#slidedeck-footer-styles"), r = n.text().replace(/\.sd2-spine-title-color\{color:([\#0-9a-fA-F]+);?\}/gi, ".sd2-spine-title-color{color:" + t + "}");
    n.text(r);
    ie < 9 && SlideDeckPreview.elems.slidedeckFrame.find(".sd2-spine-title-color").css("color", t);
  };
  SlideDeckPreview.updates["options[activeSpineTitleColor]"] = function(e, t) {
    var n = SlideDeckPreview.elems.iframeContents.find("#slidedeck-footer-styles"), r = n.text().replace(/\.sd2-spine-title-color(\.active|:hover)\{color:([\#0-9a-fA-F]+);?\}/gi, ".sd2-spine-title-color$1{color:" + t + "}");
    n.text(r);
    if (ie < 9) {
      SlideDeckPreview.elems.slidedeckFrame.find(".sd2-spine-title-color:hover").css("color", t);
      SlideDeckPreview.elems.slidedeckFrame.find(".sd2-spine-title-color.active").css("color", t);
    }
  };
})(jQuery);