/**
 * Custom Media Library modal window interaction
 * 
 * @package SlideDeck
 * @author dtelepathy
 * @version 1.0.0
 */var SlideDeckMediaLibrary = function() {
  this.singleAddClass = "add-to-slidedeck-button";
  this.addAllId = "slidedeck-add-all-images";
  this.addSelectedId = "slidedeck-add-selected-images";
  this.addMultipleCheckboxClass = "slidedeck-add-multiple";
  this.buttons = {};
  this.tab = "upload";
  this.slideId = -1;
  this.imageContainer;
  this.contentSource;
  this.__construct();
};

(function(e, t, n) {
  SlideDeckMediaLibrary.prototype.__construct = function() {
    var t = this;
    if (!parent.document.location.search.match(/page\=slidedeck2\.php/)) return !1;
    if (parent.jQuery('input[name="source[]"]').val() != "custom") return !1;
    this.isBulkUpload = document.location.search.match(/slidedeck_bulkupload\=1/) != n;
    e(document).ready(function() {
      t.initialize();
    });
  };
  SlideDeckMediaLibrary.prototype.addImage = function(t) {
    var n = this, r = "action=slidedeck_slide_add_from_medialibrary";
    r += "&slide_id=" + this.slideId;
    r += "&media_id=" + t;
    r += "&_wpnonce=" + _medialibrary_nonce;
    e.ajax({
      url: ajaxurl,
      data: r,
      dataType: "json",
      success: function(e) {
        if (e.valid === !0) {
          var t = parent.jQuery("#slidedeck-custom-slide-editor-form").find(".sd-flyout-thumbnail"), n = e.filename.length > 50 ? e.filename.substr(0, 50) + "&hellip;" : e.filename;
          t.find("img").attr("src", e.media_meta.src[0]);
          t.find(".label").html(n);
          t.slideDown(500);
          parent.jQuery("#sd-image-upload-container, #sd-image-upload, #slidedeck-custom-slide-editor-form .select-source").slideUp(500);
          parent.tb_remove();
        }
      }
    });
  };
  SlideDeckMediaLibrary.prototype.addImages = function(t) {
    var n = this, r = "action=slidedeck_slide_bulk_upload";
    r += "&slidedeck=" + this.slidedeckId;
    for (var i = 0; i < t.length; i++) r += "&media[]=" + t[i];
    r += "&_wpnonce=" + _medialibrary_nonce;
    e.ajax({
      url: ajaxurl,
      type: "post",
      data: r,
      dataType: "json",
      success: function(e) {
        if (e.valid === !0) {
          parent.SlideDeckSourceCustom.updateContentControl(e.html);
          parent.SlideDeckSourceCustom.close();
          parent.tb_remove();
        }
      }
    });
  };
  SlideDeckMediaLibrary.prototype.bind = function() {
    var t = this;
    e("body").delegate("." + this.singleAddClass, "click", function(n) {
      n.preventDefault();
      var r = e(this).val();
      if (isNaN(r)) {
        r = e.data(this, "mediaId");
        t.addImages([ r ]);
      } else t.addImage(r);
    });
    e("#" + this.addAllId).bind("click", function(n) {
      n.preventDefault();
      var r = [];
      e("." + t.singleAddClass).each(function(t) {
        var n = e.data(this, "mediaId");
        r.push(n);
      });
      t.addImages(r);
    });
    e("#" + this.addSelectedId).bind("click", function(n) {
      n.preventDefault();
      var r = [];
      e("." + t.addMultipleCheckboxClass).each(function(e) {
        this.checked && r.push(this.value);
      });
      t.addImages(r);
    });
  };
  SlideDeckMediaLibrary.prototype.initialize = function() {
    var t = document.location.search.match(/tab\=([a-zA-Z0-9\-_]+)/);
    t && (this.tab = t[1]);
    this.isBulkUpload ? this.initializeBulkUpload() : this.initializeSingleChoice();
    e("head").append('<style type="text/css">#gallery-settings,#save-all,#gallery-form table.widefat,#sort-buttons,#save,#filter>.subsubsub,.menu_order,.media-item table.describe > tbody tr[class] {display:none !important;}</style>');
    switch (this.tab) {
     case "upload":
     case "type":
      this.tabUpload();
      break;
     case "gallery":
     case "library":
      this.tabLibrary();
    }
  };
  SlideDeckMediaLibrary.prototype.initializeSingleChoice = function() {
    this.imageContainer = parent.jQuery("#slidedeck-medialibrary-images");
    this.contentSource = parent.jQuery("#slidedeck-content-source");
    this.slideId = document.location.search.match(/slide_id=([0-9]+)/)[1];
    e("#filter").append('<input id="slide_id" type="hidden" name="slide_id" value="' + this.slideId + '" />');
    this.slidedeckId = document.location.search.match(/post_id=([0-9]+)/)[1];
    this.addSlideDeckUIField("slidedeck_custom");
    e("#media-upload-header").remove();
  };
  SlideDeckMediaLibrary.prototype.initializeBulkUpload = function() {
    this.slidedeckId = document.location.search.match(/post_id=([0-9]+)/)[1];
    this.addSlideDeckUIField("slidedeck_bulkupload");
    e("#media-upload-header").find("#tab-type_url").remove();
  };
  SlideDeckMediaLibrary.prototype.addSlideDeckUIField = function(t) {
    e("#slidedeck_ui").remove();
    e("#filter").append('<input id="slidedeck_ui" type="hidden" name="' + t + '" value="1" />');
  };
  SlideDeckMediaLibrary.prototype.replaceButton = function(t) {
    var n = e(t), r = n.attr("id"), i = r.match(/\[(\d+)\]/)[1];
    n.replaceWith('<input type="hidden" id="' + r + '" class="add-to-slidedeck-button" value="Add to SlideDeck" />');
    e.data(document.getElementById(r), "mediaId", i);
  };
  SlideDeckMediaLibrary.prototype.tabLibrary = function() {
    var t = this, n = e("#media-items"), r = n.find('input[type="submit"]');
    r.each(function(e) {
      t.replaceButton(this);
    });
    n.find(".toggle.describe-toggle-on").each(function() {
      var n = e(this), r = n.closest(".media-item").attr("id").split("-")[2];
      t.isBulkUpload ? n.before('<input type="checkbox" value="' + r + '" class="' + t.addMultipleCheckboxClass + '" style="float:right;margin:12px 15px 0 5px;" />') : n.before('<button value="' + r + '" class="' + t.singleAddClass + '" style="float:right;margin:12px 15px 0 5px;">Add to SlideDeck</button>');
    });
    if (this.isBulkUpload) {
      n.find(".media-item:first-child").before('<p style="margin:5px;text-align:right;"><label style="margin-right:8px;font-weight:bold;font-style:italic;">Select All to add to SlideDeck <input type="checkbox" id="slidedeck-add-multiple-select-all" style="margin-left:5px;" /></label></p>');
      e("#slidedeck-add-multiple-select-all").bind("click", function(e) {
        var r = this;
        n.find("." + t.addMultipleCheckboxClass).each(function() {
          this.checked = r.checked;
        });
      });
      e(".ml-submit").append('<a href="#" id="' + this.addSelectedId + '" class="button">Add Selected to SlideDeck</a>');
    }
    this.bind();
  };
  SlideDeckMediaLibrary.prototype.tabUpload = function() {
    e(".savebutton.ml-submit").append('<a href="#" id="' + this.addAllId + '" class="button" style="margin-left: 10px;">Add all to SlideDeck</a>');
    new this.Watcher("image-form");
    this.bind();
  };
  SlideDeckMediaLibrary.prototype.Watcher = function(e) {
    var t = this;
    this.el = document.getElementById(e);
    this.getButtons = function() {
      var e = t.el.getElementsByTagName("input"), n = 0, r = [];
      for (var i in e) e[i].type == "submit" && e[i].id.match(/send\[(\d+)\]/) && r.push(e[i]);
      return r;
    };
    this.checker = function() {
      var e = t.getButtons();
      for (var n in e) SlideDeckMediaLibrary.prototype.replaceButton(e[n]);
    };
    this.interval = setInterval(this.checker, 100);
  };
  new SlideDeckMediaLibrary;
})(jQuery, window, null);