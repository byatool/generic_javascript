goog.require('goog.dom');
goog.require('goog.dom.a11y');
goog.require('goog.dom.classes');
goog.require('goog.dom.forms');
goog.require('goog.string.format');
goog.require('goog.ui.IdGenerator');
goog.require('goog.ui.ac.InputHandler');
goog.require('goog.ui.ac.Remote');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.autocomplete');

/* Default Column Names for instant use of this control */

/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.FirstName = 'FirstName';

/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.LastName = 'LastName';


/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.Name = 'Name';

/* End Default Column Names for instant use of this control */



/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.ContainerId = 'containerId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.HiddenId = 'hiddenId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.Id = 'Id';


/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.InputClass = 'inputClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.LabelId = 'autocompleteLabel';


/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.TextboxId = 'autocompleteTextbox';


/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.Url = 'Url';


/* Private Methods */

/**
 @param {string} url This is the url the autocomplete will use to get more items.
 @param {Object} textbox The textbox the autocomplete will update when an item is
 selected.
 @param {function(string, Object) : Object} autocompleteConstructor The constructor to use for
 creating a new autocomplete control.
 @return {Object} The autocomplete control.
 @private
 */
src.base.control.autocomplete.createAnAutocomplete_ = function(url, textbox, autocompleteConstructor) {
  return new autocompleteConstructor(url, textbox);
};


/**
 @param {Object} autocomplete The autocomplete control.
 @return {Object} The inputHandler.
 @private
 */
src.base.control.autocomplete.getTheInputHandler_ = function(autocomplete) {
  return autocomplete.getInputHandler();
};


/**
 @param {Object} autocomplete The autocomplete control.
 @return {Object} The renderer.
 @private
 */
src.base.control.autocomplete.getTheRenderer_ = function(autocomplete) {
  return autocomplete.getRenderer();
};


/**
 @param {Object} autocomplete The autocomplete control.
 @param {string} method The string representation of post or get.
 @private
 */
src.base.control.autocomplete.setTheAutocompleteMethod_ = function(autocomplete, method) {
  autocomplete.setMethod(method);
};

/* Support Methods */

/**
 @param {Object} inputHandler description.
 @param {string} hiddenName description.
 @param {function(string) : Object} getElement description.
 @param {function(Object, string)} setValue description.
 @param {?function(string)} setTokenText The method needed to set the text value for the
 associated textbox to that of the selected item.
 */
src.base.control.autocomplete.setInputHandlerSelectRow = function(inputHandler, hiddenName, getElement, setValue, setTokenText) {
  inputHandler.selectRow = function(selectedItem, opt_multi) {
    var Current = src.base.control.autocomplete;
    var hidden = getElement(hiddenName);

    setTokenText = setTokenText ? setTokenText : function(text) {
      inputHandler.setTokenText(text);
    };
    
    setValue(hidden, selectedItem[Current.Id]);
    setTokenText(selectedItem[Current.LastName] + ', ' + selectedItem[Current.FirstName]);
    
    return false;
  };
};


/**
 @param {Object} currentRow This is row of data retrieved from the server.
 @param {function} stringFormat This is the string format method used to convert the data
 to string.
 @return {string} The formatted string.
 */
src.base.control.autocomplete.formatTheAutocompleteResultText = function(currentRow, stringFormat) {
  var Current = src.base.control.autocomplete;

  return stringFormat('%s', currentRow[Current.Name]);
};


/**
 @param {Object} renderer the renderer attached to the autocomplete.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function(Object) : string} getOuterHtml The method used to get the hmtl from an element object.
 @param {?function : string} format The method used format the returned data.
 @export
 */
src.base.control.autocomplete.setRenderRowContents = function(renderer, createADiv, getOuterHtml, format)  {
  renderer.renderRowContents_ = function(row, token, node) {
    format = format ? format : src.base.control.autocomplete.formatTheAutocompleteResultText;

    var data = row['data'];
    var label = format(data, goog.string.format);
    var createdDiv = createADiv({}, label);
    node.innerHTML = getOuterHtml(createdDiv);
  };
};


/* Exported Methods */

/**
 @param {Object} options The is the set of options for building.
 @param {?function(Object, function, function} setRenderRowContents Method used to replace the
 renderRowContents_ method on a renderer.  The default value is: src.base.control.autocomplete.setRenderRowContents.
 @param {?function(Object, string, function, function}) setInputHandlerSelectRow The method used to reassign
 the setRow method on an inputHandler. The default value is: src.base.control.autocomplete.setInputHandlerSelectRow.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function(Object, Object) : Object} createATextbox The method used to create a textbox.
 @param {?function(Object, Object)} appendChild The method used to append a child to a parent element.
 @param {?function(Object) : Object} createAHidden The method used to create a hidden input.
 @param {?function(string, Object) : Object} createAnAutocomplete The method used to create an autocomplete
 control.
 @param {?function(Object) : Object} getTheRenderer The method used to facade the autocomplete.getRenderer
 function.
 @param {?function(Object) : Object} getTheInputHandler The method used facade the autocomplete.getInputHandler.
 @param {?function(Object, string)} setTheAutocompleteMethod The method used to facase the autocomplete.setMethod
 function.
 @return {Object} The created autocomplete element.
 @export
 */
src.base.control.autocomplete.initialize = function(options, setRenderRowContents, setInputHandlerSelectRow, createADiv, createATextbox, appendChild, createAHidden, createAnAutocomplete,  getTheRenderer, getTheInputHandler, setTheAutocompleteMethod) {
  var Current = src.base.control.autocomplete;

  createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
  createATextbox = createATextbox ? createATextbox : src.base.helper.domCreation.textbox;
  appendChild = appendChild ? appendChild : goog.dom.appendChild;
  createAHidden = createAHidden ? createAHidden : src.base.helper.domCreation.hidden;

  createAnAutocomplete = createAnAutocomplete ? createAnAutocomplete : Current.createAnAutocomplete_;
  getTheRenderer = getTheRenderer ? getTheRenderer : Current.getTheRenderer_;
  setRenderRowContents = setRenderRowContents ? setRenderRowContents : Current.setRenderRowContents;
  getTheInputHandler = getTheInputHandler ? getTheInputHandler : Current.getTheInputHandler_;
  setInputHandlerSelectRow = setInputHandlerSelectRow ? setInputHandlerSelectRow : Current.setInputHandlerSelectRow;
  setTheAutocompleteMethod = setTheAutocompleteMethod ? setTheAutocompleteMethod : Current.setTheAutocompleteMethod_;

  var parentContainer = createADiv({'id': options[Current.ContainerId]});
  var textbox = createATextbox({'id': Current.TextboxId, 'class': options[Current.InputClass]});
  appendChild(parentContainer, textbox);

  var hidden = createAHidden({'id': options[Current.HiddenId]});
  appendChild(parentContainer, hidden);

  var clearDiv = createADiv({'class': 'clearBoth'});
  appendChild(parentContainer, clearDiv);

  var autocomplete = createAnAutocomplete(options[Current.Url], textbox, goog.ui.ac.Remote);

  var renderer = getTheRenderer(autocomplete);
  setRenderRowContents(renderer, createADiv, goog.dom.getOuterHtml); //

  var inputHandler = getTheInputHandler(autocomplete);
  setInputHandlerSelectRow(inputHandler, options[Current.HiddenId], goog.dom.getElement, goog.dom.forms.setValue); //

  setTheAutocompleteMethod(autocomplete, 'POST');

  return parentContainer;
};
