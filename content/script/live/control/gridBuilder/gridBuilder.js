goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.control.gridBuilder.header');
goog.require('src.base.control.gridBuilder.row');
goog.require('src.base.control.pager');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.domHelper');

goog.provide('src.base.control.gridBuilder');


/* PROTECTED FIELDS */

/**
 @param {Object} result The result returned from the server.
 @param {Object} gridOptions The options that are used to construct
 the grid.
 @param {Object} parentContainer The container to add the rows too.
 @param {function} getElementByClass  The function used to find an existing
 pager row.
 @param {function} initializeThePager The function used to create,
 or update a pager control.
 @param {function} appendChild The method used to append the pager
 if it did not exist already.
 @param {function} refreshTheGrid The function used to refresh the
 grid when pager button is clicked.
 @protected
 */
src.base.control.gridBuilder.createPagerButtons =
  function(result, gridOptions, parentContainer,
           getElementByClass, initializeThePager,
           appendChild, refreshTheGrid) {
    
    var ControlConstant_ = src.base.control.controlConstant;
    var Constant_ = src.base.control.gridBuilder.constant;
    var Pager_ = src.base.control.pager;
    
    var containerRow = getElementByClass(Constant_.ButtonRowClass,
                                         parentContainer);
    
    var existed = containerRow !== null &&
          containerRow != undefined;
    
    var pagerOptions = {};
    pagerOptions[Pager_.ContainerId] = Constant_.ButtonRowId;
    pagerOptions[Pager_.ContainerClass] = Constant_.ButtonRowClass;
    
    pagerOptions[Pager_.Refresh] = function(page) {
      gridOptions[Constant_.Parameters][ControlConstant_.Page] = page;
      refreshTheGrid(gridOptions, parentContainer);
    };
    
    if(gridOptions[Constant_.CallOnRefresh]){
      gridOptions[Constant_.CallOnRefresh](result);
    }
    
    containerRow = initializeThePager(result,
                                      gridOptions,
                                      pagerOptions,
                                      containerRow);
    
    if (!existed) {
      appendChild(parentContainer, containerRow);
    }
  };


/**
 @param {Object} options The grid options.
 @param {Object} grid The grid.
 @param {function} refreshMethod The function used to refresh the grid.
 @return {function} The function to call to refresh the grid.
 @protected
 */
src.base.control.gridBuilder.createGridRefresh =
  function(options, grid, refreshMethod) {
    return function() {
      refreshMethod(options, grid);
    };
};


/**
 @param {Object} options The options that are used to construct the grid.
 @param {Object} parentContainer The container to add the rows too.
 @param {function} createTheHeaderRow The function used to create only
 the header of the grid.
 @param {function} createRows The function used to create all but the
 header row.
 @param {function} createADiv The method used to create a div element.
 @param {function} appendChild The method used to append a child to a
 parent element.
 @param {function} setTextContent The function used to set the text
 of a div.
 @param {function} swap The function used to set or remove the
 disabled class.
 @param {function} setClick The function used to set the click event
 for the pagers.
 @param {function} getElementByClass The function used to find the pager
 buttons if they exist.
 @param {function} createPagerButtons The function used to create, and add
 the pager buttons to the container.
 @param {function} refreshGrid The function used to allow a row to refresh
 the parent grid.
 @return {Object} The created result handler.
 @protected
 */
src.base.control.gridBuilder.createTheResultHandler =
  function(options, parentContainer, createTheHeaderRow,
           createRows, createADiv, appendChild, setTextContent,
           swap, setClick, getElementByClass, createPagerButtons,
           refreshGrid) {
    
    var Constant_ = src.base.control.gridBuilder.constant;
    var Current_ = src.base.control.gridBuilder;
    
    return function(result) {
      createTheHeaderRow(options, parentContainer);
      
      var createARow = options[Constant_.CreateARow] ?
            options[Constant_.CreateARow] :
            Current_.row.createARow;
      
      createRows(result,
                 parentContainer,
                 options,
                 createARow,
                 refreshGrid);
      
      createPagerButtons(result,
                         options,
                         parentContainer,
                         getElementByClass,
                         src.base.control.pager.initialize,
                         appendChild,
                         src.base.control.gridBuilder.refresh);
    };
};


/**
 @param {Object} options The options that are used to construct the grid.
 @param {?function} createADiv The method used to create a div element.
 @param {?function} createTheResultHandler The function used to create the
 call back method when posting to the server.
 @param {?function} appendChild The method used to append a child to a
 parent element.
 @param {?function} setTextContent The function used to set the text of a
 div.
 @param {?function} submitToUrl The function used to post, and receive the
 data.
 @param {?function} createGridRefresh The function used to create a grid
 refresh function.
 @param {?function} createControlResult The function used to create the 
 standard control "tuple".
 @return {Object} The created grid.
 @export
 */
src.base.control.gridBuilder.initialize =
  function(options, createADiv,
           createTheResultHandler, appendChild,
           setTextContent, submitToUrl,
           createGridRefresh, createControlResult) {
    //TODO
    // Replace the sent in options with named parameters
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
    createTheResultHandler = createTheResultHandler ?
      createTheResultHandler :
      src.base.control.gridBuilder.createTheResultHandler;
    
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;
    
    setTextContent = setTextContent ?
      setTextContent :
      goog.dom.setTextContent;
    
    submitToUrl = submitToUrl ?
      submitToUrl :
      src.base.helper.domHelper.submitRestfulGet;
    
    createGridRefresh = createGridRefresh ?
      createGridRefresh :
      src.base.control.gridBuilder.createGridRefresh;
    
    createControlResult = createControlResult ?
      createControlResult :
      src.base.helper.domHelper.createControlResult;
    
    
    //START
    
    var Constant_ = src.base.control.gridBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_ = src.base.control.gridBuilder;
    
    
    var parentContainerAttributes = {};
    parentContainerAttributes[ControlConstant_.Id] = options[Constant_.ContainerId];
    parentContainerAttributes[ControlConstant_.Class] = options[Constant_.ContainerClass];
    var parentContainer = createADiv(parentContainerAttributes);
    
    
    var gridRefresh = createGridRefresh(options,
                                        parentContainer,
                                        Current_.refresh);
    
    var resultHandler = createTheResultHandler(options,
                                               parentContainer,
                                               src.base.control.gridBuilder.header.createTheHeaderRow,
                                               src.base.control.gridBuilder.row.createRows,
                                               createADiv,
                                               appendChild,
                                               setTextContent,
                                               goog.dom.classes.swap,
                                               src.base.helper.events.setClick,
                                               goog.dom.getElementByClass,
                                               Current_.createPagerButtons,
                                               gridRefresh);
    
    submitToUrl(options[Constant_.Url],
                options[Constant_.MainParameter],
                options[Constant_.Parameters],
                resultHandler);
    
    return createControlResult(parentContainer,
                               options);
  };



/**
 @param {Object} options The options that are used to construct the form.
 @param {Object} grid The parent grid.
 @param {?function} getElementsByClass The function used to find all the
 non header/footer rows.
 @param {?function} forEach The function used to removea all children .
 @param {?function} removeNode The function used to remove the non
 header/footer rows.
 @param {?function} createADiv The method used to create a div element.
 @param {?function} createTheResultHandler The function used to create
 the call back method when posting to the
 server.
 @param {?function} appendChild The method used to append a child to a
 parent element.
 @param {?function} setTextContent The function used to set the text
 of a div.
 @param {?function} submitToUrl The function used to post, and receive
 the data.
 @param {?function} createGridRefresh The function used to create a
 grid refresh
 function.
 @export
 */
src.base.control.gridBuilder.refresh =
  function(options, grid, getElementsByClass,
           forEach, removeNode, createADiv,
           createTheResultHandler, appendChild,
           setTextContent, submitToUrl, createGridRefresh) {

    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;

    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;

    createTheResultHandler = createTheResultHandler ?
      createTheResultHandler :
      src.base.control.gridBuilder.createTheResultHandler;

    getElementsByClass = getElementsByClass ?
      getElementsByClass :
      goog.dom.getElementsByClass;

    forEach = forEach ?
      forEach :
      goog.array.forEach;

    removeNode = removeNode ?
      removeNode :
      goog.dom.removeNode;

    setTextContent = setTextContent ?
      setTextContent :
      goog.dom.setTextContent;
    
    submitToUrl = submitToUrl ?
      submitToUrl :
      src.base.helper.domHelper.submitRestfulGet;
    
    createGridRefresh = createGridRefresh ?
      createGridRefresh :
      src.base.control.gridBuilder.createGridRefresh;
    
    
    //START
    
    var Constant_ = src.base.control.gridBuilder.constant;
    var Current_ = src.base.control.gridBuilder;
    
    var children = getElementsByClass(Constant_.RowClass,
                                      grid);
    
    forEach(children, function(item) {
      removeNode(item);
    });
    
    var possibleMessageRow = getElementsByClass(Constant_.MessageClass,
                                                grid);
    
    forEach(possibleMessageRow, function(item) {
      removeNode(item);
    });
    
    var gridRefresh = createGridRefresh(options,
                                        grid,
                                        Current_.refresh);

    var resultHandler = createTheResultHandler(options,
                                               grid,
                                               src.base.control.gridBuilder.header.createTheHeaderRow,
                                               src.base.control.gridBuilder.row.createRows,
                                               createADiv,
                                               appendChild,
                                               setTextContent,
                                               goog.dom.classes.swap,
                                               src.base.helper.events.setClick,
                                               goog.dom.getElementByClass,
                                               Current_.createPagerButtons,
                                               gridRefresh);

    submitToUrl(options[Constant_.Url],
                options[Constant_.MainParameter],
                options[Constant_.Parameters],
                resultHandler);
};

