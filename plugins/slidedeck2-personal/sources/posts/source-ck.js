(function(e) {
  window.PostsSource = {
    elems: {},
    updateTaxonomies: function(t, n) {
      var r = this;
      e.ajax({
        url: ajaxurl + "?action=slidedeck_available_filters&post_type=" + t + "&slidedeck=" + this.slidedeck_id + "&filter_by_tax=" + n,
        type: "GET",
        success: function(t) {
          r.elems.filters.html(t);
          r.elems.taxonomyLoading.hide();
          r.elems.filters.find("input.fancy").fancy();
          var n = r.elems.filters.find('input[value="1"]:checked');
          if (n.length) {
            var i = e('[name="options[post_type]"]').find("option:selected").val();
            for (var s = 0; s < n.length; s++) {
              var o = r.getTaxonomySlugFromNameAttr(e(n[s]).attr("name"));
              r.updateTerms(i, o);
            }
          }
        }
      });
    },
    checkPopularTermList: function() {
      var t = this.elems.terms.find('.tabs-panel[id$="-all"] li'), n = this.elems.terms.find('.tabs-panel[id$="-pop"] li');
      for (var r = 0; r < n.length; r++) {
        var i = e(n[r]).find("input");
        t.find('input[value="' + i.val() + '"]').is(":checked") && e(i).attr("checked", !0);
      }
    },
    rightSideModules: function() {
      var e = this, t = e.elems.rightSide.find("div.taxonomy").length, n = e.elems.rightSide.find("#any-or-all-taxonomies"), r = e.elems.rightSide.find(".trailblazer");
      if (t == 0) {
        n.hide();
        r.show();
      } else if (t > 1) {
        n.show();
        r.hide();
      } else {
        n.hide();
        r.hide();
      }
    },
    updateTerms: function(t, n) {
      var r = this;
      e.ajax({
        url: ajaxurl + "?action=slidedeck_available_terms&post_type=" + t + "&slidedeck=" + this.slidedeck_id + "&taxonomy=" + n,
        type: "GET",
        success: function(t) {
          r.elems.terms.find("." + n).remove();
          r.elems.terms.append(t);
          r.elems.termsLoading.hide();
          r.elems.terms.find(".postbox.tagsdiv").each(function() {
            r.tagBoxInit(e(this));
          });
          r.checkPopularTermList();
          r.rightSideModules();
        }
      });
    },
    tagBoxInit: function(t) {
      if (!t.hasClass("initialized")) {
        t.addClass("initialized");
        var n = tagBox, r = t.find("div.ajaxtag");
        t.find(".tagsdiv").each(function() {
          tagBox.quickClicks(this);
        });
        t.find("input.tagadd", r).click(function() {
          n.flushTags(e(this).closest(".tagsdiv"));
        });
        t.find("div.taghint", r).click(function() {
          e(this).css("visibility", "hidden").parent().siblings(".newtag").focus();
        });
        t.find("input.newtag", r).blur(function() {
          this.value == "" && e(this).parent().siblings(".taghint").css("visibility", "");
        }).focus(function() {
          e(this).parent().siblings(".taghint").css("visibility", "hidden");
        }).keyup(function(t) {
          if (13 == t.which) {
            tagBox.flushTags(e(this).closest(".tagsdiv"));
            return !1;
          }
        }).keypress(function(e) {
          if (13 == e.which) {
            e.preventDefault();
            return !1;
          }
        }).each(function() {
          var t = e(this).closest("div.tagsdiv").attr("id");
          e(this).suggest(ajaxurl + "?action=ajax-tag-search&tax=" + t, {
            delay: 500,
            minchars: 2,
            multiple: !0,
            multipleSep: ","
          });
        });
        t.find("a.tagcloud-link").click(function() {
          tagBox.get(e(this).attr("id"));
          e(this).unbind().click(function() {
            e(this).siblings(".the-tagcloud").toggle();
            return !1;
          });
          return !1;
        });
      }
    },
    showHideRightSide: function() {
      var t = this, n = e('[name="options[filter_by_tax]"]:checked').val();
      n || (n = 0);
      if (n) {
        t.elems.contentSource.addClass("open");
        t.elems.rightSide.show();
      } else {
        t.elems.contentSource.removeClass("open");
        t.elems.rightSide.hide();
      }
    },
    getTaxonomySlugFromNameAttr: function(e) {
      var t = e.match(/\[([a-zA-Z\-_]+)\]$/);
      return typeof t[1] != "undefined" ? t[1] : !1;
    },
    initialize: function() {
      var t = this;
      this.elems.form = e("#slidedeck-update-form");
      this.elems.filters = e("#slidedeck-filters");
      this.elems.terms = e("#slidedeck-terms");
      this.elems.leftSide = e(".slidedeck-content-source.source-posts #content-source-posts .left");
      this.elems.rightSide = e(".slidedeck-content-source.source-posts #content-source-posts .right");
      this.elems.contentSource = this.elems.leftSide.closest(".slidedeck-content-source");
      this.elems.taxonomyLoading = t.elems.leftSide.find(".slidedeck-ajax-loading");
      this.elems.termsLoading = t.elems.rightSide.find(".slidedeck-ajax-loading");
      this.elems.preferredImageSizeRow = this.elems.form.find("#preferred-image-size-row");
      this.slidedeck_id = e("#slidedeck_id").val();
      t.checkPopularTermList();
      this.elems.form.delegate("#options-postsImageSource", "change", function(n) {
        var r = e(this).val();
        switch (r) {
         case "thumbnail":
         case "gallery":
          t.elems.preferredImageSizeRow.slideDown();
          break;
         default:
          t.elems.preferredImageSizeRow.slideUp();
        }
      });
      this.elems.form.delegate('[name="options[filter_by_tax]"], [name="options[post_type]"]', "change", function(n) {
        var r = e('[name="options[post_type]"]').find("option:selected").val(), i = e('[name="options[filter_by_tax]"]:checked').val();
        i ? t.elems.taxonomyLoading.show() : i = 0;
        t.showHideRightSide();
        t.elems.terms.find(".taxonomy").remove();
        t.elems.filters.find("ul").remove();
        t.updateTaxonomies(r, i);
        t.rightSideModules();
      });
      this.elems.form.delegate(".category-tabs li a", "click", function(n) {
        n.preventDefault();
        var r = e(this).attr("href"), i = t.getTaxonomySlugFromNameAttr(e(this).parents(".categorydiv").attr("name"));
        e(this).parent().addClass("tabs").siblings("li").removeClass("tabs");
        e("#" + i + "-tabs").siblings(".tabs-panel").hide();
        e(r).show();
        return !1;
      });
      this.elems.form.delegate(".categorydiv input", "click", function(n) {
        var r = e(this).val(), i = e(this).is(":checked"), s = t.elems.form.find('input[value="' + r + '"]');
        s.attr("checked", i);
      });
      this.elems.form.delegate("#slidedeck-filters input", "change", function(n) {
        var r = e('[name="options[post_type]"]').find("option:selected").val(), i = t.getTaxonomySlugFromNameAttr(e(this).attr("name")), s = this.value;
        s = s == 1 ? !0 : !1;
        if (s) {
          t.elems.termsLoading.show();
          t.updateTerms(r, i);
        } else t.elems.terms.find("." + i).remove();
        t.rightSideModules();
      });
      t.showHideRightSide();
      t.elems.terms.find(".postbox.tagsdiv").each(function() {
        t.tagBoxInit(e(this));
      });
    }
  };
  e(document).ready(function() {
    PostsSource.initialize();
  });
  var t = [ "options[validateImages]", "options[postsImageSource]", "options[preferredImageSize]", "options[use-custom-post-excerpt]" ];
  for (var n in t) SlideDeckPreview.ajaxOptions.push(t[n]);
})(jQuery);