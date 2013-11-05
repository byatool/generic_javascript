goog.require('goog.array');
goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.grid.constant');

goog.provide('src.base.control.grid.header');

/**
 @param {Object} currentItem The current column information 
 for the overall header.
 @param {function} createADiv The function used to create the
 header column.
 @param {function} setTextContent The function used to set the
 text of the column.
 @return {Object} The header column.
 @protected
 
 */
src.base.control.grid.header.createHeaderColumn =
  function(currentItem, createADiv, setTextContent) {
    var Constant_ = src.base.control.grid.constant;
    var ControlConstant_ = src.base.control.controlConstant;
     
    var extraClass = currentItem[ControlConstant_.Class] ?
          ' ' + currentItem[ControlConstant_.Class] :
          '';
    
    var headerColumnAttributes = {};
    headerColumnAttributes[ControlConstant_.Class] = Constant_.HeaderClass + extraClass;
    
    var headerColumn = createADiv(headerColumnAttributes);
    setTextContent(headerColumn, currentItem[Constant_.HeaderText]);
    
    return headerColumn;
  };


/**
 @param {Object} parentContainer The container that holds the
 overall grid.
 @param {Object} columnInformation The array that holds the
 column information.
 @param {function} getElementByClass The function used to find
 the header.
 @param {?function} forEach The function used to traverse through
 the columnInformation.
 @param {?function} createADiv The function used to create the
 header.
 @param {?function} createHeaderColumn The function used to create
 a header column for the header row.
 @param {?function} appendChild The function used to add the column
 header to the row header.
 @param {?function} createAClearDiv The function used to create the
 ending clear div.
 @protected
 */
src.base.control.grid.header.createTheHeaderRow =
  function(parentContainer, columnInformation, getElementByClass,
           forEach, createADiv, createHeaderColumn, appendChild,
           createAClearDiv) {
    
    getElementByClass = getElementByClass ? 
      getElementByClass : 
      goog.dom.getElementByClass;
    
    forEach = forEach ? 
      forEach : 
      goog.array.forEach;
    
    createADiv = createADiv ? 
      createADiv : 
      goog.dom.createADiv;
    
    createHeaderColumn = createHeaderColumn ? 
      createHeaderColumn : 
      src.base.control.grid.header.createHeaderColumn;
    
    appendChild = appendChild ? 
      appendChild : 
      goog.dom.appendChild;
    
    createAClearDiv = createAClearDiv ? 
      createAClearDiv : 
      src.base.helper.domCreation.createAClearDiv;
    
    
    /* START */
    
    var Constant_ = src.base.control.grid.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var headerRow = getElementByClass(parentContainer,
                                      Constant_.HeaderRowClass);
    
    if(!headerRow) {
      var headerRowAttributes = {};
      headerRowAttributes[ControlConstant_.Class] = Constant_.HeaderRowClass;
      headerRow = createADiv(headerRowAttributes);
      
      forEach(columnInformation, function(item) {
        var columnHeader = createHeaderColumn(item,
                                              createADiv,
                                              goog.dom.setTextContent);
        appendChild(headerRow, columnHeader);
      });
      
      appendChild(headerRow, createAClearDiv());
      
      appendChild(parentContainer, headerRow);
    }
    
  };
