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
 @return {Object} The created display.
 @export
 */
src.base.control.simpleInformationDisplay.initialize = function(options, createADiv, createLayoutItem){
  var Current = src.base.control.simpleInformationDisplay;
  
  createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
  
  var rows = goog.array.map(options[Current.LayoutItems], function(currentItem){
    return createLayoutItem(currentItem);
  });
  
  return createADiv({'id': options[Current.ContainerId], 'class': options[Current.ContainerClass]});
};

