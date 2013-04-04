goog.require('goog.dom');
goog.require('goog.dom.a11y');
goog.require('goog.dom.classes');
goog.require('goog.ui.IdGenerator');
goog.require('goog.ui.ac.InputHandler');
goog.require('goog.ui.ac.Remote');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.autocomplete');


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


/**
 TODO Test this
 @param {Object} inputHandler description.
 @param {string} hiddenName description.
 @param {function(string) : Object} getElement description.
 @param {function(Object, string)} setValue description.
 */
src.base.control.autocomplete.setInputHandlerSelectRow = function(inputHandler, hiddenName, getElement, setValue) {
    
    inputHandler.selectRow = function(selectedItem, opt_multi) {
        var hidden = getElement(hiddenName);
        setValue(hidden, selectedItem['Id']);
        
        this.setTokenText(selectedItem['Name']);
        return false;
    };
};

/**
 @param {Object} renderer the renderer attached to the autocomplete.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {function(Object) : string} getOuterHtml The method used to get the hmtl from an element object.
 */
src.base.control.autocomplete.setRenderRowContents = function(renderer, createADiv, getOuterHtml)  {
    renderer.renderRowContents_ = function(row, token, node) {
        var createdDiv = createADiv({}, row['data']['Name']);
        node.innerHTML = getOuterHtml(createdDiv);
    };
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
 @return {Object} The inputHandler.
 @private
 */
src.base.control.autocomplete.getTheInputHandler_ = function(autocomplete) {
    return autocomplete.getInputHandler();
};

/**
 @param {Object} options The is the set of options for building.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function(Object, Object) : Object} createATextbox The method used to create a textbox.
 @param {?function(Object, Object)} appendChild The method used to append a child to a parent element.
 @param {?function(Object) : Object} createAHidden The method used to create a hidden input.
 @param {?function(string, Object) : Object} createAnAutocomplete The method used to create an autocomplete
 control.
 @param {?function(Object, function, function} setRenderRowContents Method used to replace the
 renderRowContents_ method on a renderer.
 @param {?function(Object) : Object} getTheRenderer The method used facade the autocomplete.getRenderer.
 @param {?function(Object) : Object} getTheInputHandler The method used facade the autocomplete.getInputHandler.
 @param {?function(Object, string, function, function}) setInputHandlerSelectRow The method used to reassign
 the setRow method on an inputHandler.
 @return {Object} The created autocomplete element.
 @export
 */
src.base.control.autocomplete.initialize = function(options, createADiv, createATextbox, appendChild, createAHidden, createAnAutocomplete, setRenderRowContents, getTheRenderer, getTheInputHandler, setInputHandlerSelectRow) {
    var Current = src.base.control.autocomplete;
    
    createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
    createATextbox = createATextbox ? createATextbox : src.base.helper.domCreation.textbox;
    appendChild = appendChild ? appendChild : goog.dom.appendChild;
    createAHidden = createAHidden ? createAHidden : src.base.helper.domCreation.hidden;
    createAnAutocomplete = createAnAutocomplete ? createAnAutocomplete : goog.ui.ac.Remote;
    
    getTheRenderer = getTheRenderer ? getTheRenderer : Current.getTheRenderer_;
    setRenderRowContents = setRenderRowContents ? setRenderRowContents : Current.setRenderRowContents;
    getTheInputHandler = getTheInputHandler ? getTheInputHandler : Current.getTheInputHandler_;
    setInputHandlerSelectRow = setInputHandlerSelectRow ? setInputHandlerSelectRow : Current.setInputHandlerSelectRow;
    
    var parentContainer = createADiv({'id': options[Current.ContainerId]});
    var textbox = createATextbox({'id': Current.TextboxId});
    appendChild(parentContainer, textbox);
    
    //TODO This should be getting the id from options
    var hidden = createAHidden({'id': Current.HiddenId});
    appendChild(parentContainer, hidden);
    
    //TODO This was not tested as a constructor.
    var autocomplete = new createAnAutocomplete(options[Current.Url], textbox);
    
    var renderer = getTheRenderer(autocomplete);
    setRenderRowContents(renderer, createADiv, goog.dom.getOuterHtml); //
    
    var inputHandler = getTheInputHandler(autocomplete);
    
    //Untested
    setInputHandlerSelectRow(inputHandler, Current.HiddenId, goog.dom.getElement, goog.dom.forms.setValue); //

    //TODO Test setting the method
    autocomplete.setMethod('POST');
    
    return parentContainer;
};
