var sd_layoutoptions = {};

(function(e, t, n) {
  t.SlideDeckSourceCustom = {
    elems: {},
    editId: null,
    currentModal: "",
    addSlide: function(t) {
      var n = this, r = t.href, i = "";
      if (t.href.match(/slide_id=([\d]+)/)) {
        this.editId = t.href.match(/slide_id=([\d]+)/)[1];
        i = "change-slide-type";
      } else {
        this.editId = null;
        i = "add-slide";
      }
      if (this.currentModal == t) {
        this.close();
        return !1;
      }
      e.get(r, function(e) {
        n.open(e, t, i);
      });
    },
    cleanup: function() {
      this.elems.slideEditor.removeClass("add-slide change-slide-type edit-slide");
      this.elems.contentControl.find(".slide").removeClass("loading");
      this.currentModal = "";
    },
    close: function() {
      this.cleanup();
      this.elems.slideEditor.hide();
    },
    deleteSlide: function(t) {
      var n = this, r = e(t);
      SlideDeckSourceCustom.close();
      e.ajax({
        url: t.href,
        type: "POST",
        success: function(t) {
          t == "true" && r.closest(".slide").fadeOut(250, function() {
            e(this).remove();
            var t = SlideDeckSourceCustom.elems.contentControl.find(".slide");
            t.length == 1 ? t.find(".remove").hide() : t.find(".remove").show();
            n.renumber();
            SlideDeckPreview.ajaxUpdate();
          });
        }
      });
    },
    editSlide: function(t) {
      var n = this, r = e(t), i = t.href, s = e.data(t, "$loading"), o = e.data(t, "$slide");
      if (this.currentModal == t) {
        this.close();
        return !1;
      }
      if (!o) {
        o = r.closest("li.slide");
        e.data(t, "$slide", o);
      }
      if (!s) {
        o.append('<span class="slide-loading"></span>');
        s = o.find(".slide-loading");
        e.data(t, "$loading", s);
      }
      o.addClass("loading");
      e.ajax({
        url: i,
        cache: !1,
        success: function(e) {
          n.open(e, t, "edit-slide");
        }
      });
    },
    renumber: function() {
      var e = this.elems.contentControl.find(".slide");
      e.each(function(t) {
        e.eq(t).find(".slide-number").text(t + 1);
      });
    },
    updateContentControl: function(t, n) {
      var r = this;
      if (typeof t != "undefined") {
        this.elems.contentControl.html(t);
        SlideDeckPreview.ajaxUpdate();
      }
      this.elems.contentControl.find(".slides-sortable").sortable({
        items: "li.slide",
        start: function(e, t) {
          SlideDeckSourceCustom.close();
        },
        update: function(t, n) {
          var r = e("#slidedeck-update-form").serialize();
          r = r.replace(/action\=([a-zA-Z0-9\-_+]+)/, "action=slidedeck_update_slide_order");
          r = r.replace(/\&_wpnonce\=([a-zA-Z0-9\-_+]+)/, "");
          e.ajax({
            url: ajaxurl,
            data: r,
            type: "POST",
            success: function(e) {
              SlideDeckPreview.ajaxUpdate();
            }
          });
          var i = n.item.parent(), s = i.find("li.slide");
          for (var o = 0; o < s.length; o++) e(s[o]).find(".slide-number").html(o + 1);
        }
      });
      typeof n == "function" && n();
    },
    open: function(n, r, i) {
      var s = e(r), i = i || "";
      if (!s.hasClass("thumbnail") && r.href.match(/slide_id=([\d]+)/)) var o = r.href.match(/slide_id=([\d]+)/)[1], s = this.elems.contentControl.find(".slides-sortable .slide-id-" + o + " .thumbnail");
      var u = s.offset();
      this.elems.slideEditor.html('<span class="hanging-chad"></span>' + n).css({
        top: u.top,
        left: "-999em"
      }).show().find(".fancy").fancy();
      this.cleanup();
      this.elems.slideEditor.addClass(i);
      var a = this.elems.slideEditor.width(), f = e(t).width();
      if (u.left + a > f) {
        var l = u.left + a - f - 10;
        u.left = u.left - l;
        this.elems.slideEditor.find(".hanging-chad").css({
          marginLeft: l
        });
      }
      this.elems.slideEditor.css({
        left: u.left
      });
      var c = tinyMCEPreInit.mceInit.slidedeck;
      c.mode = "specific_textareas";
      c.editor_selector = "slidedeck_mceEditor";
      tinyMCE.init(c);
      this.currentModal = r;
    },
    initialize: function() {
      var t = this;
      this.elems.contentControl = e("#slidedeck-content-control");
      if (!this.elems.contentControl.hasClass("custom-slidedeck")) return !1;
      this.elems.slideEditor = e("#slidedeck-custom-slide-editor");
      if (this.elems.slideEditor.length < 1) {
        e("body").append('<div id="slidedeck-custom-slide-editor"></div>');
        this.elems.slideEditor = e("#slidedeck-custom-slide-editor");
      }
      this.elems.contentControl.delegate(".slide .thumbnail", "click", function(e) {
        e.preventDefault();
        t.editSlide(this);
      }).delegate(".slide .remove", "click", function(e) {
        e.preventDefault();
        confirm("Are you sure you want to delete this slide?") && t.deleteSlide(this);
      }).delegate(".add-new-slide a", "click", function(e) {
        e.preventDefault();
        t.addSlide(this);
      });
      SlideDeckPlugin.UpgradeModal = {
        open: function(e) {
          var t = this;
          this.modal || (this.modal = new SimpleModal({
            context: "professional-upsell"
          }));
          this.modal.open(e);
        }
      };
      this.elems.slideEditor.delegate(".cancel", "click", function(e) {
        e.preventDefault();
        this.href.match(/slide_id=([\d]+)/) ? t.editSlide(this) : t.close();
      }).delegate(".slide-type-header .change", "click", function(e) {
        e.preventDefault();
        t.addSlide(this);
      }).delegate("#slidedeck-custom-slide-editor-form", "submit", function(n) {
        n.preventDefault();
        var r = e(this);
        e.ajax({
          url: r.attr("action"),
          data: r.serialize(),
          type: r.attr("method"),
          success: function(e) {
            t.updateContentControl(e);
            t.close();
          }
        });
      }).delegate("#slidedeck-choose-slide-type form", "submit", function(n) {
        n.preventDefault();
        var r = e(this);
        e.ajax({
          url: r.attr("action"),
          data: r.serialize(),
          type: r.attr("method"),
          success: function(e) {
            t.updateContentControl(e, function() {
              var e = SlideDeckSourceCustom.elems.contentControl.find(".slide:last .thumbnail");
              SlideDeckSourceCustom.editId != null && (e = SlideDeckSourceCustom.elems.contentControl.find(".slide-id-" + SlideDeckSourceCustom.editId + " .thumbnail"));
              e.click();
            });
          }
        });
      }).delegate('#slidedeck-choose-slide-type form input[type="radio"]', "click", function(t) {
        e(this).closest("form").submit();
      }).delegate("#slidedeck-choose-slide-type form li.slide-type.disabled label", "click", function(t) {
        t.preventDefault();
        e.get(ajaxurl + "?action=slidedeck_upsell_modal_content&feature=slide-types-" + e(this).attr("data-for"), function(e) {
          SlideDeckPlugin.UpgradeModal.open(e);
        });
      }).delegate('.slide-content-fields li.layout input[type="radio"]', "click", function(n) {
        var r = sd_layoutoptions[this.value];
        t.elems.slideEditor.find(".slide-content-fields li.layout label").removeClass("active-layout");
        e(this).closest("li.layout label").addClass("active-layout");
        e(".slide-content-fields").find("li.option").not(r.fields).slideUp();
        e(".slide-content-fields").find(r.fields).slideDown();
        if (r.positions) {
          t.elems.slideEditor.find("li.text-position strong").html(r.proper + " Position");
          t.elems.slideEditor.find("li.text-position label input").parent("label").hide().removeClass("on");
          for (var i in r.positions) {
            var s = r.positions[i];
            t.elems.slideEditor.find("li.text-position label input[value=" + s + "]").parent("label").show();
            (s === "right" || s === "bottom") && t.elems.slideEditor.find("li.text-position label input[value=" + s + "]").click().parent("label").addClass("on");
          }
          t.elems.slideEditor.find("li.text-position").slideDown();
        }
      }).delegate('li.text-position label input[type="radio"]', "click", function(n) {
        t.elems.slideEditor.find(".slide-content-fields li.text-position label").removeClass("active-position");
        e(this).closest("label").addClass("active-position");
      });
      this.elems.contentControl.find(".slide.empty-slide").length && this.addSlide(this.elems.contentControl.find(".slide.empty-slide .thumbnail")[0]);
      this.updateContentControl();
    }
  };
  e(function() {
    SlideDeckSourceCustom.initialize();
  });
})(jQuery, window, null);