(function(e) {
  SlideDeckLens["block-title"] = function(t) {
    var n = "block-title", r = e(t).slidedeck(), i = {};
    i.slidedeck = r.deck;
    i.frame = i.slidedeck.closest(".lens-" + n);
    i.horizontalSlides = r.slides;
    ie <= 8 && i.horizontalSlides.each(function(t) {
      if (e(i.horizontalSlides[t]).css("background-image") != "none") {
        var n = e(i.horizontalSlides[t]).css("background-image").match(/url\([\"\'](.*)[\"\']\)/)[1];
        e(i.horizontalSlides[t]).css({
          background: "none"
        });
        i.horizontalSlides[t].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + n + "', sizingMethod='scale')";
      }
    });
    r.slides.each(function(e) {
      var t = r.slides.eq(e), n = t.find(".slide-title, .sd2-slide-title .sd2-slide-title-inner");
      t.find(".sd2-slide-title, .sd2-slide-title a").removeClass("accent-color");
      if (n.find("a").length) var n = n.find("a");
      var i = jQuery.trim(n.text()), s = i.split(" ");
      for (var o in s) s[o] = '<span class="accent-color-background">' + s[o] + "</span>";
      n.html(s.join(""));
      t.find(".sd2-node-caption .play-video-alternative").addClass("accent-color-background").removeClass("accent-color");
    });
    e(".slide-type-video .play-video-alternative").bind("click", function(t) {
      t.preventDefault();
      var n = e(this).parents("dd"), r = n.find(".video-wrapper .cover .play-video-button");
      r.click();
      n.addClass("sd2-hide-slide-content");
    });
    e(".slide-type-video .play-video-button").bind("click", function(t) {
      t.preventDefault();
      var n = e(this).parents("dd");
      n.addClass("sd2-hide-slide-content");
    });
  };
  e(document).ready(function() {
    e(".lens-block-title .slidedeck").each(function() {
      (typeof e.data(this, "lens-block-title") == "undefined" || e.data(this, "lens-block-title") == null) && e.data(this, "lens-block-title", new SlideDeckLens["block-title"](this));
    });
  });
})(jQuery);