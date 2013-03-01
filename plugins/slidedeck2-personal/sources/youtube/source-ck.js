(function(e) {
  window.YouTubeSource = {
    elems: {},
    updateYouTubePlaylists: function() {
      var t = this;
      e.ajax({
        url: ajaxurl + "?action=update_youtube_playlists&youtube_username=" + e("#options-youtube_username").val(),
        type: "GET",
        success: function(t) {
          e("#youtube-user-playlists").html(t).find(".fancy").fancy();
          SlideDeckPreview.ajaxUpdate();
        }
      });
    },
    initialize: function() {
      var t = this;
      this.elems.form = e("#slidedeck-update-form");
      this.slidedeck_id = e("#slidedeck_id").val();
      this.elems.form.delegate(".youtube-username-ajax-update", "click", function(e) {
        e.preventDefault();
        t.updateYouTubePlaylists();
      });
      this.elems.form.delegate("#options-youtube_username", "keydown", function(t) {
        if (13 == t.keyCode) {
          t.preventDefault();
          e(".youtube-username-ajax-update").click();
          return !1;
        }
        return !0;
      });
      this.elems.form.delegate("#options-search_or_user-user, #options-search_or_user-search", "change", function(t) {
        switch (t.target.id) {
         case "options-search_or_user-user":
          e("li.youtube-search").hide();
          e("li.youtube-username").show();
          break;
         case "options-search_or_user-search":
          e("li.youtube-username").hide();
          e("li.youtube-search").show();
        }
      });
    }
  };
  e(document).ready(function() {
    YouTubeSource.initialize();
  });
  var t = [ "options[youtube_playlist]", "options[youtube_q]" ];
  for (var n in t) SlideDeckPreview.ajaxOptions.push(t[n]);
})(jQuery);