goog.require('goog.array');
goog.require('goog.dom');

goog.provide('src.base.helper.domCreation');

//Creation Methods

/**
 @param {Object|string} attributes This is the html attributes
 for the parent element.
 @param {Array.<Object>|null} elements These are the child elements to add.
 @return {!Object} This is the created element tree.
 @export
 */
src.base.helper.domCreation.button = function(attributes, elements) {
  attributes = attributes ? attributes : {};
  return goog.dom.createDom('button', attributes, elements);
};


/**
 @param {Object|string} attributes This is the html attributes.
 @param {boolean} checked Whether the checkbox is in a checked
 state.
 @return {Object} The checkbox input element.
 @export
 */
src.base.helper.domCreation.checkBox = function(attributes, checked) {
  attributes = attributes ? attributes : {};
  attributes['type'] = 'checkbox';
  attributes['checked'] = checked;

  return goog.dom.createDom('input', attributes);
};


/**
 @param {Object|string} attributes This is the html attributes
 for the parent element.
 @param {Array.<Object>|null} elements These are the child elements to add.
 @return {!Object} This is the created element tree.
 @export
 */
src.base.helper.domCreation.div = function(attributes, elements) {
  attributes = attributes ? attributes : {};
  return goog.dom.createDom('div', attributes, elements);
};


/**
 @param {Object|string} attributes This is the html attributes
 for the parent form.
 @param {Array.<Object>|null} elements These are the child elements to add.
 @return {!Object} This is the created element tree.
 @export
 */
src.base.helper.domCreation.form = function(attributes, elements) {
  attributes = attributes ? attributes : {};
  return goog.dom.createDom('form', attributes, elements);
};



/**
 @param {Object|string} attributes This is the html attributes
 for the parent form.
 @return {!Object} This is the created element tree.
 @export
 */
src.base.helper.domCreation.hidden = function(attributes) {
  attributes = attributes ? attributes : {};
  attributes['type'] = 'hidden';

  return goog.dom.createDom('input', attributes);
};


/**
 @param {Object|string} attributes This is the html attributes
 for the parent form.
 @param {string=} text The label text.
 @return {!Object} This is the created element tree.
 @export
 */
src.base.helper.domCreation.label = function(attributes, text) {
  attributes = attributes ? attributes : {};
  var text = text ? text : '';
  return goog.dom.createDom('label', attributes, text);
};

/**
 @param {Object} attributes The html attributes
 for the parent form.
 @param {Array=} data The data needed to create the items.
 @param {string=} defaultItem  The text for a default item.
 @return {!Object} This is the created element tree.
 @export
 */
src.base.helper.domCreation.select = function(attributes, data,  defaultItem) {
  var select = goog.dom.createDom('select', attributes);

  if (defaultItem) {
    var createdOption = goog.dom.createDom('option', {text: defaultItem, value: defaultItem});
    select.add(createdOption);
    goog.dom.forms.setValue(select, defaultItem);
  }

  src.base.helper.domCreation.fillASelect$(select, data);

  return select;
};


/**
 @param {Object|string} attributes This is the html attributes
 for the texbox.
 @param {string} value This is the value to assign to the textbox.
 @return {!Object} This is the created element tree.
 @export
 */
src.base.helper.domCreation.textbox = function(attributes, value) {
  attributes = attributes ? attributes : {};
  attributes['type'] = 'text';
  var textbox = goog.dom.createDom('input', attributes);
  
  textbox.value = value ? value : '';
  
  return textbox;
};


//Helper Methods

/**
 @param {Object} select The select control to fill.
 @param {Array.<Object>} data The array of objects to create options from.
 @param {?string} defaultText This is the optional text that will be the first item text if it
 is not null.
 @export
 */
src.base.helper.domCreation.fillASelect$ = function(select, data, defaultText) {
  //TODO Should pull goog.dom.createDom so that the call can be tested, not the
  // result
  if (data && data.length > 0) {
    
    if(defaultText !== null && defaultText !== undefined) {
      select.add(goog.dom.createDom('option', {text: defaultText, value: ''}));
    }
      
    goog.array.forEach(data, function(item) {
      select.add(goog.dom.createDom('option', {text: item.text, value: item.value}));
    });
  }
};
