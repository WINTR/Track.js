#########################################################
# Track.js
# Author: matt@wintr.us
#########################################################

class Track

  #--------------------------------------------------------
  # Default settings
  #--------------------------------------------------------

  settings: 
    debug: true

  #--------------------------------------------------------
  # Constructor
  #--------------------------------------------------------

  constructor: (settings) ->
    $.extend @settings, settings
    @initClickListener()

  initClickListener: ->
    $(document).on 'click', '[data-track]', (e) =>
      $el = $(e.currentTarget)
      
      target = $el.attr("target")
      
      if target is "_blank"
        @handleClick $el, false
        return true
      else
        e.preventDefault()
        @handleClick $el, true
        return false

  handleClick: ($target, followLink = false) ->
    @eventQueueCounter = 0

    category = $target.attr("data-track-category")
    action = $target.attr("data-track-action")
    label = $target.attr("data-track-label")
    nonInteraction = $target.attr("data-track-non-interaction")

    fieldObject = {}
    fieldObject['nonInteraction'] = nonInteraction if nonInteraction

    floodlightSrc = $target.attr("data-track-floodlight-src")

    link = $target.attr("href") if followLink

    if category or action or label
      @eventQueueCounter++
      @gaTrack category, action, label, fieldObject, =>
        @checkEventQueue()
        # window.location.href = link if link

    if floodlightSrc
      @eventQueueCounter++
      @floodlightTrack floodlightSrc, =>
        @checkEventQueue()


  gaTrack: (category, action = "", label = "", fieldObject = {}, callback = null) ->
    ga 'send', 'event', category, action, label, fieldObject, 'hitCallback': ->
      callback() if callback
    
    if @settings.debug
      @logDebug("Google Analytics event fired (#{category}, #{action}, #{label}, #{JSON.stringify(fieldObject)})")

  floodlightTrack: (src, callback = null) ->
    axel = Math.random() + ""
    a = axel * 10000000000000
    src = "#{src}#{a}"
    iframe = document.createElement 'iframe'
    iframe.setAttribute "src", src
    iframe.style.display = "none"
    iframe.onload = callback if callback
    $("body").append(iframe)

    if @settings.debug
      @logDebug("Floodlight iframe created (#{src})") 

  checkEventQueue: ->
    @eventQueueCounter-- 
    @completeEventQueue() if @eventQueueCounter is 0

  completeEventQueue: ->
    console.log "Queue emtpy!"

  logError: (message) ->
    console.error "Track.js error: #{message}"

  logDebug: (message) ->
    console.log "Track.js debug: #{message}"

#--------------------------------------------------------
# Wrap library in appropriate module type, or make global
#--------------------------------------------------------

((name, definition) ->
  unless typeof module is "undefined"
    module.exports = definition()
  else if typeof define is "function" and typeof define.amd is "object"
    define definition
  else
    this[name] = definition()
  return
) "Track", ->
  return Track    
