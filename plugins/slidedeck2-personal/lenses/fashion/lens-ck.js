(function(e) {
  SlideDeckSkin.fashion = function(t) {
    function u(t, n) {
      if (!n) var n = !1;
      var r = '<dl class="sd-nav">', s, u, a;
      i.horizontalSlides.each(function(t) {
        var f = t + 1;
        f == 1 && (r += '<dd><table class="deck-navigation-table" border="0" cellpadding="0" cellspacing="0"><tr>');
        r += '<td><a href="#nav-' + f + '"><span class="deck-nav-front"><span class="deck-nav-inner">' + f + '</span></span><span class="deck-nav-back accent-color-background">&nbsp;</span>';
        e(this).hasClass("has-image") ? r += '<span class="deck-navigation-image-tip"><span>&nbsp;</span></span>' : e(this).hasClass("no-image") && (r += '<span class="deck-navigation-image-tip no-image"><span>&nbsp;</span></span>');
        r += "</a></td>";
        if (f % n === 0 && f != o.slideCount) {
          s = f;
          u = i.horizontalSlides.length - s;
          a = n - u;
          r += '</tr></table></dd><dd><table class="deck-navigation-table" border="0" cellpadding="0" cellspacing="0"><tr>';
        }
        if (f == o.slideCount) {
          if (a) for (var l = 0; l < a; l++) r += '<td><span class="spacer">&nbsp;</span></td>';
          r += "</tr></table></dd>";
        }
      });
      r += "</dl>";
      return r;
    }
    var n = "fashion", r = e(t).slidedeck(), i = {};
    i.slidedeck = r.deck;
    i.frame = i.slidedeck.closest(".lens-" + n);
    i.horizontalSlides = r.slides;
    i.frame.append('<div class="slidedeck-nav"><div class="accent-bar-top accent-color-background">&nbsp;</div><div class="deck-navigation-inner"></div></div>');
    i.horizontalSlides.each(function(t) {
      e(this).find(".slide-title span").last().css({
        "padding-right": "0.3em"
      });
    });
    var s, o = {
      navItemWidth: 30,
      navigationParent: e(i.frame).find(".slidedeck-nav"),
      navigationInner: e(i.frame).find(".deck-navigation-inner"),
      slideCount: i.horizontalSlides.length
    };
    o.navigationWidth = o.navigationInner.width();
    if (o.slideCount * o.navItemWidth < o.navigationWidth) {
      o.navigationParent.removeClass("paged");
      i.navItems = u(!1);
    } else {
      o.navigationParent.addClass("paged");
      o.navigationInner.append('<a href="#prev-nav" class="deck-pagination prev"><span class="front">Previous<span class="deck-pagination-inner">&nbsp;</span></span><span class="back accent-color-background">&nbsp;</span></a><a href="#next-nav" class="deck-pagination next"><span class="front">Next<span class="deck-pagination-inner">&nbsp;</span></span><span class="back accent-color-background">&nbsp;</span></a>');
      i.navPrev = o.navigationInner.find("a.deck-pagination.prev");
      i.navNext = o.navigationInner.find("a.deck-pagination.next");
      o.navigationWidth = o.navigationInner.width();
      o.navItemsPerSlide = Math.floor(o.navigationWidth / o.navItemWidth);
      i.navItems = u(!0, o.navItemsPerSlide);
    }
    o.navigationInner.append(i.navItems);
    i.navDeck = i.frame.find("dl.sd-nav");
    i.navDeck.wrap('<div class="sd-nav-wrapper"></div>');
    i.navDeckNavItems = i.navDeck.find("a");
    i.navigationImageTips = i.frame.find("span.deck-navigation-image-tip > span");
    i.horizontalSlides.each(function(e) {
      var t = i.horizontalSlides.eq(e);
      if (t.hasClass("has-image")) {
        var n = t.css("background-image");
        n == "none" && t.find(".sd2-slide-background").length && (n = t.find(".sd2-slide-background").css("background-image"));
        n.match(/url\([\"\'](.*)[\"\']\)/) && (n = n.match(/url\([\"\'](.*)[\"\']\)/)[1]);
        var r = t.attr("data-thumbnail-src");
        if (ie <= 8) {
          i.navigationImageTips.eq(e).css({
            background: "none"
          });
          i.navigationImageTips[e].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + r + "', sizingMethod='scale')";
          t.css({
            background: "none"
          });
          i.horizontalSlides[e].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imgurl + "', sizingMethod='scale')";
        } else i.navigationImageTips.eq(e).css({
          backgroundImage: "url(" + r + ")"
        });
      }
    });
    i.slidedeck.slidedeck().loaded(function() {
      i.slidedeck.activeSlide = i.slidedeck.find("dd.active");
      i.slidedeck.activeSlideIndex = i.horizontalSlides.index(i.slidedeck.activeSlide);
      i.currentNav = e(i.frame).find(".sd-nav a:eq(" + [ i.slidedeck.activeSlideIndex ] + ")");
      i.currentNav.addClass("active");
      o.currentNavSlideNumber = Math.floor(i.slidedeck.activeSlideIndex / o.navItemsPerSlide);
      s = i.navDeck.slidedeck({
        scroll: !1,
        keys: !1,
        hideSpines: !0,
        speed: 250,
        cycle: !0,
        start: o.currentNavSlideNumber + 1,
        complete: function(t) {
          if (i.slidedeck.slidedeck().options.cycle == 0) if (t.current == t.slides.length) {
            e(i.navNext).addClass("disabled");
            e(i.navPrev).removeClass("disabled");
          } else if (t.current == 1) {
            e(i.navPrev).addClass("disabled");
            e(i.navNext).removeClass("disabled");
          } else {
            e(i.navPrev).removeClass("disabled");
            e(i.navNext).removeClass("disabled");
          }
        }
      }).loaded(function() {
        var t = i.frame.find(".slidedeck-nav"), n = i.frame.find(".slidedeck-nav .deck-navigation-table");
        t.addClass("behind");
        n.bind("mouseenter mouseleave", function(e) {
          e.type == "mouseenter" ? t.removeClass("behind") : t.addClass("behind");
        });
        var u = o.currentNavSlideNumber + 1;
        if (r.options.cycle == 0) {
          s.options.cycle = !1;
          u == s.slides.length ? e(i.navNext).addClass("disabled") : u == 1 && e(i.navPrev).addClass("disabled");
        }
        i.navDeckNavItems.each(function() {
          e(this).click(function(t) {
            t.preventDefault();
            var n = i.navDeckNavItems.index(e(this));
            i.navDeckNavItems.removeClass("active");
            e(this).addClass("active");
            r.goTo(n + 1);
          });
        });
      });
      i.frame.find("a.deck-pagination").click(function(t) {
        t.preventDefault();
        s.options.pauseAutoPlay = !0;
        e(this).hasClass("prev") ? s.prev() : s.next();
      });
      i.frame.find(".deck-navigation").bind("click", function(e) {
        e.preventDefault();
        var t = this.href.split("#")[1];
        r.pauseAutoPlay = !0;
        t == "next" ? r.next() : t == "prev" && r.prev();
      });
      var t = i.slidedeck.slidedeck().options.before, n = i.slidedeck.slidedeck().options.complete, u = i.slidedeck.slidedeck();
      i.slidedeck.slidedeck().options.before = function(n) {
        typeof t == "function" && t(n);
        var r = i.slidedeck.activeSlideIndex, a = u.current, f = a - 1, l = Math.floor(f / o.navItemsPerSlide);
        i.navDeckNavItems.removeClass("active");
        e(i.navDeckNavItems[f]).addClass("active");
        if (l != o.currentNavSlideNumber) {
          s.goTo(l + 1);
          o.currentNavSlideNumber = l;
        }
      };
      i.slidedeck.slidedeck().options.complete = function(e) {
        typeof n == "function" && n(e);
      };
    });
    r.slides.each(function(e) {
      var t = r.slides.eq(e), n = t.find(".sd2-slide-title .sd2-slide-title-inner");
      t.find(".sd2-slide-title, .sd2-slide-title a").removeClass("accent-color");
      if (n.find("a").length) var n = n.find("a");
      var i = jQuery.trim(n.text()), s = i.split(" "), o = !0;
      for (var u in s) {
        o == 1 ? s[u] = '<span class="first">' + s[u] + "</span>" : s[u] = "<span>" + s[u] + "</span>";
        o = !1;
      }
      n.html('<span class="before-rule">&nbsp;</span>' + s.join("") + '<span class="after-rule">&nbsp;</span>');
      t.find("div.sd2-node-caption").append('<div class="accent-bar-top accent-color-background">&nbsp;</div>');
    });
    i.slidedeck.find(".play-video-alternative").addClass("accent-color-background");
  };
  e(document).ready(function() {
    e(".lens-fashion .slidedeck").each(function() {
      (typeof e.data(this, "lens-fashion") == "undefined" || e.data(this, "lens-fashion") == null) && e.data(this, "lens-fashion", new SlideDeckSkin.fashion(this));
    });
  });
})(jQuery);