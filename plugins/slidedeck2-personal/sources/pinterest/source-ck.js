(function(e) {
  window.PinterestSource = {
    elems: {},
    initialize: function() {}
  };
  var t = [ "options[pinterest_url]" ];
  for (var n in t) SlideDeckPreview.ajaxOptions.push(t[n]);
  e(document).ready(function() {
    PinterestSource.initialize();
  });
})(jQuery);