goog.require('goog.ui.LabelInput');
goog.require('goog.ui.CharCounter');

goog.provide('src.base.helper.googleWrapper');

/**
 @param {Object} label The text to apply to the given
 input.
 @param {Object} textElement The text element that
 will have the label applied to.
 @protected
 */
src.base.helper.googleWrapper.createALabelInput =
  function(label, textarea) {
    var theLabelInput = new goog.ui.LabelInput(label);
    theLabelInput.render(textarea);
    //theLabelInput.getElement().name = 'dynamic';
  };

/**
 @param {Object} element The element that the counter
 will watch.
 @param {integer} limit The character limit.
 @param {Object} counter The element that will display
 the counter.
 @protected
 */
src.base.helper.googleWrapper.charCounter =
  function(element, counter, limit) {
    new goog.ui.CharCounter(element, counter, limit);
  };
