/*!
 * SlideDeck 1.4.3 Pro - 2012-12-10
 * 
 * More information on this project:
 * http://www.slidedeck.com/
 * 
 * Requires: jQuery v1.3+
 * 
 * Full Usage Documentation: http://www.slidedeck.com/usage-documentation 
 * Usage:
 *     $(el).slidedeck(opts);
 * 
 * @param {HTMLObject} el    The <DL> element to extend as a SlideDeck
 * @param {Object} opts      An object to pass custom override options to
 *//*!
Copyright 2012 digital-telepathy  (email : support@digital-telepathy.com)

This file is part of SlideDeck.

SlideDeck is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

SlideDeck is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with SlideDeck.  If not, see <http://www.gnu.org/licenses/>.
*/var SlideDeck, SlideDeckSkin = {}, SlideDeckLens = {};

(function(e) {
  window.SlideDeck = function(t, n) {
    var r = this, t = e(t), i = "", s = "pro";
    typeof window.slideDeck2Version != "undefined" && (i = "sd2-" + window.slideDeck2Version + "-");
    typeof window.slideDeck2Distribution != "undefined" && (s = window.slideDeck2Distribution);
    var o = i + "1.4.3";
    this.options = {
      speed: 500,
      transition: "swing",
      start: 1,
      activeCorner: !0,
      index: !0,
      scroll: !0,
      keys: !0,
      autoPlay: !1,
      autoPlayInterval: 5e3,
      hideSpines: !1,
      cycle: !1,
      slideTransition: "slide",
      touchThreshold: {
        x: 50,
        y: 30
      },
      touch: !0,
      controlProgress: !1
    };
    this.classes = {
      slide: "slide",
      spine: "spine",
      label: "label",
      index: "index",
      active: "active",
      indicator: "indicator",
      activeCorner: "activeCorner",
      disabled: "disabled",
      vertical: "slidesVertical",
      previous: "previous",
      next: "next"
    };
    this.current = 1;
    this.deck = t;
    this.former = -1;
    this.spines = t.children("dt");
    this.slides = t.children("dd");
    this.controlTo = 1;
    this.session = [];
    this.disabledSlides = [];
    this.pauseAutoPlay = !1;
    this.isLoaded = !1;
    var u = navigator.userAgent.toLowerCase();
    this.browser = {
      chrome: u.match(/chrome/) ? !0 : !1,
      chromeFrame: u.match(/msie/) && u.match(/chrome/) ? !0 : !1,
      chromeiOS: u.match(/crios/) ? !0 : !1,
      firefox: u.match(/firefox/) ? !0 : !1,
      firefox2: u.match(/firefox\/2\./) ? !0 : !1,
      firefox30: u.match(/firefox\/3\.0/) ? !0 : !1,
      msie: u.match(/msie/) ? !0 : !1,
      msie6: u.match(/msie 6/) && !u.match(/msie 7|8/) ? !0 : !1,
      msie7: u.match(/msie 7/) ? !0 : !1,
      msie8: u.match(/msie 8/) ? !0 : !1,
      msie9: u.match(/msie 9/) ? !0 : !1,
      msie10: u.match(/msie 10/) ? !0 : !1,
      opera: u.match(/opera/) ? !0 : !1,
      safari: u.match(/safari/) && !u.match(/chrome|crios/) ? !0 : !1
    };
    for (var a in this.browser) this.browser[a] === !0 && (this.browser._this = a);
    this.browser.chrome === !0 && !this.browser.chromeFrame && (this.browser.version = u.match(/chrome\/([0-9\.]+)/)[1]);
    this.browser.firefox === !0 && (this.browser.version = u.match(/firefox\/([0-9\.]+)/)[1]);
    this.browser.msie === !0 && (this.browser.version = u.match(/msie ([0-9\.]+)/)[1]);
    this.browser.opera === !0 && (this.browser.version = u.match(/version\/([0-9\.]+)/)[1]);
    this.browser.safari === !0 && !this.browser.chromeiOS && (this.browser.version = u.match(/version\/([0-9\.]+)/)[1]);
    this.browser.chromeiOS === !0 && (this.browser.version = u.match(/crios\/([0-9\.]+)/)[1]);
    var f, l, c, h, p, d;
    this.looping = !1;
    var v = "";
    switch (r.browser._this) {
     case "firefox":
     case "firefox3":
      v = "-moz-";
      break;
     case "chrome":
     case "safari":
      v = "-webkit-";
      break;
     case "opera":
      v = "-o-";
    }
    var m = function(e) {
      if (r.browser.msie && !r.browser.msie9 && !r.browser.msie10) {
        var t = e.css("background-color"), n = t;
        if (n == "transparent") t = "#ffffff"; else if (n.match("#") && n.length < 7) {
          var i = "#" + n.substr(1, 1) + n.substr(1, 1) + n.substr(2, 1) + n.substr(2, 1) + n.substr(3, 1) + n.substr(3, 1);
          t = i;
        }
        t = t.replace("#", "");
        var s = {
          r: t.substr(0, 2),
          g: t.substr(2, 2),
          b: t.substr(4, 2)
        }, o = "#", u = "01234567890ABCDEF";
        for (var a in s) {
          s[a] = Math.max(0, parseInt(s[a], 16) - 1);
          s[a] = u.charAt((s[a] - s[a] % 16) / 16) + u.charAt(s[a] % 16);
          o += s[a];
        }
        e.find("." + r.classes.index).css({
          filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1) chroma(color=" + o + ")",
          backgroundColor: o
        });
      }
    }, g = function() {
      typeof Cufon != "undefined" && Cufon.DOM.ready(function() {
        if (typeof r.options.cufonRefresh != "undefined") {
          var t = [];
          typeof r.options.cufonRefresh == "string" ? t.push(r.options.cufonRefresh) : t = r.options.cufonRefresh;
          for (var n = 0; n < t.length; n++) Cufon.refresh(t[n]);
        }
        if (r.options.hideSpines === !1) {
          var i = 0;
          r.browser.msie8 && !r.browser.chromeFrame && (i = Math.floor((e(r.spines[0]).outerWidth() - e(e(r.spines[0]).find("cufon")[0]).height()) / 2));
          (r.browser.safari || r.browser.chrome || r.browser.chromeFrame) && document.doctype.publicId.toLowerCase().match(/transitional/) && (i = Math.floor((e(r.spines[0]).outerHeight() - e(e(r.spines[0]).find("cufon")[0]).height()) / 2));
          r.spines.find(">cufon").css("margin-top", i);
        }
      });
    }, y = !1, b = function() {
      var e = document.getElementsByTagName("script");
      for (var t = 0; t < e.length; t++) {
        var n = e[t].src;
        if (n.match(/slidedeck\.jquery(\.dev)?\.js/)) {
          var r = n.split("?");
          r.length > 1 && r[1].match(/noping/) && (y = !0);
        }
      }
      if (y === !1) {
        y = !0;
        var i = new Image;
        i.src = (document.location.protocol == "https:" ? "https:" : "http:") + "//www.slidedeck.com/6885858486f31043e5839c735d99457f045affd0/" + o + "/" + s;
      }
    }, w = function() {
      if (r.options.controlProgress === !0) for (var t = 0; t < r.spines.length; t++) t < r.controlTo ? e(r.spines[t]).removeClass(r.classes.disabled) : e(r.spines[t]).addClass(r.classes.disabled);
    }, E = function(t) {
      var n = !1;
      typeof r.verticalSlides != "undefined" && typeof r.vertical().options != "undefined" && r.vertical().options.scroll === !0 && e(t.target).parents("." + r.classes.vertical).length > 0 && (n = !0);
      return n;
    }, S = {
      timestamp: function() {
        var e = new Date, t = e.getUTCFullYear() + "-" + e.getUTCMonth() + "-" + e.getUTCDate() + " " + e.getUTCHours() + ":" + e.getUTCMinutes() + ":" + e.getUTCSeconds(), n = 0 - e.getTimezoneOffset() / 60, r = Math.floor(n), i = "00";
        r != n && (i = (n - r) * 60);
        return t + r + ":" + i;
      },
      track: function(e) {
        (r.session.length === 0 || r.session[r.session.length - 1].slide != e) && r.session.push({
          slide: e,
          timestamp: this.timestamp()
        });
      }
    }, x = function() {
      var e = !1, t = !1, n = function() {
        e = !1;
        if (r.pauseAutoPlay === !1 && r.options.autoPlay === !0) {
          typeof r.vertical() != "undefined" && r.vertical().navChildren && r.vertical().current + 1 != r.vertical().slides.length && (e = !0);
          var i = !0;
          r.options.cycle === !1 && r.current == r.slides.length && (e === !0 ? r.vertical().current + 1 === r.vertical().slides.length && (i = !1) : i = !1);
          if (i === !1) r.pauseAutoPlay = !0; else if (e === !0) {
            if (r.vertical().current + 2 == r.vertical().slides.length) {
              e = !1;
              t = r.current;
            }
            r.vertical().next();
          } else if (r.slides.length == 1 && r.current == r.slides.length) {
            if (t !== !1) {
              r.resetVertical(t, !1);
              t = !1;
            }
          } else {
            r.former != -1 && typeof r.verticalSlides[r.former] != "undefined" && typeof r.verticalSlides[r.former].navChildren != "undefined" && r.resetVertical(r.former + 1);
            r.next(function(e) {
              if (t !== !1) {
                e.resetVertical(t);
                t = !1;
              }
            });
          }
        }
        setTimeout(n, r.options.autoPlayInterval);
      };
      setTimeout(n, r.options.autoPlayInterval);
    }, T = function(e, n) {
      var i = {
        display: "block"
      };
      i[v + "transform-origin"] = "50% 50%";
      i[v + "transform"] = "";
      if (n < r.current) {
        var s = n * h;
        r.options.hideSpines === !0 && (n == r.current - 1 ? s = 0 : s = 0 - (r.options.start - n - 1) * t.width());
      } else {
        var s = n * h + p;
        r.options.hideSpines === !0 && (s = (n + 1 - r.options.start) * t.width());
      }
      switch (e) {
       case "stack":
        i.zIndex = r.slides.length - n;
        i.left = 0;
        break;
       case "fade":
        var o = r.slides.eq(r.current - 1);
        i.zIndex = r.slides.length - n;
        i.left = 0;
        r.slides.not(o).css({
          opacity: 0
        });
        break;
       case "flip":
        i.zIndex = r.slides.length - n;
        i.left = 0;
        n != r.current - 1 && (i[v + "transform"] = "scaleY(0)");
        break;
       case "flipHorizontal":
        i.zIndex = r.slides.length - n;
        i.left = 0;
        n != r.current - 1 && (i[v + "transform"] = "scaleX(0)");
        break;
       case "slide":
       default:
        i.left = s;
        i.zIndex = 1;
      }
      r.slides.eq(n).css(v + "transition", "").css(i);
      return s;
    }, N = function() {
      e.inArray(t.css("position"), [ "position", "absolute", "fixed" ]) && t.css("position", "relative");
      t.css("overflow", "hidden");
      for (var n = 0; n < r.slides.length; n++) {
        var i = e(r.slides[n]);
        if (r.spines.length > n) var s = e(r.spines[n]);
        var o = {
          top: parseInt(i.css("padding-top"), 10),
          right: parseInt(i.css("padding-right"), 10),
          bottom: parseInt(i.css("padding-bottom"), 10),
          left: parseInt(i.css("padding-left"), 10)
        }, u = {
          top: parseInt(i.css("border-top-width"), 10),
          right: parseInt(i.css("border-right-width"), 10),
          bottom: parseInt(i.css("border-bottom-width"), 10),
          left: parseInt(i.css("border-left-width"), 10)
        };
        for (var a in u) u[a] = isNaN(u[a]) ? 0 : u[a];
        if (n < r.current && n == r.current - 1) {
          r.options.hideSpines !== !0 && s.addClass(r.classes.active);
          i.addClass(r.classes.active);
        }
        r.slide_width = p - o.left - o.right - u.left - u.right;
        var f = {
          position: "absolute",
          height: l - o.top - o.bottom - u.top - u.bottom + "px",
          width: r.slide_width + "px",
          margin: 0,
          paddingLeft: o.left + h + "px"
        }, v = T(r.options.slideTransition, n);
        i.css(f).addClass(r.classes.slide).addClass(r.classes.slide + "_" + (n + 1));
        if (r.options.hideSpines !== !0) {
          var y = {
            top: parseInt(s.css("padding-top"), 10),
            right: parseInt(s.css("padding-right"), 10),
            bottom: parseInt(s.css("padding-bottom"), 10),
            left: parseInt(s.css("padding-left"), 10)
          };
          for (var a in y) y[a] < 10 && (a == "left" || a == "right") && (y[a] = 10);
          var N = y.top + "px " + y.right + "px " + y.bottom + "px " + y.left + "px", C = {
            position: "absolute",
            zIndex: 3,
            display: "block",
            left: v,
            width: l - y.left - y.right + "px",
            height: c + "px",
            padding: N,
            rotation: "270deg",
            "-webkit-transform": "rotate(270deg)",
            "-webkit-transform-origin": d + "px 0px",
            "-moz-transform": "rotate(270deg)",
            "-moz-transform-origin": d + "px 0px",
            "-o-transform": "rotate(270deg)",
            "-o-transform-origin": d + "px 0px",
            textAlign: "right"
          };
          if (!r.browser.msie9 && !r.browser.msie10) {
            C.top = r.browser.msie ? 0 : l - d + "px";
            C.marginLeft = (r.browser.msie ? 0 : 0 - d) + "px";
            var k = document.getElementsByTagName("html")[0].dir;
            k.toLowerCase() == "rtl" && r.browser.msie8 === !0 && (C.marginLeft = 0 - l + d * 2 + "px");
            C.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";
          }
          s.css(C).addClass(r.classes.spine).addClass(r.classes.spine + "_" + (n + 1));
          if (r.browser.msie9 || r.browser.msie10) {
            s[0].style.msTransform = "rotate(270deg)";
            s[0].style.msTransformOrigin = Math.round(parseInt(t[0].style.height, 10) / 2) + "px " + Math.round(parseInt(t[0].style.height, 10) / 2) + "px";
          }
        } else typeof s != "undefined" && s.hide();
        if (n == r.slides.length - 1) {
          i.addClass("last");
          r.options.hideSpines !== !0 && s.addClass("last");
        }
        if (r.options.activeCorner === !0 && r.options.hideSpines === !1) {
          var L = document.createElement("DIV");
          L.className = r.classes.activeCorner + " " + (r.classes.spine + "_" + (n + 1));
          s.after(L);
          s.next("." + r.classes.activeCorner).css({
            position: "absolute",
            top: "25px",
            left: v + h + "px",
            overflow: "hidden",
            zIndex: "20000"
          }).hide();
          s.hasClass(r.classes.active) && s.next("." + r.classes.activeCorner).show();
        }
        if (r.options.hideSpines !== !0) {
          var A = document.createElement("DIV");
          A.className = r.classes.index;
          if (r.options.index !== !1) {
            var O;
            typeof r.options.index != "boolean" ? O = r.options.index[n % r.options.index.length] : O = "" + (n + 1);
            A.appendChild(document.createTextNode(O));
          }
          s.append(A);
          s.find("." + r.classes.index).css({
            position: "absolute",
            zIndex: 2,
            display: "block",
            width: c + "px",
            height: c + "px",
            textAlign: "center",
            bottom: (r.browser.msie ? 0 : 0 - d) + "px",
            left: (r.browser.msie ? 5 : 20) + "px",
            rotation: "90deg",
            "-webkit-transform": "rotate(90deg)",
            "-webkit-transform-origin": d + "px 0px",
            "-moz-transform": "rotate(90deg)",
            "-moz-transform-origin": d + "px 0px",
            "-o-transform": "rotate(90deg)",
            "-o-transform-origin": d + "px 0px"
          });
          if (r.browser.msie9 || r.browser.msie10) s.find("." + r.classes.index)[0].style.msTransform = "rotate(90deg)";
          m(s);
        }
      }
      b();
      r.options.hideSpines !== !0 && r.spines.bind("click", function(e) {
        e.preventDefault();
        r.goTo(r.spines.index(this) + 1);
      });
      e(document).bind("keydown", function(t) {
        if (r.options.keys !== !1 && e(t.target).parents().index(r.deck) == -1) if (t.keyCode == 39) {
          r.pauseAutoPlay = !0;
          r.next();
        } else if (t.keyCode == 37) {
          r.pauseAutoPlay = !0;
          r.prev();
        }
      });
      typeof e.event.special.mousewheel != "undefined" && t.bind("mousewheel", function(t, n) {
        if (r.options.scroll !== !1 && !E(t)) {
          var i = t.detail ? t.detail : t.wheelDelta;
          typeof i == "undefined" && (i = 0 - n);
          var s = !1;
          e(t.originalTarget).parents(r.deck).length && e.inArray(t.originalTarget.nodeName.toLowerCase(), [ "input", "select", "option", "textarea" ]) != -1 && (s = !0);
          if (s !== !0) if (i > 0) {
            switch (r.options.scroll) {
             case "stop":
              t.preventDefault();
              break;
             case !0:
             default:
              (r.current < r.slides.length || r.options.cycle === !0) && t.preventDefault();
            }
            r.pauseAutoPlay = !0;
            r.next();
          } else {
            switch (r.options.scroll) {
             case "stop":
              t.preventDefault();
              break;
             case !0:
             default:
              (r.current != 1 || r.options.cycle === !0) && t.preventDefault();
            }
            r.pauseAutoPlay = !0;
            r.prev();
          }
        }
      });
      if (r.browser.msie !== !0 && r.options.touch !== !1) {
        var M = {
          x: 0,
          y: 0
        }, _ = {
          x: 0,
          y: 0
        }, D = r.options.touchThreshold;
        t[0].addEventListener("touchstart", function(e) {
          M.x = e.targetTouches[0].pageX;
          M.y = e.targetTouches[0].pageY;
        }, !1);
        t[0].addEventListener("touchmove", function(e) {
          e.preventDefault();
          _.x = e.targetTouches[0].pageX;
          _.y = e.targetTouches[0].pageY;
        }, !1);
        t[0].addEventListener("touchend", function(e) {
          var t = M.x - D.x, n = M.x + D.x, i = M.y - D.y, s = M.y + D.y;
          if (_.x != 0) if (_.x <= t) {
            r.pauseAutoPlay = !0;
            r.next();
          } else if (_.x >= n) {
            r.pauseAutoPlay = !0;
            r.prev();
          }
          if (_.y != 0) if (_.y <= i) {
            r.pauseAutoPlay = !0;
            r.vertical().next();
          } else if (_.y >= s) {
            r.pauseAutoPlay = !0;
            r.vertical().prev();
          }
          M = {
            x: 0,
            y: 0
          };
          _ = {
            x: 0,
            y: 0
          };
        }, !1);
      }
      e(r.spines[r.current - 2]).addClass(r.classes.previous);
      e(r.spines[r.current]).addClass(r.classes.next);
      g();
      w();
      S.track(r.current);
      x();
      r.isLoaded = !0;
    }, C = function(t) {
      t = Math.max(1, t - 1);
      e.inArray(t, r.disabledSlides) != -1 && (t == 1 ? t = 1 : t = C(t));
      return t;
    }, k = function(t) {
      t = Math.min(r.slides.length, t + 1);
      e.inArray(t, r.disabledSlides) != -1 && (t == r.slides.length ? t = r.current : t = k(t));
      return t;
    }, L = function(t) {
      t = Math.min(r.slides.length, Math.max(1, t));
      e.inArray(t, r.disabledSlides) != -1 && (t < r.current ? t = C(t) : t = k(t));
      return t;
    }, A = function(e) {
      var t = [];
      typeof r.options.complete == "function" && t.push(function() {
        r.options.complete(r);
      });
      switch (typeof e) {
       case "function":
        t.push(function() {
          e(r);
        });
        break;
       case "object":
        t.push(function() {
          e.complete(r);
        });
      }
      S.track(r.current);
      var n = function() {
        r.looping = !1;
        for (var e = 0; e < t.length; e++) t[e](r);
      };
      return n;
    }, O = {
      fade: function(e, t, n) {
        var i = r.slides.eq(r.current - 1);
        r.slides.not(i).stop().animate({
          opacity: 0
        }, r.options.speed, function() {
          this.style.display = "none";
        });
        i.css({
          display: "block",
          opacity: 0
        }).addClass(r.classes.active).stop().animate({
          opacity: 1
        }, r.options.speed, function() {
          this.style.display = "block";
          A(t)();
        });
      },
      flip: function(e, t, n, i) {
        var s = r.options.speed / 1e3 / 2, o = r.slides.eq(r.former - 1), u = r.slides.eq(r.current - 1);
        typeof i == "undefined" && (i = !1);
        var a = i == 1 ? "X" : "Y", f = {
          position: "absolute",
          zIndex: 999,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0
        }, l = o.find(".slidedeck-slide-mask");
        l.length && l.remove();
        o.append('<div class="slidedeck-slide-mask mask-out"></div>');
        l = o.find(".slidedeck-slide-mask").css(f);
        var c = u.find(".slidedeck-slide-mask");
        c.length && l.remove();
        u.addClass(r.classes.active).append('<div class="slidedeck-slide-mask mask-in"></div>');
        f.opacity = 1;
        c = u.find(".slidedeck-slide-mask").css(f);
        var h = {};
        h[v + "transition"] = "";
        h[v + "transform-origin"] = "50% 50%";
        h[v + "transform"] = "scale" + a + "(0)";
        r.slides.not(o).css(h);
        var p = {};
        p[v + "transform-origin"] = "50% 50%";
        p[v + "transform"] = "scale" + a + "(0)";
        o.css(v + "transition", v + "transform " + s + "s ease-out").css(p);
        l.animate({
          opacity: 1
        }, {
          duration: r.options.speed / 2,
          complete: function() {
            l.remove();
          }
        });
        c.animate({
          opacity: 1
        }, {
          duration: r.options.speed / 2,
          complete: function() {
            p[v + "transform"] = "scale" + a + "(1)";
            u.addClass(r.classes.active).css(v + "transition", v + "transform " + s + "s ease-out").css(p);
            c.animate({
              opacity: 0
            }, {
              dureation: r.options.speed / 2,
              complete: function() {
                r.slides.css(v + "transition", "");
                var e = {};
                e[v + "transform-origin"] = "50% 50%";
                e[v + "transform"] = "scale" + a + "(1)";
                r.slides.eq(r.current - 1).css(e);
                A(t)();
                l.remove();
                c.remove();
              }
            });
          }
        });
      },
      flipHorizontal: function(e, t, n) {
        this.flip(e, t, n, !0);
      },
      stack: function(e, t, n) {
        if (r.current == r.slides.length && r.former == 1 || r.former == r.slides.length && r.current == 1) r.looping = !0;
        for (var i = 0; i < r.slides.length; i++) {
          var s = 0, o = r.slides.eq(i);
          if (r.looping === !1) if (i < r.current - 1) {
            if (i == r.current - 1) {
              o.addClass(r.classes.active);
              g();
            }
            s = 0 - f;
          } else s = 0; else if (r.former == r.slides.length && r.current == 1) if (i == r.current - 1) {
            o.css({
              left: 0,
              zIndex: 5
            }).addClass(r.classes.active);
            g();
            s = 0;
          } else if (i == r.former - 1) {
            o.css("z-index", 10);
            s = 0 - f;
          } else {
            o.css("z-index", 1);
            s = 0;
          } else if (r.former == 1 && r.current == r.slides.length && i != r.former - 1 && i == r.current - 1) {
            o.css({
              left: 0 - f,
              zIndex: 100
            });
            o.addClass(r.classes.active);
            g();
            s = 0;
          }
          var u = {
            duration: r.options.speed,
            easing: r.options.transition
          };
          (i == (n === true && r.current - 1) || i == (n === false && r.current)) && i == r.current - 1 && (u.complete = function() {
            r.looping === !0 && r.slides.each(function(e) {
              e != r.current - 1 && (this.style.left = (r.current == 1 ? 0 : 0 - f) + "px");
              this.style.zIndex = r.slides.length - e;
            });
            A(t)();
          });
          o.stop().animate({
            left: s,
            width: r.slide_width
          }, u);
        }
      },
      slide: function(n, i, s) {
        for (var o = 0; o < r.slides.length; o++) {
          var u = 0;
          if (r.options.hideSpines !== !0) var a = e(r.spines[o]);
          var f = e(r.slides[o]);
          if (o < r.current) {
            if (o == r.current - 1) {
              f.addClass(r.classes.active);
              if (r.options.hideSpines !== !0) {
                a.addClass(r.classes.active);
                a.next("." + r.classes.activeCorner).show();
              }
              g();
            }
            u = o * h;
          } else u = o * h + p;
          r.options.hideSpines === !0 && (u = (o - r.current + 1) * t.width());
          var l = {
            duration: r.options.speed,
            easing: r.options.transition
          };
          (o == (s === true && r.current - 1) || o == (s === false && r.current)) && o === 0 && (l.complete = A(i));
          f.stop().animate({
            left: u + "px",
            width: r.slide_width + "px"
          }, l);
          if (r.options.hideSpines !== !0) {
            m(a);
            if (a.css("left") != u + "px") {
              a.stop().animate({
                left: u + "px"
              }, {
                duration: r.options.speed,
                easing: r.options.transition
              });
              a.next("." + r.classes.activeCorner).stop().animate({
                left: u + h + "px"
              }, {
                duration: r.options.speed,
                easing: r.options.transition
              });
            }
          }
        }
      }
    }, M = function(e, n) {
      e = L(e);
      if ((e <= r.controlTo || r.options.controlProgress !== !0) && r.looping === !1) {
        var i = !0;
        e < r.current && (i = !1);
        var s = [ r.classes.active, r.classes.next, r.classes.previous ].join(" ");
        r.former = r.current;
        r.current = e;
        typeof r.options.before == "function" && r.options.before(r);
        typeof n != "undefined" && typeof n.before == "function" && n.before(r);
        if (r.current != r.former) {
          r.spines.removeClass(s);
          r.slides.removeClass(s);
          t.find("." + r.classes.activeCorner).hide();
          r.spines.eq(r.current - 2).addClass(r.classes.previous);
          r.spines.eq(r.current).addClass(r.classes.next);
          var o = "slide";
          typeof O[r.options.slideTransition] != "undefined" && (o = r.options.slideTransition);
          O[o](e, n, i);
        }
        b();
      }
    }, _ = function(t, n) {
      var i = t;
      if (typeof t == "string") {
        i = {};
        i[t] = n;
      }
      for (var s in i) {
        n = i[s];
        switch (s) {
         case "speed":
         case "start":
          n = parseFloat(n);
          isNaN(n) && (n = r.options[s]);
          break;
         case "autoPlay":
          typeof n != "boolean" && (n = r.options[s]);
          r.pauseAutoPlay = !1;
          break;
         case "scroll":
         case "keys":
         case "activeCorner":
         case "controlProgress":
         case "hideSpines":
         case "cycle":
          typeof n != "boolean" && (n = r.options[s]);
          break;
         case "cufonRefresh":
         case "transition":
          typeof n != "string" && (n = r.options[s]);
          break;
         case "complete":
         case "before":
          typeof n != "function" && (n = r.options[s]);
          break;
         case "index":
          typeof n != "boolean" && (e.isArray(n) || (n = r.options[s]));
          break;
         case "slideTransition":
          for (var o in O) if (n == o) {
            switch (r.browser._this) {
             case "msie":
             case "msie7":
             case "msie8":
             case "msie9":
             case "msie10":
              switch (n) {
               case "flip":
               case "flipHorizontal":
                n = "fade";
              }
            }
            r.options.slideTransition = n;
            for (var u = 0; u < r.slides.length; u++) T(r.options.slideTransition, u);
          }
        }
        r.options[s] = n;
      }
    }, D = function(t) {
      e.inArray(t, r.disabledSlides) == -1 && t !== 1 && t !== 0 && r.disabledSlides.push(t);
    }, P = function(t) {
      var n = e.inArray(t, r.disabledSlides);
      n != -1 && r.disabledSlides.splice(n, 1);
    }, H = function(t, n, r) {
      var i = this, t = e(t), s = t.children();
      if (t[0].nodeName == "DL") {
        s = t.children("dd");
        var o = t.children("dt").hide();
      }
      var u = s.length, a = t.parents("dd.slide"), f = t.parent(), l = a.innerHeight(), c = 100;
      n.deck.find("." + n.classes.activeCorner).length && (c = n.deck.find("." + n.classes.activeCorner).css("z-index") - 1);
      this.navParent = null;
      this.navChildren = null;
      this.current = 0;
      this.slides = s;
      this.options = {
        speed: 500,
        scroll: !0,
        continueScrolling: n.options.continueScrolling
      };
      if (typeof r == "object") for (var h in r) this.options[h] = r[h];
      this.classes = {
        navContainer: "verticalSlideNav",
        arrow: "arrow",
        prefix: "verticalSlide"
      };
      var p = function(r, s, o) {
        i.current = r;
        typeof i.options.before == "function" && i.options.before(i);
        typeof o == "object" && typeof o.before == "function" && o.before(i);
        var u = i.options.speed;
        typeof s != "undefined" && (u = 0);
        u = parseInt(u, 10);
        a.find("ul." + i.classes.navContainer + " li." + i.classes.arrow).stop().animate({
          top: e(i.navChildren[i.current]).position().top + "px"
        }, u);
        i.navChildren.removeClass("active");
        e(i.navChildren[i.current]).addClass("active");
        t.stop().animate({
          top: 0 - i.current * l + "px"
        }, {
          duration: u,
          easing: n.options.transition,
          complete: function() {
            typeof i.options.complete == "function" && i.options.complete(i);
            typeof o == "object" ? typeof o.complete == "function" && o.complete(i) : typeof o == "function" && o(n);
          }
        });
      }, d = function() {
        var e = document.createElement("UL");
        e.className = i.classes.navContainer;
        e.style.position = "absolute";
        e.style.zIndex = c;
        e.style.listStyleType = "none";
        for (var t = 0; t < u; t++) {
          var r = document.createElement("LI");
          r.className = "nav_" + (t + 1) + (t === 0 ? " active" : "");
          r.style.listStyleType = "none";
          var f = document.createElement("A");
          s[t].id ? f.href = "#" + s[t].id : f.href = "#" + (t + 1);
          f.className = "nav_" + (t + 1);
          var l = "Nav " + (t + 1);
          typeof o != "undefined" && (l = o.eq(t).html());
          f.innerHTML = l;
          r.appendChild(f);
          e.appendChild(r);
        }
        var h = document.createElement("LI");
        h.className = i.classes.arrow;
        h.style.top = 0;
        h.appendChild(document.createTextNode(" "));
        e.appendChild(h);
        a.append(e);
        i.navChildren = a.find("." + e.className + " li");
        a.find("." + e.className + " li a").click(function(e) {
          e.preventDefault();
          n.pauseAutoPlay = !0;
          p(this.className.match("nav_([0-9]+)")[1] - 1);
        });
      };
      this.goTo = function(t, r, i) {
        t = Math.min(u - 1, Math.max(0, t - 1));
        r = Math.min(n.slides.length - 1, Math.max(0, t));
        e(n.slides[r]).find("." + this.classes.navContainer + " a:eq(" + t + ")").addClass(n.classes.active).siblings().removeClass(n.classes.active);
        p(t, i);
      };
      this.next = function(e) {
        p(Math.min(u - 1, i.current + 1), undefined, e);
      };
      this.prev = function(e) {
        p(Math.max(0, i.current - 1), undefined, e);
      };
      this.snapTo = function(e, t) {
        p(Math.max(0, Math.min(u - 1, e)), !0, t);
      };
      var v = function() {
        if (!a.find("." + i.classes.navContainer).length) {
          var r = n.browser.msie !== !0 || n.browser.msie9 || n.browser.msie10 ? e(n.spines[0]).outerHeight() : e(n.spines[0]).outerWidth();
          n.options.hideSpines === !0 && (r = 0);
          t.css({
            position: "absolute",
            zIndex: c - 1,
            top: "0px",
            left: r,
            listStyleType: "none",
            padding: "0px",
            margin: "0px",
            width: f.innerWidth() - r,
            height: l * u
          });
          var o = {
            top: parseInt(s.css("padding-top"), 10),
            right: parseInt(s.css("padding-right"), 10),
            bottom: parseInt(s.css("padding-bottom"), 10),
            left: parseInt(s.css("padding-left"), 10)
          }, h = {
            top: parseInt(s.css("border-top-width"), 10),
            right: parseInt(s.css("border-right-width"), 10),
            bottom: parseInt(s.css("border-bottom-width"), 10),
            left: parseInt(s.css("border-left-width"), 10)
          };
          for (var p in h) isNaN(h[p]) && (h[p] = 0);
          var v = l - o.top - o.bottom - h.top - h.bottom, m = t.width() - o.right - o.left - h.right - h.left;
          s.each(function(t, n) {
            e(n).css({
              listStyleType: "none",
              position: "absolute",
              top: t * l,
              width: m,
              height: v
            }).addClass(i.classes.prefix + "_" + (t + 1));
          });
          f.css({
            overflow: "hidden"
          });
          d();
          typeof e.event.special.mousewheel != "undefined" && t.bind("mousewheel", function(t, r) {
            if (i.options.scroll !== !1) {
              var s = t.detail ? t.detail : t.wheelDelta;
              typeof s == "undefined" && (s = 0 - r);
              var o = !1;
              e(t.originalTarget).parents(i.deck).length && e.inArray(t.originalTarget.nodeName.toLowerCase(), [ "input", "select", "option", "textarea" ]) != -1 && (o = !0);
              if (o !== !0) {
                var u, a = !1;
                i.options.continueScrolling === !0 && (i.current + 1 == 1 ? u = !0 : i.current + 1 == i.slides.length && (a = !0));
                if (s > 0) {
                  t.preventDefault();
                  n.pauseAutoPlay = !0;
                  if (a) {
                    n.next();
                    return !1;
                  }
                  i.next();
                } else {
                  t.preventDefault();
                  n.pauseAutoPlay = !0;
                  if (u) {
                    n.prev();
                    return !1;
                  }
                  i.prev();
                }
              }
            }
          });
        }
      };
      if (l > 0) v(); else {
        var m;
        m = setInterval(function() {
          t = e(t);
          s = t.children();
          u = s.length;
          a = t.parents("dd.slide");
          f = t.parent();
          l = a.innerHeight();
          if (l > 0) {
            clearInterval(m);
            v();
          }
        }, 20);
      }
    }, B = function() {
      l = t.height();
      f = t.width();
      t.css("height", l + "px");
      c = 0;
      h = 0;
      if (r.options.hideSpines !== !0 && r.spines.length > 0) {
        c = e(r.spines[0]).height();
        h = e(r.spines[0]).outerHeight();
      }
      p = f - h * r.spines.length;
      r.options.hideSpines === !0 && (p = f);
      d = Math.ceil(c / 2);
    }, j = function(e) {
      if (r.browser.opera && r.browser.version < "10.5" || r.browser.msie6 || r.browser.firefox2 || r.browser.firefox30) {
        typeof console != "undefined" && typeof console.error == "function" && console.error("This web browser is not supported by SlideDeck. Please view this page in a modern, CSS3 capable browser or a current version of Inernet Explorer");
        return !1;
      }
      if (typeof e != "undefined") for (var n in e) r.options[n] = e[n];
      r.spines.length < 1 && (r.options.hideSpines = !0);
      switch (r.browser._this) {
       case "msie":
       case "msie7":
       case "msie8":
       case "msie9":
       case "msie10":
        switch (r.options.slideTransition) {
         case "flip":
         case "flipHorizontal":
          r.options.slideTransition = "fade";
        }
      }
      switch (r.options.slideTransition) {
       case "flip":
       case "flipHorizontal":
       case "fade":
       case "stack":
        r.options.hideSpines = !0;
      }
      r.options.hideSpines === !0 && (r.options.activeCorner = !1);
      r.current = Math.min(r.slides.length, Math.max(1, r.options.start));
      if (t.height() > 0) {
        B();
        N();
      } else {
        var i;
        i = setTimeout(function() {
          B();
          if (t.height() > 0) {
            clearInterval(i);
            B();
            N();
          }
        }, 20);
      }
    }, F = function(e) {
      var t;
      t = setInterval(function() {
        if (r.isLoaded === !0) {
          clearInterval(t);
          e(r);
        }
      }, 20);
    };
    this.loaded = function(e) {
      F(e);
      return r;
    };
    this.next = function(e) {
      var t = Math.min(r.slides.length, r.current + 1);
      r.options.cycle === !0 && r.current + 1 > r.slides.length && (t = 1);
      M(t, e);
      return r;
    };
    this.prev = function(e) {
      var t = Math.max(1, r.current - 1);
      r.options.cycle === !0 && r.current - 1 < 1 && (t = r.slides.length);
      M(t, e);
      return r;
    };
    this.goTo = function(t, n) {
      r.pauseAutoPlay = !0;
      if (typeof t == "string") {
        t == ":first" ? t = r.slides.filter(":first") : t == ":last" ? t = r.slides.filter(":last") : t.match(/^\#/) || (t = "#" + t);
        var i = r.slides.index(e(t));
        if (i == -1) return !1;
        t = i + 1;
      }
      M(Math.min(r.slides.length, Math.max(1, t)), n);
      return r;
    };
    this.progressTo = function(e, t) {
      r.pauseAutoPlay = !0;
      r.updateControlTo(e);
      r.goTo(e, t);
      return r;
    };
    this.updateControlTo = function(e) {
      r.controlTo = e;
      w();
      return r;
    };
    this.disableSlide = function(e) {
      D(e);
      return r;
    };
    this.enableSlide = function(e) {
      P(e);
      return r;
    };
    this.setOption = function(e, t) {
      _(e, t);
      return r;
    };
    this.vertical = function(t) {
      var n = this;
      if (typeof this.verticalSlides != "undefined") return this.verticalSlides[this.current - 1];
      this.verticalSlides = {};
      for (var r = 0; r < this.slides.length; r++) {
        var i = e(this.slides[r]).find("." + this.classes.vertical), s = {
          next: function() {
            return !1;
          },
          prev: function() {
            return !1;
          },
          goTo: function() {
            return !1;
          }
        };
        i.length && (s = new H(i, this, t));
        this.verticalSlides[r] = s;
      }
    };
    this.goToVertical = function(e, t) {
      if (typeof t != "undefined") {
        if (this.verticalSlides[t - 1] !== !1) if (this.current == t) this.vertical().goTo(e); else {
          this.verticalSlides[t - 1].goTo(e, t, !0);
          this.goTo(t);
        }
      } else this.vertical().goTo(e);
    };
    this.resetVertical = function(e, t) {
      typeof t == "undefined" && (t = !0);
      typeof e == "undefined" && (e = this.current);
      t == 1 ? this.verticalSlides[e - 1].snapTo(0) : this.verticalSlides[e - 1].goTo(0);
    };
    j(n);
  };
  e.fn.slidedeck = function(e) {
    var t = [];
    for (var n = 0; n < this.length; n++) {
      this[n].slidedeck || (this[n].slidedeck = new SlideDeck(this[n], e));
      t.push(this[n].slidedeck);
    }
    return t.length > 1 ? t : t[0];
  };
})(jQuery);