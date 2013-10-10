goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.string');
goog.require('goog.style');
goog.require('goog.Timer');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.messageBox');

/**
 @const
 @type {type}
 @export
 */
src.base.control.messageBox.DIV_MESSAGE_BOX = 'divMessageBox';


/**
 @const
 @type {string}
 @export
 */
src.base.control.messageBox.DIV_MESSAGE_CONTAINER = 'divMessgaeContainer';


/* PROTECTED FIELDS */

/**
 @const
 @type {string}
 @protected
 */
src.base.control.messageBox.HideDelay = 5;


/* PRIVATE FUNCTIONS */

/**
 @param {Object} parentContainer This will update the message container
 with messages on the result.
 @return {Object} The message box div within the container.
 @private
 */
src.base.control.messageBox.findMessageBox_ =
  function(parentContainer) {
    return goog.dom.findNode(parentContainer, function(node) {
      return node.id == src.base.control.messageBox.DIV_MESSAGE_BOX;
    });
  };


/* PROTECTED FUNCTIONS */

/**
 @param {!Object} parentMessageBox This Will update the message container
 with messages on the result.
 @param {function(Object) : Object} findMessageBox The method to find the
 child message box
 in the parent container.
 @param {funcion(Object)} removeChildren The method to remove children
 elements from an element.
 @protected
 */
src.base.control.messageBox.clearAllMessages =
  function(parentMessageBox, findMessageBox, removeChildren) {
    var messageBox = findMessageBox(parentMessageBox);
    removeChildren(messageBox);
};

/**
 @param {Object} divToChange This is the div being changed.
 @param {Object} result This is the result to check.
 @param {function} addRemoveClass The method to toggle an element
 class.
 @protected
 */
src.base.control.messageBox.setTheAppearanceByResult =
  function(divToChange, result, addRemoveClass) {
    if (result[src.base.helper.constants.result.SUCCESS]) {
      addRemoveClass(divToChange, 'error', 'info');
    }
    else {
      addRemoveClass(divToChange, 'info', 'error');
    }
  };

/**
 @param {Object} messageBox The messagebox to hide.
 @param {integer} time Time in  seconds.
 @param {?function} callOnce The timer call once
 method.
 @param {?function} showElement The function used to
 hide the messagebox.
 @protected
 */
src.base.control.messageBox.forceHide =
  function(messageBox, time, callOnce, showElement) {
    
    var theTimer = callOnce(function() {
      showElement(messageBox, false);
      theTimer = null;
    }, time * 1000);
  };


/* EXPORTED FUNCTIONS */

/**
 @param {Array.<string>} messages This is the array of messages.
 @param {bool} success Succes value for the result.
 @return {!Object} This is the created result.
 @export
 */
src.base.control.messageBox.createAResult =
  function(messages, success) {
    var ResultConstants = src.base.helper.constants.result;
    var result = {};
    result[ResultConstants.MESSAGES] = messages;
    result[ResultConstants.SUCCESS] = success;
    
    return result;
};


/**
 @param {string} givenName This is the optional name for naming the
 parent container.
 @return {Object} This will be the message box container, and the
 message box.
 @param {?function} isEmptySafe The function used to check if there
 is an existing name for the parent container.
 @param {?function} createADiv The function used to create a div element.
 @param {?function} showElement The function used to show an element.
 @export
 */
src.base.control.messageBox.createMessageBox =
  function(givenName, isEmptySafe, createADiv,
           showElement) {
    
    isEmptySafe = isEmptySafe ?
      isEmptySafe :
      goog.string.isEmptySafe;
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
    showElement = showElement ?
      showElement :
      goog.style.showElement;
    
    //START
    var current = src.base.control.messageBox;
    
    var parentId = isEmptySafe(givenName) ?
          current.DIV_MESSAGE_CONTAINER :
          givenName;
    
    var messageBox = createADiv({id: parentId}, [
        createADiv({id: current.DIV_MESSAGE_BOX})
    ]);
    
    showElement(messageBox, false);
    
    return messageBox;
};


/**
 @param {!Object} parentMessageBox This will update the message container
 with messages on the result.
 @param {!{messages: Array.<string>}} result This is the result to
 check for messages.
 @param {?function} clearAllMessages The method used to clear the messages
 from a message box.
 @param {?function} findMessageBox The method used to find the child message
 box within the message box container.
 @param {?function} createADiv The method used to create a div element.
 @param {?function} appendChild The method used to append a child to a parent
 element.
 @param {?function} setTheAppearanceByResult The method used to update the
 message box.
 @param {?function} showElement The method used to show or hide an element.
 class by result.
 @param {?function} forceHide The function used to hide the current message
 box after a certain amount of time.
 @export
 */
src.base.control.messageBox.updateMessagesByResult =
  function(parentMessageBox, result, clearAllMessages,
           findMessageBox, createADiv, appendChild,
           setTheAppearanceByResult, showElement,
           forceHide) {
    
    var ResultConstants = src.base.helper.constants.result;
    
    clearAllMessages = clearAllMessages ?
      clearAllMessages :
      src.base.control.messageBox.clearAllMessages;
    
    findMessageBox = findMessageBox ?
      findMessageBox :
      src.base.control.messageBox.findMessageBox_;
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;
    
    setTheAppearanceByResult = setTheAppearanceByResult ?
      setTheAppearanceByResult :
      src.base.control.messageBox.setTheAppearanceByResult;
    
    showElement = showElement ?
      showElement :
      goog.style.showElement;
    
    forceHide = forceHide ?
      forceHide :
      src.base.control.messageBox.forceHide;
    
    
    //START
    
    var current = src.base.control.messageBox;
    
    clearAllMessages(parentMessageBox,
                     current.findMessageBox_,
                     goog.dom.removeChildren);
    
    
    var divMessageContainer = findMessageBox(parentMessageBox);
    var messages = result[ResultConstants.MESSAGES];
    
    if (messages && messages.length > 0) {
        var children = goog.array.map(messages, function(messageItem) {
            return createADiv({}, messageItem);
        });
      
        goog.array.forEach(children, function(createdMessage) {
            appendChild(divMessageContainer, createdMessage);
        });
    }
    
    setTheAppearanceByResult(divMessageContainer, result, goog.dom.classes.addRemove);
    showElement(parentMessageBox, true);
    
    forceHide(parentMessageBox,
              current.HideDelay,
              goog.Timer.callOnce,
              showElement);
};
