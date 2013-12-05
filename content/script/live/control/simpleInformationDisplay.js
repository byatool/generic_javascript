goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.object');
goog.require('goog.string');
goog.require('src.base.helper.domHelper');

goog.provide('src.base.control.simpleInformationDisplay');


/* Fields */

/**
 @const
 @type {string}
 @export
 */
src.base.control.simpleInformationDisplay.ColumnClass = 'ColumnClass';

/**
 @const
 @type {string}
 @export
 */
src.base.control.simpleInformationDisplay.ContainerClass = 'ContainerClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.simpleInformationDisplay.LabelClass = 'LabelClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.simpleInformationDisplay.ContainerId = 'ContainerId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.simpleInformationDisplay.InformationColumn = 'InformationColumn';


/**
 @const
 @type {string}
 @export
 */
src.base.control.simpleInformationDisplay.Label = 'Label';

/**
 @const
 @type {string}
 @export
 */
src.base.control.simpleInformationDisplay.LayoutItems = 'LayoutItems';

/**
 @const
 @type {string}
 @export
 */
src.base.control.simpleInformationDisplay.PropertyName = 'PropertyName';

/**
 @const
 @type {string}
 @export
 */
src.base.control.simpleInformationDisplay.RowClass = 'RowClass';


/* Support Methods */

/**
 @param {Object} layoutInformation The information needed to create the row.
 @param {Object} options The is the set of options for building.
 @param {function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {function(Object, Object)} appendChild The method used to append a child to a parent element.
 @return {Object} The created item row.
 @protected
 */
src.base.control.simpleInformationDisplay.createLayoutItem = function(layoutInformation, options, createADiv, appendChild) {
  var Current_ = src.base.control.simpleInformationDisplay;

  var row = createADiv({'id': layoutInformation[Current_.PropertyName], 'class': options[Current_.RowClass]});
  var labelColumn = createADiv({'class': options[Current_.LabelClass]}, layoutInformation[Current_.Label]);
  var valueColumn = createADiv({'class': options[Current_.ColumnClass] + ' ' + Current_.InformationColumn}, 'N/A');
  var clearBoth = createADiv({'class': 'clearBoth'});

  appendChild(row, labelColumn);
  appendChild(row, valueColumn);
  appendChild(row, clearBoth);

  return row;
};


/**
 @param {Object} container  The parent container that houses the rows to fill.
 @param {function(Object, Array.<Object>} fillTheRows The function used to fill
 a container.
 @param {?function} setTextContent This is used to update the text in a container element.
 @return {function(Object)} The function used to update a select from a result.
 @protected
 */
src.base.control.simpleInformationDisplay.createRowsHandler = function(container, fillTheRows, setTextContent) {
  return function(result) {
    fillTheRows(container, result, setTextContent);
  };
};


/**
 @param {Object} container The parent control that holds the rows.
 @param {Object} result The result with the retrieved information.
 @param {?function} setTextContent This is used to update the text in a container element.
 @protected
 */
src.base.control.simpleInformationDisplay.fillTheRows = function(container, result, setTextContent) {
  var item = result;
  var Current_ = src.base.control.simpleInformationDisplay;
  //TODO
  //  Should at least pull classes.has, and dom.setTextContext into the method
  //  signature.
  goog.array.forEach(goog.object.getKeys(item), function(propertyName) {

    var row = goog.dom.findNode(container, function(control) {
      return control['id'] === propertyName;
    });

    var valueContainer = goog.dom.findNode(row, function(column) {
      return goog.dom.classes.has(column, Current_.InformationColumn);
    });

    if (valueContainer) {
      setTextContent(valueContainer, item[propertyName] ? item[propertyName] : 'N/A');
    }
  });
};


/* Exports */

/**
 @param {string} url The url to retrieve the needed info.
 @param {Array.<string>} parameters The request string parameters.
 @param {Object} options The is the set of options for building.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function(Object) : Object} createLayoutItem description.
 @param {?function(Object, Object)} appendChild The method used to append a child to a parent element.
 @param {?function(Object, function) : function(Object}) createTheCallBack This is used to create a callback
 method that only takes in a result, and uses closures for other information.
 @param {?function} setTextContent This is used to update the text in a container element.
 @param {?function(string, Object, function)} submitData The method used to retrieve
 the data for the rows.
 @param {?function} fillTheRows The method used to handle the async response, and to fill
 the rows.
 @return {Object} The created display.
 @export
 */
src.base.control.simpleInformationDisplay.initialize = function(url, parameters, options, createADiv, createLayoutItem, appendChild, createTheCallBack, setTextContent, submitData, fillTheRows) {

  var Current = src.base.control.simpleInformationDisplay;

  appendChild = appendChild ? appendChild : goog.dom.appendChild;
  createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
  createLayoutItem = createLayoutItem ? createLayoutItem : src.base.control.simpleInformationDisplay.createLayoutItem;
  createTheCallBack = createTheCallBack ? createTheCallBack : src.base.control.simpleInformationDisplay.createRowsHandler;
  setTextContent = setTextContent ? setTextContent : goog.dom.setTextContent;
  fillTheRows = fillTheRows ? fillTheRows : src.base.control.simpleInformationDisplay.fillTheRows;
  submitData = submitData ? submitData : src.base.helper.domHelper.submitToGetUrl;
  
  
  var parentContainer = createADiv({'id': options[Current.ContainerId], 'class': options[Current.ContainerClass]});
  
  var rows = goog.array.map(options[Current.LayoutItems], function(currentItem) {
    return createLayoutItem(currentItem, options, createADiv, appendChild);
  });
  
  goog.array.forEach(rows, function(item) {
    appendChild(parentContainer, item);
  });
  
  submitData(url, parameters, createTheCallBack(parentContainer, fillTheRows, setTextContent));
  
  return parentContainer;
};


/**
 @param {Object} container The original simple information display to be updated.
 @param {string} url The url to get the information from.
 @param {Object} parameter The parameter needed for the request.
 @param {?function} createTheCallBack The method to create the submit request result handler.
 @param {?function} setTextContent This is used to update the text in a container element.
 @param {?function} fillTheRows The method used to fill the information rows.
 @param {?function} submitData The method used to get the needed data from the server.
 @export
 */
src.base.control.simpleInformationDisplay.refresh = function(container, url, parameter, createTheCallBack, setTextContent, fillTheRows, submitData) {
  createTheCallBack = createTheCallBack ? createTheCallBack : src.base.control.simpleInformationDisplay.createRowsHandler;
  fillTheRows = fillTheRows ? fillTheRows : src.base.control.simpleInformationDisplay.fillTheRows;
  setTextContent = setTextContent ? setTextContent : goog.dom.setTextContent;
  submitData = submitData ? submitData : src.base.helper.domHelper.submitToGetUrl;

  var callBack = createTheCallBack(container, fillTheRows, setTextContent);
  submitData(url, parameter, callBack);
};

