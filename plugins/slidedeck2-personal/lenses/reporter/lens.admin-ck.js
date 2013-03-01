(function(e) {
  var t = [ "options[show-title]", "options[show-excerpt]", "options[show-readmore]", "options[show-author]", "options[show-author-avatar]", "options[navigation-type]", "options[nav-date-format]", "options[transparent-background]", "options[image-border-width]", "options[transparent-image-border]" ];
  for (i = 0; i < t.length; i++) {
    SlideDeckPreview.updates[t[i]] = function(e, t) {
      SlideDeckPreview.ajaxUpdate();
    };
    SlideDeckPreview.ajaxOptions.push(t[i]);
  }
  SlideDeckPreview.updates["options[lensVariations]"] = function(t, n) {
    var r = e("#options-accentColor"), i = e(".miniColors-trigger"), s = {
      light: "#333333",
      dark: "#ffffff"
    }, o = {
      light: "rgb(255,255,255)",
      dark: "rgb(0,0,0)"
    };
    SlideDeckPreview.elems.slidedeckFrame.hasClass("sd2-transparent-image-border") || (o = {
      light: "rgb(236,236,236)",
      dark: "rgb(67,67,67)"
    });
    hexColor = Raphael.color(i.css("background-color")).hex;
    for (var u in s) {
      if (hexColor == s[u]) {
        r.val(s[n]).change();
        i.css({
          "background-color": s[n]
        });
      }
      var a = s[u];
      SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + u);
    }
    SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + n);
    var f = SlideDeckPreview.elems.slidedeckFrame.find("div.image .slide-image"), l = SlideDeckPreview.elems.slidedeckFrame.find("div.image .border");
    f.length && f.attr("style", f.attr("style").replace(/(border.*)(rgb\(.+\))(.*)/, "$1" + o[n] + "$3"));
    l.length && l.attr("style", l.attr("style").replace(/(box\-shadow.*)(rgb\(.+\))(.*)/, "$1" + o[n] + "$3"));
    var c = SlideDeckPreview.elems.slidedeckFrame.find(".button-nav .icon-shape-prev-next");
    if (c.length) for (var h = 0; h < c.length; h++) SlideDeckPreview.elems.iframe[0].contentWindow.jQuery.data(c[h], "prev-next-arrows").attr("fill", s[n]);
  };
})(jQuery);