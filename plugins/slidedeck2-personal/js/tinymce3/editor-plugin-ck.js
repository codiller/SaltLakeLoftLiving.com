(function() {
  tinymce.PluginManager.requireLangPack("slidedeck2");
  tinymce.create("tinymce.plugins.SlideDeck2Plugin", {
    init: function(e, t) {
      e.addCommand("mceSlideDeck2", function() {
        jQuery("#add_slidedeck2").click();
        tinymce.DOM.setStyle([ "TB_overlay", "TB_window", "TB_load" ], "z-index", "999999");
      });
      e.addButton("slidedeck2", {
        title: "slidedeck2.title",
        cmd: "mceSlideDeck2",
        image: t + "/img/icon.png"
      });
      e.onNodeChange.add(function(e, t, n) {
        t.setActive("example", n.nodeName == "IMG");
      });
    },
    createControl: function(e, t) {
      return null;
    },
    getInfo: function() {
      return {
        longname: "SlideDeck 2 WordPress TinyMCE Button",
        author: "digital-telepathy",
        authorurl: "http://www.dtelepathy.com",
        infourl: "http://www.slidedeck.com",
        version: "2.0"
      };
    }
  });
  tinymce.PluginManager.add("slidedeck2", tinymce.plugins.SlideDeck2Plugin);
})();