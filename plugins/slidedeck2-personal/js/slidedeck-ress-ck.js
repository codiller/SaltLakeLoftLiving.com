/**
 * iFrame Resize code from: https://github.com/johnymonster/iframe_height
 */(function(e) {
  window.SlideDeckiFrameResize = function(t, n, r) {
    function T(e) {
      var t = e.split("__"), n = t[0], r = t[1];
      if (n == h.id) {
        w = t[2];
        document.getElementById(h.id).style.height = parseInt(r) + "px";
      }
    }
    function a(e) {
      var t, n, r = new RegExp(c + "$"), i = e.origin.match(r);
      if (i && i.length == 1) {
        strD = e.data + "";
        T(strD);
      }
    }
    function N(e, t) {
      for (o in h) try {
        var n = h[o] == e[o] || typeof e[o] == "undefined" ? h[o] : e[o];
        if (o == "id") {
          h.id = n;
          s.id = n;
        } else o !== "style" ? s[o] = n : s[o].cssText = n;
      } catch (r) {}
    }
    function C(e, t) {
      e = e || {};
      c = e.domain || "*";
      f = e.element || "iframe-embed";
      l = document.getElementById(f);
      i = !E || S || x ? "iframe" : '<iframe name="' + f + '" allowTransparency="true"></iframe>';
      s = document.createElement(i);
      N(e);
    }
    function k() {
      if (new Date - p < v) setTimeout(k, v); else {
        d = !1;
        b = parseInt(jQuery("#" + h.id + "-wrapper").width());
        var t = Math.abs(y - b);
        if (t > g) {
          var n = parseInt(jQuery("#" + h.id + "-wrapper").height());
          e("#" + h.id + "-wrapper iframe")[0].src = e("#" + h.id + "-wrapper iframe")[0].src.replace(/outer_width=[0-9]+/, "outer_width=" + b).replace(/outer_height=[0-9]+/, "outer_height=" + n).replace(/width=[0-9]+/, "width=" + b).replace(/height=[0-9]+/, "height=" + n).replace(/start=([0-9]+)?/, "start=" + w);
        }
        y = b;
      }
    }
    function L(t, n) {
      C(t);
      if (!l) return;
      try {
        l.appendChild(s);
        window.postMessage ? window.addEventListener ? window.addEventListener("message", a, !1) : window.attachEvent && window.attachEvent("onmessage", a) : setInterval(function() {
          var e = window.location.hash, t = e.match(/^#message(.*)$/);
          t && T(t[1]);
        }, m);
      } catch (i) {}
      r && jQuery(window).bind("resize", function(e) {
        jQuery("#" + h.id + "-wrapper").css("height", parseInt(jQuery("#" + h.id + "-wrapper").width() * n));
      });
      y = parseInt(jQuery("#" + h.id + "-wrapper").width());
      e(window).resize(function() {
        p = new Date;
        if (d === !1) {
          d = !0;
          setTimeout(k, v);
        }
      });
    }
    var i, s, o, u, a, f, l, c, h = {
      src: "",
      width: "100%",
      style: "padding: 0; margin: 0; border: none; display: block; height: 0; overflow: hidden;",
      scrolling: "no",
      frameBorder: 0,
      id: ""
    }, p = new Date(1, 1, 2e3, 12, 0, 0), d = !1, v = 120, m = 150, g = 5, y, b, w = !1, E = navigator.userAgent.toLowerCase().indexOf("msie") > -1, S = navigator.userAgent.toLowerCase().indexOf("msie 9") > -1, x = navigator.userAgent.toLowerCase().indexOf("msie 10") > -1;
    L(t, n);
  };
})(jQuery);