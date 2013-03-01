(function(e) {
  window.VimeoSource = {
    elems: {},
    updateVimeoPlaylists: function() {
      var t = this;
      e.ajax({
        url: ajaxurl + "?action=update_vimeo_playlists&vimeo_username=" + e("#options-vimeo_username").val(),
        type: "GET",
        success: function(t) {
          e("#vimeo-user-playlists").html(t).find(".fancy").fancy();
          SlideDeckPreview.ajaxUpdate();
        }
      });
    },
    updateVideoThumbnail: function(t, n) {
      var r = this;
      e.ajax({
        url: ajaxurl + "?action=update_video_thumbnail&video_url=" + t,
        type: "GET",
        success: function(e) {
          e.indexOf("invalid") != -1 ? n.find(".thumbnail").css({
            backgroundImage: "url('" + e + "')"
          }) : n.find(".thumbnail").removeClass("loading").css({
            backgroundImage: "url('" + e + "')"
          });
        }
      });
    },
    initialize: function() {
      var t = this;
      this.elems.form = e("#slidedeck-update-form");
      this.slidedeck_id = e("#slidedeck_id").val();
      this.elems.form.delegate(".vimeo-username-ajax-update", "click", function(e) {
        e.preventDefault();
        t.updateVimeoPlaylists();
      });
    }
  };
  e(document).ready(function() {
    VimeoSource.initialize();
  });
  var t = [ "options[vimeo_album]" ];
  for (var n in t) SlideDeckPreview.ajaxOptions.push(t[n]);
})(jQuery);