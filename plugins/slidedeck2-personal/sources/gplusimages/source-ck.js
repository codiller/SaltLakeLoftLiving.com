(function(e) {
  window.GplusImagesSource = {
    elems: {},
    updateGplusAlbums: function() {
      var t = this;
      e.ajax({
        url: ajaxurl + "?action=update_gplus_albums&gplus_userid=" + e("#options-gplus_user_id").val(),
        type: "GET",
        success: function(t) {
          e("#gplus-user-albums").html(t).find(".fancy").fancy();
          SlideDeckPreview.ajaxUpdate();
        }
      });
    },
    initialize: function() {
      var t = this;
      this.elems.form = e("#slidedeck-update-form");
      this.slidedeck_id = e("#slidedeck_id").val();
      t.elems.form.delegate(".gplus-images-ajax-update", "click", function(e) {
        e.preventDefault();
        t.updateGplusAlbums();
      });
      this.elems.form.delegate("#options-gplus_user_id", "keydown", function(t) {
        if (13 == t.keyCode) {
          t.preventDefault();
          e(".gplus-images-ajax-update").click();
          return !1;
        }
        return !0;
      });
      if (e(".slidedeck-content-source.source-gplusimages .image-size-slider").length) {
        var n = [ 94, 110, 128, 200, 220, 288, 320, 400, 512, 576, 640, 720, 800, 912, 1024, 1152, 1280, 1440, 1600 ], r = e.inArray(parseInt(e("#options-gplus_max_image_size").val()), n);
        r == -1 && (r = 3);
        e("#gplus-image-size-slider").slider({
          value: r,
          animate: !0,
          min: 0,
          max: n.length - 1,
          step: 1,
          slide: function(t, r) {
            e(".slidedeck-content-source.source-gplusimages .gplus-image-size-slider-value").html(n[r.value] + " pixels");
            e("#options-gplus_max_image_size").val(n[r.value]);
          },
          create: function(t, i) {
            e(".slidedeck-content-source.source-gplusimages .gplus-image-size-slider-value").html(n[r] + " pixels");
          },
          change: function() {
            SlideDeckPreview.ajaxUpdate();
          }
        });
      }
    }
  };
  var t = [ "options[gplus_images_album]" ];
  for (var n in t) SlideDeckPreview.ajaxOptions.push(t[n]);
  e(document).ready(function() {
    GplusImagesSource.initialize();
  });
})(jQuery);