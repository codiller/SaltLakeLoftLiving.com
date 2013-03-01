(function(e) {
  SlideDeckPreview.updates["options[show-title]"] = SlideDeckPreview.updates["options[show-excerpt]"] = function(t, n) {
    var r = e("#options-show-title"), i = e("#options-show-excerpt"), s = t.attr("id") == "options-show-excerpt" ? "excerpt" : "title";
    if (s == "excerpt" && r.is(":checked") || s == "title" && i.is(":checked")) {
      n = n == 1 ? !0 : !1;
      n ? SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + "show-" + s) : SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + "show-" + s);
    } else SlideDeckPreview.ajaxUpdate();
  };
})(jQuery);