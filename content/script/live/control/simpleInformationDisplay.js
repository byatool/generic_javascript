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
goog.provide('src.base.control.simpleInformationDisplay');

/* Fields */

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
src.base.control.simpleInformationDisplay.LayoutItems = 'LayoutItems';


/* Exports */

/**
 @param {Object} options The is the set of options for building.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function(Object) : Object} createLayoutItem description.
 @param {?function(Object, Object)} appendChild The method used to append a child to a parent element.
 @return {Object} The created display.
 @export
 */
src.base.control.simpleInformationDisplay.initialize = function(options, createADiv, createLayoutItem, appendChild){
  var Current = src.base.control.simpleInformationDisplay;
  
  createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
  createLayoutItem = createLayoutItem ? createLayoutItem : null;
  appendChild = appendChild ? appendChild : goog.dom.appendChild;


  var parentContainer = createADiv({'id': options[Current.ContainerId], 'class': options[Current.ContainerClass]});
  
  var rows = goog.array.map(options[Current.LayoutItems], function(currentItem){
    return createLayoutItem(currentItem);
  });
  
  goog.array.forEach(rows, function(item) {
    appendChild(parentContainer, item);
  });
  
  //Set off the async call
  //return the control
  return parentContainer;
};

