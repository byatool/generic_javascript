goog.require('goog.array');
goog.require('goog.net.XhrIo');
goog.require('goog.ui.CharCounter');
goog.require('goog.ui.LabelInput');

goog.provide('src.base.helper.googleWrapper');

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


/**
 @param {Object} label The text to apply to the given
 input.
 @param {Object} textElement The text element that
 will have the label applied to.
 @protected
 */
src.base.helper.googleWrapper.createALabelInput =
  function(label, container, name) {
    var theLabelInput = new goog.ui.LabelInput(label);
    
    theLabelInput.render(container);
    theLabelInput.getElement().name = name;
    theLabelInput.getElement().id = name;
  };


/**
 @param {Object} domDocument The dom document object.
 @return {Object} The created keyboard shortcut handler.
 @protected
 */
src.base.helper.googleWrapper.createAKeyboardShortcutHandler =
  function(domDocument) {
    var handler = new goog.ui.KeyboardShortcutHandler(domDocument);
    
    handler.setAlwaysStopPropagation(true);
    
    return handler;
  };


/**
 @return {Object} The created request
 @protected
 */
src.base.helper.googleWrapper.createRequest =
  function (){
    return new goog.net.XhrIo();
  };


/**
 @param {string} text The text to find the match in.
 @param {string} toMatch The match to find within the text.
 @return {Array.<string>} The matched items.
 @protected
 */
src.base.helper.googleWrapper.match =
  function(text, toMatch) {
    return text.match(toMatch);
  };


/**
 @param {string} text The text to create a regular
 expression with.
 @return {string} The regular expression.
 @protected
 */
src.base.helper.googleWrapper.toRegex =
  function(text) {
    //hasfjladlfkjas can't just look for ||...
    // so needs a special expression to find or 
    if(text === ' || ') {
      return new RegExp('\(\[|]\[|])', 'g');
    }
    else {
      return new RegExp(text, 'g');
    }
    
  };



/**
 @param {string} text The text to search.
 @param {string} what The text to replace.
 @param {string} toWhat The text to use as the replacement.
 @protected
 */
src.base.helper.googleWrapper.replace =
  function(text, what, toWhat) {
    return text.replace(what, toWhat);
  };


/**
 @param {Array.<Object>} list The list to reverse.
 @return {Array.<Object>} The reversed ist. 
 @protected
 */
src.base.helper.googleWrapper.reverse =
  function(theList) {
    theList.reverse();
    return theList;
  };


/**
 @param {Object} element The element to update.
 @param {string} text The text to update the element
 with.
 @protected
 */
src.base.helper.googleWrapper.setInnerHtml =
  function(element, text) {
    element.innerHTML = text;
  };


/**
 @param {Object} element The element to update.
 @param {string} text The text to update the element
 with.
 @protected
 */
src.base.helper.googleWrapper.setInnerText =
  function(element, text) {
    element.innerText = text;
  };


/**
 @param {Array.<Object>} list The list to sort.
 @return {Array.<Object>} The sorted list. 
 @protected
 */
src.base.helper.googleWrapper.sort =
  function(theList) {
    goog.array.sort(theList);
    
    return theList;
  };


/**
 @param {string} text The text to split.
 @param {string} by The string to split by.
 @return {string} The string array.
 @protected
 */
src.base.helper.googleWrapper.split =
  function(text, by) {
    return text.split(by);
  };


