/*
 -- init :id :text :editMode :submitToUrl :callsAfterSubmit :createADiv :createATextArea :onClick
 --  Create Two divs
 --   One with only the text
 --   One with a text area populated with the text
 --    Will need a submit button
 --    Will need a cancel button
 
 --  set option[editMode]
 --  set option[submitToUrl]
 --  Create submit
 --   Send to :submitToUrl with :id :text 
 --     Create a method that takes in a result, and call all :callsAfterSubmit
 --     Create a method that will update the text of the div
 --      
 --  Return container and options
 */

goog.require('src.base.control.controlConstant');
goog.require('src.base.control.editableDiv.constant');
goog.require('src.base.helper.domCreation');


goog.provide('src.base.control.editableDiv');


/**
 @param {string} containerId The id for the overall container.
 @param {string} text The story text.
 @param {?function} createADiv The method used  to create a 
 div element.
 @return {Object} The created control.
 @export
 */
src.base.control.editableDiv.initialize = 
  function(containerId, text, createADiv, setTextContent) {
    createADiv = createADiv ? 
      createADiv : 
      src.base.helper.domCreation.div;
    
    /* START */
    
    var Constant_ = src.base.control.editableDiv.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_  = src.base.control.editableDiv;
    
    
    var containerAttributes = {};
    containerAttributes[ControlConstant_.Id] = containerId;
    containerAttributes[ControlConstant_.Class] = containerId;
    var container = createADiv(containerAttributes);
    
    var textContainerAttributes = {};
    textContainerAttributes[ControlConstant_.Class] = Constant_.TextContainer;
    var textContainer = createADiv(textContainerAttributes);
    
    //return container;
  };
