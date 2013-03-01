(function(e) {
  SlideDeckLens.video = function(t) {
    var t = e(t), n = t.closest(".slidedeck-frame"), r = t.slidedeck(), i = t;
    if (n.hasClass("sd2-medium")) {
      var s = r.slides.find("h3.slide-title");
      for (var o = 0; o < s.length; o++) {
        var u = e(s[o]);
        u.css({
          position: "absolute",
          top: "50%",
          left: 0,
          marginTop: Math.round(u.outerHeight() / 2) * -1,
          marginLeft: u.outerHeight()
        });
      }
    }
  };
  e(document).ready(function() {
    e(".lens-video .slidedeck").each(function() {
      typeof e.data(this, "lens-video") == "undefined" && e.data(this, "lens-video", new SlideDeckLens.video(this));
    });
  });
})(jQuery);