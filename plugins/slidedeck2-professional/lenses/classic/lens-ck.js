(function(e) {
  SlideDeckLens.classic = function(t) {
    var n = "classic", r = e(t).slidedeck(), i = {};
    i.slidedeck = r.deck;
    i.frame = i.slidedeck.closest(".lens-" + n);
    i.horizontalSlides = r.slides;
    i.horizontalSpines = r.spines;
    i.accentColor = i.frame.find(".accent-color").css("color");
    i.horizontalSpines.append('<span class="sd2-spine-inner">&nbsp;</span>');
    r.slides.each(function(e) {
      var t = r.slides.eq(e);
      t.find(".sd2-node-caption a.play-video-alternative").addClass("accent-color");
    });
    r.loaded(function(t) {
      var n = i.slidedeck.find("a.play-video-alternative");
      n.each(function() {
        var t = e(this);
        t.append('<span class="icon-shape-wrapper"><span class="icon-shape"></span></span>');
        var n = t.find(".icon-shape"), r = n.width(), s = n.height(), o = Raphael(n[0], r, s), u = o.path("M8.42,0C3.77,0,0,3.77,0,8.42s3.77,8.42,8.42,8.42s8.42-3.77,8.42-8.42S13.07,0,8.42,0z   M7,13.708V3.132l5.8,5.287L7,13.708z");
        u.attr({
          stroke: "none",
          fill: i.accentColor
        });
        n.data("slidedeck-accent-shape", u);
      });
    });
  };
  e(document).ready(function() {
    e(".lens-classic .slidedeck").each(function() {
      (typeof e.data(this, "lens-classic") == "undefined" || e.data(this, "lens-classic") == null) && e.data(this, "lens-classic", new SlideDeckLens.classic(this));
    });
  });
})(jQuery);