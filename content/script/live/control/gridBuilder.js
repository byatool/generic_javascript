goog.require('goog.array');
goog.require('goog.dom');
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
src.base.control.gridBuilder.RowContainerClass = 'gridBuilderRowContainer';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.Url = 'url';



/**
 @param {Object} optionToCopy The options that are used to construct the grid.
 @param {integer} pageNumber The page number to set in the parameters object.
 @return {Object} The copied option with the new page number set.
 @protected
 */
src.base.control.gridBuilder.copyOptions = function(optionToCopy, pageNumber) {
  var current = src.base.control.gridBuilder;

  var newOptions = {};
  newOptions[current.ContainerClass] = optionToCopy[current.ContainerClass];
  newOptions[current.ContainerId] = optionToCopy[current.ContainerId];
  newOptions[current.Url] = optionToCopy[current.Url];
  newOptions[current.Map] = optionToCopy[current.Map];
  var newParameters = {};
  newOptions[current.Parameters] = newParameters;
  newOptions[current.Parameters][current.ParametersPageAttribute] = pageNumber;

  return newOptions;
};


/**
 @param {Object} currentItem The current item from the list of results.
 @param {Array.<Object>} mapping The table mapping used to find the column headers.
 @param {function} createADiv The function used to create a div.
 @param {function} setTextContent The function used to set a div's text.
 @param {function} appendChild The function used to add an element to a parent element.
 @return {Object} The created row.
 @protected
 */
src.base.control.gridBuilder.createARow = function(currentItem, mapping, createADiv,
                                                   setTextContent, appendChild) {

  var current = src.base.control.gridBuilder;
  var currentRow = createADiv({'class' : current.RowClass });

  goog.array.forEach(mapping, function(currentMapping) {
    var column = createADiv({'class' : current.ColumnClass});
    setTextContent(column, currentItem[currentMapping['propertyName']]);
    appendChild(currentRow, column);
  });

  var clearBoth = createADiv({'class': 'clearBoth'});

  appendChild(currentRow, clearBoth);

  return currentRow;
};


/**
 @param {boolean} isPrevious Whether the button is used to go back a page, or forward.
 @param {Object} options The options that are used to construct the grid.
 @param {Object} result The result returned from the server.
 @param {Object} parentContainer The container to add the rows too.
 @param {Object} containerRow The row that will hold the pager buttons.
 @param {function} findNode The function used to find the pager buttons if the exist.
 @param {function} createADiv The function used to create a div.
 @param {function} setTextContent The function used to set a div's text.
 @param {function} copyOptions The function used to copy the option values, and
 change the page parameter value to the next or previous page.
 @param {function} setClick The function used to set the click event for the pagers.
 @param {function} appendChild The method used to append a child to a parent element.
 @param {function} refresh The function needed to refresh the grid when a pager is clicked.
 @private
 */
src.base.control.gridBuilder.createAndAppendPagerButton_ = function(isPrevious, options, result, parentContainer,
                                                           containerRow, findNode, createADiv, setTextContent,
                                                           copyOptions, setClick, appendChild, refresh) {
  var current = src.base.control.gridBuilder;

  var buttonId = isPrevious ? current.PreviousButton : current.NextButton;
  var button = findNode(parentContainer, function(item) { return item['id'] === buttonId; });

  if (!button) {
    button = createADiv({'id': buttonId, 'class': current.PagerClass});
    setTextContent(button, isPrevious ? '<' : '>');
    appendChild(containerRow, button);
  }

  var resultKey = isPrevious ? 'PreviousPage' : 'NextPage';
  var currentOptions = copyOptions(options, result[resultKey]);
  setClick(button, function() { refresh(currentOptions, parentContainer); });
};


/**
 @param {Object} result The result returned from the server.
 @param {Object} options The options that are used to construct the grid.
 @param {Object} parentContainer The container to add the rows too.
 @param {function} findNode The function used to find the pager buttons if the exist.
 @param {function} createADiv The function used to create a div.
 @param {function} appendChild The method used to append a child to a parent element.
 @param {function} setClick The function used to set the click event for the pagers.
 @param {function} setTextContent The function used to set a div's text.
 @param {function} copyOptions The function used to copy the option values, and
 change the page parameter value to the next or previous page.
 @param {function} refresh The function needed to refresh the grid when a pager is clicked.
 @protected
 */
src.base.control.gridBuilder.createPagerButtons = function(result, options, parentContainer, findNode,
                                                           createADiv, appendChild, setClick, setTextContent,
                                                           copyOptions, refresh) {

  var current = src.base.control.gridBuilder;

  //find the container row
  // if it exists, dont create, add clear or append

  var containerRow = findNode(parentContainer, function(item) {
    return item['className'] === current.ButtonRowClass;
  });

  var didNotExist = !containerRow;

  if (didNotExist) {
    containerRow = createADiv({'class': current.ButtonRowClass});
  }

  current.createAndAppendPagerButton_(true, options, result, parentContainer,
                             containerRow, findNode, createADiv, setTextContent,
                             copyOptions, setClick, appendChild, refresh);

  current.createAndAppendPagerButton_(false, options, result, parentContainer,
                             containerRow, findNode, createADiv, setTextContent,
                             copyOptions, setClick, appendChild, refresh);

  if (didNotExist) {
    var clearDiv = createADiv({'class': 'clearBoth'});
    appendChild(containerRow, clearDiv);
  }

  appendChild(parentContainer, containerRow);
};

/**
 @param {Array.<Object>} mapping The table mapping used to find the column headers.
 @param {Object} parentContainer The container to add the rows too.
 @param {function} findNode The function used to find the pager buttons if the exist.
 @param {function} createADiv The function used to create a div.
 @param {function} setTextContent The function used to set a div's text.
 @param {function} appendChild The function used to add an element to a parent element.
 @protected
 */
src.base.control.gridBuilder.createTheHeaderRow = function(mapping, parentContainer, findNode,
                                                           createADiv, setTextContent, appendChild) {

  var current = src.base.control.gridBuilder;

  var headerRow = findNode(parentContainer, function(row) { return row['className'] === current.HeaderRowClass;});

  if (!headerRow) {
    headerRow = createADiv({'class': current.HeaderRowClass});

    goog.array.forEach(mapping, function(currentMap) {
      var header = createADiv({'class': current.HeaderClass});
      setTextContent(header, currentMap['headerText']);
      appendChild(headerRow, header);
    });

    var clearBoth = createADiv({'class': 'clearBoth'});
    appendChild(headerRow, clearBoth);

    appendChild(parentContainer, headerRow);
  }
};


/**
 @param {Object} result The result returned from the server.
 @param {Object} parentContainer The container to add the rows too.
 @param {Object} mapping The various columns represented by an object.
 @param {function} findNode The function used to find the row container if it exists.
 @param {function} createADiv The function used to create a div.
 @param {function} appendChild The function used to add an element to a parent element.
 @param {function} createARow The function used to create each row.
 @param {function} setTextContent The function used to set a div's text.
 @protected
 */
src.base.control.gridBuilder.createRows = function(result, parentContainer, mapping,
                                                   findNode, createADiv, appendChild,
                                                   createARow, setTextContent) {

  var current = src.base.control.gridBuilder;

  var rowContainer = findNode(parentContainer, function(item) {
    return item['className'] === current.RowContainerClass;
  });


  if (!rowContainer) {
    rowContainer = createADiv({'class': current.RowContainerClass});
    appendChild(parentContainer, rowContainer);
  }

  goog.array.forEach(result[current.ListProperty], function(item) {
    var currentRow = createARow(item, mapping, createADiv, setTextContent, appendChild);
    appendChild(rowContainer, currentRow);
  });
};


/**
 @param {Object} options The options that are used to construct the grid.
 @param {Object} parentContainer The container to add the rows too.
 @param {function} createTheHeaderRow The function used to create only the header of the grid.
 @param {function} createRows The function used to create all but the header row.
 @param {function} createARow The function used to create each non header row.
 @param {function} createADiv The method used to create a div element.
 @param {function} appendChild The method used to append a child to a parent element.
 @param {function} setTextContent The function used to set the text of a div.
 @param {function} refresh The function used to refresh the grid.
 @param {function} setClick The function used to set the click event for the pagers.
 @param {function} findNode The function used to find the pager buttons if the exist.
 @param {function} createPagerButtons The function used to create, and add the pager buttons to the
 container.
 @param {function} copyOptions The function used to create new options with the page number changed.
 @return {Object} The created result handler.
 @protected
 */
src.base.control.gridBuilder.createTheResultHandler = function(options, parentContainer, createTheHeaderRow,
                                                               createRows, createARow, createADiv, appendChild,
                                                               setTextContent, refresh, setClick,
                                                               findNode, createPagerButtons, copyOptions) {
  var current = src.base.control.gridBuilder;

  return function(result) {
    createTheHeaderRow(options[current.Map], parentContainer, findNode,
                       createADiv, setTextContent, appendChild);

    createRows(result, parentContainer, options[current.Map],
               findNode, createADiv, appendChild, createARow,
               setTextContent);

    createPagerButtons(result, options, parentContainer, findNode, createADiv, appendChild,
                       setClick, setTextContent, copyOptions, refresh);
  };
};


/**
 @param {Object} options The options that are used to construct the grid.
 @param {?function} createARow The function used to create each non header row.
 @param {?function} createADiv The method used to create a div element.
 @param {?function} createResultHandler The function used to create the call back method when posting to the
 server.
 @param {?function} createTheHeaderRow The function used to create only the header of the grid.
 @param {?function} createRows The function used to create all but the header row.
 @param {?function} appendChild The method used to append a child to a parent element.
 @param {?function} setTextContent The function used to set the text of a div.
 @param {?function} submitToUrl The function used to post, and receive the data.
 @return {Object} The created grid.
 @export
 */
src.base.control.gridBuilder.initialize = function(options, createARow, createADiv, createResultHandler,
                                                   createTheHeaderRow, createRows, appendChild, setTextContent,
                                                   submitToUrl) {
  var Current = src.base.control.gridBuilder;

  createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
  createResultHandler = createResultHandler ? createResultHandler : Current.createTheResultHandler;
  createTheHeaderRow = createTheHeaderRow ? createTheHeaderRow : Current.createTheHeaderRow;
  createRows = createRows ? createRows : Current.createRows;
  createARow = createARow ? createARow : Current.createARow;
  appendChild = appendChild ? appendChild : goog.dom.appendChild;
  setTextContent = setTextContent ? setTextContent : goog.dom.setTextContent;
  submitToUrl = submitToUrl ? submitToUrl : src.base.helper.domHelper.submitToUrl;


  var parentContainer = createADiv({ 'id': options[Current.ContainerId], 'class': options[Current.ContainerClass]});
  var resultHandler = createResultHandler(options, parentContainer, createTheHeaderRow, createRows,
                                          createARow, createADiv, appendChild, setTextContent,
                                          Current.refresh, src.base.helper.events.setClick,
                                          goog.dom.findNode, Current.createPagerButtons,
                                          Current.copyOptions);

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
src.base.control.gridBuilder.refresh = function(options, grid, getElementsByClass, removeNode, createARow,
                                                createADiv, createResultHandler, createTheHeaderRow, createRows,
                                                appendChild, setTextContent, submitToUrl) {

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


  var resultHandler = createResultHandler(options, grid, createTheHeaderRow, createRows,
                                          createARow, createADiv, appendChild, setTextContent,
                                          Current.refresh, src.base.helper.events.setClick,
                                          goog.dom.findNode, Current.createPagerButtons,
                                          Current.copyOptions);

  submitToUrl(options[Current.Url], options[Current.Parameters], resultHandler);
};
