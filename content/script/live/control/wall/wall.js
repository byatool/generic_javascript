goog.require('src.base.control.controlConstant');
goog.require('src.base.control.wall.constant');
goog.require('src.base.helper.domCreation');


goog.provide('src.base.control.wall');


/**
 @param {string} containerId The id for the overall container.
 @param {?function} createADiv The method used  to create a 
 div element.
 @return {Object} The created control.
 @export
 */
src.base.control.wall.initialize = 
  function(containerId, createADiv) {
    createADiv = createADiv ? 
      createADiv : 
      src.base.helper.domCreation.div;
    
    /* START */
    
    var Constant_ = src.base.control.wall.Constant_;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_  = src.base.control.wall;
    
    
    var containerAttributes = {};
    containerAttributes[ControlConstant_.Id] = containerId;
    containerAttributes[ControlConstant_.Class] = containerId;
    var container = createADiv(containerAttributes);
    
    
    return container;
  };






//form
//  text  button

//grid builder
//  refesh on form submit
