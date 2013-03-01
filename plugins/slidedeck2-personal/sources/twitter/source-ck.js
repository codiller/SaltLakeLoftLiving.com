(function(e) {
  window.TwitterSource = {
    elems: {},
    initialize: function() {
      var t = this;
      this.elems.form = e("#slidedeck-update-form");
      this.slidedeck_id = e("#slidedeck_id").val();
      this.elems.form.delegate("#options-twitter_search_or_user-user, #options-twitter_search_or_user-search", "change", function(t) {
        switch (t.target.id) {
         case "options-twitter_search_or_user-user":
          e("li.twitter-search").hide();
          e("li.twitter-username").show();
          break;
         case "options-twitter_search_or_user-search":
          e("li.twitter-username").hide();
          e("li.twitter-search").show();
        }
      });
    }
  };
  e(document).ready(function() {
    TwitterSource.initialize();
  });
  var t = [ "options[twitter_username]", "options[twitter_q]", "options[twitter_search_or_user]", "options[useGeolocationImage]" ];
  for (var n in t) SlideDeckPreview.ajaxOptions.push(t[n]);
})(jQuery);