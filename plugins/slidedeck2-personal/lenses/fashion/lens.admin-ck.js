(function(e) {
  var t = [ "options[navigation-type]" ];
  for (i = 0; i < t.length; i++) SlideDeckPreview.ajaxOptions.push(t[i]);
  SlideDeckPreview.updates["options[show-title-rule]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    t ? SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + "show-title-rule") : SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + "show-title-rule");
  };
  SlideDeckPreview.updates["options[show-shadow]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    t ? SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + "show-shadow") : SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + "show-shadow");
  };
})(jQuery);