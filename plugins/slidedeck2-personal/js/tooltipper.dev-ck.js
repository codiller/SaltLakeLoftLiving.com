/*!
 * jQuery ToolTipper Plugin
 * 
 * Quick tooltip plugin for jQuery
 * 
 * @author dtelepathy
 * @version 1.0.1
 *//*!
Copyright 2012 digital-telepathy  (email : support@digital-telepathy.com)

This file is part of SlideDeck.

SlideDeck is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

SlideDeck is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with SlideDeck.  If not, see <http://www.gnu.org/licenses/>.
*/var ToolTipper;

(function(e) {
  ToolTipper = function(t, n) {
    var r = e(t), i = this;
    this.options = {
      namespace: "",
      speed: "fast",
      delay: 250,
      offsetX: 0,
      offsetY: 0,
      maxWidth: 350
    };
    this.options = e.extend(this.options, n);
    this.prep(r);
    e("body").delegate(".tooltip, .tooltipper", "mouseenter", function(e) {
      i.show(this);
    }).delegate(".tooltip, .tooltipper", "mouseleave", function(e) {
      i.hide(this);
    });
  };
  ToolTipper.prototype.build = function(t) {
    var n = e(t), r = e.data(t, "tooltipper-message");
    e("body").append('<span class="tooltipper ' + this.options.namespace + '" style="display:none;">' + r + "</span>");
    $tooltipper = e("body").find(".tooltipper:last");
    e.data(t, "tooltipper-tip", $tooltipper);
    e.data(t, "tooltipper-elem", n);
    e.data($tooltipper[0], "tooltipper-tip", $tooltipper);
    e.data($tooltipper[0], "tooltipper-elem", n);
    return $tooltipper;
  };
  ToolTipper.prototype.prep = function(t) {
    var n = this;
    t.each(function(n) {
      var r = t.eq(n);
      e.data(this, "tooltipper-message", this.title);
      r.removeAttr("title");
      e.data(this, "tooltipper-elem", r);
    });
  };
  ToolTipper.prototype.show = function(t) {
    var n = e.data(t, "tooltipper-tip");
    n || (n = this.build(t));
    var r = e.data(t, "tooltipper-elem");
    clearTimeout(r[0].timer);
    var i = r.offset();
    n.css("max-width", this.options.maxWidth);
    n.css({
      top: i.top + this.options.offsetY - n.outerHeight(),
      left: i.left + this.options.offsetX,
      opacity: 0,
      display: "block"
    }).stop().animate({
      top: i.top + this.options.offsetY - n.outerHeight(),
      opacity: 1
    }, this.options.speed);
  };
  ToolTipper.prototype.hide = function(t) {
    var n = this, r = e.data(t, "tooltipper-elem"), i = e.data(t, "tooltipper-tip");
    r[0].timer = setTimeout(function() {
      var e = i.offset();
      i.animate({
        top: e.top - 5,
        opacity: 0
      }, n.options.speed, function() {
        i.css({
          display: "none"
        });
      });
    }, n.options.delay);
  };
  jQuery.fn.tooltipper = function(t) {
    var n = e.data(this, "ToolTipper");
    n || (n = e.data(this, "ToolTipper", new ToolTipper(this, t)));
    return this;
  };
})(jQuery);