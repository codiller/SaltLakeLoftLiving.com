(function(e) {
  var t = [ "options[show-tools]" ];
  for (i = 0; i < t.length; i++) SlideDeckPreview.ajaxOptions.push(t[i]);
  var n = SlideDeckPreview.updates["options[bodyFont]"];
  SlideDeckPreview.updates["options[bodyFont]"] = function(e, t) {
    var r = SlideDeckFonts[t];
    typeof n == "function" && n(e, t);
    SlideDeckPreview.elems.slidedeckFrame.find(".sd-node-twitter-user-name").css("font-family", r.stack);
  };
  var r = SlideDeckPreview.updates["options[titleFont]"];
  SlideDeckPreview.updates["options[titleFont]"] = function(e, t) {
    typeof r == "function" && r(e, t);
    SlideDeckPreview.elems.iframe[0].contentWindow.jQuery.data(SlideDeckPreview.elems.slidedeck[0], "lens-twitter").fontSize();
  };
  var s = SlideDeckPreview.updates["options[hyphenate]"];
  SlideDeckPreview.updates["options[hyphenate]"] = function(e, t) {
    typeof s == "function" && s(e, t);
    SlideDeckPreview.elems.iframe[0].contentWindow.jQuery.data(SlideDeckPreview.elems.slidedeck[0], "lens-twitter").fontSize();
  };
})(jQuery);