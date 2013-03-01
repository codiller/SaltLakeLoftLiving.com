/*!
 * SlideDeck 2 Pro for WordPress Admin JavaScript
 * 
 * More information on this project:
 * http://www.slidedeck.com/
 * 
 * Full Usage Documentation: http://www.slidedeck.com/usage-documentation 
 * 
 * @package SlideDeck
 * @subpackage SlideDeck 2 Pro for WordPress
 * 
 * @author dtelepathy
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
*/function updateSlideDeckPreview(e) {
  var t = document.getElementById("btn_slidedeck_preview_submit"), n = t.href.split("?")[1].split("&"), r = {};
  for (var i in n) {
    var s = n[i].split("=");
    r[s[0]] = s[1];
  }
  r[e.id] = e.value;
  switch (e.id) {
   case "preview_w":
    r.width = Math.max(630, r[e.id].match(/([0-9]+)/g)[0], 10) + 20;
    break;
   case "preview_h":
    r.height = parseInt(r[e.id].match(/([0-9]+)/g)[0], 10) + 200;
  }
  var o = t.href.split("?")[0], u = "?";
  for (var a in r) {
    o += u + a + "=" + r[a];
    u = "&";
  }
  t.href = o;
}

function closePreviewWatcher() {
  var e;
  e = setInterval(function() {
    if (document.getElementById("TB_closeWindowButton")) {
      clearInterval(e);
      jQuery("#TB_closeWindowButton, #TB_overlay").bind("mouseup", function(e) {
        cleanUpSlideDecks();
      });
    }
  }, 20);
}

function cleanUpSlideDecks() {
  jQuery("body > a").filter(function() {
    return this.id.indexOf("SlideDeck_Bug") != -1;
  }).remove();
}

var SlideDeckLensAdmin = {}, SlideDeckPlugin = {
  namespace: "slidedeck"
}, tooltipperOffset = {
  Y: -4,
  X: -11
}, updateTBSize = function() {
  var e = jQuery("#TB_window"), t = jQuery("#TB_title"), n = jQuery(window).width(), r = jQuery(window).height(), i = 720 < n ? 720 : n, s = 0, o = t.height();
  jQuery("body.admin-bar").length && (s = jQuery("#wpadminbar").height());
  if (e.size()) {
    if (e.find("#slidedeck_preview_window").length) {
      var u = jQuery("#TB_ajaxContent"), a = e.find(".slidedeck_frame"), f = a.closest("div:not(.slidedeck_frame)"), l = {
        borderLeft: parseInt(a.css("border-left-width"), 10),
        borderRight: parseInt(a.css("border-right-width"), 10),
        paddingLeft: parseInt(a.css("padding-left"), 10),
        paddingRight: parseInt(a.css("padding-right"), 10)
      };
      for (var c in l) l[c] = isNaN(l[c]) ? 0 : l[c];
      var h = parseInt(jQuery("#preview_w").val(), 10);
      i = h + l.borderLeft + l.borderRight + l.paddingLeft + l.paddingRight;
      r = u.outerHeight();
      e.width(i + 40).height(r + o);
      u.width(i + 10);
      f.width(i);
    } else e.width(i - 50).height(r - 45 - s);
    jQuery("#TB_iframeContent").width(i - 50).height(r - 75 - s);
    e.css({
      "margin-left": "-" + parseInt(e.width() / 2, 10) + "px"
    });
    typeof document.body.style.maxWidth != "undefined" && e.css({
      top: 20 + s + "px",
      "margin-top": "0"
    });
  }
  return jQuery("a.slide-background-upload").each(function() {
    var e = this.href;
    if (!e) return;
    e = e.replace(/&width=[0-9]+/g, "");
    e = e.replace(/&height=[0-9]+/g, "");
    this.href = e + "&width=" + (i - 80) + "&height=" + (r - 85 - s);
  });
}, tb_position = updateTBSize;

(function(e) {
  SlideDeckPlugin.DOMUtilities = {
    images: [],
    autoReplaceInputs: function(t) {
      this.setContext(t).context.find("input.autoReplace, textarea.autoReplace, input.auto-replace, textarea.auto-replace").addClass("empty").focus(function(t) {
        this.value == this.defaultValue && (this.value = "");
        e(this).addClass("focus").removeClass("empty");
      }).blur(function(t) {
        if (e.trim(this.value) === "") {
          this.value = this.defaultValue;
          e(this).addClass("empty");
        }
        e(this).removeClass("focus");
      });
      return this;
    },
    setContext: function(t) {
      typeof t != "undefined" && (this.context = e(t));
      return this;
    },
    initialize: function(t) {
      typeof t == "undefined" && (t = e(document.body));
      this.setContext(t).autoReplaceInputs();
    }
  };
  SlideDeckPlugin.FirstSaveDialog = {
    cookiename: "dont-show-first-save",
    elems: {},
    onComplete: function() {
      var t = this, n = new ZeroClipboard.Client, r = e("#slidedeck-publish-method-copy-paste .action"), i = r.find(".slidedeck-copy-to-clipboard"), s = r.find(".complete-message");
      n.setText(r.find('input[type="text"]').val());
      r.append(n.getHTML(i.outerWidth(), i.outerHeight()));
      n.addEventListener("onMouseOver", function() {
        i.addClass("hover");
      });
      n.addEventListener("onMouseOut", function() {
        i.removeClass("hover").removeClass("active");
      });
      n.addEventListener("onMouseDown", function() {
        i.addClass("active");
      });
      n.addEventListener("onComplete", function() {
        s.fadeIn();
      });
      e("#first-save-do-not-show-again").find("input").bind("click", function(n) {
        if (this.checked) {
          e.cookie(t.cookiename, 1, {
            expires: 365
          });
          t.modal.close();
        }
      });
      e("#first-save-do-not-show-again .close").bind("click", function(e) {
        e.preventDefault();
        t.modal.close();
      });
    },
    open: function(t) {
      var n = this;
      if (e.cookie(this.cookiename)) return !1;
      this.modal || (this.modal = new SimpleModal({
        context: "firstsave",
        onComplete: function(e) {
          n.onComplete();
        }
      }));
      e.get(ajaxurl + "?action=slidedeck_first_save_dialog&slidedeck=" + t, function(e) {
        n.modal.open(e);
      });
    }
  };
  SlideDeckPlugin.GplusPostsModal = {
    elems: {},
    close: function() {
      self.modal.close();
    },
    open: function() {
      var t = this;
      this.modal || (this.modal = new SimpleModal({
        context: "gplus-how-to",
        onComplete: function() {
          var n = e("#gplus-posts-how-to").slidedeck({
            keys: !1,
            scroll: !1,
            hideSpines: !0
          }), r = e("#gplus-posts-how-to-steps"), i = e("#gplus-how-to-why"), s = e("#gplus-how-to-why-link"), o = e("#gplus-how-to-next"), u = e("#gplus-how-to-step").find(".current"), a = r.find("a");
          r.delegate("a", "click", function(t) {
            t.preventDefault();
            var r = e.data(this, "$this");
            if (!r) {
              r = e(this);
              e.data(this, "$this");
            }
            a.removeClass("current");
            r.addClass("current");
            var i = parseInt(this.href.split("#")[1], 10);
            n.goTo(i);
            u.text(i);
            n.current == n.slides.length ? o.text("Done") : o.text("Next");
          });
          s.bind("click", function(e) {
            e.preventDefault();
            if (s.hasClass("open")) {
              s.removeClass("open");
              i.removeClass("open");
            } else {
              s.addClass("open");
              i.addClass("open");
            }
          });
          o.bind("click", function(e) {
            e.preventDefault();
            n.current == n.slides.length && t.modal.close();
            n.next();
            u.text(n.current);
            a.removeClass("current");
            a.eq(n.current - 1).addClass("current");
            n.current == n.slides.length ? o.text("Finished!") : o.text("Next Step");
          });
        }
      }));
      e.get(ajaxurl + "?action=slidedeck_gplus_posts_how_to_modal", function(e) {
        t.modal.open(e);
      });
    }
  };
  SlideDeckPlugin.InsertModal = {
    elems: {},
    insertSlideDecks: function() {
      var e = this.elems.form.serializeArray(), t = [], n = "";
      for (var r in e) {
        var i = e[r];
        i.name == "slidedecks[]" && t.push("[SlideDeck2 id=" + i.value + (parent.slideDeck2iframeByDefault == 1 ? " iframe=1" : "") + "]");
      }
      var s, o = typeof parent.tinymce != "undefined", u = typeof parent.QTags != "undefined";
      if (!parent.wpActiveEditor) {
        if (o && parent.tinymce.activeEditor) {
          s = parent.tinymce.activeEditor;
          parent.wpActiveEditor = s.id;
        } else if (!u) return !1;
      } else o && (!parent.tinymce.activeEditor || parent.tinymce.activeEditor.id != "mce_fullscreen" && parent.tinymce.activeEditor.id != "wp_mce_fullscreen" ? s = parent.tinymce.get(parent.wpActiveEditor) : s = parent.tinymce.activeEditor);
      if (s && !s.isHidden()) {
        parent.tinymce.isIE && s.windowManager.insertimagebookmark && s.selection.moveToBookmark(s.windowManager.insertimagebookmark);
        for (var a in t) n += "<p>" + t[a] + "</p>";
        s.execCommand("mceInsertContent", !1, n);
      } else if (u) {
        var f = "";
        for (var a in t) {
          n += f + t[a];
          f = "\n\n";
        }
        parent.QTags.insertContent(n);
      } else parent.getElementById(parent.wpActiveEditor).value += n;
      try {
        parent.tb_remove();
      } catch (l) {}
    },
    updateOrderby: function() {
      var t = this;
      e.ajax({
        url: this.elems.form.attr("action"),
        data: this.elems.form.serialize(),
        success: function(e) {
          t.elems.tableContainer.html(e);
        }
      });
    },
    initialize: function() {
      var t = this;
      this.elems.form = e("#slidedeck-insert-iframe-form");
      if (this.elems.form.length < 1) return !1;
      this.elems.tableContainer = e("#slidedeck-insert-iframe-section-table .inner");
      this.elems.cancelLink = e("#slidedeck-insert-iframe-cancel-link");
      this.elems.cancelLink.bind("click", function(e) {
        e.preventDefault();
        parent.tb_remove();
      });
      this.elems.form.delegate('select[name="orderby"]', "change", function(e) {
        t.updateOrderby();
      });
      this.elems.form.delegate("td", "mouseenter mouseleave click", function(t) {
        var n = e.data(this, "$this"), r = e.data(this, "$row"), i = e.data(this, "$input"), s = e.data(this, "$siblings");
        if (!n) {
          n = e(this);
          e.data(this, "$this", n);
        }
        if (!r) {
          r = n.closest("tr");
          s = r.children("td");
          s.each(function() {
            e.data(this, "$row", r);
            e.data(this, "$siblings", s);
          });
        }
        if (!i) {
          i = r.find("input.slidedecks-insert");
          s.each(function() {
            e.data(this, "$input", i);
          });
        }
        switch (t.type) {
         case "mouseenter":
          r.addClass("hover");
          break;
         case "mouseleave":
          r.removeClass("hover");
          break;
         case "click":
          if (!r.hasClass("selected")) {
            r.addClass("selected");
            i[0].checked = !0;
          } else {
            i[0].checked = !1;
            r.removeClass("selected");
          }
        }
      });
      this.elems.form.bind("submit", function(e) {
        e.preventDefault();
        t.insertSlideDecks();
      });
    }
  };
  SlideDeckPlugin.LensManagement = {
    elems: {},
    deleteLens: function(t) {
      var n = this, r = e(t);
      e.ajax({
        url: document.location.href,
        data: r.serialize(),
        type: "post",
        dataType: "json",
        success: function(e) {
          if (e.error === !0) {
            if (typeof e.redirect != "undefined") {
              document.location.href = e.redirect;
              return !1;
            }
            alert(e.message);
            return !1;
          }
          r.closest(".lens").fadeOut(500, function() {
            r.closest(".lens").remove();
            n.elems.lensList.masonry("reload");
          });
        }
      });
    },
    initialize: function() {
      var t = this;
      this.elems.lensList = e("#slidedeck-lenses");
      if (this.elems.lensList.length < 1) return !1;
      this.elems.lenses = this.elems.lensList.find(".lens");
      this.elems.lensList.delegate(".actions form", "submit", function(e) {
        e.preventDefault();
        confirm("Are you sure you want to delete this lens? THIS CANNOT BE UNDONE.") && t.deleteLens(this);
      });
      e("#slidedeck_lens_management").delegate("a.disabled, .disabled a", "click", function(e) {
        e.preventDefault();
        return !1;
      });
      this.elems.lensList.masonry({
        itemSelector: ".lens",
        columnWidth: 278,
        gutterWidth: 45,
        animationOptions: {
          duration: 500
        },
        isAnimated: !0
      });
    }
  };
  SlideDeckPlugin.LensManager = {
    elems: {},
    loadedScripts: {},
    select: function(t) {
      var n = this, r = this.elems.form.serialize();
      this.elems.optionsSection.find("#slidedeck-section-lenses .lens").removeClass("selected");
      t.closest(".lens").addClass("selected");
      e.ajax({
        url: ajaxurl,
        type: "GET",
        data: r + "&action=slidedeck_change_lens",
        dataType: "json",
        success: function(t) {
          n.elems.optionsSection.find(".inner").html(t.options_html);
          n.elems.optionsSection.find(".fancy").fancy();
          SlideDeckPlugin.OptionsNav.initialize();
          n.elems.optionsSection.find(".tooltip").tooltipper({
            namespace: SlideDeckPlugin.slidedeck,
            offsetY: tooltipperOffset.Y,
            offsetX: tooltipperOffset.X
          });
          n.elems.optionsSection.find("input.color-picker").miniColors({
            change: function(e, t) {
              this.trigger("change");
            }
          });
          n.elems.optionsSection.find('input[type="text"]').each(function() {
            e.data(this, "previousValue", e(this).val());
          });
          n.checkDisableCoversUI();
          e("body").trigger("slidedeck:lens-change-update-choices");
          SlideDeckPreview.ajaxUpdate();
          if (!n.loadedScripts[t.lens.slug] && t.lens.admin_script_url) {
            e("head").append('<script type="text/javascript" src="' + t.lens.admin_script_url + '"></script>');
            n.loadedScripts[t.lens.slug] = t.lens.admin_script_url;
          }
          typeof SlideDeckLensAdmin[t.lens.slug] == "function" && SlideDeckLensAdmin[t.lens.slug]();
        }
      });
    },
    checkDisableCoversUI: function() {
      var e = this, t = e.elems.optionsSection.find("#slidedeck-sizes :checked").val();
      t == "small" ? e.elems.optionsSection.find("#slidedeck-covers").append('<div class="disabled-mask"></div>') : e.elems.optionsSection.find("#slidedeck-covers .disabled-mask").remove();
    },
    initialize: function() {
      var t = this;
      this.elems.optionsSection = e("#slidedeck-section-options");
      this.elems.lensesSection = this.elems.optionsSection.find("#slidedeck-section-lenses");
      if (this.elems.lensesSection.length < 1) return !1;
      this.elems.lenses = this.elems.lensesSection.find(".lens");
      this.elems.form = e("#slidedeck-update-form");
      this.elems.sizes = e("#slidedeck-sizes");
      this.elems.optionsSection.delegate('#slidedeck-section-lenses input[type="radio"]', "click", function() {
        var n = e.data(this, "$this");
        if (!n) {
          n = e(this);
          e.data(this, "$this", n);
        }
        t.select(n);
      });
      t.checkDisableCoversUI();
      this.elems.lenses.each(function(e) {
        var n = t.elems.lenses.eq(e), r = n.find('input[name="lens"]').val();
        typeof SlideDeckLensAdmin[r] == "function" && SlideDeckLensAdmin[r]();
      });
    },
    updateChoices: function() {
      var t = this, n = this.elems.optionsSection.find('#slidedeck-section-lenses input[name="lens"]:checked').val();
      e.ajax({
        url: ajaxurl,
        data: {
          action: "slidedeck_update_available_lenses",
          slidedeck_id: e("#slidedeck_id").val(),
          _wpnonce: e('[name="_wpnonce_update_available_lenses"]').val()
        },
        success: function(e) {
          t.elems.lensesSection = t.elems.optionsSection.find("#slidedeck-section-lenses");
          t.elems.lensesSection.html(e);
          var r = t.elems.optionsSection.find('#slidedeck-section-lenses input[name="lens"]:checked').val();
          r != n ? t.elems.lensesSection.find('input[name="lens"]:checked').click() : SlideDeckPreview.ajaxUpdate();
        }
      });
    }
  };
  SlideDeckPlugin.OptionsNav = {
    elems: {},
    height: 0,
    deckLoaded: function(t) {
      var n = this;
      n.elems.navigation = e("#slidedeck-options-groups .verticalSlideNav");
      n.elems.navigation.delegate("a", "click", function(t) {
        t.preventDefault();
        n.goTo(this.href.split("#")[1]);
        n.elems.navigation.find("a").index(this) === 0 ? e("#slidedeck-options-groups dl.slidedeck").addClass("top") : e("#slidedeck-options-groups dl.slidedeck").removeClass("top");
      });
      n.goTo(1);
      e(n.elems.navigation.find("a")[0]).hasClass("nav_1") && e("#slidedeck-options-groups dl.slidedeck").addClass("top");
    },
    goTo: function(t) {
      var n = t - 1, r = this.elems.optionsGroupsLists.eq(n);
      e("#slidedeck-section-options > div.inner").css({
        height: "auto"
      });
      this.elems.optionsGroups.stop().animate({
        height: r.outerHeight()
      }, this.elems.slidedeck.slidedeck().speed);
      this.elems.slidedeck.stop().animate({
        height: r.outerHeight() - 1
      }, this.elems.slidedeck.slidedeck().speed);
    },
    interfaces: function() {
      var t = this;
      for (var n in SlideDeckInterfaces) {
        var r = SlideDeckInterfaces[n], i = e("#" + n);
        if (i.length && !i.is('input[type="hidden"]')) switch (r.type) {
         case "thumbnails":
          var i = e("#" + n);
          i.wrap('<div class="slidedeck2-thumbnail-picker-wrapper"></div>');
          var s = "";
          for (var o in r.values) s += '<span class="thumbnail' + (o == i.val() ? " selected" : "") + '" data-value="' + o + '"><span style="background-image:url(' + slideDeck2URLPath + r.values[o] + ');"></span></span>';
          i.closest(".slidedeck2-thumbnail-picker-wrapper").append('<span class="slidedeck2-thumbnail-picker">' + s + "</span>");
          e(".slidedeck2-thumbnail-picker").delegate(".thumbnail", "click", function(t) {
            var n = e.data(this, "$this"), r = e.data(this, "$select"), i = e.data(this, "$thumbnail");
            if (!n) {
              n = e(this);
              e.data(this, "$this", n);
            }
            if (!r) {
              r = n.closest(".slidedeck2-thumbnail-picker-wrapper").find("select");
              e.data(this, "$select", r);
            }
            if (!i) {
              i = n.closest(".thumbnail");
              e.data(this, "$thumbnail", i);
            }
            var s = e.data(r[0], "$thumbnails");
            if (!s) {
              s = n.closest(".slidedeck2-thumbnail-picker").find(".thumbnail").siblings(".thumbnail");
              e.data(r[0], "$thumbnails", s);
            }
            var o = n.attr("data-value");
            r.find("option").each(function() {
              this.value == o ? this.selected = !0 : this.selected = !1;
            });
            r.val(o).trigger("change");
            s.removeClass("selected");
            i.addClass("selected");
          });
          break;
         case "thumbnails-flyout":
          var i = e("#" + n);
          i.wrap('<div id="slidedeck-2-thumbnail-picker-wrapper-' + n + '" class="slidedeck2-thumbnail-picker-wrapper"><span class="thumbnail-select"><span class="selected"></span></span></div>');
          var u = e(i.closest(".slidedeck2-thumbnail-picker-wrapper")[0]), a = e(u.find("span.thumbnail-select")[0]), f = e(u.find("span.selected")[0]), s = "";
          for (var o in r.values) {
            var l = r.values[o];
            l.match(/^http(s)?\:\/\//) || (l = slideDeck2URLPath + r.values[o]);
            s += '<span class="thumbnail' + (o == i.val() ? " selected" : "") + '" data-value="' + o + '"><span style="background-image:url(' + l + ');"></span></span>';
          }
          var c = e("#slidedeck2-thumbnail-flyout-" + n);
          if (c.length < 1) {
            e("body").append('<div id="slidedeck2-thumbnail-flyout-' + n + '" class="slidedeck2-thumbnail-flyout" style="display:none;"><span class="slidedeck2-thumbnail-picker clearfix"></span></div>');
            c = e("#slidedeck2-thumbnail-flyout-" + n);
          }
          c.find(".slidedeck2-thumbnail-picker").html(s);
          var h = e("#slidedeck2-thumbnail-flyout-" + n + " .thumbnail.selected span").css("background-image").match(/url\([\'|\"]?([^\'|\"]+)[\'|\"]?\)/)[1];
          f.append('<img src="' + h + '" alt="" />');
          e("body").bind("click", function(t) {
            var n = e(t.target);
            n.closest(".slidedeck2-thumbnail-flyout").length < 1 && n.closest(".thumbnail-select").length < 1 && e(".slidedeck2-thumbnail-flyout:visible").hide();
          });
          u.delegate(".selected", "click", function(t) {
            var n = e.data(this, "$this");
            if (!n) {
              n = e(this);
              e.data(this, "$this", n);
            }
            var r = n.offset(), i = n.closest(".slidedeck2-thumbnail-picker-wrapper").find("select").attr("id"), s = e("#slidedeck2-thumbnail-flyout-" + i), o = r.top, u = e(window).height(), f = e(window).scrollTop(), l = s.outerHeight();
            if (l + r.top > u + f && u > l && r.top - f > l) {
              s.addClass("invert");
              o = o - l - 2;
            } else {
              s.removeClass("invert");
              o = o + a.outerHeight() + 2;
            }
            s.is(":visible") ? s.hide() : s.css({
              top: o,
              left: r.left
            }).show();
          });
          e(".slidedeck2-thumbnail-flyout").delegate(".thumbnail", "click", function(t) {
            var n = e.data(this, "$this"), r = e.data(this, "$select"), i = e.data(this, "$thumbnail");
            if (!n) {
              n = e(this);
              e.data(this, "$this", n);
            }
            var s = n.closest(".slidedeck2-thumbnail-flyout").attr("id").replace("slidedeck2-thumbnail-flyout-", "");
            if (!r) {
              r = e("#" + s);
              e.data(this, "$select", r);
            }
            if (!i) {
              i = n.closest(".thumbnail");
              e.data(this, "$thumbnail", i);
            }
            var o = e.data(r[0], "$thumbnails");
            if (!o) {
              o = n.closest(".slidedeck2-thumbnail-picker").find(".thumbnail").siblings(".thumbnail");
              e.data(r[0], "$thumbnails", o);
            }
            var u = n.attr("data-value");
            r.find("option").each(function() {
              this.value == u ? this.selected = !0 : this.selected = !1;
            });
            r.val(u).trigger("change");
            o.removeClass("selected");
            i.addClass("selected");
            var a = i.find("span").css("background-image").match(/url\([\'|\"]?([^\'|\"]+)[\'|\"]?\)/)[1];
            e("#slidedeck-2-thumbnail-picker-wrapper-" + s + " .thumbnail-select .selected img").attr("src", a);
            n.closest(".slidedeck2-thumbnail-flyout").hide();
          });
          break;
         case "slider":
          var p = {
            animate: !0,
            min: 1,
            max: 100,
            orientation: "horizontal",
            range: !1,
            step: 1
          }, d = {};
          for (var v in p) r[v] ? d[v] = r[v] : d[v] = p[v];
          e("#" + n).wrap('<div class="slidedeck2-slider-wrapper"></div>');
          e("#" + n).before('<div id="' + n + '-slider" class="slidedeck2-slider"><span class="min">' + (r.minLabel ? r.minLabel : d.min) + '</span><span class="max">' + (r.maxLabel ? r.maxLabel : d.max) + "</span></div>");
          var m = e("#" + n + "-slider");
          i.is("select") && m.after('<span class="selected">' + i.find("option:selected").text() + "</span>");
          if (r.marks) {
            var g = d.max - d.min, y = g / d.step, b = "";
            for (var o = 0; o < y; o++) b += '<span class="mark" style="width:' + 100 / y + '%">' + (d.min + d.step * (o + 1)) + "</span>";
            m.append('<span class="marks">' + b + "</span>");
          }
          d.value = i.val();
          d.slide = function(t, n) {
            var r = e.data(this, "$input");
            if (!r) {
              var r = e("#" + n.handle.parentNode.id.replace("-slider", ""));
              e.data(this, r);
            }
            if (r.is('input[type="text"]')) r.val(n.value); else if (r.is("select")) {
              r.find("option").each(function() {
                this.value == n.value ? this.selected = !0 : this.selected = !1;
              });
              e(n.handle.parentNode).next(".selected").text(r.find("option:selected").text());
            }
          };
          d.change = function(n, r) {
            var i = e.data(this, "$input");
            if (!i) {
              var i = e("#" + r.handle.parentNode.id.replace("-slider", ""));
              e.data(this, "$input", i);
            }
            SlideDeckInterfaces[i.attr("id")].update && t.interfaceUpdate(i.val(), "slider", SlideDeckInterfaces[i.attr("id")].update);
            SlideDeckPreview.update(i[0], i.val());
          };
          m.slider(d);
          e("#" + n).bind("keyup", function(t) {
            var n = this;
            this.sliderTimer && clearTimeout(n.sliderTimer);
            this.sliderTimer = setTimeout(function() {
              e("#" + n.id + "-slider").slider("value", n.value);
            }, 250);
            return !0;
          });
        }
      }
    },
    interfaceUpdate: function(t, n, r) {
      switch (n) {
       case "slider":
        var i = e("#options-" + r.option);
        i.val(Math.min(parseInt(i.val(), 10), parseInt(t, 10)));
        var s = e("#options-" + r.option + "-slider");
        if (s.length) {
          s.slider("option", r.value, t);
          r.value == "min" ? s.find(".min").text(t) : r.value == "max" && s.find(".max").text(t);
          s.slider("value", parseInt(i.val(), 10));
        }
      }
    },
    initialize: function() {
      var t = this;
      this.elems.optionsGroups = e("#slidedeck-options-groups");
      if (this.elems.optionsGroups.length < 1) return !1;
      this.elems.optionsSection = e("#slidedeck-section-options");
      this.interfaces();
      this.elems.optionsGroupsLists = this.elems.optionsGroups.find(".options-list");
      this.elems.slidedeck = this.elems.optionsGroups.find(".slidedeck");
      this.elems.optionsGroupsLists.css("min-height", this.elems.optionsGroupsLists.length * 84);
      this.elems.optionsGroupsLists.each(function(e) {
        t.height = Math.max(t.elems.optionsGroupsLists.eq(e).outerHeight(), t.height);
      });
      this.elems.slidedeck.height(this.height);
      this.elems.slidedeck.slidedeck({
        scroll: !1,
        keys: !1
      }).loaded(function(e) {
        t.deckLoaded(e);
      }).vertical({
        scroll: !1
      });
      this.elems.optionsGroups.delegate('#slidedeck-sizes input[type="radio"]', "click", function() {
        SlideDeckPlugin.LensManager.checkDisableCoversUI();
      });
      e(window).resize(function() {
        t.resize();
      });
    },
    resize: function() {
      var e = this;
      this.elems.slidedeck.find("dd").add(".slidesVertical").width(this.elems.slidedeck.width());
      this.height = 0;
      this.elems.optionsGroupsLists.each(function(t) {
        this.style.height = "";
        e.height = Math.max(e.elems.optionsGroupsLists.eq(t).outerHeight(), e.height);
      });
      this.elems.slidedeck.height(this.height).find("dd").height(this.height);
      this.elems.optionsGroups.stop().animate({
        height: this.elems.optionsGroupsLists.eq(this.elems.slidedeck.slidedeck().vertical().current).innerHeight() + "px"
      }, 500);
      this.elems.slidedeck.stop().animate({
        height: this.elems.optionsGroupsLists.eq(this.elems.slidedeck.slidedeck().vertical().current).innerHeight() - 1 + "px"
      }, 500);
    }
  };
  SlideDeckPlugin.SourceManager = {
    elems: {},
    slidedeckId: null,
    deleteSource: function(t) {
      var n = this, r = e(t).closest(".slidedeck-content-source").find('input[name="source[]"]').val();
      e.ajax({
        url: t.href,
        data: "source=" + r + "&slidedeck=" + this.slidedeckId,
        type: "POST",
        success: function(e) {
          if (e != "false") {
            n.elems.contentControl.html(e);
            n.elems.contentControl.find(".fancy").fancy();
            n.elems.contentControl.find(".tooltip").tooltipper({
              namespace: SlideDeckPlugin.namespace,
              offsetY: tooltipperOffset.Y,
              offsetX: tooltipperOffset.X
            });
            SlideDeckPlugin.LensManager.updateChoices();
          }
        }
      });
    },
    open: function(t) {
      var n = this;
      e.ajax({
        url: t,
        type: "GET",
        success: function(e) {
          n.modal.open(e);
        }
      });
    },
    select: function(t) {
      var n = this, r = e(t).closest("form"), i = r.serializeArray(), s = "create";
      for (var o in i) i[o].name == "action" && (s = i[o].value);
      s == "create" ? r.submit() : e.ajax({
        url: ajaxurl,
        type: "GET",
        data: this.elems.form.serialize() + "&" + r.serialize(),
        success: function(e) {
          if (e != "false") {
            n.elems.contentControl.html(e);
            n.elems.contentControl.find(".fancy").fancy();
            n.elems.contentControl.find(".tooltip").tooltipper({
              namespace: SlideDeckPlugin.namespace,
              offsetY: tooltipperOffset.Y,
              offsetX: tooltipperOffset.X
            });
            SlideDeckPlugin.LensManager.updateChoices();
          }
        }
      });
    },
    initialize: function() {
      var t = this;
      this.elems.head = e("head");
      this.elems.body = e("body");
      this.elems.form = e("#slidedeck-update-form");
      this.elems.contentControl = e("#slidedeck-content-control");
      this.slidedeckId = e("#slidedeck_id").val();
      typeof SimpleModal != "undefined" && (this.modal = new SimpleModal({
        context: "source",
        onComplete: function(n) {
          n.elems.modal.find('input[type="radio"]').bind("click", function() {
            var r = e(this).closest("label");
            r.closest(".sources").find("label").removeClass("active");
            r.addClass("active");
            t.select(this);
            n.close();
          });
        }
      }));
      e("body").delegate("a.slidedeck-source-modal", "click", function(e) {
        e.preventDefault();
        t.open(this.href);
      });
      e("#slidedeck-update-form").delegate(".delete.link", "click", function(e) {
        e.preventDefault();
        confirm("Are you sure you wish to delete this source?") && t.deleteSource(this);
      });
    }
  };
  SlideDeckPlugin.CoversEditor = {
    elems: {},
    importedFonts: {},
    onComplete: function(t) {
      var n = this;
      this.elems.modal = t.elems.modal;
      this.elems.form = this.elems.modal.find("form");
      this.elems.frontOptions = this.elems.modal.find(".options-list.front-options");
      this.elems.backOptions = this.elems.modal.find(".options-list.back-options");
      this.elems.preview = this.elems.modal.find("#slidedeck-covers-preview");
      this.elems.frontCover = this.elems.preview.find(".slidedeck-cover-front");
      this.elems.frontBindingColor = this.elems.frontCover.find(".slidedeck-cover-binding .slidedeck-cover-color");
      this.elems.frontTitle = this.elems.frontCover.find(".slidedeck-cover-title");
      this.elems.frontBack = this.elems.frontCover.find(".slidedeck-cover-wrapper-back");
      this.elems.frontButtonAccent = this.elems.frontCover.find(".slidedeck-cover-open .slidedeck-cover-color");
      this.elems.curatedBy = this.elems.frontCover.find(".slidedeck-cover-curatedby");
      this.elems.backCover = this.elems.preview.find(".slidedeck-cover-back");
      this.elems.backBindingColor = this.elems.backCover.find(".slidedeck-cover-binding .slidedeck-cover-color");
      this.elems.backTitle = this.elems.preview.find(".slidedeck-cover-title");
      this.elems.backCopy = this.elems.preview.find(".slidedeck-cover-bodycopy");
      this.elems.backButton = this.elems.preview.find(".slidedeck-cover-button");
      this.elems.backCoverCTAColor = this.elems.preview.find(".slidedeck-cover-cta .slidedeck-cover-color");
      this.elems.backButtonText = this.elems.backButton.find("span.text");
      this.elems.backBack = this.elems.backCover.find(".slidedeck-cover-wrapper-back");
      this.elems.backButtonAccent = this.elems.backCover.find(".slidedeck-cover-restart .slidedeck-cover-color");
      this.elems.toggles = this.elems.modal.find("#slidedeck-covers-swap .toggle");
      this.elems.modal.find(".slidedeck-cover-mask").animate({
        opacity: .8
      });
      this.elems.modal.find("input, select, textarea").fancy();
      var r = this.elems.modal.find(".color-picker");
      r.miniColors({
        change: function(e, t) {
          this.trigger("change");
        }
      });
      if (!__hasSavedCovers) {
        var i = e("#options-accentColor");
        if (i.val() !== "") {
          r.val(i.val());
          r.trigger("keyup");
        }
      }
      this.elems.modal.find(".cancel-modal").bind("click", function(e) {
        e.preventDefault();
        t.close();
      });
      this.elems.form.bind("submit", function(r) {
        r.preventDefault();
        e.ajax({
          url: document.location.href.replace(document.location.search, ""),
          data: n.elems.form.serialize(),
          type: "POST",
          success: function(e) {
            t.close();
            SlideDeckPreview.ajaxUpdate();
            __hasSavedCovers = !0;
          }
        });
      });
      this.elems.modal.find("#back_title").bind("keyup", function() {
        n.elems.backTitle.html(this.value.replace(/\n/, "<br/>"));
      });
      this.elems.modal.find("#button_label").bind("keyup", function() {
        n.elems.backButtonText.html(this.value);
      });
      this.elems.modal.find("#button_url").bind("keyup", function() {
        n.elems.backButton.attr("href", this.value);
      });
      this.elems.modal.find("#front_title").bind("keyup", function() {
        n.elems.frontTitle.html(this.value.replace(/\n/, "<br/>"));
      });
      var s = this.elems.modal.find("#title_font");
      s.bind("change", function() {
        var t = e(this).find("option:selected").val(), r = n.fonts[t];
        if (r["import"] && !n.importedFonts[t]) {
          e("head").append('<link href="' + r["import"] + '" rel="stylesheet" type="text/css" />');
          n.importedFonts[t] = !0;
        }
        if (this.id == "title_font") {
          n.elems.frontTitle.css("font-family", r.stack);
          r.weight && n.elems.frontTitle.css("font-weight", r.weight);
          n.elems.backTitle.css("font-family", r.stack);
          r.weight && n.elems.backTitle.css("font-weight", r.weight);
        } else this.id == "copy_font" && n.elems.backCopy.css("font-family", r.stack);
      }).trigger("change");
      if (!__hasSavedCovers) {
        var o = e("#options-titleFont");
        if (o.val() !== "") {
          var u = "";
          s.find("option").each(function() {
            if (this.value == o.val()) {
              this.selected = !0;
              u = this.text;
            } else this.selected = !1;
          });
          s.closest(".fancy-select").find(".selected").text(u);
          s.trigger("change");
        }
      }
      this.elems.modal.find("#accent_color").bind("change", function() {
        var e = Raphael.getRGB(this.value), t = Raphael.rgb2hsb(e.r, e.g, e.b);
        t.s = t.s * .2;
        t.b = 1;
        var r = Raphael.rgb2hsb(e.r, e.g, e.b);
        r.s = r.s * .05;
        r.b = 1;
        var i = "90-hsb(" + t.h + "," + t.s + "," + t.b + ")-hsb(" + r.h + "," + r.s + "," + r.b + ")";
        n.elems.modal.find(".frosted-glass").data("slidedeck-frosted-cover-shine") && n.elems.modal.find(".frosted-glass").data("slidedeck-frosted-cover-shine").attr("fill", i);
        n.elems.modal.find(".frosted-glass").data("slidedeck-frosted-cover-background") && n.elems.modal.find(".frosted-glass").data("slidedeck-frosted-cover-background").attr("fill", i);
        n.elems.modal.find(".frosted-glass-back").data("slidedeck-frosted-cover-back-shine") && n.elems.modal.find(".frosted-glass-back").data("slidedeck-frosted-cover-back-shine").attr("fill", i);
        n.elems.modal.find(".frosted-glass-back").data("slidedeck-frosted-cover-back-background") && n.elems.modal.find(".frosted-glass-back").data("slidedeck-frosted-cover-back-background").attr("fill", i);
        n.elems.frontBindingColor.css("background-color", this.value);
        n.elems.backBindingColor.css("background-color", this.value);
        n.elems.backCoverCTAColor.css("background-color", this.value);
        if (n.elems.frontButtonAccent.data("slidedeck-cover-shape")) {
          var s = n.elems.frontButtonAccent.data("slidedeck-cover-shape");
          if (jQuery.isArray(s)) for (var o = 0; o < s.length; o++) s[o].attr("fill", this.value); else s.attr("fill", this.value);
        } else n.elems.frontButtonAccent.css("background-color", this.value);
        if (n.elems.backButtonAccent.data("slidedeck-cover-shape")) {
          var s = n.elems.backButtonAccent.data("slidedeck-cover-shape");
          if (jQuery.isArray(s)) for (var o = 0; o < s.length; o++) s[o].attr("fill", this.value); else s.attr("fill", this.value);
        } else n.elems.backButtonAccent.css("background-color", this.value);
      }).trigger("change");
      this.elems.modal.find('[name="show_curator"]').bind("click", function() {
        var e = this.value == 1 ? !0 : !1;
        e ? n.elems.curatedBy.show() : n.elems.curatedBy.hide();
      });
      this.elems.modal.find('[name="peek"]').bind("click", function() {
        var e = this.value == 1 ? !0 : !1;
        e ? n.elems.preview.addClass("slidedeck-cover-peek") : n.elems.preview.removeClass("slidedeck-cover-peek");
        n.elems.modal.find("#cover_style").trigger("change");
      });
      this.elems.modal.find("#cover_style").bind("change", function() {
        var t = e(this).find("option:selected").val();
        e(this).find("option").each(function() {
          this.selected || n.elems.preview.removeClass("slidedeck-cover-style-" + this.value);
        });
        n.elems.preview.addClass("slidedeck-cover-style-" + t);
        n.elems.preview.find(".slidedeck-cover-color").data("slidedeck-cover-shape", !1).find("svg").remove();
        SlideDeckCoverPostProcessFront[t] && SlideDeckCoverPostProcessFront[t](n.elems.preview.find(".slidedeck-cover-nav-button"), n.elems.preview.hasClass("slidedeck-cover-peek"));
        SlideDeckCoverPostProcessBack[t] && SlideDeckCoverPostProcessBack[t](n.elems.preview.find(".slidedeck-cover-nav-button.slidedeck-cover-restart"), n.elems.preview.hasClass("slidedeck-cover-peek"));
        n.elems.modal.find(".toggle-back.selected").length === 0 && n.elems.preview.find(".slidedeck-cover-back").css({
          visibility: "hidden"
        });
        n.elems.modal.find("#accent_color").trigger("change");
        var r = n.elems.modal.find("#variation"), i = r.find("option").filter(":selected").val(), s = "";
        for (var o in n.variations[t]) i == o ? s += '<option selected="selected" value="' + o + '">' + n.variations[t][o] + "</option>" : s += '<option value="' + o + '">' + n.variations[t][o] + "</option>";
        if (!e.isEmptyObject(n.variations[t])) {
          var u = n.elems.modal.find("#variation").closest("li");
          u.slideDown(500);
          u.find(".fancy-select, select.fancy").remove();
          u.find(".inner").append('<select class="fancy" id="variation" name="variation" style="">' + s + "</select>");
          u.find(".fancy").fancy();
          u.find(".fancy").trigger("change");
        } else n.elems.modal.find("#variation").closest("li").slideUp(500);
      }).trigger("change");
      this.elems.modal.find(".options-list.global-options").delegate("#variation", "change", function() {
        e(this).find("option").each(function() {
          this.selected || n.elems.preview.removeClass("slidedeck-cover-" + this.value);
        });
        n.elems.preview.addClass("slidedeck-cover-" + e(this).find("option:selected").val());
      }).trigger("change");
      this.elems.modal.delegate(".toggle", "click", function(t) {
        t.preventDefault();
        var r = e.data(this, "$this");
        if (!r) {
          r = e(this);
          e.data(this, "$this", r);
        }
        n.elems.toggles.removeClass("selected");
        r.addClass("selected");
        n.toggle(this.href.split("#")[1]);
      });
    },
    open: function() {
      var t = this, n = this.elems.slidedeckPreview.attr("src").match(/slidedeck\=([\d]+)/)[1];
      this.elems.link.attr("href", this.elems.link.attr("href").replace(/slidedeck\=([\d]+)/, "slidedeck=" + n));
      this.modal || (this.modal = new SimpleModal({
        context: "covers",
        onComplete: function(e) {
          t.onComplete(e);
        }
      }));
      e.get(this.elems.link.attr("href"), function(e) {
        t.modal.open(e);
      });
    },
    toggle: function(e) {
      switch (e) {
       case "front":
        this.elems.frontCover.css({
          visibility: "visible"
        });
        this.elems.backCover.css({
          visibility: "hidden"
        });
        this.elems.frontOptions.css("height", "auto");
        this.elems.backOptions.css("height", 0);
        break;
       case "back":
        this.elems.frontCover.css({
          visibility: "hidden"
        });
        this.elems.backCover.css({
          visibility: "visible"
        });
        this.elems.frontOptions.css("height", 0);
        this.elems.backOptions.css("height", "auto");
      }
    },
    initialize: function() {
      var t = this;
      this.elems.link = e("#slidedeck-covers-modal-link");
      if (this.elems.link.length < 1) return !1;
      this.elems.slidedeckPreview = e("#slidedeck-preview");
      this.elems.slidedeckOptions = e("#slidedeck-section-options");
      this.elems.showFrontCoverField = e('input[name="options[show-front-cover]"]');
      this.elems.showBackCoverField = e('input[name="options[show-back-cover]"]');
      this.elems.slidedeckOptions.delegate("#slidedeck-covers-modal-link", "click", function(e) {
        e.preventDefault();
        t.open();
      });
    }
  };
  SlideDeckPlugin.beforeUnload = {
    initialize: function() {
      var t = this;
      this.form = e("#slidedeck-update-form");
      if (this.form.length < 1) return !1;
      this.originalSerialize = this.form.serialize();
      window.onbeforeunload = function() {
        if (t.originalSerialize != t.form.serialize()) return "You have unsaved changes to this SlideDeck. Are you sure you want to leave without saving?";
      };
      this.form.bind("submit", function() {
        window.onbeforeunload = null;
      });
    }
  };
  e(document).ready(function() {
    e("#slidedeck-insert-iframe-section-header").find(".fancy").fancy();
    e("#slidedeck-update-form, #slidedeck-option-wrapper").find(".fancy").fancy();
    SlideDeckPlugin.DOMUtilities.initialize();
    SlideDeckPlugin.OptionsNav.initialize();
    SlideDeckPlugin.SourceManager.initialize();
    SlideDeckPlugin.LensManagement.initialize();
    SlideDeckPlugin.LensManager.initialize();
    SlideDeckPlugin.InsertModal.initialize();
    SlideDeckPlugin.CoversEditor.initialize();
    SlideDeckPlugin.beforeUnload.initialize();
    e("#slidedeck-table").length === 0 ? typeof e.fn.tooltipper == "function" && e(".tooltip").tooltipper({
      namespace: SlideDeckPlugin.namespace,
      offsetY: tooltipperOffset.Y,
      offsetX: tooltipperOffset.X
    }) : typeof e.fn.tooltipper == "function" && e("#slidedeck-table .tooltip").tooltipper({
      speed: 0,
      delay: 0,
      namespace: SlideDeckPlugin.namespace,
      offsetY: tooltipperOffset.Y - 10,
      offsetX: tooltipperOffset.X
    });
    typeof e.fn.miniColors == "function" && e("input.color-picker").miniColors({
      change: function(e, t) {
        this.trigger("change");
      }
    });
    e("#slidedeck-table").delegate(".slidedeck-preview-link", "click", function(t) {
      t.preventDefault();
      var n = e.data(this, "$this"), r = e.data(this, "$iframe"), i = e.data(this, "$td"), s = this.href, o = parseInt(this.href.match(/\&width=(\d+)/)[1], 10);
      height = parseInt(this.href.match(/\&height=(\d+)/)[1], 10);
      if (!n) {
        n = e(this);
        e.data(this, "$this", n);
      }
      if (n.hasClass("animating")) return !1;
      n.addClass("animating");
      if (!r) {
        var u = n.attr("data-for");
        r = e("#" + u);
        e.data(this, "$iframe", r);
      }
      if (r.hasClass("open")) r.removeClass("open").animate({
        height: 0,
        marginTop: 0,
        marginBottom: 0
      }, 500, function() {
        r[0].src = "about:blank";
        n.removeClass("animating");
      }); else {
        r.css("width", o).animate({
          height: height,
          marginTop: 20,
          marginBottom: 20
        }, 500, function() {
          r[0].src = s;
          n.removeClass("animating");
        }).addClass("open");
        if (SlideDeckAnonymousStats.optin == 1) {
          var a = n.closest(".slidedeck-row").find(">img.icon").attr("src").indexOf("/custom/images/icon.png") != -1 ? !0 : !1, f = new Image;
          f.src = "http://trk.kissmetrics.com/e?_k=" + SlideDeckAnonymousStats.apikey + "&_p=" + SlideDeckAnonymousStats.hash + "&_n=" + escape("Preview SlideDeck") + "&" + escape("SlideDeck Type") + "=" + (a ? "custom" : "dynamic");
        }
      }
    }).delegate(".slidedeck-getcode-link", "click", function(t) {
      t.preventDefault();
      var n = e.data(this, "$this"), r = e.data(this, "modal");
      if (!n) {
        n = e(this);
        e.data(this, "$this", n);
      }
      r || (r = new SimpleModal({
        context: "firstsave",
        onComplete: function(t) {
          SlideDeckPlugin.FirstSaveDialog.onComplete(t);
          e("#get-code-close").delegate("a.close", "click", function(e) {
            e.preventDefault();
            t.close();
          });
        }
      }));
      e.get(n.attr("href"), function(e) {
        r.open(e);
      });
    });
    e("#slidedeck-update-form").delegate("#gplus-how-to", "click", function(e) {
      e.preventDefault();
      SlideDeckPlugin.GplusPostsModal.open();
    });
    e("#slidedeck-update-form").delegate(".configure-source", "click", function(t) {
      t.preventDefault();
      var n = e(this).siblings(".slidedeck-content-source");
      e(".slidedeck-content-source").not(n).addClass("hidden");
      n.toggleClass("hidden");
      n.hasClass("hidden") ? e("body").unbind("click.hideFlyout") : e("body").bind("click.hideFlyout", function(t) {
        e(t.target).parents("div.slidedeck-content-source").length == 0 && !e(t.target).parent().hasClass("configure-source");
      });
    });
    e("#slidedeck-update-form").delegate(".cancel.link", "click", function(t) {
      t.preventDefault();
      e(this).closest(".slidedeck-content-source").addClass("hidden");
      e("body").unbind("click.hideFlyout");
    });
    if (e(".slidedeck-content-source .cache-slider").length) {
      var t = e(this), n = t.closest(".slidedeck-content-slider"), r = n.find('[name="options[feedCacheDuration]"]'), i = [ 60, 300, 600, 900, 1800, 2700, 3600, 7200, 10800, 21600, 43200, 86400 ], s = [ "1 minute", "5 minutes", "10 minutes", "15 minutes", "30 minutes", "45 minutes", "1 hour", "2 hours", "3 hours", "6 hours", "12 hours", "1 day" ], o = e.inArray(parseInt(r.val(), 10), i);
      o == -1 && (o = 3);
      e(".slidedeck-content-source .cache-slider").slider({
        value: o,
        animate: !0,
        min: 0,
        max: 11,
        step: 1,
        slide: function(e, t) {
          n.find(".cache-slider-value").html(s[t.value]);
          r.val(i[t.value]);
        },
        create: function(e, t) {
          n.find(".cache-slider-value").html(s[o]);
        }
      });
    }
    e("#slidedeck-update-form").delegate(".slidedeck-form-section.collapsible .hndl", "click", function(t) {
      var n = e.data(this, "$this"), r = e.data(this, "$inner"), i = e.data(this, "$section"), s = e.data(document.body, "slidedeck_id");
      if (!n) {
        n = e(this);
        e.data(this, "$this", n);
      }
      if (n.hasClass("animating")) return !1;
      n.addClass("animating");
      if (!s) {
        s = e("#slidedeck_id").val();
        e.data(document.body, "slidedeck_id", s);
      }
      if (!r) {
        r = n.closest(".hndl-container").next(".inner");
        e.data(this, "$inner", r);
      }
      if (!i) {
        i = n.closest(".slidedeck-form-section.collapsible");
        e.data(this, "$section", i);
      }
      var o = i.prop("id"), u = "hide--" + s + "--" + o, a = null, f = e.data(r[0], "inner_height"), l = f;
      if (i.hasClass("closed")) i.removeClass("closed"); else {
        e.data(r[0], "inner_height", r.height());
        i.addClass("closed");
        l = 0;
        a = 1;
      }
      r.animate({
        height: l + "px"
      }, 500, function() {
        n.removeClass("animating");
      });
      e.cookie(u, a);
    }).find(".slidedeck-form-section.collapsible").each(function() {
      var t = e(this), n = t.find(".inner"), r = n.closest(".slidedeck-form-section.collapsible"), i = e.data(document.body, "slidedeck_id");
      if (!i) {
        i = e("#slidedeck_id").val();
        e.data(document.body, "slidedeck_id", i);
      }
      e.data(this, "$inner", n);
      e.data(this, "$section", r);
      e.data(n[0], "inner_height", n.height());
      if (e.cookie("hide--" + i + "--" + this.id)) {
        t.addClass("closed");
        n.css("height", 0);
      }
    });
    e("#preview-textures a").bind("click", function(t) {
      t.preventDefault();
      var n = e.data(this, "$this"), r = e.data(this, "$chicklets"), i = e.data(this, "$stage");
      if (!n) {
        n = e(this);
        e.data(this, "$this", n);
      }
      if (!r) {
        r = e("#preview-textures").find("a");
        e.data(this, "$chicklets", r);
      }
      if (!i) {
        i = e("#slidedeck-section-preview").find(".inner");
        e.data(this, "$stage", i);
      }
      r.removeClass("active");
      e("#preview-textures").find("li").removeClass("active");
      n.addClass("active");
      n.closest("li").addClass("active");
      var s = new RegExp("background=([a-zA-Z0-9-_]+)"), o = this.href.match(s)[1];
      r.each(function() {
        var e = this.href.match(s)[1];
        o == e ? i.addClass("texture-" + e) : i.removeClass("texture-" + e);
      });
      e.ajax({
        url: ajaxurl,
        data: this.href.split("?")[1],
        type: "POST"
      });
    });
    e("#form_action").val() == "create" && e("#titlewrap #title").css({
      color: "#999",
      fontStyle: "italic"
    }).focus(function(e) {
      this.style.color = "";
      this.style.fontStyle = "";
      this.value == this.defaultValue && (this.value = "");
    });
    e("#title-display").bind("click", function(t) {
      t.preventDefault();
      e("#titlewrap").addClass("editing");
      e("#title").focus();
    });
    e("#title").bind("blur", function(t) {
      e("#form_action").val() != "create" && e("#titlewrap").removeClass("editing");
    }).bind("keydown keyup", function(t) {
      if (t.keyCode != 13 && t.keyCode != 27) {
        var n = e("#title-display").find(".title").text(this.value).width();
        e("#title").css("min-width", n + 50);
      } else e(this).blur();
    });
    if (e(".license-key-text-field").length) {
      e(".slidedeck-license-key-wrapper").delegate(".verify-license-key.button", "click", function(t) {
        t.preventDefault();
        e.ajax({
          url: ajaxurl + "?action=slidedeck_verify_license_key&verify_license_nonce=" + e("#verify_license_nonce").val() + "&key=" + e(".license-key-text-field").val(),
          success: function(t) {
            e(".license-key-verification-response").html(t);
          }
        });
      });
      e(".slidedeck-license-key-wrapper .verify-license-key").click();
    }
    if (e(".license-key-text-field").length) {
      e(".slidedeck-license-key-wrapper").delegate(".verify-license-key.button", "click", function(t) {
        t.preventDefault();
        e.ajax({
          url: ajaxurl + "?cachebreaker=" + Math.floor(Math.random() * 1e5) + "&" + e(this).parents("form").serialize(),
          success: function(t) {
            e(".addon-verification-response").html(t).find("a").each(function() {
              SlideDeckAnonymousStats.optin == 1 && this.href.match(/dtelepathy\.com/) && (this.search += "&kmi=" + SlideDeckAnonymousStats.hash);
            });
          }
        });
      });
      e(".slidedeck-license-key-wrapper .verify-license-key").click();
    }
    e("#slidedeck-table").delegate("form.delete-slidedeck", "submit." + SlideDeckPlugin.namespace, function(t) {
      t.preventDefault();
      var n = e(this), r = n.closest("li"), i = r.parents(".inner"), s = r.next("div.slidedeck-preview-wrapper"), o = n.closest("ul");
      confirm("Are you sure you want to delete this SlideDeck?\nThis CANNOT be undone.") && e.ajax({
        url: document.location.href,
        type: this.method,
        data: n.serialize(),
        success: function() {
          r.fadeOut(500, function() {
            r.remove();
            s.remove();
            if (o.find("li").length < 1) {
              i.remove();
              e("#no-decks-placeholder").show();
            }
          });
        }
      });
    });
    e("#slidedeck-table").delegate("form.duplicate-slidedeck", "submit." + SlideDeckPlugin.namespace, function(t) {
      t.preventDefault();
      var n = e(this), r = e("#slidedeck-table").find(".float-wrapper .left");
      n.closest(".slidedeck-duplicate").addClass("loading");
      e.ajax({
        url: document.location.href,
        type: this.method,
        data: n.serialize(),
        success: function(t) {
          if (t != "false") {
            r.html(t);
            e(".tooltipper.slidedeck").remove();
            r.find(".tooltip").tooltipper({
              namespace: SlideDeckPlugin.namespace,
              offsetY: tooltipperOffset.Y,
              offsetX: tooltipperOffset.X
            });
          }
        }
      });
    });
    e("#delete-slidedeck").bind("click", function(t) {
      t.preventDefault();
      var n = this.href.match(/slidedeck(\=|\%3D)([\d]+)/)[2], r = this.href.match(/_wpnonce(\=|\%3D)([a-zA-Z0-9]+)/)[2];
      confirm("Are you sure you want to delete this SlideDeck?\nThis CANNOT be undone.") && e.ajax({
        url: document.location.href.replace(document.location.search, ""),
        type: "POST",
        data: "slidedeck=" + n + "&_wpnonce=" + r + "&redirect=1",
        success: function(e) {
          document.location.href = e;
        }
      });
    });
    e("#template_snippet_w, #template_snippet_h").bind("keyup." + SlideDeckPlugin.namespace, function(t) {
      var n = this;
      this.timer && clearTimeout(n.timer);
      this.timer = setTimeout(function() {
        var t = e("#template_snippet_w").val(), n = e("#template_snippet_h").val(), r = e("#slidedeck_id").val(), i = "<?php slidedeck( " + r + ", array( 'width' => '" + t + "', 'height' => '" + n + "' ) ); ?" + ">";
        e("#slidedeck-template-snippet").val(i);
      }, 100);
      return !0;
    });
    e("#slidedeck-template-snippet").focus(function() {
      this.select();
    });
    updateTBSize();
    e("#slidedeck-blog-rss-feed").length && e.ajax({
      url: ajaxurl,
      data: "action=slidedeck2_blog_feed",
      type: "GET",
      complete: function(t) {
        var n = t.responseText, r = e("#slidedeck-blog-rss-feed");
        n != "false" ? r.html(t.responseText) : r.text("Unable to connect to feed!");
      }
    });
    e("#slidedeck-latest-tweets").length && e.ajax({
      url: ajaxurl,
      data: "action=slidedeck2_tweet_feed",
      type: "GET",
      complete: function(t) {
        var n = t.responseText, r = e("#slidedeck-latest-tweets");
        if (n != "false") {
          r.html(t.responseText);
          var i = r.find(".slidedeck").slidedeck({
            hideSpines: !0,
            keys: !1,
            scroll: !1,
            autoPlay: !0,
            cycle: !0
          });
          r.find("a.navigation").click(function(e) {
            e.preventDefault();
            i.pauseAutoPlay = !0;
            this.href.match(/next/) ? i.next() : i.prev();
          });
          var s = i.slides.length, o = r.find(".nav-wrapper"), u = 1;
          while (u <= s && u <= 10) {
            jQuery('<span class="nav-dot">&bull;</span>').appendTo(o);
            u++;
          }
          o.find(".nav-dot").click(function() {
            var e = jQuery(this);
            o.find(".nav-dot").removeClass("active");
            e.addClass("active");
            i.pauseAutoPlay = !0;
            i.goTo(e.index() + 1);
          });
          i.options.before = function(e) {
            r.find(".nav-dot").removeClass("active");
            r.find(".nav-dot").eq(e.current - 1).addClass("active");
          };
          i.loaded(function(e) {
            r.find(".nav-dot").eq(e.current - 1).addClass("active");
          });
          r.find(".nav-wrapper").css({
            marginLeft: "-" + Math.round(r.find(".nav-wrapper").outerWidth() / 2) + "px"
          });
        } else r.text("Unable to connect to Twitter!");
      }
    });
    e("#slidedeck-sizes").length && e("#slidedeck-section-options").delegate('#slidedeck-sizes input[type="radio"]', "click", function(t) {
      this.value == "custom" ? e("#slidedeck-custom-dimensions").addClass("selected").animate({
        height: 32,
        opacity: 1
      }, 500, function() {
        SlideDeckPlugin.OptionsNav.resize();
      }).find("input").each(function() {
        this.disabled = !1;
      }) : e("#slidedeck-custom-dimensions").removeClass("selected").animate({
        height: 0,
        opacity: 0
      }, 500, function() {
        SlideDeckPlugin.OptionsNav.resize();
      }).find("input").each(function() {
        this.disabled = !0;
      });
    });
    e("#slidedeck-table-sort-select").bind("change", function(t) {
      var n = e.data(this, "$this"), r = e.data(this, "$form"), i = e.data(this, "$table");
      if (!n) {
        n = e(this);
        e.data(this, "$this", n);
      }
      if (!r) {
        r = e("#slidedeck-table-sort");
        e.data(this, "$form", r);
      }
      if (!i) {
        i = e("#slidedeck-table").find(".float-wrapper .left");
        e.data(this, "$table", i);
      }
      e.ajax({
        url: ajaxurl,
        type: "get",
        data: r.serialize(),
        success: function(e) {
          if (e != "false") {
            i.html(e);
            i.find(".tooltip").tooltipper({
              namespace: SlideDeckPlugin.namespace,
              offsetY: tooltipperOffset.Y,
              offsetX: tooltipperOffset.X
            });
          }
        }
      });
    });
    e('.wp-submenu a[href$="slidedeck2-lite.php/need-support"]').addClass("upgrade-modal").attr("rel", "need-support");
    if (e(".upgrade-modal").length) {
      var u = "upsell";
      SlideDeckPlugin.UpgradeModal = {
        addForClass: function(t) {
          e("#slidedeck-" + u + "-simplemodal")[0].className = e("#slidedeck-" + u + "-simplemodal")[0].className.replace(/for\-[a-z]+\s?/, "");
          e("#slidedeck-" + u + "-simplemodal").addClass("for-" + t);
        },
        open: function(e) {
          var t = this;
          this.modal || (this.modal = new SimpleModal({
            context: u
          }));
          this.modal.open(e);
        }
      };
      e("#wpwrap").delegate(".upgrade-modal", "click", function(t) {
        t.preventDefault();
        var n = e(this).attr("rel");
        e.get(ajaxurl + "?action=slidedeck_upsell_modal_content&feature=" + n, function(t) {
          SlideDeckPlugin.UpgradeModal.open(t);
          SlideDeckPlugin.UpgradeModal.addForClass(n);
          e("#slidedeck-upsell-simplemodal a.lens.placeholder").bind("click", function(e) {
            e.preventDefault();
          });
        });
      });
    }
    if (!SlideDeckAnonymousStats.opted) {
      SlideDeckPlugin.anonymousStatsOptinModal = new SimpleModal({
        context: "anonymous-stats",
        onComplete: function(t) {
          t.elems.modal.on("submit", "form", function(t) {
            t.preventDefault();
            e.ajax({
              type: this.getAttribute("method"),
              url: this.getAttribute("action"),
              data: e(this).serialize()
            });
            SlideDeckPlugin.anonymousStatsOptinModal.close();
          }).on("click", 'input[type="radio"]', function(t) {
            e(this).closest("form").submit();
          });
        }
      });
      e.get(ajaxurl + "?action=slidedeck_anonymous_stats_optin", function(e) {
        SlideDeckPlugin.anonymousStatsOptinModal.open(e);
      });
    }
  });
  e(window).resize(function() {
    updateTBSize();
  });
})(jQuery);

jQuery.cookie = function(e, t, n) {
  if (typeof t == "undefined") {
    var a = null;
    if (document.cookie && document.cookie !== "") {
      var f = document.cookie.split(";");
      for (var l = 0; l < f.length; l++) {
        var c = jQuery.trim(f[l]);
        if (c.substring(0, e.length + 1) == e + "=") {
          a = decodeURIComponent(c.substring(e.length + 1));
          break;
        }
      }
    }
    return a;
  }
  n = n || {};
  if (t === null) {
    t = "";
    n.expires = -1;
  }
  var r = "";
  if (n.expires && (typeof n.expires == "number" || n.expires.toUTCString)) {
    var i;
    if (typeof n.expires == "number") {
      i = new Date;
      i.setTime(i.getTime() + n.expires * 24 * 60 * 60 * 1e3);
    } else i = n.expires;
    r = "; expires=" + i.toUTCString();
  }
  var s = n.path ? "; path=" + n.path : "", o = n.domain ? "; domain=" + n.domain : "", u = n.secure ? "; secure" : "";
  document.cookie = [ e, "=", encodeURIComponent(t), r, s, o, u ].join("");
};