goog.require('goog.array');
goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.events');

goog.provide('src.base.control.gridBuilder.row');


/* PRIVATE FUNCTIONS */
/**
 @param {Object} rowContainer The container to add the message
 to.
 @param {function} createADiv The function used to create
 the message container.
 @param {function} setTextContent The function used to set
 the message container's text.
 @param {function} appendChild The function used to the
 message container to the row container.
 @private
 */
src.base.control.gridBuilder.row.createNoRowsMessageContainer_ =
  function(rowContainer, createADiv, setTextContent, appendChild) {
    
    var Constant_ = src.base.control.gridBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var messageDivAttributes = {};
    messageDivAttributes[ControlConstant_.Class] = Constant_.MessageClass;
    var messageDiv = createADiv(messageDivAttributes);
    
    setTextContent(messageDiv, Constant_.NoRowsText);
    appendChild(rowContainer, messageDiv);
  };


/* PROTECTED FUNCTIONS */


/**
 @param {Object} currentRowInformation The parent row inforamtion.
 @param {Object} currentMapping The column information map.
 @param {function} createADiv The function used to create
 the column.
 @param {function} setTextContent The function used to set
 the column text.
 @return {Object} The created column.
 @protected
 */
src.base.control.gridBuilder.row.createColumnFromRowMap =
  function(currentRowInformation, currentMapping, createADiv,
           setTextContent) {
    
    var Constant_ = src.base.control.gridBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    
    var extraClass = currentMapping[ControlConstant_.Class] ?
          ' ' + currentMapping[ControlConstant_.Class] :
          '';
    
    //TODO See if the extra class bit makes sense anymore
    var columnParameters = {};
    columnParameters[ControlConstant_.Class] = Constant_.ColumnClass + extraClass;
    var column = createADiv(columnParameters);
    
    setTextContent(column,
                   currentRowInformation[currentMapping[Constant_.PropertyName]]);

    return column;
  };


/**
 @param {Object} currentItem The current item from the list of results.
 @param {Object} options The various options for the row.
 @param {function} refreshGrid The fuction used to refresh the parent
 grid.
 @param {?function} createADiv The function used to create a div.
 @param {?function} setClick The function used to set the row onClick.
 @param {?function} forEach The function used to go through the grid map
 to create columns.
 @param {?function} createColumnFromRowMap The function use to create a row.
 @param {?function} createAClearDiv The function used to create the end
 clear div.
 @param {?function} appendChild The function used to add an element to a
 parent element.
 @return {Object} The created row.
 @protected
 */
src.base.control.gridBuilder.row.createARow =
  function(currentItem, options, refreshGrid,
           createADiv, setClick, forEach,
           createColumnFromRowMap, createAClearDiv,
           appendChild) {
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
    setClick = setClick ?
      setClick :
      src.base.helper.events.setClick;
    
    forEach = forEach ?
      forEach :
      goog.array.forEach;
    
    createColumnFromRowMap = createColumnFromRowMap ?
      createColumnFromRowMap :
      src.base.control.gridBuilder.row.createColumnFromRowMap;
    
    createAClearDiv = createAClearDiv ?
      createAClearDiv :
      src.base.helper.domCreation.createAClearDiv;
    
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;
    
    
    /* START */
    
    var Constant_ = src.base.control.gridBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var currentRowParameters = {};
    currentRowParameters[ControlConstant_.Class] = Constant_.RowClass;
    var currentRow = createADiv(currentRowParameters);
    
    if (options[Constant_.RowClickHandler]) {
      setClick(currentRow, function() {
        options[Constant_.RowClickHandler](currentRow);
      });
    }
    
    forEach(options[Constant_.Map], function(currentMapping) {
      var column = createColumnFromRowMap(currentItem,
                                        currentMapping,
                                        createADiv,
                                        goog.dom.setTextContent);
      
      appendChild(currentRow, column);
    });
    
    appendChild(currentRow, createAClearDiv());
    
    return currentRow;
  };


/**
 @param {Object} result The result returned from the server.
 @param {Object} parentContainer The container to add the rows too.
 @param {Object} options The container for the row click handler,
 and the grid mapping.
 @param {function} createARow The function used to create a row.
 @param {function} refreshGrid The function used for refreshing the grid
 at row level.
 @param {?function} getElementByClass The function used to find the row container
 if it exists.
 @param {?function} createADiv The function used to create a div.
 @param {?function} appendChild The function used to add an element
 to a parent element.
 @param {?function} forEach The function used to create the rows from the
 result.
 @param {?function} setTextContent The function used to set a div's text.
 @param {?function} setClick The function used to set the row onClick event
 if the rowClickHandler in options is not null.
 @protected
 */
src.base.control.gridBuilder.row.createRows =
  function(result, parentContainer, options, createARow,
           refreshGrid, getElementByClass, createADiv,
           appendChild, forEach, setTextContent, setClick) {
    
    getElementByClass = getElementByClass ? 
      getElementByClass : 
      goog.dom.getElementByClass;
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;
    
    forEach = forEach ?
      forEach :
      goog.array.forEach;
    
    setTextContent = setTextContent ? 
      setTextContent : 
      goog.dom.setTextContent;
    
    setClick = setClick ?
      setClick :
      src.base.helper.events.setClick;
    
    
    /* START */
    
    var Constant_ = src.base.control.gridBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_ = src.base.control.gridBuilder.row;
    
    
    var rowContainer = getElementByClass(Constant_.RowContainerClass,
                                         parentContainer);
    
    if (!rowContainer) {
      var rowContainerParameters = {};
      rowContainerParameters[ControlConstant_.Class] = Constant_.RowContainerClass;
      rowContainer = createADiv(rowContainerParameters);
      
      appendChild(parentContainer, rowContainer);
    }
    
    if (result[Constant_.ListProperty].length === 0) {
      Current_.
        createNoRowsMessageContainer_(
          rowContainer, createADiv, setTextContent, appendChild);
    }
    else {
      forEach(result[Constant_.ListProperty], function(item) {
        var currentRow = createARow(item, options, refreshGrid);
        
        appendChild(rowContainer, currentRow);
      });
    }
  };
