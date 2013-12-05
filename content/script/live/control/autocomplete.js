goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.forms');
goog.require('goog.string.format');
goog.require('goog.ui.LabelInput');
goog.require('goog.ui.ac.Remote');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.autocomplete');

/* EXPORTED FIELDS */

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
src.base.control.autocomplete.LabelInput = 'labelInputText';


/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.Url = 'Url';


/* PROTECTED FIELDS */

/**
 @const
 @type {string}
 @protected
 */
src.base.control.autocomplete.FirstName = 'FirstName';


/**
  @const
  @type {string}
  @protected
  */
src.base.control.autocomplete.Id = 'Id';


/**
  @const
  @type {string}
  @protected
  */
src.base.control.autocomplete.InputClass = 'inputClass';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.autocomplete.LabelId = 'autocompleteLabel';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.autocomplete.LastName = 'LastName';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.autocomplete.Name = 'Name';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.autocomplete.TextboxId = 'autocompleteTextbox';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.autocomplete.ToCall = 'methodsToCallOnSuccess';


/* Private Methods */

/**
 @param {string} url This is the url the autocomplete
 will use to get more items.
 @param {Object} textbox The textbox the autocomplete
 will update when an item is selected.
 @param {function} autocompleteConstructor The constructor
 to use for creating a new autocomplete control.
 @return {Object} The autocomplete control.
 @private
 */
src.base.control.autocomplete.createAnAutocomplete_ =
  function(url, textbox, autocompleteConstructor) {
    return new autocompleteConstructor(url, textbox);
  };

/**
 @param {string} labelText The text to be applied to the
 textbox.
 @param {Object} textbox The textbox to apply the label
 to.
 @param {function} labelInputConstructor The contructor
 for the label input.
 @private
 */
src.base.control.autocomplete.createALabelInput_ =
  function(labelText, textbox,  labelInputConstructor) {
    var labelInput = new labelInputConstructor(labelText);
    labelInput.decorate(textbox);
  };


/**
 @param {Object} autocomplete The autocomplete control.
 @return {Object} The inputHandler.
 @private
 */
src.base.control.autocomplete.getTheInputHandler_ =
  function(autocomplete) {
    return autocomplete.getInputHandler();
  };


/**
 @param {Object} autocomplete The autocomplete control.
 @return {Object} The renderer.
 @private
 */
src.base.control.autocomplete.getTheRenderer_ =
  function(autocomplete) {
    return autocomplete.getRenderer();
  };


/**
 @param {Object} autocomplete The autocomplete control.
 @param {string} method The string representation of post or get.
 @private
 */
src.base.control.autocomplete.setTheAutocompleteMethod_ =
  function(autocomplete, method) {
    autocomplete.setMethod(method);
  };


/* Support Methods */

/**
 @param {Object} inputHandler description.
 @param {string} hiddenName description.
 @param {Array<function>} toCall A list of methods to call that take
 in the chosen id.
 @param {?function} getElement description.
 @param {?function} setValue description.
 @param {?function} setTokenText The method needed to set the text
 value for the associated textbox to that of the selected item.
 @protected
 */
src.base.control.autocomplete.setInputHandlerSelectRow =
  function(inputHandler, hiddenName, toCall,
           getElement, setValue, setTokenText) {

    inputHandler.selectRow = function(selectedItem, opt_multi) {
      var Current = src.base.control.autocomplete;
      var hidden = getElement(hiddenName);

      setTokenText = setTokenText ? setTokenText : function(text) {
        inputHandler.setTokenText(text);
      };

      var id = selectedItem[Current.Id];
      setValue(hidden, id);

      if (toCall) {
        goog.array.every(toCall, function(item) { item(id); });
      }
      
      setTokenText(selectedItem[Current.LastName] + ', ' +
                   selectedItem[Current.FirstName]);

      return false;
    };
  };


/**
 @param {Object} currentRow This is row of data retrieved from the server.
 @param {function} stringFormat This is the string format method used to
 convert the data
 to string.
 @return {string} The formatted string.
 */
src.base.control.autocomplete.formatTheAutocompleteResultText =
  function(currentRow, stringFormat) {
    var Current = src.base.control.autocomplete;

    return stringFormat('%s', currentRow[Current.Name]);
  };


/**
 @param {Object} renderer the renderer attached to the autocomplete.
 @param {?function} createADiv The method used to create a div element.
 @param {?function} getOuterHtml The method used to get the hmtl from
 an element object.
 @param {?function} format The method used format the returned data.
 @export
 */
src.base.control.autocomplete.setRenderRowContents =
  function(renderer, createADiv, getOuterHtml, format)  {
    renderer.renderRowContents_ = function(row, token, node) {

      format = format ?
        format :
        src.base.control.autocomplete.formatTheAutocompleteResultText;

      var data = row['data'];
      var label = format(data, goog.string.format);
      var createdDiv = createADiv({}, label);
      node.innerHTML = getOuterHtml(createdDiv);
    };
  };


/* Exported Methods */

/**
 @param {Object} options The is the set of options for building.
 @param {?function} setRenderRowContents Method used to replace the
 renderRowContents_ method on a renderer.
 @param {?function} setInputHandlerSelectRow The method used to reassign
 the setRow method on an inputHandler.
 @param {?function} createADiv The method used to create a div element.
 @param {?function} createATextbox The method used to create a textbox.
 @param {?function} createLabelInput The function used for adding text
 to an textbox.
 @param {?function} appendChild The method used to append a child to
 a parent element.
 @param {?function} createAHidden The method used to create a hidden
 input.
 @param {?function} createAnAutocomplete The method used to create an
 autocomplete control.
 @param {?function} getTheRenderer The method used to facade the
 autocomplete.getRenderer function.
 @param {?function} getTheInputHandler The method used facade
 the autocomplete.getInputHandler.
 @param {?function(} setTheAutocompleteMethod The method used to facade
 the autocomplete.setMethod function.
 @return {Object} The created autocomplete element.
 @export
 */
src.base.control.autocomplete.initialize =
  function(options, setRenderRowContents, setInputHandlerSelectRow,
           createADiv, createATextbox, createLabelInput, appendChild,
           createAHidden, createAnAutocomplete,
           getTheRenderer, getTheInputHandler, setTheAutocompleteMethod) {

  var current = src.base.control.autocomplete;

    // METHOD INJECTION

    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;

    createATextbox = createATextbox ?
      createATextbox :
      src.base.helper.domCreation.textbox;
    
    createLabelInput = createLabelInput ?
      createLabelInput :
      src.base.control.autocomplete.createALabelInput_;
    
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;
    
    createAHidden = createAHidden ?
      createAHidden :
      src.base.helper.domCreation.hidden;
    
    createAnAutocomplete = createAnAutocomplete ?
      createAnAutocomplete :
      src.base.control.autocomplete.createAnAutocomplete_;
    
    getTheRenderer = getTheRenderer ?
      getTheRenderer :
      src.base.control.autocomplete.getTheRenderer_;
    
    setRenderRowContents = setRenderRowContents ?
      setRenderRowContents :
      src.base.control.autocomplete.setRenderRowContents;

    getTheInputHandler = getTheInputHandler ?
      getTheInputHandler :
      src.base.control.autocomplete.getTheInputHandler_;
    
    setInputHandlerSelectRow = setInputHandlerSelectRow ?
      setInputHandlerSelectRow :
      src.base.control.autocomplete.setInputHandlerSelectRow;
    
    setTheAutocompleteMethod = setTheAutocompleteMethod ?
      setTheAutocompleteMethod :
      src.base.control.autocomplete.setTheAutocompleteMethod_;
    
    
    // ACTUAL START
    
    var parentContainer = createADiv({'id': options[current.ContainerId]});
    
    
    // Auto complete textbox
    
    var textbox = createATextbox({
      'id': current.TextboxId,
      'class': options[current.InputClass]
    });
    
    if (options[current.LabelInput] !== null &&
       options[current.LabelInput] !== undefined) {
      
      createLabelInput(options[current.LabelInput],
                       textbox,
                       goog.ui.LabelInput);
    }
    
    appendChild(parentContainer, textbox);
    
    
    // Hidden input for storage
    
    var hidden = createAHidden({
      'id': options[current.HiddenId],
      'name': options[current.HiddenId]
    });
    appendChild(parentContainer, hidden);
    
    var clearDiv = createADiv({
      'class': 'clearBoth'
    });
    appendChild(parentContainer, clearDiv);
    
    var autocomplete = createAnAutocomplete(options[current.Url],
                                            textbox,
                                            goog.ui.ac.Remote);
    
    var renderer = getTheRenderer(autocomplete);
    setRenderRowContents(renderer, createADiv, goog.dom.getOuterHtml);
    
    var inputHandler = getTheInputHandler(autocomplete);
    var toCall = options[current.ToCall] ?
          options[current.ToCall] :
          [];
    
    setInputHandlerSelectRow(inputHandler,
                             options[current.HiddenId],
                             toCall,
                             goog.dom.getElement,
                             goog.dom.forms.setValue);
    
    setTheAutocompleteMethod(autocomplete, 'GET');
    
    return parentContainer;
};


/**
 @param {Object} autocomplete The autocomplete to reset. 
 @param {Object} options The autocomplete options.
 @param {?function} setValue The function used to set
 the value of the textbox, and hidden, to nothing.
 @param {?function} findNode The function used to find
 the hidden element.
 @param {?function} getElementByClass The function used
 to find the textbox.
 @export
 */
src.base.control.autocomplete.clearTheAutocomplete =
  function(autocomplete, options, setValue,
           findNode, getElementByClass) {
    
    setValue = setValue ?
      setValue : 
      goog.dom.forms.setValue;
    
    findNode = findNode ?
      findNode :
      goog.dom.findNode;
    
    getElementByClass = getElementByClass ?
      getElementByClass :
      goog.dom.getElementByClass;
    
    // START
    
    var current = src.base.control.autocomplete;
    
    var hidden = findNode(autocomplete, function(node){
      return node['id'] === options[current.HiddenId];
    });
    
    setValue(hidden, '');

    var textbox = getElementByClass(options[current.InputClass],
                                    autocomplete);
    setValue(textbox, '');
  };
