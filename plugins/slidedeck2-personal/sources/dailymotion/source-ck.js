(function(e) {
  window.DailymotionSource = {
    elems: {},
    updateDailymotionPlaylists: function() {
      var t = this;
      e.ajax({
        url: ajaxurl + "?action=update_dailymotion_playlists&dailymotion_username=" + e("#options-dailymotion_username").val(),
        type: "GET",
        success: function(t) {
          e("#dailymotion-user-playlists").html(t).find(".fancy").fancy();
          SlideDeckPreview.ajaxUpdate();
        }
      });
    },
    initialize: function() {
      var t = this;
      this.elems.form = e("#slidedeck-update-form");
      this.slidedeck_id = e("#slidedeck_id").val();
      this.elems.form.delegate("#add-video-field", "keydown", function(t) {
        if (13 == t.keyCode) {
          t.preventDefault();
          e(".list-of-videos-add").click();
          return !1;
        }
        return !0;
      });
      this.elems.form.delegate(".dailymotion-username-ajax-update", "click", function(e) {
        e.preventDefault();
        t.updateDailymotionPlaylists();
      });
    }
  };
  e(document).ready(function() {
    DailymotionSource.initialize();
  });
  var t = [ "options[dailymotion_playlist]" ];
  for (var n in t) SlideDeckPreview.ajaxOptions.push(t[n]);
})(jQuery);