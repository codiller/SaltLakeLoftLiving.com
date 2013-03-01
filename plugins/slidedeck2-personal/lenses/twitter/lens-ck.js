(function(e) {
  SlideDeckLens.twitter = function(t) {
    function s() {
      i.fauxHandleText = i.fauxHandle.html();
      var e = i.messageBox.val().length + i.fauxHandleText.length + 1;
      i.messageCounter.html(e);
      e > 140 ? i.messageCounter.addClass("over-limit") : i.messageCounter.removeClass("over-limit");
    }
    var n = "twitter", r = e(t).slidedeck(), i = {};
    i.slidedeck = r.deck, i.frame = i.slidedeck.closest(".lens-" + n), i.slides = r.slides, i.retweetBtn = i.frame.find(".sd-node-twitter-retweet"), i.favoriteBtn = i.frame.find(".sd-node-tool-favorite"), i.openProfileBtn = i.frame.find(".sd-node-open-profile"), i.deckHeader = i.frame.find(".sd-node-twitter-header"), i.twitterUserName = i.deckHeader.find(".sd-node-twitter-user-name"), i.twitterDescription = i.deckHeader.find(".sd-node-twitter-user-description"), i.tweetDiv = i.slidedeck.find(".sd-node-tweet"), i.sendMessageHeaderHandle = i.frame.find(".sd-node-twitter-header-handle"), i.fauxHandle = i.frame.find(".faux-reply-to-handle"), i.deckToolBar = i.frame.find(".sd-node-twitter-tools"), i.replyTool = i.deckToolBar.find(".sd-node-tool-reply"), i.replyDiv = i.deckToolBar.find(".sd-node-twitter-tools-reply"), animating = !1, i.replyButton = i.deckToolBar.find(".sd-node-tool-reply"), i.toolBarButtons = i.deckToolBar.find(".sd-node-twitter-tools-list li > a"), i.toolBarWidth = i.deckToolBar.outerWidth(), i.messageCounter = i.deckToolBar.find(".sd-node-reply-count-number"), i.messageBox = i.deckToolBar.find(".sd-node-reply-area"), i.cancelTweetBtn = i.replyDiv.find(".sd-node-cancel-tweet"), i.fauxHandle = i.replyDiv.find(".faux-reply-to-handle"), i.fauxHandleText = i.fauxHandle.html();
    this.initialize = function() {
      this.fontSize();
      this.sizes();
      this.addOverlay();
      this.deckToolActions();
      this.deckTools();
    };
    s();
    this.deckTools = function() {
      function e(e) {
        var t = e.find(".sd-node-tweet-deets"), n = t.find(".data-tweetid").html(), r = t.find(".data-twitter-handle").html(), s = t.find(".data-twitter-name").html(), o = t.find(".data-twitter-description").html();
        i.retweetBtn.attr("href", "https://twitter.com/intent/retweet?tweet_id=" + n);
        i.favoriteBtn.attr("href", "https://twitter.com/intent/favorite?tweet_id=" + n);
        i.openProfileBtn.attr("href", "https://twitter.com/" + r);
        i.twitterUserName.find(".sd-node-twitter-header-link").html(s);
        i.twitterUserName.find("a.sd-node-twitter-header-link").attr("href", "https://twitter.com/" + r);
        i.twitterDescription.html(o);
        i.sendMessageHeaderHandle.html(r);
        i.fauxHandle.html("@" + r);
        i.messageBox.css("text-indent", i.fauxHandle.width() + 6);
      }
      if (r.slides.eq(0).find(".slidesVertical").length) {
        var t = r.slides.eq(0).find(".slidesVertical").find("dd.verticalSlide_1");
        e(t);
      } else {
        var t = i.slides.eq(r.current - 1);
        e(t);
      }
      var n = r.options.complete;
      r.setOption("complete", function() {
        typeof n == "function" && n(r);
        var t = i.slides.eq(r.current - 1);
        e(t);
        s();
      });
      if (r.slides.eq(0).find(".slidesVertical").length) {
        var o = r.vertical().options.complete;
        r.vertical().options.complete = function(t) {
          typeof o == "function" && o(t);
          var n = t.slides.eq(t.current);
          e(n);
          s();
        };
      }
    };
    this.addOverlay = function() {
      e('<div class="sd-node-overlay"></div>').appendTo(i.frame);
      i.deckOverlay = i.frame.find(".sd-node-overlay");
    };
    this.fontSize = function() {
      var e = this;
      r.slides.each(function(t) {
        var n = r.slides.eq(t), i = n.find(".slidesVertical dd");
        i.length ? i.each(function(t) {
          e.fontScale(i.eq(t));
        }) : e.fontScale(n);
      });
    };
    this.fontScale = function(e) {
      var t = .7, n = e.find(".slide-title"), r = parseInt(n.css("line-height").replace(/([^\d]+)/, "")), i = Math.floor(e.height() / r * t);
      briBriFlex(n, i);
    };
    this.deckToolActions = function() {
      function e() {
        animating = !1;
      }
      function t(t) {
        if (!n) {
          if (i.deckToolBar.hasClass("open") || !t) {
            i.frame.hasClass("sd2-medium") ? animHeight = -i.frame.height() : i.frame.hasClass("sd2-small") ? animHeight = 38 : animWid = i.toolBarWidth;
            i.replyButton.removeClass("active");
            i.deckToolBar.removeClass("open");
            r.setOption("keys", !0);
            r.pauseAutoPlay = !1;
            i.deckOverlay.fadeOut("280");
          } else if (t) {
            i.frame.hasClass("sd2-medium") ? animHeight = 0 : i.frame.hasClass("sd2-small") ? animHeight = i.frame.height() * .7 : animWid = i.slidedeck.width() * .85;
            r.setOption("keys", !1);
            r.pauseAutoPlay = !0;
            i.deckOverlay.fadeIn("200");
            i.replyButton.addClass("active");
            i.deckToolBar.addClass("open");
          }
          var n = !0;
          anamationSpeed = 300;
          i.frame.hasClass("sd2-medium") ? i.replyDiv.animate({
            bottom: animHeight
          }, anamationSpeed, e()) : i.frame.hasClass("sd2-small") ? i.deckToolBar.animate({
            height: animHeight
          }, anamationSpeed, e()) : i.deckToolBar.animate({
            width: animWid
          }, anamationSpeed, e());
        }
      }
      i.replyDivPadding = parseInt(i.replyDiv.css("padding-left"), 10) + parseInt(i.replyDiv.css("padding-right"), 10);
      i.messageBox.css("width", i.replyDiv.width() - i.replyDivPadding / 2 - 2);
      i.messageBox.css("text-indent", i.fauxHandle.width() + 6);
      i.messageBox.keypress(function(e) {
        e.which == 13 && e.preventDefault();
      });
      i.messageBox.keyup(function(e) {
        s();
        var t = 164;
        if (i.messageBox.val().length + i.fauxHandleText.length > t) {
          var n = i.messageBox.val();
          sliceDist = t - i.fauxHandleText.length;
          messageTextSLiced = n.slice(0, sliceDist);
          i.messageBox.val(messageTextSLiced);
          s();
        }
      });
      var n = i.frame.find(".sd-node-twitter-tools-tweet-text");
      n.click(function() {
        i.fauxHandleText = i.fauxHandle.html();
        jQuery(this).attr("href", "https://twitter.com/intent/tweet?text=" + i.fauxHandleText + " " + i.messageBox.val());
      });
      i.toolBarButtons.click(function(e) {
        i.toolBarButtons.removeClass("active");
        var n = !1;
        if (jQuery(this).hasClass("sd-node-tool-reply")) {
          var n = !0;
          e.preventDefault();
        }
        animating || t(n);
        jQuery(this).hasClass("sd-node-tool-reply") || jQuery(this).addClass("active");
      });
      i.deckOverlay.click(function() {
        t();
      });
      i.cancelTweetBtn.click(function(e) {
        e.preventDefault();
        t();
      });
    };
    this.sizes = function() {
      i.replyDivPadding = parseInt(i.replyDiv.css("padding-left"), 10) + parseInt(i.replyDiv.css("padding-right"), 10);
      if (i.frame.hasClass("sd2-medium")) {
        i.frame.append(i.replyDiv);
        i.replyDiv = i.frame.find(".sd-node-twitter-tools-reply");
        i.replyDiv.css({
          bottom: -i.frame.height(),
          width: i.frame.width() - 168 - (parseInt(i.replyDiv.css("padding-left"), 10) + parseInt(i.replyDiv.css("padding-right"), 10))
        });
        i.cancelTweetBtn = i.replyDiv.find(".sd-node-cancel-tweet");
        i.messageCounter = i.replyDiv.find(".sd-node-reply-count-number");
        i.messageBox = i.replyDiv.find(".sd-node-reply-area");
        i.cancelTweetBtn = i.replyDiv.find(".sd-node-cancel-tweet");
        i.fauxHandle = i.replyDiv.find(".faux-reply-to-handle");
        i.fauxHandleText = i.fauxHandle.html();
      } else if (i.frame.hasClass("sd2-small")) {
        if (!i.frame.hasClass(".hide-description")) {
          var e = i.frame.find(".deck-navigation.horizontal"), t = parseInt(e.css("top"), 10);
          t += i.frame.find(".sd-node-twitter-header").outerHeight() / 2;
          e.css("top", t);
        }
      } else i.replyDiv.css("width", i.slidedeck.width() * .85 - i.toolBarButtons.width() - i.replyDivPadding);
    };
    this.initialize();
  };
  e(document).ready(function() {
    e(".lens-twitter .slidedeck").each(function() {
      (typeof e.data(this, "lens-twitter") == "undefined" || e.data(this, "lens-twitter") == null) && e.data(this, "lens-twitter", new SlideDeckLens.twitter(this));
    });
  });
})(jQuery);