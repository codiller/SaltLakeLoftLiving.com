(function(e) {
  SlideDeckLens["half-moon"] = function(t) {
    var n = this, t = e(t), r = t.closest(".slidedeck-frame"), s = r.hasClass("sd2-nav-outside") ? !0 : !1, o = t.slidedeck(), u = t;
    o.loaded(function(t) {
      ie <= 8 && t.slides.each(function(n) {
        if (e(t.slides[n]).css("background-image") != "none") {
          var r = e(t.slides[n]).css("background-image").match(/url\([\"\'](.*)[\"\']\)/)[1];
          e(t.slides[n]).css({
            background: "none"
          });
          t.slides[n].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + r + "', sizingMethod='crop')";
        }
      });
      u.find(".cover .play").click(function(t) {
        e(this).parents("dd").addClass("hide-slide-content");
      });
      if (!r.hasClass("content-source-custom") && r.find("dd.slide").eq(o.current - 1).hasClass("no-image")) {
        r.find(".sd2-dot-nav").css("margin-left", -(r.find(".sd2-dot-nav").outerWidth() / 2)).addClass("no-image");
        jQuery.data(r.find(".sd2-dot-nav")[0], "centered", !0);
      }
    });
    this.dateAdjustments = function() {
      e(".date").each(function() {
        var t = e(this).children(".day");
        t.html().length == 2 && t.css("font-size", parseInt(t.css("font-size"), 10) - 5);
      });
      deckArrows = r.find("a.deck-navigation.horizontal");
      deckArrows.mouseenter(function() {
        var t = e(this);
        t.addClass("accent-color-background");
      });
      deckArrows.mouseleave(function() {
        var t = e(this);
        t.removeClass("accent-color-background");
      });
    };
    this.dotNavigation = function() {
      if (!r.hasClass("no-nav")) {
        var n = t.find("dd.slide").length, u = '<ul class="sd2-dot-nav"></ul>';
        e(u).appendTo(r);
        var a = r.find(".sd2-dot-nav");
        for (i = 0; i < n; i++) e("<li />").appendTo(a);
        var f = a.find("li");
        a.css("width", n * (f.outerWidth() + 10) - 10);
        !s && !r.hasClass("sd2-small") ? a.css("margin-left", r.find(".slide-content").outerWidth() / 2 - a.outerWidth() / 2) : a.css("margin-left", -(a.outerWidth() / 2));
        f.eq(o.current - 1).addClass("accent-color-background");
        f.bind("click", function() {
          var t = e(this);
          o.goTo(t.index() + 1);
          f.removeClass("accent-color-background");
          t.addClass("accent-color-background");
        });
      }
    };
    var a = o.options.complete;
    o.setOption("complete", function() {
      typeof a == "function" && a(o);
    });
    var f = o.options.before;
    o.setOption("before", function(e) {
      typeof f == "function" && f(e);
      var t = r.find(".sd2-dot-nav").find("li");
      t.removeClass("accent-color-background");
      t.eq(e.current - 1).addClass("accent-color-background");
      r.hasClass("sd2-small") || s || (r.find("dd.slide").eq(e.current - 1).hasClass("no-image") ? jQuery.data(r.find(".sd2-dot-nav")[0], "centered") || r.find(".sd2-dot-nav").fadeOut(Math.round(e.options.speed / 2), function() {
        r.find(".sd2-dot-nav").css({
          "margin-left": r.find(".sd2-dot-nav").outerWidth() / 2 * -1,
          left: "50%"
        });
        jQuery.data(r.find(".sd2-dot-nav")[0], "centered", !0);
        r.find(".sd2-dot-nav").fadeIn(Math.round(e.options.speed / 2));
      }) : jQuery.data(r.find(".sd2-dot-nav")[0], "centered") && r.find(".sd2-dot-nav").fadeOut(Math.round(e.options.speed / 2), function() {
        var t = Math.round(r.find(".sd2-dot-nav").outerWidth() / 2);
        r.find(".sd2-dot-nav").css({
          "margin-left": t * -1,
          left: "75%"
        });
        jQuery.data(r.find(".sd2-dot-nav")[0], "centered", !1);
        r.find(".sd2-dot-nav").fadeIn(Math.round(e.options.speed / 2));
      }));
    });
    this.deckSizes = function() {
      r.hasClass("sd2-small") && r.find("dd.slide-type-video .cover .play").each(function() {
        var t = e(this);
        t.clone(!1).appendTo(e(this).parents("dd").find(".slide-content")).bind("click", function(e) {
          e.preventDefault();
          t.click();
        });
      });
    };
    o.slides.find(".sd2-slide-title").removeClass("accent-color");
    o.slides.find(".play-video-alternative").addClass("accent-color");
    this.dotNavigation();
    this.dateAdjustments();
    this.deckSizes();
    return !0;
  };
  e(document).ready(function() {
    e(".lens-half-moon .slidedeck").each(function() {
      typeof e.data(this, "lens-half-moon") == "undefined" && e.data(this, "lens-half-moon", new SlideDeckLens["half-moon"](this));
    });
    e(".lens-half-moon.v2 dd .slide-content .read-more-link").length && e(".lens-half-moon.v2 dd .slide-content .read-more-link").each(function() {
      e(this).css("width", e(this).parent(".slide-content").outerHeight());
    });
    e(".no-image.no-excerpt .slide-title").each(function() {
      e(this).css("margin-top", -(e(this).outerHeight() / 2));
    });
  });
})(jQuery);