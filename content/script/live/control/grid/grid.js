goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.grid.constant');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.grid');

/**
 @param {string} containerId The id for the overall container.
 @param {string} url The url used to retrieve the list items.
 @param {Object} parameters The parameters used to retrieve the
 list of items.
 @param {Object} columnMap The column information for constructing
 the columns.
 @param {function} createARow The function used when constructing a
 grid row.
 @param {?function} createADiv The method used  to create a 
 div element.
 @param {?function} createGridRefresh The function used to create
 the grid refresh handler.
 @return {Object} The created control.
 @export
 */
src.base.control.grid.initialize = 
  function(containerId, url, parameters,
           columnMap, createARow,
           createADiv, createGridRefresh) {
    
    createADiv = createADiv ? 
      createADiv : 
      src.base.helper.domCreation.div;
    
    
    createGridRefresh = createGridRefresh ? 
      createGridRefresh : 
      null;
    
    /* START */
    
    var Constant_ = src.base.control.grid.Constant_;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_  = src.base.control.grid;
    
    
    var containerAttributes = {};
    containerAttributes[ControlConstant_.Id] = containerId;
    containerAttributes[ControlConstant_.Class] = containerId;
    var container = createADiv(containerAttributes);
    
    
    
    
    return container;
  };
