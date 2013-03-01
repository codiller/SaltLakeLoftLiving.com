/*!
 * jQuery Simple Modal plugin
 * 
 * A simple modal library
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
*/var SimpleModal = function(e) {
  this.options = {
    namespace: "slidedeck",
    context: "",
    hideOnOverlayClick: !0,
    hideOnEscape: !0,
    speedIn: 500,
    speedOut: 500,
    onComplete: null,
    onCleanup: null,
    onClosed: null
  };
  this.elems = {};
  this.initialize(e);
  return this;
};

(function(e) {
  SimpleModal.prototype._maskId = function() {
    var e = [];
    this.options.namespace !== "" && e.push(this.options.namespace);
    this.options.context !== "" && e.push(this.options.context);
    e.push("simplemodal-mask");
    return e.join("-");
  };
  SimpleModal.prototype._modalId = function() {
    var e = [];
    this.options.namespace !== "" && e.push(this.options.namespace);
    this.options.context !== "" && e.push(this.options.context);
    e.push("simplemodal");
    return e.join("-");
  };
  SimpleModal.prototype.build = function() {
    var t = this, n = this._modalId(), r = this._maskId();
    this.elems.modal = e("#" + n);
    this.elems.mask = e("#" + r);
    if (this.elems.modal.length < 1) {
      e("body").append('<div id="' + n + '" class="simplemodal" style="display:none;" />');
      this.elems.modal = jQuery("#" + n);
    }
    if (this.elems.mask.length < 1) {
      e("body").append('<div id="' + r + '" class="simplemodal-mask" style="display:none;"><div id="' + r + '-inner" class="simplemodal-mask-inner"></div></div>');
      this.elems.mask = e("#" + r);
      this.elems.mask.bind("click", function() {
        t.options.hideOnOverlayClick === !0 && t.close();
      });
    }
    this.position = this.elems.modal.css("position");
    e(document).bind("keyup", function(e) {
      e.keyCode == 27 && t.options.hideOnEscape === !0 && t.close();
    });
  };
  SimpleModal.prototype.close = function() {
    var e = this;
    typeof this.options.onCleanup == "function" && this.options.onCleanup(this);
    this.elems.mask.fadeOut(this.options.speedOut);
    this.elems.modal.fadeOut(this.options.speedOut, function() {
      e.elems.modal.css({
        "-webkit-transition": "",
        "-moz-transition": "",
        "-o-transition": "",
        transition: ""
      });
      typeof e.options.onClosed == "function" && e.options.onClosed(e);
    });
    this.elems.modal.removeClass("open");
  };
  SimpleModal.prototype.initialize = function(t) {
    var n = this;
    this.options = e.extend(this.options, t);
    this.elems.$window = e(window);
    this.build();
    this.elems.$window.resize(function() {
      n.reposition();
    });
  };
  SimpleModal.prototype.open = function(e) {
    var t = this;
    this.elems.modal.html(e);
    this.elems.mask.fadeIn(this.options.speedIn);
    this.elems.modal.fadeIn(this.options.speedIn, function() {
      t.elems.modal.css({
        "-webkit-transition": "top 0.5s ease-in-out",
        "-moz-transition": "top 0.5s ease-in-out",
        "-o-transition": "top 0.5s ease-in-out",
        transition: "top 0.5s ease-in-out"
      });
    });
    this.reposition();
    this.elems.modal.addClass("open");
    typeof this.options.onComplete == "function" && this.options.onComplete(this);
  };
  SimpleModal.prototype.reposition = function() {
    var t = this.elems.modal.outerHeight(), n = this.elems.$window.height(), r = window.scrollTop || window.scrollY, i = this.elems.modal.offset().top, s = e(document).height();
    switch (this.position) {
     default:
     case "fixed":
      i + t > n ? t > n ? this.elems.modal.css({
        top: 20,
        marginTop: 0
      }) : this.elems.modal.css({
        top: "50%",
        marginTop: 0 - t / 2
      }) : this.elems.modal.css({
        top: "50%",
        marginTop: 0 - t / 2
      });
      break;
     case "absolute":
      var o = s - t - 40;
      this.elems.modal.css({
        top: Math.min(r, o) + 20,
        marginTop: 0
      });
    }
  };
})(jQuery);