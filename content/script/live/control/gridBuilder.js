goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('src.base.control.pager');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.gridBuilder');


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.ButtonRowClass = 'gridBuilderButtonRowClass';



/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.ButtonRowId = 'gridBuilderButtonRowId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.ColumnClass = 'gridBuilderColumnClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.ContainerClass = 'containerClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.ContainerId = 'containerId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.DisabledPagerClass = 'gridBuilderDisabledPagerClass';



/**
 @const
 @type {string}
 @protected
 */
src.base.control.gridBuilder.NoRowsText = 'There are no records.';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.HeaderClass = 'gridBuilderHeaderClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.HeaderRowClass = 'gridBuilderHeaderRowClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.ListProperty = 'List';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.Map = 'mapping';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.MessageClass = 'gridBuilderMessageClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.PagerClass = 'gridBuilderPagerClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.NextButton = 'next';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.Parameters = 'parameters';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.ParametersPageAttribute = 'page';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.PreviousButton = 'previous';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.RowClass = 'gridBuilderRowClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.RowClickHandler = 'rowClickHandler';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.RowContainerClass = 'gridBuilderRowContainer';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.ResultNextPage = 'NextPage';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.ResultPreviousPage = 'PreviousPage';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.ResultTotalCountOfPages = 'TotalCountOfPages';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.ShowHeader = 'showHeader';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.Url = 'url';


/**
 @param {Object} currentItem The current item from the list of results.
 @param {Object} options The various options for the row.
 @param {function} createADiv The function used to create a div.
 @param {function} setTextContent The function used to set a div's text.
 @param {function} appendChild The function used to add an element to a
 parent element.
 @param {function} setClick The function used to set the row onClick.
 @return {Object} The created row.
 @protected
 */
src.base.control.gridBuilder.createARow =
  function(currentItem, options, createADiv,
           setTextContent, appendChild, setClick) {

    var current = src.base.control.gridBuilder;
    var currentRow = createADiv({'class' : current.RowClass });
    
    if (options[current.RowClickHandler]) {
      setClick(currentRow, function() {
        options[current.RowClickHandler](currentRow);
      });
    }
    
    goog.array.forEach(options[current.Map], function(currentMapping) {
      var extraClass = currentMapping['class'] ? ' ' + currentMapping['class'] : '';
      
      var column = createADiv({'class' : current.ColumnClass + extraClass});
      setTextContent(column, currentItem[currentMapping['propertyName']]);
      appendChild(currentRow, column);
    });
    
    var clearBoth = createADiv({'class': 'clearBoth'});
    
    appendChild(currentRow, clearBoth);
    
    return currentRow;
};


/**
 @param {Object} result The result returned from the server.
 @param {Object} gridOptions The options that are used to construct the grid.
 @param {Object} parentContainer The container to add the rows too.
 @param {function} findNode  The function used to find an existing
 pager row.
 @param {function} initializeThePager The function used to create,
 or update a pager control.
 @param {function} appendChild The method used to append the pager
 if it did not exist already.
 @protected
 */
src.base.control.gridBuilder.createPagerButtons =
  function(result, gridOptions, parentContainer,
           findNode, initializeThePager, appendChild) {

    var current = src.base.control.gridBuilder;
    var Pager_ = src.base.control.pager;

    var containerRow = findNode(parentContainer, function(item) {
      return item['className'] === current.ButtonRowClass;
    });
    
    var existed = containerRow !== null && containerRow != undefined;
    var pagerOptions = {};
    pagerOptions[Pager_.ContainerId] = current.ButtonRowId;
    pagerOptions[Pager_.ContainerClass] = current.ButtonRowClass;
    
    //THIS IS UNTESTED
    //SHOULD PASS IN REFRESH AND TEST CALL IT
    //pagerOptions[Pager_.Refresh] = src.base.control.gridBuilder.refresh;
    pagerOptions[Pager_.Refresh] = function(options) {
      src.base.control.gridBuilder.refresh(options, parentContainer);
    };
    
    containerRow = initializeThePager(result, gridOptions,
                                      pagerOptions, containerRow);
    
    if (!existed) {
      appendChild(parentContainer, containerRow);
    }
  };

/**
 @param {Object} options This holds the needed column mappings, and
 whether to show the header or not.
 @param {Object} parentContainer The container to add the rows too.
 @param {function} findNode The function used to find the pager buttons
 if the exist.
 @param {function} createADiv The function used to create a div.
 @param {function} setTextContent The function used to set a div's text.
 @param {function} appendChild The function used to add an element to a
 parent element.
 @protected
 */
src.base.control.gridBuilder.createTheHeaderRow =
  function(options, parentContainer, findNode,
           createADiv, setTextContent, appendChild) {

    var current = src.base.control.gridBuilder;

    if (options[current.ShowHeader]) {
      var headerRow = findNode(parentContainer, function(row) {
        return row['className'] === current.HeaderRowClass;
      });

      if (!headerRow) {
        headerRow = createADiv({'class': current.HeaderRowClass});

        //saffsd
        goog.array.forEach(options[current.Map], function(currentMap) {
          var extraClass = currentMap['class'] ? ' ' + currentMap['class'] : '';

          var header = createADiv({'class': current.HeaderClass + extraClass});
          setTextContent(header, currentMap['headerText']);
          appendChild(headerRow, header);
        });

        var clearBoth = createADiv({'class': 'clearBoth'});
        appendChild(headerRow, clearBoth);

        appendChild(parentContainer, headerRow);
      }
    }

  };


/* Create Rows */

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
src.base.control.gridBuilder.createNoRowsMessageContainer_ =
  function(rowContainer, createADiv, setTextContent, appendChild) {
    var current = src.base.control.gridBuilder;

    var messageDiv = createADiv({'class': current.MessageClass});
    setTextContent(messageDiv, current.NoRowsText);
    appendChild(rowContainer, messageDiv);
  };


/**
 @param {Object} result The result returned from the server.
 @param {Object} parentContainer The container to add the rows too.
 @param {Object} options The container for the row click handler,
 and the grid mapping.
 @param {function} findNode The function used to find the row container
 if it exists.
 @param {function} createADiv The function used to create a div.
 @param {function} appendChild The function used to add an element
 to a parent element.
 @param {function} createARow The function used to create each row.
 @param {function} setTextContent The function used to set a div's text.
 @param {?function} setClick The function used to set the row onClick event
 if the rowClickHandler in options is not null.
 @protected
 */
src.base.control.gridBuilder.createRows =
  function(result, parentContainer, options, findNode,
           createADiv, appendChild, createARow, setTextContent,
           setClick) {

    var current = src.base.control.gridBuilder;

    var rowContainer = findNode(parentContainer, function(item) {
      return item['className'] === current.RowContainerClass;
    });


    if (!rowContainer) {
      rowContainer = createADiv({'class': current.RowContainerClass});
      appendChild(parentContainer, rowContainer);
    }

    if (result[current.ListProperty].length === 0) {

      current.
        createNoRowsMessageContainer_(
          rowContainer, createADiv, setTextContent, appendChild);
    }
    else {
      goog.array.forEach(result[current.ListProperty], function(item) {
        var currentRow = createARow(item, options, createADiv,
                                    setTextContent, appendChild,
                                    setClick);

        appendChild(rowContainer, currentRow);
      });
    }
  };

/* End Create Rows */


/**
 @param {Object} options The options that are used to construct the grid.
 @param {Object} parentContainer The container to add the rows too.
 @param {function} createTheHeaderRow The function used to create only
 the header of the grid.

 @param {function} createRows The function used to create all but the
 header row.
 @param {function} createARow The function used to create each non
 header row.
 @param {function} createADiv The method used to create a div element.
 @param {function} appendChild The method used to append a child to a
 parent element.
 @param {function} setTextContent The function used to set the text
 of a div.
 @param {function} removeAllEvents The function used to strip the
 pager buttons of any prior event hooks.
 @param {function} swap The function used to set or remove the
 disabled class.
 @param {function} setClick The function used to set the click event
 for the pagers.
 @param {function} findNode The function used to find the pager buttons
 if they exist.
 @param {function} createPagerButtons The function used to create, and add
 the pager buttons to the container.
 @return {Object} The created result handler.
 @protected
 */
src.base.control.gridBuilder.createTheResultHandler =
  function(options, parentContainer, createTheHeaderRow,
           createRows, createARow, createADiv, appendChild,
           setTextContent, removeAllEvents,
           swap, setClick, findNode, createPagerButtons) {

    var current = src.base.control.gridBuilder;

    return function(result) {
      createTheHeaderRow(options, parentContainer, findNode,
                         createADiv, setTextContent, appendChild);

      createRows(result, parentContainer, options,
                 findNode, createADiv, appendChild, createARow,
                 setTextContent, setClick);

      createPagerButtons(result, options, parentContainer,
                         findNode, src.base.control.pager.initialize,
                         appendChild);
    };
};


/**
 @param {Object} options The options that are used to construct the grid.
 @param {?function} createARow The function used to create each non header row.
 @param {?function} createADiv The method used to create a div element.
 @param {?function} createResultHandler The function used to create the call back
 method when posting to the server.
 @param {?function} createTheHeaderRow The function used to create only the header
 of the grid.
 @param {?function} createRows The function used to create all but the header row.
 @param {?function} appendChild The method used to append a child to a parent element.
 @param {?function} setTextContent The function used to set the text of a div.
 @param {?function} submitToUrl The function used to post, and receive the data.
 @return {Object} The created grid.
 @export
 */
src.base.control.gridBuilder.initialize =
  function(options, createARow, createADiv,
           createResultHandler, createTheHeaderRow, createRows,
           appendChild, setTextContent, submitToUrl) {

    var Current = src.base.control.gridBuilder;

    createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
    createResultHandler = createResultHandler ? createResultHandler : Current.createTheResultHandler;
    createTheHeaderRow = createTheHeaderRow ? createTheHeaderRow : Current.createTheHeaderRow;
    createRows = createRows ? createRows : Current.createRows;
    createARow = createARow ? createARow : Current.createARow;
    appendChild = appendChild ? appendChild : goog.dom.appendChild;
    setTextContent = setTextContent ? setTextContent : goog.dom.setTextContent;
    submitToUrl = submitToUrl ? submitToUrl : src.base.helper.domHelper.submitToUrl;

    var parentContainer = createADiv({
      'id': options[Current.ContainerId],
      'class': options[Current.ContainerClass]});

    var resultHandler = createResultHandler(options, parentContainer, createTheHeaderRow,
                                            createRows, createARow, createADiv, appendChild,
                                            setTextContent, goog.events.removeAll,
                                            goog.dom.classes.swap,
                                            src.base.helper.events.setClick,
                                            goog.dom.findNode, Current.createPagerButtons);

    submitToUrl(options[Current.Url], options[Current.Parameters], resultHandler);

    return parentContainer;
};


/**
 @param {Object} options The options that are used to construct the form.
 @param {Object} grid The parent grid.
 @param {?function} getElementsByClass The function used to find all the non header/footer rows.
 @param {?function} removeNode The function used to remove the non header/footer rows.
 @param {?function} createARow The function used to create each non header row.
 @param {?function} createADiv The method used to create a div element.
 @param {?function} createResultHandler The function used to create the call back method when posting to the
 server.
 @param {?function} createTheHeaderRow The function used to create only the header of the grid.
 @param {?function} createRows The function used to create all but the header row.
 @param {?function} appendChild The method used to append a child to a parent element.
 @param {?function} setTextContent The function used to set the text of a div.
 @param {?function} submitToUrl The function used to post, and receive the data.
 @export
 */
src.base.control.gridBuilder.refresh =
  function(options, grid, getElementsByClass,
           removeNode, createARow, createADiv, createResultHandler,
           createTheHeaderRow, createRows, appendChild, setTextContent,
           submitToUrl) {

    var Current = src.base.control.gridBuilder;

    appendChild = appendChild ? appendChild : goog.dom.appendChild;
    createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
    createARow = createARow ? createARow : Current.createARow;
    createResultHandler = createResultHandler ? createResultHandler : Current.createTheResultHandler;
    createRows = createRows ? createRows : Current.createRows;
    createTheHeaderRow = createTheHeaderRow ? createTheHeaderRow : Current.createTheHeaderRow;
    getElementsByClass = getElementsByClass ? getElementsByClass : goog.dom.getElementsByClass;
    removeNode = removeNode ? removeNode : goog.dom.removeNode;
    setTextContent = setTextContent ? setTextContent : goog.dom.setTextContent;
    submitToUrl = submitToUrl ? submitToUrl : src.base.helper.domHelper.submitToUrl;

    var children = getElementsByClass(Current.RowClass, grid);
    goog.array.forEach(children, function(item) { removeNode(item); });

    var possibleMessageRow = getElementsByClass(Current.MessageClass, grid);
    goog.array.forEach(possibleMessageRow, function(item) { removeNode(item); });

    var resultHandler = createResultHandler(options, grid, createTheHeaderRow,
                                            createRows, createARow, createADiv,
                                            appendChild, setTextContent,
                                            goog.events.removeAll, goog.dom.classes.swap,
                                            src.base.helper.events.setClick,
                                            goog.dom.findNode,
                                            Current.createPagerButtons);

    submitToUrl(options[Current.Url], options[Current.Parameters], resultHandler);
};
