(function() {
  var Track;

  Track = (function() {
    Track.prototype.settings = {
      debug: true
    };

    function Track(settings) {
      $.extend(this.settings, settings);
      this.initClickListener();
    }

    Track.prototype.initClickListener = function() {
      return $(document).on('click', '[data-track]', (function(_this) {
        return function(e) {
          var $el, target;
          $el = $(e.currentTarget);
          target = $el.attr("target");
          if (target === "_blank") {
            _this.handleClick($el, false);
            return true;
          } else {
            e.preventDefault();
            _this.handleClick($el, true);
            return false;
          }
        };
      })(this));
    };

    Track.prototype.handleClick = function($target, followLink) {
      var action, category, floodlightSrc, label, link;
      if (followLink == null) {
        followLink = false;
      }
      this.eventQueueCounter = 0;
      category = $target.attr("data-track-category");
      action = $target.attr("data-track-action");
      label = $target.attr("data-track-label");
      floodlightSrc = $target.attr("data-track-floodlight-src");
      if (followLink) {
        link = $target.attr("href");
      }
      if (category || action || label) {
        this.eventQueueCounter++;
        this.gaTrack(category, action, label, (function(_this) {
          return function() {
            return _this.checkEventQueue();
          };
        })(this));
      }
      if (floodlightSrc) {
        this.eventQueueCounter++;
        return this.floodlightTrack(floodlightSrc, (function(_this) {
          return function() {
            return _this.checkEventQueue();
          };
        })(this));
      }
    };

    Track.prototype.gaTrack = function(category, action, label, callback) {
      if (action == null) {
        action = "";
      }
      if (label == null) {
        label = "";
      }
      if (callback == null) {
        callback = null;
      }
      ga('send', 'event', category, action, label, {
        'hitCallback': function() {
          if (callback) {
            return callback();
          }
        }
      });
      if (this.settings.debug) {
        return this.logDebug("Google Analytics event fired (" + category + ", " + action + ", " + label + ")");
      }
    };

    Track.prototype.floodlightTrack = function(src, callback) {
      var a, axel, iframe;
      if (callback == null) {
        callback = null;
      }
      axel = Math.random() + "";
      a = axel * 10000000000000;
      src = "" + src + a;
      iframe = document.createElement('iframe');
      iframe.setAttribute("src", src);
      iframe.style.display = "none";
      if (callback) {
        iframe.onload = callback;
      }
      $("body").append(iframe);
      if (this.settings.debug) {
        return this.logDebug("Floodlight iframe created (" + src + ")");
      }
    };

    Track.prototype.checkEventQueue = function() {
      this.eventQueueCounter--;
      if (this.eventQueueCounter === 0) {
        return this.completeEventQueue();
      }
    };

    Track.prototype.completeEventQueue = function() {
      return console.log("Queue emtpy!");
    };

    Track.prototype.logError = function(message) {
      return console.error("Track.js error: " + message);
    };

    Track.prototype.logDebug = function(message) {
      return console.log("Track.js debug: " + message);
    };

    return Track;

  })();

  (function(name, definition) {
    if (typeof module !== "undefined") {
      module.exports = definition();
    } else if (typeof define === "function" && typeof define.amd === "object") {
      define(definition);
    } else {
      this[name] = definition();
    }
  })("Track", function() {
    return Track;
  });

}).call(this);
