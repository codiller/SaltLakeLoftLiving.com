(function(e) {
  SlideDeckLens["tool-kit"] = function(t) {
    var n = this, r = "tool-kit", i = e(t).slidedeck(), s = i.vertical(), o = {};
    o.slidedeck = i.deck;
    o.frame = o.slidedeck.closest(".lens-" + r);
    o.slides = i.slides;
    o.deckWrapper = o.frame.find(".sd-wrapper");
    o.horizNav = o.frame.find(".deck-navigation.horizontal");
    o.horizNavPrev = o.frame.find(".deck-navigation.horizontal.prev");
    o.horizNavNext = o.frame.find(".deck-navigation.horizontal.next");
    o.vertNav = o.frame.find(".deck-navigation.vertical");
    o.vertNavPrev = o.frame.find(".deck-navigation.vertical.prev");
    o.vertNavNext = o.frame.find(".deck-navigation.vertical.next");
    o.slidedeck.find(".sd2-slide-text a").addClass("accent-color");
    i.loaded(function(t) {
      var n = !1;
      o.frame.find(".slidesVertical").length && (n = !0);
      if (n) {
        o.slides = t.vertical().slides;
        t.options.scroll ? s.options.scroll = !0 : s.options.scroll = !1;
      }
      var r = function() {
        o.frame.hasClass("sd2-frame") && jQuery('<div class="sd-lens-shadow-top"></div><div class="sd-lens-shadow-left"></div><div class="sd-lens-shadow-corner"></div>').appendTo(o.slidedeck);
      }, i = function() {
        var r = this;
        if (!o.frame.hasClass("sd2-nav-none")) {
          deckCount = o.slides.length;
          jQuery('<div class="sd-nav-wrapper"></div>').appendTo(o.deckWrapper);
          o.navWrapper = o.frame.find(".sd-nav-wrapper");
          jQuery('<dl class="sd-nav-deck"></dl>').appendTo(o.navWrapper);
          o.navDeck = o.navWrapper.find(".sd-nav-deck");
          if (n && o.frame.hasClass("sd2-nav-thumb")) {
            jQuery('<dd><dl class="slidesVertical"></dl></dd>').appendTo(o.navDeck);
            o.verticalSlides = o.navDeck.find(".slidesVertical");
          }
          if (o.frame.hasClass("sd2-nav-dots")) {
            var i = 1;
            while (i <= deckCount && i <= 10) {
              jQuery('<dd class="sd-nav-dot"></dd>').appendTo(o.navDeck);
              i++;
            }
            o.navDots = o.navDeck.find(".sd-nav-dot");
            o.navDots.click(function() {
              e(o.slidedeck).slidedeck().options.autoPlay = !1;
              t.options.pauseAutoPlay = !0;
              var r = jQuery(this), i = "active";
              o.frame.hasClass("sd2-nav-hanging") && (i = "accent-color-background");
              o.navDots.removeClass("accent-color-background active");
              r.addClass(i);
              n ? s.goTo(r.index() + 1) : t.goTo(r.index() + 1);
            });
            if (n) {
              dotSpacing = parseInt(o.navDots.outerHeight() + 10);
              o.navDots.first().css("margin-top", 0);
              var u = dotSpacing * o.navDots.length;
              o.navDeck.css({
                height: u
              });
              o.navWrapper.css({
                height: u,
                "margin-top": Math.round(u / 2) * -1
              });
            } else {
              dotSpacing = parseInt(o.navDots.outerWidth() + 10);
              o.navDeck.css("width", dotSpacing * o.navDots.length - parseInt(o.navDots.last().css("margin-left"), 10));
            }
            if (!o.frame.hasClass("sd2-nav-bar") && !o.frame.hasClass("sd2-nav-hanging") && !n) {
              var l = parseInt(o.frame.css("padding-left"), 10) + 20;
              if (o.frame.hasClass("sd2-nav-pos-top")) var c = l, h = "auto"; else var c = "auto", h = l;
              var p = -(o.navWrapper.width() / 2);
              o.frame.hasClass("sd2-nav-dots") && o.frame.hasClass("sd2-nav-pos-top") && !o.frame.hasClass("sd2-nav-default") && (p = 0);
              o.frame.hasClass("sd2-nav-dots") && o.frame.hasClass("sd2-nav-pos-top") && o.frame.hasClass("sd2-nav-hanging") && (c /= 2);
              o.navWrapper.css({
                "margin-left": p,
                top: c,
                bottom: h
              });
            }
            if (o.frame.hasClass("sd2-nav-default") && !o.frame.hasClass("sd2-title-pos-top") && !o.frame.hasClass("sd2-hide-title") && !o.frame.hasClass("sd2-title-pos-bottom") && o.frame.hasClass("sd2-nav-dots") && !o.frame.hasClass("sd2-small")) if (n) o.frame.hasClass("sd2-nav-default") && o.frame.hasClass("sd2-nav-dots") && !o.frame.hasClass("sd2-small") && o.navWrapper.css({
              "margin-top": p + v
            }); else {
              var d = o.frame.find(".sd-node-title-box").outerWidth();
              if (o.frame.hasClass("sd2-title-pos-right")) var v = -(d / 2); else if (o.frame.hasClass("sd2-title-pos-left")) var v = d / 2;
              o.navWrapper.css({
                "margin-left": p + v
              });
            }
            var m = "active";
            o.frame.hasClass("sd2-nav-hanging") && (m = "accent-color-background");
            e(".sd-nav-dot").eq(t.current - 1).addClass(m);
            n && a(t.options.startVertical - 1);
          }
          o.frame.hasClass("sd2-nav-hanging") && o.navWrapper.appendTo(o.frame);
          if (o.frame.hasClass("sd2-nav-thumb")) {
            var g = 73;
            o.frame.hasClass("sd2-nav-arrow-style-2") && o.frame.hasClass("sd2-nav-bar") && (g = 85);
            if (n) {
              o.frame.hasClass("sd2-small") && (g = 55);
              o.frame.hasClass("sd2-nav-arrow-style-2") && o.frame.hasClass("sd2-nav-bar") && o.frame.hasClass("sd2-small") && (g = 58);
              o.navWrapper.css({
                "padding-top": g,
                "padding-bottom": g
              });
              o.navWrapper.css("height", o.slidedeck.outerHeight() - g * 2);
              o.navDeck.css("height", o.slidedeck.outerHeight() - g * 2);
              o.navWrapper.css({
                "margin-top": Math.round(o.navWrapper.outerHeight() * -0.5),
                top: "50%"
              });
            } else {
              o.navWrapper.css({
                "padding-left": g,
                "padding-right": g
              });
              o.navWrapper.css("width", o.slidedeck.outerWidth() - g * 2);
              o.navDeck.css("width", o.slidedeck.outerWidth() - g * 2);
              o.navWrapper.css({
                "margin-left": Math.round(o.navWrapper.outerWidth() * -0.5),
                left: "50%"
              });
            }
            o.navDeck.addClass("thumb");
            var i = 1;
            while (i <= deckCount) {
              n ? jQuery('<span class="sd-thumb sd2-custom-title-font"><span class="number">' + i + '</span><span class="inner-image"></span></span>').appendTo(o.verticalSlides) : jQuery('<span class="sd-thumb sd2-custom-title-font"><span class="number">' + i + '</span><span class="inner-image"></span></span>').appendTo(o.navDeck);
              ie <= 8 ? o.frame.find("span.sd-thumb .inner-image").eq(i - 1)[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + o.slides.eq(i - 1).attr("data-thumbnail-src") + "', sizingMethod='scale')" : o.frame.find("span.sd-thumb .inner-image").eq(i - 1).css("background-image", "url(" + o.slides.eq(i - 1).attr("data-thumbnail-src") + ")");
              i++;
            }
            singleThumb = o.frame.find(".sd-thumb");
            if (n) {
              thumbHeight = singleThumb.height(), thumbSpacing = parseInt(singleThumb.last().css("margin-bottom")), fullThumb = thumbHeight + thumbSpacing, thumbsPerSlide = Math.floor((o.frame.find(".sd-nav-wrapper").height() + thumbSpacing) / fullThumb);
              var y = o.verticalSlides.children(".sd-thumb");
            } else {
              thumbWidth = parseInt(singleThumb.css("width"), 10), thumbSpacing = parseInt(singleThumb.last().css("margin-left"), 10), fullThumb = thumbWidth + thumbSpacing, thumbsPerSlide = Math.floor((o.frame.find(".sd-nav-wrapper").width() + thumbSpacing) / fullThumb);
              var y = o.navDeck.children(".sd-thumb");
            }
            y.remove();
            var i = 0;
            while (i < deckCount) {
              if (i == 0 || i % thumbsPerSlide == 0) n ? jQuery('<dd class="thumb-slide"></dd>').appendTo(o.verticalSlides) : jQuery('<dd class="thumb-slide"></dd>').appendTo(o.navDeck);
              jQuery(y[i]).appendTo(o.navDeck.find(".thumb-slide").last());
              i++;
            }
            if (n) {
              o.verticalSlides.children("dd").wrapInner('<div class="nav-centered"></div>');
              o.navDeck.find(".nav-centered").each(function() {
                var t = Math.round(parseInt(e(this).find(".sd-thumb").last().css("margin-bottom")) / 2);
                e(this).css({
                  "margin-top": e(this).outerHeight() * -0.5 + t,
                  "margin-left": e(this).outerWidth() * -0.5
                });
              });
            } else {
              o.navDeck.children("dd").wrapInner('<div class="nav-centered"></div>');
              o.navDeck.find(".nav-centered").each(function() {
                var t = e(this), n = t.find(".sd-thumb").length, r = fullThumb * n - parseInt(t.find(".sd-thumb").last().css("margin-left"));
                t.css("width", r);
              });
            }
            o.navDeck.show();
            var b = !1;
            t.options.cycle && (b = !0);
            var w = {
              hideSpines: !0,
              cycle: b,
              keys: !1,
              scroll: !1
            };
            o.navSlideDeck = o.navDeck.slidedeck(w);
            o.navSlideDeck.vertical(w);
            o.thumbs = o.navDeck.find(".sd-thumb");
            o.navDeck.delegate(".sd-thumb", "click", function(r) {
              r.preventDefault();
              var i = e.data(this, "$this"), u = e.data(this, "thumbIndex");
              this.style.backgroundColor = "";
              o.thumbs.removeClass("active accent-color-background");
              i.addClass("active accent-color-background");
              if (n) {
                e(o.slidedeck).slidedeck().options.autoPlay = !1;
                t.options.pauseAutoPlay = !0;
                s.goTo(u + 1);
              } else t.goTo(u + 1);
            }).delegate(".sd-thumb", "mouseenter", function(t) {
              var n = e.data(this, "$this"), r = e.data(this, "thumbIndex");
              if (!n) {
                n = e(this);
                e.data(this, "$this", n);
              }
              if (!r) {
                r = o.thumbs.index(n);
                e.data(this, "thumbIndex", r);
              }
              var i = n.css("background-color"), s = Raphael.getRGB(i), u = Raphael.rgb2hsl(s.r, s.g, s.b);
              u.l = Math.min(100, 120 * u.l) / 100;
              var a = Raphael.hsl(u.h, u.s, u.l);
              n.css("background-color", a);
            }).delegate(".sd-thumb", "mouseleave", function(e) {
              this.style.backgroundColor = "";
            });
            o.navSlides = o.navDeck.find("dd");
            n && (o.navSlides = o.navDeck.find(".slidesVertical dd"));
            if (o.navSlides.length > 1) {
              jQuery('<a class="deck-navigation-arrows prev" href="#prev" target="_blank"><span>Prev</span></a><a class="deck-navigation-arrows next" href="#next" target="_blank"><span>Next</span></a>').appendTo(o.navWrapper);
              o.navArrows = o.navWrapper.find(".deck-navigation-arrows");
              o.navArrows.click(function(t) {
                t.preventDefault();
                e.data(o.navDeck[0], "pauseAutoPaginate", !0);
                switch (this.href.split("#")[1]) {
                 case "next":
                  o.navSlideDeck.next();
                  break;
                 case "prev":
                  o.navSlideDeck.prev();
                }
              });
            }
            o.frame.find(".sd-nav-deck .sd-thumb").eq(t.current - 1).addClass("active accent-color-background");
            n ? f(t.options.startVertical - 1) : o.navSlideDeck.goTo(o.navDeck.find(".chrome-thumb.active").parents("dd").index() + 1);
          }
        }
      }, u = function() {
        var r = this;
        n && (t = s);
        var i = t.options.before;
        n && o.frame.hasClass("sd2-nav-thumb") && (o.navSlideDeck = o.navSlideDeck.vertical());
        t.options.before = function(t) {
          typeof i == "function" && i(t);
          if (o.frame.hasClass("sd2-nav-dots")) {
            var r = "active";
            o.frame.hasClass("sd2-nav-hanging") && (r = "accent-color-background");
            o.navDots.removeClass(r);
            o.navDots.eq(t.current - 1).addClass(r);
            n ? a(t.current) : a(t.current - 1);
          } else if (o.frame.hasClass("sd2-nav-thumb")) {
            f(t.current);
            e.data(o.navDeck[0], "pauseAutoPaginate") || o.navSlideDeck.goTo(o.navDeck.find(".sd-thumb.active").parents("dd").index() + 1);
            e.data(o.navDeck[0], "pauseAutoPaginate", !1);
          }
        };
        if (n) {
          var u = s.options.complete;
          s.options.complete = function(e) {
            typeof u == "function" && u(e);
            o.frame.hasClass("sd2-nav-dots") || o.frame.hasClass("sd2-nav-thumb");
          };
        }
      }, a = function(t) {
        if (o.navDots) {
          var n = "active";
          o.frame.hasClass("sd2-nav-hanging") && (n = "accent-color-background");
          o.navDots.removeClass("accent-color-background active");
          e(o.navDots[t]).addClass(n);
        }
      }, f = function(t) {
        if (o.thumbs) {
          n || t--;
          var r = "accent-color-background active";
          o.thumbs.removeClass(r);
          e(o.thumbs[t]).addClass(r);
        }
      }, l = function() {
        typeof e.event.special.mousewheel != "undefined" && o.frame.bind("mousewheel", function(e, t) {
          s.options && s.options.scroll && (t == 1 ? a(s.current) : t == -1 && a(s.current));
        });
      }, c = function() {
        typeof e.event.special.mousewheel != "undefined" && o.frame.bind("mousewheel", function(e, t) {
          s.options && s.options.scroll && (t == 1 ? f(s.current) : t == -1 && f(s.current));
        });
      }, h = function() {
        o.frame.hasClass("sd2-nav-hanging");
        o.frame.hasClass("sd2-frame") && o.frame.hasClass("sd2-nav-pos-top") && o.frame.hasClass("sd2-nav-bar") && o.frame.css("padding-bottom", parseInt(o.frame.css("padding-left"), 10));
        o.frame.hasClass("sd2-nav-pos-top") && o.frame.hasClass("sd2-frame") && o.frame.hasClass("sd2-nav-hanging") && o.navWrapper.appendTo(o.frame);
        if (o.frame.hasClass("sd2-nav-thumb") && o.frame.hasClass("sd2-nav-arrow-style-2")) if (n) {
          var e = o.navWrapper.outerWidth();
          o.navWrapper.find(".deck-navigation-arrows").css("height", e);
        } else {
          var t = o.navWrapper.outerHeight();
          o.navWrapper.find(".deck-navigation-arrows").css("width", t);
        }
        var r, i = 0;
        o.frame.hasClass("sd2-small") ? r = 3 : o.frame.hasClass("sd2-medium") ? r = 10 : o.frame.hasClass("sd2-large") && (r = 10);
        o.frame.hasClass("sd2-frame") && (i = 5);
        if (o.frame.hasClass("sd2-frame")) {
          o.horizNavPrev.css("left", parseInt(o.horizNavPrev.css("left")) + r);
          o.horizNavNext.css("right", parseInt(o.horizNavNext.css("right")) + r);
        }
        o.frame.hasClass("sd2-no-nav") || (o.frame.hasClass("sd2-nav-pos-top") ? o.frame.is(".sd2-nav-bar") && o.horizNav.css("marginTop", parseInt(o.horizNav.css("marginTop")) + Math.round(o.frame.find(".sd-nav-wrapper").outerHeight() / 2) - i) : (!o.frame.hasClass("sd2-frame") || o.frame.hasClass("sd2-nav-bar")) && o.frame.is(".sd2-nav-bar, .sd2-nav-hanging") && o.horizNav.css("marginTop", parseInt(o.horizNav.css("marginTop")) - Math.round(o.frame.find(".sd-nav-wrapper").outerHeight() / 2) + i));
      };
      i();
      r();
      u();
      h();
      l();
      c();
    });
  };
  e(document).ready(function() {
    e(".lens-tool-kit .slidedeck").each(function() {
      (typeof e.data(this, "lens-tool-kit") == "undefined" || e.data(this, "lens-tool-kit") == null) && e.data(this, "lens-tool-kit", new SlideDeckLens["tool-kit"](this));
    });
  });
})(jQuery);