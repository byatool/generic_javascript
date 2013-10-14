goog.require('goog.events');
goog.require('goog.events.KeyCodes');
goog.require('goog.ui.KeyboardShortcutHandler');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formatTextAreaDisplay.constant');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.googleWrapper');

goog.provide('src.base.control.formatTextAreaDisplay');



/**
 @param {function} creationFunction The function used to
 create an element.
 @param {string} elementName The name of the element to
 create.
 @return {Object} The created element.
 @private
 */
src.base.control.formatTextAreaDisplay.createAnElement_ =
  function(creationFunction, elementName) {
    var ControlConstant_ = src.base.control.controlConstant;
    var Constant_ = src.base.control.formatTextAreaDisplay.constant;

    var attributes = {};
    attributes[ControlConstant_.Id] = elementName;
    attributes[ControlConstant_.Class] = elementName;
    return creationFunction(attributes);
  };


/**
 @param {Object} theDocument The dom document object.
 @param {string} name The name for the created handler shortcut.
 @param {string} firstKey The key for the first part of the shortcut.
 @param {string} secondKey The key for the second part of the shortcu.
 @param {function} createTheHandler The function used to create the keyboard
 shortcut handler.
 @param {function} listen The function used to add the event handler to the
 shortcut handler.
 @param {function} toCall The function invoke after the key capture.
 @protected
 */
src.base.control.formatTextAreaDisplay.createShortCutHandler =
  function(theDocument, name, firstKey, secondKey,
           createTheHandler, listen, toCall) {

    var Constant_ = src.base.control.formatTextAreaDisplay.constant;
    var EventType_ = goog.ui.KeyboardShortcutHandler.EventType;
    var Modifiers_ = goog.ui.KeyboardShortcutHandler.Modifiers;

    var handler = createTheHandler(theDocument);


    handler.registerShortcut(name,
                             firstKey, Modifiers_.CTRL,
                             secondKey, Modifiers_.CTRL);

    listen(
      handler,
      goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,
      toCall);
  };

/**

 @param {Object} container The parent container.
 @param {function} formatText The function used to convert the raw
 text to pretty text.
 @param {function} getElementByClass The function used to find the
 two areas.
 @param {function} getValue The function used to get the value from
 the raw text area.
 @param {function} setInnerText A facade of the innerText object
 method.
 @return {function} The function to call when the keyboard shortcut
 is entered.
 @protected
 */
src.base.control.formatTextAreaDisplay.formatAndFocus =
  function(container, formatText, getElementByClass,
           getValue, setInnerText) {

    return function(event) {
      var Constant_ = src.base.control.formatTextAreaDisplay.constant;

      var rawTextArea = getElementByClass(Constant_.RawTextArea,
                                          container);

      var rawText = getValue(rawTextArea);
      var prettyText = formatText(rawText);
      var prettyTextArea = getElementByClass(Constant_.PrettyTextArea,
                                             container);

      setInnerText(prettyTextArea, prettyText);
    };
  };


/**
 @param {Object} document The dom document object.
 @param {?function} createADiv The function used to create
 the parent container, and the pretty code container.
 @param {?function} createATextArea The function used to
 create the raw code textarea.
 @param {?function} formatAndFocus The function used to create the
 keyboard shortcut handler.
 @param {?function} createShortCutHandler The function used to create
 the short cut handler object.
 @param {?function} createPre The function used to create the pre
 container for the formatted code.
 @param {?function} appendChild The function used to add various
 elements to the parent container.
 @return {Object} The parent container.
 @export
 */
src.base.control.formatTextAreaDisplay.initialize =
  function(document, createADiv, createATextArea,
           formatAndFocus, createShortCutHandler, createPre,
           appendChild) {

    //TODO take in the language type

    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;

    createATextArea = createATextArea ?
      createATextArea :
      src.base.helper.domCreation.textarea;

    formatAndFocus = formatAndFocus ?
      formatAndFocus :
      src.base.control.formatTextAreaDisplay.formatAndFocus;

    createShortCutHandler = createShortCutHandler ?
      createShortCutHandler :
      src.base.control.formatTextAreaDisplay.createShortCutHandler;

    createPre = createPre ?
      createPre :
      src.base.helper.domCreation.pre;

    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;


    /* Start */

    var Current_ = src.base.control.formatTextAreaDisplay;
    var Constant_ = src.base.control.formatTextAreaDisplay.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var GoogleWrapper_ = src.base.helper.googleWrapper;
    var KeyCodes_ = goog.events.KeyCodes;

    var container = Current_.createAnElement_(createADiv, Constant_.ContainerId);
    var rawTextArea = Current_.createAnElement_(createATextArea, Constant_.RawTextArea);
    var prettyTextArea = Current_.createAnElement_(createADiv, Constant_.PrettyTextArea);


    var javascriptFormat = formatAndFocus(container,
                                          Current_.javascript.format,
                                          goog.dom.getElementByClass,
                                          goog.dom.forms.getValue,
                                          GoogleWrapper_.setInnerText);

    createShortCutHandler(document,
                          Constant_.ShortcutJavascript,
                          KeyCodes_.X,
                          KeyCodes_.J,
                          GoogleWrapper_.createAKeyboardShortcutHandler,
                          goog.events.listen,
                          javascriptFormat);


    var htmlFormat = formatAndFocus(container,
                                    Current_.html.format,
                                    goog.dom.getElementByClass,
                                    goog.dom.forms.getValue,
                                    GoogleWrapper_.setInnerText);

    createShortCutHandler(document,
                          Constant_.ShortcutHtml,
                          KeyCodes_.X,
                          KeyCodes_.H,
                          GoogleWrapper_.createAKeyboardShortcutHandler,
                          goog.events.listen,
                          htmlFormat);


    var preContainer = createPre();

    appendChild(container, rawTextArea);
    appendChild(preContainer, prettyTextArea);
    appendChild(container, preContainer);

    return container;
  };
