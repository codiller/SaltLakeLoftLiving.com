(function(e) {
  var t = [ "options[navigation-type]", "options[frame]", "options[text-position]", "options[nav-arrow-style]", "options[deck-arrows]" ];
  for (i = 0; i < t.length; i++) SlideDeckPreview.ajaxOptions.push(t[i]);
  SlideDeckPreview.updates["options[text-position]"] = function(t, n) {
    if (e("#options-navigation-style").val() == "nav-default") {
      var r = e("#options-navigation-position");
      switch (n) {
       case "title-pos-top":
        r.val("nav-pos-bottom");
        break;
       case "title-pos-bottom":
        r.val("nav-pos-top");
        break;
       case "title-pos-left":
        r.val("nav-pos-right");
        break;
       case "title-pos-right":
        r.val("nav-pos-left");
      }
    }
    SlideDeckPreview.ajaxUpdate();
  };
  SlideDeckPreview.updates["options[navigation-position]"] = function(t, n) {
    if (e("#options-navigation-style").val() == "nav-default") {
      var r = e("#options-text-position");
      switch (n) {
       case "nav-pos-top":
        r.val("title-pos-bottom");
        break;
       case "nav-pos-bottom":
        r.val("title-pos-top");
        break;
       case "nav-pos-left":
        r.val("title-pos-right");
        break;
       case "nav-pos-right":
        r.val("title-pos-left");
      }
    }
    SlideDeckPreview.ajaxUpdate();
  };
  SlideDeckPreview.updates["options[navigation-style]"] = function(t, n) {
    if (e("#options-navigation-style").val() == "nav-default") {
      var r = e("#options-navigation-position").val(), i = e("#options-text-position");
      switch (r) {
       case "nav-pos-bottom":
        i.val("title-pos-top");
        break;
       case "nav-pos-top":
        i.val("title-pos-bottom");
        break;
       case "nav-pos-right":
        i.val("title-pos-left");
        break;
       case "nav-pos-left":
        i.val("title-pos-right");
      }
    }
    SlideDeckPreview.ajaxUpdate();
  };
  SlideDeckPreview.updates["options[nav-opaque]"] = function(e, t) {
    t = t == 1 ? !0 : !1;
    t ? SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + "nav-opaque") : SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + "nav-opaque");
  };
  SlideDeckPreview.updates["options[arrow-style]"] = function(e, t) {
    e.find("option").each(function() {
      this.value != t ? SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + this.value) : SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + this.value);
    });
  };
  SlideDeckPreview.updates["options[text-color]"] = function(e, t) {
    e.find("option").each(function() {
      this.value != t ? SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix + this.value) : SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix + this.value);
    });
  };
})(jQuery);