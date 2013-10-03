goog.require('goog.events.KeyCodes');
goog.require('goog.ui.KeyboardShortcutHandler');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.prettyCodeCreator.constant');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.prettyCodeCreator');



/**
 @param {function} creationFunction The function used to
 create an element.
 @param {string} elementName The name of the element to 
 create.
 @return {Object} The created element.
 @private
 */
src.base.control.prettyCodeCreator.createAnElement_ =
  function(creationFunction, elementName) {
    var ControlConstant_ = src.base.control.controlConstant;
    var Constant_ = src.base.control.prettyCodeCreator.constant;
    
    var attributes  = {};
    attributes[ControlConstant_.Id] = elementName;
    attributes[ControlConstant_.Class] = elementName;
    return creationFunction(attributes);
  };



/**
 @param {Object} theDocument The dom document object.
 @param {function} createTheHandler The function used to create the keyboard
 shortcut handler.
 @param {function} listen The function used to add the event handler to the
 shortcut handler.
 @param {function} toCall The function invoke after the key capture.
 @protected
 */
src.base.control.prettyCodeCreator.createShortCutHandler =
  function(theDocument, createTheHandler, 
           listen, toCall) {
    
    createTheHandler = createTheHandler ? 
      createTheHandler : 
      src.base.control.prettyCodeCreator.createTheHandler;;
    
    listen = listen ? 
      listen : 
      goog.events.listen;
    
    
    toCall = toCall ? 
      toCall : 
      src.base.control.prettyCodeCreator.formatAndFocus;
    
    /* START */
    
    var Constant_ = src.base.control.prettyCodeCreator.constant;
    var KeyCodes_ = goog.events.KeyCodes;
    var EventType_ = goog.ui.KeyboardShortcutHandler.EventType;
    var Modifiers_ = goog.ui.KeyboardShortcutHandler.Modifiers;
    
    var handler = createTheHandler(theDocument);
    
    
    handler.registerShortcut(Constant_.ShortcutPrettyTheCode,
                             KeyCodes_.X, Modifiers_.CTRL,
                             KeyCodes_.B, Modifiers_.CTRL);    
    
    listen(
      handler,
      goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,
      toCall);    
  };

/**
 
 @param {Object} container The parent container.
 @param {function} getElementByClass The function used to find the
 two areas.
 @param {function} getValue The function used to get the value from
 the raw text area.
 @param {function} formatCode The function used to convert the raw
 code to pretty code.
 @param {function} setInnerHtml A facade of the setInnerHTML object
 method.
 @protected
 */
src.base.control.prettyCodeCreator.formatAndFocus =
  function(container, getElementByClass,
           getValue, formatCode, setInnerHtml) {
    
    var Constant_ = src.base.control.prettyCodeCreator.constant; 
    
    var rawCodeArea = getElementByClass(Constant_.RawCodeArea,
                                        container);
    
    var rawCode = getValue(rawCodeArea);
    var prettyCode = formatCode(rawCode);
    var prettyCodeArea = getElementByClass(Constant_.PrettyCodeArea,
                                           container);
    setInnerHtml(prettyCodeArea, prettyCode);
    //format
    //set the prettyCodeArea inner html
    
    
  };


/**
 @param {?function} createADiv The function used to create
 the parent container, and the pretty code container.
 @param {?function} createATextArea The function used to
 create the raw code textarea.
 @return {Object} The parent container.
 @export
 */
src.base.control.prettyCodeCreator.initialize =
  function(createADiv, createATextArea) {
    //TODO take in the language type
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
    createATextArea = createATextArea ? 
      createATextArea : 
      src.base.helper.domCreation.textarea;
    
    
    /* Start */
    
    var Current_ = src.base.control.prettyCodeCreator;
    var Constant_ = src.base.control.prettyCodeCreator.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    // Leave in for video
    // var containerAttributes = {};
    // containerAttributes[ControlConstant_.Id] = Constant_.ContainerId;
    // containerAttributes[ControlConstant_.Class] = Constant_.ContainerClass;
    // var container = createADiv(containerAttributes);
    
    // var textAreaAttributes = {};
    // textAreaAttributes[ControlConstant_.Id] = Constant_.RawCodeArea;
    // textAreaAttributes[ControlConstant_.Class] = Constant_.RawCodeArea;
    // var rawCodeArea = createATextArea(textAreaAttributes);
    
    // var prettyCodeAreaAttributes  = {};
    // prettyCodeAreaAttributes[ControlConstant_.Id] = Constant_.PrettyCodeArea;
    // prettyCodeAreaAttributes[ControlConstant_.Class] = Constant_.PrettyCodeArea;
    // var prettyCodeArea = createADiv(prettyCodeAreaAttributes);
    
    var container = Current_.createAnElement_(createADiv, Constant_.ContainerId);
    var rawCodeArea = Current_.createAnElement_(createATextArea, Constant_.RawCodeArea);
    var prettyCodeArea = Current_.createAnElement_(createADiv, Constant_.PrettyCodeArea);
    
    
    return container;
  };
