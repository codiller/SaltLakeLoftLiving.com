(function(e) {
  e(document).ready(function() {
    e("#options-feedUrl").bind("keyup", function(e) {
      e.keyCode == 13 && e.preventDefault();
    });
  });
  var t = [ "options[validateImages]", "options[imageSource]", "options[use-custom-post-excerpt]" ];
  for (var n in t) SlideDeckPreview.ajaxOptions.push(t[n]);
})(jQuery);