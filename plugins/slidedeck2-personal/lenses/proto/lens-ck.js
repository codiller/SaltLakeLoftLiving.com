(function(e) {
  SlideDeckLens.proto = function(t) {
    var n = "proto", r = e(t).slidedeck(), i = {};
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
      var t = r.slides.eq(e);
      t.find(".sd2-node-caption a.play-video-alternative").addClass("accent-color");
    });
  };
  e(document).ready(function() {
    e(".lens-proto .slidedeck").each(function() {
      (typeof e.data(this, "lens-proto") == "undefined" || e.data(this, "lens-proto") == null) && e.data(this, "lens-proto", new SlideDeckLens.proto(this));
    });
  });
})(jQuery);