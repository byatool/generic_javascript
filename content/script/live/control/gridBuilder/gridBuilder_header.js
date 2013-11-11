goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.dom');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.gridBuilder.header');

/**
 @param {Object} column The column to adjust the sort class.
 @param {Object} grid The parent grid.
 @param {function} has The function used to find if the
 column has a sort class already.
 @param {function} swap The function used to toggle the
 class between ascending, and descending.
 @param {function} add The function used to add a sort
 class if none exist.
 @param {function} findNodes The function used to find
 all the other header columns.
 @param {function} forEach The function used to remove
 the sort classes from all but the passed in column.
 @param {function} remove The function used to remove
 either sort class if the column is not the one being
 sorted.
 @protected
 */
src.base.control.gridBuilder.header.updateSortClass =
  function(column, grid, has, swap, add,
           findNodes, forEach,remove) {
    
    var Constant_ = src.base.control.gridBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    if(has(column, Constant_.Ascending)) {
      swap(column, Constant_.Ascending, Constant_.Descending);
    } else if(has(column, Constant_.Descending)){
      swap(column, Constant_.Descending, Constant_.Ascending);
    }
    else{
      add(column, Constant_.Ascending);
    }
    
    var otherColumns = findNodes(grid, function(item){
      return item !== column &&
        has(item, Constant_.HeaderClass);
    });
     
    forEach(otherColumns, function(item) {
      remove(item, Constant_.Ascending);
      remove(item, Constant_.Descending);
    });
  };


/**
 @param {Object} options The parent grid options.
 @param {Object} grid The parent grid.
 @param {string} propertyName The name of the property to sort
 by when the header is clicked.
 @param {function} refresh The function to refresh the grid.
 @return {function} The function to call when a header column is
 clicked.
 @param {function} updateSortClass The function used to update a 
 column's class when being sorted.
 @protected
 */
src.base.control.gridBuilder.header.createHeaderSortHandler =
  function(options, grid, column, propertyName,
           refresh, updateSortClass) {
    
    return function() {
      var Constant_ = src.base.control.gridBuilder.constant;
      
      
      if(options[Constant_.Parameters][Constant_.SortColumn] === propertyName){
        
        options[Constant_.Parameters][Constant_.Descending] =
          !options[Constant_.Parameters][Constant_.Descending];
        
      } else {
        
        options[Constant_.Parameters][Constant_.SortColumn] = propertyName;
        options[Constant_.Parameters][Constant_.Descending] = false;
      }
      
      updateSortClass(column,
                      grid,
                      goog.dom.classes.has,
                      goog.dom.classes.swap,
                      goog.dom.classes.add,
                      goog.dom.findNodes,
                      goog.array.forEach,
                      goog.dom.classes.remove);
       
      refresh(options,
              grid);
    };
  };


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
    headerAttributes[ControlConstant_.Id] = currentMapping[Constant_.PropertyName];
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
 @param {?function} createHeaderSortHandler The function used to handle
 a header column click.
 @param {?function} setClick The function used to set the click handler
 for a header column click.
 @param {?function} createAClearDiv The function used to create the end
 clear div.
 @param {?function} appendChild The function used to add an element to a
 parent element.
 @protected
 */
src.base.control.gridBuilder.header.createTheHeaderRow =
  function(options, parentContainer, getElementByClass,
           createADiv, forEach, createHeaderColumn,
           createHeaderSortHandler, setClick,
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
    
    createHeaderSortHandler = createHeaderSortHandler ? 
      createHeaderSortHandler : 
      src.base.control.gridBuilder.header.createHeaderSortHandler;
    
    setClick = setClick ? 
      setClick : 
      src.base.helper.events.setClick;
    
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
          
          var sortHandler = createHeaderSortHandler(options,
                                                    parentContainer,
                                                    headerColumn,
                                                    currentMapping[Constant_.PropertyName],
                                                    src.base.control.gridBuilder.refresh,
                                                    src.base.control.gridBuilder.header.updateSortClass);
          
          setClick(headerColumn,
                   sortHandler);
          
          
          appendChild(headerRow,
                      headerColumn);
        });
        
        
        appendChild(headerRow, createAClearDiv());
        
        appendChild(parentContainer, headerRow);
      }
    }
  };
