goog.require('goog.array');
goog.require('goog.events');

goog.provide('src.base.helper.events');


/**
  @param {Object} element The element to set the onSelected event to.
  @param {function(object)} whenSelected  The method to call when the event
  is fired.
  @export
  */
src.base.helper.events.setOnBlur = function(element, whenSelected) {
  goog.events.listen(element, goog.events.EventType.CHANGE, whenSelected, true);
  goog.events.listen(element, goog.events.EventType.BLUR, whenSelected, true);
};


/**
 @param {!Object} element This is the element to assign
 the event handler to.
 @param {!function(object)} whenClicked This is the
 method to use as the click event.
 @export
 */
src.base.helper.events.setClick = function(element, whenClicked) {
  goog.events.removeAll(element, goog.events.EventType.CLICK);
  goog.events.listen(element, goog.events.EventType.CLICK, whenClicked, true);
};


/**
 @param {Object} element The element to set the onSelected event to.
 @param {function(object)} whenSelected  The method to call when the event
 is fired.
 @export
 */
src.base.helper.events.setOnChange = function(element, whenSelected) {
  goog.events.listen(element, goog.events.EventType.CHANGE, whenSelected, true);
};

