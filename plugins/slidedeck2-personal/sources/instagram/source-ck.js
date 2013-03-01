(function(e) {
  e(window).bind("load.instagram_token", function() {
    if (document.location.search.match(/&token=(.+)/)) {
      SlideDeckPreview.ajaxUpdate();
      e(window).unbind("load.instagram_token");
    }
  });
  var t = [ "options[instagram_username]", "options[instagram_access_token]", "options[instagram_recent_or_likes]" ];
  for (var n in t) SlideDeckPreview.ajaxOptions.push(t[n]);
  e("#slidedeck-content-control").delegate("#get-instagram-access-token-link", "click", function(t) {
    t.preventDefault();
    var n = e("#slidedeck-update-form").serialize();
    n = n.replace(/_wpnonce([^\=]*)\=([a-zA-Z0-9]+)/gi, "");
    n = n.replace(/action\=([^\&]+)/, "");
    e.ajax({
      url: this.href,
      data: n,
      dataType: "JSON",
      type: "post",
      success: function(e) {
        if (e.valid == 1) {
          window.onbeforeunload = null;
          document.location.href = e.url;
        }
      }
    });
  });
})(jQuery);