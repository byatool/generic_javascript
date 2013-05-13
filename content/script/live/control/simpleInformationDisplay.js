/*

 options['ContainerClass']
 options['RowClass']
 options['LabelClass']
 options['ValueClass']
 options['Information',  {'name': 'FirstName', 'label': 'First Name'}]

 - <div class="containerClass">
 -  <div class="rowClass">
 -    <div class="labelClass">
 -      model.name
 -    </div>
 -   <div class="valueClass">
 -     model.value
 -   </div>
 -  </div>
 - </div>
 */
goog.require('goog.array');
goog.require('goog.dom');
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
src.base.control.simpleInformationDisplay.ContainerId = 'ContainerId';

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
 @param {function} createAHidden Method used to create a hidden input.
 @param {function(Object, Object)} appendChild The method used to append a child to a parent element.
 @return {Object} The created item row.
 @export
 */
src.base.control.simpleInformationDisplay.createLayoutItem = function(layoutInformation, options, createADiv, createAHidden, appendChild) {
  var Current_ = src.base.control.simpleInformationDisplay;
  
  var row = createADiv({'class': options[Current_.RowClass]});
  var labelColumn = createADiv({'class': options[Current_.ColumnClass]}, layoutInformation[Current_.Label]);
  var valueColumn = createADiv({'class': options[Current_.ColumnClass]});
  var hidden = createAHidden({'value': layoutInformation[Current_.PropertyName]});
  
  appendChild(row, labelColumn);
  appendChild(row, valueColumn);
  appendChild(row, hidden);
  
  return row;
};


/**
 @param {Object} container  The parent container that houses the rows to fill.
 @param {function(Object, Array.<Object>} fillTheRows The function used to fill
 a container.
 @return {function(Object)} The function used to update a select from a result.
 @protected
 */
src.base.control.simpleInformationDisplay.createRowsHandler = function(container, fillTheRows) {
  return function(result) {
    fillTheRows(container, result);
  };
};

/**
 @param {Object} result The result with the retrieved information.
 @protected
 */
src.base.control.simpleInformationDisplay.fillTheRows = function(result) {
  
};


/* Exports */

/**
 @param {string} url The url to retrieve the needed info.
 @param {Array.<string>} parameters The request string parameters.
 @param {Object} options The is the set of options for building.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function(Object) : Object} createLayoutItem description.
 @param {?function(Object, Object)} appendChild The method used to append a child to a parent element.
 @param {?function(Object, function) : function(Object}) createTheCallBack a.
 @param {?function(string, Object, function)} submitData The method used to retrieve
 the data for the rows.
 @param {?function} fillTheRows The method used to handle the async response, and to fill
 the rows.
 @param {function} createAHidden Method used to create a hidden input.
 @return {Object} The created display.
 @export
 */
src.base.control.simpleInformationDisplay.initialize = function(url, parameters, options, createADiv, createLayoutItem, appendChild, createTheCallBack, submitData, fillTheRows, createAHidden) {
  var Current = src.base.control.simpleInformationDisplay;
  
  appendChild = appendChild ? appendChild : goog.dom.appendChild;
  createAHidden = createAHidden ? createAHidden : src.base.helper.domCreation.hidden;
  createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
  createLayoutItem = createLayoutItem ? createLayoutItem : src.base.control.simpleInformationDisplay.createLayoutItem;
  createTheCallBack = createTheCallBack ? createTheCallBack : src.base.control.simpleInformationDisplay.createRowsHandler;
  fillTheRows = fillTheRows ? fillTheRows : src.base.control.simpleInformationDisplay.fillTheRows;
  submitData = submitData ? submitData : src.base.helper.domHelper.submitToUrl;
  
  
  var parentContainer = createADiv({'id': options[Current.ContainerId], 'class': options[Current.ContainerClass]});
  
  var rows = goog.array.map(options[Current.LayoutItems], function(currentItem) {
    return createLayoutItem(currentItem, options, createADiv, createAHidden, appendChild); //
  });
  
  goog.array.forEach(rows, function(item) {
    appendChild(parentContainer, item);
  });
  
  submitData(url, parameters, createTheCallBack(parentContainer, fillTheRows));
  
  return parentContainer;
};

