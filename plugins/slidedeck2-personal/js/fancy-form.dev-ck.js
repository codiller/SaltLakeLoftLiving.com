/*!
 * jQuery Fancy Form plugin
 * 
 * Spice up your form with unique, intuitive form interactions
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
*/var FancyForm;

(function(e) {
  FancyForm = function(t) {
    var n = e(t);
    this.fancy(n);
  };
  FancyForm.prototype.fancyCheckbox = function(e) {
    e.wrap('<label class="fancy-checkbox" />');
    var t = e.closest(".fancy-checkbox");
    t.append('<span class="on"><span>On</span></span><span class="off"><span>Off</span></span>').addClass(e[0].checked ? "on" : "off").delegate('input[type="checkbox"]', "click", function(e) {
      this.checked ? t.removeClass("off").addClass("on") : t.removeClass("on").addClass("off");
    });
  };
  FancyForm.prototype.fancyRadios = function(e) {
    var t = e.closest("label");
    t.wrapAll('<span class="fancy-radios" />');
    t.filter(":first").addClass("first");
    t.filter(":last").addClass("last");
    e.each(function(n) {
      var r = e.eq(n), i = t.eq(n);
      i.delegate('input[type="radio"]', "click", function(e) {
        if (this.checked) {
          t.removeClass("on");
          i.addClass("on");
        }
      }).addClass("radio-" + n);
      this.checked && i.addClass("on");
    });
  };
  FancyForm.prototype.fancySelect = function(e) {
    var t = this;
    e.wrap('<span class="fancy-select" />');
    var n = e.closest(".fancy-select"), r = e.find("option");
    n.width(e.outerWidth()).bind("click", function(n) {
      t.hideOptions();
      t.showOptions(e);
    });
    n.append('<span class="selected" />');
    var i = n.find(".selected");
    i.text(r.filter(":selected").text());
    e.bind("change", function() {
      e.closest(".fancy-select").find(".selected").text(e.find("option:selected").text());
    });
  };
  FancyForm.prototype.showOptions = function(t) {
    var n = this, r = t.find("option");
    e("body").bind("click.fancySelect", function(t) {
      var r = e(t.target);
      r.closest("#fancyform-options-dropdown").length < 1 && r.closest(".fancy-select").length < 1 && n.hideOptions();
    });
    this.dropdown = e("#fancyform-options-dropdown");
    if (this.dropdown.length < 1) {
      e("body").append('<div id="fancyform-options-dropdown"><span class="options"></span></div>');
      this.dropdown = e("#fancyform-options-dropdown");
      this.dropdown.delegate(".option", "click", function() {
        var t = e.data(n.dropdown[0], "dom-select"), r = t.find("option"), i = e(this).attr("data-value"), s = "";
        r.each(function(e) {
          this.selected && (s = this.value);
          this.selected = this.value == i;
          this.selected == 1 && t.siblings(".selected").text(this.text);
        });
        n.hideOptions();
        s != i && t.trigger("change");
      }).bind("click", function() {
        n.hideOptions();
      });
    }
    e.data(this.dropdown[0], "dom-select", t);
    this.dropdown.find("span.option").remove();
    var i = "";
    r.each(function(e) {
      i += '<span class="option' + (e == r.length - 1 ? " last" : "") + (this.selected == 1 ? " selected" : "") + '" data-value="' + this.value + '">' + this.text + "</span>";
    });
    var s = this.dropdown.find(".options");
    s.append(i);
    this.dropdown.css({
      left: "-999em"
    }).show();
    var o = t.closest(".fancy-select").offset(), u = e(window).height(), a = e(window).scrollTop(), f = this.dropdown.outerHeight(), l = s.find(".option").outerHeight();
    if (f + o.top > u + a && u > f && o.top - a > f) {
      this.dropdown.addClass("invert");
      o.top = o.top - f;
    } else this.dropdown.removeClass("invert");
    this.dropdown.css({
      top: o.top,
      left: o.left,
      "min-width": t.closest(".fancy-select").outerWidth()
    });
    s.css("max-height", l * 10);
  };
  FancyForm.prototype.hideOptions = function() {
    if (this.dropdown) {
      this.dropdown.find("span.option").remove();
      this.dropdown.hide();
    }
    e("body").unbind("click.fancySelect");
  };
  FancyForm.prototype.fancyText = function(e) {
    e.addClass("fancy-text");
  };
  FancyForm.prototype.fancy = function(e) {
    var t = this, n = {};
    e.each(function(r) {
      var i = e.eq(r);
      if (i.is("input")) switch (i.prop("type")) {
       case "radio":
        if (!n[i.prop("name")]) {
          t.fancyRadios(e.filter('[name="' + i.prop("name") + '"]'));
          n[i.prop("name")] = !0;
        }
        break;
       case "checkbox":
        t.fancyCheckbox(i);
        break;
       case "text":
       default:
        t.fancyText(i);
      } else i.is("select") && t.fancySelect(i);
    });
  };
  jQuery.fn.fancy = function() {
    var t = e.data(this, "FancyForm");
    t || (t = e.data(this, "FancyForm", new FancyForm(this)));
    return this;
  };
})(jQuery);