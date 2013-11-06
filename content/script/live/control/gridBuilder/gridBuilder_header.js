goog.require('goog.array');
goog.require('goog.dom');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.gridBuilder.header');


/**
 @param {Object} currentMapping The column information map.
 @param {function} createADiv The function used to create
 the column.
 @param {function} setTextContent The function used to set
 the column text.
 @return {Object} The created column.
 @protected
 */
src.base.control.gridBuilder.header.createHeaderColumn =
  function(currentMapping, createADiv,
           setTextContent) {
    
    var Constant_ = src.base.control.gridBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var extraClass = currentMapping[ControlConstant_.Class] ?
          ' ' + currentMapping[ControlConstant_.Class] :
          '';
    
    var headerAttributes = {};
    headerAttributes[ControlConstant_.Class] = Constant_.HeaderClass + extraClass;
    var headerColumn = createADiv(headerAttributes);
    
    setTextContent(headerColumn,
                   currentMapping[Constant_.HeaderText]);
    
    return headerColumn;
  };

/**
 @param {Object} options This holds the needed column mappings, and
 whether to show the header or not.
 @param {Object} parentContainer The container to add the rows too.
 @param {?function} getElementByClass The function used to find the
 pager buttons if they exist.
 @param {?function} createADiv The function used to create a div.
 @param {?function} forEach The function used to create all the header
 columns.
 @param {function} createHeaderColumn The function used to create each
 header column.
 @param {?function} createAClearDiv The function used to create the end
 clear div.
 @param {?function} appendChild The function used to add an element to a
 parent element.
 @protected
 */
src.base.control.gridBuilder.header.createTheHeaderRow =
  function(options, parentContainer, getElementByClass,
           createADiv, forEach, createHeaderColumn,
           createAClearDiv, appendChild) {
    
    getElementByClass = getElementByClass ? 
      getElementByClass : 
      goog.dom.getElementByClass;
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
    forEach = forEach ?
      forEach :
      goog.array.forEach;
    
    createHeaderColumn = createHeaderColumn ? 
      createHeaderColumn : 
      src.base.control.gridBuilder.header.createHeaderColumn;
    
    createAClearDiv = createAClearDiv ?
      createAClearDiv :
      src.base.helper.domCreation.createAClearDiv;
    
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;
    
    /* START */
    
    var Constant_ = src.base.control.gridBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    if (options[Constant_.ShowHeader]) {
      var headerRow = getElementByClass(Constant_.HeaderRowClass,
                                        parentContainer);
      
      if (!headerRow) {
        
        var headerRowAttributes = {};
        headerRowAttributes[ControlConstant_.Class] = Constant_.HeaderRowClass;
        headerRow = createADiv(headerRowAttributes);
        
        forEach(options[Constant_.Map], function(currentMapping) {
          
          var headerColumn = createHeaderColumn(currentMapping,
                                                createADiv,
                                                goog.dom.setTextContent);
          
          appendChild(headerRow,
                      headerColumn);
        });
        
        
        appendChild(headerRow, createAClearDiv());
        
        appendChild(parentContainer, headerRow);
      }
    }
  };
