/*!
 * SlideDeck Preview Updater
 * 
 * @author dtelepathy
 * @package SlideDeck
 * @since 2.0.0
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
*/var SlideDeckPreview, SlideDeckPrefix = "sd2-";

(function(e) {
  window.SlideDeckPreview = {
    elems: {},
    updates: {},
    ajaxOptions: [ "options[size]", "options[date-format]", "options[randomize]", "options[total_slides]", "options[verticalTitleLength]", "options[start]", "options[slideTransition]", "options[width]", "options[height]", "options[show-front-cover]", "options[show-back-cover]", "options[excerptLengthWithImages]", "options[excerptLengthWithoutImages]", "options[titleLengthWithImages]", "options[titleLengthWithoutImages]", "options[linkAuthorName]", "options[linkTitle]", "options[linkTarget]", "options[navigation]" ],
    importedFonts: [],
    outerWidth: 0,
    outerHeight: 0,
    timerDelay: 250,
    validations: {},
    invalidKeyCodes: [ 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145 ],
    ajaxUpdate: function() {
      var t = this, n = this.elems.form.serialize();
      n = n.replace(/action\=([a-zA-Z0-9\-_]+)/gi, "action=slidedeck_preview_iframe_update");
      this.elems.slideDimensions.addClass("getting-dimensions");
      this.elems.iframeBody.find("#mask").addClass("visible");
      e.ajax({
        url: ajaxurl + "?action=slidedeck_preview_iframe_update",
        type: "GET",
        dataType: "json",
        data: n,
        cache: !1,
        success: function(n) {
          var r = !1, i = e("#slidedeck-section-preview .inner");
          if (t.outerWidth != n.outer_width || t.outerHeight != n.outer_height) {
            t.outerWidth = n.outer_width;
            t.outerHeight = n.outer_height;
            r = !0;
          }
          if (r) {
            t.elems.slideDimensions.addClass("slidedeck-resizing");
            i.height() > 0 && i.height("");
            t.elems.iframe.animate({
              width: parseInt(n.outer_width, 10),
              height: parseInt(n.outer_height, 10)
            }, 500, function() {
              t.elems.iframe[0].src = n.url;
              t.elems.slideDimensions.css("margin-left", 0 - parseInt(n.outer_width, 10) / 2).removeClass("slidedeck-resizing");
            });
          } else t.elems.iframe[0].src = n.url;
        }
      });
    },
    eventOnLoad: function() {
      this.elems.iframeContents = this.elems.iframe.contents();
      this.elems.iframeBody = this.elems.iframeContents.find("body");
      this.elems.slidedeck = this.elems.iframeBody.find(".slidedeck");
      this.elems.slidedeckFrame = this.elems.slidedeck.closest(".slidedeck-frame");
      this.elems.noContent = this.elems.iframeBody.find(".no-content-found");
      this.slidedeck = this.elems.slidedeck.slidedeck();
      if (this.elems.noContent.length) {
        this.elems.iframeBody.find("#mask").removeClass("visible");
        this.elems.noContent.find(".no-content-source-configuration").bind("click", function(t) {
          t.preventDefault();
          e(".slidedeck-content-source").removeClass("hidden");
        });
      }
      this.elems.slidedeckFrame.find(".slidedeck-overlays .slidedeck-overlays-wrapper a").bind("click", function(e) {
        e.preventDefault();
        return !1;
      }).attr("title", "Overlay links disabled for preview");
      this.updateSlideDimensions();
    },
    getSlideDimensions: function() {
      var e = this.elems.slidedeck.find("dd.slide").eq(0);
      this.isVertical() && (e = e.find(".slidesVertical dd").eq(0));
      var t = {
        width: e.width(),
        height: e.height()
      };
      return t;
    },
    isVertical: function() {
      return typeof (this.slidedeck.deck == "undefined") ? this.elems.slidedeck.find(".slidesVertical").length > 0 ? !0 : !1 : this.slidedeck.verticalSlides && this.slidedeck.verticalSlides[this.slidedeck.current - 1] ? this.slidedeck.verticalSlides[this.slidedeck.current - 1].navChildren ? !0 : !1 : !1;
    },
    realtime: function(t, n) {
      var r = e.data(t, "$elem");
      if (!r) {
        r = e(t);
        e.data(t, "$elem", r);
      }
      var i = r.attr("name");
      typeof this.updates[i] == "function" && this.updates[i](r, n);
      this.updateSlideDimensions();
    },
    update: function(e, t) {
      var n = !0;
      if (e.type == "text") {
        var r = jQuery.data(e, "previousValue");
        if (r == t) return !1;
        jQuery.data(e, "previousValue", t);
      }
      for (var i = 0; i < this.ajaxOptions.length; i++) this.ajaxOptions[i] == e.name && (n = !1);
      for (var s in this.updates) s == e.name && (n = !0);
      if (this.validate(e, t)) {
        var o = this;
        n ? this.realtime(e, t) : o.ajaxUpdate();
      }
    },
    updateSlideDimensions: function() {
      var e = this.getSlideDimensions();
      this.elems.slideDimensions.find(".width").text(e.width + "x");
      this.elems.slideDimensions.find(".height").text(e.height);
      this.elems.slideDimensions.removeClass("getting-dimensions");
    },
    validate: function(e, t) {
      var n = !0;
      typeof this.validations[e.name] == "function" && (n = this.validations[e.name](e, t));
      return n;
    },
    initialize: function() {
      var t = this;
      this.elems.form = e("#slidedeck-update-form");
      if (this.elems.form.length < 1) return !1;
      this.elems.form.delegate("select", "change", function(e) {
        var n = this.getElementsByTagName("option"), r = "";
        for (var i in n) n[i].selected && (r = n[i].value);
        t.update(this, r);
      }).delegate('input[type="text"]', "blur change", function(e) {
        t.update(this, this.value);
      }).delegate('input[type="text"]', "keyup", function(e) {
        for (var n in t.invalidKeyCodes) if (t.invalidKeyCodes[n] == e.keyCode) return !1;
        var r = this;
        this.timer && clearTimeout(r.timer);
        this.timer = setTimeout(function() {
          t.update(r, r.value);
        }, t.timerDelay);
        return !0;
      }).delegate('input[type="text"]', "keydown", function(e) {
        if (13 == e.keyCode) {
          e.preventDefault();
          t.update(this, this.value);
          return !1;
        }
      }).delegate('input[type="radio"], input[type="checkbox"]', "click", function(e) {
        var n = this.value;
        this.type == "checkbox" && (n = this.checked);
        t.update(this, n);
      });
      this.elems.form.delegate(".slidedeck-ajax-update", "click", function(n) {
        n.preventDefault();
        e(".slidedeck-content-source").addClass("hidden");
        t.ajaxUpdate();
      });
      this.elems.form.find('input[type="text"]').each(function() {
        e.data(this, "previousValue", e(this).val());
      });
      this.elems.iframe = e("#slidedeck-preview");
      this.elems.iframe.bind("load", function() {
        t.eventOnLoad();
      });
      this.elems.slideDimensions = e("#slidedeck-slide-dimensions");
      this.outerWidth = this.elems.iframe.width();
      this.outerHeight = this.elems.iframe.height();
      this.size = this.elems.form.find('input[name="options[size]"]:checked').val();
      this.elems.slideDimensions.css("margin-left", 0 - this.outerWidth / 2).removeClass("slidedeck-resizing");
    }
  };
  SlideDeckPreview.updates["options[show-link-slide]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    t ? SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + "show-link-slide") : SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + "show-link-slide");
  };
  SlideDeckPreview.updates["options[titleFont]"] = SlideDeckPreview.updates["options[bodyFont]"] = function(e, t) {
    var n = SlideDeckFonts[t];
    if (n["import"]) {
      var r = !0;
      for (var i = 0; i < SlideDeckPreview.importedFonts.length; i++) SlideDeckPreview.importedFonts[i] == n["import"] && (r = !1);
      r && SlideDeckPreview.elems.iframeBody.append('<style type="text/css">@import url(' + n["import"] + ");</style>");
    }
    if (e[0].name == "options[titleFont]") {
      var s = SlideDeckPreview.elems.slidedeck.find(".slide-title, .sd2-slide-title").add(SlideDeckPreview.elems.slidedeckFrame.find(".sd2-custom-title-font"));
      s.css("font-family", n.stack);
      n.weight && s.css("font-weight", n.weight);
    } else e[0].name == "options[bodyFont]" && SlideDeckPreview.elems.slidedeck.css("font-family", n.stack);
  };
  SlideDeckPreview.updates["options[accentColor]"] = function(e, t) {
    var n = SlideDeckPreview.elems.iframeContents.find("#slidedeck-footer-styles"), r = n.text().replace(/\.accent-color(-background)?\{(background-)?color:([\#0-9a-fA-F]+);?\}/gi, ".accent-color$1{$2color:" + t + "}");
    n.text(r);
    var i = SlideDeckPreview.elems.slidedeckFrame.find(".icon-shape");
    if (i.length) for (var s = 0; s < i.length; s++) SlideDeckPreview.elems.iframe[0].contentWindow.jQuery.data(i[s], "slidedeck-accent-shape").attr("fill", t);
    if (ie < 9) {
      SlideDeckPreview.elems.slidedeckFrame.find(".accent-color").css("color", t);
      SlideDeckPreview.elems.slidedeckFrame.find(".accent-color-background").css("background-color", t);
    }
  };
  SlideDeckPreview.updates["options[lensVariations]"] = function(e, t) {
    var n = e.find("option");
    n.each(function(e) {
      t == this.value ? SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + this.value) : SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + this.value);
    });
  };
  SlideDeckPreview.updates["options[overlays]"] = function(e, t) {
    var n = e.find("option");
    n.each(function(e) {
      t == this.value ? SlideDeckPreview.elems.slidedeckFrame.addClass("show-overlay-" + this.value) : SlideDeckPreview.elems.slidedeckFrame.removeClass("show-overlay-" + this.value);
    });
  };
  SlideDeckPreview.updates["options[overlays_open]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    if (t) {
      SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + "overlays-open");
      SlideDeckPreview.elems.iframe[0].contentWindow.jQuery.data(SlideDeckPreview.elems.slidedeck[0], "SlideDeckOverlay").open();
    } else {
      SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + "overlays-open");
      SlideDeckPreview.elems.iframe[0].contentWindow.jQuery.data(SlideDeckPreview.elems.slidedeck[0], "SlideDeckOverlay").close();
    }
  };
  SlideDeckPreview.updates["options[hyphenate]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    t ? SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + "hyphenate") : SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + "hyphenate");
  };
  SlideDeckPreview.updates["options[continueScrolling]"] = function(e, t) {
    SlideDeckPreview.slidedeck.setOption("continueScrolling", t);
  };
  SlideDeckPreview.updates["options[cycle]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    SlideDeckPreview.slidedeck.setOption("cycle", t);
    SlideDeckFadingNav.prototype.checkHorizontal(SlideDeckPreview.slidedeck);
    SlideDeckFadingNav.prototype.checkVertical(SlideDeckPreview.slidedeck);
  };
  SlideDeckPreview.updates["options[keys]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    SlideDeckPreview.slidedeck.setOption("keys", t);
  };
  SlideDeckPreview.updates["options[scroll]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    SlideDeckPreview.slidedeck.setOption("scroll", t);
    SlideDeckPreview.slidedeck.deck.find(".slidesVertical").length && (SlideDeckPreview.slidedeck.vertical().options.scroll = t);
  };
  SlideDeckPreview.updates["options[touch]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    SlideDeckPreview.slidedeck.setOption("touch", t);
  };
  SlideDeckPreview.updates["options[touchThreshold]"] = function(e, t) {
    SlideDeckPreview.slidedeck.options.touchThreshold.x = t;
    SlideDeckPreview.slidedeck.options.touchThreshold.y = t;
  };
  SlideDeckPreview.updates["options[autoPlay]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    SlideDeckPreview.slidedeck.pauseAutoPlay = !t;
    SlideDeckPreview.slidedeck.setOption("autoPlay", t);
  };
  SlideDeckPreview.updates["options[autoPlayInterval]"] = function(e, t) {
    SlideDeckPreview.slidedeck.options.autoPlayInterval = parseInt(t, 10) * 1e3;
  };
  SlideDeckPreview.updates["options[speed]"] = function(e, t) {
    SlideDeckPreview.slidedeck.setOption("speed", t);
    SlideDeckPreview.slidedeck.deck.find(".slidesVertical").length && (SlideDeckPreview.slidedeck.vertical().options.speed = t);
  };
  SlideDeckPreview.updates["options[transition]"] = function(e, t) {
    SlideDeckPreview.slidedeck.setOption("transition", t);
  };
  SlideDeckPreview.updates["options[display-nav-arrows]"] = function(e, t) {
    e.find("option").each(function() {
      this.value != t ? SlideDeckPreview.elems.slidedeckFrame.removeClass("display-nav-" + this.value) : SlideDeckPreview.elems.slidedeckFrame.addClass("display-nav-" + this.value);
    });
  };
  SlideDeckPreview.validations["options[size]"] = function(e, t) {
    if (SlideDeckPreview.size == t) return !1;
    SlideDeckPreview.size = t;
    return !0;
  };
  SlideDeckPreview.updates["options[show-excerpt]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    t ? SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + "show-excerpt") : SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + "show-excerpt");
  };
  SlideDeckPreview.updates["options[hyphenate]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    t ? SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + "hyphenate") : SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + "hyphenate");
  };
  SlideDeckPreview.updates["options[show-title]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    t ? SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + "show-title") : SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + "show-title");
  };
  SlideDeckPreview.updates["options[show-readmore]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    t ? SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + "show-readmore") : SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + "show-readmore");
  };
  SlideDeckPreview.updates["options[show-author]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    t ? SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + "show-author") : SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + "show-author");
  };
  SlideDeckPreview.updates["options[show-author-avatar]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    t ? SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + "show-author-avatar") : SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + "show-author-avatar");
  };
  SlideDeckPreview.updates["options[image_scaling]"] = function(e, t) {
    e.find("option").each(function() {
      this.value == t ? SlideDeckPreview.elems.slidedeck.find("dd").addClass(SlideDeckPrefix + "image-scaling-" + this.value) : SlideDeckPreview.elems.slidedeck.find("dd").removeClass(SlideDeckPrefix + "image-scaling-" + this.value);
    });
  };
  e(document).ready(function() {
    SlideDeckPreview.initialize();
  });
})(jQuery);