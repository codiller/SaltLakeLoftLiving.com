(function(e) {
  window.FlickrSource = {
    elems: {},
    initialize: function() {
      var t = this;
      this.elems.form = e("#slidedeck-update-form");
      this.slidedeck_id = e("#slidedeck_id").val();
      this.elems.form.delegate("#flickr-add-tag-field", "keydown", function(t) {
        if (13 == t.keyCode) {
          t.preventDefault();
          e(".flickr-tag-add").click();
          return !1;
        }
        return !0;
      });
      t.elems.form.delegate(".flickr-tag-add", "click", function(t) {
        t.preventDefault();
        var n = e("#flickr-add-tag-field").val();
        if (n) {
          e("#flickr-add-tag-field").val("");
          var r = n.split(",");
          for (var i = 0; i < r.length; i++) {
            var s = e.trim(r[i]), o = "<span>";
            o += '<a href="#delete" class="delete">X</a> ';
            o += s;
            o += '<input type="hidden" name="flickr_tags[]" value="' + s + '" />';
            o += "</span> ";
            e("#flickr-tags-wrapper").append(o);
            SlideDeckPreview.ajaxUpdate();
          }
        }
      });
      t.elems.form.delegate("#flickr-tags-wrapper .delete", "click", function(n) {
        n.preventDefault();
        e(this).parents("span").remove();
        t.elems.form.timer && clearTimeout(t.elems.form.timer);
        t.elems.form.timer = setTimeout(function() {
          SlideDeckPreview.ajaxUpdate();
        }, 500);
      });
      t.elems.form.delegate("#flickr-tags-wrapper .delete", "click", function(n) {
        n.preventDefault();
        e(this).parents("span").remove();
        t.elems.form.timer && clearTimeout(t.elems.form.timer);
        t.elems.form.timer = setTimeout(function() {
          SlideDeckPreview.ajaxUpdate();
        }, 500);
      });
      t.elems.form.delegate("#options-flickr_user_or_group-user, #options-flickr_user_or_group-group", "change", function(e) {
        switch (e.target.id) {
         case "options-flickr_user_or_group-group":
          t.elems.form.find("li.add-button-li").hide();
          t.elems.form.find("li.favorites").hide();
          break;
         case "options-flickr_user_or_group-user":
          t.elems.form.find("li.add-button-li").show();
          t.elems.form.find("li.favorites").show();
        }
      });
    }
  };
  var t = [ "options[flickr_tags_mode]", "options[flickr_recent_or_favorites]" ];
  for (var n in t) SlideDeckPreview.ajaxOptions.push(t[n]);
  e(document).ready(function() {
    FlickrSource.initialize();
  });
})(jQuery);