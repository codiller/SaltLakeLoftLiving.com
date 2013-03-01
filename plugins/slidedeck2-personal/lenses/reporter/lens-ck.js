(function(e) {
  SlideDeckLens.reporter = function(t) {
    var n = this, t = e(t), r = t.closest(".slidedeck-frame"), s = r.find("img.slide-image"), o = t.slidedeck(), u = t, a = !1, f = !1, l = !1, c = r.find(".accent-color").css("color"), h = 0, d = 1;
    o.loaded(function(t) {
      u.find(".cover .play").click(function(t) {
        e(this).parents("dd").addClass("show-video-wrapper");
        e(this).parents("dd").addClass("hide-slide-content");
      });
      e(".slide-type-video .play-video, .slide-type-video .play-video-alternative").bind("click", function(t) {
        t.preventDefault();
        var n = e(this).parents("dd"), r = n.find(".video-wrapper .cover .play-video-button");
        r.trigger("click");
      });
      r.hasClass("content-source-custom") || r.find("dd.slide").eq(o.current - 1).hasClass("no-image") && r.find(".dot-nav").css("margin-left", -(r.find(".dot-nav").outerWidth() / 2)).addClass("no-image");
    });
    this.widthOrHeight = function() {
      s.one("load", function(t) {
        var n = e(t.target), r = n.width(), i = n.outerWidth(), s = n.height(), o = n.outerHeight(), u = n.parents("div.image").width(), a = n.parents("div.image").height(), f = r / s, l = u / a;
        o > a && n.css({
          width: "auto",
          height: a
        });
      }).each(function() {
        this.complete && e(this).load();
      });
    };
    this.dotNavigation = function() {
      if (r.hasClass("sd2-nav-dots")) {
        var n = 20;
        r.hasClass("sd2-small") && (n = 10);
        var s = t.find("dd.slide").length, u = '<ul class="dot-nav"></ul>';
        e(u).appendTo(r);
        var a = r.find(".dot-nav");
        for (i = 0; i < Math.min(s, n); i++) e("<li></li>").appendTo(a);
        var f = a.find("li");
        a.css("width", Math.min(s, n) * (f.outerWidth() + 10) - 10);
        a.css("margin-left", -(a.outerWidth() / 2));
        f.eq(o.current - 1).addClass("accent-color-background");
        f.bind("click", function() {
          var t = e(this);
          o.goTo(t.index() + 1);
          f.removeClass("accent-color-background");
          t.addClass("accent-color-background");
        });
      }
    };
    this.syncButtonNavigation = function() {
      if (f && !l) {
        var e = Math.ceil(o.current / h);
        f.goTo(e);
      }
    };
    this.positionPlayButtons = function() {
      r.find(".image .play-video-alternative").each(function() {
        var t = e(this);
        t.css({
          "margin-top": "-" + Math.round(parseInt(t.css("padding-top")) / 2) + "px",
          "margin-left": "-" + Math.round(t.width() / 2) + "px"
        });
        t.append('<span class="play-icon"></span>');
        var n = t.find(".play-icon"), r = n.width(), i = n.height(), s = Raphael(n[0], r, i), o = s.circle(Math.round(r / 2), Math.round(i / 2), Math.round(r * .48)), u = {
          normal: .8,
          hover: 1
        }, a = "M" + r * .35 + "," + i * .25;
        a += "L" + r * .75 + "," + i / 2;
        a += "L" + r * .35 + "," + i * .75;
        a += "z";
        var f = s.path(a);
        f.attr({
          stroke: "none",
          fill: "rgba(0,0,0,1)"
        });
        o.attr({
          stroke: "none",
          fill: "rgba(255,255,255," + u.normal + ")"
        });
        t.bind("mouseenter", function(e) {
          o.attr({
            fill: "rgba(255,255,255," + u.hover + ")"
          });
        });
        t.bind("mouseleave", function(e) {
          o.attr({
            fill: "rgba(255,255,255," + u.normal + ")"
          });
        });
      });
    };
    this.buttonNavigation = function() {
      if (r.hasClass("sd2-nav-titles") || r.hasClass("sd2-nav-dates")) {
        var s = t.find("dd.slide").length, u = t.find("dd.slide .nav-button"), c = '<div class="button-nav"></div>', v = e(c).appendTo(r), m = parseInt(v.outerWidth()), g = 3.5, y = 100 - g * 2;
        r.hasClass("sd2-nav-dates") ? h = Math.ceil(m / 140) : h = Math.ceil(m / 160);
        d = Math.ceil(s / h);
        r.hasClass("sd2-small") && (h = Math.ceil(m / 100));
        if (h >= s) {
          g = !1;
          y = 100;
        }
        var b = r.find(".button-nav");
        g && b.append('<a class="nav-arrow prev" href="#prev-page" style="width:' + g + '%;"></a>');
        var w = 0;
        b.append('<dl class="nav-slidedeck" style="width:' + y + '%;"></dl>');
        a = r.find("dl.nav-slidedeck");
        for (p = 1; p <= d; p++) {
          a.append('<dd class="page"></dd>');
          var E = r.find("dl.nav-slidedeck dd:eq(" + (p - 1) + ")");
          for (i = w; i < Math.min(s, h) * p; i++) {
            var S = u[w];
            e(S).find(".sd2-nav-title").append('<span class="icon-caret"></span>');
            S ? e(u[w]).appendTo(E) : e('<span class="spacer"></span>').appendTo(E);
            w++;
          }
        }
        f = r.find("dl.nav-slidedeck").slidedeck({
          keys: !1,
          scroll: !1,
          cycle: t.slidedeck().options.cycle
        });
        g && b.append('<a class="nav-arrow next" href="#next-page" style="width:' + g + '%;"></a>');
        if (r.hasClass("sd2-nav-dates")) {
          var x = "background";
          r.hasClass("sd2-transparent-background") && (x = "accent-color-background");
          u.eq(o.current - 1).find("span").addClass(x);
        } else u.eq(o.current - 1).addClass("active");
        u.bind("click", function() {
          var t = e(this);
          o.goTo(t.index(".nav-button") + 1);
          r.hasClass("sd2-nav-dates") ? u.find("span").removeClass("active") : u.removeClass("active");
          r.hasClass("sd2-nav-dates") ? t.find("span").addClass("active") : t.addClass("active");
        });
        u.css({
          width: 100 / Math.min(s, h) + "%"
        });
        a.find("span.spacer").css({
          width: 100 / Math.min(s, h) + "%"
        });
        r.find(".button-nav").bind("mouseenter mouseleave", function(e) {
          e.type == "mouseenter" ? l = !0 : l = !1;
        });
        r.find(".button-nav .nav-arrow").each(function() {
          var t = e(this);
          t.append('<span class="icon-shape-prev-next"></span>');
          var n = t.find(".icon-shape-prev-next"), i = n.width(), s = n.height(), o = 2, u = {
            normal: .75,
            hover: 1
          }, a = "#ffffff", f = Raphael(n[0], i, s), l = "M0,0";
          l += "L" + o + ",0";
          l += "L" + (i - o) + "," + s / 2;
          l += "L" + o + "," + s;
          l += "L0," + s;
          l += "L" + (i - o * 2) + "," + s / 2;
          l += "z";
          var c = f.path(l);
          this.hash == "#prev-page" && c.transform("s-1,1");
          r.hasClass("sd2-light") && (a = "#333333");
          c.attr({
            stroke: "none",
            fill: a
          });
          n.data("prev-next-arrows", c);
        });
        r.find(".button-nav .nav-arrow").bind("click", function(e) {
          e.preventDefault();
          switch (this.hash) {
           case "#prev-page":
            f.prev();
            break;
           case "#next-page":
            f.next();
          }
        });
        n.syncButtonNavigation();
      }
    };
    this.hijackClickOnVideoThumb = function() {
      r.find(".slide-type-video a.sd2-image-link").click(function(e) {
        e.preventDefault();
      });
    };
    var v = o.options.complete;
    o.setOption("complete", function() {
      typeof v == "function" && v(o);
    });
    var m = o.options.before;
    o.setOption("before", function(e) {
      typeof m == "function" && m(e);
      if (r.hasClass("sd2-nav-dots")) {
        var t = r.find(".dot-nav").find("li");
        t.removeClass("accent-color-background");
        t.eq(e.current - 1).addClass("accent-color-background");
      }
      var i = r.find(".button-nav").find(".nav-button");
      if (r.hasClass("sd2-nav-dates")) {
        var s = "background";
        r.hasClass("sd2-transparent-background") && (s = "accent-color-background");
        i.find("span").removeClass(s);
        i.eq(e.current - 1).find("span").addClass(s);
      }
      if (r.hasClass("sd2-nav-titles")) {
        i.removeClass("active");
        i.eq(e.current - 1).addClass("active");
      }
      n.syncButtonNavigation();
    });
    this.hijackClickOnVideoThumb();
    this.positionPlayButtons();
    this.dotNavigation();
    this.buttonNavigation();
    this.widthOrHeight();
    return !0;
  };
  e(document).ready(function() {
    e(".lens-reporter .slidedeck").each(function() {
      typeof e.data(this, "lens-reporter") == "undefined" && e.data(this, "lens-reporter", new SlideDeckLens.reporter(this));
    });
  });
})(jQuery);