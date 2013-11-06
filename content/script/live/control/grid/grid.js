goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.grid.constant');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.grid');


/**
 @param {Object} result The result from the data retrival.
 @param {Object} gridOptions The options for the overal grid.
 @param {Object} parentContainer The overall grid container.
 @param {function} getElementByClass The function used to find
 the pager container if it exists.
 @param {function} initializeThePager The function used to 
 create the pager.
 @protected
 */
src.base.control.grid.createThePagerButtons =
  function(result, gridOptions, parentContainer, getElementByClass, parameters,
           initializeThePager) {
    
    var Constant_ = src.base.control.grid.constant;
    //var Current_ = src.base.control.grid;
    var Pager_ = src.base.control.pager;
    
    var containerRow = getElementByClass(Constant_.ButtonRowClass,
                                         parentContainer);
    
    
    // var existed = containerRow !== null && containerRow != undefined;
    // var pagerOptions = {};
    // pagerOptions[Pager_.ContainerId] = Current_.ButtonRowId;
    // pagerOptions[Pager_.ContainerClass] = Current_.ButtonRowClass;
    
    // //TODO make this into a method that can be injected for
    // //  more accurate testing.
    // pagerOptions[Pager_.Refresh] = function(page) {
    //   gridOptions[Current_.Parameters]['page'] = page;
    //   refreshTheGrid(gridOptions, parentContainer);
    // };
    
    containerRow = initializeThePager(result, gridOptions,
                                      null, containerRow);
    
    // if (!existed) {
    //   appendChild(parentContainer, containerRow);
    // }
  };


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
    
    //create options
    //  options[Constant_.ContainerId] = containerId;
    //  options[Constant_.Parameters] = parameters;
    //  options[Constant_.CreateARow] = createARow;
    //  options[Constant_.ShowHeader] = showHeader;
    //  options[Constant_.Map] = columnMap;
    
    return container;
  };
